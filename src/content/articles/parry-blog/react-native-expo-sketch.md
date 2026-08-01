---
title: "React Native 开发即时预览与分享工具"
description: "React Native 的社区发展以及在移动开发领域的火热,大大提高了我们学习和实践的热情,不过目前的开发调试模式依然是一边开着模拟器一边编码,模拟器开启「即时刷新」进行可视化调试。 最近 Expo 发布了一个开发时真机即时预览的工具:Expo Sketch。"
section: "parry-blog"
slug: "react-native-expo-sketch"
lang: "zh-CN"
status: "published"
tags: ["React","视频教程","技术文章"]
publishedAt: "2017-03-17T00:23:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/f96dffe39cdd71967a2738dedd8b98cf.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/f96dffe39cdd71967a2738dedd8b98cf.png)

React Native 的社区发展以及在移动开发领域的火热，大大提高了我们学习和实践的热情，不过目前的开发调试模式依然是一边开着模拟器一边编码，模拟器开启「即时刷新」进行可视化调试。
最近 Expo 发布了一个开发时真机即时预览的工具：Expo Sketch。

<!-- more -->

## 1. Expo Sketch 简介

在 JS 开发方面我们有 Codepen 和 JSFiddle 进行代码的测试与分享，我们可以直接贴我们的代码然后直接分享一个地址给其他人就可以进行即时的代码分享与演示。
不过 React Native 方面一直没有一个这样的工具，所以 Expo Sketch 就是这样的背景下产生的。
主要的功能点如下：

可以在 web 或者在手机上即时测试你的代码，手机预览直接扫描页面生成的二维码即可。
最酷的功能是，之后你在页面编辑器中的任何修改都是直接反馈到你的预览设备上，连保存都不需要点。
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/caa52f448c1cfcc9d894692cb8e7498b.png)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/09f94ba0cd967cfdab81d83240d2809d.gif)

你可以直接拖拽 React Native 的控件到编码的页面中，大大省去了翻阅文档的过程。
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/23954658e3c48c44e5f824d649c8265f.gif)

编辑器中还可以看到即时的调试日志。
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/fd37a10d699f2eb4a651f562c26aab0f.png)

集成 ESLint 支持，错误一览无遗。
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/8ea501c0ca5c2f66dc577707b905d792.png)

当然，你可以非常方便地讲设计方案分享给其他朋友。

## 2. 工具地址

[https://sketch.expo.io/](https://sketch.expo.io/)
