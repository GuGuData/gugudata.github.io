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
for (const htmlFile of walk(distRoot).filter((file) => file.endsWith(".html"))) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const pageUrl = builtFileUrl(htmlFile);
  if (sitemap.includes(`<loc>${pageUrl}</loc>`) && (/noindex/i.test(robots) || canonical !== pageUrl)) {
    errors.push(`non-indexable URL found in sitemap: ${pageUrl}`);
  }
}
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

function builtFileUrl(htmlFile) {
  const relative = path.relative(distRoot, htmlFile).replaceAll(path.sep, "/");
  const pathname = relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
  return new URL(pathname, "https://gugudata.github.io").href;
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
