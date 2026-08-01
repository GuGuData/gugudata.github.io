---
title: "A 股股票指数历史数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockcnindexhistory"
section: "gugudata"
slug: "stock-cn-stockcnindexhistory"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockcnindexhistory"
cover: "https://static.gugudata.com/api_cover_stock_cn_index_history.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockcnindexhistory](https://www.gugudata.com/api/details/stockcnindexhistory)

A 股股票指数历史数据 API 股指历史数据，股票、A股、指数、历史数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_stock_cn_index_history.jpg)

## 1. 产品功能

- 支持所有指数数据查询；
- 支持全量指数历史数据查询；
- 多维度的统计时间以及数据结果；
- 秒级查询性能；
- 围绕“A 股股票指数历史数据”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股股票指数历史数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/index/history

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/index/history?appkey=REDACTED&symbol=YOUR_VALUE&period=YOUR_VALUE&begindate=YOUR_VALUE&enddate=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockcnindexhistory](https://www.gugudata.com/preview/stockcnindexhistory)

**接口测试:** [https://api.gugudata.com/stock/cn/index/history/demo](https://api.gugudata.com/stock/cn/index/history/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 是 | YOUR_VALUE | 传递上面获取的指数编码，如: 000001。可通过前置接口或参见 [A 股指数代码参数枚举页面](https://www.gugudata.com/enum/stockcnindex2/symbols) |
| period | string | 是 | YOUR_VALUE | 统计周期，参数可选值为 DAILY \| WEEKLY \| MONTHLY |
| begindate | string | 是 | YOUR_VALUE | 历史数据开始时间，格式为 20200101 |
| enddate | string | 是 | YOUR_VALUE | 历史数据结束时间，格式为 20200101，获取全量数据请分批获取，数据量较大，请保持合理的请求频率 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.TimeKey | double | 交易时间 |
| Data.Symbol | string | 股票代码 |
| Data.Open | double | 开盘价，单位：元 |
| Data.Close | double | 收盘价，单位：元 |
| Data.High | double | 最高，单位：元 |
| Data.Low | double | 最低，单位：元 |
| Data.TradingVolume | int | 成交量，单位：股 |
| Data.TradingAmount | double | 成交额，单位：元 |
| Data.Swing | double | 振幅，单位：% |
| Data.ChangePercent | double | 涨跌幅，单位：% |
| Data.ChangeAmount | double | 涨跌额，单位：元 |
| Data.TurnoverRate | double | 换手率，单位：% |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股股票指数历史数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询 A 股指数列表](https://api.gugudata.com/stock/cn/index/list?appkey=REDACTED)（GET），包含股票编码、股票名称、收录时间。
