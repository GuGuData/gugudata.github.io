---
title: "获取使用ClickOnce部署的应用程序的版本号"
description: "在编写使用 ClickOnce 部署的应用程序时,需要在程序的标题栏、软件变更记录、软件关于等页面读取显示当前的版本号。 <!--more-- 引子 之前很傻瓜的做法就是在 Resource 中维护一个 string 值,在使用到的地方读取,有更新修改 Resource 即可。 其实这样做也有一个好处,就是自己可以控…"
section: "parry-blog"
slug: "get-clickonce-publish-version-info"
lang: "zh-CN"
status: "published"
tags: [".NET","Winform","ClickOnce","技术文章"]
publishedAt: "2013-08-27T09:22:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/8107da8806e7411db9f8903d22ced3f5.png"
author: "Parry Qiu"
---
在编写使用 ClickOnce 部署的应用程序时，需要在程序的标题栏、软件变更记录、软件关于等页面读取显示当前的版本号。
<!--more-->
## 引子
之前很傻瓜的做法就是在 Resource 中维护一个 string 值，在使用到的地方读取，有更新修改 Resource 即可。
其实这样做也有一个好处，就是自己可以控制需要显示的版本号，版本信息显示到 Build 即可，而可能不需要显示到 Revsion。
![](https://assets.devopen.club/uPic/202608/gugudata-pages/8107da8806e7411db9f8903d22ced3f5.png)

## ClickOnce的版本值

这样每次修改都很麻烦，当不需要去控制显示的版本值时，直接读取 Publish 填写的版本值即可。
下面的代码即是读取 ClickOnce 版本值的方法。
{% codeblock lang:csharp %}
//获取Publish的版本
private Version GetRunningVersion()
{
    try
    {
        return System.Deployment.Application.ApplicationDeployment.CurrentDeployment.CurrentVersion;
    }
    catch
    {
        return Assembly.GetExecutingAssembly().GetName().Version;
    }
}
{% endcodeblock %}

这里需要注意的是，当在本地调试时，获取到的是 Assembly 中的版本值，即如下面在项目属性页面中设置的值。
![](https://assets.devopen.club/uPic/202608/gugudata-pages/172138f42688b7c5538685ec170100aa.png)
而当用户使用 ClickOnce 安装后，读取到的即是在 Publish 前设置的值。
