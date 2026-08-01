---
title: "地理坐标逆编码 API 接口"
description: "提供精准、高效的地理坐标逆编码接口; 返回的地址包含详细的位置信息; 一次可返回坐标周边的 10 个地址信息; 全接口支持 HTTPS(TLS v1.0 / v1.1 / v1.2 / v1.3); 全面兼容 Apple ATS; 全国多节点 CDN 部署; 接口极速响应,多台服务器构建 API 接口负载均衡。"
section: "gugudata"
slug: "location-geodecode"
lang: "zh-CN"
status: "archived"
tags: ["API","GuGuData"]
publishedAt: "2026-04-24T22:34:50.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
cover: "https://static.gugudata.com/api_latlng2address.jpg"
author: "GuGuData"
---
获取地理坐标周围的地址信息。

![gugudata_api_cover](https://static.gugudata.com/api_latlng2address.jpg)

## 1. 产品功能

- 提供精准、高效的地理坐标逆编码接口；
- 返回的地址包含详细的位置信息；
- 一次可返回坐标周边的 10 个地址信息；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡。

## 2. API 文档

**API 详情地址:** [https://www.gugudata.com/api/details/geodecode](https://www.gugudata.com/api/details/geodecode)

**接口请求地址:** [https://api.gugudata.com/location/geodecode](https://api.gugudata.com/location/geodecode)

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** [https://api.gugudata.com/location/geodecode?appkey=REDACTED&longitude=YOUR_VALUE&latitude=YOUR_VALUE](https://api.gugudata.com/location/geodecode?appkey=REDACTED&longitude=YOUR_VALUE&latitude=YOUR_VALUE)

**接口测试:** [https://api.gugudata.com/location/geodecode/demo](https://api.gugudata.com/location/geodecode/demo)

## 3. 请求参数

|  参数名   | 参数类型 | 是否必须 |   默认值    |        备注         |
| :-------: | :------: | :------: | :---------: | :-----------------: |
|  appkey   |  string  |    是    | YOUR_APPKEY | 付费后获取的 APPKEY |
| longitude |  string  |    是    | YOUR_VALUE  |       经度值        |
| latitude  |  string  |    是    | YOUR_VALUE  |       纬度值        |

## 4. 返回参数

|            参数名            | 参数类型 |                 备注                 |
| :--------------------------: | :------: | :----------------------------------: |
|    DataStatus.StatusCode     |   int    |            接口返回状态码            |
| DataStatus.StatusDescription |  string  |           接口返回状态说明           |
| DataStatus.ResponseDateTime  |  string  |           接口数据返回时间           |
|  DataStatus.DataTotalCount   |   int    | 此条件下的总数据量，一般用于分页计算 |
|         Data.Country         |  string  |                 国家                 |
|        Data.Province         |  string  |                  省                  |
|          Data.City           |  string  |                  市                  |
|        Data.District         |  string  |                  区                  |
|        Data.Township         |  string  |               县/街道                |
|          Data.Name           |  string  |               位置名称               |
|         Data.Address         |  string  |               位置地址               |
