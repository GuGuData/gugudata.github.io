---
title: "为阿里云站点部署免费 HTTPS"
description: "本文记录了部署在阿里云的站点,在申请了免费的 SSL 证书后如何正确的部署到站点上,让站点支持 HTTPS 访问。 <!-- more -- 阿里云引入了沃通作为 CA 证书供应商,并开放了免费 SSL 申请的页面,之前一直想给 咕咕监控 部署上全站 HTTPS,所以就申请了一个,但是部署的过程中遇到了些问题,所以记…"
section: "parry-blog"
slug: "aliyun-site-ssl-https"
lang: "zh-CN"
status: "published"
tags: ["阿里云","技术文章"]
publishedAt: "2016-06-29T12:58:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_09f0a172245e9a6c665e349333968634.png"
author: "Parry Qiu"
---
本文记录了部署在阿里云的站点，在申请了免费的 SSL 证书后如何正确的部署到站点上，让站点支持 HTTPS 访问。
<!-- more -->
阿里云引入了沃通作为 CA 证书供应商，并开放了免费 SSL 申请的页面，之前一直想给 [咕咕监控](https://www.gugujiankong.com) 部署上全站 HTTPS，所以就申请了一个，但是部署的过程中遇到了些问题，所以记录下来备忘。
## 1. 证书申请
在阿里云后台的 CA 管理页面，填写相关的信息后就可以申请到一张免费的 CA 证书，申请成功后可以在管理界面中看到。

![截图](https://devopenclub.parryqiu.com/blog_09f0a172245e9a6c665e349333968634.png)

## 2. 证书部署
因为 [咕咕监控](https://www.gugujiankong.com) 部署在了 Windows 系统上，所以在下载了后台提供的证书后，需要做证书的转换工作。
下载下来的证书文件如下：

![截图](https://devopenclub.parryqiu.com/blog_4cd83ca2439c0a9bae23f9eafa92109c.png)

注意在 Windows 下需要使用 PFX 格式的文件，所以你需要先使用命令生成对应的 PFX 格式文件，关于每种格式的区别以及转换方法请参见 [这里](https://help.aliyun.com/knowledge_detail/13086385.html?spm=5176.789196016.2.1.18tl3i) 。

在 [沃通SSL证书部署指南部署指南](http://freessl.wosign.com/guide) 里，你可以找到对应系统的部署方法。

## 3. 特别注意点
在 IIS 中部署后，你可能会发现有提示 ```SSL证书后提示不可信的解决方案``` 的情况，在 Windows 系统下可能访问正常，而在 Mac 系统下访问会出现此问题，这里请注意根证书以及子证书放置的位置问题，其实就是证书链的问题。
这个问题请参见 [这里](https://bbs.wosign.com/thread-1804-1-1.html) 去解决。

最后，在部署好证书后，需要检查站点的加载的所有资源文件是否都是安全、支持 HTTPS 的，不然就不是完美的 HTTPS 了，也就会出现一个小黄标了。

站点部署好后的效果，另外你可以通过一些技巧将 HTTP 访问重定向到 HTTPS。

![截图](https://devopenclub.parryqiu.com/blog_c9c5c7a8323356b2563eb7a289cc52b4.png)
