---
title: "获取任意链接文章正文 API 功能简介"
description: "此文章对开放数据接口 API 之「获取任意链接文章正文」进行了功能介绍、使用场景介绍以及调用方法的说明,供用户在使用数据接口时参考之用。"
section: "parry-blog"
slug: "fetch-content-api"
lang: "zh-CN"
status: "published"
tags: ["API","开放接口","大数据","数据商店","技术文章"]
publishedAt: "2018-11-07T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/1d75e625a977515fafc5c4c9fd7da788.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/1d75e625a977515fafc5c4c9fd7da788.png)

此文章对开放数据接口 API 之「获取任意链接文章正文」进行了功能介绍、使用场景介绍以及调用方法的说明，供用户在使用数据接口时参考之用。

<!-- more -->

## 1. 产品功能
接口开放了根据提供的文章链接 Url 参数，智能分析文章的正文部分，并通过抓取分析后，返回出文章的标题、正文以及文章的发表时间。
对于各种类型的文章布局，采用了智能化的语义分析，最大化地满足各种各种布局文章的采集与处理需求。

* 根据提供的文章链接智能分析出文章正文；
* 返回正文提供了纯文本和包含 HTML 标签两个模式；
* 数据抓取与文章标签处理基于机器学习；
* 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
* 全面兼容 Apple ATS；
* 全国多节点 CDN 部署；
* 接口极速响应，多台服务器构建 API 接口负载均衡。

接口地址：[https://www.gugudata.com/api/details/fetchcontent](https://www.gugudata.com/api/details/fetchcontent)

## 2. 接口文档与参数

**接口地址:** https://api.gugudata.com/news/techblogs
**返回格式:** json/xml
**请求方式:** GET
**请求示例:** https://api.gugudata.com/news/fetchcontent?appkey=REDACTED&url=N/A&contentwithhtml=false
**请求协议:** HTTPS
**接口测试:** https://api.gugudata.com/news/fetchcontent/demo

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/9b5a15ebe907d9623dae077604d55e34.png)

各类开发语言的请求示例代码可以参考 API 文档说明：[https://www.gugudata.com/api/details/fetchcontent#anchor_code](https://www.gugudata.com/api/details/fetchcontent#anchor_code)
