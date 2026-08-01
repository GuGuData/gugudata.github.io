import test from "node:test";
import assert from "node:assert/strict";
import {
  contentSimilarity,
  createSlug,
  extractCover,
  extractTitle,
  normalizeHeadingDepth,
  sanitizeSensitiveText
} from "../scripts/content-utils.mjs";

test("extractTitle supports plain API-document titles", () => {
  assert.equal(extractTitle({}, "中文转拼音 API 接口\n\n# 1. 产品功能", "api.md"), "中文转拼音 API 接口");
});

test("normalizeHeadingDepth preserves code fences and reserves H1 for the layout", () => {
  const input = "# Section\n\n## Child\n\n```md\n# Code heading\n```";
  assert.equal(normalizeHeadingDepth(input), "## Section\n\n### Child\n\n```md\n# Code heading\n```");
});

test("normalizeHeadingDepth repairs legacy code-fence languages", () => {
  assert.equal(normalizeHeadingDepth("```12:14:Project/File.swift\nlet value = 1\n```"), "```swift\nlet value = 1\n```");
});

test("normalizeHeadingDepth preserves Markdown hard breaks without trailing whitespace", () => {
  assert.equal(normalizeHeadingDepth("First line  \nSecond line "), "First line\\\nSecond line");
});

test("sanitizeSensitiveText redacts URL secrets and local paths", () => {
  const result = sanitizeSensitiveText("https://example.com/?secret=abc12345\n/Users/demo/private/file.md");
  assert.match(result.body, /secret=REDACTED/);
  assert.doesNotMatch(result.body, /\/Users\//);
});

test("sanitizeSensitiveText standardizes credential examples", () => {
  const result = sanitizeSensitiveText('Authorization: Bearer your-api-token\nvalidationKey="ABC123456789"'); // gitleaks:allow
  assert.match(result.body, /Authorization: Bearer YOUR_TOKEN/);
  assert.match(result.body, /validationKey="YOUR_VALUE"/);
});

test("sanitizeSensitiveText removes confirmed unavailable remote images", () => {
  const result = sanitizeSensitiveText([
    "![Legacy](https://image.devopen.club/legacy.png)",
    "![Logo](https://cdn.promplify.com/logo.png)",
    "![Available](https://cdn.promplify.com/available.png)"
  ].join("\n"));

  assert.doesNotMatch(result.body, /image\.devopen\.club|logo\.png/);
  assert.match(result.body, /available\.png/);
  assert.deepEqual(result.changes, ["removed-unavailable-remote-image"]);
});

test("extractCover skips confirmed unavailable remote images", () => {
  assert.equal(extractCover({ cover: "https://cdn.promplify.com/logo.png" }, ""), undefined);
  assert.equal(
    extractCover({ cover: "https://cdn.promplify.com/available.png" }, ""),
    "https://cdn.promplify.com/available.png"
  );
});

test("createSlug creates ASCII slugs for Chinese titles", () => {
  const slug = createSlug({ data: {}, relativePath: "目录/中文标题.md", title: "中文标题", section: "gugudata", hash: "1234567890" });
  assert.match(slug, /^[a-z0-9-]+$/);
});

test("contentSimilarity detects duplicate drafts", () => {
  const text = "这是一篇用于测试重复检测的文章。".repeat(30);
  assert.ok(contentSimilarity(text, `${text}\n`) > 0.99);
});
