---
title: "全国城市实时空气质量指数 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/airquality"
section: "gugudata"
slug: "weather-airquality"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/airquality"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/17f11cffbb0663e1286799ed393c782b.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/airquality](https://www.gugudata.com/api/details/airquality)

全国城市实时空气质量指数 API 城市空气质量实时查询，基础数据等关键词场景常会用到，适合用于天气与天文信息查询、出行、旅游与本地化服务与环境信息展示与预测支持等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/17f11cffbb0663e1286799ed393c782b.jpg)

## 1. 产品功能

- 支持按中国城市名称查询实时空气质量数据；
- 返回 AQI、空气质量等级、PM2.5 浓度和首要污染物；
- 围绕“全国城市实时空气质量指数”提供标准化能力，便于快速接入现有业务；
- 适合将“全国城市实时空气质量指数”结果接入业务系统、后台工具和自动化流程；
- 适合出行服务、城市看板和生活服务页面接入；
- 可与天气、空气质量、日出日落和农历接口组合展示；
- 支持按城市、日期或时间维度组织环境信息；
- 支持按 AQI 等级、PM2.5 指标和首要污染物组织提醒规则；

## 2. API 文档

**接口地址:** https://api.gugudata.com/Weather/AirQuality

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/Weather/AirQuality?appkey=REDACTED&city=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/airquality](https://www.gugudata.com/preview/airquality)

**接口测试:** [https://api.gugudata.com/Weather/AirQuality/demo](https://api.gugudata.com/Weather/AirQuality/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| city | string | 是 | YOUR_VALUE | 需要查询的中国城市名称，例如：北京、南京、上海、广州、深圳。接口会按城市名称实时匹配当前可用监测数据，不再限制为旧版固定城市列表。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量 |
| Data.Province | string | 省份名称 |
| Data.City | string | 城市名称 |
| Data.AQI | string | 空气质量指数 |
| Data.Quality | string | 空气质量 |
| Data.PM25 | string | PM2.5 浓度 |
| Data.PrimaryPollutant | string | 首要污染物 |

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

- 适合用于天气与天文信息查询，快速补齐产品侧需要的 全国城市实时空气质量指数 数据能力。
- 适合用于出行、旅游与本地化服务，减少手工整理、清洗与重复开发成本。
- 适合用于环境信息展示与预测支持，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[农历与二十四节气](https://www.gugudata.com/api/details/lunarcalendar)，适合补充同类场景的接口能力。
- 可搭配使用：[日出与日落时间](https://www.gugudata.com/api/details/sunrisesunset)，适合补充同类场景的接口能力。
- 可搭配使用：[全国天气预报信息](https://www.gugudata.com/api/details/weatherinfo)，适合补充同类场景的接口能力。
