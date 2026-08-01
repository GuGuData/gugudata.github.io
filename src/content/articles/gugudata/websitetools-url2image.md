---
title: "URL 生成网站截图 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/url2image"
section: "gugudata"
slug: "websitetools-url2image"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/url2image"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/03029a2dcb23ee8dd84531c3b144caf0.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/url2image](https://www.gugudata.com/api/details/url2image)

URL 生成网站截图 API 高效生成网页截图，网站工具、截图等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/03029a2dcb23ee8dd84531c3b144caf0.png)

## 1. 产品功能

- 支持全页截图和视窗截图；
- 支持自定义截图尺寸；
- 兼容移动设备截图；
- 支持暗黑模式截图；
- 固定参数请求，可以得到最新的站点截图；
- 快速高效的截图生成；
- 围绕“URL 生成网站截图”提供标准化能力，便于快速接入现有业务；
- 适合将“URL 生成网站截图”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/url2image

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/url2image?appkey=REDACTED&url=YOUR_VALUE&width=250&height=250&viewportWidth=1080&viewportHeight=1080&forceReload=false&isMobile=false&isFullPage=false&isDarkMode=false

**数据预览:** [https://www.gugudata.com/preview/url2image](https://www.gugudata.com/preview/url2image)

**接口测试:** [https://api.gugudata.com/websitetools/url2image/demo](https://api.gugudata.com/websitetools/url2image/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| url | string | 是 | YOUR_VALUE | 需要截取的网页 URL 地址 |
| width | int | 否 | 250 | 输出截图的宽度，默认值为 250 |
| height | int | 否 | 250 | 输出截图的高度，默认值为 250 |
| viewportWidth | int | 否 | 1080 | 渲染视窗的宽度，默认值为 1080 |
| viewportHeight | int | 否 | 1080 | 渲染视窗的高度，默认值为 1080 |
| forceReload | boolean | 否 | false | 强制重新加载缓存的图片，默认值为 false |
| isMobile | boolean | 否 | false | 是否以移动设备的 User Agent 渲染，默认值为 false |
| isFullPage | boolean | 否 | false | 是否截取整个页面而非视窗裁剪，默认值为 false |
| isDarkMode | boolean | 否 | false | 是否优先采用深色模式，默认值为 false |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data | string | 生成的截图图片流，可直接用于展示 |

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

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 URL 生成网站截图 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
