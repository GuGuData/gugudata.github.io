---
title: "公募基金实时净值 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundopenrealtime"
section: "gugudata"
slug: "stock-fundopenrealtime"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundopenrealtime"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/71d49a351a962819e99c6d931f7d6377.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundopenrealtime](https://www.gugudata.com/api/details/fundopenrealtime)

公募基金实时净值 API 最新开放式基金日净值与申赎状态，开放式基金、最新净值、批量查询等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/71d49a351a962819e99c6d931f7d6377.jpg)

## 1. 产品功能

- 返回基金公司最近一次公布的单位净值和累计净值，适合展示每日净值快照；
- 同时返回上一净值日数据、日增长值和日增长率，便于比较前后两个净值日；
- 包含申购状态、赎回状态和手续费说明，可用于基金详情页和产品筛选；
- 不传 symbol 时使用 pageIndex 和 pageSize 分页，DataTotalCount 表示全部基金数量；
- 传入 symbol 时按代码筛选，可使用英文逗号一次查询最多 50 个基金代码；
- 批量代码会去除首尾空格和重复项，返回结果仍使用标准 6 位基金代码；
- 数据日期以基金公司最新公布结果为准，非交易日或未更新时不一定等于当天；
- 本接口不是盘中估值或场内成交行情，盘中参考应使用净值估算或分时行情接口；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/open/realtime

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/open/realtime?appkey=REDACTED&symbol=YOUR_VALUE&pageIndex=1&pageSize=10

**数据预览:** [https://www.gugudata.com/preview/fundopenrealtime](https://www.gugudata.com/preview/fundopenrealtime)

**接口测试:** [https://api.gugudata.com/fund/open/realtime/demo](https://api.gugudata.com/fund/open/realtime/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| symbol | string | 否 | YOUR_VALUE | 可选。传单个 6 位基金代码，或使用英文逗号分隔多个代码，最多 50 个；代码保留前导零。传入后按代码筛选，pageIndex 和 pageSize 不影响结果，但显式传入时仍须满足合法范围 |
| pageIndex | integer | 否 | 1 | 分页页码，从 1 开始；仅在 symbol 为空时影响结果。即使传入 symbol，显式提供的 pageIndex 也必须大于或等于 1 |
| pageSize | integer | 否 | 10 | 每页返回条数，当前取值范围为 1~50；仅在 symbol 为空时影响结果。即使传入 symbol，显式提供的 pageSize 也必须在合法范围内 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 基金的 6 位代码，保留前导零，可直接用于其他基金接口的 symbol 参数 |
| Data.FundABBR | string | 基金简称，用于列表、搜索结果和净值卡片展示 |
| Data.UnitNetworth | number | 基金公司最近一次公布的单位净值，不是盘中估算值或场内成交价 |
| Data.CumulativeNetworth | number | 基金公司最近一次公布的累计净值，包含历史分红等累计影响 |
| Data.PreDayUnitNetworth | number | 前一个已公布净值日的单位净值，用于计算本期净值变化 |
| Data.PreDayCumulativeNetworth | number | 前一个已公布净值日的累计净值，用于比较累计净值变化 |
| Data.DailyGrowth | number | 最新单位净值相对上一净值日的增长值，可为负数或零 |
| Data.DailyGrowthRate | number | 最新单位净值相对上一净值日的增长率，单位为百分比 |
| Data.SubscriptionStatus | string | 基金当前申购状态，例如开放申购、暂停申购或限制大额申购 |
| Data.RedemptionStatus | string | 基金当前赎回状态，例如开放赎回或暂停赎回 |
| Data.ServiceCharge | string | 数据源公布的申购手续费或费率说明，可能包含百分号或文字说明 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 公募基金实时净值 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[公募基金代码枚举（分页）](https://api.gugudata.com/fund/fundsymbols?appkey=REDACTED&pageindex=1&pagesize=20)（GET），FundCode 基金代码、FundABBR 基金简称、FundShort 拼音缩写、FundType 基金类型、FundPinYin 名称拼音。
