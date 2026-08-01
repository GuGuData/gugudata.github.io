---
title: "从源码的角度再看 React JS 中的 setState"
description: "在这一篇文章中,我们从源码的角度再次理解下 setState 的更新机制,供深入研究学习之用。"
section: "parry-blog"
slug: "react-state-in-sourcecode"
lang: "zh-CN"
status: "published"
tags: ["React","技术文章"]
publishedAt: "2017-12-29T06:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/e6ec8ed6ffc9258cf5ce5001b00c7e14.jpg"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e6ec8ed6ffc9258cf5ce5001b00c7e14.jpg)\

在这一篇文章中，我们从源码的角度再次理解下 setState 的更新机制，供深入研究学习之用。

<!-- more -->

在上一篇手记「[深入理解 React JS 中的 setState](http://blog.parryqiu.com/2017/12/19/react_set_state_asynchronously/)」中，我们简单地理解了 React 中 setState “诡异”表现的原因。

*源码的部分为了保证格式显示正常就截图了，查看源码点击对应的链接直接跳转至 GitHub 查看即可。*

## 1. React 中的 setState 更新逻辑代码
在更新逻辑的部分，可以看到 React 会通过 `batchingStrategy.isBatchingUpdates` 判断当前的逻辑状态下是否需要进行批量更新。

 - 如果不是，那么就直接进行页面的批量更新，将之前累积的所有状态一次更新到组件上。就是类似我们上一篇文章中举例的快递点一次将所有的快递寄出。

 - 如果是，那么所有的组件状态不进行立即更新，而是将组件状态存放在一个叫 `dirtyComponents` 的数组中去，等待下次更新时机的到来再进行更新。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/00d25dce0c12458cd2eceedd4c9e2df5.png)

[源码地址](https://github.com/facebook/react/blob/35962a00084382b49d1f9e3bd36612925f360e5b/src/renderers/shared/reconciler/ReactUpdates.js#L199)

## 2. React 中的 Transaction 设计

为了实现上述的更新逻辑，React 设计了 Transaction 的逻辑，看起来也像是数据库中的事务。
源码中如图所示，给出了一幅图以及大段的解释。

React 将整个的函数执行过程包裹上了 Transaction，在函数执行前与执行后分别有 `initialize` 和 `close` 两个方法。

这样的话 React 就有时机在函数执行过程中，涉及到 setState 的执行，都将缓存下来，在 `close` 的时候进入到 React 的 state 更新逻辑进行更新判断操作，并最终更新到前台的 DOM 上。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/49721c853eacc84fecabe4141408a2c7.png)

[源码地址](https://github.com/facebook/react/blob/6d5fe44c8602f666a043a4117ccc3bdb29b86e78/src/shared/utils/Transaction.js#L28)

其实 Virtual DOM 的框架都会有这样的设计逻辑，理解了这样的底层设计才能很好地理解一些方法在前台的表现行为。

Vue.js 中也有类似的设计逻辑，后续如果有时间我们将继续进行相关讨论。

下一篇文章，我们继续来看 React 底层是如何进行 `batchingStrategy` 的设计以及更新状态的转换的。
