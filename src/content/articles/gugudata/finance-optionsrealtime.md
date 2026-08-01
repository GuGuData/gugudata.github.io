---
title: "期权实时行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/optionsrealtime"
section: "gugudata"
slug: "finance-optionsrealtime"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/optionsrealtime"
cover: "https://static.gugudata.com/api_cover_options_realtime.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/optionsrealtime](https://www.gugudata.com/api/details/optionsrealtime)

期权实时行情数据 API 最新价格、交易量、交易额等信息，期权、实时数据等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_options_realtime.jpg)

## 1. 产品功能

- 实时更新期权市场数据；
- 覆盖主要期权合约；
- 支持多种数据参数，包括价格、交易量、持仓量等；
- 提供详细的市场分析和数据解读；
- 高效、稳定的数据获取体验；
- 秒级查询性能；
- 围绕“期权实时行情数据”提供标准化能力，便于快速接入现有业务；
- 适合将“期权实时行情数据”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/options/realtime

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/options/realtime?appkey=REDACTED&symbol=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/optionsrealtime](https://www.gugudata.com/preview/optionsrealtime)

**接口测试:** [https://api.gugudata.com/options/realtime/demo](https://api.gugudata.com/options/realtime/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 是 | YOUR_VALUE | 期权合约标识符，例如 m2401c4550，传递空值返回所有数据 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 请求使用的参数 |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Symbol | string | 期权合约的标识符 |
| Data.Name | string | 期权合约名称 |
| Data.LatestPrice | double | 最新成交价格 |
| Data.ChangeAmount | double | 价格变动额 |
| Data.ChangeRate | int | 价格变动率（百分比） |
| Data.TradingVolume | int | 交易量 |
| Data.TradingAmount | int | 交易金额 |
| Data.PositionAmount | int | 持仓量 |
| Data.DailyIncrease | int | 日增量 |
| Data.PreviousClose | double | 前一交易日收盘价 |
| Data.TodayOpen | double | 当日开盘价 |
| Data.MarketIdentifier | int | 市场标识符 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 期权实时行情数据 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[基金基本信息](https://www.gugudata.com/api/details/fundinfolist)，适合补充同类场景的接口能力。
- 可搭配使用：[指数基金业绩](https://www.gugudata.com/api/details/fundbasicindex)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金业绩排行](https://www.gugudata.com/api/details/fundetfopenrankinglist)，适合补充同类场景的接口能力。
