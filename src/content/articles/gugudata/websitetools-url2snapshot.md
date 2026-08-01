---
title: "网站截图与 HTML 快照 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/url2snapshot"
section: "gugudata"
slug: "websitetools-url2snapshot"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/url2snapshot"
cover: "https://static.gugudata.com/api-covers_url_to_snapshot.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/url2snapshot](https://www.gugudata.com/api/details/url2snapshot)

网站截图与 HTML 快照 API 通过网页 URL 获取站点截图与内容，网站工具、截图等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-covers_url_to_snapshot.png)

## 1. 产品功能

- 支持任意网页 URL 高质量截图，包括动态内容和 JavaScript 渲染页面；
- 支持全页面截图和可视区域截图两种模式；
- 可自定义截图尺寸、设备像素比等参数；
- 支持桌面端和移动端设备模拟；
- 同时返回截图图片和网页文本内容；
- 支持 base64 编码和 CDN URL 两种返回格式；
- 围绕“网站截图与 HTML 快照”提供标准化能力，便于快速接入现有业务；
- 适合将“网站截图与 HTML 快照”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/url2snapshot?appkey=REDACTED

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/url2snapshot?appkey=REDACTED&url=YOUR_VALUE&responseFormat=base64&fullPage=true&width=1920&height=1080&deviceScaleFactor=1&userAgent=YOUR_VALUE&isMobile=false

**数据预览:** [https://www.gugudata.com/preview/url2snapshot](https://www.gugudata.com/preview/url2snapshot)

**接口测试:** [https://api.gugudata.com/websitetools/url2snapshot/demo](https://api.gugudata.com/websitetools/url2snapshot/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| url | string | 是 | YOUR_VALUE | 需要截图的网页 URL 地址，必须是有效的 HTTP 或 HTTPS 链接 |
| responseFormat | string | 否 | base64 | 返回格式，可选值：base64（返回 base64 编码的图片数据）、url（返回图片 URL 链接） |
| fullPage | boolean | 否 | true | 是否截取完整页面，true 为全页面截图，false 为可视区域截图 |
| width | int | 否 | 1920 | 截图宽度，单位像素，范围：320-3840 |
| height | int | 否 | 1080 | 截图高度，单位像素，范围：240-2160 |
| deviceScaleFactor | float | 否 | 1 | 设备像素比，影响截图清晰度，范围：1-3 |
| userAgent | string | 否 | YOUR_VALUE | 用户代理字符串，用于模拟不同的浏览器 |
| isMobile | boolean | 否 | false | 是否模拟移动设备，true 为移动设备模式，false 为桌面模式 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码，100 为成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般为1 |
| Data.Image | string | 截图图片，当responseFormat为base64时返回base64编码的图片数据，为url时返回图片链接 |
| Data.Content | string | 网页文本内容，提取的网页主要文本信息 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | URL 参数为空或格式错误 |
| 102 | 请求频率受限 | 每秒请求不能超过 50 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 网页截图失败 | 网页无法访问、加载超时或截图服务异常 |
| 111 | 图片上传失败 | 当responseFormat为url时，图片上传到CDN失败 |

## 6. 适用场景

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 网站截图与 HTML 快照 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
