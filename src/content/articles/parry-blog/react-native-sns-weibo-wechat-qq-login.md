---
title: "React Native 接入微博、微信、QQ 登录功能"
description: "在 App 开发中我们经常需要在用户登录模块接入 SNS 登录组件,这样会大大提高用户的注册体验。特别当一个不是刚性需求 App 推广的时候,这样会很大的降低用户体验的成本,没有人愿意忍受输入邮箱、手机号码去注册一个账号的流程。 本文主要分享了在 React Native 中接入微博、微信、QQ 登录的流程,以及此前…"
section: "parry-blog"
slug: "react-native-sns-weibo-wechat-qq-login"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","React Native","开源组件","技术文章"]
publishedAt: "2016-01-27T01:36:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/dc31cb48c2dab22d5c3f7d60debe1ec7.jpg"
author: "Parry Qiu"
---
在  App 开发中我们经常需要在用户登录模块接入 SNS 登录组件，这样会大大提高用户的注册体验。特别当一个不是刚性需求 App 推广的时候，这样会很大的降低用户体验的成本，没有人愿意忍受输入邮箱、手机号码去注册一个账号的流程。
本文主要分享了在 React Native 中接入微博、微信、QQ 登录的流程，以及此前登录组件中修复的一个已知 bug 的修复。

## 使用的登录组件
这里使用的组件是 react-native-open-share，此组件从 iOS 的 SNS 通用登录组件 [OpenShare](https://github.com/100apps/openshare) fork 出来的，添加了到 React Native 的组件映射。源作者是 [Jiayao Wu](https://github.com/mozillo)，后来我在使用的过程中发现了新浪微博登录的一个 bug，下面会说明此 bug 的原因。我 fork 出来后，修复了此 bug，修复后的项目在 [react-native-open-share](https://github.com/ParryQiu/react-native-open-share)，等待源作者 merge 进 master 中去，目前需要使用的可以去我的项目地址中下载使用。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/dc31cb48c2dab22d5c3f7d60debe1ec7.jpg)

## 项目接入
项目前期具体接入的过程在项目页面已经做了详细的说明，如果在接入过程中遇到什么问题欢迎留言讨论。
这里主要针对接入过程中可能需要注意的几个点作一些说明。
### 关于新浪微博、微信、QQ 接入审核的注意点
* 三个平台都需要进行项目提交审核，一般都是一到两个工作日审核结束。
* 新浪微博、QQ 获取登录权限是免费的，微信的登录权限（以及一些其他的高级功能）需要每年缴纳300元人民币的费用。
平台对应的地址分别为：[新浪微博](http://open.weibo.com)，[微信](https://open.weixin.qq.com)，[QQ](http://open.qq.com)

### 关于项目中 key 以及认证 URL 的设置
项目中两个地ate.m` 中。
需要注意的是，在 `Info.plist` 中，key 的前面是有前缀的，按照示例程序中的添加修改即可，一定要注意。
新浪微博需要特别注意，授权回调页的 URL 需要和登录组件中的 URL 完全一致，因为 App 不涉及到回调后的页面，所以只要保证两个 URL 一致并能访问即可。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/ae055f5c44358ab5023ce3a987d5fba4.png)

组件中的 URL 地址定义在文件 `SocietyLoginManager.m` 中的约 105 行处。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/3eead04b4c88f4fa6c3612523c6e9a50.png)

其他没有特别需要注意的地方，按照项目接入说明接入即可。

## React Native 中的使用
在 React Native 通过添加三个 SNS 的图标，添加上对应的方法调用即可，代码如下：

{% codeblock lang:js%}
var openShare = require('react-native-open-share'); //头部导入组件

_weiboLogin: function() {
        var _this = this;
        openShare.weiboLogin();

        if (!_this.weiboLogin) {
            _this.weiboLogin = DeviceEventEmitter.addListener(
                'managerCallback', (response) => {
                    AlertIOS.alert(
                        'response',
                         JSON.stringify(response)
                    );

                    _this.weiboLogin.remove();
                    delete _this.weiboLogin;
                }
            );
        }
    },

    _qqLogin: function() {
        var _this = this;
        openShare.qqLogin();

        if (!_this.qqLogin) {
            _this.qqLogin = DeviceEventEmitter.addListener(
                'managerCallback', (response) => {
                    AlertIOS.alert(
                        'response',
                        JSON.stringify(response)
                    );

                    _this.qqLogin.remove();
                    delete _this.qqLogin;
                }
            );
        }
    },

    _wechatLogin: function() {
        var _this = this;
        openShare.wechatLogin();

        if (!_this.wechatLogin) {
            _this.wechatLogin = DeviceEventEmitter.addListener(
                'managerCallback', (response) => {
                    AlertIOS.alert(
                        'response',
                        JSON.stringify(response)
                    );

                    _this.wechatLogin.remove();
                    delete _this.wechatLogin;
                }
            );
        }
    }
{% endcodeblock %}

接入后就可以在 alert 中看到返回的 json 数据了。

## 之前组件中存在的一个 bug 处理
之前的组件，在微博返回数据的时候直接使用 NSDictionary 进行返回了，但是微博的 SDK 中返回日期类型的时候会导致 React Native 解析 json 的时候报错，错误如下：
```
*** Terminating app due to uncaught exception 'NSInvalidArgumentException',
reason: 'Invalid type in JSON write (__NSDate)'
*** First throw call stack:
...
```
主要的出错代码在文件 `SocietyLoginManager.m` 中的约 112 行处。
所以对返回的数据增加对应的日期格式化函数，并调用即可。
主要的处理函数，相关的调用去查看源代码即可。
{% codeblock lang:objc%}
//处理 返回数据中的 expirationDate 值，因为值的格式有问题，转换成 string 后才能符合 json 的格式要求。 ********开始********
//Commit by Parry at 2016-01-26

- (NSMutableDictionary*)change: (NSDictionary *)message {

  NSMutableDictionary* data = [message mutableCopy];
  if ([message objectForKey:@"expirationDate"]) {
\
    NSDateFormatter *dateToStringFormatter = [[NSDateFormatter alloc] init];
    [dateToStringFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
\
    NSDate *date= [data objectForKey:@"expirationDate"];
    NSString *strDate = [dateToStringFormatter stringFromDate:date];
\
    data = [message mutableCopy];
\
    [data setObject:strDate forKey:@"expirationDate"];
  }
  return data;
\
}

//处理 返回数据中的expirationDate值，因为值的格式有问题，转换成 string 后才能符合 json 的格式要求。 ********结束********
{% endcodeblock %}

这样，这个 React Native 下的 SNS 登录通用组件就可以完美地使用了。
使用中有任何问题欢迎留言交流、讨论。
