---
title: "实战课程「快速上手Ionic3 多平台开发企业级问答社区」常见问题 Q&A"
description: "课程分享了慕课的实战课程「快速上手Ionic3 多平台开发企业级问答社区」常见问题 Q&A,供参考。"
section: "parry-blog"
slug: "ionic-3-qa"
lang: "zh-CN"
status: "published"
tags: ["慕课实战课程","Ionic","技术文章"]
publishedAt: "2017-12-18T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/ionic-meta.jpg"
author: "Parry Qiu"
---
![截图](https://devopenclub.parryqiu.com/ionic-meta.jpg)

课程分享了慕课的实战课程「快速上手Ionic3 多平台开发企业级问答社区」常见问题 Q&A，供参考。

<!-- more -->

在 [此课程中][1] 虽然已经给大家记录了最详细的课程知识点与开发笔记的思维导图，但是随着同学们的学习深入，还是会遇到各种各样没有覆盖到的问题。

所以此手记作为学习 Ionic 课程的补充笔记。

## - 001 课程源码在哪里？
进入课程，在右侧的「课程资料下载」中即可以看到，下载学习即可。

## - 002 课程中提到的 Android 模拟器 Genymotion 在哪里下载个人免费版？
官方下载链接为: [https://www.genymotion.com/fun-zone/][2]

## - 003 关于modal 界面通过 nav 导航 push 到一个新页面时,手机的状态栏高度没有了问题
详细解答请见: [http://coding.imooc.com/learn/questiondetail/33935.html][3]

## - 004 removeView was not found 的错误解决
这是一个 issue，目前的解决方案请参见：[http://coding.imooc.com/learn/questiondetail/35563.html][4]

## - 005 安装相机以及图片上传插件错误的问题解决
各个插件版本之间存在依赖关系，请安装指定版本即可。
课程的思维导图已更新安装部分的笔记。
具体解决方案请参见：[http://coding.imooc.com/learn/questiondetail/35535.html][5]

## - 006 Android 项目编译失败的解决方案

当你使用 Android Studio 编译项目时出现了以下的错误。
> Unable to resolve dependency for ':@debug/compileClasspath': Could not resolve project :CordovaLib. Could not resolve project :CordovaLib.

> Required by: project :

> Project : declares a dependency from configuration 'debugCompile' to configuration 'debug' which is not declared in the descriptor for project >:CordovaLib.

> Unable to resolve dependency for ':@debugAndroidTest/compileClasspath': Could not resolve project :CordovaLib. Could not resolve project :CordovaLib.

> Required by: project :

> Project : declares a dependency from configuration 'debugCompile' to configuration 'debug' which is not declared in the descriptor for project >:CordovaLib.

> ...

![error](https://devopenclub.parryqiu.com/Jietu20171218-134359@2x.png)

原因是新版本的 gradle 配置不兼容导致。
请修改 Android 项目文件夹根目录下的 `build.gradle` 文件。
找到大概 251 行左右。

注释掉下面两行代码。

```
debugCompile(project(path: "CordovaLib", configuration: "debug"))
releaseCompile(project(path: "CordovaLib", configuration: "release"))
```

并添加一行代码。

```
compile project(':CordovaLib')
```

代码修改后如下。

![](https://devopenclub.parryqiu.com/Jietu20171218-140129@2x.png)

再进行编译即可成功编译。

## - 007 Ionic 项目启动白屏的问题

如果安装了最新的框架进行了项目的开发，最终编译的项目在一些较老的 Android 系统中运行时，启动的时候可能会出现一个白屏。

请安装 [Crosswalk](https://crosswalk-project.org/) 插件，让项目可以支持较老的系统。
在项目目录下执行以下命令。

```
cordova plugin add cordova-plugin-crosswalk-webview
```

执行完毕后再进行编译即可。
编译建议打开 Android Studio 进行编译，注意上面问题 006 中提到的问题。
编译后即可在模拟器中成功打开，没有了白屏。

![](https://devopenclub.parryqiu.com/Jietu20171218-140741@2x.png)

我将使用最新版本初始化的项目并安装了插件调试好的代码打包上传到了 [这里](https://pan.baidu.com/s/1c9BrPW)，你可以直接下载学习并查看相关配置。

## - 008 http 与 httpClient 使用
如果你没有按照课程安装固定版本的 Ionic，而是最新的版本，需要注意 http 与 httpClient 使用的区别。

* http 使用文档：[https://ionicframework.com/docs/native/http/](https://ionicframework.com/docs/native/http/)

* httpClient 使用文档：[ https://angular.io/guide/http#httpclient]( https://angular.io/guide/http#httpclient)

## - 009 如何在 TypeScript 项目中使用其他的第三方 JS 库

请参见我的博客文章：[在 Ionic2 TypeScript 项目中导入第三方 JS 库](http://blog.parryqiu.com/2016/09/18/import_js_to_ionic2_ts_project/)

## - 010 修改代码保存，控制台报错：events.js:160

慕课原问题地址（已解决）：[http://coding.imooc.com/learn/questiondetail/48134.html](http://coding.imooc.com/learn/questiondetail/48134.html)

![截图](https://devopenclub.parryqiu.com/b_b46039e8b8f93cc86b736e4823058b44.png)

解决方案为在项目文件夹下执行如下命令

```
npm install @ionic/cli-utils
npm i -D -E ws@3.3.2
```

  [1]: http://coding.imooc.com/class/163.html
  [2]: https://www.genymotion.com/fun-zone/
  [3]: http://coding.imooc.com/learn/questiondetail/33935.html
  [4]: http://coding.imooc.com/learn/questiondetail/35563.html
  [5]: http://coding.imooc.com/learn/questiondetail/35535.html
