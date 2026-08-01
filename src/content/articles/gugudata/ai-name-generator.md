---
title: "八字喜用神起名大师 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/name-generator"
section: "gugudata"
slug: "ai-name-generator"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/name-generator"
cover: "https://static.gugudata.com/api_cover_name_generator.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/name-generator](https://www.gugudata.com/api/details/name-generator)

八字喜用神起名大师 API 自有模型训练的五行数理起名建议，姓名、八字命理、传统文化、AI等关键词场景常会用到，适合用于传统文化内容与娱乐参考、个人周期趋势解读与文化类产品与内容服务接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_name_generator.jpg)

## 1. 产品功能

- 基于传统八字命理学理论；
- 结合三才五格数理分析；
- 考虑五行相生相克关系；
- 提供多个候选姓名供选择；
- 包含详细的命理分析报告；
- 支持方言谐音检测；
- 支持 responseMode=task 任务模式，先返回 operationId，再通过轮询接口查询结果；
- 围绕“八字喜用神起名大师”提供标准化能力，便于快速接入现有业务；
- 结果用于传统文化研究与娱乐参考，不作为现实决策依据；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/name-generator?appkey=REDACTED&streaming={{streaming}}&responseMode={{responseMode}}

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/name-generator?appkey=REDACTED&streaming=false&responseMode=sync&lastname=YOUR_VALUE&gender=YOUR_VALUE&birthDateTime=YOUR_VALUE&birthPlace=YOUR_VALUE&parentNames=YOUR_VALUE&avoidWords=YOUR_VALUE&avoidNames=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/name-generator](https://www.gugudata.com/preview/name-generator)

**接口测试:** [https://api.gugudata.com/ai/name-generator/demo](https://api.gugudata.com/ai/name-generator/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| lastname | string | 是 | YOUR_VALUE | 姓氏 |
| gender | string | 是 | YOUR_VALUE | 性别（男/女） |
| birthDateTime | string | 是 | YOUR_VALUE | 公历出生年月日时，格式：YYYY年MM月DD日 HH:MM |
| birthPlace | string | 是 | YOUR_VALUE | 出生地点（省市），用于规避可能的谐音 |
| parentNames | string | 否 | YOUR_VALUE | 父母姓名（可选，用于亲子音韵搭配） |
| avoidWords | string | 否 | YOUR_VALUE | 可选避用字（可选，多个字用逗号分隔） |
| avoidNames | string\|string[] | 否 | YOUR_VALUE | 禁生成姓名，支持逗号分隔字符串或 JSON 数组 |
| streaming | boolean | 否 | false | 是否流式响应，如果为 true，那么接口会流式输出纯文本，在最后一个消息输出完整结果的 JSON。当 responseMode=task 时，streaming 必须为 false。 |
| responseMode | string | 否 | sync | 响应模式，可选值：sync、task。为 task 时立即返回任务受理结果，不阻塞等待模型完成。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data | object | 接口返回的完整 JSON 数据，包含命盘分析、候选名字清单、最佳推荐、注意事项等所有字段，具体可查看 [DEMO 接口](https://www.gugudata.com/preview/name-generator) 返回数据 |
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
| 101 | 参数错误 | 请检查传递的参数是否完整 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于传统文化内容与娱乐参考，快速补齐产品侧需要的 八字喜用神起名大师 数据能力。
- 适合用于个人周期趋势解读，减少手工整理、清洗与重复开发成本。
- 适合用于文化类产品与内容服务接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[任务状态查询](https://api.gugudata.com/ai/operations/{operation_id}?appkey=REDACTED)（GET），轮询异步任务状态，任务成功时在 Data.result 返回业务结果。
