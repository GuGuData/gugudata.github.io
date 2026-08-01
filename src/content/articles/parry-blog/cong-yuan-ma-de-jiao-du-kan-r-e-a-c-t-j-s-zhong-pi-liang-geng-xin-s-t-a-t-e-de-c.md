---
title: "从源码的角度看 React JS 中批量更新 State 的策略(上)"
description: "在之前的文章「深入理解 React JS 中的 setState」与 「从源码的角度再看 React JS 中的 setState」 中,我们分别看到了 React JS 中 setState 的异步表现,并从源码的角度简单地了解了 React 中 setState 的设计结构以及原理。"
section: "parry-blog"
slug: "cong-yuan-ma-de-jiao-du-kan-r-e-a-c-t-j-s-zhong-pi-liang-geng-xin-s-t-a-t-e-de-c"
lang: "zh-CN"
status: "published"
tags: ["React","技术文章"]
publishedAt: "2018-01-04T07:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/b_796defbe6dab968aef4943cba7c6bf97.png"
author: "Parry Qiu"
---
![截图](https://devopenclub.parryqiu.com/b_796defbe6dab968aef4943cba7c6bf97.png)

在之前的文章「[深入理解 React JS 中的 setState](http://blog.parryqiu.com/2017/12/19/react_set_state_asynchronously/)」与 「[从源码的角度再看 React JS 中的 setState](http://www.imooc.com/article/22426)」 中，我们分别看到了 React JS 中 setState 的异步表现，并从源码的角度简单地了解了 React 中 setState 的设计结构以及原理。

<!-- more -->

这篇文章继上篇文章后，继续从源码的角度来了解 React 中对 State 批量更新策略的定义。

*同样，源码的部分为了保证格式正常就直接截图了，查看源码点击对应的链接直接跳转至 GitHub 查看即可。*

## 1. setState 的源码实现
在 setState 的源码实现中，传递过来的参数就被定义成了 `partialState`，从参数名以及参数的说明中就可以看到，这只是 state 的一部分。
默认都会调用 `this.updater.enqueueSetState(this, partialState)` 将 state 放进更新队列中去。
而如果有传递回调函数过来的话，会执行 `this.updater.enqueueCallback(this, callback)`，涉及到回调函数的部分，我们后续文章会继续进行分析。

![截图](https://devopenclub.parryqiu.com/b_d31620608c325c94d2de6a63eb043e10.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/isomorphic/modern/class/ReactComponent.js#L60)

## 2. 更新队列 ReactUpdateQueue 的定义

在上面的 `setState` 定义中，我们可以看到有一个 `updater` 的调用。
具体的定义如下。

![截图](https://devopenclub.parryqiu.com/b_dcc09a0f8729a2fd832b7c499f40f7fe.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/isomorphic/modern/class/ReactComponent.js#L30)

而初始的 `updater` 的定义如下。

![截图](https://devopenclub.parryqiu.com/b_e82b647b94b5407ba22ecfc8bda86f85.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactCompositeComponent.js#L193)

这样最终的更新队列都指向了 ReactUpdateQueue 的源码定义中。

## 3. ReactUpdateQueue 中的 enqueueSetState

我们可以看到 ReactUpdateQueue 中的 `enqueueSetState` 的定义。

![截图](https://devopenclub.parryqiu.com/b_6bea2d9d92170d8a2e33f4421d6c0a0d.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactUpdateQueue.js#L218-L234)

继续去跟 `enqueueUpdate(internalInstance)` 的实现。

![截图](https://devopenclub.parryqiu.com/b_dab6a6df3e44184a2f57cfc116e7658a.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactUpdateQueue.js#L23)

## 4. ReactUpdates 中的 enqueueUpdate

到这里，我们回到了上篇文章看到 ReactUpdates 的位置。

![截图](https://devopenclub.parryqiu.com/b_69436d574f03929c388f49dcd223ec87.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactUpdates.js#L198)

我们继续看函数开始的部分，注入的两个部分。

![截图](https://devopenclub.parryqiu.com/b_66c5d4bfc2695091265eda4112089de0.png)

[源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/shared/reconciler/ReactUpdates.js#L29)

注入了两个部分，`ReactReconcileTransaction` 以及 `batchingStrategy`。

ReactReconcileTransaction 主要用于在更新 state 时，页面 UI 元素的修正以及在执行生命周期函数时，处理好生命周期函数与其他用户自定义函数之间的执行顺序与逻辑，具体的实现可以参考它的源码。

[ReactReconcileTransaction 源码地址](https://github.com/facebook/react/blob/v0.14.7/src/renderers/dom/client/ReactReconcileTransaction.js)

到这里，我们从 setState 的定义开始，梳理好了在进行更新策略前的逻辑部分，下篇文章，我们将直达 batchingStrategy 的内部实现，看看 React 的更新逻辑策略的实现。
