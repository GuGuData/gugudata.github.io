import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { normalizedTitleKey } from "./content-utils.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const contentRoot = path.join(projectRoot, "src", "content", "articles");
const summaryPath = path.join(projectRoot, "src", "data", "content-summary.json");
const requiredFields = ["title", "description", "section", "slug", "lang", "status", "tags"];
const files = walk(contentRoot);
const errors = [];
const slugs = new Map();
const titles = new Map();

for (const file of files) {
  const relativePath = path.relative(contentRoot, file).replaceAll(path.sep, "/");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push(`${relativePath}: missing ${field}`);
    }
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug ?? "") || String(data.slug).length > 80) {
    errors.push(`${relativePath}: invalid slug`);
  }
  if (!Array.isArray(data.tags)) errors.push(`${relativePath}: tags must be an array`);
  if (!new Set(["published", "archived"]).has(data.status)) errors.push(`${relativePath}: invalid status`);
  if (path.basename(file, ".md") !== data.slug) errors.push(`${relativePath}: filename and slug differ`);
  if (relativePath.split("/")[0] !== data.section) errors.push(`${relativePath}: directory and section differ`);

  addUnique(slugs, data.slug, relativePath, "slug");
  addUnique(titles, normalizedTitleKey(data.title), relativePath, "title");

  if (hasBodyH1(content)) errors.push(`${relativePath}: body contains H1`);
  if (/\/(?:Users|home)\/[A-Za-z0-9._-]+\//.test(content)) errors.push(`${relativePath}: absolute local path`);
  if (/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/.test(content)) errors.push(`${relativePath}: private key material`);
}

if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
  if (summary.generatedPages !== files.length) {
    errors.push(`summary generatedPages=${summary.generatedPages}, actual=${files.length}`);
  }
  if (summary.sourceFiles !== summary.publish + summary.archive + summary.deduplicate + summary.exclude) {
    errors.push("source disposition counts do not cover every file exactly once");
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Content audit passed: ${files.length} generated Markdown pages.`);
}

function walk(root) {
  const result = [];
  if (!fs.existsSync(root)) return result;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolutePath = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolutePath));
    else if (entry.name.endsWith(".md")) result.push(absolutePath);
  }
  return result;
}

function addUnique(index, key, relativePath, label) {
  const existing = index.get(key);
  if (existing) errors.push(`${relativePath}: duplicate ${label} with ${existing}`);
  else index.set(key, relativePath);
}

function hasBodyH1(content) {
  let fenced = false;
  for (const line of content.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (!fenced && /^#\s+/.test(line)) return true;
  }
  return false;
}
