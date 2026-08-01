---
title: "国家地区基础信息数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/metacountry"
section: "gugudata"
slug: "location-metacountry"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/metacountry"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/db0de83a21addcec5bc4e48c965c8999.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/metacountry](https://www.gugudata.com/api/details/metacountry)

国家地区基础信息数据 API 全球国家地区基础资料查询，基础数据等关键词场景常会用到，适合用于区域编码与地理信息处理、地图、本地生活与物流系统与地址标准化与空间数据转换等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/db0de83a21addcec5bc4e48c965c8999.jpg)

## 1. 产品功能

- 支持查询国家和地区的基础元数据；
- languages 可用于按语言代码筛选结果，例如 zh、en；
- 返回字段采用 v2 响应格式，dataStatus 和 data 字段为小驼峰命名；
- 适合国家地区选择器、电话区号补全、跨境业务资料库和地理维度分析等场景；
- 围绕“国家地区基础信息数据”提供标准化能力，便于快速接入现有业务；
- 适合将“国家地区基础信息数据”结果接入业务系统、后台工具和自动化流程；
- 适合地址解析、区域筛选、机构网点管理和地图类产品接入；
- 可与行政区划、坐标转换和 IP 定位接口组合使用；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v2/location/country

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v2/location/country?appkey=REDACTED&languages=zh

**数据预览:** [https://www.gugudata.com/preview/metacountry](https://www.gugudata.com/preview/metacountry)

**接口测试:** [https://api.gugudata.com/v2/location/country/demo](https://api.gugudata.com/v2/location/country/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| languages | string | 否 | zh | 语言代码筛选条件，例如 zh、en；为空时返回默认范围。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| dataStatus.requestParameter | string | 本次请求的参数摘要字符串。 |
| dataStatus.statusCode | int | 接口返回状态码。 |
| dataStatus.status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| dataStatus.statusDescription | string | 接口返回状态说明。 |
| dataStatus.responseDateTime | string | 接口数据返回时间。 |
| dataStatus.dataTotalCount | int | 此条件下的数据总量。 |
| data.alphaTwoCode | string | ISO 3166-1 二位国家或地区代码。 |
| data.alphaThreeCode | string | ISO 3166-1 三位国家或地区代码。 |
| data.name | string | 英文名称。 |
| data.nativeName | string | 本地语言名称。 |
| data.emoji | string | 国家或地区旗帜 emoji。 |
| data.phonePrefix | string | 国际电话区号。 |
| data.continent | string | 所属洲。 |
| data.capital | string | 首都或首府。 |
| data.currencies | string | 货币代码，多个值用分隔符表示。 |
| data.languages | string | 语言代码，多个值用分隔符表示。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 200 | 正常返回 | - |
| 400 | 参数错误 | - |
| 429 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 403 | 账号欠费 | 请及时关注订单到期短信提醒 |
| 402 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 500 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于区域编码与地理信息处理，快速补齐产品侧需要的 国家地区基础信息数据 数据能力。
- 适合用于地图、本地生活与物流系统，减少手工整理、清洗与重复开发成本。
- 适合用于地址标准化与空间数据转换，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[全国省市区街道村信息](https://www.gugudata.com/api/details/chinaregions)，适合补充同类场景的接口能力。
- 可搭配使用：[地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter)，适合补充同类场景的接口能力。
- 可搭配使用：[国内 IP 地址定位](https://www.gugudata.com/api/details/iplocation)，适合补充同类场景的接口能力。
