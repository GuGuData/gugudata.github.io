---
title: "《React Native 精解与实战》书籍连载「React Native 中的生命周期」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "react-natvie-lifecycle"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-08-16T06:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/fd356e72fdc96ee1add16c7047522e92.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/fd356e72fdc96ee1add16c7047522e92.png)

此文是我的出版书籍[《React Native 精解与实战》](http://rn.parryqiu.com/)连载分享，此书由机械工业出版社出版，书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战，以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示，精选了大量实例代码，方便读者快速学习。

书籍还配套了视频教程「80 节实战课精通 React Native 开发」，此视频课程建议配合书籍学习，书籍中原理性的东西讲解的比较清晰，而视频教程对于组件、API 等部分的代码实战开发讲解比较直观。

***书籍相关所有资料请访问：[http://rn.parryqiu.com](http://rn.parryqiu.com/)***

<!--more-->

## 3.5	生命周期概念
任何生命体都会经历从出生到消亡的过程，而 React Native 框架中的组件同样具有这样的属性。
在组件生命周期的每个阶段，React Native 提供了多个生命周期函数，供开发者作为切入组件生命周期的钩子（hook），这样在对应的时间点程序就可以做对应的逻辑处理，从而实现相应的功能。
在 React Native 程序启动时，内部的虚拟 DOM 开始建立，生命周期就是建立在此虚拟 DOM 的整个生命周期之中，从虚拟 DOM 的初始化到虚拟 DOM 的卸载，React Native 为组件的不同状态建立了不同的生命周期。
## 3.6	React Native 中的生命周期
在图 3-4 中，可以看到在 React Native 虚拟 DOM 的几个大的阶段中，都有对应的生命周期函数存在。
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/8c6aedfcf1e55ed4471479149b963743.png)
图 3-4 React Native 生命周期
### 1.	初始化阶段
此阶段进行组件的默认 props 和 state 的设定，可通过如下代码赋值。
```
static defaultProps = {
    autoPlay: false,
    maxLoop: 10,
};
```
### 2. 加载阶段
此阶段为组件开始实例化的阶段，比如当该组件开始被其他组件调用的时候。主要包含以下三个生命周期函数。
* componentWillMount：组件将要开始加载，需要在组件开始加载前添加一些业务逻辑，那么就可以添加在此函数中。

* render：组件开始根据 props 和 state 生成页面的 DOM，并在最后返回此 DOM。在此函数中不可以修改 props 和 state 的值，只可以读取，并且返回的 DOM 只能有一个顶层元素，比如说只能由一个 div 包裹所有的元素进行返回。

* componentDidMount：组件已加载完毕，在 render 函数之后立即执行此函数。一般可以在这里进行网络请求，因为组件 UI 渲染好之后再进行网络请求，一般不会造成 UI 的错乱问题。在此生命周期函数中修改设置了 state 的值后，UI 会立即进行重新渲染，所以是一个通过加载网络数据更新 UI 的好时机。
### 3.	更新阶段
此阶段一般因为用户操作或者父组件有更新时，当组件因为 props 或 state 的变更导致组件重新渲染时，会经历此阶段。而在更新渲染的几个重要时机，React Native 提供了如下的生命周期函数供开发者执行对应的逻辑操作。
* componentWillReceiveProps：当接收到新的 props 值更新时，会执行到此生命周期函数，此时可以将接收到的 props 值赋值给 state。

* shouldComponentUpdate：在此生命周期中，可以通过逻辑判断新的 props 和 state 的变更需不需要引起组件的 UI 更新，默认是都会引起更新的，但是 React Native 提供了此生命周期供开发者自主决定是否需要更新。如果让此函数返回 True，那么组件将进行更新，如果返回 False，那么组件就不更新。此生命周期在优化 App 性能时非常重要，因为可以通过此生命周期函数拦截掉很多不必要的组件 UI 更新。

* componentWillUpdate：如果上面的生命周期函数 shouldComponentUpdate 返回了 True，那么此生命周期函数将继续执行，表示组件即将进行更新操作。在更新操作前，还有时机进行相关的逻辑处理。但是从逻辑上你也应该明白，这里不可以再修改 state 的值，而只可以做一些进行更新前的其他准备工作。

* componentDidUpdate：组件更新完毕之后执行的生命周期函数。此函数有两个参数 prevProps 和 prevState，分别为更新前的 props 与 state。这里可以进行一些新旧值的比较，如果发现值有变化可以进行一些网络请求、加载数据等操作。
### 4.	卸载阶段
* componentWillUnmount：此生命周期函数在组件被卸载和注销前执行，这里可以进行一些所谓的扫尾工作，如关闭掉之前的网络请求、一些不必要存储的清空、循环执行的定时器的清除等等。

至此，React Native 一个组件的完整生命周期执行完毕，你可以通过下面的代码体会 React Native 每个生命周期的执行过程。实际开发时只需要根据实际的项目需求在对应的生命周期函数中添加上自己的业务逻辑即可。
```
/**
* 章节: 03-06
* React Native 中的生命周期
* FilePath: /03-06/lifecycle.js
* @Parry
*/

import React, { Component } from 'react';
import { AppRegistry,View,Text } from 'react-native';

export default class LifeCycle extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name: "React"
    }
  }

  //组件即将加载
  componentWillMount() {
    console.log("componentWillMount");
  }

  //开始组件渲染
  render() {
    console.log("render");
    return (
      <View>
        <Text>
          {this.state.name}
        </Text>
      </View>
    );
  }

  //组件加载完毕后
  componentDidMount() {
    console.log("componentDidMount");
  }

  //组件接收到新的 props
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }

  //逻辑控制是否需要更新组件
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
  }

  //组件即将更新重新渲染
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate");
  }

  //组件重新渲染后
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  //组件卸载注销前
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}

AppRegistry.registerComponent('LifeCycle', () => Main);
```
## 3.7	本章小结
本章如同修炼武功中必备的内功一样，看起来和使用 React Native 框架的关系不大，而且底层原理的部分理解起来还有点晦涩难懂。不过，如果你想成为一个精通 React Native 框架的开发者，而不仅仅是一个使用者的话，这部分的内容是非常重要的，而且在后期你遇到此框架的难题时，你可以快速地根据这部分底层原理性的知识快速定位到问题所在。其他软件开发语言的学习原则也是如此，希望能对你有所有启发。
