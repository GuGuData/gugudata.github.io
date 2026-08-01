---
title: "网页 URL 转 Markdown API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/url2markdown"
section: "gugudata"
slug: "imagerecognition-url2markdown"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/url2markdown"
cover: "https://static.gugudata.com/api-covers_url_to_markdown.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/url2markdown](https://www.gugudata.com/api/details/url2markdown)

网页 URL 转 Markdown API 网页转 Markdown 文本，网站工具、markdown等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-covers_url_to_markdown.jpg)

## 1. 产品功能

- 支持任意网页 URL 转换为 Markdown 格式（注意：无法处理具有反爬机制或不合规的网页）；
- 智能提取网页主要内容，过滤无关元素；
- 保持原有文本结构和格式；
- 支持图片、链接等元素的 Markdown 转换；
- 围绕“网页 URL 转 Markdown”提供标准化能力，便于快速接入现有业务；
- 适合将“网页 URL 转 Markdown”结果接入业务系统、后台工具和自动化流程；
- 适合 SEO 分析、竞品研究、内容归档和站点巡检场景；
- 可与网页截图、正文抽取、链接提取和域名检测接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/url2markdown

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/url2markdown?appkey=REDACTED&url=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/url2markdown](https://www.gugudata.com/preview/url2markdown)

**接口测试:** [https://api.gugudata.com/websitetools/url2markdown/demo](https://api.gugudata.com/websitetools/url2markdown/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| url | string | 是 | YOUR_VALUE | 需要转换的网页 URL 地址，必须是有效的 HTTP 或 HTTPS 链接 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data | string | 网页转换后的 Markdown 格式内容 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | URL 参数为空或格式错误 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | 网页无法访问或转换失败 |

## 6. 适用场景

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 网页 URL 转 Markdown 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
