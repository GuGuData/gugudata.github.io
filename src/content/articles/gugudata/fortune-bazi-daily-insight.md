---
title: "八字每日趋势解读 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/bazi-daily-insight"
section: "gugudata"
slug: "fortune-bazi-daily-insight"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/bazi-daily-insight"
cover: "https://static.gugudata.com/api-cover-bazi-daily-insight.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/bazi-daily-insight](https://www.gugudata.com/api/details/bazi-daily-insight)

八字每日趋势解读 API 自有模型训练的每日节奏洞察，传统文化、八字趋势、每日解读、AI等关键词场景常会用到，适合用于传统文化内容与娱乐参考、个人周期趋势解读与文化类产品与内容服务接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-cover-bazi-daily-insight.jpg)

## 1. 产品功能

- 接收姓名、性别、历法、出生日期、出生时间和地点等资料；
- 支持指定任意目标日期，不传时自动使用北京时间当天；
- 兼容公历、农历以及中英文性别和历法输入；
- 返回目标日期对应的农历、干支、生肖、星座和节气信息；
- 提供事业学习、关系沟通、生活节奏和行动提醒；
- 同一出生资料和目标日期可复用稳定的周期结果；
- 同时支持同步 JSON、异步任务和 SSE 流式响应；
- 结果用于传统文化研究与娱乐参考，不作为现实决策依据；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/bazi-daily-insight

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/bazi-daily-insight?appkey=REDACTED&profile=YOUR_VALUE&profile.name=YOUR_VALUE&profile.gender=YOUR_VALUE&profile.calendarType=YOUR_VALUE&profile.birthDate=1990-12-01&profile.birthTime=YOUR_VALUE&profile.birthPlace=YOUR_VALUE&profile.isLeapMonth=false&profile.language=zh-CN&targetDate=2026-07-18&responseMode=sync&streaming=false

**数据预览:** [https://www.gugudata.com/preview/bazi-daily-insight](https://www.gugudata.com/preview/bazi-daily-insight)

**接口测试:** [https://api.gugudata.com/ai/bazi-daily-insight/demo](https://api.gugudata.com/ai/bazi-daily-insight/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 开发者中心获取的 APPKEY。可使用 Authorization: Bearer YOUR_TOKEN appkey 参数传入。 |
| profile | object | 是 | YOUR_VALUE | 完整出生资料对象，gender、calendarType、birthDate、birthTime 为必填字段。 |
| profile.name | string | 否 | YOUR_VALUE | 称呼，可选，最多 50 个字符。 |
| profile.gender | string | 是 | YOUR_VALUE | 性别，支持男、女、male、female、m、f，英文值会自动规范化。 |
| profile.calendarType | string | 是 | YOUR_VALUE | 出生日期历法，支持公历、农历、solar、gregorian、lunar。 |
| profile.birthDate | string | 是 | 1990-12-01 | 出生日期，严格使用 YYYY-MM-DD 格式，并与 calendarType 对应。 |
| profile.birthTime | string | 是 | YOUR_VALUE | 出生时间，使用 HH:mm 或 HH:mm:ss 的 24 小时制格式。 |
| profile.birthPlace | string | 否 | YOUR_VALUE | 出生地点，可填写城市或地区名称，最多 100 个字符。 |
| profile.isLeapMonth | boolean | 否 | false | 农历生日是否为闰月；calendarType=农历时按实际情况设置。 |
| profile.language | string | 否 | zh-CN | 输出语言，支持 zh-CN、zh-TW、en-US。 |
| targetDate | string | 否 | YOUR_VALUE | 需要解读的日期，使用 YYYY-MM-DD 格式；不传时默认为北京时间当天。 |
| responseMode | string | 否 | sync | 响应模式：sync 同步返回结果；task 创建异步任务并返回 operationId。 |
| streaming | boolean | 否 | false | 是否使用 SSE 流式响应。true 仅支持 responseMode=sync，不能与 task 同时使用。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| Data.基础数据 | object | 出生资料和目标日期历法信息。 |
| Data.文化解读 | object | 每日主题、方向分析和行动建议。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 请求成功并返回目标日期趋势结果。 |
| 101 | 参数错误 | 请检查出生资料、目标日期和响应模式。 |
| 102 | 请求频率受限 | 当前请求频率超过 APPKEY 的 QPS 限制。 |
| 104 | APPKEY 错误 | APPKEY 无效、已过期或未购买本接口。 |

## 6. 适用场景

- 适合用于传统文化内容与娱乐参考，快速补齐产品侧需要的 八字每日趋势解读 数据能力。
- 适合用于个人周期趋势解读，减少手工整理、清洗与重复开发成本。
- 适合用于文化类产品与内容服务接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[任务状态查询](https://api.gugudata.com/ai/operations/{operation_id}?appkey=REDACTED)（GET），轮询异步任务状态，任务成功时在 Data.result 返回业务结果。
