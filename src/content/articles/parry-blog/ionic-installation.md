---
title: "使用 CNPM 进行 Ionic 环境的安装与配置"
description: "本文介绍了使用 CNPM 进行 Ionic 环境的安装与配置,主要解决国内网络环境下安装遇到的问题。 <!-- more --"
section: "parry-blog"
slug: "ionic-installation"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","CNPM","技术文章"]
publishedAt: "2016-08-18T02:01:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/a4c4d0e835561404449bfaae09187ca7.png"
author: "Parry Qiu"
---
本文介绍了使用 CNPM 进行 Ionic 环境的安装与配置，主要解决国内网络环境下安装遇到的问题。
<!-- more -->

## 1. 为什么需要使用 CNPM 进行 Ionic 的安装
[之前的文章](http://blog.parryqiu.com/2016/04/26/ionic_chapter_2_install/)中已经讲解过了 Ionic 的安装与配置，但是鉴于国内恶心的网络环境，安装过程中需要加载的很多资源都会被墙掉，所以想要最顺畅的安装过程请使用 VPN 后进行环境的安装，推荐 [Green VPN](http://gjsq.me/17145470)。

## 2. CNPM 简介与安装
CNPM 其实就是[淘宝 NPM 镜像](http://npm.taobao.org/)，此国内源会定时（每 10 分钟）从国外的 NPM 源中同步到国内，供国内使用。所以如果遇到 HASH 计算不一致的问题，还是建议使用 VPN 直接从国外安装。
在安装好了 NodeJS 以及 NPM 的情况下，执行下面的命令进行安装。

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装好了后，可以通过 `cnpm -v` 命令确认安装成功。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/a4c4d0e835561404449bfaae09187ca7.png)

以后需要加载 NPM 模块就可以通过命令 `cnpm install [name]` 进行安装了。

其中的源关系可以参见 cnpmjs.org 和 npm.taobao.org 关系图。

![cnpm_network](https://assets.devopen.club/uPic/202608/gugudata-pages/a981e5f6fe907737d838aa58a934d804.png)

## 3. 确认 CNPM 的 registry 是否正确设置
Windows 系统的默认安装路径 `C:\Program Files\nodejs\node_modules\npm` 下文件 `npmrc` 或者
Mac 的根路径 `~` 下的文件 `.npmrc` 中正确设置了 CNPM 的 registry。

Windows 下 npmrc 文件。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/53f2ba410e53e4544ae515c44c5a88d8.png)

Mac 下 .npmrc 文件。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/3383c576b972d93ae64b848fbb6c9275.png)

## 4. 安装 Ionic

按照[之前的文章](http://blog.parryqiu.com/2016/04/26/ionic_chapter_2_install/)中的方法进行安装即可。以后加载模块直接使用 CNPM 安装即可。
