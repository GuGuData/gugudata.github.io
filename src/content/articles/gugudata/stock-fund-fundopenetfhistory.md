---
title: "场内基金历史净值 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundopenetfhistory"
section: "gugudata"
slug: "stock-fund-fundopenetfhistory"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundopenetfhistory"
cover: "https://static.gugudata.com/api_fund_etf.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundopenetfhistory](https://www.gugudata.com/api/details/fundopenetfhistory)

场内基金历史净值 API 指定日期区间的场内基金日净值，场内基金、日度历史、申赎状态等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_fund_etf.png)

## 1. 产品功能

- 按一个场内基金代码查询指定开始日期和结束日期内的日度净值记录；
- 每条记录包含单位净值、累计净值和日增长率，可用于绘制日度净值曲线；
- 同时返回对应净值日的申购状态和赎回状态，便于识别暂停申购或赎回情况；
- startDate 和 endDate 均使用 yyyyMMdd 格式，并按自然日期进行严格校验；
- 开始日期可以等于结束日期，但不能晚于结束日期；本接口不限制为交易日；
- 每次只接受一个 6 位场内基金代码，不支持逗号分隔的批量代码；
- 无匹配记录时 Data 为空且 DataTotalCount 为 0，不应将其解释为接口结构变化；
- 本接口返回日度净值，不提供分钟价格与成交量；分钟行情请使用场内基金分时接口；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/open/etfhistory

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/open/etfhistory?appkey=REDACTED&symbol=511010&startDate=20260701&endDate=20260710

**数据预览:** [https://www.gugudata.com/preview/fundopenetfhistory](https://www.gugudata.com/preview/fundopenetfhistory)

**接口测试:** [https://api.gugudata.com/fund/open/etfhistory/demo](https://api.gugudata.com/fund/open/etfhistory/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| symbol | string | 是 | 511010 | 必填。单个 6 位场内基金代码，保留前导零；不支持市场前缀或多个代码 |
| startDate | string | 是 | 20260701 | 必填。查询开始日期，严格使用 yyyyMMdd 格式，例如 20260701 |
| endDate | string | 是 | 20260710 | 必填。查询结束日期，严格使用 yyyyMMdd 格式；可以与 startDate 相同，但不得早于 startDate |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 当前历史记录所属场内基金的 6 位代码，保留前导零 |
| Data.NAVDate | string | 当前净值记录日期，格式为 yyyyMMdd |
| Data.NAV | number | 对应 NAVDate 的单位净值，不等同于场内成交价格 |
| Data.CumulativeNetworth | number | 对应 NAVDate 的累计净值，包含历史分红等累计影响 |
| Data.DailyGrowthRate | number | 对应 NAVDate 的单位净值日增长率，单位为百分比 |
| Data.SubscriptionStatus | string | 对应 NAVDate 的基金申购状态，例如开放申购或暂停申购 |
| Data.RedemptionStatus | string | 对应 NAVDate 的基金赎回状态，例如开放赎回或暂停赎回 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 场内基金历史净值 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询公募开放式基金代码列表数据，支持分页查询](https://api.gugudata.com/fund/fundsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含基金代码 FundCode、基金简称 FundShort、基金类型 FundType、拼音全称 FundPinYin、拼音缩写 FundABBR。
