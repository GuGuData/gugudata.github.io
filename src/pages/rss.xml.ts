import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { articleUrl, compareArticles } from "../lib/content";

export const GET: APIRoute = async (context) => {
  const articles = (await getCollection("articles", ({ data }) =>
    data.status === "published" && Boolean(data.updatedAt ?? data.publishedAt)
  )).sort(compareArticles);
  return rss({
    title: "咕咕数据知识库",
    description: "GuGuData API 文档、技术文章与产品实践。",
    site: context.site ?? "https://gugudata.github.io",
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      link: articleUrl(article),
      pubDate: (article.data.updatedAt ?? article.data.publishedAt)!,
      categories: article.data.tags,
      author: article.data.author
    })),
    customData: "<language>zh-CN</language>"
  });
};
