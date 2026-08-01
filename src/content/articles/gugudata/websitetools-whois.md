---
title: "域名 Whois 查询 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/whois"
section: "gugudata"
slug: "websitetools-whois"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/whois"
cover: "https://static.gugudata.com/api_cover_websitetools_whois.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/whois](https://www.gugudata.com/api/details/whois)

域名 Whois 查询 API 域名注册档案与到期信息查询，网络工具等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_websitetools_whois.jpg)

## 1. 产品功能

- 支持按域名查询 Whois 注册信息；
- domain 只需传入域名本身，不需要包含 http 或 https；
- 返回字段采用 v2 响应格式，dataStatus 和 data 字段为小驼峰命名；
- 适合域名资产盘点、注册信息核查、过期时间提醒和安全风控等场景；
- 围绕“域名 Whois 查询”提供标准化能力，便于快速接入现有业务；
- 适合将“域名 Whois 查询”结果接入业务系统、后台工具和自动化流程；
- 适合 SEO 分析、竞品研究、内容归档和站点巡检场景；
- 可与网页截图、正文抽取、链接提取和域名检测接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v2/websitetools/whois

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v2/websitetools/whois?appkey=REDACTED&domain=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/whois](https://www.gugudata.com/preview/whois)

**接口测试:** [https://api.gugudata.com/v2/websitetools/whois/demo](https://api.gugudata.com/v2/websitetools/whois/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| domain | string | 是 | YOUR_VALUE | 需要查询的域名，不需要带 http 或 https 协议。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| dataStatus.requestParameter | string | 本次请求的参数摘要字符串。 |
| dataStatus.statusCode | int | 接口返回状态码。 |
| dataStatus.status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| dataStatus.statusDescription | string | 接口返回状态说明。 |
| dataStatus.responseDateTime | string | 接口数据返回时间。 |
| dataStatus.dataTotalCount | int | 此条件下的数据总量。 |
| data.domain_name | array | 域名名称。 |
| data.registrar | string | 注册商。 |
| data.creation_date | string | 域名创建时间。 |
| data.expiration_date | string | 域名过期时间。 |
| data.updated_date | array | 域名更新时间。 |
| data.name_servers | array | 域名服务器列表。 |
| data.status | array | 域名状态列表。 |
| data.emails | array | 公开联系邮箱列表。 |
| data.country | string | 注册国家或地区代码。 |
| data.state | string | 注册省份或州。 |
| data.city | string | 注册城市。 |
| data.org | string | 注册组织。 |
| data.dnssec | string | DNSSEC 状态。 |
| data.referral_url | string | 注册商参考链接。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 200 | 正常返回 | - |
| 400 | 参数错误 | - |
| 429 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 403 | 账号欠费 | 请及时关注订单到期短信提醒 |
| 402 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 500 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 域名 Whois 查询 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
