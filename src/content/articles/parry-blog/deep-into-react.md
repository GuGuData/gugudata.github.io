---
title: "React 与 React Native 底层共识:React 是什么"
description: "此系列文章将整合我的 React 视频教程与 React Native 书籍中的精华部分,给大家介绍 React 与 React Native 结合学习的方法,此小节主要介绍 React 的底层原理与机制。"
section: "parry-blog"
slug: "deep-into-react"
lang: "zh-CN"
status: "published"
tags: ["React","React Native","视频教程","技术文章"]
publishedAt: "2018-09-17T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/66e791b060a0c19f1de418b0218eef76.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/66e791b060a0c19f1de418b0218eef76.png)

此系列文章将整合我的 React 视频教程与 React Native 书籍中的精华部分，给大家介绍 React 与 React Native 结合学习的方法，此小节主要介绍 React 的底层原理与机制。

<!--more-->

目前 React 可以说是前端世界最火热的框架，具有高性能以及容易上手的特性，而且在掌握了 React 框架后，再学习其他类似 React 的框架也将变得更易上手。

关于 React 框架的高性能原因以及底层的重要概念，我们在后续的章节会陆续展开探讨，这一章节我们先来通过一个实际的案例来探究 React 的重要概念与特性。

如果你对 React 框架已非常熟悉，可以选择性地跳过此章节，直接阅读后续章节即可。

## 1. React 框架的安装
学习 React 框架，我们可以通过如下几种方式搭建开发环境进行快速地学习。

### 1.1 使用在线代码编辑器编写学习

在线编辑器中可以灵活地切换 React 的版本以及选择 Babel 作为 JSX 代码到 JavaScript 的预处理转换。
如官方推荐的在线代码编辑器 React 环境：[CodePen](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/ea40b51627fcabb888087a72d0a66bd7.png)

### 1.2 本地开发环境的搭建

#### 1.2.1 安装 Node.js

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 Node.js 的包管理器 npm，是全球最大的开源库生态系统。

Node.js 本身不是一个新的开发语言，也不是一个 JavaScript 框架，而是一个 JavaScript 的运行时。底层为 Google Chrome V8 引擎，并在此基础上进行了封装，可用于创建快速、高效、可扩展的网络应用。Node.js 采用事件驱动与非阻塞 I/O 模型，以使得 Node.js 轻量并高效。

Node.js 中包含了 npm 系统，npm 是 Node.js 的包生态系统，是最大的开源生态系统。你可以理解为基于 Node.js 框架，全世界的开发者提交了各种各样的功能类库到 npm 中，其他开发者在开发过程中需要使用的大部分功能都可以在 npm 中找到已存在的库，完全不需要自己再重复去“造轮子”。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/7d0289d2ae48ab1d3cb1205ed5f1d926.png)

Node.js 框架的安装只需要去 [Node.js 官网](https://nodejs.org/) 下载你对应平台的安装包直接安装即可。

#### 1.2.2 安装官方脚手架项目

create-react-app 脚手架项目存在于 npm 包系统中，所以可以直接通过 npm 命令在命令行工具中进行安装。

```shell
npm install -g create-react-app
```

之后即可通过命令行进行 React 项目的初始化。

```shell
create-react-app your-app-project-name
```

## 2. React 中的 JSX、state 与 props

JSX、state 与 props 是 React 框架最重要最基础的三个知识点，而从根本上说，你在掌握了这三个知识点后就可以使用 React 进行项目的开发了，其他的知识点基本上翻看下文档就可以快速掌握。

### 2.1 组件实例设计介绍

下面我们通过 React 组件化设计了两个页面组件：
1. 入口组件定义为 Index；
2. Index 组件中加载了一个子组件，定义为 BodyIndex；
3. Index 组件会向 BodyIndex 组件中传递两个参数：id 和 name；
4. BodyIndex 组件中还有一个自身的属性 username，并会在组件加载 5 秒后自动修改定义的值。

通过此实例，大家需要注意实例中的如下几个知识点：
1. React 组件的定义；
2. JSX 代码的语法结构；
3. 组件属性 state 的定义；
4. 组件通过 props 传递参数的方法。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/eba8f1ea2d0d83a10803807a16a4464e.png)

### 2.2 组件实例代码实现

#### 2.2.1 组件 Index 的代码实现

```jsx
/**
* index.js 定义了 React 项目的入口，Index 组件
*/

var React = require('react');
var ReactDOM = require('react-dom');
import BodyIndex from './components/bodyindex';
class Index extends React.Component {

    //页面表现组件渲染
    render() {
        return (
            <div>
                <BodyIndex id={1234567890} name={"IndexPage"}/>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('example'));
```

#### 2.2.2 子组件 BodyIndex 的代码实现

```jsx
/**
* bodyindex.js 定义了一个 BodyIndex 子组件
*/

import React from 'react';
export default class BodyIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "Parry"
        };
    }

    render() {
        setTimeout(() => {
            //5秒后更改一下 state
            this.setState({username: "React"});
        }, 5000);

        return (
            <div>

                <h1>子组件页面</h1>

                <h2>当前组件自身的 state</h2>
                <p>username: {this.state.username}</p>

                <h2>父组件传递过来的参数</h2>
                <p>id: {this.props.id}</p>
                <p>name: {this.props.name}</p>

            </div>
        )
    }
}
```

### 2.3 组件实例的页面表现与代码解释

浏览器中的运行效果如下图所示，并且在 5 秒后子组件的 state 定义的 username 值由 Parry 变成了 React。

你可以直接在本地编写代码运行测试或直接下载配套源码直接运行，运行后，注意此 state 页面值更新的部分，整个页面没有进行任何的重新刷新加载，而只是进行了局部的更新。

注意这里的局部更新你可能想到了熟悉的 Ajax 页面无刷新的更新操作，但是逻辑代码部分没有进行任何的页面 DOM 元素操作，而这正是 React 的核心以及高性能特性所在，具体的底层原理我们会在后续的章节深入讲解。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/8ee9fa2e2fe070d1119352c3da17d0a6.png)

对于实例代码中几个重要知识点的解释：
1. 组件定义头部使用 `require` 或 `import` 引入了一些必备的组件，后续 React 开发加载的第三方 npm 框架也使用此方法引入；
2. 组件 `Index` 中引入的子组件 `BodyIndex` 在页面布局中可以直接按照 HTML 的标签形式进行引用；
3. 子组件 `BodyIndex` 中通过 `props` 获取父组件传递过来的属性值；
4. 自身的属性通过 `state` 进行定义，页面的显示也直接通过 `state` 进行绑定，而后续在逻辑函数中修改了 `state` 值之后，页面绑定的值也会随之变更，并且变更的过程页面完全是无刷新的，这正式 React 框架的重要特性，页面的所有变更都是通过 `state` 值的变更驱动的。

以上完整代码你可以在 [JueJin-Book-React-Native-Demo](https://github.com/ParryQiu/JueJin-Book-React-Native-Demo) 处下载。

***系列文章其他相关资源***

> 我的「React.js 入门与实战」视频教程：[http://coding.imooc.com/class/83.html](http://coding.imooc.com/class/83.html)

> 我的《React Native 精解与实战》书籍：[http://rn.parryqiu.com/](http://rn.parryqiu.com/)

> 我的更多免费原创视频教程：[https://devopen.club/](https://devopen.club/)

## 3. 小结

此章节和大家一起通过对 React 开发环境的构建以及一个实际的组件实例学习了 React 中最基础的三个概念：JSX、state 与 props，并领略到 React 构建的页面更新完全是通过后台 state 值的变更驱动的，这有别于我们之前接触的前台框架，是通过直接操作 HTML DOM 结构进行页面的更新。

而 React 框架这样设计的优势以及背后的底层原理，我们在接下来的几个章节会进行逐步深入地探讨，以便切合此系列文章的定位，而在使用 React 开发过程中遇到的任何其他细节问题，你都可以通过下方的留言向我提问即可，这里限于篇幅就不对 React 框架的基本使用展开讲解。
