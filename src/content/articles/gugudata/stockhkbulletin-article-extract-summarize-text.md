---
title: "投研简报如何保留原始出处：公告、网页正文与 AI 摘要证据链"
description: "投研简报如何保留原始出处，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何汇总公告和网页内容，并让摘要、关键词与情感结果保持可追溯”给出一套可以直接落到任务状态和数据契约上的实现方式。"
section: "gugudata"
slug: "stockhkbulletin-article-extract-summarize-text"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:16.000Z"
updatedAt: "2026-09-01T12:37:16.000Z"
author: "GuGuData"
---
投研简报如何保留原始出处，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何汇总公告和网页内容，并让摘要、关键词与情感结果保持可追溯”给出一套可以直接落到任务状态和数据契约上的实现方式。

## 问题与结果

简报中的每条摘要都关联来源 URL、正文哈希、发布时间和生成版本，来源失败时不生成内容。

最终交付不是一段不可追溯的模型回答，而是一组带来源、版本、状态和失败记录的数据。这样既方便接入后续系统，也能在接口、页面或模型输出变化时定位问题。

## 适用场景

- 公司公告与行业新闻简报
- 主题资料持续跟踪
- 研究团队晨报素材整理

## 实现前先确定边界

1. 公告和媒体文章使用不同来源类型
2. 先保存正文证据，再运行摘要和标签
3. 重复内容按来源与正文哈希去重

## 可验证工作流

![投研简报如何保留原始出处工作流架构图](https://assets.devopen.club/uPic/202608/stockhkbulletin-workflow.png?v=9dfa6e7c9d9e)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 港股公告 | [港股上市公司公告](https://www.gugudata.com/api/details/stockhkbulletin) | GET | 获取港股上市公司公告 |
| 公众号文章 | 公众号头条文章 | GET | 获取公众号文章来源；当前没有可验证的公开详情页链接 |
| 技术博客 | [软件开发技术博文头条](https://www.gugudata.com/api/details/techblogs) | GET | 适合技术行业简报来源 |
| 正文抓取 | [获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent) | POST | 从 URL 抽取正文内容 |
| 文章抽取 | [文章抽取信息化 JSON](https://www.gugudata.com/api/details/article-extract) | POST | 生成更结构化的文章信息 |
| 文本摘要 | [文本多语言 AI 摘要](https://www.gugudata.com/api/details/summarize-text) | POST | 生成简报摘要 |
| 关键词 | [多语言长文本 AI 关键字提取](https://www.gugudata.com/api/details/keyword-extraction) | POST | 提取主题词 |
| 情感分析 | [多语言文本 AI 情感分析](https://www.gugudata.com/api/details/sentiment-analysis) | POST | 判断内容倾向 |

## 最小可运行实现

获取港股公告：

```bash
curl -G "https://api.gugudata.com/stock/hk/bulletin" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "symbol=00700"
```

抓取任意链接正文：

```bash
curl -X POST "https://api.gugudata.com/news/fetchcontent?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/news/article"
  }'
```

生成摘要：

```bash
curl -X POST "https://api.gugudata.com/ai/text-summarize?appkey=YOUR_APPKEY&lang=zh-cn&streaming=false" \
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

## 失败分类与降级

如果某个 URL 抓取失败，应保留失败状态和来源，不要让模型根据标题补正文。如果摘要接口失败，可以先保存正文，稍后重试摘要。对于重复内容，应合并来源，不要重复进入简报。

当情感分析和人工判断不一致时，情感标签应作为辅助指标，而不是自动决定内容是否进入报告。

## 数据契约与留痕

建议至少保存以下字段；真实项目可以继续拆分，但不要删除来源、版本和状态信息。

| 字段 | 作用 |
|---|---|
| `item_id` | 稳定业务标识，用于关联记录并避免名称冲突 |
| `source_type` | 原始来源或原始响应，供后续复核 |
| `source_url` | 来源或目标 URL，保留最终跳转前后的差异 |
| `published_at` | 带时区的采样或生成时间，判断数据新鲜度 |
| `content_hash` | 内容哈希，用于完整性校验、版本识别和去重 |
| `summary` | 派生结果，必须关联输入版本与生成时间 |
| `keywords` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `sentiment` | 业务数据字段，保存时记录来源、口径和缺失状态 |

所有派生结果都应带生成时间和输入版本。发生重试时新增尝试记录，不要覆盖最后一次失败，以免排查时只剩“最终成功”而看不到中间问题。

## 验收清单

- [ ] 每条简报都能打开或定位原始来源
- [ ] 转载和重复正文可识别
- [ ] 生成结论与原文事实明确分离

## 能力边界

自动摘要可能遗漏语境，情感标签也不代表市场影响；简报不构成投资建议。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中，不应进入前端、文章、日志或版本库。
