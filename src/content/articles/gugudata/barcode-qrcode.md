---
title: "通用二维码生成 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/qrcode"
section: "gugudata"
slug: "barcode-qrcode"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/qrcode"
cover: "https://static.gugudata.com/api_qrcode.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/qrcode](https://www.gugudata.com/api/details/qrcode)

通用二维码生成 API 提供通用的二维码生成接口，网络工具、条码、二维码等关键词场景常会用到，适合用于条码或二维码生成与解析、资产、设备与物料标识与分享、支付或配网场景集成等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_qrcode.png)

## 1. 产品功能

- 支持分类字符生成；
- 直接返回存储在 CDN 中的二维码链接，可直接使用；
- 网址内容直接识别，生成网址类型的二维码，扫描后可直接跳转；
- 自定义二维码尺寸；
- 围绕“通用二维码生成”提供标准化能力，便于快速接入现有业务；
- 适合将“通用二维码生成”结果接入业务系统、后台工具和自动化流程；
- 适合线下物料、包装标签和业务凭证管理场景；
- 可用于营销活动、设备配网、资产标识和表单入口管理；

## 2. API 文档

**接口地址:** https://api.gugudata.com/barcode/qrcode

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/barcode/qrcode?appkey=REDACTED&content=YOUR_VALUE&size=500

**数据预览:** [https://www.gugudata.com/preview/qrcode](https://www.gugudata.com/preview/qrcode)

**接口测试:** [https://api.gugudata.com/barcode/qrcode/demo](https://api.gugudata.com/barcode/qrcode/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| content | string | 是 | YOUR_VALUE | 二维码内容，网址类型智能识别 |
| size | int | 否 | 500 | 正整数，二维码尺寸像素，默认为 500 像素 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Content | string | 二维码内容 |
| Data.Url | string | 生成的二维码 CDN URL 路径 |

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

- 适合用于条码或二维码生成与解析，快速补齐产品侧需要的 通用二维码生成 数据能力。
- 适合用于资产、设备与物料标识，减少手工整理、清洗与重复开发成本。
- 适合用于分享、支付或配网场景集成，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[通用条形码生成](https://www.gugudata.com/api/details/barcode)，适合补充同类场景的接口能力。
- 可搭配使用：[Wi-Fi 无线网二维码生成](https://www.gugudata.com/api/details/wifiqrcode)，适合补充同类场景的接口能力。
- 可搭配使用：[通用二维码解析读取](https://www.gugudata.com/api/details/qrcode-decode)，适合补充同类场景的接口能力。
