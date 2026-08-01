---
title: "React Native 教程:001 - 如何运行官方控件示例 App"
description: "本文主要讲解了如何运行 React Native 官方控件示例 App,包含了一些 React Native 的基础知识以及相关环境的配置。 <!-- more -- React Native 以及示例 App 简介 关于 React Native 的简要介绍。 {% blockquote http://facebo…"
section: "parry-blog"
slug: "react-native-course-how-to-run-official-example-app"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","React Native","开源组件","技术文章"]
publishedAt: "2016-02-19T12:56:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_86a5741d03f08d47c43519ce315f7a17.png"
author: "Parry Qiu"
---
本文主要讲解了如何运行 React Native 官方控件示例 App，包含了一些 React Native 的基础知识以及相关环境的配置。
<!-- more -->
## React Native 以及示例 App 简介
关于 React Native 的简要介绍。
{% blockquote http://facebook.github.io/react-native/ %}
React Native 结合了 Web 应用和 Native 应用的优势，可以使用 JavaScript 来开发 iOS 和 Android 原生应用。在 JavaScript 中用 React 抽象操作系统原生的 UI 组件，代替 DOM 元素来渲染等。
React Native 使你能够使用基于 JavaScript 和 React 一致的开发体验在本地平台上构建世界一流的应用程序体验。React Native 把重点放在所有开发人员关心的平台的开发效率上——开发者只需学习一种语言就能轻易为任何平台高效地编写代码。Facebook 在多个应用程序产品中使用了 React Native，并将继续为 React Native 投资。
{% endblockquote %}

在官方的 [Getting Started](http://facebook.github.io/react-native/docs/getting-started.html) 文档中，讲解了所有组件、API 以及不同平台下的使用，但是官方的文档和示例代码是不带任何一个截图的，理解起来比较困难，特别是对于初学者。

其实在 React Native 的 [GitHub](https://github.com/facebook/react-native) 中已经提供了示例 App 的所有代码，我们只要下载后编译运行即可。

对应的代码路径如下：

![截图](https://devopenclub.parryqiu.com/blog_86a5741d03f08d47c43519ce315f7a17.png)

## 示例 App 运行配置的注意点
### 依赖包安装
因为 React Native 的相关组件也是依赖于 npm 的包管理，所以在项目下载下来后需要初始化依赖包，方法是在项目文件根目录运行 `npm install` 初始化安装即可。注意是 GitHub 获取下来的根目录，因为 `package.json` 在此目录下，相关知识请查阅 npm 的使用。

![截图](https://devopenclub.parryqiu.com/blog_a01b37bc1d0968c7578c3f7bac6075d7.png)

### 选择相应的 js bundle 加载方式
在 iOS 项目的 AppDelegate.m 文件中，注意下面这段 js bundle 的加载方式的选择。

{% codeblock lang:objc%}
/**
 * Loading JavaScript code - uncomment the one you want.
 *
 * OPTION 1
 * Load from development server. Start the server from the repository root:
 *
 * $ npm start
 *
 * To run on device, change `localhost` to the IP address of your computer
 * (you can get this by typing `ifconfig` into the terminal and selecting the
 * `inet` value under `en0:`) and make sure your computer and iOS device are
 * on the same Wi-Fi network.
 */

//sourceURL = [NSURL URLWithString:@"http://localhost:8081/Examples/UIExplorer/UIExplorerApp.ios.bundle?platform=ios&dev=true"];

/**
 * OPTION 2
 * Load from pre-bundled file on disk. To re-generate the static bundle, `cd`
 * to your Xcode project folder and run
 *
 * $ curl 'http://localhost:8081/Examples/UIExplorer/UIExplorerApp.ios.bundle?platform=ios' -o main.jsbundle
 *
 * then add the `main.jsbundle` file to your project and uncomment this line:
 */

sourceURL = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
{% endcodeblock %}

* 一种你可以选择服务器路径的模式，即在运行的时候使用 `npm start` 生成一个服务端供请求 js bundle；
* 另一种方式是编译生成 js 后直接打包进 App 里，脱离对服务端的请求，针对此示例 App ，推荐使用这种方法，可以装在自己的真机上随时随地打开研究。

## 运行效果

运行起来后的效果如图所示。

![截图](https://devopenclub.parryqiu.com/blog_1d5de34795025ea374a807b4782800f0.png)

![截图](https://devopenclub.parryqiu.com/blog_acbff4e982becac19f3902c04015986f.png)

## 结语
React Native 从 2015 年开始热起来，2016 年必将是其更加火热的一年，开发易学、跨平台，非常好的产品，示例程序 App 也基本满足了我们学习基础组件和 API 的需求，所以此文帮助您搭建好学习此技术的一个重要的环境，有任何问题欢迎留言指教、交流。
