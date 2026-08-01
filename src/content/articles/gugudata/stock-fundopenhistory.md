---
title: "公募基金历史数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundopenhistory"
section: "gugudata"
slug: "stock-fundopenhistory"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundopenhistory"
cover: "https://static.gugudata.com/api_fund_open_history.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundopenhistory](https://www.gugudata.com/api/details/fundopenhistory)

公募基金历史数据 API 完整历史净值、收益、排名与基金事件，开放式基金、全历史、多指标等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_fund_open_history.jpg)

## 1. 产品功能

- 一次获取基金可用的完整历史序列，不要求传入开始日期和结束日期；
- 支持单位净值、累计净值和累计收益率三类历史走势，适合绘制长期净值曲线；
- 支持同类排名及同类排名百分比，可用于观察基金在同类产品中的相对位置；
- 支持分红送配和基金拆分记录，可用于还原影响累计净值的历史基金事件；
- 支持货币基金每万份收益、7 日年化收益率以及申购赎回状态历史；
- 普通基金最多可批量查询 20 个代码，货币基金历史每次查询一个代码；
- type 决定 Data 中实际出现的业务字段，接入时应按所选指标读取对应字段；
- 需要限制查询日期或控制响应体大小时，建议改用开放式基金区间净值接口；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/open/history

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/open/history?appkey=REDACTED&symbol=007401&type=NAVTREND

**数据预览:** [https://www.gugudata.com/preview/fundopenhistory](https://www.gugudata.com/preview/fundopenhistory)

**接口测试:** [https://api.gugudata.com/fund/open/history/demo](https://api.gugudata.com/fund/open/history/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| symbol | string | 是 | 007401 | 基金代码。普通基金可传单个代码，或使用英文逗号分隔最多 20 个 6 位代码；MONETARY 货币基金模式每次仅支持一个代码 |
| type | string | 是 | NAVTREND | 返回指标。NAVTREND 为单位净值走势；ACCUMULATEDNETWORTHTREND 为累计净值走势；ACCUMULATEDRATEOFRETURN 为累计收益率；SIMILARRANKINGS 为同类排名；SIMILARRANKINGSPERCENT 为排名百分比；DIVIDENDDETAILS 为分红；SPLITDETAILS 为拆分；MONETARY 为货币基金收益 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 当前历史记录所属基金的 6 位代码，保留前导零 |
| Data.FundShort | string | 当前历史记录所属基金的简称 |
| Data.FundType | string | 基金所属类型；用于批量查询时区分不同基金类别 |
| Data.DateKey | integer | 净值、收益、排名或货币基金记录日期，格式为 yyyyMMdd；仅相关 type 返回 |
| Data.NetAssetValue | number | 对应 DateKey 的单位净值；仅 NAVTREND 模式返回 |
| Data.DayGrowthRate | number | 对应 DateKey 的单位净值日增长率，单位为百分比；仅 NAVTREND 返回 |
| Data.AccumulatedNetWorth | number | 对应 DateKey 的累计净值；仅 ACCUMULATEDNETWORTHTREND 返回 |
| Data.AccumulatedRateofReturn | number | 对应 DateKey 的累计收益率，单位为百分比；仅 ACCUMULATEDRATEOFRETURN 返回 |
| Data.SimilarRanking | integer | 该基金在同类基金中的近 3 月收益排名；仅 SIMILARRANKINGS 返回 |
| Data.TotalRanking | integer | 当前日期参与同类排名的基金总数；仅 SIMILARRANKINGS 返回 |
| Data.SimilarRankingPercent | number | 该基金同类近 3 月收益排名所处百分位；仅 SIMILARRANKINGSPERCENT 返回 |
| Data.Year | string | 分红或拆分事件所属年份；仅 DIVIDENDDETAILS、SPLITDETAILS 返回 |
| Data.RightsRegistrationDay | string | 分红权益登记日期；仅 DIVIDENDDETAILS 返回 |
| Data.ExDividendDate | string | 基金本次分红的除息日期；仅 DIVIDENDDETAILS 返回 |
| Data.PerShare | string | 本次分红每份基金份额对应的分红金额说明；仅 DIVIDENDDETAILS 返回 |
| Data.ShareDividendDate | string | 本次基金分红的实际发放日期；仅 DIVIDENDDETAILS 返回 |
| Data.SplitDate | string | 基金份额拆分或折算生效日期；仅 SPLITDETAILS 返回 |
| Data.SplitType | string | 基金份额拆分、合并或折算的事件类型；仅 SPLITDETAILS 返回 |
| Data.SplitRatio | string | 基金份额拆分或折算比例说明；仅 SPLITDETAILS 返回 |
| Data.PerTenThousandIncome | string | 货币基金对应日期的每万份收益；仅 MONETARY 返回 |
| Data.SevenDayAnnualizedIncome | number | 货币基金对应日期的 7 日年化收益率，单位为百分比；仅 MONETARY 返回 |
| Data.PurchaseStatus | string | 货币基金对应日期的申购开放状态；仅 MONETARY 返回 |
| Data.RedemptionStatus | string | 货币基金对应日期的赎回开放状态；仅 MONETARY 返回 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 公募基金历史数据 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询公募开放式基金代码列表数据，支持分页查询](https://api.gugudata.com/fund/fundsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含基金代码 FundCode、基金简称 FundShort、基金类型 FundType、拼音全称 FundPinYin、拼音缩写 FundABBR。
