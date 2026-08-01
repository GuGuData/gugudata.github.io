import crypto from "node:crypto";
import path from "node:path";
import { pinyin } from "pinyin-pro";

export const SECTION_BY_ROOT = Object.freeze({
  GuGuData: "gugudata",
  "gugudata.io": "gugudata-io",
  "gugudata.ai": "gugudata-ai",
  "gugujiankong.com": "gugujiankong",
  GuGuJianKong: "gugujiankong",
  "biaomaiyun.com": "biaomaiyun",
  "promplify.com": "promplify",
  "langpdf.com": "langpdf",
  jieqi: "jieqi",
  "blog.parryqiu.com": "parry-blog",
  _archived: "parry-blog"
});

const PLACEHOLDER_PATTERN = /^(?:your[_-]?[a-z0-9_-]*|example|demo|test|token|password|secret|x{3,}|\*{3,}|<[^>]+>|\$\{[^}]+\}|\{\{[^}]+\}\})$/i;

export function normalizeText(value = "") {
  return value
    .normalize("NFKC")
    .replace(/\r\n/g, "\n")
    .replace(/[\t ]+/g, " ")
    .trim();
}

export function normalizeTitle(value = "") {
  return normalizeText(value)
    .replace(/^#+\s*/, "")
    .replace(/^title:\s*/i, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

export function normalizedTitleKey(value = "") {
  return normalizeTitle(value)
    .toLowerCase()
    .replace(/[\s\p{P}\p{S}]+/gu, "");
}

export function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function classifySection(relativePath) {
  const root = relativePath.split(path.sep)[0];
  return SECTION_BY_ROOT[root] ?? "parry-blog";
}

export function extractTitle(data, body, relativePath) {
  if (typeof data?.title === "string" && normalizeTitle(data.title)) {
    return normalizeTitle(data.title);
  }

  const lines = body.split(/\r?\n/);
  const firstMeaningful = lines.find((line) => {
    const text = line.trim();
    return text && !/^---$/.test(text) && !/^```/.test(text);
  });

  if (firstMeaningful) {
    const candidate = normalizeTitle(firstMeaningful);
    if (candidate.length <= 160 && !/^(?:[-*+]\s|>\s|!\[|\[.+\]\(|<)/.test(candidate)) {
      return candidate;
    }
  }

  return normalizeTitle(path.basename(relativePath, path.extname(relativePath)).replace(/[_-]+/g, " "));
}

export function removeExtractedTitle(body, title) {
  const lines = body.replace(/^\uFEFF/, "").split(/\r?\n/);
  const index = lines.findIndex((line) => line.trim());
  if (index >= 0 && normalizedTitleKey(lines[index]) === normalizedTitleKey(title)) {
    lines.splice(index, 1);
  }
  return lines.join("\n").replace(/^\s+/, "");
}

export function sanitizeSensitiveText(body) {
  let result = body;
  const changes = [];

  const corruptedLegacyAssetMarker = /(?:<!--\s*m?)?https:\/\/oindk07nf\.qnssl\.com(?!\/)/gi;
  result = result.replace(corruptedLegacyAssetMarker, () => {
    changes.push("removed-corrupted-legacy-asset-marker");
    return "";
  });

  const unavailableRemoteImage = /!\[[^\]]*\]\((https:\/\/(?:image\.devopen\.club\/[^)\s]+|cdn\.promplify\.com\/logo\.png))(?:\s+["'][^"']*["'])?\)/gi;
  result = result.replace(unavailableRemoteImage, () => {
    changes.push("removed-unavailable-remote-image");
    return "";
  });

  const secretQuery = /([?&](?:secret|token|password|passwd|appkey|access[_-]?key|api[_-]?key)=)([^&#\s)]+)/gi;
  result = result.replace(secretQuery, (_match, prefix, value) => {
    if (!PLACEHOLDER_PATTERN.test(value)) changes.push("redacted-sensitive-query-parameter");
    return `${prefix}REDACTED`;
  });

  const credentialAssignment = /(\b(?:password|passwd|secret(?:Key)?|accessKey|apiKey|token)\b\s*[:=]\s*["'`])([^"'`\s]{4,})(["'`])/gi;
  result = result.replace(credentialAssignment, (_match, prefix, value, suffix) => {
    if (PLACEHOLDER_PATTERN.test(value)) return `${prefix}${value}${suffix}`;
    changes.push("redacted-credential-example");
    return `${prefix}YOUR_VALUE${suffix}`;
  });

  const authorization = /(Authorization\s*:\s*(?:Bearer|Basic)\s+)([^\s'"`]+)/gi;
  result = result.replace(authorization, (_match, prefix, value) => {
    changes.push(PLACEHOLDER_PATTERN.test(value) ? "standardized-authorization-placeholder" : "redacted-authorization-example");
    return `${prefix}YOUR_TOKEN`;
  });

  const machineKeyAttribute = /(\b(?:validationKey|decryptionKey)\s*=\s*["'])([^"']+)(["'])/gi;
  result = result.replace(machineKeyAttribute, (_match, prefix, value, suffix) => {
    if (PLACEHOLDER_PATTERN.test(value)) return `${prefix}${value}${suffix}`;
    changes.push("redacted-machine-key-example");
    return `${prefix}YOUR_VALUE${suffix}`;
  });

  const localPath = /\/(?:Users|home)\/[A-Za-z0-9._-]+\/(?:[^\s)\]}>"']+)/g;
  result = result.replace(localPath, () => {
    changes.push("removed-absolute-local-path");
    return "本地文件";
  });

  const unavailableLocalImage = /!\[[^\]]*\]\(<?本地文件>?(?:\s+["'][^"']*["'])?\)/gi;
  result = result.replace(unavailableLocalImage, () => {
    changes.push("removed-missing-local-image-placeholder");
    return "";
  });

  const backupNotice = /^>\s*Backup captured from .+$/gim;
  result = result.replace(backupNotice, () => {
    changes.push("removed-platform-backup-notice");
    return "";
  });

  const internalFileLink = /\[oai_citation:\d+‡([^\]]+)\]\(file-service:\/\/[^)]+\)/gi;
  result = result.replace(internalFileLink, (_match, label) => {
    changes.push("removed-internal-file-link");
    return label;
  });

  const malformedHttpLink = /\[(https?:\/\/[^\]]+)\]\(\[(https?:\/\/[^\]]+)\]\)/gi;
  result = result.replace(malformedHttpLink, (_match, label, target) => {
    changes.push("repaired-malformed-http-link");
    return `[${label}](${target})`;
  });

  result = result.replace(/\[LICENSE\]\(LICENSE\)/g, () => {
    changes.push("relinked-content-license");
    return "[内容版权说明](/content-license/)";
  });

  return { body: result.replace(/\n{3,}/g, "\n\n").trim(), changes: [...new Set(changes)] };
}

export function normalizeHeadingDepth(body) {
  let whitespaceFence = false;
  const lines = body.split(/\r?\n/).map((line) => {
    let normalized = line;
    if (/^```Shell\s*$/.test(normalized)) normalized = "```shell";
    if (/^```\d+:\d+:.+\.swift\s*$/i.test(normalized)) normalized = "```swift";
    const isFence = /^\s*(```|~~~)/.test(normalized);
    const hardBreak = !whitespaceFence && / {2,}$/.test(normalized);
    normalized = normalized.trimEnd();
    if (hardBreak) normalized += "\\";
    if (isFence) whitespaceFence = !whitespaceFence;
    return normalized;
  });
  let fenced = false;
  let hasH1 = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (!fenced && /^#\s+/.test(line)) hasH1 = true;
  }
  if (!hasH1) return lines.join("\n");

  fenced = false;
  return lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        fenced = !fenced;
        return line;
      }
      if (fenced) return line;
      const match = line.match(/^(#{1,5})(\s+.*)$/);
      return match ? `${match[1]}#${match[2]}` : line;
    })
    .join("\n");
}

export function stripMarkdown(value = "") {
  return normalizeText(value)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~>#|]/g, "")
    .replace(/^[-+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildDescription(data, body, title) {
  const explicit = data?.description ?? data?.summary ?? data?.excerpt;
  if (typeof explicit === "string" && stripMarkdown(explicit)) {
    return truncate(stripMarkdown(explicit), 160);
  }

  const paragraphs = body.split(/\n\s*\n/);
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed || /^(?:#|```|~~~|!\[|\|)/.test(trimmed)) continue;
    const candidate = stripMarkdown(trimmed);
    if (candidate.length >= 20) return truncate(candidate, 160);
  }
  return truncate(`${title}，GuGuData 公开知识库文章。`, 160);
}

export function detectLanguage(value) {
  const chars = value.replace(/\s/g, "");
  if (!chars) return "zh-CN";
  const cjk = (chars.match(/[\u3400-\u9fff]/g) ?? []).length;
  return cjk / chars.length >= 0.08 ? "zh-CN" : "en";
}

export function extractCanonical(data, body) {
  const explicit = data?.canonicalUrl ?? data?.canonical_url ?? data?.canonical;
  if (isHttpUrl(explicit)) return explicit;

  const markers = [
    /\*\*接口详情官网地址:\*\*\s*\[[^\]]+\]\((https:\/\/[^)]+)\)/i,
    /产品案例页：\s*\[[^\]]+\]\((https:\/\/[^)]+)\)/i
  ];
  for (const marker of markers) {
    const match = body.match(marker);
    if (match && isHttpUrl(match[1])) return match[1];
  }

  const officialWebsite = body.match(/官方网站：\s*\[[^\]]+\]\((https:\/\/[^)]+)\)/i)?.[1];
  if (isOwnedProductUrl(officialWebsite)) return officialWebsite;
  return undefined;
}

function isOwnedProductUrl(value) {
  if (!isHttpUrl(value)) return false;
  const hostname = new URL(value).hostname.replace(/^www\./, "");
  return new Set([
    "gugudata.com",
    "gugudata.io",
    "gugudata.ai",
    "gugujiankong.com",
    "biaomaiyun.com",
    "promplify.com",
    "langpdf.com"
  ]).has(hostname);
}

export function extractCover(data, body) {
  const explicit = data?.cover ?? data?.cover_image;
  if (isHttpUrl(explicit) && !isUnavailableRemoteImage(explicit)) return explicit;
  const match = body.match(/!\[[^\]]*\]\((https:\/\/[^)\s]+)(?:\s+["'][^"']*["'])?\)/i);
  return match && !isUnavailableRemoteImage(match[1]) ? match[1] : undefined;
}

function isUnavailableRemoteImage(value) {
  if (!isHttpUrl(value)) return false;
  const url = new URL(value);
  return url.hostname === "image.devopen.club"
    || (url.hostname === "cdn.promplify.com" && url.pathname === "/logo.png");
}

export function normalizeTags(data, section, title) {
  const raw = data?.tags ?? data?.tag ?? data?.categories ?? data?.category ?? [];
  const list = Array.isArray(raw) ? raw : String(raw).split(/[,，|/]/);
  const tags = list.map((tag) => stripMarkdown(String(tag))).filter(Boolean);
  if (/\bAPI\b/i.test(title)) tags.unshift("API");
  if (/AI|人工智能|大模型|RAG/i.test(title)) tags.unshift("AI");
  tags.push(sectionLabel(section));
  return [...new Set(tags)].slice(0, 6);
}

export function sectionLabel(section) {
  const labels = {
    gugudata: "GuGuData",
    "gugudata-io": "GuGuData.io",
    "gugudata-ai": "GuGuData.AI",
    gugujiankong: "GuGuJianKong",
    biaomaiyun: "Biaomaiyun",
    promplify: "Promplify",
    langpdf: "LangPDF",
    jieqi: "节气",
    "parry-blog": "技术文章"
  };
  return labels[section] ?? section;
}

export function classifyDisposition(relativePath, body) {
  const normalized = relativePath.replaceAll(path.sep, "/");
  const basename = path.basename(normalized);
  const reasons = [];

  if (/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/i.test(body)) {
    return { disposition: "exclude", reasons: ["private-key-material"] };
  }
  if (/\b(?:10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})\b/.test(body)) {
    return { disposition: "exclude", reasons: ["private-network-address"] };
  }
  if (/(?:mongodb|postgres(?:ql)?|mysql|redis):\/\/[^\s)]+/i.test(body)) {
    return { disposition: "exclude", reasons: ["connection-string"] };
  }
  if (/GuGuData\/咕咕数据 \(www\.gugudata\.com\) API\.md$/i.test(normalized)) {
    return { disposition: "exclude", reasons: ["generated-api-bundle"] };
  }
  if (/GuGuData\/footer\.md$/i.test(normalized)) {
    return { disposition: "exclude", reasons: ["shared-footer-fragment"] };
  }
  if (/flowcharts\/README\.md$/i.test(normalized)) {
    return { disposition: "exclude", reasons: ["asset-readme"] };
  }
  if (/(?:^|\/)(?:_?archived|_?legacy)(?:\/|$)/i.test(normalized)) reasons.push("archived-source");
  if (/(?:backup|draft|unsaved|备份)/i.test(normalized)) reasons.push("backup-or-draft");
  if (/\s+2\.md$/i.test(basename)) reasons.push("copy-suffix");
  if (/(?:^|\/)(?:README|intro|changelog|answers|site|appstore|xhs|xiaohongshu|项目创建指南|大纲)(?:[_-][^/]*)?\.md$/i.test(normalized)) {
    reasons.push("reference-or-helper-document");
  }

  return reasons.length
    ? { disposition: "archive", reasons }
    : { disposition: "publish", reasons: ["public-content"] };
}

export function createSlug({ data, relativePath, title, section, hash }) {
  const explicit = typeof data?.slug === "string" ? data.slug : "";
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(explicit) && explicit.length <= 80) return explicit;

  const basename = path.basename(relativePath, path.extname(relativePath));
  let candidate = basename
    .replace(/^\d+[-_]?/, "")
    .replace(/\s+2$/i, "")
    .replace(/(?:^|[_-])(?:api[_-]?intro|backup|draft|unsaved)(?:[_-]|$)/gi, "-")
    .replace(/[_\s.]+/g, "-");

  if (!/[a-z]/i.test(candidate)) {
    candidate = pinyin(title, { toneType: "none", type: "array" }).join("-");
  }
  candidate = slugify(candidate);
  if (!candidate) candidate = `${section}-${hash.slice(0, 8)}`;
  return candidate.slice(0, 80).replace(/-+$/g, "");
}

export function ensureUniqueSlug(candidate, used, hash) {
  if (!used.has(candidate)) {
    used.add(candidate);
    return candidate;
  }
  const suffix = hash.slice(0, 7);
  const base = candidate.slice(0, 80 - suffix.length - 1).replace(/-+$/g, "");
  const unique = `${base}-${suffix}`;
  used.add(unique);
  return unique;
}

export function contentSimilarity(left, right) {
  const a = shingles(normalizeForSimilarity(left));
  const b = shingles(normalizeForSimilarity(right));
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

export function yamlFrontmatter(data) {
  const ordered = [
    "title",
    "description",
    "section",
    "slug",
    "lang",
    "status",
    "tags",
    "publishedAt",
    "updatedAt",
    "canonicalUrl",
    "cover",
    "author"
  ];
  const lines = ["---"];
  for (const key of ordered) {
    const value = data[key];
    if (value === undefined || value === null || value === "") continue;
    lines.push(`${key}: ${JSON.stringify(value)}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

export function isHttpUrl(value) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function normalizeForSimilarity(value) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/---[\s\S]*?---/, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[\s\p{P}\p{S}]+/gu, "");
}

function shingles(value, width = 12) {
  const result = new Set();
  if (value.length <= width) {
    if (value) result.add(value);
    return result;
  }
  for (let index = 0; index <= value.length - width; index += 1) {
    result.add(value.slice(index, index + width));
  }
  return result;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function truncate(value, length) {
  return value.length <= length ? value : `${value.slice(0, length - 1).trim()}…`;
}
