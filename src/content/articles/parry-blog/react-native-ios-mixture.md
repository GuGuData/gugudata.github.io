---
title: "《React Native 精解与实战》书籍连载「iOS 平台与 React Native 混合开发」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "react-native-ios-mixture"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-08-29T08:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/b_cc9da6b36a33178e0361cc6b15031741.png"
author: "Parry Qiu"
---
![截图](https://devopenclub.parryqiu.com/b_cc9da6b36a33178e0361cc6b15031741.png)

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

本章将详细讲解在 React Native 框架下，iOS 平台混合开发的原理以及详细实现方法，并依然通过案例进行实际应用学习。本章需要具备 iOS 平台开发语言 Objective-C 或 Swift 以及 iOS 核心类库的基本知识。

## 11.1	iOS 平台混合开发简介
当我们需要使用一些 iOS 平台的 API，而 React Native 框架目前还没有提供对应的 JavaScript API 时，我们就需要自己编写 React Native 框架与 iOS 平台结合的混合开发代码，使得 React Native 框架可以直接与 iOS 平台的原生代码进行通信。
混合开发的其他使用场景还包括对一些现有的 Objective-C、Swift 或者 C++ 代码进行复用，或者编写一些用于图片处理、数据库或一些其他高级特性的高性能或多线程的代码。React Native 都开放了对应的接口供开发者调用。

接下来在原理讲解的章节，我们通过结合一个简单的实例详细讲解一下 React Native 中与 iOS 平台混合开发的通信机制，这部分内容稍显复杂，可能需要反复阅读理解其底层原理，并结合小实例进行体会学习，在第二部分还将有一个真实的混合开发示例，继续加深你对混合开发的理解。

这部分内容属于 React Native 开发的高阶内容，即使不掌握也不影响你在学习了 React Native 基础知识后进行 App 的开发，不过理解并掌握了这部分的话，更加有助于你理解 React Native 的底层原理与实现。

## 11.2	iOS 平台混合开发原理详解
这一章节，我们通过实现在 React Native 框架中调用我们在 Objective-C 中编写的原生代码，Objective-C 中的函数返回了一个简单的字符串，React Native 框架中通过 JavaScript 代码将字符串获取到在 View 中的 Text 组件上显示。功能虽然简单，但是我们主要是通过此简单功能的实现流程，深入学习 React Native 中与 iOS 平台结合的混合开发原理。

iOS 平台混合开发实现的过程包括如下几个过程：

1. 在 iOS 平台的原生代码中定义混合开发的入口，用于与 React Native 中的 JavaScript 代码进行通信；
2. 设置 iOS 平台下项目的编译必备设置；
3. 在 React Native 项目中通过 JavaScript 代码调用混合开发实现的 iOS 平台原生功能。

**完整代码在本书配套源码的 11-02 文件夹。**

### 11.2.1	iOS 原生代码实现
原生模块使用 Objective-C 的类定义来实现与 React Native 框架通信的协议接口 RCTBridgeModule，注意 RCT 是 ReaCT 取的几个大写字母的缩写。
首先我们通过 React Native CLI 命令初始化一个空的项目，命令执行如图 11-1 所示。

![截图](https://devopenclub.parryqiu.com/b_d87586f158134a3b32a50c8d14be954b.png)
图 11-1 初始化一个空项目

使用 Xcode 打开 ios 文件夹下的 xcodeproj 项目文件，后续的混合开发我们将在 Xcode 中进行。
我们将我们混合开发的模块命名为 MyModule，并在 Xcode 中分别建立两个对应的文件，一个为头文件 MyModule.h，另一个为使用 Objective-C 来实现的类 MyModule.m。建立时可以在 Xcode 新建窗口中选择文件类型，如图 11-2 所示。

![截图](https://devopenclub.parryqiu.com/b_1adaf16ba1050242d4c8124eace937fa.png)
图 11-2 Xcode 下新建文件选择类型

头文件 MyModule.m 文件中初始化的代码使用如下代码。

```objc
1.	#import "RCTBridgeModule.h"
2.
3.	@interface MyModule : NSObject <RCTBridgeModule>
4.
5.	@end
```

代码第一行导入了 React Native 框架与原生代码通信的协议头文件 RCTBridgeModule.h。

为了通过类对 RCTBridgeModule.h 的实现，类中还需要包含 RCT_EXPORT_MODULE() 的宏定义，RCT_EXPORT_MODULE() 中还可以传入参数，命名自定义原生组件的名称，如我们之前定义的文件名为 MyModule，这里可以通过传递参数重新定义模块名称，RCT_EXPORT_MODULE(RenameMyModule) 这样就将导出的模块命名成了 RenameMyModule。如果不传递参数，那么就使用类文件的名称，即 MyModule.m 的名称 MyModule。如果模块类文件包含 RCT 开头的文件名，那么最终的模块名称将自动不包含 RCT 字符串。

MyModule.m 文件中的代码实现如下。

```objc
1.	#import "MyModule.h"
2.
3.	@implementation MyModule
4.
5.	// 需要包含的宏定义
6.	RCT_EXPORT_MODULE()
7.
8.	// 定义了一个返回的字符串
9.	- (NSDictionary *)constantsToExport {
10.	  return @{@"hello": @"你好，这是我编写的第一个 iOS 原生模块！"};
11.	}
12.
13.	// 定义了一个可被调用的函数
14.	RCT_EXPORT_METHOD(squareMe:(NSString *)number:(RCTResponseSenderBlock)callback) {
15.	  int num = [number intValue];
16.	  callback(@[[NSNull null], [NSNumber numberWithInt:(num*num)]]);
17.	}
18.
19.	@end
```

此段代码定义了一个固定的字符串输出，方法为 constantsToExport，返回了名称为 hello 的字符串。第二个定义了一个可以供 React Native 的 JavaScript 代码调用的函数，函数功能非常简单，就是将传递过来的 int 参数进行平方计算，计算后将计算的值返回。

函数的定义需要使用宏命令 RCT_EXPORT_METHOD 进行显式地定义。定义的函数都会被异步地调用，所以函数的定义不是直接使用 return 返回一个值，和固定的字符串返回不一样。
squareMe 是定义了此函数的函数名称，参数为一个 NSString 型的值，名称为 number，另一个参数为函数的回调函数，用于获取原生代码的执行结果。

函数的 callback 第一个参数为错误的返回（这里没有错误就返回了一个 null），第二个为计算后的值，供函数回调使用。

### 11.2.2	iOS 项目编译设置
如上代码都编写完成后，在 Xcode 中执行项目编译，点击 Xcode 中的 Build 命令，如图 11-3 所示。

![截图](https://devopenclub.parryqiu.com/b_c17b8729826edec573b958397db9d1bb.png)
图 11-3 Xcode 项目的编译

如果在编译时遇到 fatal error: 'RCTBridgeModule.h' file not found 的错误，即 'RCTBridgeModule.h 文件找不到的问题，错误如图 11-4 所示。

![截图](https://devopenclub.parryqiu.com/b_5e2d5a6fb30e718e89949d8ae45e7794.png)
图 11-4 RCTBridgeModule.h 文件找不到的错误

解决的方法为在 Xcode 的项目设置“Build Settings”选项卡下找到“Header Search Paths”设置节点，并确认在其中包含了如图 11-5 所示的定义，即添加了 $(SRCROOT)/../node_modules/react-native/React 值的定义并在下拉选项中选择了“recursive”。

![截图](https://devopenclub.parryqiu.com/b_d37bdb6ad9ad7288ca2154ddcadd48f0.png)
图 11-5 设置 Xcode 的 Search Paths

进行了如上的设置后，再次编译项目即可解决此错误问题。
