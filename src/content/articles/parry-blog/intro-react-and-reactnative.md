---
title: "一次掌握 React 与 React Native 两个框架"
description: "此系列文章将整合我的 React 视频教程与 React Native 书籍中的精华部分,给大家介绍 React 与 React Native 结合学习的方法。"
section: "parry-blog"
slug: "intro-react-and-reactnative"
lang: "zh-CN"
status: "archived"
tags: ["React","React Native","视频教程","技术文章"]
publishedAt: "2018-09-14T06:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/66e791b060a0c19f1de418b0218eef76.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/66e791b060a0c19f1de418b0218eef76.png)

此系列文章将整合我的 React 视频教程与 React Native 书籍中的精华部分，给大家介绍 React 与 React Native 结合学习的方法。

<!--more-->

## 1. 软件开发语言与框架的学习本质
我们在开始系列文章的技术点内容前，花一点时间探讨一下软件开发语言以及框架的学习本质，相对于整个技术点的讲解，花这一点一起思考的时间是值得的。

相信看此系列文章的朋友都已有了非常多的软件开发经验，而当我们回顾语言与框架的学习过程时，所有语言的基础语法都大同小异，无非基础数据类型、条件判断、分支判断、循环处理等等。而差别或者说最重要的是在框架的底层本质，也就是为什么会产生此框架、底层的优势是什么、为什么不用别的框架、框架的底层与设备之间是如何实现通信的等等。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/081791bf128bc477f3f93efeee1c339c.png)

我们在开发的过程中，遇到的一些基础语法问题、框架使用问题，基本上只要灵活使用一下搜索引擎都能找到答案，有句话说：你要相信你遇到的技术难题在这个世界上肯定有其他人也遇到了。

而当我们需要抓住本质，对语言与框架有更加深入地了解、进行技术选型时、知道每一种技术的优劣、当框架的表现出现了一些诡异问题时会迅速定位问题、优化项目的性能，以及成为某一领域的专家时，最高效的学习方法就是直接去接触语言与框架的底层本质。

如 JavaScript 中的深拷贝与浅拷贝，如果只是进行数据类型的深拷贝与浅拷贝，即使你忘记了处理逻辑，你只要通过搜索引擎搜索就可以找到很多的实现方法，而如果你想一次掌握好此知识点，那么就需要你直接去学习数据结构以及数据类型对应的值类型与引用类型的区别，只有在掌握此部分的知识点后，在遇到数据类型的「诡异」表现时你才能抓住问题本质。

再如你在使用 React Native 框架提供的各种组件与 API，如访问移动设备的相册与摄像头、震动、GPS 定位、网络状态、消息推送以及整个 React Native 框架生态下提供的成千上万的第三方功能组件时，其实底层都是 React Native 框架与 iOS、Android 平台通信的实现。在原理章节掌握了原理后，后续的章节我们还会一起自己动手来实现一个与 iOS、Android 平台通信的自定义组件。

学习、精通语言与框架最好的方法就是直接掌握其最本质的部分。

## 2. React 与 React Native 框架简介
React 框架最早孵化于 Facebook 内部，作为内部使用的框架，在 2011 年的时候 React 框架被用于 Facebook 的新闻流并于 2012 年使用在了 Instagram 项目上。在 2013 年五月美国的 JSConf 大会上，React 框架项目被宣布了开源。

在移动开发方面，Facebook 曾致力于使用 HTML 5 进行移动端的开发，最终发现与原生的 App 相比，体验上还是有非常大的差距，并且这种差距越来越大，特别是性能方面的差距。
最终，Facebook 放弃了 HTML 5 的技术方向，结合之前介绍的 React 框架的发展历史，2015 年 3 月，Facebook 正式发布了 React Native 框架，此框架专注于移动端 App 的开发。

React 作为构建高性能 Web 应用的框架，React Native 作为构建跨 iOS 与 Android 平台 App 应用的框架，极其繁杂的开发生态造成了很多朋友对 React / React Native 框架产生了些许误解，认为框架太过庞杂混乱，造成了学习成本与开发成本的增加。

此系列文章将带领大家深入探究 React 与 React Native 框架的本质，只有在掌握了框架本质后，才能快速地领略到这两个孪生框架的核心，不仅可以在这两个框架间灵活切换学习，还可以不被繁杂的框架生态所蒙蔽，最终达到以不变应万变的境界。

## 3. 将 React 与 React Native 结合在一起学习
从上面的 React 与 React Native 简介即可看到，两个框架算是孪生项目，而 React Native 的底层也就是 React 框架。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/32557a57f948e09fb412c78ae2e23f46.png)

React 框架使用 JSX（JavaScript eXtension，可以理解为看起来像 HTML 的 JavaScript）指定 React 组件的输出定义，而逻辑函数的部分依然是采用 JavaScript ES6 来编写，所以对于前端开发人员来说上手非常地容易。

编写的代码通过 React 框架渲染在 Web 浏览器中运行，所以 React 可以用来开发 Web 项目，当然借助第三方的组件还可以开发桌面项目，这些我们在后续会进行相关介绍。

React Native 依然由 JSX 进行组件布局的开发，框架中组件开发的原理与思想与 React 框架一致，而且底层都由最重要的 state 进行驱动。

React 与 React Native 除了在编码表现层都使用 JSX 语法外，在 React 与 React Native 的底层都有 Virtual DOM 与 DOM 之间的映射与转换，以实现了页面组件高效更新的前端表现。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/0a5500e44cc29dea17fd4e8e86f0c9c5.png)

用户看到的表现层（Browser DOM）的更新，底层都是由 state 驱动了 Virtual DOM 进行变动前与变动后的比较，最终将需要重新渲染的 DOM 进行渲染展示。

而这种通过只修改 state (Model) 值引起 HTML (DOM) 变化的框架设计模式就是我们熟悉的 MVVM (Model-View-ViewModel) 模式。

以前我们可以通过直接操作 HTML 元素的形式进行页面的更新，如下面的这段 jQuery 代码。

```js
$('#container').text('Updated Content...')
```

当这样的代码在页面更新非常复杂的项目中使用时，你会疲于通过操作 DOM 元素更新，映射后台大量的数据更新。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c0de2e3ac9999b407523d1b22a2d3e0f.png)

而 MVVM 模式，如目前的前端框架 Vue、Angular 和我们介绍的 React 都是基于此设计模式，将页面呈现 View 与后台的数据模型 Model 进行了分离解耦，使得我们只需要专注于 Model 的处理，通过修改 Model 中的属性值，引起前端 View 的变化，不过 React 默认的数据绑定方式是单向绑定，这一部分的差异我们后续章节会展开讨论。

对于 MVVM 模式的体验以及如何通过修改 Model 引起 View 的更新，大家可以查看下一小节，我会给大家具体的代码演示。

而目前的移动端开发方面，「原生开发」是指 iOS 平台通过 Objective-C 或 Swift 语言开发并通过 Xcode 编译打包发布 iOS App，Android 平台通过 Java 语言开发并通过 Android Studio 编译打包发布 Android App。

通过下图我们可以看到「原生开发」的学习成本以及后期 App 维护的成本，而 React Native 则是通过 JavaScript 开发，然后通过框架提供的与对应平台之间的 bridge 进行通信，实现了只用一套代码可以直接部署到 iOS 与 Android 平台并编译出对应平台的 App。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/6eb46357d8a94395fd952a2e99fc9913.png)

并且 React Native App 页面布局直接通过 HTML 和 CSS 的前端基础技术进行布局与开发，大大降低了学习成本。

你如果早就在心里有开发一个自己 App 的想法，而刚好你有前端开发的技能，React Native 一定会是你孵化自己 App 最好的选择。

## 4. 系列文章的内容范围
本系列文章会从 React 的基本使用方法开始，并会讲解到 React 的底层原理，并从一些实际案例中探讨出 React 底层对于前台表现的原因。底层原理会结合独立的算法以及 React 框架的源码进行详细解释。

之后会讲解演示 React Native 的基本使用，同时会解释 React Native 框架与 React 框架的关系、React Native 的性能问题、以及 React Native 与 iOS、Android 平台通信的原理，抛却 React Native 纷杂的各种类库，直达 React Native 的底层原理，掌握了原理后才能看懂所有表象的类库实现原理。并会动手自己实现 iOS 平台与 Android 平台的自定义组件，深入掌握各种第三方组件的实现原理。

> 我的「React.js 入门与实战」视频教程：[http://coding.imooc.com/class/83.html](http://coding.imooc.com/class/83.html)

> 我的《React Native 精解与实战》书籍：[http://rn.parryqiu.com/](http://rn.parryqiu.com/)

> 我的更多免费原创视频教程：[https://devopen.club/](https://devopen.club/)

## 5. 小结
这一小节给大家描绘了整体安排以及学习的本质，接下来我们会先从 React 底层原理开始，掌握好这两个框架最本质的部分。

任何知识的学习过程都不会是「舒服」的过程，只有跳离自己的舒适区，才能有进步，所以遇到任何疑问或想交流的问题，大家只需在文章下留言即可，我都会与大家交流。
