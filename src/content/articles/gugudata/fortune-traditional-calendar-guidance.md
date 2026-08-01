---
title: "传统历法宜忌参考 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/traditional-calendar-guidance"
section: "gugudata"
slug: "fortune-traditional-calendar-guidance"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/traditional-calendar-guidance"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/be88f18c893ecb0429c3cdd95c4f135c.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/traditional-calendar-guidance](https://www.gugudata.com/api/details/traditional-calendar-guidance)

传统历法宜忌参考 API 传统历法与时辰的智能参考，传统历法、农历节气、宜忌参考、AI等关键词场景常会用到，适合用于传统文化内容与娱乐参考、个人周期趋势解读与文化类产品与内容服务接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/be88f18c893ecb0429c3cdd95c4f135c.jpg)

## 1. 产品功能

- 按指定公历日期和时辰计算完整传统历法信息；
- 返回农历年月日、年月至日时四柱干支、生肖和星座；
- 提供当日节气、下一个节气及对应公历日期；
- 提供宜忌、生肖冲煞、吉神凶煞和彭祖百忌；
- 补充十二值日、二十八宿、纳音、方位和胎神信息；
- 历法基础字段由确定性规则计算，不被文化解读改写；
- 同时支持同步 JSON、异步任务和 SSE 流式响应；
- 结果用于传统文化研究与娱乐参考，不作为现实决策依据；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/traditional-calendar-guidance

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/traditional-calendar-guidance?appkey=REDACTED&date=2026-07-18&time=12:00&timezone=Asia/Shanghai&language=zh-CN&responseMode=sync&streaming=false

**数据预览:** [https://www.gugudata.com/preview/traditional-calendar-guidance](https://www.gugudata.com/preview/traditional-calendar-guidance)

**接口测试:** [https://api.gugudata.com/ai/traditional-calendar-guidance/demo](https://api.gugudata.com/ai/traditional-calendar-guidance/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 开发者中心获取的 APPKEY。可使用 Authorization: Bearer YOUR_TOKEN appkey 参数传入。 |
| date | string | 是 | 2026-07-10 | 需要查询的公历日期，严格使用 YYYY-MM-DD 格式。 |
| time | string | 否 | YOUR_VALUE | 需要查询的具体时间，使用 HH:mm 或 HH:mm:ss 的 24 小时制格式；不传时按中午 12:00 计算。 |
| timezone | string | 否 | YOUR_VALUE | 日期与时辰使用的时区，当前固定支持 Asia/Shanghai。 |
| language | string | 否 | zh-CN | 输出语言，支持 zh-CN、zh-TW、en-US。 |
| responseMode | string | 否 | sync | 响应模式：sync 同步返回结果；task 创建异步任务并返回 operationId。 |
| streaming | boolean | 否 | false | 是否使用 SSE 流式响应。true 仅支持 responseMode=sync，不能与 task 同时使用。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| Data.基础数据.农历日期 | object | 农历年月日和中文日期。 |
| Data.基础数据.干支 | object | 年、月、日、时干支。 |
| Data.基础数据.节气 | object | 当日和下一个节气。 |
| Data.基础数据.宜 | array | 传统历法宜项。 |
| Data.基础数据.忌 | array | 传统历法忌项。 |
| Data.文化解读 | object | 日程安排参考。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 请求成功并返回传统历法宜忌参考。 |
| 101 | 参数错误 | 请检查日期、时间、时区和响应模式。 |
| 102 | 请求频率受限 | 当前请求频率超过 APPKEY 的 QPS 限制。 |
| 104 | APPKEY 错误 | APPKEY 无效、已过期或未购买本接口。 |

## 6. 适用场景

- 适合用于传统文化内容与娱乐参考，快速补齐产品侧需要的 传统历法宜忌参考 数据能力。
- 适合用于个人周期趋势解读，减少手工整理、清洗与重复开发成本。
- 适合用于文化类产品与内容服务接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[任务状态查询](https://api.gugudata.com/ai/operations/{operation_id}?appkey=REDACTED)（GET），轮询异步任务状态，任务成功时在 Data.result 返回业务结果。
