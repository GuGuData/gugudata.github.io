---
title: "全国天气预报信息数据 API 功能简介与代码调用实战视频"
description: "此文章对开放数据接口 API 之「全国天气预报信息数据 API」进行了功能介绍、使用场景介绍以及调用方法的说明,供用户在使用数据接口时参考之用,并对实战开发进行了视频演示。"
section: "parry-blog"
slug: "how-to-use-weather-api"
lang: "zh-CN"
status: "published"
tags: ["API","开放接口","大数据","数据商店","技术文章"]
publishedAt: "2018-11-21T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/b_b198ce69607bbded74bc5d178c7c1dee.png"
author: "Parry Qiu"
---
此文章对开放数据接口 API 之「全国天气预报信息数据 API」进行了功能介绍、使用场景介绍以及调用方法的说明，供用户在使用数据接口时参考之用，并对实战开发进行了视频演示。

<!-- more -->

## 1. 产品功能

接口开放了全国天气预报信息数据，你可以通过关键字查询任意市或者区级别的位置代码，通过位置代码查询最详细的天气预报数据。

* 全国天气预报每隔 6 小时更新数据；
* 精确到行政区级别的天气预报数据；
* 提供最长 7 天的天气预报数据；
* 提供每日小时级别的天气预报数据；
* 提供本地日出日落、当日历史温度等附加数据；
* 提供紫外线、穿衣、洗车、空气污染等额外指导数据；
* 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
* 全面兼容 Apple ATS；
* 全国多节点 CDN 部署；
* 接口极速响应，多台服务器构建 API 接口负载均衡。

接口地址：[https://www.gugudata.com/api/details/weatherinfo](https://www.gugudata.com/api/details/weatherinfo)

## 2. 接口文档与参数

**接口地址:** https://api.gugudata.com/weather/weatherinfo

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/weather/weatherinfo?appkey=REDACTED&code=N/A&days=1

**接口测试:** https://api.gugudata.com/weather/weatherinfo/demo

### 2.1 前置接口

**前置接口说明:** 查询地区编码，根据市或区的关键字进行查询，如北京、苏州、海淀、吴中等

**前置接口地址:** https://api.gugudata.com/weather/weatherinfo/region?appkey=REDACTED&keyword=查询编码的市或区关键字，如北京、海淀

**前置接口参数说明:** appkey=APPKEY&keyword=查询编码的市或区关键字，如北京、海淀

**前置接口返回格式:** application/json; charset=utf-8

**前置接口返回说明:** 包含地区编码以及省、市、区相关信息

**前置接口请求方式:** GET

**前置接口请求协议:** HTTPS

### 2.2 请求参数

![截图](https://devopenclub.parryqiu.com/b_b198ce69607bbded74bc5d178c7c1dee.png)

#### 请求流程图
下图为天气预报数据接口的基本请求流程图。

![截图](https://devopenclub.parryqiu.com/b_2bf76045b73262c0c8d9dcf491ef8e2b.png)

### 2.3 接口数据返回

![截图](https://devopenclub.parryqiu.com/b_0c234793363321bc4c5b2e77d1b6c5b6.png)

### 2.4 返回各字段说明

![截图](https://devopenclub.parryqiu.com/b_6dcf83717afe6639ee829ac5f04b6f40.png)

各类开发语言的请求示例代码可以参考 API 文档说明
[https://www.gugudata.com/api/details/weatherinfo#anchor_code](https://www.gugudata.com/api/details/weatherinfo#anchor_code)

在你使用接口前，你可以通过测试接口查看接口返回数据的格式。
[https://api.gugudata.com/weather/weatherinfo/demo](https://api.gugudata.com/weather/weatherinfo/demo)

## 3. 视频演示接口调用
你可以在这里查看视频对接口的功能解释、调用测试以及代码调用实战的演示。

[全国天气预报信息数据 API 功能简介与代码调用实战 - 哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~](https://www.bilibili.com/video/av36436730/)

目前接口 50% 折扣促销中，知识星球社区中更有获取所有数据免费无限制接口调用的机会，全力助力你以最快的速度开发出你自己的项目，为你的简历增加最有实力的证明，或用于你自己的实际项目中。
