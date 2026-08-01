import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

const projectRoot = path.resolve(import.meta.dirname, "..");
const contentRoot = path.join(projectRoot, "src", "content", "articles");
const dataRoot = path.join(projectRoot, "src", "data");
const workRoot = path.resolve(process.env.CDN_WORK_DIR ?? path.join(projectRoot, ".cdn-work"));
const downloadRoot = path.join(workRoot, "uploads");
const cdnOrigin = "https://assets.devopen.club";
const keyPrefix = "uPic/202608/gugudata-pages";
const concurrency = 12;

fs.mkdirSync(downloadRoot, { recursive: true });

const references = collectImageReferences();
const sourceUrls = [...references.keys()].filter((url) => !url.startsWith(`${cdnOrigin}/`));
const results = await runPool(sourceUrls, concurrency, downloadRemoteImage);
const failures = results.filter((result) => !result.ok);
const downloadedImages = results.filter((result) => result.ok);
if (failures.length) {
  fs.writeFileSync(path.join(workRoot, "download-failures.json"), `${JSON.stringify(failures, null, 2)}\n`);
}

const existingImageMap = readJsonIfPresent(path.join(dataRoot, "cdn-image-map.json"));
const imageMap = {
  ...existingImageMap,
  ...Object.fromEntries(results.map((result) => [result.sourceUrl, result.ok ? result.cdnUrl : null]))
};
const uploadByKey = new Map();
for (const result of downloadedImages) {
  if (!uploadByKey.has(result.key)) uploadByKey.set(result.key, result);
}

const uploadManifest = [...uploadByKey.values()].map((result) => ({
  key: result.key,
  file: result.file,
  contentType: result.contentType,
  sha256: result.sha256,
  bytes: result.bytes
}));
const audit = {
  generatedAt: new Date().toISOString(),
  sourceReferenceCount: [...references.values()].reduce((total, files) => total + files.size, 0),
  uniqueImageCount: references.size,
  existingCdnCount: references.size - sourceUrls.length,
  migratedSourceCount: downloadedImages.length,
  failedSourceCount: failures.length,
  uniqueUploadCount: uploadManifest.length,
  imageMap,
  uploads: uploadManifest
};

fs.writeFileSync(path.join(workRoot, "cdn-image-map.json"), `${JSON.stringify(imageMap, null, 2)}\n`);
fs.writeFileSync(path.join(workRoot, "upload-manifest.json"), `${JSON.stringify(uploadManifest, null, 2)}\n`);
fs.writeFileSync(path.join(workRoot, "cdn-image-audit.json"), `${JSON.stringify(audit, null, 2)}\n`);
console.log(JSON.stringify({
  uniqueImageCount: audit.uniqueImageCount,
  existingCdnCount: audit.existingCdnCount,
  migratedSourceCount: audit.migratedSourceCount,
  failedSourceCount: audit.failedSourceCount,
  uniqueUploadCount: audit.uniqueUploadCount,
  uploadBytes: uploadManifest.reduce((total, item) => total + item.bytes, 0)
}, null, 2));

function collectImageReferences() {
  const references = new Map();
  for (const file of walkMarkdown(contentRoot)) {
    const relativePath = path.relative(contentRoot, file);
    const parsed = matter(fs.readFileSync(file, "utf8"));
    if (isHttpUrl(parsed.data.cover)) addReference(parsed.data.cover, relativePath);

    const tree = unified().use(remarkParse).use(remarkGfm).parse(parsed.content);
    visit(tree, "image", (node) => {
      if (isHttpUrl(node.url)) addReference(node.url, relativePath);
    });
  }
  return references;

  function addReference(url, relativePath) {
    if (!references.has(url)) references.set(url, new Set());
    references.get(url).add(relativePath);
  }
}

async function downloadRemoteImage(sourceUrl) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(sourceUrl, {
        headers: { "user-agent": "GuGuData-Knowledge-Base-CDN-Migration/1.0" },
        redirect: "follow",
        signal: AbortSignal.timeout(30_000)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (!buffer.length) throw new Error("empty response");
      const contentType = detectContentType(response.headers.get("content-type"), buffer);
      const extension = extensionFor(contentType);
      const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
      const key = `${keyPrefix}/${sha256.slice(0, 32)}.${extension}`;
      const file = path.join(downloadRoot, `${sha256}.${extension}`);
      if (!fs.existsSync(file)) fs.writeFileSync(file, buffer);
      return { ok: true, sourceUrl, cdnUrl: `${cdnOrigin}/${key}`, key, file, contentType, sha256, bytes: buffer.length };
    } catch (error) {
      lastError = error;
    }
  }
  return { ok: false, sourceUrl, error: lastError?.message ?? "unknown download error" };
}

function detectContentType(header, buffer) {
  const normalized = String(header ?? "").split(";")[0].trim().toLowerCase();
  if (["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"].includes(normalized)) return normalized;
  if (buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return "image/jpeg";
  if (buffer.subarray(1, 4).toString("ascii") === "PNG") return "image/png";
  if (buffer.subarray(0, 4).toString("ascii") === "GIF8") return "image/gif";
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (buffer.subarray(0, 256).toString("utf8").includes("<svg")) return "image/svg+xml";
  throw new Error(`unsupported content type: ${normalized || "missing"}`);
}

function extensionFor(contentType) {
  return ({
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg"
  })[contentType];
}

function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function readJsonIfPresent(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
}

function walkMarkdown(root) {
  const files = [];
  const visitDirectory = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) visitDirectory(absolutePath);
      else if (/\.md$/i.test(entry.name)) files.push(absolutePath);
    }
  };
  visitDirectory(root);
  return files.sort();
}

async function runPool(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex]);
    }
  });
  await Promise.all(runners);
  return results;
}
