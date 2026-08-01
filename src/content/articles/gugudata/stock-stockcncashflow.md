---
title: "A 股个股资金流 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockcncashflow"
section: "gugudata"
slug: "stock-stockcncashflow"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockcncashflow"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/828ef8dbe47c6188128f53529e2a571c.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockcncashflow](https://www.gugudata.com/api/details/stockcncashflow)

A 股个股资金流 API 交易日多档资金流明细，股票、A股、资金流等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/828ef8dbe47c6188128f53529e2a571c.png)

## 1. 产品功能

- 支持按 6 位 A 股代码查询最近 1~30 个已完成交易日的个股资金流明细；
- 返回收盘价、涨跌幅以及主力、超大单、大单、中单和小单的净流入金额与占比；
- 本接口提供交易日汇总数据，不提供盘中实时资金流；
- 盘中成交和分钟行情可分别使用 A 股分笔实时交易数据、A 股分时交易数据接口；
- 使用 limit 控制返回数量，默认返回 30 条；
- 资金流金额以元计，正数表示净流入、负数表示净流出，比例以百分比计；
- 结果按交易日升序排列；非交易日或当日数据尚未形成时，返回最近已有交易日数据；
- 适合股票详情页、资金流趋势图、主力资金监控、选股辅助和投研看板；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/stock-cash-flow

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/stock-cash-flow?appkey=REDACTED&symbol=600036&limit=30

**数据预览:** [https://www.gugudata.com/preview/stockcncashflow](https://www.gugudata.com/preview/stockcncashflow)

**接口测试:** [https://api.gugudata.com/stock/cn/stock-cash-flow/demo](https://api.gugudata.com/stock/cn/stock-cash-flow/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。咕咕数据开发者中心分配的调用凭证，用于身份鉴权和套餐额度校验；请仅在服务端安全保存，不要写入公开代码、前端页面或日志。 |
| symbol | string | 是 | 600036 | 必填。受支持市场的 6 位 A 股股票代码，保留前导零，例如 600036、000001、300750 或 430047；不接受市场前缀、证券简称、逗号分隔批量代码或 B 股代码。 |
| limit | integer | 否 | 30 | 可选。返回最近多少个交易日的资金流记录，取值范围 1~30，默认 30；结果按交易日升序排列，因此最后一条为本次返回范围内的最新交易日。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别的本次业务参数摘要，例如 symbol=600036&limit=30；不包含 APPKEY。 |
| DataStatus.StatusCode | integer | 业务状态码。100 表示成功；101 表示参数错误；102 表示请求频率受限；103 表示账号欠费；104 表示 APPKEY 无效；110 表示接口或上游服务异常。 |
| DataStatus.StatusDescription | string | 业务状态说明。请求失败时应结合 StatusCode 判断参数、鉴权、额度或服务异常。 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff。 |
| DataStatus.DataTotalCount | integer | 本次 Data 数组实际返回的记录条数，最大不超过 limit；不是该股票全部历史资金流记录数。 |
| Data.Symbol | string | 当前记录所属的 6 位 A 股股票代码，保留前导零。 |
| Data.StockName | string | 股票简称，用于结果展示和代码核对。 |
| Data.DateKey | string | 资金流所属交易日对应的 13 位毫秒时间戳字符串；每条记录代表一个已完成交易日，不是盘中实时数据。时间点为该日期 00:00:00 UTC，例如 1783641600000 对应 2026-07-10。 |
| Data.Close | number | 对应 DateKey 交易日的收盘价，不是请求时刻的实时成交价。 |
| Data.ChangePercent | number | 对应交易日的涨跌幅，单位为百分比，例如 1.25 表示上涨 1.25%。 |
| Data.MainNetInflowAmount | number | 主力资金净流入金额，单位为元；正数表示净流入，负数表示净流出。 |
| Data.MainNetInflowRatio | number | 主力资金净流入占比，单位为百分比；正负方向与净流入金额一致。 |
| Data.SuperLargeNetInflowAmount | number | 超大单资金净流入金额，单位为元；正数为净流入，负数为净流出。 |
| Data.SuperLargeNetInflowRatio | number | 超大单资金净流入占比，单位为百分比。 |
| Data.LargeNetInflowAmount | number | 大单资金净流入金额，单位为元；正数为净流入，负数为净流出。 |
| Data.LargeNetInflowRatio | number | 大单资金净流入占比，单位为百分比。 |
| Data.MediumNetInflowAmount | number | 中单资金净流入金额，单位为元；正数为净流入，负数为净流出。 |
| Data.MediumNetInflowRatio | number | 中单资金净流入占比，单位为百分比。 |
| Data.SmallNetInflowAmount | number | 小单资金净流入金额，单位为元；正数为净流入，负数为净流出。 |
| Data.SmallNetInflowRatio | number | 小单资金净流入占比，单位为百分比。 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股个股资金流 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[A 股股票代码](https://api.gugudata.com/stock/symbols?appkey=REDACTED&stockType=A&pageIndex=1&pageSize=20)（GET），股票代码、股票简称及市场信息。
- 前置接口：[A 股交易日历](https://api.gugudata.com/stock/cn/trade_calendar?appkey=REDACTED)（GET），A 股交易日期及交易状态。
