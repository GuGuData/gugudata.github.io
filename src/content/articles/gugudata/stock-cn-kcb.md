---
title: "A 股科创板历史行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockkcb"
section: "gugudata"
slug: "stock-cn-kcb"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockkcb"
cover: "https://static.gugudata.com/api_stock_kcb.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockkcb](https://www.gugudata.com/api/details/stockkcb)

A 股科创板历史行情数据 API 全量科创板历史行情，股票、A股、科创板等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_stock_kcb.jpg)

## 1. 产品功能

- 支持所有科创板历史交易数据查询；
- 包含科创板交易多项指标数据；
- 毫秒级查询性能；
- 围绕“A 股科创板历史行情数据”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股科创板历史行情数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；
- 支持按股票、指数、交易日或指标维度组织结果；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/kcb

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/kcb?appkey=REDACTED&symbol=YOUR_VALUE&begindate=YOUR_VALUE&enddate=YOUR_VALUE&adjust=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockkcb](https://www.gugudata.com/preview/stockkcb)

**接口测试:** [https://api.gugudata.com/stock/kcb/demo](https://api.gugudata.com/stock/kcb/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 否 | YOUR_VALUE | 支持传递单支科创板股票代码进行筛选，格式为: sh688008。 |
| begindate | string | 是 | YOUR_VALUE | 股票交易开始时间，格式为 20200101 |
| enddate | string | 是 | YOUR_VALUE | 股票交易结束时间，格式为 20200101，与开始时间最大时间跨度支持 3660 个自然日，获取全量数据请分批获取，数据量较大，请保持合理的请求频率 |
| adjust | string | 否 | YOUR_VALUE | 查询前复权、后复权数据，如果传递参数值为 pre，那么返回前复权数据（所有数据进行了前复权）；如果传递参数值为 after，那么返回后复权数据；默认值为空或不传递，返回未复权数据 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Symbol | string | 科创板股票代码 |
| Data.Open | double | 开盘价，单位：元 |
| Data.Close | double | 收盘价，单位：元 |
| Data.High | double | 最高价，单位：元 |
| Data.Low | double | 最低价，单位：元 |
| Data.Volume | double | 成交量，单位：股 |
| Data.AfterVolume | double | 盘后量 |
| Data.AfterAmount | double | 盘后额 |
| Data.TradableEquity | double | 流通股本，单位：股 |
| Data.TurnoverRate | double | 换手率 = 成交量(股) / 流通股本(股)，单位：% |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股科创板历史行情数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
