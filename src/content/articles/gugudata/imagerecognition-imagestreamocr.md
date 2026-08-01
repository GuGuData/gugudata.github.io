---
title: "通用图片文件流 OCR 到文本 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/imagestreamocr"
section: "gugudata"
slug: "imagerecognition-imagestreamocr"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/imagestreamocr"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/e359988ab3b6095949da3978a3ac68e7.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/imagestreamocr](https://www.gugudata.com/api/details/imagestreamocr)

通用图片文件流 OCR 到文本 API 图片文件流 OCR 文字识别，文件处理、OCR等关键词场景常会用到，适合用于文档识别与格式转换、批量归档与自动化录入与PDF、图片与网页内容处理等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/e359988ab3b6095949da3978a3ac68e7.jpg)

## 1. 产品功能

- 支持 multipart/form-data 图片文件流上传识别；
- imagefile 为图片文件字段，appKey 通过 query 参数传入；
- 返回文本行列表，适合票据、截图、证件、文档图片和普通图片文字抽取；
- 识别结果受图片清晰度、文字方向、遮挡和压缩质量影响；
- 围绕“通用图片文件流 OCR 到文本”提供标准化能力，便于快速接入现有业务；
- 适合将“通用图片文件流 OCR 到文本”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；

## 2. API 文档

**接口地址:** https://api.gugudata.com/imagerecognition/imagestreamocr?appkey=REDACTED

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/imagerecognition/imagestreamocr?appkey=REDACTED&appKey=REDACTED

**数据预览:** [https://www.gugudata.com/preview/imagestreamocr](https://www.gugudata.com/preview/imagestreamocr)

**接口测试:** [https://api.gugudata.com//imagerecognition/imagestreamocr/demo](https://api.gugudata.com//imagerecognition/imagestreamocr/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appKey | string | 是 | APPKEY | 付费后获取的 APPKEY，通过 query 参数传入。 |
| imagefile | file | 是 | YOUR_FILE | 通过 multipart/form-data 上传的图片文件字段，字段名为 imagefile。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.SourceImageUrl | string | 上传后用于处理的源图片地址。 |
| Data.ResultText | array | OCR 识别出的文本行列表。 |

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

- 适合用于文档识别与格式转换，快速补齐产品侧需要的 通用图片文件流 OCR 到文本 数据能力。
- 适合用于批量归档与自动化录入，减少手工整理、清洗与重复开发成本。
- 适合用于PDF、图片与网页内容处理，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf)，适合补充同类场景的接口能力。
- 可搭配使用：[HTML 转 Word](https://www.gugudata.com/api/details/html2word)，适合补充同类场景的接口能力。
- 可搭配使用：[Markdown 转 PDF](https://www.gugudata.com/api/details/markdown2pdf)，适合补充同类场景的接口能力。
