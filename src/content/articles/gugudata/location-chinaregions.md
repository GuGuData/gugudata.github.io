---
title: "全国省市区街道村信息 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/chinaregions"
section: "gugudata"
slug: "location-chinaregions"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/chinaregions"
cover: "https://static.gugudata.com/api_china_regions_v2.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/chinaregions](https://www.gugudata.com/api/details/chinaregions)

全国省市区街道村信息 API 提供全国省市区街道居委会信息，基础数据等关键词场景常会用到，适合用于区域编码与地理信息处理、地图、本地生活与物流系统与地址标准化与空间数据转换等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_china_regions_v2.jpg)

## 1. 产品功能

- 更新了最新的 12 位编码的行政区划编码格式；
- 三种行政区划编码格式，与国家规范一致，最新建议调用 v3 版本；
- 提供全国最新、最全的省市区镇街道区域信息；
- 每周校对、清洗、更新数据，第一时间同步更新区域信息变动；
- 可返回行政区划中心点地理坐标；
- 最小级别可以详细到镇、街道以及居委会/村级别，为国内区域单元最小级别；
- 围绕“全国省市区街道村信息”提供标准化能力，便于快速接入现有业务；
- 适合将“全国省市区街道村信息”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/location/chinaregions

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/location/chinaregions?appkey=REDACTED&regioncode=YOUR_VALUE&version=3

**数据预览:** [https://www.gugudata.com/preview/chinaregions](https://www.gugudata.com/preview/chinaregions)

**接口测试:** [https://api.gugudata.com/location/chinaregions/demo](https://api.gugudata.com/location/chinaregions/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| regioncode | string | 是 | YOUR_VALUE | 需要查询的父级区域编码，传递 0 获取全国所有省级别数据；编码格式为 00000000，每两位分别对应省、市、区、镇/街道编码（注意：v2 版本会在国家 6 位行政区划标准代码后添加 00 两位编码以保持接口兼容，v3 版本为 12 位编码格式） |
| version | int | 是 | 3 | 当传递参数值为 2 时，调用 v2 版本的接口，regioncode 遵循国家行政区划代码标准，同时可返回新增区划中心点坐标。当传递参数值为 3 时，调用 v3 版本的接口（v1 版本主要为了兼容历史用户调用逻辑，新用户强烈建议调用 v3 接口） |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.RegionCode | string | 区域编码（在 v2 版本中，前六位为国家行政区划标准编码，镇/街道是没有国家标准编码的，对应的编码只是对应的序号。v3 版本中，为最新的 12 位国家行政区划标准编码。） |
| Data.RegionName | string | 区域名称（部分城市在“市”级别后没有“区”级别，会直接返回“镇/街道”信息，注意根据「区域级别」字段进行处理） |
| Data.RegionType | string | 区域级别，枚举值为：省/自治区/直辖市/特别行政区 \| 市 \| 区 \| 镇/街道 ｜ 居委会/村 |
| Data.CenterLonLat | string | 部分数据包含区划中心点坐标，格式为 [经度,纬度]，地理坐标系为 GCJ-02。需要转换坐标系请调用[地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter)接口 |

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

- 适合用于区域编码与地理信息处理，快速补齐产品侧需要的 全国省市区街道村信息 数据能力。
- 适合用于地图、本地生活与物流系统，减少手工整理、清洗与重复开发成本。
- 适合用于地址标准化与空间数据转换，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter)，适合补充同类场景的接口能力。
- 可搭配使用：[国内 IP 地址定位](https://www.gugudata.com/api/details/iplocation)，适合补充同类场景的接口能力。
- 可搭配使用：[国家地区基础信息数据](https://www.gugudata.com/api/details/metacountry)，适合补充同类场景的接口能力。
