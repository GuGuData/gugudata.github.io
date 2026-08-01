---
title: "港股历年三大财务报表 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/hkannualreport"
section: "gugudata"
slug: "stock-hk-annualreport"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/hkannualreport"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/1984326a017f4f1d359ac2915d2777b3.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/hkannualreport](https://www.gugudata.com/api/details/hkannualreport)

港股历年三大财务报表 API 历年所有财报数据，股票、港股等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/1984326a017f4f1d359ac2915d2777b3.jpg)

## 1. 产品功能

- 支持所有港股全量三大财报数据查询；
- 分别包括财报基本面、资产负债表、利润表、现金流量表数据；
- 返回 70 多项财务指标；
- 多数据源清洗整合，百万级数据毫秒级返回；
- 围绕“港股历年三大财务报表”提供标准化能力，便于快速接入现有业务；
- 适合将“港股历年三大财务报表”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/hk/annualreport

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/hk/annualreport?appkey=REDACTED&symbol=YOUR_VALUE&type=YOUR_VALUE&indicator=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/hkannualreport](https://www.gugudata.com/preview/hkannualreport)

**接口测试:** [https://api.gugudata.com/stock/hk/annualreport/demo](https://api.gugudata.com/stock/hk/annualreport/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 否 | YOUR_VALUE | 支持传递单个港股股票代码进行筛选，如：00012。具体值参见 [港股股票代码参数枚举页面](https://www.gugudata.com/enum/stockhk/symbols) |
| type | string | 是 | YOUR_VALUE | 三大财报类型，可选值为：资产负债表\|利润表\|现金流量表，传递空值，获取财报基本面数据。 |
| indicator | string | 是 | YOUR_VALUE | 财报时间区间类型，可选值为：年度\|报告期 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.columns | string[] | 财报的数据列名称，注意因为财报数据字段非常多且为了保证表达精准性，这里的字段说明主要以中文进行表达。 |
| Data.data | string[][] | 对应时间点的具体财报数据 |
| Data.data.资产负债表 | string[] | 财报基本面数据，动态输出。 |
| Data.data.资产负债表 | string[] | 资产负债表数据，动态输出。 |
| Data.data.利润表 | string[] | 利润表数据，动态输出。 |
| Data.data.现金流量表 | string[] | 现金流量表数据，动态输出。 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 港股历年三大财务报表 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询港股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/hksymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
