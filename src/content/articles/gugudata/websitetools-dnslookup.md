---
title: "域名 DNS 信息查询 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/dnslookup"
section: "gugudata"
slug: "websitetools-dnslookup"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/dnslookup"
cover: "https://static.gugudata.com/api_cover_dnslookup.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/dnslookup](https://www.gugudata.com/api/details/dnslookup)

域名 DNS 信息查询 API 多种记录类型数据返回，网络工具等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_dnslookup.jpg)

## 1. 产品功能

- 提供域名 DNS 解析完整记录；
- 丰富的解析记录类型，包括：A, AAAA, MX, TXT, NS, CNAME, SRV, PTR, SOA；
- 支持多种解析记录类型的查询；
- 毫秒级解析性能，支持高并发；
- 围绕“域名 DNS 信息查询”提供标准化能力，便于快速接入现有业务；
- 适合将“域名 DNS 信息查询”结果接入业务系统、后台工具和自动化流程；
- 适合 SEO 分析、竞品研究、内容归档和站点巡检场景；
- 可与网页截图、正文抽取、链接提取和域名检测接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v2/websitetools/dns-lookup

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v2/websitetools/dns-lookup?appkey=REDACTED&domain=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/dnslookup](https://www.gugudata.com/preview/dnslookup)

**接口测试:** [https://api.gugudata.com/v2/websitetools/dns-lookup/demo](https://api.gugudata.com/v2/websitetools/dns-lookup/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| domain | string | 是 | YOUR_VALUE | 需要解析的域名，格式为 gugudata.com |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| dataStatus.requestParameter | string | 请求的域名参数 |
| dataStatus.statusCode | integer | HTTP状态码 |
| dataStatus.status | string | 请求状态 |
| dataStatus.statusDescription | string | 请求状态的描述 |
| dataStatus.responseDateTime | string | 响应时间 |
| dataStatus.dataTotalCount | integer | 返回数据的总条数 |
| data.* | string | 解析记录类型，包括：A, AAAA, MX, TXT, NS, CNAME, SRV, PTR, SOA |
| data.*.domain | string | 解析的域名 |
| data.*.ttl | string | 解析记录的 TTL |
| data.*.class | string | 解析记录的类别 |
| data.*.type | string | 解析记录的类型 |
| data.*.value | string | 解析记录的值 |

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

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 域名 DNS 信息查询 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
