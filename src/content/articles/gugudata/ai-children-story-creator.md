---
title: "儿童故事创作大师 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/children-story-creator"
section: "gugudata"
slug: "ai-children-story-creator"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/children-story-creator"
cover: "https://static.gugudata.com/api_cover_children-story-creator.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/children-story-creator](https://www.gugudata.com/api/details/children-story-creator)

儿童故事创作大师 API 基于 AI 模型智能创作儿童故事，AI、故事创作等关键词场景常会用到，适合用于内容生成与智能处理、多语言文本工作流与知识服务与问答能力接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_children-story-creator.jpg)

## 1. 产品功能

- 支持多种主题和长度的儿童故事创作；
- 基于 AI 模型，提供高质量的故事内容；
- 附带教育意义的反思内容；
- 适用于教育、娱乐和家庭阅读场景；
- 围绕“儿童故事创作大师”提供标准化能力，便于快速接入现有业务；
- 适合将“儿童故事创作大师”结果接入业务系统、后台工具和自动化流程；
- 适合内容生产、文本审核和知识整理等智能处理场景；
- 支持将 AI 处理结果接入审核、编辑和运营流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/children-story-creator?appkey=REDACTED&streaming={{streaming}}

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/children-story-creator?appkey=REDACTED&streaming=false&topic=YOUR_VALUE&length=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/children-story-creator](https://www.gugudata.com/preview/children-story-creator)

**接口测试:** [https://api.gugudata.com/ai/children-story-creator/demo](https://api.gugudata.com/ai/children-story-creator/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| topic | string | 是 | YOUR_VALUE | 故事的一句话主题，如：刻意练习对于学习的意义 |
| length | string | 是 | YOUR_VALUE | 故事长度，可选参数为：短篇\|中篇\|长篇 |
| streaming | boolean | 否 | false | 是否流式响应，如果为 true，那么接口会流式输出纯文本，在最后一个消息输出完整结果的 JSON。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 请求的参数 |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| Data.content | string | 生成的故事内容 |
| Data.reflection | string | 故事的反思或教育意义 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请求参数不完整或无效 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 104 | APPKEY 错误 | APPKEY 无效或未授权 |

## 6. 适用场景

- 适合用于内容生成与智能处理，快速补齐产品侧需要的 儿童故事创作大师 数据能力。
- 适合用于多语言文本工作流，减少手工整理、清洗与重复开发成本。
- 适合用于知识服务与问答能力接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[文章自然润色](https://www.gugudata.com/api/details/article-polishing)，适合补充同类场景的接口能力。
- 可搭配使用：[多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)，适合补充同类场景的接口能力。
- 可搭配使用：[个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)，适合补充同类场景的接口能力。
