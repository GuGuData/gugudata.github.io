---
title: "Ionic 中控件点击延迟的处理"
description: "本文分享了在 Ionic 中如何处理控件点击延迟的问题。 <!-- more --"
section: "parry-blog"
slug: "ionic-click-delay"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-12-11T06:11:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
本文分享了在 Ionic 中如何处理控件点击延迟的问题。
<!-- more -->

## 1. 问题描述

在 Ionic 中，当在 iOS 环境下运行元素的点击事件时，你会发现点击响应事件会出现延迟的情况，此情况会造成用户的操作疑惑。

## 2. 解决方案

其实官方在 Q&A 章节中给出了说明与解决方案，许多人没有认真看文档遗漏了此问题。
官方说明地址: [http://ionicframework.com/docs/v2/faq/#click-delays](http://ionicframework.com/docs/v2/faq/#click-delays)

Ionic 中推荐将点击事件绑定在可点击的控件上，如 `<button>` 和 `<a>` 上。
可是当需要在一些其他元素上添加绑定事件时，会触发一个 300ms（因设备原因也许更长） 的事件响应延迟。
此情况可以在元素上添加 `tappable` 属性即可消除此延迟情况。

{% codeblock lang:js%}

<div tappable (click)="doClick()">I am clickable!</div>

{% endcodeblock %}
