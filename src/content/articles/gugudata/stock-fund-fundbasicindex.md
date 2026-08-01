---
title: "指数基金业绩 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundbasicindex"
section: "gugudata"
slug: "stock-fund-fundbasicindex"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundbasicindex"
cover: "https://static.gugudata.com/api_stock_fundbasicindex.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundbasicindex](https://www.gugudata.com/api/details/fundbasicindex)

指数基金业绩 API 指数基金收益、费率与跟踪信息，指数基金、区间收益、跟踪信息等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_stock_fundbasicindex.png)

## 1. 产品功能

- 按指数类别和指数基金类型筛选当前可用的指数基金业绩快照；
- 返回最新单位净值、净值日期和日增长率，用于查看基金最近表现；
- 覆盖近 1 周、近 1 月、近 3 月、近 6 月、近 1 年及更长周期收益；
- 同时提供今年以来和成立以来收益率，便于比较短期与长期业绩；
- 返回基金费率和最低购买金额，可用于产品列表和购买门槛展示；
- 返回跟踪标的和跟踪方式，用于区分不同指数及被动、增强跟踪策略；
- index 和 indicator 均使用固定中文枚举，参数不在支持范围时返回明确错误；
- 本接口是最新日度业绩快照，不返回盘中成交价格、成交量或分钟行情；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/basic/index

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/basic/index?appkey=REDACTED&index=YOUR_VALUE&indicator=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/fundbasicindex](https://www.gugudata.com/preview/fundbasicindex)

**接口测试:** [https://api.gugudata.com/fund/basic/index/demo](https://api.gugudata.com/fund/basic/index/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| index | string | 是 | YOUR_VALUE | 必填。指数类别，仅支持：全部、沪深指数、行业主题、大盘指数、中盘指数、小盘指数、股票指数、债券指数；必须传完整中文名称 |
| indicator | string | 是 | YOUR_VALUE | 必填。指数基金类型，仅支持：全部、被动指数型、增强指数型；必须传完整中文名称 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 指数基金的 6 位代码，保留前导零 |
| Data.FundName | string | 指数基金名称，用于识别基金份额和跟踪产品 |
| Data.NetAssetValue | number | 基金公司最近一次公布的单位净值 |
| Data.TimeKey | string | 最近单位净值对应的日期，通常格式为 yyyy-MM-dd |
| Data.DayGrowthRate | number | 最近单位净值相对上一净值日的增长率，单位为百分比 |
| Data.WeekGrowthRate | number | 截至 TimeKey 的近 1 周收益率，单位为百分比 |
| Data.MonthGrowthRate | number | 截至 TimeKey 的近 1 月收益率，单位为百分比 |
| Data.ThreeMonthGrowthRate | number | 截至 TimeKey 的近 3 月收益率，单位为百分比 |
| Data.SixMonthGrowthRate | number | 截至 TimeKey 的近 6 月收益率，单位为百分比 |
| Data.YearGrowthRate | number | 截至 TimeKey 的近 1 年收益率，单位为百分比 |
| Data.TwoYearGrowthRate | number | 截至 TimeKey 的近 2 年收益率，单位为百分比 |
| Data.ThreeYearGrowthRate | number | 截至 TimeKey 的近 3 年收益率，单位为百分比 |
| Data.ThisYearGrowthRate | number | 从本年度首个净值日至 TimeKey 的收益率，单位为百分比 |
| Data.SinceEstablishmentGrowthRate | number | 从基金成立日至 TimeKey 的累计收益率，单位为百分比 |
| Data.Fee | number | 数据源提供的基金费率数值，具体计费以基金销售规则为准 |
| Data.MinPurchaseAmount | string | 基金最低购买金额说明，可能包含金额单位或文字条件 |
| Data.TrackingTarget | string | 基金主要跟踪的指数或标的名称 |
| Data.TrackingMethod | string | 基金采用的指数跟踪方式或策略说明 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 指数基金业绩 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[基金基本信息](https://www.gugudata.com/api/details/fundinfolist)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金业绩排行](https://www.gugudata.com/api/details/fundetfopenrankinglist)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金历史净值](https://www.gugudata.com/api/details/fundopenetfhistory)，适合补充同类场景的接口能力。
