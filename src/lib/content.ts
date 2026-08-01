import type { CollectionEntry } from "astro:content";
import { pinyin } from "pinyin-pro";

export type Article = CollectionEntry<"articles">;

export const sectionMetadata = {
  gugudata: { label: "GuGuData", description: "数据 API、开发指南与产品实践" },
  "gugudata-io": { label: "GuGuData.io", description: "面向开发者的数据接口与集成文章" },
  "gugudata-ai": { label: "GuGuData.AI", description: "AI 产品、应用与知识工程" },
  gugujiankong: { label: "GuGuJianKong", description: "网站、API 与设备监控实践" },
  biaomaiyun: { label: "Biaomaiyun", description: "企业情报、招采数据与 AI 工作流" },
  promplify: { label: "Promplify", description: "提示工程与 AI 应用案例" },
  langpdf: { label: "LangPDF", description: "文档翻译、转换与处理" },
  jieqi: { label: "节气", description: "二十四节气应用与文化内容" },
  "parry-blog": { label: "Parry Blog", description: "软件开发、前端与移动技术文章" }
} as const;

export function articleUrl(article: Article) {
  const prefix = article.data.status === "archived" ? "/archive" : "";
  return `${prefix}/${article.data.section}/${article.data.slug}/`;
}

export function topicSlug(topic: string) {
  const transliterated = pinyin(topic, { toneType: "none", nonZh: "consecutive", separator: "-" });
  return transliterated
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function compareArticles(left: Article, right: Article) {
  const leftDate = left.data.updatedAt ?? left.data.publishedAt;
  const rightDate = right.data.updatedAt ?? right.data.publishedAt;
  return (rightDate?.getTime() ?? 0) - (leftDate?.getTime() ?? 0) || left.data.title.localeCompare(right.data.title, "zh-CN");
}

export function formatDate(date?: Date) {
  return date
    ? new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date).replaceAll("/", "-")
    : "日期未标注";
}

export function readingMinutes(body: string) {
  const chineseCharacters = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
  const words = body.replace(/[\u3400-\u9fff]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(chineseCharacters / 350 + words / 220));
}
