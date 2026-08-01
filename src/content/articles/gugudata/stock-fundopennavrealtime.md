---
title: "开放式基金最新净值 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundopennavrealtime"
section: "gugudata"
slug: "stock-fundopennavrealtime"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundopennavrealtime"
cover: "https://static.gugudata.com/api_cee_open-nav-realtime-v2.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundopennavrealtime](https://www.gugudata.com/api/details/fundopennavrealtime)

开放式基金最新净值 API 单只或全量开放式基金日净值快照，开放式基金、最新净值、单基金查询等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cee_open-nav-realtime-v2.png)

## 1. 产品功能

- 按单个基金代码返回最近一次公布的完整日净值快照，适合基金详情页使用；
- 同时返回单位净值、累计净值、上一净值日数据、日增长值和日增长率；
- 包含申购状态、赎回状态和手续费说明，可用于展示基金当前交易可用性；
- symbol 留空时返回当前可用的全量开放式基金快照，不提供分页能力；
- symbol 仅支持一个标准 6 位基金代码，不接受逗号分隔的批量代码；
- 与公募基金实时净值接口相比，本接口适合单基金或全量获取，前者支持分页和最多 50 个代码批量查询；
- 数据日期取基金公司最近一次公布净值的日期，非交易日不一定等于请求当天；
- 本接口不返回盘中估算值；需要盘中参考时应使用开放式基金净值估算接口；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/open-nav-realtime

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/open-nav-realtime?appkey=REDACTED&symbol=017437

**数据预览:** [https://www.gugudata.com/preview/fundopennavrealtime](https://www.gugudata.com/preview/fundopennavrealtime)

**接口测试:** [https://api.gugudata.com/fund/open-nav-realtime/demo](https://api.gugudata.com/fund/open-nav-realtime/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| symbol | string | 否 | 017437 | 可选。单个 6 位开放式基金代码，保留前导零；不支持市场前缀或多个代码。留空时返回当前可用的全量最新日净值快照 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.Symbol | string | 基金的 6 位代码，保留前导零，可用于其他开放式基金接口的 symbol 参数 |
| Data.FundName | string | 基金简称，用于基金详情、列表和搜索结果展示 |
| Data.DateKey | string | 最近一次公布单位净值的日期，格式为 yyyy-MM-dd |
| Data.UnitNetWorth | number | 基金公司在 DateKey 公布的单位净值，不是盘中估算值 |
| Data.AccumulatedNetWorth | number | 基金公司在 DateKey 公布的累计净值，包含历史分红等累计影响 |
| Data.PreviousUnitNetWorth | number | DateKey 前一个已公布净值日的单位净值 |
| Data.PreviousAccumulatedNetWorth | number | DateKey 前一个已公布净值日的累计净值 |
| Data.DailyGrowthValue | number | 当前单位净值相对上一净值日的增长值，可为负数或零 |
| Data.DailyGrowthRate | number | 当前单位净值相对上一净值日的增长率，单位为百分比 |
| Data.PurchaseStatus | string | 基金当前申购状态，例如开放申购、暂停申购或限制大额申购 |
| Data.RedemptionStatus | string | 基金当前赎回状态，例如开放赎回或暂停赎回 |
| Data.Fee | string | 数据源公布的申购手续费或费率说明，可能包含百分号或文字说明 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 开放式基金最新净值 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[基金基本信息](https://www.gugudata.com/api/details/fundinfolist)，适合补充同类场景的接口能力。
- 可搭配使用：[指数基金业绩](https://www.gugudata.com/api/details/fundbasicindex)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金业绩排行](https://www.gugudata.com/api/details/fundetfopenrankinglist)，适合补充同类场景的接口能力。
