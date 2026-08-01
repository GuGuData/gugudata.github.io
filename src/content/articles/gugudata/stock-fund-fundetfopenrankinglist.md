---
title: "场内基金业绩排行 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundetfopenrankinglist"
section: "gugudata"
slug: "stock-fund-fundetfopenrankinglist"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundetfopenrankinglist"
cover: "https://static.gugudata.com/api_cover_fundetfopenrankinglist.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundetfopenrankinglist](https://www.gugudata.com/api/details/fundetfopenrankinglist)

场内基金业绩排行 API 场内基金多周期收益排行快照，场内基金、ETF 排行、区间收益等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_fundetfopenrankinglist.jpg)

## 1. 产品功能

- 返回当前可用场内基金的最新日度业绩排行快照，无需业务筛选参数；
- 每条记录包含单位净值、累计净值和排行快照日期，便于确认业绩统计时点；
- 覆盖近 1 周、近 1 月、近 3 月、近 6 月和近 1 年收益率；
- 同时提供近 2 年、近 3 年、今年以来和成立以来收益率；
- 返回基金类型和成立日期，可用于排行结果的二次分组与展示；
- DataTotalCount 表示当前可用排行记录总数，正式接口不限制为演示页数量；
- 接口无分页参数，返回规模随当前可用场内基金数量变化；
- 排行依据为基金净值区间收益，不是盘中成交价格、涨跌幅或成交量排行；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/fund-etf-open-ranking-list

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/fund-etf-open-ranking-list?appkey=REDACTED

**数据预览:** [https://www.gugudata.com/preview/fundetfopenrankinglist](https://www.gugudata.com/preview/fundetfopenrankinglist)

**接口测试:** [https://api.gugudata.com/fund/fund-etf-open-ranking-list/demo](https://api.gugudata.com/fund/fund-etf-open-ranking-list/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 场内基金的 6 位代码，保留前导零 |
| Data.FundName | string | 场内基金简称，用于排行列表展示 |
| Data.FundType | string | 基金所属类型，用于区分不同场内基金类别 |
| Data.DateKey | string | 本条业绩排行快照对应的净值日期，通常格式为 yyyy-MM-dd |
| Data.UnitNetValue | number | 基金在 DateKey 最近公布的单位净值 |
| Data.AccumulatedNetValue | number | 基金在 DateKey 最近公布的累计净值 |
| Data.Week | number | 截至排行快照日的近 1 周收益率，单位为百分比 |
| Data.Month | number | 截至排行快照日的近 1 月收益率，单位为百分比 |
| Data.ThreeMonth | number | 截至排行快照日的近 3 月收益率，单位为百分比 |
| Data.SixMonth | number | 截至排行快照日的近 6 月收益率，单位为百分比 |
| Data.Year | number | 截至排行快照日的近 1 年收益率，单位为百分比 |
| Data.TwoYear | number | 截至排行快照日的近 2 年收益率，单位为百分比 |
| Data.ThreeYear | number | 截至排行快照日的近 3 年收益率，单位为百分比 |
| Data.YearToDate | number | 从本年度首个净值日至排行快照日的收益率，单位为百分比 |
| Data.SinceInception | number | 从基金成立日至排行快照日的累计收益率，单位为百分比 |
| Data.EstablishingDate | string | 基金成立日期，通常格式为 yyyy-MM-dd |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 场内基金业绩排行 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[基金基本信息](https://www.gugudata.com/api/details/fundinfolist)，适合补充同类场景的接口能力。
- 可搭配使用：[指数基金业绩](https://www.gugudata.com/api/details/fundbasicindex)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金历史净值](https://www.gugudata.com/api/details/fundopenetfhistory)，适合补充同类场景的接口能力。
