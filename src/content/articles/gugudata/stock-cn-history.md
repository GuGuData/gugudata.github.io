---
title: "A 股历史行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockcn"
section: "gugudata"
slug: "stock-cn-history"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockcn"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/e65ac82bc267cc161bd1713010219274.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockcn](https://www.gugudata.com/api/details/stockcn)

A 股历史行情数据 API 历史数据支持日线/周线/月线，股票、A股、历史数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/e65ac82bc267cc161bd1713010219274.jpg)

## 1. 产品功能

- 支持 A 股历史日线、周线、月线数据查询；
- 包含上交所和深交所所有股票数据；
- 每日 A 股收盘后更新当日交易数据，停牌不更新；
- 支持一次查询多个股票历史数据；
- 支持最大 3660 个自然日时间窗口查询；
- 超高查询效率，千万级数据毫秒级返回；
- 支持未复权、前复权、后复权三种数据形态查询；
- 围绕“A 股历史行情数据”提供标准化能力，便于快速接入现有业务；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn?appkey=REDACTED&symbol=YOUR_VALUE&begindate=YOUR_VALUE&enddate=YOUR_VALUE&adjust=YOUR_VALUE&period=daily

**数据预览:** [https://www.gugudata.com/preview/stockcn](https://www.gugudata.com/preview/stockcn)

**接口测试:** [https://api.gugudata.com/stock/cn/demo](https://api.gugudata.com/stock/cn/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 是 | YOUR_VALUE | A股股票代码，具体值参见 [A股股票代码参数枚举页面](https://www.gugudata.com/enum/stockcn/symbols)。支持一次查询多个股票，使用逗号分隔（兼容中文逗号，会自动规范化）；每次最多 10 个。单个代码支持 600031 或 sh600031/sz000001/bj430047，带交易所前缀时会自动规范化为 6 位代码。 |
| begindate | string | 是 | YOUR_VALUE | 股票交易开始时间，格式为 20200101，且不能晚于 enddate。 |
| enddate | string | 是 | YOUR_VALUE | 股票交易结束时间，格式为 20200101，与 begindate 最大时间跨度为 3660 个自然日。获取更长区间请分批请求，并保持合理请求频率。 |
| adjust | string | 否 | YOUR_VALUE | 复权类型，默认空（不复权）。可选值：pre（前复权）、after（后复权）；传入其他值将返回参数错误。 |
| period | string | 否 | daily | 数据周期，默认 daily。可选值：daily（日线）、weekly（周线）、monthly（月线）；传入其他值将返回参数错误。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.TimeKey | int | 交易日期 |
| Data.Symbol | string | A股股票代码 |
| Data.StockName | string | 股票名称 |
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
| 102 | 请求频率受限 | 每秒请求不能超过 5 次；数据异常或限流时也返回该错误码。 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股历史行情数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询 A 股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/cnsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
