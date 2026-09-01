import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { articleUrl, sectionMetadata, topicSlug } from "../lib/content";

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection("articles");
  const published = articles.filter((article) => article.data.status === "published");
  const selfCanonical = articles.filter((article) => !article.data.canonicalUrl);
  const topics = new Set(published.flatMap((article) => article.data.tags.map(topicSlug)));
  const paths = new Set([
    "/",
    "/archive/",
    ...Object.keys(sectionMetadata).map((section) => `/${section}/`),
    ...[...topics].map((topic) => `/topics/${topic}/`),
    ...selfCanonical.map(articleUrl)
  ]);

  const urls = [...paths]
    .sort()
    .map((pathname) => `<url><loc>${escapeXml(new URL(pathname, site).href)}</loc></url>`)
    .join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
