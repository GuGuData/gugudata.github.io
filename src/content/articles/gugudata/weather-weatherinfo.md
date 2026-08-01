---
title: "全国天气预报信息 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/weatherinfo"
section: "gugudata"
slug: "weather-weatherinfo"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/weatherinfo"
cover: "https://static.gugudata.com/cover_weather_v3.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/weatherinfo](https://www.gugudata.com/api/details/weatherinfo)

全国天气预报信息 API 精确到行政区的7日天气预报，基础数据等关键词场景常会用到，适合用于天气与天文信息查询、出行、旅游与本地化服务与环境信息展示与预测支持等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/cover_weather_v3.png)

## 1. 产品功能

- 全国天气预报数据，每隔 6 小时更新；
- 包含湿度信息；
- 精确到行政区级别的天气预报数据；
- 提供最长 7 天的天气预报数据；
- 提供每日小时级别的天气预报数据；
- 提供本地日出日落、当日历史温度等附加数据；
- 提供紫外线、穿衣、洗车、空气污染等额外指导数据；
- 围绕“全国天气预报信息”提供标准化能力，便于快速接入现有业务；

## 2. API 文档

**接口地址:** https://api.gugudata.com/weather/weatherinfo

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/weather/weatherinfo?appkey=REDACTED&code=YOUR_VALUE&days=1

**数据预览:** [https://www.gugudata.com/preview/weatherinfo](https://www.gugudata.com/preview/weatherinfo)

**接口测试:** [https://api.gugudata.com/weather/weatherinfo/sz](https://api.gugudata.com/weather/weatherinfo/sz)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| code | string | 是 | YOUR_VALUE | 地区编码，可通过前置接口查询获得地区编码。 |
| days | int | 否 | 1 | 获取天气预报的天数，默认为1，即为当天数据。最大值为7。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量 |
| Data.Code | string | 地区编码 |
| Data.WeatherDate | string | 天气预报的日期 |
| Data.WeatherRegion | object | 当前天气预报的详细地区信息，数据格式与查询地区编码接口返回数据格式一致。 |
| Data.WeatherRegion.ReginType | string | 位置信息类型，2为市级别数据，3为区级别数据 |
| Data.WeatherRegion.Code | string | 地区完整编码 |
| Data.WeatherRegion.ProvinceCode | string | 省编码 |
| Data.WeatherRegion.ProvinceName | string | 省名称 |
| Data.WeatherRegion.CityCode | string | 市编码 |
| Data.WeatherRegion.CityName | string | 市名称 |
| Data.WeatherRegion.RegionCode | string | 区编码 |
| Data.WeatherRegion.RegionName | string | 区名称 |
| Data.WeatherRegion.TownCode | string | 镇编码 |
| Data.WeatherRegion.TownName | string | 镇名称 |
| Data.WeatherInfo | string | 天气情况 |
| Data.TemperatureHigh | int | 最高温度 |
| Data.TemperatureLow | int | 最低温度 |
| Data.TodayHistoryHighestTemperature | int | 当日历史最高温度（历史均值） |
| Data.TodayHistoryLowestTemperature | int | 当日历史最低温度（历史均值） |
| Data.WeatherWindCondition1 | string | 风向1 |
| Data.WeatherWindCondition2 | string | 风向2 |
| Data.WeatherWindLevel | string | 风级 |
| Data.SunRiseTime | string | 日出时间 |
| Data.SunSetTime | string | 日落时间 |
| Data.WeatherPerHour | array | 当日小时级别的天气预报数据数组 |
| Data.WeatherPerHour.WeatherTime | string | 预报的小时时间，24小时制 |
| Data.WeatherPerHour.WeatherInfo | string | 天气情况，天气情况枚举值：晴\|多云\|阴\|阵雨\|雷阵雨\|雷阵雨伴有冰雹\|雨夹雪\|小雨\|中雨\|大雨\|暴雨\|大暴雨\|特大暴雨\|阵雪\|小雪\|中雪\|大雪\|暴雪\|雾\|冻雨\|沙尘暴\|小雨-中雨\|中雨-大雨\|大雨-暴雨\|暴雨-大暴雨\|大暴雨-特大暴雨\|小雪-中雪\|中雪-大雪\|大雪-暴雪\|浮尘\|扬沙\|强沙尘暴\|霾 |
| Data.WeatherPerHour.Temperature | string | 温度 |
| Data.WeatherPerHour.Wet | int | 空气湿度 |
| Data.WeatherPerHour.WeatherWindCondition | string | 风向 |
| Data.WeatherPerHour.WeatherWindLevel | string | 风级 |
| Data.LifeHelperUV | object | UV指数 |
| Data.LifeHelperWear | object | 穿衣指数 |
| Data.LifeHelperWashCar | object | 洗车指数 |
| Data.LifeHelperAir | object | 空气指数 |
| Data.LifeHelper.HelperName | string | 指数名称 |
| Data.LifeHelper.HelperStatus | string | 指数状态 |
| Data.LifeHelper.HelperValue | string | 指数值。总分：紫外线5分，穿衣7分，洗车4分，空气5分 |
| Data.LifeHelper.HelperContent | string | 指数内容 |
| Data.WeatherDataGenerateDateTime | string | 天气预报内容数据生成时间 |

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

- 适合用于天气与天文信息查询，快速补齐产品侧需要的 全国天气预报信息 数据能力。
- 适合用于出行、旅游与本地化服务，减少手工整理、清洗与重复开发成本。
- 适合用于环境信息展示与预测支持，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询地区编码，根据市或区的关键字进行查询，如北京、苏州、海淀、吴中等](https://api.gugudata.com/weather/weatherinfo/region?appkey=REDACTED&keyword=查询编码的市或区关键字，如北京、海淀)（GET），包含地区编码以及省、市、区相关信息。
