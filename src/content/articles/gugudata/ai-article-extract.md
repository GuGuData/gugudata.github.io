---
title: "文章抽取信息化 JSON API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/article-extract"
section: "gugudata"
slug: "ai-article-extract"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-04-24T22:34:50.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/article-extract"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/346e7641732c7995da9f9e400b4608dd.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/article-extract](https://www.gugudata.com/api/details/article-extract)

文章抽取信息化 JSON API 文章信息结构化抽取，网页处理、LLM等关键词场景常会用到，适合用于内容生成与智能处理、多语言文本工作流与知识服务与问答能力接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/346e7641732c7995da9f9e400b4608dd.jpg)

## 1. 产品功能

- 支持从任意网页 URL 提取干净的文章内容；
- 自动去除广告、导航栏和非内容元素；
- 提取文章标题、内容、作者和发布日期；
- 支持自定义解析器和获取选项；
- 提供独立的 HTML 字符串提取接口（/ai/v1/articles/extractFromHtml）；
- 支持直接从 HTML 字符串提取；
- 高质量的内容提取，智能解析；
- 围绕“文章抽取信息化 JSON”提供标准化能力，便于快速接入现有业务；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/v1/articles/extract

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/v1/articles/extract?appkey=REDACTED&url=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/article-extract](https://www.gugudata.com/preview/article-extract)

**接口测试:** [https://api.gugudata.com/ai/v1/articles/extract/demo](https://api.gugudata.com/ai/v1/articles/extract/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，可通过查询参数或请求体传递 |
| url | string | 是 | YOUR_VALUE | 需要提取文章内容的网页 URL 地址 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.url | string | 文章的源 URL |
| Data.title | string | 提取的文章标题 |
| Data.description | string | 文章描述/摘要 |
| Data.links | array | 文章中包含的链接数组 |
| Data.image | string | 文章主图片 URL |
| Data.content | string | 提取的文章内容（HTML 格式，已去除广告和导航栏） |
| Data.author | string | 文章作者（如果可用，可能为空字符串） |
| Data.favicon | string | 网站图标 URL |
| Data.source | string | 来源网站域名（如 sohu.com） |
| Data.published | string | 文章发布日期/时间（格式：YYYY-MM-DD HH:MM） |
| Data.ttr | int | 预计阅读时间（Time to Read，单位：分钟） |
| Data.type | string | 文章类型（如 news、article 等） |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 文章成功提取 |
| 101 | 参数错误 | 无效或缺少必需参数（url 参数是必需的） |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | 文章提取过程中发生内部服务器错误。URL 可能无法访问或内容格式可能不受支持 |

## 6. 适用场景

- 适合用于内容生成与智能处理，快速补齐产品侧需要的 文章抽取信息化 JSON 数据能力。
- 适合用于多语言文本工作流，减少手工整理、清洗与重复开发成本。
- 适合用于知识服务与问答能力接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[文章自然润色](https://www.gugudata.com/api/details/article-polishing)，适合补充同类场景的接口能力。
- 可搭配使用：[多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)，适合补充同类场景的接口能力。
- 可搭配使用：[个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)，适合补充同类场景的接口能力。
