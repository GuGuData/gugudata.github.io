---
title: "日出与日落时间 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/sunrisesunset"
section: "gugudata"
slug: "weather-sunriseandsunset"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/sunrisesunset"
cover: "https://static.gugudata.com/api_cover_sunrise_sunset.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/sunrisesunset](https://www.gugudata.com/api/details/sunrisesunset)

日出与日落时间 API 多个天文指标，基础数据等关键词场景常会用到，适合用于天气与天文信息查询、出行、旅游与本地化服务与环境信息展示与预测支持等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_sunrise_sunset.png)

## 1. 产品功能

- 支持全国多个城市精准查询；
- 多个天文曙暮光指标；
- 包含白日时长以及相对变化值；
- 返回每日正午时间点以及日地距离；
- 围绕“日出与日落时间”提供标准化能力，便于快速接入现有业务；
- 适合将“日出与日落时间”结果接入业务系统、后台工具和自动化流程；
- 适合出行服务、城市看板和生活服务页面接入；
- 可与天气、空气质量、日出日落和农历接口组合展示；

## 2. API 文档

**接口地址:** https://api.gugudata.com/weather/sunriseandsunset

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/weather/sunriseandsunset?appkey=REDACTED&city=YOUR_VALUE&date=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/sunrisesunset](https://www.gugudata.com/preview/sunrisesunset)

**接口测试:** [https://api.gugudata.com/weather/sunriseandsunset/demo](https://api.gugudata.com/weather/sunriseandsunset/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| city | string | 是 | YOUR_VALUE | 查询城市名，如北京、南京、保定等 |
| date | string | 是 | YOUR_VALUE | 查询的日期，格式为 yyyymmdd，如 20220701 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.City | string | 返回数据的城市名称 |
| Data.SunriseTime | string | 日出时间，格式为: hh:mm |
| Data.SunsetTime | string | 日落时间，格式为: hh:mm |
| Data.DaylightHours | string | 日光时间，格式为: hh:mm:ss |
| Data.DaylightHoursDiff | string | 日光时间差，格式为: (+/-)hh:mm，+ 为较于前日增加，- 为较于前日减少 |
| Data.AstroTwilightStart | string | 天文曙暮光开始时间，格式为: hh:mm |
| Data.AstroTwilightEnd | string | 天文曙暮光结束时间，格式为: hh:mm |
| Data.NauticalTwilightStart | string | 航海曙暮光开始时间，格式为: hh:mm |
| Data.NauticalTwilightEnd | string | 航海曙暮光结束时间，格式为: hh:mm |
| Data.CivilTwilightStart | string | 民用曙暮光开始时间，格式为: hh:mm |
| Data.CivilTwilightEnd | string | 民用曙暮光结束时间，格式为: hh:mm |
| Data.SolarNoonTime | string | 正午时刻，格式为: hh:mm |
| Data.SolarNoonDistance | string | 正午时刻太阳距离，单位为：百万公里 |

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

- 适合用于天气与天文信息查询，快速补齐产品侧需要的 日出与日落时间 数据能力。
- 适合用于出行、旅游与本地化服务，减少手工整理、清洗与重复开发成本。
- 适合用于环境信息展示与预测支持，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[全国城市实时空气质量指数](https://www.gugudata.com/api/details/airquality)，适合补充同类场景的接口能力。
- 可搭配使用：[农历与二十四节气](https://www.gugudata.com/api/details/lunarcalendar)，适合补充同类场景的接口能力。
- 可搭配使用：[全国天气预报信息](https://www.gugudata.com/api/details/weatherinfo)，适合补充同类场景的接口能力。
