---
title: "用财经公告、网页正文和 AI 摘要接口构建投研简报 Agent"
description: "摘要:投研简报需要把公告、新闻、网页正文和结构化分析放在同一个流程里。本文演示如何使用港股公告、公众号文章、技术博文、任意链接正文抓取、文章抽取、摘要、关键词和情感分析接口,构建一个自动生成简报的 Agent。"
section: "gugudata"
slug: "financial-news-report-agent"
lang: "zh-CN"
status: "published"
tags: ["AI","GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/017_financial_news_report_agent.png"
author: "GuGuData"
---
摘要：投研简报需要把公告、新闻、网页正文和结构化分析放在同一个流程里。本文演示如何使用港股公告、公众号文章、技术博文、任意链接正文抓取、文章抽取、摘要、关键词和情感分析接口，构建一个自动生成简报的 Agent。

关键词：投研简报 Agent、财经新闻抓取 API、公告数据 API、文章摘要 API、关键词提取 API

## 问题背景

投研或行业分析每天都要处理大量内容：公司公告、新闻文章、行业博客、公众号文章、研报链接和市场评论。人工整理耗时，直接让模型联网总结又难以保证来源和可复核性。

更合适的做法是把内容来源、正文抽取、结构化处理和简报生成分开。Agent 负责决定抓哪些来源、如何去重、哪些内容需要进入简报，接口负责提供稳定的数据和文本处理能力。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/017_financial_news_report_agent.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 港股公告 | [港股上市公司公告](https://www.gugudata.com/api/details/stockhkbulletin) | GET | 获取港股上市公司公告 |
| 公众号文章 | [公众号头条文章](https://www.gugudata.com/api/details/wxarticle) | GET | 获取公众号文章来源 |
| 技术博客 | [软件开发技术博文头条](https://www.gugudata.com/api/details/techblogs) | GET | 适合技术行业简报来源 |
| 正文抓取 | [获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent) | POST | 从 URL 抽取正文内容 |
| 文章抽取 | [文章抽取信息化 JSON](https://www.gugudata.com/api/details/article-extract) | POST | 生成更结构化的文章信息 |
| 文本摘要 | [文本多语言 AI 摘要](https://www.gugudata.com/api/details/summarize-text) | POST | 生成简报摘要 |
| 关键词 | [多语言长文本 AI 关键字提取](https://www.gugudata.com/api/details/keyword-extraction) | POST | 提取主题词 |
| 情感分析 | [多语言文本 AI 情感分析](https://www.gugudata.com/api/details/sentiment-analysis) | POST | 判断内容倾向 |

## 调用示例

获取港股公告：

```bash
curl -G "https://api.gugudata.com/stock/hk/bulletin" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "symbol=00700"
```

抓取任意链接正文：

```bash
curl -X POST "https://api.gugudata.com/news/fetchcontent?appkey=REDACTED \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/news/article"
  }'
```

生成摘要：

```bash
curl -X POST "https://api.gugudata.com/ai/text-summarize?appkey=REDACTED&lang=zh-cn&streaming=false" \
  -H "Content-Type: application/json" \
  -d '{
    "textContent": "这里放入正文内容",
    "streaming": false
  }'
```

Agent 可以先做来源去重：

```python
from hashlib import sha256

def source_fingerprint(title: str, url: str) -> str:
    """Build a stable fingerprint for report source dedupe."""
    normalized = f"{title.strip()}|{url.strip()}".lower()
    return sha256(normalized.encode("utf-8")).hexdigest()
```

## 简报结构设计

投研简报不应该只是若干摘要拼接。建议结构如下：

| 区块 | 内容 |
| --- | --- |
| 今日重点 | 按影响程度排列的 3 到 5 条内容 |
| 公司动态 | 公告、财报、重大事项 |
| 行业主题 | 关键词聚合后的行业变化 |
| 情绪变化 | 正负面内容比例和重点来源 |
| 来源索引 | 原始链接、发布时间、处理时间 |

这样输出既能快速阅读，也能回到来源复核。Agent 不应隐藏来源，也不应把不同来源的观点混成一个未经验证的事实。

## 标准架构拆解

投研简报 Agent 可以拆成以下模块：

| 模块 | 责任 |
| --- | --- |
| 来源管理 | 管理公告、新闻、公众号、行业站点和关键词 |
| 内容抓取 | 抓取正文、图片或结构化文章信息 |
| 文本处理 | 摘要、关键词、情感分析、去重 |
| 主题聚合 | 将相近内容合并成简报主题 |
| 简报输出 | 生成日报、周报或专题报告 |

来源管理很重要。一个可靠的简报系统应该知道每条内容来自哪里、什么时候抓取、是否已被使用，而不是每次让模型重新搜索。

## 数据流与接口边界

推荐流程如下：

1. 按公司、行业或关键词生成抓取任务。
2. 获取公告、公众号文章或指定链接。
3. 对 URL 做去重和状态检查。
4. 调用正文抓取或文章抽取接口。
5. 对正文生成摘要、关键词和情感标签。
6. 按主题聚合内容。
7. 输出简报，并保留来源索引。

接口边界上，正文抓取是内容输入，摘要和关键词是加工结果，简报排序是业务规则。模型可以帮助写得更清楚，但不能替代来源审计。

## 错误处理

如果某个 URL 抓取失败，应保留失败状态和来源，不要让模型根据标题补正文。如果摘要接口失败，可以先保存正文，稍后重试摘要。对于重复内容，应合并来源，不要重复进入简报。

当情感分析和人工判断不一致时，情感标签应作为辅助指标，而不是自动决定内容是否进入报告。

## 可靠性与观测

建议记录以下指标：

| 指标 | 用途 |
| --- | --- |
| source_fetch_success_rate | 来源抓取成功率 |
| duplicate_source_count | 重复来源数量 |
| summary_success_rate | 摘要生成成功率 |
| keyword_coverage_rate | 关键词覆盖率 |
| brief_publish_latency_ms | 简报生成耗时 |

当抓取成功率下降时，要先区分是来源站点变化、链接失效，还是接口调用失败。简报系统需要按来源维度观察，而不是只看总成功率。

## 落地清单

- 每条内容保存原始 URL、标题、来源和抓取时间。
- 简报里展示来源索引，方便复核。
- 摘要失败不丢弃正文，允许异步重试。
- 去重规则先基于 URL 和标题，再补充语义相似度。
- 简报文本保持事实和观点分离。

## 可扩展方向

这个 Agent 可以继续接入 A 股财报 AI 智能解读接口，把公告、行情和财报分析整合到同一份公司日报；也可以接入网页截图接口，为重要页面保存快照。

## 相关接口

- [港股上市公司公告](https://www.gugudata.com/api/details/stockhkbulletin)
- [公众号头条文章](https://www.gugudata.com/api/details/wxarticle)
- [软件开发技术博文头条](https://www.gugudata.com/api/details/techblogs)
- [获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent)
- [文章抽取信息化 JSON](https://www.gugudata.com/api/details/article-extract)
- [文本多语言 AI 摘要](https://www.gugudata.com/api/details/summarize-text)
- [多语言长文本 AI 关键字提取](https://www.gugudata.com/api/details/keyword-extraction)
