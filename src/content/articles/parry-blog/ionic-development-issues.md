---
title: "Ionic 开发中遇到的问题以及后期发布 iOS/Android 的方方面面"
description: "此篇文章主要整理了最近在使用 Ionic 开发 Hybrid App 过程中遇到的一些疑难点以及后期发布生成 iOS 和 Android 版本过程中的种种问题。"
section: "parry-blog"
slug: "ionic-development-issues"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","App开发","教程","咕咕监控","极光推送","开源项目"]
publishedAt: "2015-11-22T14:55:38.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/3c0709d18ce520a9fe9e26e9020a3364.png"
author: "Parry Qiu"
---
此篇文章主要整理了最近在使用 Ionic 开发 Hybrid App 过程中遇到的一些疑难点以及后期发布生成 iOS 和 Android 版本过程中的种种问题。

<!--more-->

## 1. Ionic 简介和项目需求介绍
目前 Hybrid App 有很多的完善的方案，如 Ionic 、React Native等，最近因为自己一个小的需求，需要写一个小的 App 实现在手机端的实时查看，简单学习了下 Ionic 写了个小程序，索性就上架发布出来了。
先说下项目的简单的需求：

* 可以准实时监控添加的网站的在线情况，检测到宕机的第一时间进行 App 推送，可以通知技术人员第一时间进行响应处理；
* 可以对添加的网站进行测速汇总，在 App 中随时查看所有站点的测速情况；
* 顺便添加几个主要的搜索引擎对添加的网站的收录情况，便于及时的掌握最基本的 SEO 情况。

主要的需求也就是上面这个几个，那么在选用技术框架的时候，发现 Ionic 学习起来比较简单，并且后期只要在不同的平台下分别打包就可以生成 iOS 和 Android 不同平台的 App。
简单来说，Ionic 就是使用 HTML5 创建类似于手机平台原生应用的一个开发框架，里面绑定了 AngularJS 和 Sass，核心的编译平台是 PhoneGap，同时已经集成了现有的一些 UI 框架，不需要为界面设计花很多的心思。
陆陆续续也开发出来上架了，这篇文章就整理一些遇到的坑，供大家以后开发的过程中参考。
iPhone & Android 平台截图，官网：[http://gugujiankong.com/](http://gugujiankong.com/)

![Snip20151110_4.png](https://assets.devopen.club/uPic/202608/gugudata-pages/3c0709d18ce520a9fe9e26e9020a3364.png)

![Snip20151110_4.png](https://assets.devopen.club/uPic/202608/gugudata-pages/c5a53cbc9b4ab6bd4f4aa2e2053b8574.png)

## 2. View 缓存的处理
Ionic默认对 View 添加了缓存的机制，不过在此 App 中，所有的 View 都需要进行即时的刷新以及用户添加新的网站后页面也需要进行刷新，那么就需要禁用掉 View 的缓存。
禁用缓存只需要在 View 中禁用即可。

{% codeblock lang:js%}
.state('tab.websites', {
    url: '/websites',
    cache: false,
    views: {
        'tab-websites': {
            templateUrl: 'templates/tab-websites.html',
            controller: 'WebSitesCtrl'
        }
    }
})
{% endcodeblock %}

全局禁用缓存的方法是：$ionicConfigProvider.views.maxCache(0);

## 3. 键盘的不同模式的支持
在不同的用户输入场景下，需要显示不同的键盘模式以方便用户输入，如在输入邮件时键盘则显示邮件模式等。
在 Ionic 中需要安装键盘插件控制键盘模式的显示。
安装后在$ionicPlatform.ready中调用即可。
{% codeblock lang:js%}
if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.disableScroll(true);
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
}
if (window.StatusBar) {
    // org.apache.cordova.statusbar required
    StatusBar.styleLightContent();
}
{% endcodeblock %}
对应的 input 只要添加相应的 type 进行控制即可，支持的所有 type 见这里。
{% codeblock lang:html%}
<input type="email" placeholder="邮箱" ng-model="data.username">
{% endcodeblock %}

## 4. 设备网络状况的检查
因为此 App 一直需要联网操作，那么在 App 启动的时候就要对网络情况进行检查，当网络不可用的时候对用户进行相应的提示。
安装网络检查插件后，在 App 启动的时候进行检测并提示即可。
{% codeblock lang:js%}
document.addEventListener("deviceready", function () {
    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        var onlineState = networkState;
        console.log("device online...");
    })
    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
        var offlineState = networkState;
        //提醒用户的网络异常
        $ionicLoading.show({
            template: '网络异常，不能连接到服务器！'
        });
    })
}, false);
{% endcodeblock %}

## 5. iOS 设备和 Android 设备的图标以及启动画面图片的批量生成
iOS 设备和 Android 设备因为不同设备的屏幕尺寸适配问题，需要提供很多不同尺寸的图片资源，包括 icon 和 splash 的不同尺寸。
如果每一个尺寸都去使用 PS 导出，工作量巨大，还好有自动生成的工具，只需要提供最大的尺寸供生成即可。
iOS 的 icon 和 splash生成：[http://ios.hvims.com/](http://ios.hvims.com/)
Android 相关资源生成：[https://romannurik.github.io/AndroidAssetStudio/index.html](https://romannurik.github.io/AndroidAssetStudio/index.html)

## 6. 下拉刷新
用户下拉刷新是一个通用的操作规范，Ionic 已经对此功能进行了集成，只需要在 View 中按照此方法使用即可，获取的方法放在 on-refresh 中即可。
{% codeblock lang:html%}
<ion-refresher refreshing-icon="ion-loading-c" refreshing-text="云端获取数据中..." pulling-text="下拉刷新数据..." on-refresh="doRefresh()"></ion-refresher>
{% endcodeblock %}

## 7. 反馈『意见及建议』调用邮件客户端的方法
常需要在菜单中添加上『意见及建议』选项，当用户点击后，调用邮件客户端，自动填写上收件人和邮件标题，用户只要书写内容点击发送即可。
跨平台的方案是安装EmailComposer插件，在按钮的事件中调用即可。
{% codeblock lang:js%}
$scope.feedback = function () {
    if (window.plugins && window.plugins.emailComposer) {
        window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {

            },
            "给咕咕监控的建议", // Subject
            "",                      // Body
            ["feedback@gugujiankong.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
    }
};
{% endcodeblock %}

## 8. 给 App 评分不同平台的办法
为了引导用户去给 App 评分，常在菜单中添加选项或者弹窗的形式对用户进行评分引导，在 Ionic 只要判断设备平台后进行相应的跳转到对于的商店即可。
{% codeblock lang:js%}
$scope.rateus = function () {
    if ($ionicPlatform.isIOS) {
        window.open('itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id511364723?ls=1&mt=8'); // or itms://
    } else if ($ionicPlatform.isAndroid) {
        window.open('market://details?id=<package_name>');
    }
};
{% endcodeblock %}

## 9. 集成极光推送
开发 App 的主要用途就是在网站宕机后，使用推送功能进行第一时间通知，以便技术人员进行快速响应，所以推送功能是必须集成进去的。
国内有很成熟的第三方推送平台：极光推送。
注册后进行插件的添加，也就是jpush-phonegap-plugin。
在用户登录的时候对用户按照别名或分组进行标识。
{% codeblock lang:js%}
var arrayObj = new Array("Tags" + loginResult.UserId);
window.plugins.jPushPlugin.setTags(arrayObj);
{% endcodeblock %}
个人推荐按照分组也就是 tags 进行标识，因为一个用户可能会使用不同的设备，那么推送的时候不同的设备就可以全部都收到通知，不至于漏掉推送消息。
API 端在监控 Server 端进行操作即可，也就是在检测到宕机后，进行极光 API 调用，发送宕机的提醒即可。

## 10. 打包 iOS 、Android 平台的种种问题
到这里就要显示 Hybrid App 的威力了，一次开发，全平台打包发布。
只要通过 Ionic 的 build 命令或者打开编译环境进行对应的平台打包即可，当然打包之前最好使用模拟器进行测试。
有几个问题是需要注意的：
iOS 打包需要注意极光推送是分开发证书环境和生产证书环境的，需要特别的注意，极光推送的设置需要和本地打包的证书以及 plist 配置的保持完整的一致，注意下图APS_FOR_PRODUCTION值的设置。
Android 的打包发布则需要注意构件工具 Gradle 的版本问题。
iOS 提交后一般审核一周左右，以后每次更新基本都保持在一次等待一周的频率，所以一定要测试好免得线上版本出现致命 bug 的情况。
> 原图已失效：26605-20151105164144992-966035688.png

## 11. 项目开源和下载
此项目我也开源在了 GitHub 上，相关优化还要抽闲暇时间去做，相关资源如下，欢迎提意见和需求，我尽量保持改进。
官网：[http://gugujiankong.com/](http://gugujiankong.com/)
iOS 版本：[https://itunes.apple.com/cn/app/gu-gu-jian-kong-zhuan-zhu/id1042192962?l=en&mt=8](https://itunes.apple.com/cn/app/gu-gu-jian-kong-zhuan-zhu/id1042192962?l=en&mt=8)
Android 版本：[http://www.wandoujia.com/apps/com.gugujiankong.iosapp](http://www.wandoujia.com/apps/com.gugujiankong.iosapp)
GitHub开源：[https://github.com/ParryQiu/GuGuJianKong](https://github.com/ParryQiu/GuGuJianKong)
