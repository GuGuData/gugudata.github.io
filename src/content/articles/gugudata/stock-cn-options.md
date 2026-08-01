---
title: "A 股期权实时行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stockcnoptions"
section: "gugudata"
slug: "stock-cn-options"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stockcnoptions"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/5674e2ac0b78eabc5be1916d1fde9a5c.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stockcnoptions](https://www.gugudata.com/api/details/stockcnoptions)

A 股期权实时行情数据 API 所有期权实时行情数据，股票、A股、期权等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/5674e2ac0b78eabc5be1916d1fde9a5c.jpg)

## 1. 产品功能

- 支持所有期权实时行情数据查询；
- 包含期权实时行情交易多项指标数据；
- 毫秒级查询性能；
- 围绕“A 股期权实时行情数据”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股期权实时行情数据”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；
- 支持按股票、指数、交易日或指标维度组织结果；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/options

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/options?appkey=REDACTED&symbol=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stockcnoptions](https://www.gugudata.com/preview/stockcnoptions)

**接口测试:** [https://api.gugudata.com/stock/cn/options/demo](https://api.gugudata.com/stock/cn/options/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 否 | YOUR_VALUE | 默认不传递或传递空值，则获取所有期权实时行情数据（需要注意在获取全量数据时，数据量传输对接口调用性能的影响）。支持传递单支或者多支(使用英文逗号分隔)期权代码进行筛选，格式为: ni2506C146000,sn2506C335000 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Symbol | string | 期权代码 |
| Data.StockName | string | 期权名称 |
| Data.Latest | double | 最新价，单位：元 |
| Data.ChangeAmount | double | 涨跌额，单位：元 |
| Data.ChangePercent | double | 涨跌幅，单位：% |
| Data.TradingVolume | double | 成交量 |
| Data.TradingAmount | double | 成交额，单位：元 |
| Data.HoldingVolume | double | 持仓量 |
| Data.ExercisePrice | double | 行权价 |
| Data.RemainingDay | double | 剩余日 |
| Data.DailyIncrease | double | 日增 |
| Data.PreClose | double | 昨收价 |
| Data.Open | double | 今日开盘价 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股期权实时行情数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
