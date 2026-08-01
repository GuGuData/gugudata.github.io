---
title: "从源码的角度看 React JS 中批量更新 State 的策略(下)"
description: "这篇文章我们继续从源码的角度学习 React JS 中的批量更新 State 的策略,供我们继续深入学习研究 React 之用。"
section: "parry-blog"
slug: "cong-yuan-ma-de-jiao-du-kan-r-e-a-c-t-j-s-zhong-pi-liang-geng-xin-s-t-a-4eb2d68"
lang: "zh-CN"
status: "published"
tags: ["React","技术文章"]
publishedAt: "2018-01-08T08:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/b_796defbe6dab968aef4943cba7c6bf97.png"
author: "Parry Qiu"
---
![截图](https://devopenclub.parryqiu.com/b_796defbe6dab968aef4943cba7c6bf97.png)

这篇文章我们继续从源码的角度学习 React JS 中的批量更新 State 的策略，供我们继续深入学习研究 React 之用。

<!-- more -->

前置文章列表
* [深入理解 React JS 中的 setState](http://blog.parryqiu.com/2017/12/19/react_set_state_asynchronously/)
* [从源码的角度再看 React JS 中的 setState](http://www.imooc.com/article/22426)
* [从源码的角度看 React JS 中批量更新 State 的策略（上）](http://www.imooc.com/article/22514)

## 1. batchingStrategy 策略
现在我们开始来看 batchingStrategy 的策略定义。
目前 React 中 batchingStrategy 的定义为 `ReactDefaultBatchingStrategy`。
ReactDefaultBatchingStrategy 包含两部分。
* 最重要的部分 FLUSH_BATCHED_UPDATES。

![截图](https://devopenclub.parryqiu.com/b_7c5980ed43a8c9a971e4ab20d25d1487.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactDefaultBatchingStrategy.js#L27)

实现在这里。
注意实现里定义了一个叫 `pooled` 的东西，后续我们会展开讨论这样设计的原理与好处。
React 将所有的组件丢到 pool 中去，然后都交给 `runBatchedUpdates` 去执行更新操作了。
同样，还有一个 `asap` 的概念，也在后续文章中讨论。

![截图](https://devopenclub.parryqiu.com/b_75ad0b8f9eb28f6a7df09bae62054068.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactUpdates.js#L167)

对所有的组件进行 `performUpdateIfNecessary` 的判断，并更新组件。

![截图](https://devopenclub.parryqiu.com/b_707d6b2704a3c943c73d8d672f019e07.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactUpdates.js#L124)

* 另一个实现为 RESET_BATCHED_UPDATES，用于将 `isBatchingUpdates` 重置为 `false`，等待下次组件的批量更新。

![截图](https://devopenclub.parryqiu.com/b_7ae8d60da888737350e6677a06b43daf.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactDefaultBatchingStrategy.js#L20)

## 2. 组件是否需要更新的比较 performUpdateIfNeeded

两个逻辑，比较组件是否需要更新，以及第二种条件下直接进行强制更新。
`ReactReconciler.receiveComponent` 在元素级别进行了比较，不过不一样那么就调用 `receiveComponent`。
其他状态直接调用 `updateComponent`。
注意这里的 `updateComponent` 函数的内部实现是递归的，这样的设计便于及时获取到哪些组件是已更新的状态，便于前台进行获取使用。

![截图](https://devopenclub.parryqiu.com/b_163a9e5552f30065fb1f7169e0885597.png)

[](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactReconciler.js#L111-L116)

![截图](https://devopenclub.parryqiu.com/b_e10857d849647114202c4b0de5b524bc.png)

[](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactCompositeComponent.js#L527)

到这里我们就把整个 React 的更新逻辑策略的部分走完了，接下来我们会继续看一下 React 如何进行页面UI 的更新以及一些遗留的小知识点。
