---
title: "农历与二十四节气 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/lunarcalendar"
section: "gugudata"
slug: "weather-lunarcalendar"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/lunarcalendar"
cover: "https://static.gugudata.com/api_weather_lunar.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/lunarcalendar](https://www.gugudata.com/api/details/lunarcalendar)

农历与二十四节气 API 任意日期查询，基础数据等关键词场景常会用到，适合用于天气与天文信息查询、出行、旅游与本地化服务与环境信息展示与预测支持等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_weather_lunar.jpg)

## 1. 产品功能

- 支持任意日期的农历与二十四节气查询；
- 节气包含当日、下一个以及全年节气与日期；
- 同时返回农历中文；
- 围绕“农历与二十四节气”提供标准化能力，便于快速接入现有业务；
- 适合将“农历与二十四节气”结果接入业务系统、后台工具和自动化流程；
- 适合出行服务、城市看板和生活服务页面接入；
- 可与天气、空气质量、日出日落和农历接口组合展示；
- 支持按城市、日期或时间维度组织环境信息；

## 2. API 文档

**接口地址:** https://api.gugudata.com/weather/lunarcalendar

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/weather/lunarcalendar?appkey=REDACTED&date=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/lunarcalendar](https://www.gugudata.com/preview/lunarcalendar)

**接口测试:** [https://api.gugudata.com/weather/lunarcalendar/demo](https://api.gugudata.com/weather/lunarcalendar/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| date | string | 是 | YOUR_VALUE | 请求转换的日期，格式为: yyyymmdd，如 20220101 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量 |
| Data.LunarDate | string | 农历日期 |
| Data.LunarDateChinese | string | 农历中文日期，如: 二零二二 壬寅 虎年 九月小初三 |
| Data.SolarTermNext | string | 下一个节气与日期，如: 寒露:10-8 |
| Data.SolarTermThisYear | string | 本年所有节气与日期，如: 立春:2-4 雨水:2-19 惊蛰:3-5 春分:3-20 清明:4-5 谷雨:4-20 立夏:5-5 小满:5-21 芒种:6-6 夏至:6-21 小暑:7-7 大暑:7-23 立秋:8-7 处暑:8-23 白露:9-7 秋分:9-23 寒露:10-8 霜降:10-23 立冬:11-7 小雪:11-22 大雪:12-7 冬至:12-22 小寒:1-5 大寒:1-20 |
| Data.SolarTermToday | string | 今日节气，如: 寒露:10-8 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | - |
| 102 | 请求频率受限 | 每分钟请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于天气与天文信息查询，快速补齐产品侧需要的 农历与二十四节气 数据能力。
- 适合用于出行、旅游与本地化服务，减少手工整理、清洗与重复开发成本。
- 适合用于环境信息展示与预测支持，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[全国城市实时空气质量指数](https://www.gugudata.com/api/details/airquality)，适合补充同类场景的接口能力。
- 可搭配使用：[日出与日落时间](https://www.gugudata.com/api/details/sunrisesunset)，适合补充同类场景的接口能力。
- 可搭配使用：[全国天气预报信息](https://www.gugudata.com/api/details/weatherinfo)，适合补充同类场景的接口能力。
