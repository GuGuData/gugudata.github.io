---
title: "地址逆编码接口 API"
description: "此文章对开放数据接口 API 之「地址逆编码接口 API」进行了功能介绍、使用场景介绍以及调用方法的说明,供用户在使用数据接口时参考之用,并且在目前更新的微信小程序实战开发项目中的使用场景。"
section: "parry-blog"
slug: "api-geodecode"
lang: "zh-CN"
status: "published"
tags: ["API","数据接口","GIS","技术文章"]
publishedAt: "2020-01-28T14:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/000f1320e6984997a26e8ce07aa8c657.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/000f1320e6984997a26e8ce07aa8c657.png)

此文章对开放数据接口 API 之「地址逆编码接口 API」进行了功能介绍、使用场景介绍以及调用方法的说明，供用户在使用数据接口时参考之用，并且在目前更新的微信小程序实战开发项目中的使用场景。

<!-- more -->

## 1. 产品功能
此次开放了精准的地址坐标逆编码在线接口，用于对提供的 GPS 坐标转换为文字地址信息。

- 提供精准、高效的地理坐标逆编码接口；
- 返回的地址包含详细的位置信息；
- 一次可返回坐标周边的 10 个地址信息；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡。

## 2. 接口文档与参数

***接口地址: ***

[https://www.gugudata.com/api/details/geodecode](https://www.gugudata.com/api/details/geodecode)

***返回格式: ***

application/json; charset=utf-8

***请求方式: ***

GET

***请求协议: ***

HTTPS

### 2.1 请求参数

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e37dddf8ad270260189dea22c3ea1aac.png)

### 2.2 接口数据返回

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/4b0e2ea3af33270772125ec2bff2211d.png)

### 2.3 返回各字段说明
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/420a9efafbde09fca2f6132ca5789109.png)

各类开发语言的请求示例代码可以参考 API 文档说明

[https://www.gugudata.com/api/details/geodecode#anchor_code](https://www.gugudata.com/api/details/geodecode#anchor_code)

在你使用接口前，你可以通过测试接口查看接口返回数据的格式。

[https://api.gugudata.com/location/geodecode/demo](https://api.gugudata.com/location/geodecode/demo)

在目前社区更新的「微信天气预报小程序实战开发」视频课程中，用于在用户打开 App 后获取到用户的 GPS 定位，然后通过此接口转换成中文地址信息，再通过中文地址信息获取到用户所在位置的天气信息，进行加载显示。
