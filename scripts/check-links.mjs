import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const distRoot = path.join(projectRoot, "dist");
const errors = [];

if (!fs.existsSync(distRoot)) throw new Error("dist directory does not exist; run the build first.");

for (const htmlFile of walk(distRoot).filter((file) => file.endsWith(".html"))) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const inspectableHtml = html
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, "")
    .replace(/<code\b[\s\S]*?<\/code>/gi, "");
  for (const match of inspectableHtml.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(reference)) continue;
    const clean = reference.split(/[?#]/)[0];
    if (!clean) continue;
    const expected = resolveBuiltReference(htmlFile, clean);
    if (!fs.existsSync(expected)) errors.push(`${path.relative(distRoot, htmlFile)} -> ${reference}`);
  }
}

const sitemap = fs.readFileSync(path.join(distRoot, "sitemap-0.xml"), "utf8");
if (!sitemap.includes("/archive/jieqi/answers/")) errors.push("indexable archive URL missing from sitemap");
const rss = fs.readFileSync(path.join(distRoot, "rss.xml"), "utf8");
if (rss.includes("/archive/")) errors.push("archive URL found in RSS");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Built-site internal link check passed.");
}

function resolveBuiltReference(htmlFile, reference) {
  const decoded = decodeURI(reference);
  const base = decoded.startsWith("/") ? path.join(distRoot, decoded) : path.resolve(path.dirname(htmlFile), decoded);
  if (path.extname(base)) return base;
  return path.join(base, "index.html");
}

function walk(root) {
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolutePath = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolutePath));
    else result.push(absolutePath);
  }
  return result;
}
