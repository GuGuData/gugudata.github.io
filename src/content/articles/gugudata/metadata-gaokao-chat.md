---
title: "高考教育信息智能助手 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/gaokao-chat"
section: "gugudata"
slug: "metadata-gaokao-chat"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/gaokao-chat"
cover: "https://static.gugudata.com/api-cover-gaokao-chat.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/gaokao-chat](https://www.gugudata.com/api/details/gaokao-chat)

高考教育信息智能助手 API 高考教育信息智能问答助手，AI、高考、高考录取、高等教育等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-cover-gaokao-chat.png)

## 1. 产品功能

- RAG 智能体，强大的 AI 问答能力，支持高校基础信息查询、招生政策解读、专业介绍与选择建议等；
- 支持招生政策解读、报考指南与志愿填报建议；
- 支持多轮对话，通过 session_id 保持对话上下文；
- 支持知识库检索（RAG），可指定检索范围；
- 支持流式输出（SSE），实时返回 AI 生成内容；
- 支持多种请求方式：JSON、Form、Query String；
- 围绕“高考教育信息智能助手”提供标准化能力，便于快速接入现有业务；
- 适合将“高考教育信息智能助手”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/gaokao/chat

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/gaokao/chat?appkey=REDACTED&prompt=YOUR_VALUE&session_id=YOUR_VALUE&streaming=false

**数据预览:** [https://www.gugudata.com/preview/gaokao-chat](https://www.gugudata.com/preview/gaokao-chat)

**接口测试:** [https://api.gugudata.com/ai/gaokao/chat/demo](https://api.gugudata.com/ai/gaokao/chat/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，可通过 Query 参数或 JSON body 传入 |
| prompt | string | 是 | YOUR_VALUE | 用户输入的问题，支持通过 JSON body 或 Form 参数传入 |
| session_id | string | 否 | YOUR_VALUE | 会话ID，用于多轮对话。首次请求可不传，系统会自动生成并返回；后续请求使用返回的 session_id 可保持对话上下文 |
| streaming | string | 否 | false | 是否启用流式输出（true/false），流式输出采用 SSE (Server-Sent Events) 格式，可通过 Query 参数或 JSON body 传入 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码，100 表示成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.text | string | 回复的文本内容 |
| Data.session_id | string | 会话ID，用于多轮对话。首次请求会自动生成，后续请求使用此 ID 可保持对话上下文 |
| Data.finish_reason | string | 完成原因，通常为 'stop' 表示正常完成 |
| Data.request_id | string | 请求ID，用于追踪和调试 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请检查传递的参数是否完整，prompt 和 appkey 为必填参数 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | 阿里云百炼智能体调用失败，请稍后重试 |

## 6. 适用场景

- 适合用于字典与基础库查询，快速补齐产品侧需要的 高考教育信息智能助手 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
