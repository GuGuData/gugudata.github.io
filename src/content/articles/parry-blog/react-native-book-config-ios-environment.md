---
title: "《React Native 精解与实战》书籍连载「配置 iOS 与 Android 开发环境」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "react-native-book-config-ios-environment"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-08-24T08:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/01fd40aa5af29d6d6471e692dfa30510.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/01fd40aa5af29d6d6471e692dfa30510.png)

此文是我的出版书籍[《React Native 精解与实战》](http://rn.parryqiu.com/)连载分享，此书由机械工业出版社出版，书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战，以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示，精选了大量实例代码，方便读者快速学习。

书籍还配套了视频教程「80 节实战课精通 React Native 开发」，此视频课程建议配合书籍学习，书籍中原理性的东西讲解的比较清晰，而视频教程对于组件、API 等部分的代码实战开发讲解比较直观。

***书籍相关所有资料请访问：[http://rn.parryqiu.com](http://rn.parryqiu.com/)***

<!--more-->

本章将介绍在开发前的一些准备工作，包括 iOS 和 Android 的开发与调试环境的搭建，并对 React Native 中的一些调试属性做一些说明，介绍 Chrome 远程调试代码的技巧，以及 React Developer Tools 工具的安装与应用。

## 5.1	配置 iOS 开发环境
首先我们需要配置 iOS 平台的开发环境（只可以在 Mac 系统下进行 iOS 平台应用的开发），Apple 为开发者提供了非常易用、强大、环境整合的开发工具 Xcode，用于开发基于 iPhone、iPad、Apple Watch 以及 Mac 平台的应用程序。
Xcode 开发工具提供了开发、测试、打包以及整个项目发布上架的功能，这些操作都可以在 Xcode 中完成，是 Mac 下真正的一站式开发工具。
下面介绍并演示 iOS 开发环境的基本安装与运行项目进行调试的过程。
1. 打开 App Store 搜索 Xcode，点击安装后等待下载完毕并自动完成安装，如图 5-1 所示。

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/8979bb2f8a16589d6f547919523df955.png)
图 5-1 Xcode 的安装

2. 使用 Xcode 打开项目，这里我们直接打开课程配套源码文件夹中的 02-02-02 文件夹，此项目为本书第二章中建立的初始化项目，找到文件夹中的 /HelloReact/ios/HelloReact.xcodeproj 打开，xcodeproj 后缀的文件为 Xcode 的项目文件，如图 5-2 所示。

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/b5384afb8b69b629831061da7ac7379a.png)
图 5-2 使用 Xcode 打开 iOS 项目

3.	选择对应的模拟器后，点击运行按钮即可启动项目，首先 React Native 会启动一个 React Packager 用于将源码打包成 bundle js 文件，并用于后期调试时的 Live Reload 以及 Hot Reloading 使用，如图 5-3 所示。
在 JavaScript 打包完成后，模拟器会自动启动并自动运行对应的 App，如图 5-4 所示。

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/bf5d85b7a76b8747ea76410d60891a34.png)
图 5-3 React Packager 控制台

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/8067dee10008c339314fcf584c370732.png)
图 5-4 选择模拟器并运行项目

4.	iOS App 启动后的效果如图 5-5 所示。

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/8c6677a7170f86b707140095b006fda8.png)
图 5-5 iOS 项目启动效果

修改项目 App.js 源码中的第 6 行代码，从初始化项目中的 Welcome to React Native 修改成 Hello React Native，保存后并在模拟器中使用快捷键 Command + R 进行刷新，React Packager 控制台会自动重新打包，iOS App 界面立即进行了自动刷新，如图 5-6 与 图 5-7所示。

```jsx
1.	export default class App extends Component<{}> {
2.	  render() {
3.	    return (
4.	      <View style={styles.container}>
5.	        <Text style={styles.welcome}>
6.	          Welcome to React Native!
7.	        </Text>
8.	        <Text style={styles.instructions}>
9.	          To get started, edit App.js
10.	        </Text>
11.	        <Text style={styles.instructions}>
12.	          {instructions}
13.	        </Text>
14.	      </View>
15.	    );
16.	  }
17.	}
```

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/eb94370b5d33acb3916bacbf5a072e78.png)
图 5-6 React Packager 自动重新打包

 ![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/667169b2a80d7d721c2eabcca2055f47.png)
图 5-7 App 界面自动刷新

## 5.2	配置 Android 开发环境
Android Studio 是一个为 Android 平台开发应用程序的集成开发环境。2013 年 5 月 16 日在Google I/O 上发布，可供开发者免费使用。Android Studio 基于 JetBrains IntelliJ IDEA，为 Android 开发特殊定制，并在 Windows、mac OS 和 Linux 平台上均可运行。
Android Studio 的功能非常丰富，其主要具备的特点如下：

* 可视化布局：WYSIWYG 编辑器、实时编码、实时程序界面预览；
* 开发者控制台：优化提示、协助翻译、来源跟踪、宣传和营销曲线图；
* Beta 版本测试，并阶段性展示；
* 基于 Gradle 的构建支持；
* Android 特定代码重构和快速修复；
* Lint 提示工具更好地对程序性能、可用性、版本兼容和其他问题进行控制捕捉；
* 支持 ProGuard 和应用签名功能；
* 基于模板的向导来生成常用的 Android 应用设计和组件；
* 自带布局编辑器，可让开发者拖放 UI 组件，并预览在不同尺寸设备上的 UI 显示效果等等；
* 支持构建 Android Wear 应用；
* 内置 Google Cloud Platform 支持，支持 Google Cloud Messaging 和 App Engine 的集成。

下面介绍并演示 Android Studio 开发环境的基本安装与测试运行项目的过程。
1.官网下载并安装 Android Studio 开发工具，并下载配置好对应的 Java SDK。官网地址为：https://developer.android.com/studio/index.html。

2.下载并完成安装后，打开 Android Studio 找到右侧的 Import project，导入 02-02-02 项目文件夹中的 /HelloReact/android/ 文件夹，如图 5-8 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/e81c699b71c1ba3d216a5f026575ac58.png)
图 5-8 导入 Android 项目

3.在导入 Android 项目后，Android Studio 会自动加载对应版本的 Gradle 进行项目的构建，此过程根据你的网络状况，可能耗时较长。项目自动构建完成后，如图 5-9 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c15f2ffd8bde05a41b54ac5c207f52a9.png)
图 5-9 Android Studio 项目打开

4.在项目完成 Gradle 构建后，启动 Android Studio 自带的 Android 模拟器，并点击启动按钮，开始项目的编译并自动完成项目在模拟器中的调试运行。同样，此过程 React Native 会自动启动 React Packager 进行源码的打包并供后期调试时的 Live Reload 以及 Hot Reloading 使用。执行过程分别如图 5-10 与 图 5-11 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/21c16c05854f26c89ffb6f14e1608254.png)
图 5-10 Android 环境下的 React Packager

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/2757f75bd9c2e7fb842d558933ce9f89.png)
图 5-11 Android 模拟器执行效果
