---
title: "没有 iOS 开发者账号的情况下部署到真机的方法"
description: "本文分享了官方推荐的没有 iOS 开发者账号的情况下部署到真机的方法,供参考。 <!-- more --"
section: "parry-blog"
slug: "ionic-deploying-to-a-device-without-an-apple-developer-account"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-09-20T05:51:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/87d7150351bade98b6f4d5eb5c433d12.png"
author: "Parry Qiu"
---
本文分享了官方推荐的没有 iOS 开发者账号的情况下部署到真机的方法，供参考。
<!-- more -->

## 1. 官方推荐的方法
原文[在此](http://blog.ionic.io/deploying-to-a-device-without-an-apple-developer-account/)，也就是 Ionic 官方团队在博客中分享的方法，我简单翻译些重要的信息，详细细节可以参考原文。

## 2. XCode 部署

打开 Xode 设置 preferences (Xcode > Preferences…)
点击 ‘Accounts’
添加你的 Apple ID (+ > Add Apple ID…)
当你登录成功后，会显示一个 ‘Personal Team’ 和角色 ‘Free’。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/87d7150351bade98b6f4d5eb5c433d12.png)

新建一个项目，并执行 Ionic 的编译命令：
ionic start testApp blank --v2
cd testApp
ionic build iOS

当你连接上真机设备，选择运行的时候，会出现下面的错误：

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/90e603b7a71cf137ad0376ae404f1894.png)

点击 ‘Fix Issue‘ 后出现：

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/014d0259e361417d37792db3d67536aa.png)

点击选择后会继续出现如下错误：

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c4a9de17bd96c82a51f747b71ee3d51c.png)

回到真机上点击 ‘设置’ > ‘通用‘ > ‘设备管理’，你将看到你的 Apple ID 的邮箱地址，点击即可。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/fbd514786bfa0dbc12518905734b996c.png)

这样，再回到 XCode 点击运行就可以了。

## 3. Ionic View

[Ionic View](http://view.ionic.io/) 的原理是你打包应用后上传给 Ionic，然后就可以在 Ionic View 的 APP 中查看你上传的应用了，不要考虑发布、平台等问题。
主要可以用来给客户演示使用，因为快速地迭代开发更新不需要每次都更新应用商店里的 APP。
具体的可以去看博客的原文。

## 4. Ionic Package

为了解决在 Windows 下也可以打包 IPA 或者 APK 文件，Ionic 开发了 [Ionic Package](http://docs.ionic.io/services/package/)，iOS 提供 App Certificates & Provisioning Profiles，Android 提供 Android keystore 即可。
对应的设置界面：

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e9cf021652c158c16f30d1ca84a3f1a1.png)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/6d168fba4cb95528e4e6aba180ba8b26.png)

最终在 [Ionic 云平台](https://apps.ionic.io/login)中就可以帮您直接生成可供上架的 IPA 和 APK 了。
详细步骤可参见：[http://docs.ionic.io/services/package/](http://docs.ionic.io/services/package/)
