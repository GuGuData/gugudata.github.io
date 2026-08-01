---
title: "唐诗宋词大全 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/chinesepoem"
section: "gugudata"
slug: "text-chinesepoem"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/chinesepoem"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/44d79c248337eb4121713b23013bb4b8.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/chinesepoem](https://www.gugudata.com/api/details/chinesepoem)

唐诗宋词大全 API 支持 40 万数据全文检索，基础数据等关键词场景常会用到，适合用于中文文本处理与内容清洗、搜索分词与语言分析与知识抽取与文本理解等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/44d79c248337eb4121713b23013bb4b8.jpg)

## 1. 产品功能

- 中文全数量级唐诗宋诗宋词数据；
- 关键字可对标题、作者与内容进行模糊匹配；
- 总计近 40 万条数据；
- 数据持续更新与维护；
- 围绕“唐诗宋词大全”提供标准化能力，便于快速接入现有业务；
- 适合将“唐诗宋词大全”结果接入业务系统、后台工具和自动化流程；
- 适合文本清洗、内容分析、搜索增强和自动化处理场景；
- 可与摘要、纠错、分词、实体识别和语义分析接口组合；

## 2. API 文档

**接口地址:** https://api.gugudata.com/text/chinesepoem

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/text/chinesepoem?appkey=REDACTED&keywords=YOUR_VALUE&pagesize=10&pagenumber=1&type=YOUR_VALUE&searchtype=all

**数据预览:** [https://www.gugudata.com/preview/chinesepoem](https://www.gugudata.com/preview/chinesepoem)

**接口测试:** [https://api.gugudata.com/text/chinesepoem/demo](https://api.gugudata.com/text/chinesepoem/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| keywords | string | 否 | YOUR_VALUE | 查询关键字，会模糊匹配标题、作者与内容，结果按照类别、作者进行排序。内容关键字传递中文简体、中文繁体都可兼容搜索 |
| pagesize | int | 是 | 10 | 分页参数，每页总条数，取值范围在 1 ~ 20 之间 |
| pagenumber | int | 是 | 1 | 分页参数，第几页 |
| type | string | 否 | YOUR_VALUE | 数据分类，可选参数为（tang, song, ci）。唐诗: tang \| 宋诗: song \| 宋词: ci，不传递或空值则不进行过滤 |
| searchtype | string | 否 | all | 关键字条件匹配的内容，可选参数为（title, author, content, all）。标题或词牌名: title \| 作者: author \| 诗歌或词的内容: content \| 匹配以上所有: all，不传递则默认值为 all |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| DataStatus.RequestParameter | string | 请求参数，一般用于调试 |
| Data.Title | string | 诗歌标题或宋词词牌名 |
| Data.Author | string | 作者名 |
| Data.Content | string[] | 诗歌或词的内容，格式为 string 数组 |
| Data.Type | string | 类型，分为：唐诗 \| 宋诗 \| 宋词 |

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

- 适合用于中文文本处理与内容清洗，快速补齐产品侧需要的 唐诗宋词大全 数据能力。
- 适合用于搜索分词与语言分析，减少手工整理、清洗与重复开发成本。
- 适合用于知识抽取与文本理解，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[百万中国对联数据](https://www.gugudata.com/api/details/couplet)，适合补充同类场景的接口能力。
- 可搭配使用：[人工智能对联生成](https://www.gugudata.com/api/details/coupletai)，适合补充同类场景的接口能力。
- 可搭配使用：[NLP 中英文排版规范化](https://www.gugudata.com/api/details/formatarticle)，适合补充同类场景的接口能力。
