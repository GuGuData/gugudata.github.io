---
title: "基金基本信息 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundinfolist"
section: "gugudata"
slug: "stock-fund-basicinfo"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundinfolist"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/5bc0791860b3c043ade0b9dc421e8e9a.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundinfolist](https://www.gugudata.com/api/details/fundinfolist)

基金基本信息 API 分页获取基金代码、名称、类型与拼音，基金目录、基础信息、分页查询等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/5bc0791860b3c043ade0b9dc421e8e9a.jpg)

## 1. 产品功能

- 分页返回基金代码、简称、全称、基金类型和名称拼音等基础目录信息；
- 可作为基金搜索框、选择器、代码校验和其他基金接口参数准备的数据源；
- DataTotalCount 表示当前基金目录的全部记录数，不是当前页实际返回条数；
- pageIndex 从 1 开始，pageSize 每页最多返回 20 条记录；
- 结果按基金代码整理，同一基金代码只保留一条有效基础信息记录；
- 基金代码始终按字符串返回并保留前导零，接入方不应转换为整数；
- 当外部基础目录暂时不可用时，服务会使用可用的基金元数据保证目录稳定性；
- 本接口不返回净值、价格、收益率或申赎状态，行情数据应使用对应基金接口；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/basicinfo

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/basicinfo?appkey=REDACTED&pageIndex=1&pageSize=10

**数据预览:** [https://www.gugudata.com/preview/fundinfolist](https://www.gugudata.com/preview/fundinfolist)

**接口测试:** [https://api.gugudata.com/fund/basicinfo/demo](https://api.gugudata.com/fund/basicinfo/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| pageIndex | integer | 否 | 1 | 可选。分页页码，从 1 开始；第一页传 1，第二页传 2，以此类推 |
| pageSize | integer | 否 | 10 | 可选。每页返回条数，取值范围为 1~20；未传时默认 10 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 基金的 6 位代码，保留前导零，可作为其他基金接口的 symbol 参数 |
| Data.FundShort | string | 基金简称，适合在空间有限的列表或选择器中展示 |
| Data.FundName | string | 基金完整名称，用于基金详情和精确检索展示 |
| Data.FundType | string | 基金所属类型，例如股票型、混合型、债券型或指数型等 |
| Data.FundPinYin | string | 基金名称对应的拼音检索值，可用于拼音或首字母搜索 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 基金基本信息 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[指数基金业绩](https://www.gugudata.com/api/details/fundbasicindex)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金业绩排行](https://www.gugudata.com/api/details/fundetfopenrankinglist)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金历史净值](https://www.gugudata.com/api/details/fundopenetfhistory)，适合补充同类场景的接口能力。
