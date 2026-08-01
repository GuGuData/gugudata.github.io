---
title: "美股历年基本财务数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/usfundamental"
section: "gugudata"
slug: "stock-us-usfundamental"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/usfundamental"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/b6df2627cd74345da7509f8fbbd8ad8c.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/usfundamental](https://www.gugudata.com/api/details/usfundamental)

美股历年基本财务数据 API 历年PB/PE数据，股票、美股等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/b6df2627cd74345da7509f8fbbd8ad8c.jpg)

## 1. 产品功能

- 支持所有美股全量财报数据查询；
- 分别包括市净率 (Price to book ratio 即 P/B)、市盈率 (PE ratio 即 P/E)数据；
- 返回多项财务指标；
- 多数据源清洗整合，海量数据毫秒级返回；
- 围绕“美股历年基本财务数据”提供标准化能力，便于快速接入现有业务；
- 适合将“美股历年基本财务数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/us/fundamental

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/us/fundamental?appkey=REDACTED&symbol=YOUR_VALUE&type=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/usfundamental](https://www.gugudata.com/preview/usfundamental)

**接口测试:** [https://api.gugudata.com/stock/us/fundamental/demo](https://api.gugudata.com/stock/us/fundamental/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 否 | YOUR_VALUE | 传递单支股票代码，如: AAPL。具体值参见 [美股股票代码参数枚举页面](https://www.gugudata.com/enum/stockus/symbols) |
| type | string | 是 | YOUR_VALUE | 财报数据类型，可选值为：PB\|PE |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.columns | string[] | 财报的数据列名称，date,stock_price,pb.book_value_per_share,pb.price_to_book_ratio,pe.ttm_net_eps,pe.pe_ratio。 |
| Data.data | string | 对应时间点的具体财报数据 |
| Data.data.pb | string[] | book_value_per_share: 每股账面净值, price_to_book_ratio: 市净率 (Price to book ratio 即 P/B) |
| Data.data.pe | string[] | ttm_net_eps: 标普500行业指数每股收益 (EPS-TTM), pe_ratio: 市盈率 (PE ratio 即 P/E) |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 美股历年基本财务数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询美股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/ussymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
