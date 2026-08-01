---
title: "国内 IP 地址定位 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/iplocation"
section: "gugudata"
slug: "location-iplocation"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/iplocation"
cover: "https://static.gugudata.com/api_location_ipaddress_v3.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/iplocation](https://www.gugudata.com/api/details/iplocation)

国内 IP 地址定位 API 根据 IP 地址进行定位查询，网络工具、IP地址等关键词场景常会用到，适合用于区域编码与地理信息处理、地图、本地生活与物流系统与地址标准化与空间数据转换等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_location_ipaddress_v3.jpg)

## 1. 产品功能

- 提供精准、高效的 IPv4/IPv6 地址定位查询；
- 一个接口同时兼容 IPv4 或 IPv6 地址的查询定位；
- 返回的 IP 定位地址包含详细的位置信息；
- 围绕“国内 IP 地址定位”提供标准化能力，便于快速接入现有业务；
- 适合将“国内 IP 地址定位”结果接入业务系统、后台工具和自动化流程；
- 适合地址解析、区域筛选、机构网点管理和地图类产品接入；
- 可与行政区划、坐标转换和 IP 定位接口组合使用；
- 支持按区域层级、坐标或网络地址组织查询结果；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/iplocation

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/iplocation?appkey=REDACTED&ip=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/iplocation](https://www.gugudata.com/preview/iplocation)

**接口测试:** [https://api.gugudata.com/websitetools/iplocation/demo](https://api.gugudata.com/websitetools/iplocation/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| ip | string | 是 | YOUR_VALUE | IP 地址，可以传递 IPv4 或 IPv6 地址 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Country | string | IP 地址定位所在地 |
| Data.Address | string | IP 地址具体定位地址 |
| Data.LocationCode | string | 如有匹配，为国内地址编码，格式为：110000 |

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

- 适合用于区域编码与地理信息处理，快速补齐产品侧需要的 国内 IP 地址定位 数据能力。
- 适合用于地图、本地生活与物流系统，减少手工整理、清洗与重复开发成本。
- 适合用于地址标准化与空间数据转换，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[全国省市区街道村信息](https://www.gugudata.com/api/details/chinaregions)，适合补充同类场景的接口能力。
- 可搭配使用：[地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter)，适合补充同类场景的接口能力。
- 可搭配使用：[国家地区基础信息数据](https://www.gugudata.com/api/details/metacountry)，适合补充同类场景的接口能力。
