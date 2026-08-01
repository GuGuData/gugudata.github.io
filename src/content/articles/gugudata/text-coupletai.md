---
title: "人工智能对联生成 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/coupletai"
section: "gugudata"
slug: "text-coupletai"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/coupletai"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/b3479d097737fe25dcd5e35f117f8ea9.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/coupletai](https://www.gugudata.com/api/details/coupletai)

人工智能对联生成 API 基于百万数据训练，文本处理、NLP、人工智能等关键词场景常会用到，适合用于中文文本处理与内容清洗、搜索分词与语言分析与知识抽取与文本理解等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/b3479d097737fe25dcd5e35f117f8ea9.jpg)

## 1. 产品功能

- AI 基于百万历史对联数据训练应答模型；
- 机器学习持续训练学习；
- 一个上联可返回多个下联应答；
- 毫秒级响应性能；
- 围绕“人工智能对联生成”提供标准化能力，便于快速接入现有业务；
- 适合将“人工智能对联生成”结果接入业务系统、后台工具和自动化流程；
- 适合文本清洗、内容分析、搜索增强和自动化处理场景；
- 可与摘要、纠错、分词、实体识别和语义分析接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/text/coupletai

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/text/coupletai?appkey=REDACTED&firstpair=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/coupletai](https://www.gugudata.com/preview/coupletai)

**接口测试:** [https://api.gugudata.com/text/coupletai/demo](https://api.gugudata.com/text/coupletai/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| firstpair | string | 是 | YOUR_VALUE | 对联上联文本 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| DataStatus.RequestParameter | string | 请求参数，一般用于调试 |
| Data | string | 下联文本，多次请求会随机应答多个下联 |

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

- 适合用于中文文本处理与内容清洗，快速补齐产品侧需要的 人工智能对联生成 数据能力。
- 适合用于搜索分词与语言分析，减少手工整理、清洗与重复开发成本。
- 适合用于知识抽取与文本理解，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[唐诗宋词大全](https://www.gugudata.com/api/details/chinesepoem)，适合补充同类场景的接口能力。
- 可搭配使用：[百万中国对联数据](https://www.gugudata.com/api/details/couplet)，适合补充同类场景的接口能力。
- 可搭配使用：[NLP 中英文排版规范化](https://www.gugudata.com/api/details/formatarticle)，适合补充同类场景的接口能力。
