---
title: "地理坐标系转换 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/coordinateconverter"
section: "gugudata"
slug: "location-coordinateconverter"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/coordinateconverter"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/b7eed8fd050b3a072d695c41178f76e3.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/coordinateconverter](https://www.gugudata.com/api/details/coordinateconverter)

地理坐标系转换 API 提供地理信息坐标系的相互转换，网络工具、地理坐标等关键词场景常会用到，适合用于区域编码与地理信息处理、地图、本地生活与物流系统与地址标准化与空间数据转换等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/b7eed8fd050b3a072d695c41178f76e3.jpg)

## 1. 产品功能

- 支持多种地理信息坐标系；
- 高精度坐标系转换算法；
- 支持的地理坐标系：WGS84, GCJ02, BD09；
- 围绕“地理坐标系转换”提供标准化能力，便于快速接入现有业务；
- 适合将“地理坐标系转换”结果接入业务系统、后台工具和自动化流程；
- 适合地址解析、区域筛选、机构网点管理和地图类产品接入；
- 可与行政区划、坐标转换和 IP 定位接口组合使用；
- 支持按区域层级、坐标或网络地址组织查询结果；

## 2. API 文档

**接口地址:** https://api.gugudata.com/location/coordinateconverter

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/location/coordinateconverter?appkey=REDACTED&from=YOUR_VALUE&to=YOUR_VALUE&value=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/coordinateconverter](https://www.gugudata.com/preview/coordinateconverter)

**接口测试:** [https://api.gugudata.com/location/coordinateconverter/demo](https://api.gugudata.com/location/coordinateconverter/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| from | string | 是 | YOUR_VALUE | 原数据的坐标系，可选值：WGS84, GCJ02, BD09 |
| to | string | 是 | YOUR_VALUE | 目标数据的坐标系，可选值：WGS84, GCJ02, BD09 |
| value | string | 是 | YOUR_VALUE | 需要转换的坐标值，格式为：[120.54,32.74] |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.CoordinateFrom | string | 原数据的坐标系 |
| Data.CoordinateTo | string | 目标数据的坐标系 |
| Data.CoordinateSourceValue | string | 需要转换的坐标值 |
| Data.CoordinateDestinationValue | string | 转换后的坐标值 |

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

- 适合用于区域编码与地理信息处理，快速补齐产品侧需要的 地理坐标系转换 数据能力。
- 适合用于地图、本地生活与物流系统，减少手工整理、清洗与重复开发成本。
- 适合用于地址标准化与空间数据转换，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[全国省市区街道村信息](https://www.gugudata.com/api/details/chinaregions)，适合补充同类场景的接口能力。
- 可搭配使用：[国内 IP 地址定位](https://www.gugudata.com/api/details/iplocation)，适合补充同类场景的接口能力。
- 可搭配使用：[国家地区基础信息数据](https://www.gugudata.com/api/details/metacountry)，适合补充同类场景的接口能力。
