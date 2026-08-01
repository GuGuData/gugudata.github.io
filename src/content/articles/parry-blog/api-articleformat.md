---
title: "中英文排版规范化 API"
description: "此文章对开放数据接口 API 之「中英文排版规范化 API」进行了功能介绍、使用场景介绍以及调用方法的说明,供用户在使用数据接口时参考之用。 <!-- more --"
section: "parry-blog"
slug: "api-articleformat"
lang: "zh-CN"
status: "published"
tags: ["API","数据接口","技术文章"]
publishedAt: "2019-11-12T14:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/842feb37e0cf26965a94d0d75739b9d2.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/842feb37e0cf26965a94d0d75739b9d2.png)

此文章对开放数据接口 API 之「中英文排版规范化 API」进行了功能介绍、使用场景介绍以及调用方法的说明，供用户在使用数据接口时参考之用。
<!-- more -->

## 1. 产品功能
此次开放了中英文排版规范化在线接口，用于自动中英文排版、标点符号格式化，中英混排格式化 / 标点修正。

- 支持中英文混排格式化；

- 自动在汉字与英文字符、英文标点、数字间添加空格；

- 中文标点符号自动规范化，遵从 [标点符号用法 GB/T 15834 2011]；

- 无意义的全角标点以及英文字符、数字等自动修正；

- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；

- 全面兼容 Apple ATS；

- 全国多节点 CDN 部署；

- 接口极速响应，多台服务器构建 API 接口负载均衡

## 2. 接口文档与参数
接口地址:

https://api.gugudata.com/text/formatarticle

返回格式:

application/json; charset=utf-8

请求方式:

POST

请求协议:

HTTPS

### 2.1 请求参数

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/777a82c2712f48f1d01b7236276706b8.png)

### 2.2 返回各字段说明

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/09cdcc0e2a4aea8a3fcdb5902d006472.png)

各类开发语言的请求示例代码可以参考 API 文档说明

https://www.gugudata.com/api/details/formatarticle#anchor_code

在你使用接口前，你可以通过测试接口查看接口返回数据的格式。

https://api.gugudata.com/text/formatarticle/demo

目前接口 50% 折扣促销中！

知识星球社区中更有获取所有数据免费无限制接口调用的机会，全力助力你以最快的速度开发出你自己的项目。

为你的简历增加最有实力的证明，或用于你自己的实际项目中。
