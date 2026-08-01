---
title: "简体繁体互转 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stconvert"
section: "gugudata"
slug: "text-stconvert"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stconvert"
cover: "https://static.gugudata.com/api_logo_s2t.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stconvert](https://www.gugudata.com/api/details/stconvert)

简体繁体互转 API 高精度高性能转换，文本处理等关键词场景常会用到，适合用于中文文本处理与内容清洗、搜索分词与语言分析与知识抽取与文本理解等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_logo_s2t.png)

## 1. 产品功能

- 毫秒级转换性能；
- 极速解析与返回；
- 支持两种繁体格式，适用多种转换场景；
- 围绕“简体繁体互转”提供标准化能力，便于快速接入现有业务；
- 适合将“简体繁体互转”结果接入业务系统、后台工具和自动化流程；
- 适合文本清洗、内容分析、搜索增强和自动化处理场景；
- 可与摘要、纠错、分词、实体识别和语义分析接口组合；
- 支持将文本处理结果接入编辑器、客服系统和知识库；

## 2. API 文档

**接口地址:** https://api.gugudata.com/text/stconvert

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/text/stconvert?appkey=REDACTED&content=YOUR_VALUE&from=YOUR_VALUE&to=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/stconvert](https://www.gugudata.com/preview/stconvert)

**接口测试:** [https://api.gugudata.com/text/stconvert/demo](https://api.gugudata.com/text/stconvert/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| content | string | 是 | YOUR_VALUE | 待转换的内容，包含特殊字符的话，需要进行 UrlEncode 编码 |
| from | string | 是 | YOUR_VALUE | s\|t\|thk\|ttw，原始的内容类型，s: 简体 t: 繁体 thk: 香港繁体 ttw: 台湾繁体 |
| to | string | 是 | YOUR_VALUE | s\|t\|thk\|ttw，转换的目标类型，s: 简体 t: 繁体 thk: 香港繁体 ttw: 台湾繁体 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.ConvertedContent | string | 转换后的内容 |

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

- 适合用于中文文本处理与内容清洗，快速补齐产品侧需要的 简体繁体互转 数据能力。
- 适合用于搜索分词与语言分析，减少手工整理、清洗与重复开发成本。
- 适合用于知识抽取与文本理解，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[唐诗宋词大全](https://www.gugudata.com/api/details/chinesepoem)，适合补充同类场景的接口能力。
- 可搭配使用：[百万中国对联数据](https://www.gugudata.com/api/details/couplet)，适合补充同类场景的接口能力。
- 可搭配使用：[人工智能对联生成](https://www.gugudata.com/api/details/coupletai)，适合补充同类场景的接口能力。
