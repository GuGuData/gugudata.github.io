import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const projectRoot = path.resolve(import.meta.dirname, "..");
const workRoot = path.resolve(process.env.CDN_WORK_DIR ?? path.join(projectRoot, ".cdn-work"));
const manifestPath = path.resolve(process.env.CDN_MANIFEST_PATH ?? path.join(workRoot, "upload-manifest.json"));
const nodeBinary = process.env.CDN_NODE_BINARY ?? process.execPath;
const wranglerBinary = process.env.CDN_WRANGLER_BINARY;
const bucketName = process.env.CDN_BUCKET_NAME ?? "devopenclub-assets";
const cdnOrigin = process.env.CDN_ORIGIN ?? "https://assets.devopen.club";
const concurrency = Number(process.env.CDN_UPLOAD_CONCURRENCY ?? 8);

if (!wranglerBinary || !fs.existsSync(wranglerBinary)) {
  throw new Error("CDN_WRANGLER_BINARY must point to the Wrangler entry file.");
}
if (!fs.existsSync(manifestPath)) {
  throw new Error(`Missing upload manifest: ${manifestPath}`);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const uploaded = [];
const failures = [];

await runPool(manifest, concurrency, async (item, index) => {
  try {
    await upload(item);
    uploaded.push(item.key);
    if (uploaded.length % 25 === 0 || uploaded.length === manifest.length) {
      console.log(`Uploaded ${uploaded.length}/${manifest.length}`);
    }
  } catch (error) {
    failures.push({ key: item.key, error: error.message });
    console.error(`Upload failed (${index + 1}/${manifest.length}): ${item.key}`);
  }
});

if (failures.length) {
  fs.writeFileSync(path.join(workRoot, "upload-failures.json"), `${JSON.stringify(failures, null, 2)}\n`);
  throw new Error(`${failures.length} CDN uploads failed.`);
}

const verification = await runPool(manifest, concurrency, verify);
const verificationFailures = verification.filter((result) => !result.ok);
fs.writeFileSync(path.join(workRoot, "cdn-verification.json"), `${JSON.stringify(verification, null, 2)}\n`);
if (verificationFailures.length) {
  throw new Error(`${verificationFailures.length} CDN objects failed verification.`);
}

console.log(JSON.stringify({ uploaded: manifest.length, verified: verification.length }, null, 2));

function upload(item) {
  return new Promise((resolve, reject) => {
    const args = [
      wranglerBinary,
      "r2",
      "object",
      "put",
      `${bucketName}/${item.key}`,
      "--remote",
      "--file",
      item.file,
      "--content-type",
      item.contentType,
      "--cache-control",
      "public, max-age=31536000, immutable"
    ];
    const child = spawn(nodeBinary, args, { cwd: path.dirname(wranglerBinary), stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || `Wrangler exited with code ${code}`));
    });
  });
}

async function verify(item) {
  const url = `${cdnOrigin}/${item.key}`;
  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const sha256 = crypto.createHash("sha256").update(bytes).digest("hex");
    const contentType = String(response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
    if (sha256 !== item.sha256) throw new Error("SHA-256 mismatch");
    if (contentType !== item.contentType) throw new Error(`Content-Type mismatch: ${contentType}`);
    return { ok: true, key: item.key, url, contentType, sha256, bytes: bytes.length };
  } catch (error) {
    return { ok: false, key: item.key, url, error: error.message };
  }
}

async function runPool(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(runners);
  return results;
}
