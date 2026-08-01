---
title: "网页可读内容抽取 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/readability"
section: "gugudata"
slug: "websitetools-readability"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/readability"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/36ebc6f4915b5130c6507a8a118d8d5b.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/readability](https://www.gugudata.com/api/details/readability)

网页可读内容抽取 API 网页正文智能抽取与结构化，网络工具、文本处理等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/36ebc6f4915b5130c6507a8a118d8d5b.png)

## 1. 产品功能

- 支持从 URL 或 HTML 中抽取网页主体可读内容；
- url 与 html 至少传入一个，传入 html 时可减少外部网页访问的不确定性；
- 返回正文 HTML、纯文本、摘要、标题、站点名和发布时间等字段；
- 适合网页正文抓取、内容清洗、摘要生成前处理和知识库入库等场景；
- 围绕“网页可读内容抽取”提供标准化能力，便于快速接入现有业务；
- 适合将“网页可读内容抽取”结果接入业务系统、后台工具和自动化流程；
- 适合 SEO 分析、竞品研究、内容归档和站点巡检场景；
- 可与网页截图、正文抽取、链接提取和域名检测接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/readability

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/readability?appkey=REDACTED&url=YOUR_VALUE&html=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/readability](https://www.gugudata.com/preview/readability)

**接口测试:** [https://api.gugudata.com/websitetools/readability/demo](https://api.gugudata.com/websitetools/readability/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，在 JSON 请求体中传入。 |
| url | string | 否 | YOUR_VALUE | 待抽取的网页 URL；url 与 html 至少传入一个。 |
| html | string | 否 | YOUR_VALUE | 待抽取的 HTML 原文；url 与 html 至少传入一个。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.Title | string | 网页标题。 |
| Data.Byline | string | 作者或署名信息。 |
| Data.Dir | string | 文本方向。 |
| Data.Lang | string | 网页语言。 |
| Data.Content | string | 抽取后的正文 HTML。 |
| Data.TextContent | string | 抽取后的纯文本正文。 |
| Data.Length | int | 纯文本正文长度。 |
| Data.Excerpt | string | 正文摘要。 |
| Data.SiteName | string | 站点名称。 |
| Data.PublishedTime | string | 发布时间。 |

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

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 网页可读内容抽取 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
