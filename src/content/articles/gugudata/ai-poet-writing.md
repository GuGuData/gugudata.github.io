---
title: "诗歌创作 AI 大师 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/poet-writing"
section: "gugudata"
slug: "ai-poet-writing"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/poet-writing"
cover: "https://static.gugudata.com/api_covers_poet-writing.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/poet-writing](https://www.gugudata.com/api/details/poet-writing)

诗歌创作 AI 大师 API 基于 AI 模型的诗歌创作大师，AI、文本生成、诗歌生成等关键词场景常会用到，适合用于内容生成与智能处理、多语言文本工作流与知识服务与问答能力接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_covers_poet-writing.jpg)

## 1. 产品功能

- 支持根据主题生成高质量原创诗歌；
- 自动识别主题内容，生成符合情感和语境的诗歌；
- 多语言支持，可创作不同语言的诗歌；
- 基于 AI 模型，持续优化诗歌生成质量；
- 适用于文学创作、教育启发、文化传播等多个领域；
- 接口极速响应，支持高并发调用；
- 围绕“诗歌创作 AI 大师”提供标准化能力，便于快速接入现有业务；
- 适合将“诗歌创作 AI 大师”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/poet-writing?appkey=REDACTED&streaming={{streaming}}

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/poet-writing?appkey=REDACTED&streaming=false&topic=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/poet-writing](https://www.gugudata.com/preview/poet-writing)

**接口测试:** [https://api.gugudata.com/ai/poet-writing/demo](https://api.gugudata.com/ai/poet-writing/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| topic | string | 是 | YOUR_VALUE | 诗歌主题，支持多语言输入，长度不超过 200 个字符 |
| streaming | boolean | 否 | false | 是否流式响应，如果为 true，那么接口会流式输出纯文本，在最后一个消息输出完整结果的 JSON。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 接口请求的参数 |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| Data.title | string | 生成的诗歌标题 |
| Data.content | string | 生成的诗歌内容 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请求参数不完整或无效 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 104 | APPKEY 错误 | APPKEY 无效或未授权 |

## 6. 适用场景

- 适合用于内容生成与智能处理，快速补齐产品侧需要的 诗歌创作 AI 大师 数据能力。
- 适合用于多语言文本工作流，减少手工整理、清洗与重复开发成本。
- 适合用于知识服务与问答能力接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[文章自然润色](https://www.gugudata.com/api/details/article-polishing)，适合补充同类场景的接口能力。
- 可搭配使用：[多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)，适合补充同类场景的接口能力。
- 可搭配使用：[个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)，适合补充同类场景的接口能力。
