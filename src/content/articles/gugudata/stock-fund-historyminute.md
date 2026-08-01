---
title: "场内基金分时行情 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundhistoryminute"
section: "gugudata"
slug: "stock-fund-historyminute"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundhistoryminute"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/bf9c36a982a594794bc39cb9fec4c6c9.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundhistoryminute](https://www.gugudata.com/api/details/fundhistoryminute)

场内基金分时行情 API 1 至 60 分钟价格、成交量与成交额，场内基金、分钟行情、成交量等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/bf9c36a982a594794bc39cb9fec4c6c9.png)

## 1. 产品功能

- 返回每个分钟周期的开盘价、收盘价、最高价和最低价，可直接绘制分时或 K 线图；
- 同时返回周期成交量、成交额和周期末最新价，用于分析场内交易活跃度；
- period 支持 1、5、15、30、60 分钟，未传时默认使用 5 分钟周期；
- 1 分钟数据的历史覆盖通常短于其他周期，具体可用范围以返回结果为准；
- symbol 支持标准 6 位基金代码，也兼容 sh 或 sz 市场前缀，返回时统一为 6 位代码；
- beginDate 和 endDate 精确到秒，查询间隔最大为 366 个自然日；
- adjust 支持不复权、前复权和后复权，服务端会将大小写统一后处理；
- 日期、代码、周期或复权参数不合法时返回明确参数错误，不会静默改用其他条件；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/historyminute

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/historyminute?appkey=REDACTED&symbol=513500&beginDate=YOUR_VALUE&endDate=YOUR_VALUE&period=5&adjust=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/fundhistoryminute](https://www.gugudata.com/preview/fundhistoryminute)

**接口测试:** [https://api.gugudata.com/fund/historyminute/demo](https://api.gugudata.com/fund/historyminute/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| symbol | string | 是 | 513500 | 必填。单个 6 位场内基金代码；也兼容 sh513500 或 sz159915，服务端会去除市场前缀并按标准 6 位代码查询 |
| beginDate | string | 是 | YOUR_VALUE | 必填。查询开始时间，严格使用 yyyyMMdd HH:mm:ss 格式，例如 20260701 09:30:00 |
| endDate | string | 是 | YOUR_VALUE | 必填。查询结束时间，格式与 beginDate 相同；不得早于开始时间，二者间隔最大为 366 个自然日 |
| period | integer | 否 | 5 | 可选。分钟周期，仅支持 1、5、15、30、60；未传时默认 5 |
| adjust | string | 否 | YOUR_VALUE | 可选。复权方式：空值表示不复权，pre 表示前复权，after 表示后复权；英文值不区分大小写 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.DateTime | string | 当前分钟周期对应的行情时间，通常格式为 yyyy-MM-dd HH:mm:ss |
| Data.Symbol | string | 当前行情记录所属场内基金的 6 位代码，不包含 sh 或 sz 前缀 |
| Data.Open | number | 当前分钟周期第一笔有效成交对应的开盘价 |
| Data.Close | number | 当前分钟周期最后一笔有效成交对应的收盘价 |
| Data.High | number | 当前分钟周期内的最高成交价 |
| Data.Low | number | 当前分钟周期内的最低成交价 |
| Data.TradingVolume | integer | 当前分钟周期内累计成交量；计量口径以场内行情源为准 |
| Data.TradingAmount | number | 当前分钟周期内累计成交金额 |
| Data.Latest | number | 当前分钟周期结束时的最新价；对聚合周期通常与 Close 一致 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 场内基金分时行情 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询公募开放式基金代码列表数据，支持分页查询](https://api.gugudata.com/fund/fundsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含基金代码 FundCode、基金简称 FundShort、基金类型 FundType、拼音全称 FundPinYin、拼音缩写 FundABBR。
