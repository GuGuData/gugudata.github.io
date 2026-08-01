---
title: "图片压缩与尺寸优化 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/image-compress"
section: "gugudata"
slug: "ai-image-compress"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-01-17T16:11:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/image-compress"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/080a67eb48829fc1a219ba45fef334f8.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/image-compress](https://www.gugudata.com/api/details/image-compress)

图片压缩与尺寸优化 API 图片压缩优化，保持长宽比，保证清晰度，图片压缩、图片处理等关键词场景常会用到，适合用于文档识别与格式转换、批量归档与自动化录入与PDF、图片与网页内容处理等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/080a67eb48829fc1a219ba45fef334f8.png)

## 1. 产品功能

- 支持本地上传图片或网络图片 URL，一键完成压缩；
- 自动保持图片长宽比，可按目标尺寸或最大尺寸进行等比缩放；
- 针对 JPEG 采用优化压缩（渐进式、优化 Huffman 表等），在保证清晰度的前提下显著减小体积；
- 支持 PNG 等无损格式的体积优化压缩；
- 自动限制过大图片的尺寸（默认 1920 像素上限），避免带宽浪费；
- 围绕“图片压缩与尺寸优化”提供标准化能力，便于快速接入现有业务；
- 适合将“图片压缩与尺寸优化”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/image-compress

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/image-compress?appkey=REDACTED&image_url=YOUR_VALUE&targetWidth=YOUR_VALUE&targetHeight=YOUR_VALUE&maxWidth=YOUR_VALUE&maxHeight=YOUR_VALUE&quality=85&format=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/image-compress](https://www.gugudata.com/preview/image-compress)

**接口测试:** [https://api.gugudata.com/ai/image-compress/demo](https://api.gugudata.com/ai/image-compress/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，可通过 Query 参数或 Form 字段 appkey 传递 |
| image_file | file | 否 | YOUR_FILE | 上传的图片文件，支持 JPG / JPEG / PNG / GIF / WEBP / BMP，与 image_url 二选一必填 |
| image_url | string | 否 | YOUR_VALUE | 网络图片 URL，与 image_file 二选一必填，需为可直接访问的 HTTP/HTTPS 链接 |
| targetWidth | int | 否 | YOUR_VALUE | 目标宽度（像素），与 targetHeight 组合使用时按照最长边等比缩放；不传则不以此为约束 |
| targetHeight | int | 否 | YOUR_VALUE | 目标高度（像素），与 targetWidth 组合使用时按照最长边等比缩放；不传则不以此为约束 |
| maxWidth | int | 否 | YOUR_VALUE | 最大宽度（像素），只限制不超过该宽度并保持长宽比；当未显式传递任何尺寸参数且图片特别大时，服务会自动使用 1920 作为默认上限 |
| maxHeight | int | 否 | YOUR_VALUE | 最大高度（像素），只限制不超过该高度并保持长宽比；当未显式传递任何尺寸参数且图片特别大时，服务会自动使用 1920 作为默认上限 |
| quality | int | 否 | 85 | JPEG 压缩质量，取值范围 1-95，数值越低压缩越厉害，推荐在 60-90 之间；PNG 等无损格式将使用内部优化策略忽略该参数 |
| format | string | 否 | YOUR_VALUE | 输出图片格式，可选值：jpeg、png 等；不传则保持原图格式（对于部分不常见格式会自动转换为 JPEG） |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| HTTP Header.Content-Type | string | 返回图片的 MIME 类型，例如 image/jpeg、image/png 等 |
| HTTP Header.Content-Disposition | string | 文件下载头，包含建议的下载文件名，默认会根据原始文件名和格式自动生成 |
| Body(Binary) | file | 压缩后图片的二进制流内容，可直接保存为图片文件或在浏览器中显示 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | appkey 缺失，image_file 与 image_url 均为空，或 quality/尺寸参数不合法 |
| 102 | 请求频率受限 | 每秒请求不能超过平台限制 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 图片格式不支持或文件损坏 | Pillow 无法识别图片，或图片超过最大限制（当前为 10MB） |
| 111 | 图片下载失败 | 当通过 image_url 下载图片失败或超时时返回 |
| 112 | 服务内部错误 | 压缩过程中发生未预期异常 |

## 6. 适用场景

- 适合用于文档识别与格式转换，快速补齐产品侧需要的 图片压缩与尺寸优化 数据能力。
- 适合用于批量归档与自动化录入，减少手工整理、清洗与重复开发成本。
- 适合用于PDF、图片与网页内容处理，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[HTML/URL 转 PDF](https://www.gugudata.com/api/details/html2pdf)，适合补充同类场景的接口能力。
- 可搭配使用：[HTML 转 Word](https://www.gugudata.com/api/details/html2word)，适合补充同类场景的接口能力。
- 可搭配使用：[通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr)，适合补充同类场景的接口能力。
