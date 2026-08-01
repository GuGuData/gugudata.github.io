---
title: "网页 URL 链接提取 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/url2links"
section: "gugudata"
slug: "websitetools-url2links"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/url2links"
cover: "https://static.gugudata.com/api-covers_url_to_links.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/url2links](https://www.gugudata.com/api/details/url2links)

网页 URL 链接提取 API 网页链接资产提取，网站工具、网页处理等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-covers_url_to_links.jpg)

## 1. 产品功能

- 支持从网页中提取链接列表；
- url 需传入完整 http 或 https 地址；
- 返回字符串数组，适合网页链接发现、站点巡检、内容采集和 SEO 链接分析等场景；
- 提取结果受页面渲染方式、访问权限和链接写法影响；
- 围绕“网页 URL 链接提取”提供标准化能力，便于快速接入现有业务；
- 适合将“网页 URL 链接提取”结果接入业务系统、后台工具和自动化流程；
- 适合 SEO 分析、竞品研究、内容归档和站点巡检场景；
- 可与网页截图、正文抽取、链接提取和域名检测接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/url2links

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/url2links?appkey=REDACTED&url=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/url2links](https://www.gugudata.com/preview/url2links)

**接口测试:** [https://api.gugudata.com/websitetools/url2links/demo](https://api.gugudata.com/websitetools/url2links/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| url | string | 是 | YOUR_VALUE | 需要提取链接的网页 URL，需包含 http 或 https 协议。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data | array | 网页中提取出的 URL 链接列表。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | URL 参数为空或格式错误 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | 网页无法访问或链接提取失败 |

## 6. 适用场景

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 网页 URL 链接提取 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
