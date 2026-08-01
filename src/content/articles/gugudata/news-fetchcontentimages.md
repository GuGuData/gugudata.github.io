---
title: "获取任意链接正文图片 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/fetchcontentimages"
section: "gugudata"
slug: "news-fetchcontentimages"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/fetchcontentimages"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/e1094e0ba6c0745515f2937c23d0c928.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/fetchcontentimages](https://www.gugudata.com/api/details/fetchcontentimages)

获取任意链接正文图片 API 智能分析链接正文中的图片集合，网络工具、文本处理等关键词场景常会用到，适合用于资讯抓取与内容聚合、舆情监控与内容分析与搜索索引与知识库构建等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/e1094e0ba6c0745515f2937c23d0c928.jpg)

## 1. 产品功能

- 根据提供的文章链接智能分析出文章正文中包含的图片列表；
- 支持传递图片大小以及图片分辨率条件对返回图片列表进行筛选；
- 接口可同时返回原始 HTML 内容，供您二次解析使用；
- 图片解析与标签处理基于机器学习；
- 围绕“获取任意链接正文图片”提供标准化能力，便于快速接入现有业务；
- 适合将“获取任意链接正文图片”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；

## 2. API 文档

**接口地址:** https://api.gugudata.com/news/fetchcontentimages

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/news/fetchcontentimages?appkey=REDACTED&url=YOUR_VALUE&limittype=YOUR_VALUE&limitvalue=YOUR_VALUE&imagewithtag=false&htmlsourcecontent=false

**数据预览:** [https://www.gugudata.com/preview/fetchcontentimages](https://www.gugudata.com/preview/fetchcontentimages)

**接口测试:** [https://api.gugudata.com/news/fetchcontentimages/demo](https://api.gugudata.com/news/fetchcontentimages/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| url | string | 是 | YOUR_VALUE | 需要抓取正文的文章链接 |
| limittype | string | 否 | YOUR_VALUE | 对图片大小进行筛选条件类型，参数值为 size 或 ratio。size：按照图片大小 (KB) 进行筛选，ratio：按照图片分辨率 [宽,高] 进行筛选 |
| limitvalue | float / [int,int] | 否 | YOUR_VALUE | 对图片大小进行筛选条件值，如果类型为 size，参数值格式为 float 类型的图片最小限制值（单位为 KB），如果类型为 ratio，参数值格式为 int 数组 [宽,高]，分别限制最小宽与高（单位为像素） |
| imagewithtag | boolean | 否 | false | 是否返回获取到的图片原始 img HTML 标签 |
| htmlsourcecontent | boolean | 否 | false | 是否返回文章页面原始 HTML 内容，供您二次解析或分析正文图片列表失败时使用，需要注意接口的性能问题 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 符合条件的图片集合数量 |
| Data.Url | string | 文章 Url |
| Data.ImagesUrl | string[] | 文章正文中符合筛选条件的图片 Url 集合 |
| Data.ImagesTag | string[] | 当传递 imagewithtag 参数值为 true 时，返回获取到的图片原始 img HTML 标签 |
| Data.HTMLSourceContent | string | 文章的原始 HTML 内容（HTML 标签为 Unicode 编码） |

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

- 适合用于资讯抓取与内容聚合，快速补齐产品侧需要的 获取任意链接正文图片 数据能力。
- 适合用于舆情监控与内容分析，减少手工整理、清洗与重复开发成本。
- 适合用于搜索索引与知识库构建，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent)，适合补充同类场景的接口能力。
- 可搭配使用：[幽默笑话大全](https://www.gugudata.com/api/details/joke)，适合补充同类场景的接口能力。
- 可搭配使用：[软件开发技术博文头条](https://www.gugudata.com/api/details/techblogs)，适合补充同类场景的接口能力。
