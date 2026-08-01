---
title: "《React Native 精解与实战》书籍连载「Node.js 简介与 React Native 开发环境配置」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "rn-book-intro-nodejs-and-dev-config"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-08-10T12:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/fd356e72fdc96ee1add16c7047522e92.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/fd356e72fdc96ee1add16c7047522e92.png)

此文是我的出版书籍[《React Native 精解与实战》](http://rn.parryqiu.com/)连载分享，此书由机械工业出版社出版，书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战，以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示，精选了大量实例代码，方便读者快速学习。

书籍还配套了视频教程「80 节实战课精通 React Native 开发」，此视频课程建议配合书籍学习，书籍中原理性的东西讲解的比较清晰，而视频教程对于组件、API 等部分的代码实战开发讲解比较直观。

书籍相关所有资料请访问：[http://rn.parryqiu.com](http://rn.parryqiu.com/)
<!--more-->

本章将对开发过程中依赖的基础框架 Node.js 进行介绍，并深入讲解为什么使用到了此框架。同时我们将开始配置 React Native 的开发环境，并对最好用的代码编辑器 Visual Studio Code 以及相关高效开发插件做了详细地介绍。
## 2.1	Node.js 简介
此小节对 Node.js、npm 进行了介绍，以及对为什么需要使用到 Node.js 框架进行了介绍。
### 2.1.1	Node.js 简介
关于对于 Node.js 的定义，官网（https://nodejs.org）给出的定义如下。
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 Node.js 的包管理器 npm，是全球最大的开源库生态系统。
虽然只有几句话，但是已经很清楚地描述了 Node.js 以及 npm 的概念。
Node.js 本身不是一个新的开发语言，也不是一个 JavaScript 框架，而是一个 JavaScript 的运行时。底层为 Google Chrome V8 引擎，并在此基础上进行了封装，可用于创建快速、高效、可扩展的网络应用。Node.js 采用事件驱动与非阻塞 I/O 模型，以使得 Node.js 轻量并高效。
图 2-1 为 Node.js 的架构图，可以看到底层使用 C/C++ 编写。

* Chrome 的V8 引擎为 C++ 开发，负责将 JavaScript 代码转换成机器码，所以引擎的整体执行效率非常高。Google Chrome 浏览器的底层使用的就是此 V8 引擎；
* 线程池是完全使用 C 语言实现、全特性的异步 I/O 库 libeio，用于执行异步的输入输出、文件描述符、数据处理、sockets 等；
* libev 是在 Node.js 内部运行的 event loop，最早用于类 Linux 系统。event loop 是一个让多线程执行更加高效的程序结构；
* 这些框架实现的语言不一样，有 C，有 C++，还有 JavaScript，那么将这些代码整合在一起就是 Node bindings 做的事情；
* 最上层是使用 Node.js 开发时接触到的应用层，Node.js 提供了一系列标准的 JavaScript 类库供开发者使用。

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/98110a4a4bca7a5acf31693e468c792e.png)
图 2-1 Node.js 架构图

### 2.1.2	npm 简介
npm 是 Node.js 的包生态系统，是最大的开源生态系统。你可以理解为基于 Node.js 框架，全世界的开发者提交了各种各样的功能类库到 npm 中，其他开发者在开发过程中需要使用的大部分功能都可以在 npm 中找到已存在的库，完全不需要自己再重复去“造轮子”。
npm 官网（https://www.npmjs.com/）目前（2018 年 3 月）npm 上已有六十多万个包，是一个非常大的宝库，你可以下载、使用、学习各种类库，当然，你也可以贡献自己的类库到 npm 中供其他开发者使用。
你可以在 npm 中直接搜索你在开发过程中需要使用到的任何功能库，假设你需要一些关于 cookie 处理的 JavaScript 类库，图 2-2 就是在 npm 中搜索 cookie 相关类库的结果。使用 npm 库是你使用 React Native 开发 App 肯定会接触到的一个过程。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/aef63de960004a7c81f55a779cd74e12.png)
图 2-2 npm 中搜索类库

### 2.1.3	React Native 与 Node.js 关系
Node.js 提供了很多的系统级的如文件操作、网络编程等特性，并且是事件驱动、异步编程的。React 构建于 Node.js 之上，其实本质上 React 也是 npm 包中的一个，React Native 也是 npm 包之一，只不过是功能非常强大的包而已。所以整个的框架都构建于 Node.js 之上，并且 Node.js 还提供了海量的类库，在这个完整的生态系统下开发，过程将变得更加高效，在后续的章节学习中将会慢慢体会到此生态系统的价值。
## 2.2	React Native 开发环境配置
此小节我们将开始配置 React Native 的开发环境，包括 Node.js 的安装与 React Native 的安装，并介绍代码编辑器 Visual Studio Code 以及高效开发插件的安装，工欲善其事必先利其器，搭建一个完美的开发环境，学习起来才会更加顺畅。
### 2.2.1	安装 Node.js
Node.js 提供了多个平台的安装文件，同时也表明掌握了 Node.js，可以开发出很多跨平台的应用。
在图 2-3 的下载地址（https://nodejs.org/en/download/）中，显示了 Node.js 目前可以下载安装的平台。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/304e0e9c80eb02944424604884eb5189.png)
图 2-3 Node.js 下载页面

你可以根据自身不同的开发环境，下载对应的版本安装即可。Node.js 官方推荐下载 LTS 版本，LTS 俗称长效版，框架整体的变更不频繁、稳定可靠，一般用于上线版本，当然学习环境的安装也推荐安装此版本。
如果需要安装其他的版本，在此下载页面的底部有 Previous Releases 链接，可查看到 Node.js 已发布的所有版本安装包。
下面以 macOS 系统下的安装为例，进行 Node.js 的安装。Windows 等其他平台下载对应的安装包安装即可，整个过程没有需要特别配置的地方，只要注意 Node.js 的安装包分为 32 位和 64 位，下载你电脑对应的安装包即可，且需要安装最低版本为 4.0 以上的 Node.js。
这里演示的是 Node.js 6.11.3 版本的安装，如图 2-4，双击安装包进行安装，界面会有当前安装包包含的 Node.js 版本和 npm 版本的提示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/89007ae63011090321262b3127ee4fae.png)
图 2-4 安装 Node.js 的版本提示

安装程序后续会需要确认 Node.js 的 License，点击同意即可。安装程序同时会提示占用的系统空间，继续下一步。如图 2-5，安装程序会进行安装，安装完成后，会在界面中提示 Node.js 和 npm 最终安装的路径，你需要检查你系统的全局变量是否已包含了对应的目录，一般都是默认配置好的。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/43f05e53ed7108f882622f0690d5a4e2.png)
图 2-5 Node.js 安装完成的提示信息

在 Node.js 安装完成后，可以通过命令行检查 Node.js 以及 npm 有没有安装成功。打开 macOS 的终端或者 Windows 系统下的命令行工具，输入命令 node –v 可以查看到当前安装成功的 Node.js 版本信息，输入 npm –v 可以查看到当前连带安装的 npm 版本信息。
运行结果如图 2-6 所示，至此说明 Node.js 框架安装成功。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/3fceac44f40aedefe2276e22af9a87ab.png)
图 2-6 命令行查看 Node.js 和 npm 的版本信息

### 2.2.2	安装 React Native
在安装 React Native 框架之前，我们需要安装监控文件变更的组件 watchman，便于后期 React Native 项目的打包更新时提高性能之用。
在命令行中输入命令 brew install watchman 即可安装，前提确保系统中已安装好了 Homebrew（https://brew.sh/）。
安装过程如图 2-7 所示，首次更新 Homebrew 的时间可能稍长，耐心等待下即可。
注意在 Windows 环境下不需要进行 Homebrew 和 watchman 的安装，跳过此安装步骤即可。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e0f60c360a8465cc58710fe83825ab0c.png)
图 2-7 macOS 下安装 watchman

接下来我们开始安装 React Native，之前的章节在介绍 npm 时说过，React Native 也是一个 npm 的包，那么这里就可以通过 npm 命令进行 React Native 框架的安装。
图 2-8 为 React Native 在 npm 包中的项目页面，地址为：https://www.npmjs.com/package/react-native。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/5bfd7ca94e443aa70ce15a23dcd2080b.png)
图 2-8 npm 中 React Native 项目页面

在 npm 下安装一个包的命令格式为：npm install + 包的名称，如果加上参数 g，命令 npm install –g + 包的名称，就是全局安装，而不仅仅是在运行命令的当前目录中安装。
所以，我们通过 npm 命令执行安装 React Native CLI 的命令行工具即可，后续的 React Native 项目初始化都可以通过 React Native CLI 命令行工具进行执行。
安装命令为：npm install -g react-native-cli。
命令执行的结果如图 2-9 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/f0d1b56145651f6a4988c94b55f0ebbf.png)
图 2-9 安装 React Native CLI
下面我们在本书配套源码的 02-02-02 文件夹中执行第一个 React Native 项目的初始化，通过执行下面的命令进行初始化：react-native init HelloReact。
命令执行过程如图 2-10 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/3228bd6295646f228670a686884984dc.png)
图 2-10 初始化 React Native 项目
初始化完成后，最终生成的项目文件结构如图 2-11 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/5f9b66df93634f8c9f6fa1b5e06fb992.png)
图 2-11 React Native初始化项目结构

我们分别使用 Xcode 打开 ios 文件夹中的 iOS 项目以及使用 Android Studio 导入 android 文件夹中的 Android 项目。
iOS 平台的执行结果如图 2-12 所示，可以看到，React Native 构建的项目直接就适配好了 iPhone X，其他的 iOS 设备适配当然也没有任何问题。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e47ac06a665dee7c4f66b4defc741911.png)
图 2-12 项目在 iOS 平台下运行
Android 平台的执行结果如图 2-13 所示，同样，也可以完全适配。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/0223663440aede4345b4c41251c1e149.png)
图 2-13 项目在 Android 平台下运行
我们到目前还没有写任何一行代码，生成出来的 App 已经可以完美适配了 iOS 与 Android 两个平台，这正是 React Native 平台的魅力所在，后续的实战章节我们还将继续领略到此框架的魅力。
### 2.2.3	代码编辑器以及推荐插件
一个好的代码编辑器会让你的开发效率有成倍地提升，这里从性能、界面、插件生态系统以及编辑器的更新迭代情况综合考虑，推荐大家使用微软推出的、免费的 Visual Studio Code，的确非常地好用，可以说是目前前端开发的首选编辑器。图 2-14 是 Visual Studio Code 编辑器的基本界面，编辑器的左侧五个按钮依次为：项目文件浏览器、代码搜索、git 管理、调试工具、插件安装，右侧为代码编辑主界面，最下面的状态栏包含了如 git 信息、代码定位、代码中的错误与警告、文件编码、代码格式等相关信息。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/08003c7b0d298d33d8f40805df8da4be.png)
图 2-14 Visual Studio Code 编辑器
Visual Studio Code 还有一个很大的优势就是有很多增强开发效率的插件，这里推荐几个开发 React Native 项目必备的插件，这些插件会大大提高你开发的效率。你只需要直接在编辑器的插件选项中搜索名称即可安装。
Visual Studio Code 编辑器的插件安装界面如图 2-15 所示，在左侧的菜单按钮中选择插件菜单，然后你可以在图中标示的搜索框中搜索需要安装插件支持的语言或直接输入插件名称，在搜索结果列表中选择对应的插件点击安装按钮即可。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e721abc5e02c000c9472f2e82d0336ab.png)
图 2-15 编辑器插件安装

* React Native Tools
此插件提供 React Native 的开发环境，可以直接在编辑器中使用 React Native CLI 的命令，并可以对 React Native 框架提供的函数、参数、API 等进行智能提示，非常地方便。
插件地址：https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native/。

* ES7 React / Redux / GraphQL / React-Native snippets
此插件在开发时提供 React Native 中会使用到的 ES 语法，进行快速生成输入。
如导入模块命令 import moduleName from 'module' 可以直接使用 imp 输入、导出模块命令 export default moduleName 只需要输入 exp 即可。
熟悉这些命令之后，可以省去很多书写固定长代码的时间。
插件地址：https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets/。

* react-beautify
此插件用于快速格式化 React Native 开发过程中的 JavaScript、JSX 等代码，免去很多手动整理代码格式的过程，保持一个规范、整洁、易读的代码格式，是一个优秀软件工程师的必备素养。
插件地址：https://marketplace.visualstudio.com/items?itemName=taichi.react-beautify/。
