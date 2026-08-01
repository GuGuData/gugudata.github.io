---
title: "考题相似度 AI 分析 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/exam-question-similarity"
section: "gugudata"
slug: "education-exam-question-similarity"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/exam-question-similarity"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/c160274dfd274002896d9e4acdd6cf96.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/exam-question-similarity](https://www.gugudata.com/api/details/exam-question-similarity)

考题相似度 AI 分析 API 考题语义相似度与解析评估，AI、教育、考题分析等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/c160274dfd274002896d9e4acdd6cf96.png)

## 1. 产品功能

- 支持按题干、答案、解析、知识点和解题路径综合判断考题相似度；
- score 使用 0 到 1 区间，适合用于重复题检测、题库清洗和近似题推荐；
- exam1 与 exam2 建议使用一致的 JSON 字段结构，输入信息越完整，分析越稳定；
- 适合教研题库去重、试卷组卷质检、相似题召回和内容审核等场景；
- 围绕“考题相似度 AI 分析”提供标准化能力，便于快速接入现有业务；
- 适合将“考题相似度 AI 分析”结果接入业务系统、后台工具和自动化流程；
- 适合高考、考研、招生和院校信息产品接入；
- 可与院校、专业、分数线和招生计划接口组合分析；

## 2. API 文档

**接口地址:** https://api.gugudata.com/education/exam-question-similarity

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/education/exam-question-similarity?appkey=REDACTED&exam1=YOUR_VALUE&exam2=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/exam-question-similarity](https://www.gugudata.com/preview/exam-question-similarity)

**接口测试:** [https://api.gugudata.com/education/exam-question-similarity/demo](https://api.gugudata.com/education/exam-question-similarity/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，在 JSON 请求体中传入。 |
| exam1 | object | 是 | YOUR_VALUE | 第一道考题对象，建议包含题干、选项、答案、解析、学科、年级、知识点等信息。 |
| exam2 | object | 是 | YOUR_VALUE | 第二道考题对象，字段结构建议与 exam1 保持一致，用于与 exam1 进行相似度比较。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.score | number | 相似度分数，范围 0 到 1；数值越接近 1，相似度越高。 |
| Data.analysis_result | string | AI 生成的相似度分析结论，说明主要相同点、差异点和判断依据。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | - |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于字典与基础库查询，快速补齐产品侧需要的 考题相似度 AI 分析 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
