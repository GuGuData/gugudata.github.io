---
title: "A 股历年财务指标 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/financialindicator"
section: "gugudata"
slug: "stock-cn-financialindicator"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/financialindicator"
cover: "https://static.gugudata.com/api_cover_cn_financialindicator.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/financialindicator](https://www.gugudata.com/api/details/financialindicator)

A 股历年财务指标 API 历年所有财报数据，股票、A股等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_cn_financialindicator.jpg)

## 1. 产品功能

- 支持所有 A 股全量财务指标数据查询；
- 分别包括每股指标、盈利能力、成长能力、营运能力、偿债及资本结构、现金流量、其他指标数据；
- 返回 80 多项财务指标；
- 多数据源清洗整合，百万级数据毫秒级返回；
- 围绕“A 股历年财务指标”提供标准化能力，便于快速接入现有业务；
- 适合将“A 股历年财务指标”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；
- 可与股票代码、交易日历、资金流和财务数据接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/cn/financialindicator

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/cn/financialindicator?appkey=REDACTED&symbol=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/financialindicator](https://www.gugudata.com/preview/financialindicator)

**接口测试:** [https://api.gugudata.com/stock/cn/financialindicator/demo](https://api.gugudata.com/stock/cn/financialindicator/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| symbol | string | 否 | YOUR_VALUE | 传递单支股票代码，如: 600031。可通过前置接口或参见 [A 股股票代码参数枚举页面](https://www.gugudata.com/enum/stockcn/symbols) |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.columns | string[] | 财务指标的数据列名称，注意因为财务指标数据字段非常多且为了保证表达精准性，这里的字段说明以中文进行表达。 |
| Data.data | string[][] | 对应时间点的具体财务指标数据 |
| Data.data | string[] | 日期；摊薄每股收益(元)；加权每股收益(元)；每股收益_调整后(元)；扣除非经常性损益后的每股收益(元)；每股净资产_调整前(元)；每股净资产_调整后(元)；每股经营性现金流(元)；每股资本公积金(元)；每股未分配利润(元)；调整后的每股净资产(元)；总资产利润率(%)；主营业务利润率(%)；总资产净利润率(%)；成本费用利润率(%)；营业利润率(%)；主营业务成本率(%)；销售净利率(%)；股本报酬率(%)；净资产报酬率(%)；资产报酬率(%)；销售毛利率(%)；三项费用比重；非主营比重；主营利润比重；股息发放率(%)；投资收益率(%)；主营业务利润(元)；净资产收益率(%)；加权净资产收益率(%)；扣除非经常性损益后的净利润(元)；主营业务收入增长率(%)；净利润增长率(%)；净资产增长率(%)；总资产增长率(%)；应收账款周转率(次)；应收账款周转天数(天)；存货周转天数(天)；存货周转率(次)；固定资产周转率(次)；总资产周转率(次)；总资产周转天数(天)；流动资产周转率(次)；流动资产周转天数(天)；股东权益周转率(次)；流动比率；速动比率；现金比率(%)；利息支付倍数；长期债务与营运资金比率(%)；股东权益比率(%)；长期负债比率(%)；股东权益与固定资产比率(%)；负债与所有者权益比率(%)；长期资产与长期资金比率(%)；资本化比率(%)；固定资产净值率(%)；资本固定化比率(%)；产权比率(%)；清算价值比率(%)；固定资产比重(%)；资产负债率(%)；总资产(元)；经营现金净流量对销售收入比率(%)；资产的经营现金流量回报率(%)；经营现金净流量与净利润的比率(%)；经营现金净流量对负债比率(%)；现金流量比率(%)；短期股票投资(元)；短期债券投资(元)；短期其它经营性投资(元)；长期股票投资(元)；长期债券投资(元)；长期其它经营性投资(元)；1年以内应收帐款(元)；1-2年以内应收帐款(元)；2-3年以内应收帐款(元)；3年以内应收帐款(元)；1年以内预付货款(元)；1-2年以内预付货款(元)；2-3年以内预付货款(元)；3年以内预付货款(元)；1年以内其它应收款(元)；1-2年以内其它应收款(元)；2-3年以内其它应收款(元)；3年以内其它应收款(元) |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 A 股历年财务指标 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[查询 A 股股票代码列表数据，支持分页查询](https://api.gugudata.com/stock/cnsymbols?appkey=REDACTED&pageindex=YOUR_VALUE&pagesize=YOUR_VALUE)（GET），包含股票编码、股票名称、股票中文名称。
