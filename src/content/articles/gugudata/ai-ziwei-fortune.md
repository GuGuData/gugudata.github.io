---
title: "紫微星斗大师 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/ziwei-fortune"
section: "gugudata"
slug: "ai-ziwei-fortune"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-05-23T08:00:41.000Z"
updatedAt: "2026-05-23T08:00:41.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/ziwei-fortune"
cover: "https://static.gugudata.com/api-cover-ziwei-fortune.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/ziwei-fortune](https://www.gugudata.com/api/details/ziwei-fortune)

紫微星斗大师 API 自有紫微模型训练的命盘洞察，自研命理模型、紫微命盘、传统文化、AI等关键词场景常会用到，适合用于传统文化内容与娱乐参考、个人周期趋势解读与文化类产品与内容服务接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-cover-ziwei-fortune.jpg)

## 1. 产品功能

- 基于自研命理推演模型与专有训练优化策略，提供高精度紫微命盘推演与解读；
- 支持结构化出生信息输入，便于业务系统与自动化流程稳定接入；
- 覆盖十二宫位、主辅星、四化、大限与流年趋势等核心解读结果；
- 输出面向产品消费的结构化 JSON，适合前端展示、报告生成与会员服务场景；
- 智能提炼事业、财运、感情、健康等方向的重点建议，便于用户快速理解；
- 结果用于传统文化研究与娱乐参考，不作为现实决策依据；
- 支持 responseMode=task 任务模式，先返回 operationId，再通过轮询接口查询结果；
- 围绕“紫微星斗大师”提供标准化能力，便于快速接入现有业务；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/ziwei-fortune

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/ziwei-fortune?appkey=REDACTED&gender=YOUR_VALUE&calendarType=YOUR_VALUE&birthDate=YOUR_VALUE&birthTime=YOUR_VALUE&birthPlace=YOUR_VALUE&isLeapMonth=false&streaming=false&responseMode=sync

**数据预览:** [https://www.gugudata.com/preview/ziwei-fortune](https://www.gugudata.com/preview/ziwei-fortune)

**接口测试:** [https://api.gugudata.com/ai/ziwei-fortune/demo](https://api.gugudata.com/ai/ziwei-fortune/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| gender | string | 是 | YOUR_VALUE | 性别，如：男、女。 |
| calendarType | string | 是 | YOUR_VALUE | 历法类型，如：公历、农历。 |
| birthDate | string | 是 | YOUR_VALUE | 出生日期，格式：YYYY-MM-DD。 |
| birthTime | string | 是 | YOUR_VALUE | 出生时间，格式：HH:MM。 |
| birthPlace | string | 是 | YOUR_VALUE | 出生地点，用于命盘推演时结合地域信息进行解读。 |
| isLeapMonth | boolean | 否 | false | 农历出生时是否为闰月，公历场景可保持 false。 |
| streaming | boolean | 否 | false | 是否流式响应，如果为 true，那么接口会流式输出纯文本，在最后一个消息输出完整结果的 JSON。当 responseMode=task 时，streaming 必须为 false。 |
| responseMode | string | 否 | sync | 响应模式，可选值：sync、task。为 task 时立即返回任务受理结果，不阻塞等待模型完成。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 请求的参数 |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.基本信息 | object | 命盘推演所使用的基础出生信息 |
| Data.命盘摘要 | string | 对整体命格与人生节奏的综合概述 |
| Data.十二宫位 | object | 命宫、财帛宫、事业宫等十二宫位的解读 |
| Data.主星与辅星 | object | 主星格局与辅星亮点分析 |
| Data.四化分析 | object | 化禄、化权、化科、化忌的推演结果 |
| Data.大限 | array | 分阶段的大限主题与趋势解读 |
| Data.流年趋势 | object | 近一年、近三年的趋势变化与提醒 |
| Data.综合建议 | object | 事业、财运、感情、健康等方向的综合建议 |
| Data.operationId | string | 仅 responseMode=task 时返回，任务唯一标识。 |
| Data.status | string | 仅 responseMode=task 或轮询接口返回，状态枚举：PENDING、RUNNING、SUCCEEDED、FAILED、EXPIRED。 |
| Data.pollingUrl | string | 仅 responseMode=task 或轮询接口返回，任务状态查询地址。 |
| Data.expiresAt | string | 仅 responseMode=task 或轮询接口返回，任务结果过期时间。 |
| Data.result | object | 仅任务状态为 SUCCEEDED 时返回，业务结果结构与同步模式一致。 |
| Data.error | object | 仅任务状态为 FAILED 时返回，失败原因信息。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请求参数不完整或无效 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 104 | APPKEY 错误 | APPKEY 无效或未授权 |

## 6. 适用场景

- 适合用于传统文化内容与娱乐参考，快速补齐产品侧需要的 紫微星斗大师 数据能力。
- 适合用于个人周期趋势解读，减少手工整理、清洗与重复开发成本。
- 适合用于文化类产品与内容服务接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[任务状态查询](https://api.gugudata.com/ai/operations/{operation_id}?appkey=REDACTED)（GET），轮询异步任务状态，任务成功时在 Data.result 返回业务结果。
