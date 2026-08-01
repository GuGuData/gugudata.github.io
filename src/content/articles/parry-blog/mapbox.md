---
title: "使用 mapbox 实现全国房价数据可视化"
description: "mapbox 是一个开源的地图引擎,为开发者提供专业地图开发工具,包括高度开放的 API 和开源 SDK,同时对跨平台有非常好的支持。 <!-- more --"
section: "parry-blog"
slug: "mapbox"
lang: "zh-CN"
status: "published"
tags: ["地图","mapbox","技术文章"]
publishedAt: "2019-09-04T14:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_579a00af1bc4173faa1693abe62303ee.png"
author: "Parry Qiu"
---
![截图](https://devopenclub.parryqiu.com/blog_579a00af1bc4173faa1693abe62303ee.png)

mapbox 是一个开源的地图引擎，为开发者提供专业地图开发工具，包括高度开放的 API 和开源 SDK，同时对跨平台有非常好的支持。
<!-- more -->

## 1. mapbox 介绍

同时，支持离线地图的加载，如自己部署地图服务器，然后前端通过 mapbox 引擎进行加载渲染。

![截图](https://devopenclub.parryqiu.com/80f6ef95742a6ceae15ba030e1268aa7.png)

### 1.1 为什么选择 mapbox
mapbox 提供了非常优雅的地图样式、足够强大的前段地图框架 mapboxgl，以及非常丰富的前段空间运算处理框架生态。

同时如果需要私有化部署，可以进行几乎无缝地切换。

mapbox 分公司也入驻中国，感兴趣可以去查阅相关报道。

## 2. 主要技术栈
下面简要介绍下使用到的技术栈，部分技术栈已在我们的社区中录制成视频教程，感兴趣的下载学习即可。

### 2.1 数据抓取与清洗
使用 Python + BeautifulSoup 进行数据的抓取，后端采用 MongoDB 进行存储，并在入库后进行对应的数据清洗、关联处理。

### 2.2 后端 + 前端
后端采用对应的后端语言实现数据接口 API，部分数据接口已通过 API Key 的形式提供给大家进行快速地数据读取。

前端使用 ant.design 进行布局，mapboxgl 作为前端地图引擎进行地图的加载、数据渲染操作。

如果使用 mapbox 作为底图，需要注意坐标系的问题，如果数据的坐标系与 mapbox 的坐标系（WGS84）不对应，那么在数据渲染前需要进行坐标系的转换。

地图数据图例通过前端 colormap 框架实现了渐变色的生成。

最终实现了房价从低到高，颜色表现从冷色到暖色渐变，图标从小到大的渐变。

## 3. 最终效果图

![截图](https://devopenclub.parryqiu.com/f5995709d53befad323234eb5d7c6c5f.png)

查看地址：[https://visual.gugudata.com](https://visual.gugudata.com)

部分城市的数据会触发频率阈值，暂未开放。
