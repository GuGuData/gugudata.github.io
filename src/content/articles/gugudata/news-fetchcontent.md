---
title: "获取任意链接文章正文 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fetchcontent"
section: "gugudata"
slug: "news-fetchcontent"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fetchcontent"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/7a9dc144dfee5f83c800d2391ce6db54.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fetchcontent](https://www.gugudata.com/api/details/fetchcontent)

获取任意链接文章正文 API 智能分析抓取链接中的正文部分，网络工具、文本处理等关键词场景常会用到，适合用于资讯抓取与内容聚合、舆情监控与内容分析与搜索索引与知识库构建等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/7a9dc144dfee5f83c800d2391ce6db54.jpg)

## 1. 产品功能

- 根据提供的文章链接智能分析出文章正文；
- 返回正文提供了纯文本和包含 HTML 标签两个模式；
- 接口可同时返回原始 HTML 内容，供您二次解析使用；
- 数据抓取与文章标签处理基于机器学习；
- 围绕“获取任意链接文章正文”提供标准化能力，便于快速接入现有业务；
- 适合将“获取任意链接文章正文”结果接入业务系统、后台工具和自动化流程；
- 适合资讯聚合、内容归档和运营素材整理场景；
- 支持将文章、图片或封面结果接入内容管理系统；

## 2. API 文档

**接口地址:** https://api.gugudata.com/news/fetchcontent

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/news/fetchcontent?appkey=REDACTED&url=YOUR_VALUE&contentwithhtml=false&htmlsourcecontent=false

**数据预览:** [https://www.gugudata.com/preview/fetchcontent](https://www.gugudata.com/preview/fetchcontent)

**接口测试:** [https://api.gugudata.com/news/fetchcontent/demo](https://api.gugudata.com/news/fetchcontent/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| url | string | 是 | YOUR_VALUE | 需要抓取正文的文章链接 |
| contentwithhtml | boolean | 否 | false | 返回的文章是否包含 HTML 标签 |
| htmlsourcecontent | boolean | 否 | false | 是否返回文章页面原始 HTML 内容，供您二次解析或分析正文失败时使用，需要注意接口的性能问题 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，此接口返回 1 |
| Data.Url | string | 文章 Url |
| Data.Title | string | 文章标题 |
| Data.Content | string | 智能分析出的文章正文部分（包含 HTML 标签时，标签为 Unicode 编码） |
| Data.HTMLSourceContent | string | 文章的原始 HTML 内容（HTML 标签为 Unicode 编码） |
| Data.PublishDate | string | 文章发表时间 |

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

- 适合用于资讯抓取与内容聚合，快速补齐产品侧需要的 获取任意链接文章正文 数据能力。
- 适合用于舆情监控与内容分析，减少手工整理、清洗与重复开发成本。
- 适合用于搜索索引与知识库构建，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[获取任意链接正文图片](https://www.gugudata.com/api/details/fetchcontentimages)，适合补充同类场景的接口能力。
- 可搭配使用：[幽默笑话大全](https://www.gugudata.com/api/details/joke)，适合补充同类场景的接口能力。
- 可搭配使用：[软件开发技术博文头条](https://www.gugudata.com/api/details/techblogs)，适合补充同类场景的接口能力。
