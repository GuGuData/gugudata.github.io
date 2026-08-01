import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";
import {
  buildDescription,
  classifyDisposition,
  classifySection,
  contentSimilarity,
  createSlug,
  detectLanguage,
  ensureUniqueSlug,
  extractCanonical,
  extractCover,
  extractTitle,
  normalizeHeadingDepth,
  normalizeTags,
  normalizedTitleKey,
  removeExtractedTitle,
  sanitizeSensitiveText,
  sha256,
  yamlFrontmatter
} from "./content-utils.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = process.env.CONTENT_SOURCE_ROOT;
const auditOutputDir = process.env.AUDIT_OUTPUT_DIR ?? path.join(projectRoot, ".audit");
const contentOutputDir = path.join(projectRoot, "src", "content", "articles");
const dataOutputDir = path.join(projectRoot, "src", "data");
const publicAssetsDir = path.join(projectRoot, "public", "assets", "imported");
const cdnImageMap = readJson(path.join(dataOutputDir, "cdn-image-map.json"));
const sectionCovers = readJson(path.join(dataOutputDir, "section-covers.json"));

if (!sourceRoot || !fs.existsSync(sourceRoot)) {
  throw new Error("CONTENT_SOURCE_ROOT must point to the Markdown source directory.");
}

const sourceGitDates = collectGitDates(sourceRoot);
const sourceFiles = walkMarkdown(sourceRoot);
const records = sourceFiles.map(loadSourceRecord);
applyDuplicateDisposition(records);
normalizeDuplicateTitles(records);

fs.rmSync(contentOutputDir, { recursive: true, force: true });
fs.mkdirSync(contentOutputDir, { recursive: true });
fs.mkdirSync(dataOutputDir, { recursive: true });
fs.mkdirSync(publicAssetsDir, { recursive: true });
fs.mkdirSync(auditOutputDir, { recursive: true });

const usedSlugs = new Set();
for (const record of records) {
  if (!record.outputStatus) continue;

  const rawSlug = createSlug(record);
  record.slug = ensureUniqueSlug(rawSlug, usedSlugs, record.hash);
  record.outputRelativePath = `${record.section}/${record.slug}.md`;

  const migratedImages = migrateLocalImages(record);
  record.body = migratedImages.body;
  record.changes.push(...migratedImages.changes);
  if (migratedImages.missing.length) {
    record.missingImages = migratedImages.missing;
    record.outputStatus = "archived";
    record.disposition = "archive";
    record.reasons.push("missing-local-image");
  }

  const rewrittenImages = rewriteRemoteImages(record);
  record.body = rewrittenImages.body;
  record.cover = rewrittenImages.cover;
  record.changes.push(...rewrittenImages.changes);

  const frontmatter = {
    title: record.title,
    description: record.description,
    section: record.section,
    slug: record.slug,
    lang: record.lang,
    status: record.outputStatus,
    tags: record.tags,
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt,
    canonicalUrl: record.canonicalUrl,
    cover: record.cover,
    author: record.author
  };

  const destination = path.join(contentOutputDir, record.outputRelativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, `${yamlFrontmatter(frontmatter)}${record.body.trim()}\n`, "utf8");
}

const summary = buildSummary(records);
fs.writeFileSync(path.join(dataOutputDir, "content-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync(path.join(auditOutputDir, "github-pages-content-manifest.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), sourceCount: records.length, summary, records: records.map(toAuditRecord) }, null, 2)}\n`);
fs.writeFileSync(path.join(auditOutputDir, "github-pages-content-audit.md"), buildAuditMarkdown(records, summary));

console.log(JSON.stringify(summary, null, 2));

function walkMarkdown(root) {
  const result = [];
  const visitDirectory = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === ".git") continue;
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) visitDirectory(absolutePath);
      else if (/\.(?:md|markdown)$/i.test(entry.name)) result.push(absolutePath);
    }
  };
  visitDirectory(root);
  return result.sort((left, right) => left.localeCompare(right, "en"));
}

function loadSourceRecord(absolutePath) {
  const relativePath = path.relative(sourceRoot, absolutePath);
  const raw = fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
  const parsed = matter(raw);
  const title = extractTitle(parsed.data, parsed.content, relativePath);
  const withoutTitle = removeExtractedTitle(parsed.content, title);
  const sanitized = sanitizeSensitiveText(withoutTitle);
  const body = normalizeHeadingDepth(sanitized.body);
  const section = classifySection(relativePath);
  const baseDisposition = classifyDisposition(relativePath, raw);
  const hash = sha256(raw);
  const dates = sourceGitDates.get(relativePath.replaceAll(path.sep, "/")) ?? {};
  const publishedAt = validDateString(parsed.data.publishedAt ?? parsed.data.date ?? dates.createdAt);
  const updatedAt = validDateString(parsed.data.updatedAt ?? parsed.data.updated ?? dates.updatedAt);
  const canonicalUrl = extractCanonical(parsed.data, body);
  const cover = extractCover(parsed.data, body);
  const outputStatus = baseDisposition.disposition === "publish"
    ? "published"
    : baseDisposition.disposition === "archive"
      ? "archived"
      : undefined;

  if (!body.trim()) {
    baseDisposition.disposition = "exclude";
    baseDisposition.reasons.push("empty-body");
  }

  return {
    absolutePath,
    relativePath,
    data: parsed.data,
    raw,
    hash,
    title,
    body,
    section,
    lang: detectLanguage(`${title}\n${body}`),
    status: outputStatus,
    outputStatus: baseDisposition.disposition === "exclude" ? undefined : outputStatus,
    disposition: baseDisposition.disposition,
    reasons: [...new Set(baseDisposition.reasons)],
    changes: sanitized.changes,
    description: buildDescription(parsed.data, body, title),
    tags: normalizeTags(parsed.data, section, title),
    publishedAt,
    updatedAt,
    canonicalUrl,
    cover,
    author: section === "parry-blog" ? "Parry Qiu" : "GuGuData",
    outputRelativePath: ""
  };
}

function applyDuplicateDisposition(allRecords) {
  const byHash = groupBy(allRecords, (record) => record.hash);
  for (const group of byHash.values()) {
    if (group.length < 2) continue;
    const winner = chooseWinner(group);
    for (const record of group) {
      if (record === winner) continue;
      markDuplicate(record, winner, "exact-duplicate");
    }
  }

  const byTitle = groupBy(allRecords.filter((record) => record.disposition !== "deduplicate"), (record) => normalizedTitleKey(record.title));
  for (const group of byTitle.values()) {
    if (group.length < 2) continue;
    const winner = chooseWinner(group);
    for (const record of group) {
      if (record === winner || record.disposition === "deduplicate") continue;
      const copyPair = /\s+2\.md$/i.test(record.relativePath) || record.reasons.includes("backup-or-draft");
      const similarity = contentSimilarity(winner.body, record.body);
      record.similarityToPrimary = Number(similarity.toFixed(4));
      if (copyPair || similarity >= 0.82) markDuplicate(record, winner, "near-duplicate");
    }
  }
}

function normalizeDuplicateTitles(allRecords) {
  const emitted = allRecords.filter((record) => record.outputStatus);
  const byTitle = groupBy(emitted, (record) => normalizedTitleKey(record.title));
  for (const group of byTitle.values()) {
    if (group.length < 2) continue;
    const winner = chooseWinner(group);
    for (const record of group) {
      if (record === winner) continue;
      const context = path.basename(record.relativePath, path.extname(record.relativePath))
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      record.title = `${record.title}（历史资料：${context}）`;
      record.description = buildDescription(record.data, record.body, record.title);
      record.changes.push("disambiguated-duplicate-title");
      record.outputStatus = "archived";
      record.disposition = "archive";
      record.reasons.push("duplicate-title-historical-variant");
    }
  }
}

function chooseWinner(group) {
  return [...group].sort((left, right) => scoreRecord(right) - scoreRecord(left) || left.relativePath.localeCompare(right.relativePath, "en"))[0];
}

function scoreRecord(record) {
  let score = record.disposition === "publish" ? 100 : record.disposition === "archive" ? 10 : 0;
  if (record.reasons.includes("backup-or-draft")) score -= 30;
  if (record.reasons.includes("copy-suffix")) score -= 20;
  if (record.reasons.includes("archived-source")) score -= 10;
  return score;
}

function markDuplicate(record, winner, reason) {
  record.disposition = "deduplicate";
  record.outputStatus = undefined;
  record.duplicateOf = winner.relativePath;
  record.reasons = [...new Set([...record.reasons, reason])];
}

function migrateLocalImages(record) {
  const missing = [];
  const changes = [];
  const body = record.body.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g, (match, alt, source) => {
    if (/^(?:https?:|data:)/i.test(source)) return match;
    const cleanSource = decodeURI(source.replace(/^<|>$/g, "").split(/[?#]/)[0]);
    const absoluteAsset = path.isAbsolute(cleanSource)
      ? cleanSource
      : path.resolve(path.dirname(record.absolutePath), cleanSource);
    if (!fs.existsSync(absoluteAsset) || !fs.statSync(absoluteAsset).isFile()) {
      missing.push(source);
      return alt ? `> 图片已失效：${alt}` : "";
    }
    const extension = path.extname(absoluteAsset).toLowerCase() || ".bin";
    const assetName = `${sha256(fs.readFileSync(absoluteAsset)).slice(0, 16)}${extension}`;
    fs.copyFileSync(absoluteAsset, path.join(publicAssetsDir, assetName));
    changes.push("copied-local-image");
    return `![${alt}](/assets/imported/${assetName})`;
  });
  return { body, missing, changes };
}

function rewriteRemoteImages(record) {
  const changes = [];
  const body = record.body.replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)(?:\s+["'][^"']*["'])?\)/gi, (match, alt, source) => {
    if (!Object.hasOwn(cdnImageMap, source)) return match;
    const cdnUrl = cdnImageMap[source];
    if (!cdnUrl) {
      changes.push("removed-unavailable-remote-image");
      return `> 原图已失效：${alt || "历史图片"}`;
    }
    changes.push("migrated-remote-image-to-cdn");
    return `![${alt}](${cdnUrl})`;
  });

  let cover = record.cover;
  if (cover && Object.hasOwn(cdnImageMap, cover)) {
    cover = cdnImageMap[cover] ?? undefined;
    changes.push(cover ? "migrated-cover-to-cdn" : "removed-unavailable-cover");
  }
  cover = cover ?? extractCover({}, body) ?? sectionCovers[record.section];
  if (!record.cover && cover === sectionCovers[record.section]) changes.push("assigned-section-cover");

  return { body, cover, changes: [...new Set(changes)] };
}

function readJson(file) {
  if (!fs.existsSync(file)) throw new Error(`Missing required data file: ${file}`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function collectGitDates(root) {
  const result = new Map();
  try {
    const output = execFileSync("git", ["-C", root, "log", "--format=@@@%aI", "--name-only", "--", "."], {
      encoding: "utf8",
      maxBuffer: 50 * 1024 * 1024
    });
    let currentDate;
    for (const line of output.split(/\r?\n/)) {
      if (line.startsWith("@@@")) {
        currentDate = line.slice(3);
        continue;
      }
      if (!currentDate || !line.trim()) continue;
      const normalized = line.replaceAll("\\", "/");
      const existing = result.get(normalized);
      if (!existing) result.set(normalized, { createdAt: currentDate, updatedAt: currentDate });
      else existing.createdAt = currentDate;
    }
  } catch {
    return new Map();
  }
  return result;
}

function validDateString(value) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function groupBy(items, keySelector) {
  const result = new Map();
  for (const item of items) {
    const key = keySelector(item);
    const values = result.get(key) ?? [];
    values.push(item);
    result.set(key, values);
  }
  return result;
}

function buildSummary(allRecords) {
  const dispositionCounts = countBy(allRecords, (record) => record.disposition);
  const publishedRecords = allRecords.filter((record) => record.outputStatus === "published");
  const archivedRecords = allRecords.filter((record) => record.outputStatus === "archived");
  return {
    sourceFiles: allRecords.length,
    publish: dispositionCounts.publish ?? 0,
    archive: dispositionCounts.archive ?? 0,
    deduplicate: dispositionCounts.deduplicate ?? 0,
    exclude: dispositionCounts.exclude ?? 0,
    generatedPages: publishedRecords.length + archivedRecords.length,
    publishedPages: publishedRecords.length,
    archivedPages: archivedRecords.length,
    externalCanonicalPages: publishedRecords.filter((record) => record.canonicalUrl).length,
    sanitizedFiles: allRecords.filter((record) => record.changes.length).length,
    sections: countBy([...publishedRecords, ...archivedRecords], (record) => record.section)
  };
}

function countBy(items, keySelector) {
  const result = {};
  for (const item of items) {
    const key = keySelector(item);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

function toAuditRecord(record) {
  return {
    sourceRelativePath: record.relativePath,
    sha256: record.hash,
    detectedTitle: record.title,
    disposition: record.disposition,
    reasons: [...new Set(record.reasons)],
    outputRelativePath: record.outputRelativePath,
    slug: record.slug,
    canonicalUrl: record.canonicalUrl,
    redactions: [...new Set(record.changes)],
    duplicateOf: record.duplicateOf,
    similarityToPrimary: record.similarityToPrimary,
    missingImages: record.missingImages
  };
}

function buildAuditMarkdown(allRecords, summary) {
  const lines = [
    "# GuGuData GitHub Pages 内容审查报告",
    "",
    `生成时间：${new Date().toISOString()}`,
    "",
    "## 汇总",
    "",
    "| 指标 | 数量 |",
    "| --- | ---: |",
    `| 源 Markdown | ${summary.sourceFiles} |`,
    `| 发布 | ${summary.publish} |`,
    `| 归档且不索引 | ${summary.archive} |`,
    `| 去重 | ${summary.deduplicate} |`,
    `| 排除 | ${summary.exclude} |`,
    `| 生成页面 | ${summary.generatedPages} |`,
    `| 已脱敏文件 | ${summary.sanitizedFiles} |`,
    "",
    "## 全量处置清单",
    "",
    "| 源文件 | 处置 | 原因 | 输出 | Canonical | 脱敏 |",
    "| --- | --- | --- | --- | --- | --- |"
  ];
  for (const record of allRecords) {
    lines.push(`| ${escapeCell(record.relativePath)} | ${record.disposition} | ${escapeCell([...new Set(record.reasons)].join(", "))} | ${escapeCell(record.outputRelativePath ?? "-")} | ${escapeCell(record.canonicalUrl ?? "-")} | ${escapeCell([...new Set(record.changes)].join(", ") || "-")} |`);
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replace(/\r?\n/g, " ");
}
