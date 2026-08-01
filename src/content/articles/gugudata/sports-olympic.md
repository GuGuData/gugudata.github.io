---
title: "历年奥运比赛数据 API 接口"
description: "包含运动员以及奖牌数据,历年所有数据 / 多种查询条件。"
section: "gugudata"
slug: "sports-olympic"
lang: "zh-CN"
status: "archived"
tags: ["API","GuGuData"]
publishedAt: "2026-04-24T22:34:50.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
cover: "https://static.gugudata.com/api_sports_olympic.png"
author: "GuGuData"
---
包含运动员以及奖牌数据，历年所有数据 / 多种查询条件。

![gugudata_api_cover](https://static.gugudata.com/api_sports_olympic.png)

## 1. 产品功能

- 自奥运举办以来历年的所有数据；
- 27 万全量数据；
- 多种查询条件便于多维度分析；
- 数据持续更新与维护；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡。

## 2. API 文档

**API 详情地址:** [https://www.gugudata.com/api/details/olympic](https://www.gugudata.com/api/details/olympic)

**接口地址:** https://api.gugudata.com/sports/olympic

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/sports/olympic?appkey=REDACTED
&nationalCode=YOUR_VALUE
&year=YOUR_VALUE
&sport=YOUR_VALUE
&medal=YOUR_VALUE
&pagesize=10
&pageindex=1

**接口测试:** https://api.gugudata.com/sports/olympic/demo

## 3. 请求参数

|    参数名    | 参数类型 | 是否必须 |   默认值    |                     备注                      |
| :----------: | :------: | :------: | :---------: | :-------------------------------------------: |
|    appkey    |  string  |    是    | YOUR_APPKEY |              付费后获取的 APPKEY              |
| nationalCode |  string  |    否    | YOUR_VALUE  |    代表的国家代码，具体值参见参数枚举页面     |
|     year     |   int    |    否    | YOUR_VALUE  |            奥运比赛的年份，如 2008            |
|    sport     |  string  |    否    | YOUR_VALUE  |    奥运比赛的项目，具体值参见参数枚举页面     |
|    medal     |   int    |    否    | YOUR_VALUE  |    获得的比赛奖牌，具体值参见参数枚举页面     |
|   pagesize   |   int    |    是    |     10      | 分页参数，每页总条数，取值范围在 10 ~ 50 之间 |
|  pageindex   |   int    |    是    |      1      |               分页参数，第几页                |

## 4. 返回参数

|            参数名            | 参数类型 |                 备注                 |
| :--------------------------: | :------: | :----------------------------------: |
|    DataStatus.StatusCode     |   int    |            接口返回状态码            |
| DataStatus.StatusDescription |  string  |           接口返回状态说明           |
| DataStatus.ResponseDateTime  |  string  |           接口数据返回时间           |
|  DataStatus.DataTotalCount   |   int    | 此条件下的总数据量，一般用于分页计算 |
|          Data.Name           |  string  |             参赛运动员名             |
|           Data.Sex           |  string  |    参赛运动员性别，F 男性，M 女性    |
|           Data.Age           |  string  |         参赛运动员参赛时年龄         |
|         Data.Height          |  string  |         参赛运动员参赛时身高         |
|         Data.Weight          |  string  |         参赛运动员参赛时体重         |
|          Data.Team           |  string  |            代表的国家全称            |
|           Data.NOC           |  string  |            代表的国家代码            |
|          Data.Year           |  string  |               比赛年份               |
|         Data.Season          |  string  |       夏季奥运会还是冬季奥运会       |
|          Data.City           |  string  |              举办的城市              |
|          Data.Sport          |  string  |         参赛项目（大项名称）         |
|          Data.Event          |  string  |         参赛项目（小项名称）         |
|          Data.Medal          |  string  |            获得的奖牌名称            |
