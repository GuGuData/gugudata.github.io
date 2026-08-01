---
title: "Ionic 入门与实战之第二章第二节:Ionic 环境搭建之 Ionic Lab 使用"
description: "本文是「Ionic 入门与实战」系列连载的第二章第二节,主要对 Ionic Lab 工具作了介绍,并讲解了其使用方法,这也是一个开发 Ionic 比较好的调试工具。 <!-- more -- Ionic Lab 是 Ionic 发布的一个可视化、跨平台的项目管理工具,可以创建、测试、编译、发布 Ionic 项目。 1…"
section: "parry-blog"
slug: "ionic-chapter-2-section-2-ionic-lab-intro"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","书籍连载","技术文章"]
publishedAt: "2016-04-27T12:56:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/afdafc164a7d1eae1fd9dd53bc73d778.png"
author: "Parry Qiu"
---
本文是「Ionic 入门与实战」系列连载的第二章第二节，主要对 Ionic  Lab 工具作了介绍，并讲解了其使用方法，这也是一个开发 Ionic 比较好的调试工具。
<!-- more -->
[Ionic Lab](http://lab.ionic.io/) 是 Ionic 发布的一个可视化、跨平台的项目管理工具，可以创建、测试、编译、发布 Ionic 项目。
## 1. App 创建

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/afdafc164a7d1eae1fd9dd53bc73d778.png)

这里的创建功能就是类似于之前的 Ionic 的命令：ionic start。
可以选择需要使用的模板进行创建，并且可以选择是否使用 Sass 以及是否启用 Cordova。

## 2. App 预览

点击了 Serve 按钮后，就可以在右侧的预览窗口中看到分别在 iOS 和 Android 下面的模拟效果了，非常的方便。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/7a875970879c0329ae3004aeaec1859e.png)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/952ce648ae3969c22fe29e8822df3d29.png)

## 3. App 编译

点击 Build 按钮后会进行项目的编译动作，类似于在对应的平台开发 IDE 里点击编译按钮一样。

## 4. App 运行

点击 Run 按钮后，会调用对应的平台模拟器或者真机运行编译好的 App。

## 5. App 上传

Ionic Lab 提供了一个 App 上传的功能，可以方便地上传了创建的 App 后，分享给其他用户进行初始体验或测试。这样特别是避免了 iOS 应用上架 App Store 才可以分发的过程，在完整测试好后再进行 App Store 的上架。
使用此功能客户端需要安装 [Ionic View](http://view.ionic.io/)。

## 6. App 日志查看

点击右上角的日志查看功能按钮，可以方便地查看运行以及调试时输出的日志信息，包括在代码中为了调试输出的日志信息都将在这里显示，方便调试。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/1a03259da67a67b4c7a3da433cf08186.png)
