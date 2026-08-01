---
title: "八字关系合参 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/bazi-relationship-insight"
section: "gugudata"
slug: "fortune-bazi-relationship-insight"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/bazi-relationship-insight"
cover: "https://static.gugudata.com/api-cover-bazi-relationship-insight-v2.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/bazi-relationship-insight](https://www.gugudata.com/api/details/bazi-relationship-insight)

八字关系合参 API 自有模型训练的双人关系洞察，传统文化、八字关系、关系分析、AI等关键词场景常会用到，适合用于传统文化内容与娱乐参考、个人周期趋势解读与文化类产品与内容服务接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-cover-bazi-relationship-insight-v2.jpg)

## 1. 产品功能

- 分别接收双方姓名、性别、历法、出生日期、出生时间和地点；
- 兼容公历、农历以及中英文性别和历法输入；
- 可指定沟通、家庭、价值观等最多六个重点分析方向；
- 基础出生资料与历法字段独立返回，不被文化解读改写；
- 提供关系摘要、互补特点、沟通节奏和长期相处建议；
- 同时支持同步 JSON、异步任务和 SSE 流式响应；
- 统一使用标准响应结构，便于服务端和前端应用接入；
- 结果用于传统文化研究与娱乐参考，不作为现实决策依据；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/bazi-relationship-insight

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/bazi-relationship-insight?appkey=REDACTED&personA=YOUR_VALUE&personB=YOUR_VALUE&personA.name=YOUR_VALUE&personA.gender=YOUR_VALUE&personA.calendarType=YOUR_VALUE&personA.birthDate=1990-12-01&personA.birthTime=YOUR_VALUE&personA.birthPlace=YOUR_VALUE&personA.isLeapMonth=false&personA.language=zh-CN&personB.name=YOUR_VALUE&personB.gender=YOUR_VALUE&personB.calendarType=YOUR_VALUE&personB.birthDate=1992-06-15&personB.birthTime=YOUR_VALUE&personB.birthPlace=YOUR_VALUE&personB.isLeapMonth=false&personB.language=zh-CN&focusAreas=YOUR_VALUE&responseMode=sync&streaming=false

**数据预览:** [https://www.gugudata.com/preview/bazi-relationship-insight](https://www.gugudata.com/preview/bazi-relationship-insight)

**接口测试:** [https://api.gugudata.com/ai/bazi-relationship-insight/demo](https://api.gugudata.com/ai/bazi-relationship-insight/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 开发者中心获取的 APPKEY。可使用 Authorization: Bearer YOUR_TOKEN appkey 参数传入。 |
| personA | object | 是 | YOUR_VALUE | 甲方完整出生资料对象，gender、calendarType、birthDate、birthTime 为必填字段。 |
| personB | object | 是 | YOUR_VALUE | 乙方完整出生资料对象，字段规则与 personA 相同。 |
| personA.name | string | 否 | YOUR_VALUE | 甲方称呼，可选，最多 50 个字符，仅用于区分双方。 |
| personA.gender | string | 是 | YOUR_VALUE | 甲方性别，支持男、女、male、female、m、f，英文值会自动规范化。 |
| personA.calendarType | string | 是 | YOUR_VALUE | 甲方出生日期历法，支持公历、农历、solar、gregorian、lunar。 |
| personA.birthDate | string | 是 | 1990-12-01 | 甲方出生日期，严格使用 YYYY-MM-DD 格式，并与 calendarType 对应。 |
| personA.birthTime | string | 是 | YOUR_VALUE | 甲方出生时间，使用 HH:mm 或 HH:mm:ss 的 24 小时制格式。 |
| personA.birthPlace | string | 否 | YOUR_VALUE | 甲方出生地点，可填写城市或地区名称，最多 100 个字符。 |
| personA.isLeapMonth | boolean | 否 | false | 甲方农历生日是否为闰月；calendarType=农历时按实际情况设置。 |
| personA.language | string | 否 | zh-CN | 甲方资料对应的输出语言，支持 zh-CN、zh-TW、en-US。 |
| personB.name | string | 否 | YOUR_VALUE | 乙方称呼，可选，最多 50 个字符，仅用于区分双方。 |
| personB.gender | string | 是 | YOUR_VALUE | 乙方性别，支持男、女、male、female、m、f，英文值会自动规范化。 |
| personB.calendarType | string | 是 | YOUR_VALUE | 乙方出生日期历法，支持公历、农历、solar、gregorian、lunar。 |
| personB.birthDate | string | 是 | 1992-06-15 | 乙方出生日期，严格使用 YYYY-MM-DD 格式，并与 calendarType 对应。 |
| personB.birthTime | string | 是 | YOUR_VALUE | 乙方出生时间，使用 HH:mm 或 HH:mm:ss 的 24 小时制格式。 |
| personB.birthPlace | string | 否 | YOUR_VALUE | 乙方出生地点，可填写城市或地区名称，最多 100 个字符。 |
| personB.isLeapMonth | boolean | 否 | false | 乙方农历生日是否为闰月；calendarType=农历时按实际情况设置。 |
| personB.language | string | 否 | zh-CN | 乙方资料对应的输出语言，支持 zh-CN、zh-TW、en-US。 |
| focusAreas | array | 否 | YOUR_VALUE | 希望重点分析的方向，最多 6 项，例如沟通、家庭、价值观、长期相处。为空时使用默认方向。 |
| responseMode | string | 否 | sync | 响应模式：sync 同步返回结果；task 创建异步任务并返回 operationId。 |
| streaming | boolean | 否 | false | 是否使用 SSE 流式响应。true 仅支持 responseMode=sync，不能与 task 同时使用。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| Data.基础数据 | object | 双方规范化出生资料与历法基础信息。 |
| Data.文化解读 | object | 关系摘要、互补特点与相处建议。 |
| Data.免责声明 | string | 传统文化研究与娱乐参考说明。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 请求成功并返回关系合参结果。 |
| 101 | 参数错误 | 请检查双方出生资料、历法、日期时间和 focusAreas。 |
| 102 | 请求频率受限 | 当前请求频率超过 APPKEY 的 QPS 限制。 |
| 104 | APPKEY 错误 | APPKEY 无效、已过期或未购买本接口。 |

## 6. 适用场景

- 适合用于传统文化内容与娱乐参考，快速补齐产品侧需要的 八字关系合参 数据能力。
- 适合用于个人周期趋势解读，减少手工整理、清洗与重复开发成本。
- 适合用于文化类产品与内容服务接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[任务状态查询](https://api.gugudata.com/ai/operations/{operation_id}?appkey=REDACTED)（GET），轮询异步任务状态，任务成功时在 Data.result 返回业务结果。
