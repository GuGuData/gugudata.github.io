---
title: "幽默笑话大全 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/joke"
section: "gugudata"
slug: "news-joke"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/joke"
cover: "https://static.gugudata.com/api_cover_joke_ve3.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/joke](https://www.gugudata.com/api/details/joke)

幽默笑话大全 API 提供全网最全的幽默笑话数据，基础数据等关键词场景常会用到，适合用于资讯抓取与内容聚合、舆情监控与内容分析与搜索索引与知识库构建等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_joke_ve3.jpg)

## 1. 产品功能

- 提供全网最全的幽默笑话数据；
- 已有近 4 万条数据，并周期性新增数据；
- 支持 35 种笑话分类检索查询；
- 围绕“幽默笑话大全”提供标准化能力，便于快速接入现有业务；
- 适合将“幽默笑话大全”结果接入业务系统、后台工具和自动化流程；
- 适合娱乐内容、社区互动和轻量内容推荐场景；
- 支持将笑话内容接入小程序、机器人和运营活动；
- 便于按主题、长度和使用场景组织娱乐内容；

## 2. API 文档

**接口地址:** https://api.gugudata.com/news/joke

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/news/joke?appkey=REDACTED&type=YOUR_VALUE&pageindex=1&pagesize=10

**数据预览:** [https://www.gugudata.com/preview/joke](https://www.gugudata.com/preview/joke)

**接口测试:** [https://api.gugudata.com/news/joke/demo](https://api.gugudata.com/news/joke/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| type | string | 是 | YOUR_VALUE | 笑话分类，支持类型：'所有','经典','名著暴笑','爆笑男女','哈哈趣闻','原创','恐怖','爱情','校园','幽默','儿童','爆笑','综合','动物','顺口溜','搞笑歌词','恋爱必读','英语','短信','求爱秘籍','极品','数学','一句话','短笑话','小笑话','内涵','冷笑话','重口味','整人','各地方言','短篇','搞笑','简短','超级','数码' |
| pageindex | int | 否 | 1 | 页码 |
| pagesize | int | 否 | 10 | 每页数据量，参数最大值为 100 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Id | string | 笑话唯一 ID |
| Data.Type | string | 笑话分类 |
| Data.Title | string | 笑话标题 |
| Data.Content | string | 笑话内容 |

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

- 适合用于资讯抓取与内容聚合，快速补齐产品侧需要的 幽默笑话大全 数据能力。
- 适合用于舆情监控与内容分析，减少手工整理、清洗与重复开发成本。
- 适合用于搜索索引与知识库构建，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意链接正文图片](https://www.gugudata.com/api/details/fetchcontentimages)，适合补充同类场景的接口能力。
- 可搭配使用：[软件开发技术博文头条](https://www.gugudata.com/api/details/techblogs)，适合补充同类场景的接口能力。
