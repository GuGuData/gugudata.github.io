---
title: "美股历史行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockus"
section: "gugudata"
slug: "stock-us-history"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockus"
cover: "https://static.gugudata.com/api_stock_us.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockus](https://www.gugudata.com/api/details/stockus)

美股历史行情数据 API 查询美股指定日期范围内的历史行情，股票、美股、历史数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_stock_us.jpg)

## 1. 产品功能

- 支持美股历史行情查询；
- beginDate 与 endDate 使用 yyyyMMdd 日期格式，最大查询跨度为 3660 天；
- 返回开盘价、收盘价、最高价、最低价、成交量、交易笔数、振幅、涨跌幅、涨跌额和换手率；
- 适合美股历史 K 线、行情回放、跨市场看板和股票详情页展示等场景；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/us

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/us?appkey=REDACTED&symbol=AAPL&beginDate=20240101&endDate=20241231&adjust=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockus](https://www.gugudata.com/preview/stockus)

**接口测试:** [https://api.gugudata.com/stock/us/demo](https://api.gugudata.com/stock/us/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| symbol | string | 是 | AAPL | 美股代码，支持英文股票代码；多个代码使用英文逗号分隔，最多 10 个。 仅展示当前有效代码，历史代码仍可用于已支持的历史数据查询。 |
| beginDate | string | 是 | 20240101 | 查询开始日期，格式 yyyyMMdd；与 endDate 最大间隔为 3660 天。 |
| endDate | string | 是 | 20241231 | 查询结束日期，格式 yyyyMMdd；与 beginDate 最大间隔为 3660 天。 |
| adjust | string | 否 | YOUR_VALUE | 复权类型，可为空；按所选复权口径返回。 |

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
| Data.TimeKey | string | 交易日期。 |
| Data.Open | number | 开盘价。 |
| Data.Close | number | 收盘价。 |
| Data.High | number | 最高价。 |
| Data.Low | number | 最低价。 |
| Data.Volume | number | 成交量。 |
| Data.TradingCount | number | 交易笔数。 |
| Data.Swing | number | 振幅，单位：%。 |
| Data.ChangePercent | number | 涨跌幅，单位：%。 |
| Data.ChangeAmount | number | 涨跌额。 |
| Data.TurnoverRate | number | 换手率，单位：%。 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 美股历史行情数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询美股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/ussymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
