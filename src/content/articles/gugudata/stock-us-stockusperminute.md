---
title: "美股分时交易数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockusperminute"
section: "gugudata"
slug: "stock-us-stockusperminute"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockusperminute"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/0b8b280bdbc972802585602f7f5a90a7.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockusperminute](https://www.gugudata.com/api/details/stockusperminute)

美股分时交易数据 API 查询美股指定时间范围内的分时行情，返回开高低收、成交量、成交额和最新价，股票、美股、分时数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/0b8b280bdbc972802585602f7f5a90a7.jpg)

## 1. 产品功能

- 支持美股分时行情查询；
- beginDate 与 endDate 使用 yyyyMMdd HH:mm:ss 时间格式；
- 返回开盘价、收盘价、最高价、最低价、成交量、成交额和最新价；
- 适合美股分时图、盘中行情监控和量价回放等场景；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/us/stockusperminute

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/us/stockusperminute?appkey=REDACTED&symbol=AAPL&beginDate=YOUR_VALUE&endDate=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockusperminute](https://www.gugudata.com/preview/stockusperminute)

**接口测试:** [https://api.gugudata.com/stock/us/stockusperminute/demo](https://api.gugudata.com/stock/us/stockusperminute/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| symbol | string | 是 | AAPL | 美股代码，例如 AAPL、MSFT。 |
| beginDate | string | 是 | YOUR_VALUE | 查询开始时间，格式 yyyyMMdd HH:mm:ss。 |
| endDate | string | 是 | YOUR_VALUE | 查询结束时间，格式 yyyyMMdd HH:mm:ss。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.Symbol | string | 美股代码。 |
| Data.TimeKey | string | 行情时间。 |
| Data.Open | number | 开盘价。 |
| Data.Close | number | 收盘价。 |
| Data.High | number | 最高价。 |
| Data.Low | number | 最低价。 |
| Data.TradingVolume | number | 成交量。 |
| Data.TradingAmount | number | 成交额。 |
| Data.Latest | number | 最新价。 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 美股分时交易数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询美股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/ussymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
