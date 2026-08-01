---
title: "A 股指数分时行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockcnindexperminutes"
section: "gugudata"
slug: "stock-cn-stockcnindexperminutes"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockcnindexperminutes"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/f57eaf368c5ea414471d0699b2490931.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockcnindexperminutes](https://www.gugudata.com/api/details/stockcnindexperminutes)

A 股指数分时行情数据 API A 股指数分钟级行情追踪，股票、A股、指数、分时数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/f57eaf368c5ea414471d0699b2490931.jpg)

## 1. 产品功能

- 支持 A 股指数分时行情查询；
- begindate 与 enddate 支持 yyyyMMdd HH:mm:ss 时间格式；
- 返回指数点位、涨跌幅、成交量、成交额、振幅和换手率等字段；
- 适合指数分时图、市场看板、指数监控和策略回测辅助等场景；
- 围绕“A 股指数分时行情数据”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股指数分时行情数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/index_perminutes

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/index_perminutes?appkey=REDACTED&symbol=sh000001&period=5&begindate=YOUR_VALUE&enddate=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockcnindexperminutes](https://www.gugudata.com/preview/stockcnindexperminutes)

**接口测试:** [https://api.gugudata.com/stock/cn/index_perminutes/demo](https://api.gugudata.com/stock/cn/index_perminutes/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| symbol | string | 是 | sh000001 | A 股指数代码，支持带市场前缀代码，例如 sh000001、sz399001。 |
| period | int | 否 | 5 | 分时周期，单位：分钟；需使用接口支持的周期值。 |
| begindate | string | 是 | YOUR_VALUE | 查询开始时间，支持 yyyyMMdd HH:mm:ss；部分场景也支持 yyyyMMdd。 |
| enddate | string | 是 | YOUR_VALUE | 查询结束时间，支持 yyyyMMdd HH:mm:ss；部分场景也支持 yyyyMMdd。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.Symbol | string | 指数代码。 |
| Data.TimeKey | string | 行情时间。 |
| Data.Open | number | 开盘点位。 |
| Data.Close | number | 收盘点位。 |
| Data.High | number | 最高点位。 |
| Data.Low | number | 最低点位。 |
| Data.ChangePercent | number | 涨跌幅，单位：%。 |
| Data.ChangeAmount | number | 涨跌额。 |
| Data.TradingVolume | number | 成交量。 |
| Data.TradingAmount | number | 成交额。 |
| Data.Swing | number | 振幅，单位：%。 |
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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股指数分时行情数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询 A 股指数列表](https://api.gugudata.com/stock/cn/index/list?appkey=REDACTED)（GET），包含股票编码、股票名称、收录时间。
