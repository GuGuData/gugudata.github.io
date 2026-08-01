---
title: "Ionic 3 延迟加载(Lazy Load)实战(一)"
description: "本文分享并演示了在 Ionic 3 框架中如何进行模块的延迟加载(Lazy Load)开发。"
section: "parry-blog"
slug: "ionic-lazy-load-part-1"
lang: "zh-CN"
status: "published"
tags: ["慕课实战课程","Ionic","延迟加载","技术文章"]
publishedAt: "2018-04-20T06:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/9da2a034e931c6c6f16183a98dcbbc79.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/9da2a034e931c6c6f16183a98dcbbc79.png)

本文分享并演示了在 Ionic 3 框架中如何进行模块的延迟加载（Lazy Load）开发。

<!-- more -->

本文分享并演示了在 Ionic 3 框架中如何进行模块的延迟加载（Lazy Load）开发。

在我的实战课程[「快速上手Ionic3 多平台开发企业级问答社区」](http://coding.imooc.com/class/163.html)中，因为开发的仿知乎 App 模块间的加载没有使用到延迟加载（懒加载，Lazy Load）的技术，而当有些同学在开发自己的 App 越来越复杂的时候，发现了模块加载的性能问题。

这时就出现了需要将模块延迟加载的需求，而 Ionic 3 的一个特性就是支持延迟加载，而且代码的变动非常小。

为了给各个阶段的同学一个开发演示，本文就直接给大家演示一下 Ionic 3 的模块延迟加载开发。

关于 Ionic 框架学习过程中遇到的各种常见问题，可以参见我从一千多个课程提问中给大家整理出来的常见问题 Q&A 文章。

* [实战课程「快速上手Ionic3 多平台开发企业级问答社区」常见问题 Q&A](http://blog.parryqiu.com/2017/12/18/ionic-3-qa/)
* [Ionic 1 & 2 开发常见问题 Q&A](http://blog.parryqiu.com/2016/12/05/ionic_qa/)

## 1. 项目初始化

首先通过 Ionic CLI 新建一个空项目，命令为 `ionic start lazyLoad blank`。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/24494f1c0577cf8be723186d0538917d.png)

空项目启动后如下图所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c85714ec0ac083655e60f69c7915e0f0.png)

在 `src/app/app.module.ts` 文件中的 `declarations` 与 `entryComponents` 节点下可以看到 Ionic 自动声明了 `MyApp` 与 `HomePage` 两个模块。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/1861b63fae75bb8040e28f1b4dd35086.png)

这样的默认配置方式，就会让所有声明的页面模块在 App 启动时一次加载起来，可能会造成相关的性能问题。

## 2. 模块的延迟加载

我们首先删除 `src/app/app.module.ts` 文件中的 `HomePage` 模块的声明以及调用。

然后在文件 `src/pages/home/home.module.ts` 中去单独定义 `HomePage` 模块的声明，代码如下图所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/a2430fa217d977d58fc6d4ad48572f3a.png)

并修改 `src/pages/home/home.ts` 添加 `@IonicPage` 装饰器的导入与调用，代码如下图所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/108076abf53df4cf5a77b66bf522190a.png)

并修改 `src/app/app.component.ts` 文件中的 `rootPage` 的定义。

```
rootPage:any = 'HomePage';
```

至此，我们就轻松地配置好了 `HomePage` 模块的延迟加载功能。

## 3. 测试延迟加载

我们打开 Chrome 的网络监控模板，刷新 App，可以看到 JavaScript 文件的请求与加载。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/7d151123c75f4f4fd108f5de39a96027.png)

main.js 文件是整个 App 框架以及相关依赖的打包文件，而 0.js 就是分离后的 HomePage 模块的代码，我们可以看到对应的模块已经在 main.js 之后进行了延迟加载。

而当你的 App 包含非常多页面的时候，你肯定不希望所有的页面模块一次都打包在 main.js 中并一次请求加载进来，所以，延迟加载可以实现「用到哪个页面模块就去加载哪个模块的代码」，可以大大提高 App 的运行性能。

后续的文章我们还将深入探究延迟加载的原理以及更加复杂的应用场景。
