---
title: "Markdown 转 PDF API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/markdown2pdf"
section: "gugudata"
slug: "imagerecognition-markdown2pdf"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/markdown2pdf"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/1d063e3ef2744206a50083a3cc9deaee.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/markdown2pdf](https://www.gugudata.com/api/details/markdown2pdf)

Markdown 转 PDF API Markdown 转 PDF 文件，文件处理、PDF等关键词场景常会用到，适合用于文档识别与格式转换、批量归档与自动化录入与PDF、图片与网页内容处理等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/1d063e3ef2744206a50083a3cc9deaee.png)

## 1. 产品功能

- 超高性能转换效率；
- 支持将传递的 Markdown 转换为 PDF；
- 支持公开存储和私有存储，私有模式通过短期下载链接访问；
- 接口服务多节点部署；
- 围绕“Markdown 转 PDF”提供标准化能力，便于快速接入现有业务；
- 适合将“Markdown 转 PDF”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；

## 2. API 文档

**接口地址:** https://api.gugudata.com/imagerecognition/markdown2pdf

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/imagerecognition/markdown2pdf?appkey=REDACTED&content=YOUR_VALUE&storage=public

**数据预览:** [https://www.gugudata.com/preview/markdown2pdf](https://www.gugudata.com/preview/markdown2pdf)

**接口测试:** [https://api.gugudata.com/imagerecognition/markdown2pdf/demo](https://api.gugudata.com/imagerecognition/markdown2pdf/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| content | string | 是 | YOUR_VALUE | Markdown 内容 |
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

- 适合用于文档识别与格式转换，快速补齐产品侧需要的 Markdown 转 PDF 数据能力。
- 适合用于批量归档与自动化录入，减少手工整理、清洗与重复开发成本。
- 适合用于PDF、图片与网页内容处理，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf)，适合补充同类场景的接口能力。
- 可搭配使用：[HTML 转 Word](https://www.gugudata.com/api/details/html2word)，适合补充同类场景的接口能力。
- 可搭配使用：[通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr)，适合补充同类场景的接口能力。
