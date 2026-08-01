---
title: "星座周期趋势解读 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/western-zodiac-period-insight"
section: "gugudata"
slug: "fortune-western-zodiac-period-insight"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/western-zodiac-period-insight"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/9c82ef57760cf85df50242e957e371a4.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/western-zodiac-period-insight](https://www.gugudata.com/api/details/western-zodiac-period-insight)

星座周期趋势解读 API 星座周期趋势的智能解读，星座、周期趋势、文化娱乐、AI等关键词场景常会用到，适合用于传统文化内容与娱乐参考、个人周期趋势解读与文化类产品与内容服务接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/9c82ef57760cf85df50242e957e371a4.jpg)

## 1. 产品功能

- 支持中文、英文星座名称或通过出生日期自动换算；
- 严格校验星座与出生日期二选一，避免输入含义冲突；
- 覆盖今日、明日、本周、本月和本年五种周期；
- 周期起止标识按北京时间和目标日期自动规范化；
- 星座归属由本地日期边界规则计算，不受文化解读影响；
- 提供周期主题、事业学习、关系沟通和生活提醒；
- 同时支持同步 JSON、异步任务和 SSE 流式响应；
- 结果用于传统文化研究与娱乐参考，不作为现实决策依据；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/western-zodiac-period-insight

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/western-zodiac-period-insight?appkey=REDACTED&sign=巨蟹座&period=today&targetDate=2026-07-18&language=zh-CN&responseMode=sync&streaming=false

**数据预览:** [https://www.gugudata.com/preview/western-zodiac-period-insight](https://www.gugudata.com/preview/western-zodiac-period-insight)

**接口测试:** [https://api.gugudata.com/ai/western-zodiac-period-insight/demo](https://api.gugudata.com/ai/western-zodiac-period-insight/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 开发者中心获取的 APPKEY。可使用 Authorization: Bearer YOUR_TOKEN appkey 参数传入。 |
| sign | string | 否 | YOUR_VALUE | 十二星座中文或英文名称，例如巨蟹座、cancer；与 birthDate 必须且只能传一个。 |
| birthDate | string | 否 | YOUR_VALUE | 出生日期，使用 YYYY-MM-DD 格式，系统会按日期边界换算星座；与 sign 必须且只能传一个。 |
| period | string | 否 | today | 解读周期：today 今日、tomorrow 明日、week 本周、month 本月、year 本年。 |
| targetDate | string | 否 | YOUR_VALUE | 周期计算基准日期，使用 YYYY-MM-DD 格式；不传时默认为北京时间当天。 |
| language | string | 否 | zh-CN | 输出语言，支持 zh-CN、zh-TW、en-US。 |
| responseMode | string | 否 | sync | 响应模式：sync 同步返回结果；task 创建异步任务并返回 operationId。 |
| streaming | boolean | 否 | false | 是否使用 SSE 流式响应。true 仅支持 responseMode=sync，不能与 task 同时使用。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| Data.基础数据.星座 | string | 规范化星座。 |
| Data.基础数据.周期标识 | string | 本次结果对应的周期。 |
| Data.文化解读 | object | 周期主题、方向分析与提醒。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 请求成功并返回星座周期趋势结果。 |
| 101 | 参数错误 | sign 与 birthDate 必须且只能传一个，并检查周期和日期格式。 |
| 102 | 请求频率受限 | 当前请求频率超过 APPKEY 的 QPS 限制。 |
| 104 | APPKEY 错误 | APPKEY 无效、已过期或未购买本接口。 |

## 6. 适用场景

- 适合用于传统文化内容与娱乐参考，快速补齐产品侧需要的 星座周期趋势解读 数据能力。
- 适合用于个人周期趋势解读，减少手工整理、清洗与重复开发成本。
- 适合用于文化类产品与内容服务接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[任务状态查询](https://api.gugudata.com/ai/operations/{operation_id}?appkey=REDACTED)（GET），轮询异步任务状态，任务成功时在 Data.result 返回业务结果。
