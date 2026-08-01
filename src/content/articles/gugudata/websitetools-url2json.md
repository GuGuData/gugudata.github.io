---
title: "语义化获取站点 JSON 结构内容 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/url2json"
section: "gugudata"
slug: "websitetools-url2json"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-04-24T22:34:50.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/url2json"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/d3cf1f3e1c15722ec9979528a11b1fa9.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/url2json](https://www.gugudata.com/api/details/url2json)

语义化获取站点 JSON 结构内容 API 网页内容 JSON 提取，语义化提取、JSON、网页解析等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/d3cf1f3e1c15722ec9979528a11b1fa9.jpg)

## 1. 产品功能

- 基于 AI 大模型智能理解网页内容，按需提取结构化数据；
- 支持自定义 Prompt 指令，灵活指定提取内容和格式；
- 自动解析动态网页，包括 JavaScript 渲染内容；
- 返回标准 JSON 格式，便于程序直接解析使用；
- 适用于商品信息、文章列表、表格数据等多种场景；
- 围绕“语义化获取站点 JSON 结构内容”提供标准化能力，便于快速接入现有业务；
- 适合将“语义化获取站点 JSON 结构内容”结果接入业务系统、后台工具和自动化流程；
- 适合 SEO 分析、竞品研究、内容归档和站点巡检场景；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/url2json

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/url2json?appkey=REDACTED&url=YOUR_VALUE&prompt=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/url2json](https://www.gugudata.com/preview/url2json)

**接口测试:** [https://api.gugudata.com/websitetools/url2json/demo](https://api.gugudata.com/websitetools/url2json/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，通过 URL 查询参数传递 |
| url | string | 是 | YOUR_VALUE | 需要提取数据的网页 URL 地址，必须是有效的 HTTP 或 HTTPS 链接 |
| prompt | string | 是 | YOUR_VALUE | AI 提取指令，描述需要从网页中提取什么数据，例如：获取所有产品信息、提取文章标题和摘要等 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码，100为成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般为1 |
| Data | object | AI 根据 Prompt 从网页提取的结构化 JSON 数据，具体结构取决于 Prompt 指令 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | URL 或 Prompt 参数为空或格式错误 |
| 102 | 请求频率受限 | 每秒请求不能超过 20 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | URL JSON 提取失败 | 网页无法访问、加载超时或 AI 提取服务异常 |

## 6. 适用场景

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 语义化获取站点 JSON 结构内容 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
