---
title: "A 股股票代码 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stocksymbols"
section: "gugudata"
slug: "stock-cn-stocksymbols"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stocksymbols"
cover: "https://static.gugudata.com/api_stock_symbols.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stocksymbols](https://www.gugudata.com/api/details/stocksymbols)

A 股股票代码 API 实时更新股票代码列表。仅展示当前有效代码，历史代码仍可用于已支持的历史数据查询，股票、A股等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_stock_symbols.jpg)

## 1. 产品功能

- 目前支持所有 A 股股票代码列表查询；
- 无需自己维护数据源，我们提供实时列表数据；
- 包含 A 股所有交易所的股票代码列表；
- 毫秒级查询性能；
- 围绕“A 股股票代码”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股股票代码”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/symbols

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/symbols?appkey=REDACTED&stockType=A&pageIndex=1&pageSize=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stocksymbols](https://www.gugudata.com/preview/stocksymbols)

**接口测试:** [https://api.gugudata.com/stock/symbols/demo](https://api.gugudata.com/stock/symbols/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| stockType | string | 是 | A | 股票类型，A：A股 |
| pageIndex | number | 是 | 1 | 分页参数，页码 |
| pageSize | number | 是 | YOUR_VALUE | 分页参数，每页条数，最大值：100，若传递 0 则返回所有数据 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Symbol | string | 股票代码 |
| Data.SymbolName | string | 股票名称 |
| Data.SymbolType | string | 股票类型，A：A股 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股股票代码 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
