---
title: "场内基金实时净值 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundopenetfrealtime"
section: "gugudata"
slug: "stock-fund-fundopenetfrealtime"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundopenetfrealtime"
cover: "https://static.gugudata.com/api_fund_etf_realtime.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundopenetfrealtime](https://www.gugudata.com/api/details/fundopenetfrealtime)

场内基金实时净值 API 最新场内基金净值、市价与折溢价，场内基金、ETF、净值与市价等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_fund_etf_realtime.png)

## 1. 产品功能

- 返回场内基金最近一次公布的单位净值和累计净值，适合展示最新日度净值快照；
- 同时提供上一净值日的单位净值、累计净值、增长值和增长率，便于比较净值变化；
- 返回对应数据日期的场内市场价格以及折溢价率，可用于比较交易价格与基金净值；
- symbol 留空时返回当前可用的全部场内基金，不使用分页参数；
- symbol 可传一个代码，也可使用英文逗号分隔最多 50 个 6 位基金代码；
- 批量代码会去除首尾空格和重复项，格式不正确或数量超限时返回参数错误；
- 净值以基金公司最近公布结果为准，市场价格也不代表逐笔或分钟级实时成交；
- 需要分钟价格、成交量和成交额时，应使用场内基金分时行情接口；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/open/etfrealtime

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/open/etfrealtime?appkey=REDACTED&symbol=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/fundopenetfrealtime](https://www.gugudata.com/preview/fundopenetfrealtime)

**接口测试:** [https://api.gugudata.com/fund/open/etfrealtime/demo](https://api.gugudata.com/fund/open/etfrealtime/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| symbol | string | 否 | YOUR_VALUE | 可选。传单个 6 位场内基金代码，或使用英文逗号分隔多个代码，最多 50 个；代码保留前导零。留空时返回当前可用的全部场内基金 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 场内交易基金的 6 位代码，保留前导零 |
| Data.FundABBR | string | 场内交易基金简称，用于行情列表和基金检索展示 |
| Data.FundType | string | 基金所属类型，用于区分 ETF、LOF 等场内基金类别 |
| Data.UnitNetworth | number | 基金公司最近一次公布的单位净值，不等同于交易所实时成交价 |
| Data.CumulativeNetworth | number | 基金公司最近一次公布的累计净值，体现历史累计价值 |
| Data.PreDayUnitNetworth | number | 前一个已公布净值日的单位净值 |
| Data.PreDayCumulativeNetworth | number | 前一个已公布净值日的累计净值 |
| Data.Growth | number | 最新单位净值相对上一净值日的增长值，可为负数或零 |
| Data.GrowthRate | string | 最新单位净值相对上一净值日的增长率，通常以带百分号文本返回 |
| Data.MarketPrice | string | 对应数据日期的场内市场价格；需要分钟走势时应使用分时行情接口 |
| Data.RateofDiscount | string | 场内市场价格相对单位净值的折价或溢价比例，通常包含百分号 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 场内基金实时净值 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询公募开放式基金代码列表数据，支持分页查询](https://api.gugudata.com/fund/fundsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含基金代码 FundCode、基金简称 FundShort、基金类型 FundType、拼音全称 FundPinYin、拼音缩写 FundABBR。
