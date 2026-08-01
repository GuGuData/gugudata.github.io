---
title: "港股指数历史行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockhkindexhistory"
section: "gugudata"
slug: "stock-hk-stockhkindexhistory"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockhkindexhistory"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/8b43ec276024a8a2af8b7ef9e4f4cac7.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockhkindexhistory](https://www.gugudata.com/api/details/stockhkindexhistory)

港股指数历史行情数据 API 所有港股指数历史交易行情数据，股票、港股、指数、历史数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/8b43ec276024a8a2af8b7ef9e4f4cac7.jpg)

## 1. 产品功能

- 支持根据指数代码和日期范围查询港股指数历史交易数据；
- 返回历史交易数据的日期、港股指数代码、开盘价、最高价、最低价和收盘价；
- 毫秒级查询性能；
- 全接口支持HTTPS（TLS v1.0/v1.1/v1.2/v1.3）；
- 全面兼容Apple ATS；
- 全国多节点CDN部署；
- 接口响应快速，多台服务器构建API接口负载均衡；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/hk/index/history

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/hk/index/history?appkey=REDACTED&symbol=VHSI&startdate=YOUR_VALUE&enddate=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockhkindexhistory](https://www.gugudata.com/preview/stockhkindexhistory)

**接口测试:** [https://api.gugudata.com/stock/hk/index/history/demo](https://api.gugudata.com/stock/hk/index/history/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的APPKEY |
| symbol | string | 是 | VHSI | 要查询的港股指数代码 |
| startdate | string | 是 | YOUR_VALUE | 查询的开始日期（格式：YYYYMMDD） |
| enddate | string | 是 | YOUR_VALUE | 查询的结束日期（格式：YYYYMMDD） |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 满足条件的数据总数，用于分页计算 |
| Data.DateKey | string | 日期（格式：YYYY-MM-DD） |
| Data.Symbol | string | 港股指数代码 |
| Data.Open | double | 开盘价 |
| Data.High | double | 最高价 |
| Data.Low | double | 最低价 |
| Data.Latest | double | 最新价 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | - |
| 102 | 请求频率受限 | 每秒请求不能超过100次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY错误 | 请检查传递的APPKEY是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 港股指数历史行情数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询港股指数代码列表数据，支持分页查询](https://api.gugudata.com/stock/hk/index/symbols)（GET），包含指数编码、指数名称。
