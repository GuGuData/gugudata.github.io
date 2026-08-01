---
title: "A 股股票指数实时数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockcnrealtimeindex"
section: "gugudata"
slug: "stock-cn-stockcnrealtimeindex"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockcnrealtimeindex"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/c0571ef687e6ecc0e32a22cddacf0384.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockcnrealtimeindex](https://www.gugudata.com/api/details/stockcnrealtimeindex)

A 股股票指数实时数据 API 查询 A 股股票指数实时行情数据，股票、A股、指数、实时数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/c0571ef687e6ecc0e32a22cddacf0384.jpg)

## 1. 产品功能

- 仅用于查询指数实时行情，不用于查询个股实时行情；
- symbol 不传时返回当前可用指数列表，传多个指数代码时使用英文逗号分隔，单次最多 10 个；
- 返回最新价、涨跌额、涨跌幅、昨收、开盘、最高、最低、成交量和成交额等行情指标；
- 适合指数行情看板、市场概览、指数监控和行情数据同步等场景；
- 围绕“A 股股票指数实时数据”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股股票指数实时数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/realtimeindex

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/realtimeindex?appkey=REDACTED&symbol=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockcnrealtimeindex](https://www.gugudata.com/preview/stockcnrealtimeindex)

**接口测试:** [https://api.gugudata.com/stock/cn/realtimeindex/demo](https://api.gugudata.com/stock/cn/realtimeindex/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| symbol | string | 否 | YOUR_VALUE | 指数代码筛选参数，支持单个或多个指数代码，多个代码使用英文逗号分隔，单次最多 10 个；示例：sh000001,sh000002。具体值参见 [中国股票指数代码参数枚举页面](https://www.gugudata.com/enum/stockcnindex/symbols)。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算。 |
| Data.Symbol | string | 股票指数代码。 |
| Data.StockName | string | 股票指数名称。 |
| Data.Latest | double | 最新价。 |
| Data.ChangeAmount | double | 涨跌额。 |
| Data.ChangePercent | double | 涨跌幅，单位：%。 |
| Data.PreClose | double | 昨收价。 |
| Data.Open | double | 今日开盘价。 |
| Data.High | double | 当日最高价。 |
| Data.Low | double | 当日最低价。 |
| Data.TradingVolume | double | 成交量。 |
| Data.TradingAmount | double | 成交额。 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股股票指数实时数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
