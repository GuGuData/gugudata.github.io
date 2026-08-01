---
title: "PDF 全文多语言 AI 摘要 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/summarize-pdf"
section: "gugudata"
slug: "ai-summarize-pdf"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/summarize-pdf"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/f8b67f04133077075aed64da9a4132c0.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/summarize-pdf](https://www.gugudata.com/api/details/summarize-pdf)

PDF 全文多语言 AI 摘要 API PDF 全文多语言智能摘要，AI、PDF、文本摘要等关键词场景常会用到，适合用于内容生成与智能处理、多语言文本工作流与知识服务与问答能力接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/f8b67f04133077075aed64da9a4132c0.jpg)

## 1. 产品功能

- 支持上传 PDF 文件并生成 AI 摘要；
- appKey、lang 和 streaming 通过 query 参数传入，PDF 通过 multipart/form-data 上传；
- lang 可指定摘要语言，适合中文、英文等多语言文档摘要；
- 适合论文、报告、合同、说明书和长文档快速阅读等场景；
- 围绕“PDF 全文多语言 AI 摘要”提供标准化能力，便于快速接入现有业务；
- 适合将“PDF 全文多语言 AI 摘要”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/summarize?appkey=REDACTED&lang={{lang}}&streaming={{streaming}}

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/summarize?appkey=REDACTED&lang=zh&streaming=false&appKey=REDACTED

**数据预览:** [https://www.gugudata.com/preview/summarize-pdf](https://www.gugudata.com/preview/summarize-pdf)

**接口测试:** [https://api.gugudata.com/ai/summarize/demo](https://api.gugudata.com/ai/summarize/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appKey | string | 是 | APPKEY | 付费后获取的 APPKEY，通过 query 参数传入。 |
| lang | string | 否 | zh | 摘要语言，例如 zh、en；为空时使用默认语言。 |
| streaming | boolean | 否 | false | 是否使用流式返回，默认 false。 |
| file | file | 是 | YOUR_FILE | 通过 multipart/form-data 上传的 PDF 文件。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.summary | string | AI 生成的 PDF 摘要文本。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请求参数不完整或无效 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 文件错误 | 未提供文件或文件格式不正确 |
| 104 | APPKEY 错误 | APPKEY 无效或未授权 |

## 6. 适用场景

- 适合用于内容生成与智能处理，快速补齐产品侧需要的 PDF 全文多语言 AI 摘要 数据能力。
- 适合用于多语言文本工作流，减少手工整理、清洗与重复开发成本。
- 适合用于知识服务与问答能力接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[文章自然润色](https://www.gugudata.com/api/details/article-polishing)，适合补充同类场景的接口能力。
- 可搭配使用：[多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)，适合补充同类场景的接口能力。
- 可搭配使用：[个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)，适合补充同类场景的接口能力。
