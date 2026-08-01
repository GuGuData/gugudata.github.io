---
title: "Ionic 2 中生命周期的命名改变及说明"
description: "本文简要整理了在 Ionic 2 的版本中生命周期命名的改变,以及各个事件的解释。 <!-- more --"
section: "parry-blog"
slug: "ionic2-view-lifecycle"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-08-31T01:02:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
本文简要整理了在 Ionic 2 的版本中生命周期命名的改变，以及各个事件的解释。
<!-- more -->

在之前的课程中讲解了 Ionic 生命周期的命名以及使用，不过在 Ionic 2 更新到了 30 版本后，框架在全局对生命周期的命名做了改变，所以本文简单整理一下新的生命周期事件和说明如下。
官方文档地址在[这里](http://ionicframework.com/docs/v2/api/components/nav/NavController/)。

| 事件名称 | 事件说明 |
| --- | --- |
| ionViewLoaded | 页面加载完毕触发。该事件发生在页面被创建成 DOM 的时候，且仅仅执行一次。如果页面被缓存（Ionic默认是缓存的）就不会再次触发该事件。该事件中可以放置初始化页面的一些事件。 |
| ionViewWillEnter | 即将进入一个页面变成当前激活页面的时候执行的事件。 |
| ionViewDidEnter | 进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。 |
| ionViewWillLeave | 将要离开了该页面之后变成了不是当前激活页面的时候执行的事件。 |
| ionViewDidLeave | 在页面完成了离开该页面并变成了不是当前激活页面的时候执行的事件。 |
| ionViewWillUnload | 在页面销毁和页面中有元素移除之前执行的事件。 |
| ionViewDidUnload | 在页面销毁和页面中有元素移除之后执行的事件。 |
