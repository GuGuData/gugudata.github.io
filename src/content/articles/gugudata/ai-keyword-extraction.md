---
title: "多语言长文本 AI 关键字提取 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/keyword-extraction"
section: "gugudata"
slug: "ai-keyword-extraction"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/keyword-extraction"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/e7402a2a1250d6a6414ec72ce77ce85a.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/keyword-extraction](https://www.gugudata.com/api/details/keyword-extraction)

多语言长文本 AI 关键字提取 API 专有模型极速提取，AI、文本等关键词场景常会用到，适合用于内容生成与智能处理、多语言文本工作流与知识服务与问答能力接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/e7402a2a1250d6a6414ec72ce77ce85a.jpg)

## 1. 产品功能

- 支持长文本关键词提取；
- 多语言关键词识别；
- 基于 AI 模型，提取精准关键词；
- 围绕“多语言长文本 AI 关键字提取”提供标准化能力，便于快速接入现有业务；
- 适合将“多语言长文本 AI 关键字提取”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；
- 支持将处理结果接入文档工作台、审批系统和归档系统；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/keyword-extraction?appkey=REDACTED&streaming={{streaming}}

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/keyword-extraction?appkey=REDACTED&streaming=false&textContent=YOUR_VALUE&keywordMaxLength=5

**数据预览:** [https://www.gugudata.com/preview/keyword-extraction](https://www.gugudata.com/preview/keyword-extraction)

**接口测试:** [https://api.gugudata.com/ai/keyword-extraction/demo](https://api.gugudata.com/ai/keyword-extraction/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| textContent | string | 是 | YOUR_VALUE | 需要提取关键词的文本内容 |
| keywordMaxLength | int | 否 | 5 | 单个关键字长度限制，不传递默认长度为 5 个字符 |
| streaming | boolean | 否 | false | 是否流式响应，如果为 true，那么接口会流式输出纯文本，在最后一个消息输出完整结果的 JSON。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| Data.keywords | array | 提取到的关键词数组 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请求参数不完整或无效 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 104 | APPKEY 错误 | APPKEY 无效或未授权 |

## 6. 适用场景

- 适合用于内容生成与智能处理，快速补齐产品侧需要的 多语言长文本 AI 关键字提取 数据能力。
- 适合用于多语言文本工作流，减少手工整理、清洗与重复开发成本。
- 适合用于知识服务与问答能力接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[文章自然润色](https://www.gugudata.com/api/details/article-polishing)，适合补充同类场景的接口能力。
- 可搭配使用：[多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)，适合补充同类场景的接口能力。
- 可搭配使用：[个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)，适合补充同类场景的接口能力。
