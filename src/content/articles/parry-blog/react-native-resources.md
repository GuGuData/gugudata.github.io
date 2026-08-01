---
title: "《React Native 精解与实战》书籍连载「React Native 源码学习方法及其他资源」"
description: "此系列文章将整合我的 React 视频教程与 React Native 书籍中的精华部分,给大家介绍 React Native 源码学习方法及其他资源。"
section: "parry-blog"
slug: "react-native-resources"
lang: "zh-CN"
status: "published"
tags: ["React","React Native","视频教程","技术文章"]
publishedAt: "2018-10-10T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/489c1c91d764030a76df87303147f818.png"
author: "Parry Qiu"
---
此系列文章将整合我的 React 视频教程与 React Native 书籍中的精华部分，给大家介绍 React Native 源码学习方法及其他资源。

<!--more-->

此文是我的出版书籍[《React Native 精解与实战》](http://rn.parryqiu.com/)连载分享，此书由机械工业出版社出版，书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战，以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示，精选了大量实例代码，方便读者快速学习。

***书籍配套视频教程「80 节实战课精通 React Native 开发」***：此视频课程建议配合书籍学习，书籍中原理性的东西讲解的比较清晰，而视频教程对于组件、API 等部分的代码实战开发讲解比较直观。

***书籍所有相关资料请访问：[http://rn.parryqiu.com](http://rn.parryqiu.com/)***

***之前连载文章列表***
[「80节实战课精通 React Native 开发」视频课程大纲](http://blog.parryqiu.com/2018/07/10/react-native-in-action/)
[React 与 React Native 简介](http://blog.parryqiu.com/2018/08/09/rn_book_intro_react_and_reactnative/)
[React Native 底层原理](http://blog.parryqiu.com/2018/08/10/react_native_book_react_native_principle/)
[Node.js 简介与 React Native 开发环境配置](http://blog.parryqiu.com/2018/08/10/rn_book_intro_nodejs_and_dev_config/)
[React Native 中的生命周期](http://blog.parryqiu.com/2018/08/16/react-natvie-lifecycle/)
[React Native 网络请求与列表绑定](http://blog.parryqiu.com/2018/08/21/react_native_book_react_native_list_bind/)
[配置 iOS 与 Android 开发环境](http://blog.parryqiu.com/2018/08/24/react-native-book-config-ios-environment/)

最后的章节给大家介绍 React Native 源码的查阅方法，以便你进行更加高阶的开发与研究时参阅，并分享了开发过程中可能遇到的众多问题的解决方案，以及与 React Native 开发相关、本书相关的一些线上资源。

## 15.6	React Native 源码剖析
我们在学习了 React Native 开发的方方面面之后，我们再次回到 React Native 的本质，给大家简要介绍 React Native 源码的学习方法，对 React Native 源码的整体框架做一个简单介绍，后续如果大家想深入阅读 React Native 框架的源码，希望这部分对你有所帮助，并且能从源码中学习到复杂框架的设计思想，希望大家也能“造出复杂的轮子”。

React Native 项目的 GitHub 地址为：[https://github.com/facebook/react-native](https://github.com/facebook/react-native)，源码的基本结构如图 A-1 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/489c1c91d764030a76df87303147f818.png)
图 A-1 React Native 源码结构

* 根目录中主要包含了项目的一些配置文件和一些描述性文档；
* 初始化项目的 React Native CLI 定义在 react-native-cli 文件夹下；
* RNTester 文件夹包含了 React Native 项目的单元测试用例以及组件、API 的使用示例代码，是一个学习 React Native 组件与 API 使用方法的宝库，这个在之前的章节有过介绍；
* React 文件夹是 iOS 原生平台的项目文件夹，用于与 React Native 的 JavaScript 代码通信；
* ReactAndroid 文件夹是 Android 原生平台的项目文件夹，用于与 React Native 的 JavaScript 代码通信；
* babel-preset 文件夹是 React Native 项目的 Babel 预配置；
* Libraries 文件夹是 React Native 源码的核心，所有的 React Native 组件与 API 的实现都在此文件夹中。

接下来我们就随便找一个组件来看看 React Native 是如何进行实现的，假设我们就来看看 Alert 组件的实现，其实通过我们在 React Native 与原生平台混合开发章节的学习，我们已经大概知道了 React Native 是如何来实现的。

我们先来看 Alert 组件 JavaScript 端的实现，Alert 组件包含的文件如图 A-2 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/ccfac4b5c13e10987af39decc18704f3.png)
图 A-2 Alert 组件源码结构

源码在 [https://github.com/facebook/react-native/blob/master/Libraries/Alert/Alert.js](https://github.com/facebook/react-native/blob/master/Libraries/Alert/Alert.js)。

```jsx
1.	......
2.	class Alert {
3.
4.	  /**
5.	   * Launches an alert dialog with the specified title and message.
6.	   *
7.	   * See http://facebook.github.io/react-native/docs/alert.html#alert
8.	   */
9.	  static alert(
10.	    title: ?string,
11.	    message?: ?string,
12.	    buttons?: Buttons,
13.	    options?: Options,
14.	    type?: AlertType,
15.	  ): void {
16.	    if (Platform.OS === 'ios') {
17.	      if (typeof type !== 'undefined') {
18.	        console.warn('Alert.alert() with a 5th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
19.	        AlertIOS.alert(title, message, buttons, type);
20.	        return;
21.	      }
22.	      AlertIOS.alert(title, message, buttons);
23.	    } else if (Platform.OS === 'android') {
24.	      AlertAndroid.alert(title, message, buttons, options);
25.	    }
26.	  }
27.	}
28.
29.	/**
30.	 * Wrapper around the Android native module.
31.	 */
32.	class AlertAndroid {
33.
34.	  static alert(
35.	    title: ?string,
36.	    message?: ?string,
37.	    buttons?: Buttons,
38.	    options?: Options,
39.	  ): void {
40.	    var config = {
41.	      title: title || '',
42.	      message: message || '',
43.	    };
44.
45.	    if (options) {
46.	      config = {...config, cancelable: options.cancelable};
47.	    }
48.	    // At most three buttons (neutral, negative, positive). Ignore rest.
49.	    // The text 'OK' should be probably localized. iOS Alert does that in native.
50.	    var validButtons: Buttons = buttons ? buttons.slice(0, 3) : [{text: 'OK'}];
51.	    var buttonPositive = validButtons.pop();
52.	    var buttonNegative = validButtons.pop();
53.	    var buttonNeutral = validButtons.pop();
54.	    if (buttonNeutral) {
55.	      config = {...config, buttonNeutral: buttonNeutral.text || '' };
56.	    }
57.	    if (buttonNegative) {
58.	      config = {...config, buttonNegative: buttonNegative.text || '' };
59.	    }
60.	    if (buttonPositive) {
61.	      config = {...config, buttonPositive: buttonPositive.text || '' };
62.	    }
63.	    NativeModules.DialogManagerAndroid.showAlert(
64.	      config,
65.	      (errorMessage) => console.warn(errorMessage),
66.	      (action, buttonKey) => {
67.	        if (action === NativeModules.DialogManagerAndroid.buttonClicked) {
68.	          if (buttonKey === NativeModules.DialogManagerAndroid.buttonNeutral) {
69.	            buttonNeutral.onPress && buttonNeutral.onPress();
70.	          } else if (buttonKey === NativeModules.DialogManagerAndroid.buttonNegative) {
71.	            buttonNegative.onPress && buttonNegative.onPress();
72.	          } else if (buttonKey === NativeModules.DialogManagerAndroid.buttonPositive) {
73.	            buttonPositive.onPress && buttonPositive.onPress();
74.	          }
75.	        } else if (action === NativeModules.DialogManagerAndroid.dismissed) {
76.	          options && options.onDismiss && options.onDismiss();
77.	        }
78.	      }
79.	    );
80.	  }
81.	}
82.
83.	module.exports = Alert;
84.	......
```

此段代码省略了头部的相关内容，在代码的第 16 行通过 Platform 变量判断当前所运行的平台，如果是 iOS 平台，那么就调用 AlertIOS 文件中定义的代码，如果是 Android 平台就调用代码第 32 行定义的 AlertAndroid 用于实现对 Android 原生平台 Alert 的调用，注意代码的第 63 行，是不是和我们实战 React Native 与 Android 平台混合开发的实现一样？所以 React Native 的所有组件与 API 基本都是通过此种方法进行了封装后提供给了开发者，所以我们可以说 iOS 原生平台与 Android 原生平台具备的功能都可以通过封装后在 React Native 框架中使用。

对应的 Android 原生端的实现代码在：[https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/ReactAndroid/src/main/java/com/facebook/react/modules/dialog/DialogModule.java](https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/ReactAndroid/src/main/java/com/facebook/react/modules/dialog/DialogModule.java)。

```jsx
86.	......
87.	 @ReactMethod
88.	  public void showAlert(
89.	      ReadableMap options,
90.	      Callback errorCallback,
91.	      final Callback actionCallback) {
92.	    final FragmentManagerHelper fragmentManagerHelper = getFragmentManagerHelper();
93.	    if (fragmentManagerHelper == null) {
94.	      errorCallback.invoke("Tried to show an alert while not attached to an Activity");
95.	      return;
96.	    }
97.
98.	    final Bundle args = new Bundle();
99.	    if (options.hasKey(KEY_TITLE)) {
100.	      args.putString(AlertFragment.ARG_TITLE, options.getString(KEY_TITLE));
101.	    }
102.	    if (options.hasKey(KEY_MESSAGE)) {
103.	      args.putString(AlertFragment.ARG_MESSAGE, options.getString(KEY_MESSAGE));
104.	    }
105.	    if (options.hasKey(KEY_BUTTON_POSITIVE)) {
106.	      args.putString(AlertFragment.ARG_BUTTON_POSITIVE, options.getString(KEY_BUTTON_POSITIVE));
107.	    }
108.	    if (options.hasKey(KEY_BUTTON_NEGATIVE)) {
109.	      args.putString(AlertFragment.ARG_BUTTON_NEGATIVE, options.getString(KEY_BUTTON_NEGATIVE));
110.	    }
111.	    if (options.hasKey(KEY_BUTTON_NEUTRAL)) {
112.	      args.putString(AlertFragment.ARG_BUTTON_NEUTRAL, options.getString(KEY_BUTTON_NEUTRAL));
113.	    }
114.	    if (options.hasKey(KEY_ITEMS)) {
115.	      ReadableArray items = options.getArray(KEY_ITEMS);
116.	      CharSequence[] itemsArray = new CharSequence[items.size()];
117.	      for (int i = 0; i < items.size(); i ++) {
118.	        itemsArray[i] = items.getString(i);
119.	      }
120.	      args.putCharSequenceArray(AlertFragment.ARG_ITEMS, itemsArray);
121.	    }
122.	    if (options.hasKey(KEY_CANCELABLE)) {
123.	      args.putBoolean(KEY_CANCELABLE, options.getBoolean(KEY_CANCELABLE));
124.	    }
125.
126.	    UiThreadUtil.runOnUiThread(new Runnable() {
127.	      @Override
128.	      public void run() {
129.	        fragmentManagerHelper.showNewAlert(mIsInForeground, args, actionCallback);
130.	      }
131.	    });
132.
133.	  }
134.	......
```

我们可以通过如上代码看到整个 Android 端的 showAlert 实现完全就是我们平时进行 Android 原生开发的代码实现，而通过 React Native 的封装之后，可以轻松让开发者在前端通过 JavaScript 的代码调用原生平台的方法，还可以直接适配两个平台，这样的框架设计的确有魅力，源码也值得好好阅读。

以上主要是给大家把 React Native 源码的基本结构告诉大家，空闲时间大家可以多去阅读 React Native 的实现源码，希望能对你 React Native 的学习再多一些帮助。

关于源码学习过程中的任何问题都可以在本书的线上资源站点找到我的联系方式和我交流。

## 15.7	难题解决方法与 Issues 重要作用
任何开发语言的学习，即使相关的书籍讲解得再详细，也不能完全覆盖你在开发过程中遇到的种种问题，所以我们需要掌握一些查找疑难问题的基本方案。

关于大家在学习本书进行 React Native 开发的过程中，有几个建议遵循的原则与查找问题的方案供大家参考。

### 1.	不要纠结于 React Native 的版本问题
很多时候我们在学习时纠结于 React Native 版本更新后，自己已学习的知识是否会落后，从而频繁地在安装最新版本的 React Native 框架、以及解决新版本与老的学习代码冲突上浪费太多的时间。其实很多的前端框架的更新都比较激进，React 基本实现了两周版本一更新，而每次的版本升级肯定会导致和你既有的项目代码有稍许冲突的地方，而如果你花大量地时间去解决这些冲突没有太大的意义。

所以一般的建议是你固定一个版本的 React Native 进行学习，因为版本的更新一般都很小，你只需要专注于框架的使用学习，尽快通过代码实战掌握框架的基本使用，后期可以认真研究框架的底层实现原理，而后期的版本更新基本都不会离开你已掌握的框架知识，更不会与你理解的实现原理有太大出入。

### 2.	单个平台进行问题定位
React Native 的开发因为涉及到 iOS 平台与 Android 平台的适配，有时一个问题可能影响到了两个平台的表现，这时应该逐个平台突破，而不是两个平台来一起调试，反而会造成代码的逻辑混乱，如果需要在代码上强制分离逻辑调试，可以通过 Platform 变量判断当前是运行在哪个平台，进而编写特定的平台代码进行分离调试。

### 3.	善用官方的 Issues
React Native 因为源码就发布在 GitHub 上，所以你可以直接在 GitHub 项目页面上查找开发过程中遇到的问题，在 Issues 页面中已包含了近万个问题，基本上你使用过程中遇到的问题肯定有别人遇到过，所以要学会直接在 Issues 中查找问题的原因以及解决方案，实在找不到解决方案你还可以向 React Native 项目提交 Issue，并可以获得 React Native 开发团队的回复，我想应该没有人比 React Native 开发团队的人更了解 React Native 了吧，不过在提问前最好自己多动手查阅一遍所有的 Issues 是否已包含了你遇到的问题了。

React Native 的官方 Issues 地址为：[https://github.com/facebook/react-native/issues](https://github.com/facebook/react-native/issues)，截图如图 A-3 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/f0a75959a05dfde74baad73c5bbeea1f.png)
图 A-3 React Native 官方 Issues 页面

## 15.8	书籍相关资源列表
1.	本书配套源码的 GitHub 地址
包含书籍中所有标注的完整代码、代码片段等，所有的章节代码都进行了单独文件夹存放，方便查阅，后续关于本书的相关更新也在此 GitHub 中更新。
地址：https://github.com/ParryQiu/ReactNative-Book-Demo

2.	React GitHub
地址：https://github.com/facebook/react/

3.	React Native 官网
地址：https://facebook.github.io/react-native/

4.	React Native GitHub
地址：https://github.com/facebook/react-native

5.	awesome-react-native GitHub
地址：https://github.com/jondot/awesome-react-native

6.	深入理解 React JS 中的 setState
地址：http://blog.parryqiu.com/2017/12/19/react_set_state_asynchronously/

7.	从源码的角度再看 React JS 中的 setState
地址：http://blog.parryqiu.com/2017/12/29/react-state-in-sourcecode/

8.	从源码的角度看 React JS 中批量更新 State 的策略（上）
地址：http://blog.parryqiu.com/2018/01/04/2018-01-04/

9.	从源码的角度看 React JS 中批量更新 State 的策略（下）
地址：http://blog.parryqiu.com/2018/01/08/2018-01-08/

10.	Node.js 官网
地址：https://nodejs.org

11.	npm 官网
地址：https://www.npmjs.com/

12.	Node.js 下载页面
地址：https://nodejs.org/en/download/

13.	Homebrew 官网
地址：https://brew.sh/

14.	官方 UI 示例 App
地址：https://github.com/facebook/react-native/tree/master/RNTester

15.	react-native-elements
地址：https://github.com/react-native-training/react-native-elements

16.	react-native-tab-navigator
地址：https://github.com/happypancake/react-native-tab-navigator

17.	react-native-navigation
地址：https://github.com/wix/react-native-navigation

18.	react-native-keychain
地址：https://github.com/oblador/react-native-keychain

19.	react-native-sensitive-info
地址：https://github.com/mCodex/react-native-sensitive-info

20.	react-native-image-picker
地址：https://github.com/react-community/react-native-image-picker

21.	Fetch API 文档
地址：https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

22.	Awesome React Native
地址：https://github.com/jondot/awesome-react-native

23.	react-native-open-share
地址：https://github.com/ParryQiu/react-native-open-share

24.	新浪微博开放平台
地址：http://open.weibo.com/

25.	微信开放平台
地址：https://open.weixin.qq.com/

26.	QQ 开放平台
地址：http://open.qq.com/

27.	React-Virgin
地址：https://github.com/Trixieapp/react-virgin

28.	react-native-pathjs-charts
地址：https://github.com/capitalone/react-native-pathjs-charts

29.	react-native-gifted-listview
地址：https://github.com/FaridSafi/react-native-gifted-listview

30.	react-native-vector-icons
地址：https://github.com/oblador/react-native-vector-icons

31.	React Native metro
地址：https://github.com/facebook/metro

32.	Genymotion
地址：https://www.genymotion.com/

33.	极光推送官网
地址：https://www.jiguang.cn/

34.	jpush-react-native
地址：https://github.com/jpush/jpush-react-native

35.	极光推送 iOS 证书设置向导
地址：https://docs.jiguang.cn/jpush/client/iOS/ios_cer_guide/

36.	Ape Tools
地址：http://apetools.webprofusion.com/tools/imagegorilla

37.	App 图标生成工具
https://makeappicon.com/
http://ios.hvims.com/
https://romannurik.github.io/AndroidAssetStudio/

38.	react-native-code-push
地址：https://github.com/Microsoft/react-native-code-push

39.	React Native Issues
地址：https://github.com/facebook/react-native/issues

40.	以上的所有链接汇总页面
如果你觉得需要查阅以上的链接，手动在浏览器中输入太麻烦，你可以直接访问本书的线上所有链接汇总站点，在此站点中你可以看到以上的所有链接以及链接说明，直接点击即可访问、查阅，希望能帮助大家提高学习效率。
地址：http://rn.parryqiu.com
