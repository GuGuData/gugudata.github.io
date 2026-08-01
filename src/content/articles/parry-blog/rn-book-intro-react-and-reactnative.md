---
title: "《React Native 精解与实战》书籍连载「React 与 React Native 简介」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "rn-book-intro-react-and-reactnative"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-08-09T12:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/fd356e72fdc96ee1add16c7047522e92.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/fd356e72fdc96ee1add16c7047522e92.png)

此文是我的出版书籍[《React Native 精解与实战》](http://rn.parryqiu.com/)连载分享，此书由机械工业出版社出版，书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战，以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示，精选了大量实例代码，方便读者快速学习。

书籍还配套了视频教程「80 节实战课精通 React Native 开发」，此视频课程建议配合书籍学习，书籍中原理性的东西讲解的比较清晰，而视频教程对于组件、API 等部分的代码实战开发讲解比较直观。

书籍相关所有资料请访问：[http://rn.parryqiu.com](http://rn.parryqiu.com/)
<!--more-->

这一章节中我们将对 React 与 React Native 的基本概念进行介绍。从 React 产生的背景到 React 的框架详细介绍，同时也对 React 的底层实现原理进行了简单的介绍，然后过渡到对 React Native 的基本概念进行了介绍。

这一章节你将对 React 与 React Native 框架的发展、框架之间的关系有一个基本的了解，具体的技术细节在后续的章节将有更加详细的讲解与实战。

## 1.1	React 简介
React 框架是一个非常优雅、现代的前端开发框架，下面我们将对 React 框架产生的背景与 React 框架的发展历史进行介绍，并通过一个小的实例更加直观地了解 React 框架的结构以及核心特性，在此基础上对 React 框架优秀性能表现的原因从底层进行了剖析。
### 1.1.1	React 产生的背景
React 框架最早孵化于 Facebook 内部，Jordan Walke 是框架的创始人。作为内部使用的框架，在 2011 年的时候 React 框架被用于 Facebook 的新闻流 （newsfeed）以及 2012 年使用在了 Instagram 项目上。在 2013 年五月美国的 JSConf 大会上，React 框架项目被宣布了开源。

图 1-1 为 GitHub 上 React 的开源项目截图，GitHub 地址为：https://github.com/facebook/react/。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/831d85cf0781490ba50298b820d0d43c.png)
*图 1-1 GitHub 上的 React 项目*

React 框架产生的缘由是在当时的技术背景下，前端 MVC （Model-View-Controller） 框架性能不能满足 Facebook 项目的性能需求以及扩展需求，所以 Jordan Walke 索性就自己着手开始写 React 框架，这真是一种值得学习的精神。

在 Facebook 内部极其复杂的项目中，当时面临的一个问题是，MVC 架构的项目当 Model 和 View 有数据流动时，可能会出现双向的数据流动，那么项目的调试以及维护将变得异常复杂。

### 1.1.2	React 框架简介
React 官方也说自己不是一个 MVC 框架 （https://reactjs.org/blog/2013/06/05/why-react.html），或者说 React 只专注于 MVC 框架设计模式中的 View 层面的实现。
为了大大减少传统前端直接操作 DOM 的昂贵花费，React 使用 Virtual DOM （虚拟 DOM）进行 DOM 的更新。

图 1-2 为 React 框架的基本结构，此图清晰明了地描述出了 React 底层与前端浏览器的沟通机制。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/a3c3e5b9ac91ff9e767f0a05776f5037.png)
*图 1-2 React 框架结构*

React 的组件是用户界面的最小元素，与外界的所有交互都通过 state 和 props 进行传递。通过这样的组件封装设计，使用声明式的编程方式，使得 React 的逻辑足够简化，并可以通过模块化开发逐步构建出项目的整体 UI。

React 框架中还有一个重要的概念是单向数据流，所有的数据流从父节点传递到子节点。假设父节点数据通过 props 传递到子节点，如果相对父节点（或者说相对顶层）传递的 props 值改变了，那么其所有的子节点（默认在没有使用 shouldComponentUpdate 进行优化的情况下）都会进行重新渲染，这样的设计使得组件足够扁平并且也便于维护。

以下的示例代码演示了 React 框架基本组件定义以及单向数据流的传递。

***完整代码在本书配套源码的 01-01-02 文件夹。***

我们在 index.js 文件中定义 React 项目的入口，render 函数中使用了子组件 BodyIndex，并通过 props 传递了两个参数，id 和 name，用于从父组件向子组件传递参数，这也是 React 框架中数据流的传递方式。

```
1.	/**
2.	 * 章节: 01-01-02
3.	 * index.js 定义了 React 项目的入口
4.	 * FilePath: /01-01-02/index.js
5.	 * @Parry
6.	 */
7.
8.	var React = require('react');
9.	var ReactDOM = require('react-dom');
10.	import BodyIndex from './components/bodyindex';
11.	class Index extends React.Component {
12.
13.	    //生命周期函数 componentWillMount，组件即将加载
14.	    componentWillMount(){
15.	        console.log("Index - componentWillMount");
16.	    }
17.
18.	    //生命周期函数 componentDidMount，组件加载完毕
19.	    componentDidMount(){
20.	        console.log("Index - componentDidMount");
21.	    }
22.
23.	    //页面表现组件渲染
24.	    render() {
25.	        return (
26.	            <div>
27.	                <BodyIndex id={1234567890} name={"IndexPage"}/>
28.	            </div>
29.	        );
30.	    }
31.	}
32.
33.	ReactDOM.render(<Index/>, document.getElementById('example'));
```

在子组件 BodyIndex 中，其自身定义了 state 值，并通过 setTimeout 函数在页面加载 5 秒后进行 state 值的修改。页面表现层代码部分演示了如何读取自身的 state 值以及读取父组件传递过来的 props 值。

```
1.	/**
2.	 * 章节: 01-01-02
3.	 * bodyindex.js 定义了一个名为 BodyIndex 的子组件
4.	 * FilePath: /01-01-02/bodyindex.js
5.	 * @Parry
6.	 */
7.
8.	import React from 'react';
9.	export default class BodyIndex extends React.Component {
10.	  constructor() {
11.	    super();
12.	    this.state = {
13.	      username: "Parry"
14.	    };
15.	  }
16.
17.	  render() {
18.	    setTimeout(() => {
19.	      //5秒后更改一下 state
20.	      this.setState({username: "React"});
21.	    }, 5000);
22.
23.	    return (
24.	      <div>
25.
26.	        <h1>子组件页面</h1>
27.
28.	        <h2>当前组件自身的 state</h2>
29.	        <p>username: {this.state.username}</p>
30.
31.	        <h2>父组件传递过来的参数</h2>
32.	        <p>id: {this.props.id}</p>
33.	        <p>name: {this.props.name}</p>
34.
35.	      </div>
36.	    )
37.	  }
38.	}
```

项目的 package.json 文件配置以及使用的相关框架版本如下，具体的配置方法以及意义后续章节会有详细讲解。

```
1.	{
2.	  "name": "01-01-02",
3.	  "version": "1.0.0",
4.	  "description": "",
5.	  "main": "index.js",
6.	  "scripts": {
7.	    "test": "echo \"Error: no test specified\" && exit 1"
8.	  },
9.	  "author": "",
10.	  "license": "ISC",
11.	  "dependencies": {
12.	    "babel-preset-es2015": "^6.14.0",
13.	    "babel-preset-react": "^6.11.1",
14.	    "babelify": "^7.3.0",
15.	    "react": "^15.3.2",
16.	    "react-dom": "^15.3.2",
17.	    "webpack": "^1.13.2",
18.	    "webpack-dev-server": "^1.16.1"
19.	  }
20.	}
```

在命令行执行 webpack-dev-server 命令后，浏览器中的运行效果如图 1-3 所示，并且在 5 秒后子组件的 state 定义的 username 值由 Parry 变成了 React。

你可以直接在本地编写代码运行测试或直接下载本书配套源码直接运行，运行后，注意此 state 页面值更新的部分，整个页面没有进行任何的重新刷新加载，而只是进行了局部的更新，背后的原理在下面的一小节会展开讲解。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/8b4a4d17ca07fd889d661da3ed23344d.png)
*图 1-3 代码在浏览器中的执行结果*

### 1.1.3	React 底层原理
React 框架底层的核心为 Virtual DOM，也就是虚拟 DOM。此小节将介绍这个最主要的底层特性，只有在你理解了 React 框架底层的本质，才能更好地帮助你理解 React 框架的前端表现，并为后续章节讨论 React Native 框架的性能优化进行一定的知识储备。

传统的 HTML 页面更新页面元素，或者说需要更新页面，都是将整个页面重新加载实现重绘，执行这样的操作不管是对于服务器还是在用户体验上，“花费”都是非常昂贵的。后来，开始有了 AJAX（Asynchronous JavaScript And XML）这样的局部更新技术，实现了页面局部组件的异步更新，不过 AJAX 在代码的编写、维护、性能以及更新粒度的控制上还是没有达到一个完美的状态。

文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标志语言的标准编程接口。在 HTML 网页上，组织页面（或文档）的对象元素被组织在一个树形结构中，用来表示文档中对象的标准模型就称为 DOM。

React 通过在框架底层设计了一个虚拟 DOM，此虚拟 DOM 与页面上的真实 DOM 进行映射，当业务逻辑修改了 React 组件中的 state 部分，如上例中，子组件的 state 值，username 由 Parry 修改成了 React，React 框架底层的 diff 算法会与页面 DOM 比较计算，哪些部分更改了，通过比较虚拟 DOM 与真实 DOM 的差异，最终只更新真实 DOM 与虚拟 DOM 差异的部分。此计算过程是在内存中进行的，并最终只更新差异的部分，所以 React 在前端中的高性能表现正是来自于此底层的设计。

图 1-4 展示了 React 中的虚拟 DOM 与页面真实 DOM 之间的关系，之间的差异通过 React 框架底层的 diff 算法进行计算。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/59394030e90891d6b5f283c0f9b2f758.png)
*图 1-4 React 虚拟 DOM 与页面真实 DOM*

如果需要更加深入一步了解 React 在源码级别的实现原理，可以参考我博客里从 React 的源码角度对 React 底层批量更新 state 策略的分析文章。

o	深入理解 React JS 中的 setState
http://blog.parryqiu.com/2017/12/19/react_set_state_asynchronously/
o	从源码的角度再看 React JS 中的 setState
http://blog.parryqiu.com/2017/12/29/react-state-in-sourcecode/
o	从源码的角度看 React JS 中批量更新 State 的策略（上）
http://blog.parryqiu.com/2018/01/04/2018-01-04/
o	从源码的角度看 React JS 中批量更新 State 的策略（下）
http://blog.parryqiu.com/2018/01/08/2018-01-08/

### 1.1.4	React 优势
通过上面对 React 框架的简介、代码演示以及底层原理的解析得知，React 最大的优势在于更新页面 DOM 时，对比于之前的前端更新方案，效率大大提高。其实 React 并不会在 state 更改的第一时间就去执行 diff 并立即更新页面 DOM，而是将多次操作汇聚成一次批量操作，这样再次大大提升了页面更新重绘的效率，这部分在分享的源码分析文章中有详细地讲解，感兴趣的朋友可以直接参考我博客中的对 React 框架的深入剖析。

使用 React 框架开发，我们不会通过 JavaScript 代码直接操作前端真实 DOM，而是完全通过 state 以及 props 的变更引起页面 DOM 的变更，这比 jQuery 等框架那样进行大量的 DOM 查找与操作来得简单、高效的多。

React 框架在开源生态下，已经有大量的相关开源框架与组件可供使用，非常适合项目的快速开发。
以上这些 React 框架的优势，同时也会转化成 React Native 框架的优势，所以这些也是学习 React Native 框架的必备背景知识，希望大家深入体会与实战。

## 1.2 React Native 简介
在了解到了 React 框架的基本概念、发展历史以及底层基本原理后，我们再来学习 React Native 的基本概念将变得更加容易。

下面我们将介绍 React 与 React Native 的关系，在对 React Native 框架有了基本了解后，我们将会深深地体会到为什么选择 React Native 框架进行移动 App 开发是一个最佳的选择。

### 1.2.1	React 与 React Native 关系
Facebook 曾致力于使用 HTML 5 进行移动端的开发，最终发现与原生的 App 相比，体验上还是有非常大的差距，并且这种差距越来越大，特别是性能方面的差距。

最终，Facebook 放弃了 HTML 5 的技术方向，结合之前章节介绍的 React 框架的发展历史，2015 年 3 月，Facebook 正式发布了 React Native 框架，此框架专注于移动端 App 的开发。

在最初发布的版本中，我们只可以使用 React Native 框架开发 iOS 平台的 App，在 2015 年 9 月，Facebook 发布了支持 Android 平台的 React Native 框架。至此，React Native 框架真正实现了跨平台的移动 App 开发，此消息简直就是移动开发人员的福音。

图 1-5 为 GitHub 上 React Native 的开源项目，GitHub 地址为：https://github.com/facebook/react-native/。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/a17675fe23772f304a4fb8faae92d00b.png)
*图 1-5 GitHub 上 React Native 开源项目*

### 1.2.2	React Native 简介
React Native 框架在 React 框架的基础上，底层通过对 iOS 平台与 Android 平台原生代码的封装与调用，结合前台的 JavaScript 代码，这样我们就可以通过 JavaScript 代码编写出调用 iOS 平台与 Android 平台原生代码的 App，调用原生代码编写的 App 的性能远远优于使用 HTML 5 开发的 App 性能，因为 HTML 5 开发的 App 只是在 HTML 5 外部包裹上一个程序外壳后在移动平台上运行，在性能与可以实现的功能上都不能达到 React Native 框架的水准。

React Native 框架提供了原生组件与底层 API 供开发者使用，这些自带的组件与 API 已足够满足移动端 App 的开发需求，后续章节会详细展开讲解这些组件与 API 的概念与使用实战演示。

React Native 框架还提供了与 iOS 平台、Android 平台混合开发的接口，让开发者可以在 React Native 中调用 iOS 平台与 Android 平台中任意的原生 API 与代码，让可以在原生平台实现的任何功能都可以在 React Native 框架中得以实现，后续章节同样会详细展开讲解并进行实战开发。

在使用 React Native 框架开发移动平台 App 的过程中，我们可以直接使用 CSS 进行页面元素的布局，这是 iOS 与 Android 原生移动平台开发者简直不可想象的事情。

开发人员在具备了 React 框架基础知识后，可以更加快速地进行 React Native 框架的学习与开发。图 1-6 为 React Native 官网截图，代码展示了我们只需要使用类似 HTML 5（JSX）的代码就可以进行跨平台的移动 App 开发。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/cded7779eb1d728ff0df87ef5b1b2daa.png)
*图 1-6 React Native 演示代码*

#### 1.2.3	React Native 优势
底层采用 React 框架，减少了我们的学习与开发成本，React Native 框架可以让你真正跨越移动开发的鸿沟，不需要分开学习 iOS 平台与 Android 平台的特定语法、页面布局以及各平台的特别处理技巧，使用一套 React Native 代码的部署就可以覆盖多个移动平台。

React Native 性能优化的已足够好，完全可以避开之前使用 HTML 5 开发移动 App 的性能障碍。
React Native 框架的 JavaScript Core 底层，可以让 App 轻松实现更新操作，基本上更新一下 JavaScript 文件，整个 App 就完成了更新，非常适合用来开发 App 的热更新。热更新的功能在后续章节也会详细讲解与实战开发。

React Native 框架同时也使得 App 的开发调试变得异常简单，不需要像之前在多个平台、多个语言、多个工具之间跳来跳去，React Native 开发的 App 在模拟器或真机中，只需要像刷新浏览器一样就可以即时查看到代码修改后的效果，并且还可以在 Chrome 浏览器中查看控制台输出、加断点、单步调试等等，整个过程完全就是 JavaScript 开发调试的体验，整个开发的体验非常畅快。

图 1-7 为使用 React Native 框架开发时，在 iOS 系统下的开发调试选项截图，非常的强大、方便。Android 平台提供了同样的调试选项。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c207c61c578769fb3e2789622403ce8a.png)
*图 1-7 React Native 开发调试*

## 1.3 React Native 前置知识点
在正式开始学习 React Native 框架前，我们梳理一下需要具备的一些基本知识，因为 React Native 毕竟是进行多平台的移动 App 开发，涉及到的知识点比较多，而且底层的 React 框架有别于目前既有的一些前端框架知识，供你在学习前进行自我梳理与学习准备。

o	掌握 HTML 5 的基本知识；
o	掌握 JavaScript 的基础知识，如果有 React 的基础知识学习起来会更加地轻松；
o	掌握 CSS 布局的基本知识，在 React Native 中会使用 CSS 直接进行页面元素的布局与样式控制；
o	接触过移动端的开发更好，项目的后期会涉及到两个平台的 App 打包、部署与上架，不过这些知识点后续章节都会进行讲解；
o	Node.js 以及 npm 包管理的知识，这部分后续章节同样会有详细地讲解。
