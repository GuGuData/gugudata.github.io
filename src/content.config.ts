import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const sections = [
  "gugudata",
  "gugudata-io",
  "gugudata-ai",
  "gugujiankong",
  "biaomaiyun",
  "promplify",
  "langpdf",
  "jieqi",
  "parry-blog"
] as const;

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    section: z.enum(sections),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
    lang: z.enum(["zh-CN", "en"]),
    status: z.enum(["published", "archived"]),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    canonicalUrl: z.url().optional(),
    cover: z.url().optional(),
    author: z.string().default("GuGuData")
  })
});

export const collections = { articles };
