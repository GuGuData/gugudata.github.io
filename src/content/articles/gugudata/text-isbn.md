---
title: "国际标准书号 ISBN API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/isbn"
section: "gugudata"
slug: "text-isbn"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/isbn"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/dfcff940602067a37935a3179b1a1598.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/isbn](https://www.gugudata.com/api/details/isbn)

国际标准书号 ISBN API 图书 ISBN 资料与出版信息查询，基础数据等关键词场景常会用到，适合用于中文文本处理与内容清洗、搜索分词与语言分析与知识抽取与文本理解等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/dfcff940602067a37935a3179b1a1598.jpg)

## 1. 产品功能

- 最全百万级图书 ISBN 信息查询；
- 返回详细图书基础信息；
- 永久提供图书封面图片存储；
- 数据秒级返回；
- 数据持续更新与维护；
- 围绕“国际标准书号 ISBN”提供标准化能力，便于快速接入现有业务；
- 适合将“国际标准书号 ISBN”结果接入业务系统、后台工具和自动化流程；
- 适合文本清洗、内容分析、搜索增强和自动化处理场景；

## 2. API 文档

**接口地址:** https://api.gugudata.com/text/isbn

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/text/isbn?appkey=REDACTED&isbn=YOUR_VALUE&keywords=YOUR_VALUE&pageindex=1&pagesize=10

**数据预览:** [https://www.gugudata.com/preview/isbn](https://www.gugudata.com/preview/isbn)

**接口测试:** [https://api.gugudata.com/text/isbn/demo](https://api.gugudata.com/text/isbn/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| isbn | string | 否 | YOUR_VALUE | 图书 ISBN；与 keywords 参数至少传递一个，如 9787020002320 |
| keywords | string | 否 | YOUR_VALUE | 图书标题搜索关键字；与 isbn 参数至少传递一个 |
| pageindex | int | 否 | 1 | 搜索结果分页参数，第几页 |
| pagesize | int | 否 | 10 | 搜索结果分页参数，每页条数，最大值为 10 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| Data.Title | string | 图书名称 |
| Data.CoverImage | string | 图书封面图片永久地址 |
| Data.ISBN | string | ISBN |
| Data.Author | string | 作者 |
| Data.Translator | string | 译者，没有译者时返回空字符串 |
| Data.Publisher | string | 出版商 |
| Data.PublisherDateTime | string | 出版年月，格式 2022-3 |
| Data.PageNumber | int | 图书总页码 |
| Data.Binding | string | 图书包装类型，如平装、精装 |
| Data.BriefIntroduction | string | 图书简介 |
| Data.AuthorIntroduction | string | 作者简介 |
| Data.Price | float | 图书定价，单位：元，仅供参考 |

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

- 适合用于中文文本处理与内容清洗，快速补齐产品侧需要的 国际标准书号 ISBN 数据能力。
- 适合用于搜索分词与语言分析，减少手工整理、清洗与重复开发成本。
- 适合用于知识抽取与文本理解，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[唐诗宋词大全](https://www.gugudata.com/api/details/chinesepoem)，适合补充同类场景的接口能力。
- 可搭配使用：[百万中国对联数据](https://www.gugudata.com/api/details/couplet)，适合补充同类场景的接口能力。
- 可搭配使用：[人工智能对联生成](https://www.gugudata.com/api/details/coupletai)，适合补充同类场景的接口能力。
