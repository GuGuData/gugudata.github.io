---
title: "Ionic 入门与实战之第二章第一节:Ionic 环境搭建之开发环境配置"
description: "本文是「Ionic 入门与实战」系列连载的第二章第一节,主要对 Ionic 的开发环境配置做了简要的介绍,本文介绍的开发环境为 Mac 系统,Windows 系统基本类似,少许差别请查阅相关文档即可。 <!-- more -- 1. Ionic 环境的安装 1.1 Node.js 与 npm 介绍 Node.js 与…"
section: "parry-blog"
slug: "ionic-chapter-2-install"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","书籍连载","技术文章"]
publishedAt: "2016-04-26T12:56:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_aee2ddce46b4b8a4942f5bb1bd108aa5.png"
author: "Parry Qiu"
---
本文是「Ionic 入门与实战」系列连载的第二章第一节，主要对 Ionic 的开发环境配置做了简要的介绍，本文介绍的开发环境为 Mac 系统，Windows 系统基本类似，少许差别请查阅相关文档即可。
<!-- more -->
## 1. Ionic 环境的安装
### 1.1 Node.js 与 npm 介绍
Node.js 与 npm 是 Ionic 环境的基础，这里我们做一下简要介绍。
[Node.js](https://nodejs.org/en/) 是基于 Chrome's V8 JavaScript engine 构建的一个JavaScript runtime （一般翻译为 JavaScript 运行时），特点是事件驱动、非阻塞等。
[npm](https://www.npmjs.com/) 是 Node.js 中的 JavaScript 包管理。目前已经是最大的开源组件库，使用起来非常方便，也非常值得学习。
以上两个组件，只需要安装 Node.js 即可。

* Mac 系统中，下载 pkg 安装；
* Windows 系统中，下载对应的 msi 安装，注意 32 位和 64 位版本的区别。

下载地址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
安装后，可以通过 `node -v` 查看当前版本，确认是否安装成功或者查看当前的 Node.js 版本。

![截图](https://devopenclub.parryqiu.com/blog_aee2ddce46b4b8a4942f5bb1bd108aa5.png)

Ionic 推荐安装 Node.js 的版本为 v4.0+，即高于 4.0 的版本即可。
### 1.2 Ionic 的安装
这里使用最新的 v2.0 beta 版本进行学习，而且 2.0 版本对于 1.0 版本的所有功能都进行了兼容，所以项目如果从 1.0 转成 2.0，也是可以平滑过渡的。
安装 Ionic，使用以下命令即可。

```
$ npm install -g ionic@beta
```

如果需要安装 Ionic 1.0 版本，使用如下命令即可。

```
$ npm install -g ionic
```

## 2.初始化空项目并体验
安装了 Ionic 后，使用如下命令初始化一个空项目，名称为 ionicdemo。

```
$ ionic start ionicdemo --v2
```

`ionic start` 命令默认采用 [tabs template](https://github.com/driftyco/ionic2-starter-tabs) 作为初始化项目的模板，如果需要其他的模板，那么在项目名称后面添加上对应的模板名称即可，如要使用 [tutorial template](https://github.com/driftyco/ionic2-starter-tutorial) 作为模板，那么命令如下。

```
$ ionic start ionicdemo tutorial --v2
```

其他的模板列表参见[这里](https://github.com/driftyco?utf8=%E2%9C%93&query=ionic-starter)。

注意这里的 `--v2` 参数，因为 ionic 命令是和 1.0 版本公用的，所以添加 `--v2` 参数明确了使用2.0 版本去初始化项目。
此过程主要安装了必要的 npm modules，并且安装依赖的 Cordova 组件。
这里还有一个技巧，就是如果想使用 [TypeScript](https://www.typescriptlang.org/)，那么只要在命令后面添加 `--ts` 参数即可。

进入项目目录。

```
$ cd ionicdemo
```

运行，在浏览器中查看效果。

```
$ ionic serve
```

![截图](https://devopenclub.parryqiu.com/blog_d7beb034677ef513bff9dd1bc1f83c0f.png)

当需要在浏览器中模拟 iPhone 下的 UI 展示，需要选择对应的模拟设备，刷新即可。

![截图](https://devopenclub.parryqiu.com/blog_3c852451b6488df89e80d7214006bc79.png)

这里的原理是 Chrome 修改了对应的 User-Agent，Ionic 根据此进行了对应的 UI 呈现。
在控制台中可以看到。

![截图](https://devopenclub.parryqiu.com/blog_02c51d09a6386a531cfe075acbd51f93.png)

使用浏览器进行开发调试是非常方便的方案，不需要频繁连接真机，并且可以方便直观地借助 Chrome 控制台进行样式、JavaScript 等调试。
如果需要在模拟器上运行，那么 iOS 设备执行下面的命令即可。

```
$ ionic run ios
```

如果是 Android 设备，那么执行下面的命令。

```
$ ionic run android
```

这样就可以在对应的模拟器上运行了，至于详细的 iOS/Android 的环境配置，我们在下面的章节将有详细地讲解。
