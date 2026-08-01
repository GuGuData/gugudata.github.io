---
title: "A 股个股信息查询 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundamentalinfo"
section: "gugudata"
slug: "stock-cn-fundamentalinfo"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundamentalinfo"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/87b93e5ac12a63998de1a17f830a7e68.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundamentalinfo](https://www.gugudata.com/api/details/fundamentalinfo)

A 股个股信息查询 API A 股上市公司核心资料画像，股票、A股等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/87b93e5ac12a63998de1a17f830a7e68.jpg)

## 1. 产品功能

- 支持按 A 股代码查询上市公司基础画像和规模指标；
- 返回股票简称、上市时间、行业、总股本、总市值、流通股本和流通市值等常用字段；
- symbol 可使用 6 位代码或 sh/sz 前缀代码，适合与行情、财报和资金流接口联动；
- 适合股票资料页、投研基础库、证券列表补全和公司画像展示等场景；
- 围绕“A 股个股信息查询”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股个股信息查询”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/fundamentalinfo

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/fundamentalinfo?appkey=REDACTED&symbol=600519

**数据预览:** [https://www.gugudata.com/preview/fundamentalinfo](https://www.gugudata.com/preview/fundamentalinfo)

**接口测试:** [https://api.gugudata.com/stock/cn/fundamentalinfo/demo](https://api.gugudata.com/stock/cn/fundamentalinfo/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| symbol | string | 是 | 600519 | A 股股票代码，支持 6 位代码或带市场前缀代码，例如 600519、sh600519、sz000001。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.Symbol | string | 股票代码。 |
| Data.StockName | string | 股票简称。 |
| Data.ListingTime | string | 上市日期。 |
| Data.Industry | string | 所属行业。 |
| Data.GeneralCapital | number | 总股本。 |
| Data.TotalValue | number | 总市值。 |
| Data.CirculationStock | number | 流通股本。 |
| Data.CirculationMarketValue | number | 流通市值。 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股个股信息查询 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询 A 股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/cnsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
