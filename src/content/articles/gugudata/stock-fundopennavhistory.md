---
title: "开放式基金区间净值 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundopennavhistory"
section: "gugudata"
slug: "stock-fundopennavhistory"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundopennavhistory"
cover: "https://static.gugudata.com/api_cee_open-nav-history.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundopennavhistory](https://www.gugudata.com/api/details/fundopennavhistory)

开放式基金区间净值 API 指定区间的净值、收益、排名与基金事件，开放式基金、日期区间、多指标等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cee_open-nav-history.png)

## 1. 产品功能

- 每次按一个基金代码、一种指标和明确日期区间查询，便于控制响应体大小；
- 支持单位净值、累计净值和累计收益率走势，可用于构建指定区间的基金图表；
- 支持同类排名及排名百分比，用于观察基金在同类产品中的相对位置变化；
- 支持分红送配和基金拆分记录，用于查询指定区间内的基金权益事件；
- beginDate 和 endDate 使用 yyyyMMdd 格式，二者间隔最大为 366 个自然日；
- 每次只支持一个标准 6 位基金代码，不接受批量代码或市场前缀；
- indicator 使用中文指标名称，返回结果中只有该指标对应的业务字段具有实际含义；
- 需要一次获取完整历史或最多 20 个基金时，应使用公募基金历史数据接口；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/open-nav-history

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/open-nav-history?appkey=REDACTED&symbol=710001&indicator=YOUR_VALUE&beginDate=20260701&endDate=20260710

**数据预览:** [https://www.gugudata.com/preview/fundopennavhistory](https://www.gugudata.com/preview/fundopennavhistory)

**接口测试:** [https://api.gugudata.com/fund/open-nav-history/demo](https://api.gugudata.com/fund/open-nav-history/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| symbol | string | 是 | 710001 | 必填。单个 6 位开放式基金代码，保留前导零；不支持市场前缀或多个代码 |
| indicator | string | 是 | YOUR_VALUE | 必填。仅支持：单位净值走势、累计净值走势、累计收益率走势、同类排名走势、同类排名百分比、分红送配详情、拆分详情；必须传完整中文名称 |
| beginDate | string | 是 | 20260701 | 必填。查询开始日期，严格使用 yyyyMMdd 格式，例如 20260701 |
| endDate | string | 是 | 20260710 | 必填。查询结束日期，严格使用 yyyyMMdd 格式；不得早于 beginDate，二者间隔最大为 366 个自然日 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.Symbol | string | 当前历史记录所属开放式基金的 6 位代码，保留前导零 |
| Data.DateKey | string | 走势和排名记录日期使用 yyyyMMdd；分红或拆分记录使用事件所属年份，具体取决于 indicator |
| Data.UnitNetWorth | number | 对应 DateKey 的单位净值；仅 indicator=单位净值走势时具有实际含义 |
| Data.DailyGrowthRate | number | 对应 DateKey 的单位净值日增长率，单位为百分比；仅单位净值走势使用 |
| Data.CumulativeNetWorth | number | 对应 DateKey 的累计净值；仅 indicator=累计净值走势时使用 |
| Data.CumulativeYieldRate | number | 对应 DateKey 的累计收益率，单位为百分比；仅累计收益率走势使用 |
| Data.SameTypeRanking | string | 同类排名走势时表示排名名次；同类排名百分比时表示排名百分位 |
| Data.TotalRanking | string | 当前日期参与同类排名的基金总数；仅同类排名走势使用 |
| Data.EquityRegistrationDate | string | 本次基金分红的权益登记日期；仅分红送配详情使用 |
| Data.ExDividendDate | string | 本次基金分红的除息日期；仅分红送配详情使用 |
| Data.DividendPerShare | string | 本次分红每份基金份额对应的金额说明；仅分红送配详情使用 |
| Data.DividendPaymentDate | string | 本次基金分红的实际发放日期；仅分红送配详情使用 |
| Data.SplitConversionDate | string | 基金份额拆分或折算的生效日期；仅拆分详情使用 |
| Data.SplitType | string | 基金份额拆分、合并或折算的事件类型；仅拆分详情使用 |
| Data.SplitConversionRatio | string | 基金份额拆分或折算比例说明；仅拆分详情使用 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 开放式基金区间净值 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[基金基本信息](https://www.gugudata.com/api/details/fundinfolist)，适合补充同类场景的接口能力。
- 可搭配使用：[指数基金业绩](https://www.gugudata.com/api/details/fundbasicindex)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金业绩排行](https://www.gugudata.com/api/details/fundetfopenrankinglist)，适合补充同类场景的接口能力。
