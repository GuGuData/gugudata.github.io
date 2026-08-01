---
title: "Ionic 1 & 2 开发常见问题 Q&A"
description: "不过可以使用 crosswalk-webview 去适配一些老版本以及提高 WebView 的性能。"
section: "parry-blog"
slug: "ionic-qa"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-12-05T01:30:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/ionic_qanda.jpg"
author: "Parry Qiu"
---
![Ionic Q&A](https://devopenclub.parryqiu.com/ionic_qanda.jpg)
本文分享了在 Ionic 1 & 2 版本开发过程中常见问题的一些 Q&A，供慕课网同学或其他朋友参考。
<!-- more -->

## 1. 版本的问题
Ionic 2 目前属于快速迭代更新的版本，版本的更新会带来如文件结构和少许代码的变更，不过底层还是构建于 Angular 2 以及 22 版本后引入了 TypeScript 语言，所以整体的语法结构不会有太大的变化，建议直接安装最新的版本学习，如果需要安装和课程一样的 22 版本，请参见我的博客：[在 Ionic 2 项目中强制使用 22 版本](http://blog.parryqiu.com/2016/10/13/imooc_lesson_force_using_version_22_in_project/)，如果学习的是最新的版本，请参见最新的文档查询最新的语法定义：[Ionic 2.0 相关资料](http://blog.parryqiu.com/2016/08/25/ionic_references/)，特别是 `ionic serve` 出错的时候，请参见最新的环境安装文档。

## 2. 安装失败的问题
因为需要加载国外的资源，所以最推荐的安装方式就是翻墙安装，翻墙后可以避免掉很多的安装坑。
如何要通过 CNPM 进行安装，请参见博文：[使用 CNPM 进行 Ionic 环境的安装与配置](http://blog.parryqiu.com/2016/08/18/ionic_installation/)，不过 CNPM 安装会遇到国内源不同步时计算包的 HASH 值不一样而安装出错的情况。

## 3. 在 Ionic2 TypeScript 项目中导入第三方 JS 库
我已写成单独的博文，请参见：[http://blog.parryqiu.com/2016/09/18/import_js_to_ionic2_ts_project/](http://blog.parryqiu.com/2016/09/18/import_js_to_ionic2_ts_project/)

## 4. 新版本中的生命周期定义
Ionic 2 更新到了 30 版本后，框架在全局对生命周期的命名做了改变，所以本文简单整理一下新的生命周期事件和说明如下。
官方文档地址在[这里](http://ionicframework.com/docs/v2/api/components/nav/NavController/)。

| 事件名称 | 事件说明 |
| --- | --- |
| ionViewLoaded | 页面加载完毕触发。该事件发生在页面被创建成 DOM 的时候，且仅仅执行一次。如果页面被缓存（Ionic默认是缓存的）就不会再次触发该事件。该事件中可以放置初始化页面的一些事件。 |
| ionViewWillEnter | 即将进入一个页面变成当前激活页面的时候执行的事件。 |
| ionViewDidEnter | 进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。 |
| ionViewWillLeave | 将要离开了该页面之后变成了不是当前激活页面的时候执行的事件。 |
| ionViewDidLeave | 在页面完成了离开该页面并变成了不是当前激活页面的时候执行的事件。 |
| ionViewWillUnload | 在页面销毁和页面中有元素移除之前执行的事件。 |
| ionViewDidUnload | 在页面销毁和页面中有元素移除之后执行的事件。 |

## 5. Ionic 各平台支持版本
### 5.1. Ionic 1
支持的平台以及版本

* iOS 7+
* Android 4.1

不过可以使用 [crosswalk-webview](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview) 去适配一些老版本以及提高 WebView 的性能。

### 5.2. Ionic 2
支持的平台以及版本

* iOS 8+
* Windows 10 Universal App
* Android 4.4+

同样，如果你使用 [crosswalk-webview](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview) 可以将 Android 的版本支持降低到 4.1 版本。

## 6. 没有 iOS 开发者账号如何部署到真机
请参见博文：[没有 iOS 开发者账号的情况下部署到真机的方法](http://blog.parryqiu.com/2016/09/20/Ionic_Deploying_to_a_Device_without_an_Apple_Developer_Account/)

## 7. Ionic 1 开发过程中的参见问题 Q&A
版本 1 开发过程的常见问题，我单独整理成了博文：[Ionic 开发中遇到的问题以及后期发布 iOS/Android 的方方面面](http://blog.parryqiu.com/2015/11/22/ionic-development-issues/)，对于 Ionic 2 的学习也是具有参考意义的。

## 8. Ionic2 下处理 Android 设备下返回按钮的事件
请参见单独的博文：[Ionic2 下处理 Android 设备下返回按钮的事件](http://blog.parryqiu.com/2016/09/25/ionic2_android_handling-the-hardware-back-buttons/)

## 9. 阻止事件冒泡
{% codeblock lang:html%}

<button (click)="myFunction($event, myParam)">Click Me</button

{% endcodeblock %}

{% codeblock lang:js%}

myFunction(event: Event, myParam: any){
    event.preventDefault();
}

{% endcodeblock %}

## 10. 为什么没有 App 文件夹
项目初始化后要进行平台的添加，可以通过命令 `ionic platform add ios`  和 `ionic platform add android` 分别添加 iOS 平台和 Android 平台，添加后就可以看到 App 文件夹以及添加的对应平台。

## 11. 最新版本的安装注意点
官方最新的文档已经给出了最新的安装命令，注意安装 ionic 的时候已经不需要添加上 `@beta` 的后缀了。
官方链接：[http://ionicframework.com/docs/v2/setup/installation/](http://ionicframework.com/docs/v2/setup/installation/)
安装命令：`npm install -g ionic cordova`
初始化命令：`ionic start cutePuppyPics --v2`
运行：`ionic serve`

## 12. 一些文档与开源项目
请参考博文：[http://blog.parryqiu.com/2016/08/25/ionic_references/](http://blog.parryqiu.com/2016/08/25/ionic_references/)
