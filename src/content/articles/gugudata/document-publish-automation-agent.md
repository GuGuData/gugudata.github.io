---
title: "用 Markdown、HTML 和 PPT 转换接口构建自动化发布 Agent"
description: "摘要:技术团队和运营团队经常需要把 Markdown、HTML 或 PPT 转换成 PDF、Word、图片或可分享文件。本文演示如何用文档转换接口搭建一个自动化发布 Agent,让内容从草稿进入可交付格式。"
section: "gugudata"
slug: "document-publish-automation-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/010_document_publish_automation_agent.png"
author: "GuGuData"
---
摘要：技术团队和运营团队经常需要把 Markdown、HTML 或 PPT 转换成 PDF、Word、图片或可分享文件。本文演示如何用文档转换接口搭建一个自动化发布 Agent，让内容从草稿进入可交付格式。

关键词：自动化发布 Agent、Markdown 转 PDF API、HTML 转 PDF API、PPT 转 PDF API、PPT 转图片 API、文档转换 API

## 问题背景

一篇文章、一个周报或一份演示材料，在发布前可能要输出多种格式：网页、PDF、Word、PPT 预览图。手工导出容易版本混乱，也不适合批量任务。

Agent 可以根据输入文件类型和目标渠道选择转换接口，把内容发布流程标准化。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/010_document_publish_automation_agent.png)

## 接口编排

| 输入或目标 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| Markdown 到 PDF | [Markdown 转 PDF](https://www.gugudata.com/api/details/markdown2pdf) | POST | 把技术文档、周报、说明页导出为 PDF |
| HTML 到 PDF | [HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf) | POST | 把网页或 HTML 内容导出为 PDF |
| HTML 到 Word | [HTML 转 Word](https://www.gugudata.com/api/details/html2word) | POST | 生成可编辑 Word 文档 |
| PPT 到 PDF | [PPT 转高精度 PDF](https://www.gugudata.com/api/details/ppt-to-pdf) | POST | 生成演示材料归档版本 |
| PPT 到图片 | [PPT 转高精度图片](https://www.gugudata.com/api/details/ppt-to-images) | POST | 生成封面图、缩略图或预览图 |

## 调用示例

```bash
curl -X POST "https://api.gugudata.com/imagerecognition/markdown2pdf" \
  -H "Content-Type: application/json" \
  -d '{
    "appkey": "YOUR_APPKEY",
    "content": "# 发布草稿\n\n这是一篇准备导出的技术文章。"
  }'
```

```bash
curl -X POST "https://api.gugudata.com/imagerecognition/ppt-to-pdf?appkey=REDACTED \
  -F "file=@./deck.pptx"
```

```bash
curl -X POST "https://api.gugudata.com/imagerecognition/ppt-to-images?appkey=REDACTED&scale_factor=2" \
  -F "file=@./deck.pptx"
```

应用侧可以按目标格式选择接口：

```python
def choose_conversion_endpoint(source_type: str, target_type: str) -> str:
    """Choose a document conversion endpoint."""
    if source_type == "markdown" and target_type == "pdf":
        return "https://api.gugudata.com/imagerecognition/markdown2pdf"
    if source_type == "ppt" and target_type == "pdf":
        return "https://api.gugudata.com/imagerecognition/ppt-to-pdf"
    if source_type == "ppt" and target_type == "images":
        return "https://api.gugudata.com/imagerecognition/ppt-to-images"
    raise ValueError("Unsupported conversion target")
```

## 发布记录结构

| 字段 | 说明 |
| --- | --- |
| source_id | 原始内容 ID |
| source_type | Markdown、HTML、URL 或 PPT |
| target_type | PDF、Word、图片等目标格式 |
| output_url | 转换结果地址或文件记录 |
| generated_at | 转换时间 |
| publish_status | 待审核、已发布或失败 |

## 错误处理

文件格式错误、文件过大或转换失败时，Agent 应停止发布流程，并把失败原因写入发布记录。对于重复发布任务，建议用 `source_id + target_type` 做幂等控制，避免同一篇内容生成多个冲突版本。

## 工程注意点

- 转换任务适合放到后台队列，避免用户请求长时间等待。
- 发布页面只展示业务结果，例如下载链接、预览图和更新时间。
- APPKEY 保存在服务端，不要放进 Markdown 文件或前端代码。
- 对输出文件设置访问权限和过期策略，避免内部资料被误公开。

## 标准架构拆解

文档发布 Agent 可以拆成内容源、转换队列、资产存储和发布记录四部分：

| 模块 | 责任 |
| --- | --- |
| 内容源 | Markdown、HTML、URL、PPT 等原始资料 |
| 转换队列 | 根据目标格式调用不同转换接口 |
| 资产存储 | 保存 PDF、Word、图片和缩略图 |
| 发布记录 | 记录来源、目标格式、输出地址和状态 |
| 审核流程 | 在正式发布前进行人工或规则校验 |

这个架构要解决的核心问题是版本一致性。同一份源内容可能生成多个格式，所有格式都应挂在同一个发布任务下，而不是散落成多个无关联文件。

## 数据流与接口边界

推荐流程：

1. 内容系统提交源文件和目标格式。
2. 发布 Agent 生成转换任务和幂等键。
3. 队列 worker 调用 Markdown、HTML 或 PPT 转换接口。
4. 转换结果写入资产存储。
5. 发布记录更新为待审核或已完成。
6. 审核通过后再展示下载链接或预览图。

接口边界上，转换接口只负责文件格式转换，不负责发布权限、版本管理和审核状态。发布系统需要自己维护这些业务字段。

## 可靠性与观测

建议记录：

| 指标 | 用途 |
| --- | --- |
| conversion_success_rate | 转换成功率 |
| conversion_latency_ms | 转换耗时 |
| output_file_count | 每个发布任务生成的资产数量 |
| duplicate_task_count | 幂等控制是否有效 |
| review_waiting_count | 待审核发布数量 |

如果转换失败，任务应保留失败原因和源文件信息，允许用户重试。重试时不要创建新的发布记录，而是更新原任务的转换版本。

## 落地清单

- 使用 `source_id + target_type` 作为幂等键。
- 每个输出文件记录来源内容版本。
- 转换任务放入后台队列，前端只查看任务状态。
- 发布前检查访问权限和文件有效期。
- 对 PPT 预览图和 PDF 输出分别记录，方便页面引用。

## 可扩展方向

这个 Agent 可以接入 URL 转 Markdown，先把网页内容整理成 Markdown，再统一导出 PDF；也可以接入文本摘要，为每个发布文件生成摘要和搜索标签。

## 相关接口

- [Markdown 转 PDF](https://www.gugudata.com/api/details/markdown2pdf)
- [HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf)
- [HTML 转 Word](https://www.gugudata.com/api/details/html2word)
- [PPT 转高精度 PDF](https://www.gugudata.com/api/details/ppt-to-pdf)
- [PPT 转高精度图片](https://www.gugudata.com/api/details/ppt-to-images)
