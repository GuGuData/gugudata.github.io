---
title: "在 Ionic CLI 2.0 下安装 Ionic 1"
description: "本文介绍了在安装了 Ionic CLI 2.0 的环境下如何再去安装 Ionic 1 的版本方法。 <!-- more --"
section: "parry-blog"
slug: "how-to-install-ionic1"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-08-24T07:34:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_aaf59a7aa3a04fcb1e672937faab3045.png"
author: "Parry Qiu"
---
本文介绍了在安装了 Ionic CLI 2.0 的环境下如何再去安装 Ionic 1 的版本方法。
<!-- more -->

## 1. Ionic CLI 2.0 安装 Ionic 1.0 遇到的问题
[Ionic CLI](https://github.com/driftyco/ionic-cli0) 在更新到了 2.0 之后，当再使用官网文档介绍的方法进行安装时，默认安装上的将是 2.0版本。

![官网文档截图](https://devopenclub.parryqiu.com/blog_aaf59a7aa3a04fcb1e672937faab3045.png)

当我们需要在此环境下降低版本到 Ionic 1.0 时就会遇到问题。

## 2. 安装方法
我在尝试的时候突然想起来，在 2.0 版本安装的时候可以通过命令 `npm install ionic@beta-2.22` 的形式进行安装，就想是不是能在命令后直接强制制定版本号呢？

![截图](https://devopenclub.parryqiu.com/blog_71b7b5e9c3df0553bfc6728d22a305d0.png)

一番等待后，果然可以，又可以来回切换 Ionic 的版本了，记录下来备忘。

![截图](https://devopenclub.parryqiu.com/blog_5f4e682b5866414a396c2fb89c3605da.png)

Ionic 的版本列表见[这里](https://github.com/driftyco/ionic/releases)。
