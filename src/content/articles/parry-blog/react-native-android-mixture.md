---
title: "《React Native 精解与实战》书籍连载「Android 平台与 React Native 混合开发」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "react-native-android-mixture"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-09-25T08:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/01fd40aa5af29d6d6471e692dfa30510.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/01fd40aa5af29d6d6471e692dfa30510.png)

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

<!--more-->

本章继续介绍 Android 平台下的混合开发原理以及实战，同时我们还可以深入理解React Native 与 Android 平台的通信机制。

## 12.1	Android 平台混合开发简介

与 iOS 平台的混合开发一样，有时我们遇到 React Native 框架没有提供的原生 Android 平台 API 时，我们就需要自己来进行 React Native 平台与 Android 平台的混合开发。
同样，混合开发还可以利用起来现有的 Android 原生平台的代码，并可以用于开发一些高性能、多线程的需求场景。

React Native 框架的设计同样为 Android 原生平台提供了混合开发的可能性，这部分依然属于 React Native 开发高阶的部分，在开发前需要掌握了 Android 原生平台的开发语言及开发流程，不过不了解的话也可以学习一下，了解 React Native 平台与 Android 平台的通信原理。

学习的方法我们还是在原理讲解的时候结合一个实际的小实例结合代码进行讲解，而不是仅仅空洞地讲解概念性的东西，便于大家理解。最后我们还将完成一个更加贴近实际的小实例，来加深 React Native 框架与 Android 平台混合开发的理解与运用。

## 12.2	Android 平台混合开发原理详解

我们按照学习 iOS 平台混合开发的模式，这里我们继续结合一个小的实例来学习 React Native 平台与 Android 平台混合开发的原理与方法。

Android 平台的混合开发主要包含如下几个主要步骤：
1)	在 Android 项目中通过原生代码实现提供给 React Native 调用的原生功能；
2)	在 Android 项目中将编写好的功能模块进行注册；
3)	定义功能模块的 Android 包；
4)	在 React Native 项目中通过 JavaScript 代码调用混合开发实现的 Android 平台原生功能。

完整代码在本书配套源码的 12-02 文件夹。

### 12.2.1	Android 原生代码实现
先通过 React Native CLI 初始化一个空项目，项目名称为 NativeAndroidModule，项目初始化的流程如图 12-1 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/b3f784fef04b75a9badfe0bb1ef72696.png)
图 12-1 Android 混合开发项目初始化

使用 Android 平台的开发工具 Android Studio 打开项目文件夹中的 android 文件夹，在 Android Studio 中选择导入此文件夹即可，如图 12-2 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/1974f9746e0c6fe480e113d5f5129cfa.png)
图 12-2 Android Studio 导入项目

注意，如果你是第一次打开此项目文件夹，Android Studio 会自动下载 Gradle 并使用 Gradle 进行项目的构建，此过程要确保你的网络环境没有任何阻碍并需要耐心等待加载完毕，加载过程如图 12-3 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/d3e7be7a15e86005a31c9ef7f9525f07.png)
图 12-3 Gradle 初始化并进行项目的构建

项目使用 Android Studio 导入后打开如图 12-4 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/efd0c4ff2e70043f123d0ca633c06eeb.png)
图 12-4 Android Studio 打开项目后的项目结构

新建的 Android 原生平台的类需要继承于React Native 框架提供的父类 ReactContextBaseJavaModule，这里我们新建的类命名为 MyModule。

如果没有导入 ReactContextBaseJavaModule 的包，Android Studio 会提示你进行包的引入，如图 12-5 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/f43e9b43b2db5a02456108857ca3294c.png)
图 12-5  Android Studio 提示导入缺失的包

新建后的文件代码如下所示。

```java
1. import com.facebook.react.bridge.ReactContextBaseJavaModule;
2.
3. public class MyModule extends ReactContextBaseJavaModule {
4.
5. }
```

在继承了 ReactContextBaseJavaModule 父类后，需要实现方法 getName 返回模块名称，并在添加了类的构造函数，以及实现了调用 Android 原生 API 保持屏幕常亮并关闭常亮的两个方法 keepScreenAwake 和 removeScreenAwake。完整的 MyModule.java 代码如下。

```java
1.	package com.nativeandroidmodule;
2.
3.	import com.facebook.react.bridge.ReactApplicationContext;
4.	import com.facebook.react.bridge.ReactContextBaseJavaModule;
5.	import com.facebook.react.bridge.ReactMethod;
6.
7.	public class MyModule extends ReactContextBaseJavaModule {
8.
9.	    ReactApplicationContext reactContext;
10.
11.	    public MyModule(ReactApplicationContext reactContext) {
12.	        super(reactContext);
13.	        this.reactContext = reactContext;
14.	    }
15.
16.	    @Override
17.	    public String getName() {
18.	        return "MyModule";
19.	    }
20.
21.	    @ReactMethod
22.	    public void keepScreenAwake() {
23.	        getCurrentActivity().runOnUiThread(new Runnable() {
24.	            @Override
25.	            public void run() {
26.	                getCurrentActivity().getWindow().addFlags(
27.	                        android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
28.	            }
29.	        });
30.	    }
31.
32.	    @ReactMethod
33.	    public void removeScreenAwake() {
34.	        getCurrentActivity().runOnUiThread(new Runnable() {
35.	            @Override
36.	            public void run() {
37.	                getCurrentActivity().getWindow().clearFlags(
38.	                        android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
39.	            }
40.	        });
41.	    }
42.	}
```

同样，其他的 Android 平台的原生方法都可以按照此形式进行添加，添加后即可在 React Native 的 JavaScript 代码中调用。

### 12.2.2	Android 原生模块注册
接下来我们需要创建一个类来实现 ReactPackage 的接口函数，实现原生模块的注册，这里我们命名此文件名为 MyModulePackage.java，并实现接口中的 createNativeModules 与createViewManagers 两个方法。这里我们使用函数 createNativeModules 来进行模块的注册，另一个函数 createViewManagers 进行空值返回即可。

最终的完整代码如下，注意代码第 19 行的定义。

```java
1.	package com.nativeandroidmodule;
2.
3.	import com.facebook.react.ReactPackage;
4.	import com.facebook.react.bridge.NativeModule;
5.	import com.facebook.react.bridge.ReactApplicationContext;
6.	import com.facebook.react.uimanager.ViewManager;
7.
8.	import java.util.ArrayList;
9.	import java.util.Collections;
10.	import java.util.List;
11.
12.	public class MyModulePackage implements ReactPackage {
13.	    @Override
14.	    public List<NativeModule> createNativeModules(
15.	            ReactApplicationContext reactContext) {
16.	        List<NativeModule> modules = new ArrayList<>();
17.
18.	        modules.add(new
19.	                MyModule(reactContext));
20.
21.	        return modules;
22.	    }
23.
24.	    @Override
25.	    public List<ViewManager> createViewManagers(ReactApplicationContext
26.	                                                        reactContext) {
27.	        return Collections.emptyList();
28.	    }
29.	}
```

### 12.2.3	Android 包定义
在项目中的 MainApplication.java 文件中，需要包含上我们自己开发的原生包，添加在 getPackages 函数中即可。

```java
1.	package com.nativeandroidmodule;
2.
3.	import android.app.Application;
4.
5.	import com.facebook.react.ReactApplication;
6.	import com.facebook.react.ReactNativeHost;
7.	import com.facebook.react.ReactPackage;
8.	import com.facebook.react.shell.MainReactPackage;
9.	import com.facebook.soloader.SoLoader;
10.
11.	import java.util.Arrays;
12.	import java.util.List;
13.
14.	public class MainApplication extends Application implements ReactApplication {
15.
16.	  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
17.	    @Override
18.	    public boolean getUseDeveloperSupport() {
19.	      return BuildConfig.DEBUG;
20.	    }
21.
22.	    @Override
23.	    protected List<ReactPackage> getPackages() {
24.	      return Arrays.<ReactPackage>asList(
25.	          new MainReactPackage(),
26.	              //包含上我们自定义的原生组件包
27.	              new MyModulePackage()
28.	      );
29.	    }
30.
31.	    @Override
32.	    protected String getJSMainModuleName() {
33.	      return "index";
34.	    }
35.	  };
36.
37.	  @Override
38.	  public ReactNativeHost getReactNativeHost() {
39.	    return mReactNativeHost;
40.	  }
41.
42.	  @Override
43.	  public void onCreate() {
44.	    super.onCreate();
45.	    SoLoader.init(this, /* native exopackage */ false);
46.	  }
47.	}
```

包含的方式在代码的第 27 行，Android 原生端开发完毕后的文件结构如图 12-6 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/fd811ec65642ec402a97215c8d41c2a8.png)
图 12-6 Android 端开发完毕文件结构
