---
title: "通用图片地址 OCR 到文本 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/ocr"
section: "gugudata"
slug: "imagerecognition-ocr"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/ocr"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/c8693af72ab4804cf9b1ad652e43cc2e.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/ocr](https://www.gugudata.com/api/details/ocr)

通用图片地址 OCR 到文本 API 通用图像识别接口，文件处理、OCR等关键词场景常会用到，适合用于文档识别与格式转换、批量归档与自动化录入与PDF、图片与网页内容处理等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/c8693af72ab4804cf9b1ad652e43cc2e.jpg)

## 1. 产品功能

- 通用的识别接口， 支持多种图片格式；
- 支持中英文字符混合识别；
- 支持 Base64 以及网络地址传参；
- 基于机器学习不断提高的识别率；
- 围绕“通用图片地址 OCR 到文本”提供标准化能力，便于快速接入现有业务；
- 适合将“通用图片地址 OCR 到文本”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；

## 2. API 文档

**接口地址:** https://api.gugudata.com/imagerecognition/ocr

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/imagerecognition/ocr?appkey=REDACTED&imageurl=YOUR_VALUE&imagebase64=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/ocr](https://www.gugudata.com/preview/ocr)

**接口测试:** [https://api.gugudata.com/imagerecognition/ocr/demo](https://api.gugudata.com/imagerecognition/ocr/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| imageurl | string | 否 | YOUR_VALUE | 图片 URL 地址，与图标 Base64 编码选其一进行传参 |
| imagebase64 | string | 否 | YOUR_VALUE | 图片 Base64 编码，与图标 URL 地址选其一进行传参 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.SourceImageUrl | string | 原始图片 URL，如果是 Base64 格式则不返回 |
| Data.ResultText | string[] | 识别出的文本数组，识别后的每一行文字对应数组的每一个元素 |

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

- 适合用于文档识别与格式转换，快速补齐产品侧需要的 通用图片地址 OCR 到文本 数据能力。
- 适合用于批量归档与自动化录入，减少手工整理、清洗与重复开发成本。
- 适合用于PDF、图片与网页内容处理，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf)，适合补充同类场景的接口能力。
- 可搭配使用：[HTML 转 Word](https://www.gugudata.com/api/details/html2word)，适合补充同类场景的接口能力。
- 可搭配使用：[通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr)，适合补充同类场景的接口能力。
