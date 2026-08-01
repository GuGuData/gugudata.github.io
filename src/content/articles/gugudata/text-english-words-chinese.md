---
title: "英文单词中文释义查询 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/english-words-chinese"
section: "gugudata"
slug: "text-english-words-chinese"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-04-24T22:34:50.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/english-words-chinese"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/b1b8354411e3308af37bca0b56a1de49.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/english-words-chinese](https://www.gugudata.com/api/details/english-words-chinese)

英文单词中文释义查询 API 英文单词释义与扩展讲解，文本、英文字典等关键词场景常会用到，适合用于中文文本处理与内容清洗、搜索分词与语言分析与知识抽取与文本理解等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/b1b8354411e3308af37bca0b56a1de49.jpg)

## 1. 产品功能

- 覆盖 8000+ 常见英文词条；
- 支持单词与释义内容双字段模糊检索；
- 按英文单词去重后分页返回，结果更稳定；
- 提供例句、词根词缀、记忆方法等扩展信息；
- 围绕“英文单词中文释义查询”提供标准化能力，便于快速接入现有业务；
- 适合将“英文单词中文释义查询”结果接入业务系统、后台工具和自动化流程；
- 适合合同、票据、课件和归档文件的自动化处理；
- 可与 OCR、PDF 拆分和文档转换接口串联成处理流水线；

## 2. API 文档

**接口地址:** https://api.gugudata.com/text/english-words-chinese

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/text/english-words-chinese?appkey=REDACTED&keywords=computer&pageSize=10&pageNumber=1

**数据预览:** [https://www.gugudata.com/preview/english-words-chinese](https://www.gugudata.com/preview/english-words-chinese)

**接口测试:** [https://api.gugudata.com/text/english-words-chinese/demo](https://api.gugudata.com/text/english-words-chinese/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| keywords | string | 是 | computer | 关键词，支持对单词和释义内容模糊检索 |
| pageSize | int | 否 | 10 | 每页条数，取值范围 1~20 |
| pageNumber | int | 否 | 1 | 页码，从 1 开始 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 去重后的总数据量，一般用于分页计算 |
| DataStatus.RequestParameter | string | 请求参数，一般用于调试 |
| Data.Word | string | 匹配到的英文单词 |
| Data.Content | string | 单词对应的中文释义与扩展讲解内容 |

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

- 适合用于中文文本处理与内容清洗，快速补齐产品侧需要的 英文单词中文释义查询 数据能力。
- 适合用于搜索分词与语言分析，减少手工整理、清洗与重复开发成本。
- 适合用于知识抽取与文本理解，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[唐诗宋词大全](https://www.gugudata.com/api/details/chinesepoem)，适合补充同类场景的接口能力。
- 可搭配使用：[百万中国对联数据](https://www.gugudata.com/api/details/couplet)，适合补充同类场景的接口能力。
- 可搭配使用：[人工智能对联生成](https://www.gugudata.com/api/details/coupletai)，适合补充同类场景的接口能力。
