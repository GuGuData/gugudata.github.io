---
title: "通用条形码生成 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/barcode"
section: "gugudata"
slug: "barcode-barcode"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/barcode"
cover: "https://static.gugudata.com/api_barcode.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/barcode](https://www.gugudata.com/api/details/barcode)

通用条形码生成 API 通用条形码生成接口，网络工具、条码、条形码等关键词场景常会用到，适合用于条码或二维码生成与解析、资产、设备与物料标识与分享、支付或配网场景集成等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_barcode.png)

## 1. 产品功能

- 支持 40 种条形码；
- 支持生成自定义的条码尺寸；
- 直接生成条码图片 CDN 链接，方便引用；
- 围绕“通用条形码生成”提供标准化能力，便于快速接入现有业务；
- 适合将“通用条形码生成”结果接入业务系统、后台工具和自动化流程；
- 适合线下物料、包装标签和业务凭证管理场景；
- 可用于营销活动、设备配网、资产标识和表单入口管理；
- 支持将生成或解析结果接入网页、管理后台和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/barcode/barcode

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/barcode/barcode?appkey=REDACTED&type=YOUR_VALUE&content=YOUR_VALUE&width=YOUR_VALUE&height=YOUR_VALUE&showLabel=false

**数据预览:** [https://www.gugudata.com/preview/barcode](https://www.gugudata.com/preview/barcode)

**接口测试:** [https://api.gugudata.com/barcode/barcode/demo](https://api.gugudata.com/barcode/barcode/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| type | string | 是 | YOUR_VALUE | 条码类型，可选项: UNSPECIFIED\|UPCA\|UPCE\|UPC_SUPPLEMENTAL_2DIGIT\|UPC_SUPPLEMENTAL_5DIGIT\|EAN13\|EAN8\|Interleaved2of5\|Interleaved2of5_Mod10\|Standard2of5\|Standard2of5_Mod10\|Industrial2of5\|Industrial2of5_Mod10\|CODE39\|CODE39Extended\|CODE39_Mod43\|Codabar\|PostNet\|BOOKLAND\|ISBN\|JAN13\|MSI_Mod10\|MSI_2Mod10\|MSI_Mod11\|MSI_Mod11_Mod10\|Modified_Plessey\|CODE11\|USD8\|UCC12\|UCC13\|LOGMARS\|CODE128\|CODE128A\|CODE128B\|CODE128C\|ITF14\|CODE93\|TELEPEN\|FIM\|PHARMACODE |
| content | string | 是 | YOUR_VALUE | 条码内容，注意对应条码的长度规范 |
| width | int | 是 | YOUR_VALUE | 条码宽度像素值 |
| height | int | 是 | YOUR_VALUE | 条码高度像素值 |
| showLabel | boolean | 否 | false | 控制是否显示条码底部的文字标签，默认不显示，需要显示传递 true |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Content | string | 条形码类型:条形码内容 |
| Data.Url | string | 生成的条形码 CDN URL 路径 |

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

- 适合用于条码或二维码生成与解析，快速补齐产品侧需要的 通用条形码生成 数据能力。
- 适合用于资产、设备与物料标识，减少手工整理、清洗与重复开发成本。
- 适合用于分享、支付或配网场景集成，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[通用二维码生成](https://www.gugudata.com/api/details/qrcode)，适合补充同类场景的接口能力。
- 可搭配使用：[Wi-Fi 无线网二维码生成](https://www.gugudata.com/api/details/wifiqrcode)，适合补充同类场景的接口能力。
- 可搭配使用：[通用二维码解析读取](https://www.gugudata.com/api/details/qrcode-decode)，适合补充同类场景的接口能力。
