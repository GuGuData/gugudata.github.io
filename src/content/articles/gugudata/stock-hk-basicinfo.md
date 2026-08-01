---
title: "港股基础信息数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockhkbasicinfo"
section: "gugudata"
slug: "stock-hk-basicinfo"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockhkbasicinfo"
cover: "https://static.gugudata.com/api_cover_stock_hk_basic_info.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockhkbasicinfo](https://www.gugudata.com/api/details/stockhkbasicinfo)

港股基础信息数据 API 港股基础资料与估值概览，股票、港股等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_stock_hk_basic_info.png)

## 1. 产品功能

- 支持分页查询港股基础资料；
- keywords 可按股票代码或名称筛选；
- 返回股票代码、名称、最新价、市值和市盈率等常用字段；
- 适合港股列表、搜索补全、股票资料页和港股基础库建设等场景；
- 围绕“港股基础信息数据”提供标准化能力，便于快速接入现有业务；
- 适合将“港股基础信息数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/hk/basicinfo

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/hk/basicinfo?appkey=REDACTED&keywords=YOUR_VALUE&pageindex=1&pagesize=20

**数据预览:** [https://www.gugudata.com/preview/stockhkbasicinfo](https://www.gugudata.com/preview/stockhkbasicinfo)

**接口测试:** [https://api.gugudata.com/stock/hk/basicinfo/demo](https://api.gugudata.com/stock/hk/basicinfo/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| keywords | string | 否 | YOUR_VALUE | 股票代码或股票名称关键词。 |
| pageindex | int | 否 | 1 | 分页页码，从 1 开始。 |
| pagesize | int | 否 | 20 | 每页数量。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.Symbol | string | 港股股票代码。 |
| Data.StockName | string | 股票名称。 |
| Data.Latest | number | 最新价。 |
| Data.MarketValue | number | 总市值。 |
| Data.PERatio | number | 市盈率。 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 港股基础信息数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
