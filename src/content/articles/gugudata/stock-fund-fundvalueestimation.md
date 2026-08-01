---
title: "开放式基金盘中净值估算 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fundvalueestimation"
section: "gugudata"
slug: "stock-fund-fundvalueestimation"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fundvalueestimation"
cover: "https://static.gugudata.com/api_cover_fund_fund-value-estimation.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fundvalueestimation](https://www.gugudata.com/api/details/fundvalueestimation)

开放式基金盘中净值估算 API 盘中估算净值、涨跌率与估算偏差，开放式基金、盘中估值、估算偏差等关键词场景常会用到，适合用于金融指标查询与行情监控、量化分析与研究支持与报表系统与数据看板接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_fund_fund-value-estimation.png)

## 1. 产品功能

- 返回盘中估算净值和估算涨跌率，用于交易时段内观察开放式基金参考走势；
- 同时返回最近公布的官方单位净值、官方日增长率和前一净值日单位净值；
- EstimatedDeviation 表示估算值与最近官方净值之间的偏差，便于比较估算结果；
- symbol 可传一个代码，也可使用英文逗号分隔最多 50 个 6 位基金代码；
- 传入 symbol 时优先按基金代码筛选；未传 symbol 时可使用 type 按基金类型筛选；
- type 和 symbol 均可省略，type 空值会按“全部”处理并返回当前可用结果；
- 非交易时段、基金未被覆盖或数据尚未更新时，可能返回空列表及明确状态说明；
- 估算结果仅供盘中参考，不等同于基金公司最终公布净值，也不代表可成交价格；

## 2. API 文档

**接口地址:** https://api.gugudata.com/fund/fund-value-estimation

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/fund/fund-value-estimation?appkey=REDACTED&type=YOUR_VALUE&symbol=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/fundvalueestimation](https://www.gugudata.com/preview/fundvalueestimation)

**接口测试:** [https://api.gugudata.com/fund/fund-value-estimation/demo](https://api.gugudata.com/fund/fund-value-estimation/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 必填。接口调用凭证，请在咕咕数据控制台获取；用于身份鉴权和套餐额度校验，不要在公开页面或客户端日志中暴露 |
| type | string | 否 | YOUR_VALUE | 可选。基金类型筛选值，默认“全部”；空字符串同样按“全部”处理。传入 symbol 后优先按基金代码筛选 |
| symbol | string | 否 | YOUR_VALUE | 可选。传单个 6 位开放式基金代码，或使用英文逗号分隔多个代码，最多 50 个；代码会去重并保留前导零 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 服务端识别并记录的本次业务查询参数摘要，不包含 APPKEY 等鉴权信息 |
| DataStatus.StatusCode | integer | 业务状态码；100 表示正常返回，其他值需结合 StatusDescription 判断 |
| DataStatus.StatusDescription | string | 业务状态说明；成功时说明请求结果，失败时说明参数、权限或数据依赖问题 |
| DataStatus.ResponseDateTime | string | 服务端生成响应的北京时间，格式为 yyyy-MM-dd HH:mm:ss.fff |
| DataStatus.DataTotalCount | integer | 当前查询条件下的数据总量；分页接口通常表示全部匹配数量，而不是当前页条数 |
| Data.FundCode | string | 当前估算记录所属基金的 6 位代码，保留前导零 |
| Data.FundName | string | 基金名称，用于确认代码对应的开放式基金产品 |
| Data.FundType | string | 基金所属类型，可用于结果分组和筛选 |
| Data.EstimatedValue | number | 当前快照对应的盘中估算净值，通常保留至 4 位小数 |
| Data.EstimatedGrowthRate | number | 盘中估算净值相对上一净值日的估算涨跌率，单位为百分比 |
| Data.NetAssetValue | number | 基金公司最近一次公布的官方单位净值，用作估算结果对照 |
| Data.DailyGrowthRate | number | 最近官方单位净值对应的日增长率，单位为百分比 |
| Data.EstimatedDeviation | number | 盘中估算净值与最近官方单位净值之间的数据源偏差值 |
| Data.NetAssetValueYesterday | number | 前一个已公布净值日的官方单位净值 |
| Data.SnapshotTime | string | 当前估算记录的更新时间，通常格式为 yyyy-MM-dd HH:mm；数据源未提供时可能为空 |
| Data.DataScope | string | 当前估算结果适用的基金覆盖范围说明 |
| Data.NoDataReason | string | 有估算数据时通常为空；无匹配结果时具体原因通过 DataStatus.StatusDescription 返回 |

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

- 适合用于金融指标查询与行情监控，快速补齐产品侧需要的 开放式基金盘中净值估算 数据能力。
- 适合用于量化分析与研究支持，减少手工整理、清洗与重复开发成本。
- 适合用于报表系统与数据看板接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[基金基本信息](https://www.gugudata.com/api/details/fundinfolist)，适合补充同类场景的接口能力。
- 可搭配使用：[指数基金业绩](https://www.gugudata.com/api/details/fundbasicindex)，适合补充同类场景的接口能力。
- 可搭配使用：[场内基金业绩排行](https://www.gugudata.com/api/details/fundetfopenrankinglist)，适合补充同类场景的接口能力。
