---
title: "深入理解 React JS 中的 setState"
description: "此文主要探讨了 React JS 中的 setState 背后的机制,供深入学习 React 研究之用。"
section: "parry-blog"
slug: "react-set-state-asynchronously"
lang: "zh-CN"
status: "published"
tags: ["React","视频教程","技术文章"]
publishedAt: "2017-12-19T14:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/c365c0837685374cfdfa71dc8bf4d666.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c365c0837685374cfdfa71dc8bf4d666.png)\

此文主要探讨了 React JS 中的 setState 背后的机制，供深入学习 React 研究之用。

<!-- more -->

在课程 [React.js入门基础与案例开发](http://coding.imooc.com/class/83.html) 中，有些同学会发现 React JS 中的 setState 的表现好像有点怪异，和理解中的 state 更新机制不太一样，下面我们就来简单探讨下 setState 背后的机制。
课程中的其他常见小问题请常见 [React.js 开发参见问题 Q&A](http://blog.parryqiu.com/2017/03/09/react-q-and-a/)。

## 1 setState 问题的复现

我们看下面一段简单的代码，代码通过点击一个按钮，改变 state 中的 clicked 值。在修改值后进行 clicked 值的输出，你尝试猜测一下输出的值是什么？

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/7e54558179afd75b13667619c636a675.png)

许多同学在自己写代码遇到类似逻辑的时候都会发现，`console.log(this.state.clicked);` 这段代码输出的不是我们预期的 true，而是 false。
这是为什么呢？

## 2 setState 的内部机制

遇到问题我们还是去官方文档找线索。
我们看到 state 的章节有下面这段话。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e04c5177e0f92159800f121e8086bc16.png)

文章链接在这里：[https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)。

我们会发现其实 React 的 setState 方法是一个异步的方法，React 会将所有的 setState 方法打包成一次进行更新，类似于快递点寄快递，囤积了一些包裹后一次投递，而不是你每次修改 state 都会进行更新。
这样的设计主要是为了提高 UI 更新的性能，我们知道 React 中 state 的改变会导致 UI 的更新。
如果需要进行同步操作逻辑，那么在回调函数里添加逻辑即可。

{% codeblock lang:js%}

handleClick = () => {
  this.setState({
    clicked: true
  }, () => console.log(this.state.clicked)) //这时候输出的是 true
}

{% endcodeblock %}

## 3 state 的更新时机

任何 state 的更新都会导致 React 进行重新渲染。`props` 也会导致 React 进行重新渲染。组件与父组件的更改同样也会引起 React 的重新渲染。
那么我们有没有办法手动控制 React 是否进行渲染呢？
这里，你应该想起来生命周期函数里有一个方法 `shouldComponentUpdate`。
[shouldComponentUpdate 方法官方文档](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)。
此方法默认每次在需要进行重新渲染时返回 true，但是在这个函数里你可以添加自己的逻辑，控制 React 不进行渲染以及渲染的条件。
那么，同样，我们也可以在此函数中定义那些我们关注的 state ，只有当它们变化才让 React 进行重新渲染，而其他一些不相关的 state 的值即使变化了，我们也可以让 React 不进行渲染。
理解了这些，那么在你进行相关性能优化时就非常有用。
