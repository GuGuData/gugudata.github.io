---
title: "URL 转静态 HTML 文件 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/url2html"
section: "gugudata"
slug: "websitetools-url2html"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/url2html"
cover: "https://static.gugudata.com/api_covers_url_to_pdf.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/url2html](https://www.gugudata.com/api/details/url2html)

URL 转静态 HTML 文件 API 网页 URL 静态化归档，网站工具、HTML等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_covers_url_to_pdf.png)

## 1. 产品功能

- 支持将网页 URL 转换为静态 HTML 文件；
- appkey 和 url 通过 JSON 请求体传入；
- 返回生成后的 HTML 文件地址，便于归档、下载、离线阅读或后续处理；
- 转换效果受目标网页访问权限、脚本渲染和访问限制影响；
- 围绕“URL 转静态 HTML 文件”提供标准化能力，便于快速接入现有业务；
- 适合将“URL 转静态 HTML 文件”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/url2html

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/url2html?appkey=REDACTED&url=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/url2html](https://www.gugudata.com/preview/url2html)

**接口测试:** [https://api.gugudata.com/websitetools/url2html/demo](https://api.gugudata.com/websitetools/url2html/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，在 JSON 请求体中传入。 |
| url | string | 是 | YOUR_VALUE | 需要转换的网页 URL，需包含 http 或 https 协议。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data | string | 生成后的静态 HTML 文件访问地址。 |

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

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 URL 转静态 HTML 文件 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
