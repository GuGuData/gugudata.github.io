---
title: "公众号头条文章 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/wxarticle"
section: "gugudata"
slug: "news-wxarticle"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/wxarticle"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/aace560f3da1c86ee450577f62d25d24.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/wxarticle](https://www.gugudata.com/api/details/wxarticle)

公众号头条文章 API 提供日更新的公众号头条文章，基础数据等关键词场景常会用到，适合用于资讯抓取与内容聚合、舆情监控与内容分析与搜索索引与知识库构建等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/aace560f3da1c86ee450577f62d25d24.jpg)

## 1. 产品功能

- 提供公众号头条文章数据；
- 每日更新两次数据；
- 支持 21 种文章分类检索查询；
- 数据抓取与文章质量筛选基于机器学习；
- 围绕“公众号头条文章”提供标准化能力，便于快速接入现有业务；
- 适合将“公众号头条文章”结果接入业务系统、后台工具和自动化流程；
- 适合资讯聚合、内容归档和运营素材整理场景；
- 支持将文章、图片或封面结果接入内容管理系统；

## 2. API 文档

**接口地址:** https://api.gugudata.com/news/wxarticle

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/news/wxarticle?appkey=REDACTED&type=YOUR_VALUE&pageindex=1&pagesize=10&begindatetime=YOUR_VALUE&enddatetime=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/wxarticle](https://www.gugudata.com/preview/wxarticle)

**接口测试:** [https://api.gugudata.com/news/wxarticle/demo](https://api.gugudata.com/news/wxarticle/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| type | string | 是 | YOUR_VALUE | 新闻分类，支持类型 HOT(热门), FUNNY(搞笑), HEALTH(养生), SEX(两性), GOSSIP(八卦), TECH(科技), FINANCE(财经), CAR(汽车), LIFE(生活), FASHION(时尚), BABY(育儿), TRAVEL(旅游), WORK(职场), FOOD(美食), HISTORY(历史), EDUCATION(教育), HOROSCOPE(星座), SPORTS(体育), MILITARY(军事), GAME(游戏), CAT(萌宠) |
| pageindex | int | 否 | 1 | 页码 |
| pagesize | int | 否 | 10 | 每页数据量，参数最大值为 100 |
| begindatetime | string | 否 | YOUR_VALUE | 可选参数，筛选文章发布开始时间，格式为: 20220516 12:00:00 |
| enddatetime | string | 否 | YOUR_VALUE | 可选参数，筛选文章发布结束时间，格式为: 20220518 12:00:00 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.ArticleType | string | 文章分类 |
| Data.ArticleUrl | string | 文章链接 |
| Data.ArticleTitle | string | 文章标题 |
| Data.ArticleCoverImageUrl | string | 文章封面图片 |
| Data.ArticleSummary | string | 文章摘要 |
| Data.ArticleContent | string | 文章内容 (纯文本) |
| Data.ArticleContentWithTags | string | 文章内容 (HTML) |
| Data.ArticlePublishDateTime | string | 文章发布时间 |
| Data.AuthorName | string | 作者名称 |
| Data.AuthorUrl | string | 作者链接 |
| Data.AuthorHeadImageUrl | string | 作者头像图片 |
| Data.AuthorIsV | string | 是否认证作者 |

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

- 适合用于资讯抓取与内容聚合，快速补齐产品侧需要的 公众号头条文章 数据能力。
- 适合用于舆情监控与内容分析，减少手工整理、清洗与重复开发成本。
- 适合用于搜索索引与知识库构建，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意链接正文图片](https://www.gugudata.com/api/details/fetchcontentimages)，适合补充同类场景的接口能力。
- 可搭配使用：[幽默笑话大全](https://www.gugudata.com/api/details/joke)，适合补充同类场景的接口能力。
