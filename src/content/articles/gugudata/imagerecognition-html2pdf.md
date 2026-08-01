---
title: "HTML/URL 转 PDF API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/html2pdf"
section: "gugudata"
slug: "imagerecognition-html2pdf"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/html2pdf"
cover: "https://static.gugudata.com/api_html2pdf.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/html2pdf](https://www.gugudata.com/api/details/html2pdf)

HTML/URL 转 PDF API 网页转 PDF，支持公开或私有存储，网络工具、文件处理、PDF等关键词场景常会用到，适合用于文档识别与格式转换、批量归档与自动化录入与PDF、图片与网页内容处理等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_html2pdf.jpg)

## 1. 产品功能

- 超高性能转换效率；
- 支持将传递的 HTML 转换为 PDF，支持转换 HTML 中的 CSS 格式；
- 支持传递网站 URL，直接转换页面成对应的 PDF 文件；
- 支持公开存储和私有存储，私有模式通过短期下载链接访问；
- 接口服务多节点部署；
- 围绕“HTML/URL 转 PDF”提供标准化能力，便于快速接入现有业务；
- 适合将“HTML/URL 转 PDF”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；

## 2. API 文档

**接口地址:** https://api.gugudata.com/imagerecognition/html2pdf

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/imagerecognition/html2pdf?appkey=REDACTED&type=YOUR_VALUE&content=YOUR_VALUE&landscape=0&showpages=0&filename=YOUR_VALUE&storage=public

**数据预览:** [https://www.gugudata.com/preview/html2pdf](https://www.gugudata.com/preview/html2pdf)

**接口测试:** [https://api.gugudata.com/imagerecognition/html2pdf/demo](https://api.gugudata.com/imagerecognition/html2pdf/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| type | string | 是 | YOUR_VALUE | 可选参数为 HTML 或 URL（注意，当类型为 URL 时，需要保证页面可以正常请求，我们的接口不解决加密页面、反爬虫页面等不能正常返回 HTML 的页面请求） |
| content | string | 是 | YOUR_VALUE | 内容正文，如果 type=HTML，那么传递 HTML 内容；如果 type=URL，那么传递需要存储为 PDF 的站点 URL 即可 |
| landscape | int | 否 | 0 | 控制生成 PDF 是否为横向页面模式，传递 1 控制页面横向渲染模式，默认为 0 |
| showpages | int | 否 | 0 | 控制生成的 PDF 是否在页脚包含页码信息，传递 1 控制页脚生成页码，默认为 0 |
| filename | string | 否 | YOUR_VALUE | 可选参数，控制生成的文件名称，不需要后缀 |
| storage | string | 否 | public | 文件存储方式，可选 public 或 private。默认 public 返回公开下载地址；private 存入私有存储，返回 file_id，需生成短期下载链接后下载。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data | string | 公开存储时返回文件下载地址；私有存储时返回文件引用，可用于生成短期下载链接。 |

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

- 适合用于文档识别与格式转换，快速补齐产品侧需要的 HTML/URL 转 PDF 数据能力。
- 适合用于批量归档与自动化录入，减少手工整理、清洗与重复开发成本。
- 适合用于PDF、图片与网页内容处理，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[HTML 转 Word](https://www.gugudata.com/api/details/html2word)，适合补充同类场景的接口能力。
- 可搭配使用：[通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr)，适合补充同类场景的接口能力。
- 可搭配使用：[Markdown 转 PDF](https://www.gugudata.com/api/details/markdown2pdf)，适合补充同类场景的接口能力。
