---
title: "美股分类实时行情数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/usfamous"
section: "gugudata"
slug: "stock-us-famous"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/usfamous"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/a36fa76838936130ac06bfebc7fc14d3.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/usfamous](https://www.gugudata.com/api/details/usfamous)

美股分类实时行情数据 API 返回多分类的美股实时行情，股票、美股、实时数据等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/a36fa76838936130ac06bfebc7fc14d3.jpg)

## 1. 产品功能

- 按照分类返回的美股实时交易数据查询；
- 包含美股实时交易多项指标数据；
- 秒级查询性能；
- 一次请求返回所有分类下的美股实时交易数据；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡；

## 2. API 文档

**接口地址:** https://api.gugudata.com/stock/us/famous

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/stock/us/famous?appkey=REDACTED&type=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/usfamous](https://www.gugudata.com/preview/usfamous)

**接口测试:** [https://api.gugudata.com/stock/us/famous/demo](https://api.gugudata.com/stock/us/famous/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| type | string | 是 | YOUR_VALUE | 分类类型，可选值为：科技类\|金融类\|医药食品类\|媒体类\|汽车能源类\|制造零售类' |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Symbol | string | 美股股票代码 |
| Data.StockName | string | 股票名称 |
| Data.Latest | double | 最新价，单位：美元 |
| Data.ChangeAmount | double | 涨跌额，单位：美元 |
| Data.ChangePercent | double | 涨跌幅，单位：% |
| Data.Open | double | 开盘价，单位：美元 |
| Data.High | double | 最高，单位：美元 |
| Data.Low | double | 最低，单位：美元 |
| Data.PreClose | double | 昨收价，单位：美元 |
| Data.TotalMarketValue | double | 总市值，单位：美元 |
| Data.PERatio | double | 市盈率 |

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

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 美股分类实时行情数据 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
