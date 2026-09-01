# GuGuData Knowledge Base

GuGuData 的公开知识库与技术文章站点，使用 Astro 将经过审查的 Markdown 预渲染为静态 HTML，并通过 GitHub Pages 发布。

## Content policy

- `published` 内容可被站内搜索和搜索引擎索引。
- `archived` 内容在 `/archive/` 下保留供历史参考，保持可索引并进入 Sitemap，但不进入 RSS。
- 已存在明确官方来源的页面使用外部 canonical；其 GitHub Pages 副本不进入 Sitemap。
- 私有审查清单、排除项和原始 iCloud 文档不属于本仓库。

## Local development

需要 Node.js 24。

```shell
npm ci
npm run dev
```

完整验收命令：

```shell
npm run check:all
```

内容重新导入需要显式提供源目录和私有审查清单目录：

```shell
CONTENT_SOURCE_ROOT=/absolute/source/path \
AUDIT_OUTPUT_DIR=/absolute/private/audit/path \
npm run import:content
```

## Licenses

站点代码使用 [MIT License](./LICENSE-CODE)。文章、图片和其他内容的权利说明见 [CONTENT-LICENSE.md](./CONTENT-LICENSE.md)。
