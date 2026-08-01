---
title: "通用 PDF 文件流 OCR 到文本 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/pdf2text"
section: "gugudata"
slug: "imagerecognition-pdf2text"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/pdf2text"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/9bd9fe6492c81a642e6aef7f6cb5002a.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/pdf2text](https://www.gugudata.com/api/details/pdf2text)

通用 PDF 文件流 OCR 到文本 API 高可用图像识别引擎，文件处理、OCR、PDF等关键词场景常会用到，适合用于文档识别与格式转换、批量归档与自动化录入与PDF、图片与网页内容处理等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/9bd9fe6492c81a642e6aef7f6cb5002a.jpg)

## 1. 产品功能

- 通用识别接口；
- 支持中英文等多语言字符混合识别；
- formdata 格式 PDF 文件流传参；
- 基于机器学习不断提高的识别率；
- 输出纯文本内容，适合全文检索或语义分析；
- 围绕“通用 PDF 文件流 OCR 到文本”提供标准化能力，便于快速接入现有业务；
- 适合将“通用 PDF 文件流 OCR 到文本”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；

## 2. API 文档

**接口地址:** https://api.gugudata.com/imagerecognition/pdf2text?appkey=REDACTED

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/imagerecognition/pdf2text?appkey=REDACTED

**数据预览:** [https://www.gugudata.com/preview/pdf2text](https://www.gugudata.com/preview/pdf2text)

**接口测试:** [https://api.gugudata.com/imagerecognition/pdf2text/demo](https://api.gugudata.com/imagerecognition/pdf2text/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| pdffile | file | 是 | YOUR_FILE | formdata 文件流 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data | string | 识别提取后的文本内容 |

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

- 适合用于文档识别与格式转换，快速补齐产品侧需要的 通用 PDF 文件流 OCR 到文本 数据能力。
- 适合用于批量归档与自动化录入，减少手工整理、清洗与重复开发成本。
- 适合用于PDF、图片与网页内容处理，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf)，适合补充同类场景的接口能力。
- 可搭配使用：[HTML 转 Word](https://www.gugudata.com/api/details/html2word)，适合补充同类场景的接口能力。
- 可搭配使用：[通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr)，适合补充同类场景的接口能力。
