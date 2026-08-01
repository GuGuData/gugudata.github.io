---
title: "A 股分时交易数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockcnperminute"
section: "gugudata"
slug: "stock-cn-perminute"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockcnperminute"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/6dd940361b4f8fc244d4c76355894af8.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockcnperminute](https://www.gugudata.com/api/details/stockcnperminute)

A 股分时交易数据 API 实时A股分时交易数据，股票、A股、分时数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/6dd940361b4f8fc244d4c76355894af8.jpg)

## 1. 产品功能

- 支持所有 A 股分时交易数据查询；
- 支持 1、5、15、30、60 分钟交易区间，注意: 只返回近期的交易数据；
- 同时参数支持获取历史数据；
- 毫秒级查询性能；
- 围绕“A 股分时交易数据”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股分时交易数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/stockcnperminute

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/stockcnperminute?appkey=REDACTED&symbol=YOUR_VALUE&begindate=YOUR_VALUE&enddate=YOUR_VALUE&period=5&adjust=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockcnperminute](https://www.gugudata.com/preview/stockcnperminute)

**接口测试:** [https://api.gugudata.com/stock/cn/stockcnperminute/demo](https://api.gugudata.com/stock/cn/stockcnperminute/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 是 | YOUR_VALUE | 传递单支股票代码，如: 600031。可通过前置接口或参见 [A 股股票代码参数枚举页面](https://www.gugudata.com/enum/stockcn/symbols) |
| begindate | string | 是 | YOUR_VALUE | 交易开始时间，参数格式为: 2021-01-01 09:00:00 |
| enddate | string | 是 | YOUR_VALUE | 交易结束时间，参数格式为: 2021-01-01 09:00:00，与开始时间最大时间跨度支持 366 个自然日，获取全量数据请分批获取，数据量较大，请保持合理的请求频率 |
| period | int | 否 | 5 | 交易数据时间区间，可选时间区间价参数为: 1\|5\|15\|30\|60 (分钟)， 其中 1 分钟时间区间交易数据仅返回近 5 个交易日不复权数据，其他时间区间返回近期的交易数据。 |
| adjust | string | 否 | YOUR_VALUE | 查询前复权、后复权数据，如果传递参数值为 pre，那么返回前复权数据（所有数据进行了前复权）；如果传递参数值为 after，那么返回后复权数据；默认值为空或不传递，返回未复权数据 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Symbol | string | A 股股票代码 |
| Data.TimeKey | double | 交易时间 |
| Data.Open | double | 今日开盘价，单位：元 |
| Data.Close | double | 昨收价，单位：元 |
| Data.High | double | 最高，单位：元 |
| Data.Low | double | 最低，单位：元 |
| Data.ChangePercent | double | 涨跌幅 ，单位：% |
| Data.ChangeAmount | double | 涨跌额 ，单位：元 |
| Data.TradingVolume | double | 成交量，单位：手 |
| Data.TradingAmount | int | 成交额 ，单位：元，较远的历史数据不返回此值 |
| Data.Swing | double | 振幅，单位：% |
| Data.TurnoverRate | double | 换手率，单位：% |
| Data.Latest | double | 最新价，较远的历史数据不返回此值 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股分时交易数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询 A 股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/cnsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
