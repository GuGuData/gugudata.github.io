---
title: "公众号头条文章数据接口 API 简介与使用场景、调用方法"
description: "这次,再次给大家提供了一个公众号头条文章数据的 API,供大家调用、测试、开发自己的 App 使用。"
section: "parry-blog"
slug: "api-wxarticle-intro"
lang: "zh-CN"
status: "published"
tags: ["API","开放接口","大数据","数据商店","技术文章"]
publishedAt: "2019-06-15T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/b_88276ebedc82f0e77b3a2d5eb081ea03.png"
author: "Parry Qiu"
---
这次，再次给大家提供了一个公众号头条文章数据的 API，供大家调用、测试、开发自己的 App 使用。

<!-- more -->

之前在社区给大家免费开放了以下数据接口无限制的调用权限：

![截图](https://devopenclub.parryqiu.com/b_88276ebedc82f0e77b3a2d5eb081ea03.png)

这次，再次给大家提供了一个公众号头条文章数据的 API，供大家调用、测试、开发自己的 App 使用。

## 1. 产品功能

此次开放了提供日更新的公众号头条文章在线接口，用于获取每日最热门的公众号文章数据。

* 提供公众号头条文章数据；

* 每日更新两次数据；

* 支持 21 种文章分类检索查询；

* 数据抓取与文章质量筛选基于机器学习；

* 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；

* 全面兼容 Apple ATS；

* 全国多节点 CDN 部署；

* 接口极速响应，多台服务器构建 API 接口负载均衡。

**支持的新闻分类：**

> HOT(热门), FUNNY(搞笑), HEALTH(养生), SEX(两性), GOSSIP(八卦), TECH(科技), FINANCE(财经), CAR(汽车), LIFE(生活), FASHION(时尚), BABY(育儿), TRAVEL(旅游), WORK(职场), FOOD(美食), HISTORY(历史), EDUCATION(教育), HOROSCOPE(星座), SPORTS(体育), MILITARY(军事), GAME(游戏), CAT(萌宠)

## 2. 接口文档与参数

* 接口地址:

https://www.gugudata.com/api/details/wxarticle

* 返回格式:

application/json; charset=utf-8

* 请求方式:

GET

* 请求协议:

HTTPS

### 2.1 请求参数

![截图](https://devopenclub.parryqiu.com/b_ab9155cc0a202bd6bcbcf36731ea1569.png)

### 2.2 接口数据返回

![截图](https://devopenclub.parryqiu.com/b_edbd8f3204c4f819b082c066b9cb3766.png)

### 2.3 返回各字段说明

![截图](https://devopenclub.parryqiu.com/b_32af74f7d0ed0055b35cca9b56b297ba.png)

* 各类开发语言的请求示例代码可以参考 API 文档说明

[https://www.gugudata.com/api/details/wxarticle#anchor_code](https://www.gugudata.com/api/details/wxarticle#anchor_code)

* 在你使用接口前，你可以通过测试接口查看接口返回数据的格式。

[https://api.gugudata.com/news/wxarticle/demo](https://api.gugudata.com/news/wxarticle/demo)

-------

**目前接口 50% 折扣促销中**

知识星球社区中更有获取所有数据免费无限制接口调用的机会。

全力助力你以最快的速度开发出你自己的项目。

为你的简历增加最有实力的证明，或用于你自己的实际项目中。
