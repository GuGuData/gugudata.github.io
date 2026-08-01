---
title: "Word 转 HTML API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/word-to-html"
section: "gugudata"
slug: "websitetools-word-to-html"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/word-to-html"
cover: "https://static.gugudata.com/api_word_to_html.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/word-to-html](https://www.gugudata.com/api/details/word-to-html)

Word 转 HTML API Word 转 HTML 文件，文件转换、Word等关键词场景常会用到，适合用于文档识别与格式转换、批量归档与自动化录入与PDF、图片与网页内容处理等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_word_to_html.jpg)

## 1. 产品功能

- 超高精度与还原度的 HTML 文件转换；
- 支持将 Word 文档转换为 HTML 格式；
- 支持 .doc 和 .docx 格式；
- 保持原始 Word 文档的布局、字体和样式；
- 支持公开存储和私有存储，私有模式通过短期下载链接访问；
- 提供 HTML 文件引用和内容；
- 接口服务多节点部署；
- 围绕“Word 转 HTML”提供标准化能力，便于快速接入现有业务；

## 2. API 文档

**接口地址:** https://api.gugudata.com/imagerecognition/word-to-html?appkey=REDACTED

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/imagerecognition/word-to-html?appkey=REDACTED&storage=public

**数据预览:** [https://www.gugudata.com/preview/word-to-html](https://www.gugudata.com/preview/word-to-html)

**接口测试:** [https://api.gugudata.com/imagerecognition/word-to-html/demo](https://api.gugudata.com/imagerecognition/word-to-html/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| file | file | 是 | YOUR_FILE | Word 文档文件，支持 .doc 和 .docx 格式 |
| storage | string | 否 | public | 文件存储方式，可选 public 或 private。默认 public 返回公开下载地址；private 存入私有存储，返回 file_id，需生成短期下载链接后下载。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 请求参数字符串 |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| Data.html_url | string | 公开存储时返回 HTML 文件下载地址；私有存储时返回 HTML 文件引用，可用于生成短期下载链接。 |
| Data.html_content | string | 转换后的 HTML 内容 |

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

- 适合用于文档识别与格式转换，快速补齐产品侧需要的 Word 转 HTML 数据能力。
- 适合用于批量归档与自动化录入，减少手工整理、清洗与重复开发成本。
- 适合用于PDF、图片与网页内容处理，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf)，适合补充同类场景的接口能力。
- 可搭配使用：[HTML 转 Word](https://www.gugudata.com/api/details/html2word)，适合补充同类场景的接口能力。
- 可搭配使用：[通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr)，适合补充同类场景的接口能力。
