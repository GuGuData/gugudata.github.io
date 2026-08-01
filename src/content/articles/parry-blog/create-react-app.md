---
title: "官方 React 快速上手脚手架 create-react-app"
description: "此文简单讲解了官方 React 快速上手脚手架的安装与介绍。"
section: "parry-blog"
slug: "create-react-app"
lang: "zh-CN"
status: "published"
tags: ["React","技术文章"]
publishedAt: "2017-04-05T07:36:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/b5fe0e1f579fea295b5efac36175ac68.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/b5fe0e1f579fea295b5efac36175ac68.png)

此文简单讲解了官方 React 快速上手脚手架的安装与介绍。

<!-- more -->

## 1. React 快速上手脚手架 create-react-app

为了快速地进行构建使用 React 的项目，FaceBook 官方发布了一个无需配置的、用于快速构建开发环境的脚手架工具 create-react-app。
当然，如果你需要 React Native 的脚手架项目，可以查看这里：[create-react-native-app](https://github.com/react-community/create-react-native-app/)

**使用的原因以及特性：**
* 无需配置；
* 集成了对 React, JSX, ES6 和 Flow 的支持；
* 集成了开发服务器；
* 配置好了浏览器热加载的功能；
* 在 JavaScript 中可以直接 import CSS 和图片；
* 自动处理 CSS 的兼容问题，无需添加 `-webkit` 前缀；
* 集成好了编译命令，编译后直接发布成产品，并且还包含了 sourcemaps。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/553fe811038973358c5017cec3c8f553.png)

## 2. create-react-app 的安装

命令行中使用 npm 执行安装命令 `npm install -g create-react-app`，注意需要添加 g 参数进行全局安装以及权限的问题。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/ecad80550dc805e5e881b159417f4748.png)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/bb50de9ac6f4b09f5a66643e33b9354b.png)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e8eee9850635d4874025bb6f5154942a.png)

安装后执行运行命令 `npm start` 即可在浏览器看到运行后的结果，并且已经实现了热加载的功能。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/f9d8b3d849562a49f189c9bf2cf2945b.png)

## 3. 需要注意的几个点

* Node 的版本必须 >= 4，推荐 Node >= 6 and npm >= 3；
* 运行起来后浏览器已经实现了热加载刷新，修改代码保存后浏览器会自动刷新；
* 执行 `npm test 或 yarn test` 可以执行测试动作，更多请参阅[这里](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)；
* 编译项目执行 `npm run build 或 yarn build`；
* 更多使用向导请插件[这里](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)。
