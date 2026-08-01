---
title: "跨域SSO的实现之二:功能实现"
description: "在上篇跨域SSO的实现之一:架构设计中主要谈及了跨域SSO的实现原理,在这篇中主要介绍下此功能的实现。 <!--more-- 文章还是对应于第一篇翻译文章的第二部分:Single Sign On (SSO) for cross-domain ASP.NET applications: Part-II - The im…"
section: "parry-blog"
slug: "sso-for-cross-domain-aspnet-applications-part-ii-the-implementation"
lang: "zh-CN"
status: "published"
tags: ["ASP.NET","架构","英文翻译","SSO","技术文章"]
publishedAt: "2010-11-17T03:15:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/579ff348fc7a29542f9351792c792153.png"
author: "Parry Qiu"
---
在上篇[跨域SSO的实现之一：架构设计](http://www.cnblogs.com/parry/archive/2010/10/28/SSO_for_cross_domain_ASPNET_applications_Part_I_The_design_blue_print.html)中主要谈及了跨域SSO的实现原理，在这篇中主要介绍下此功能的实现。
<!--more-->
文章还是对应于第一篇翻译文章的第二部分：[Single Sign On (SSO) for cross-domain ASP.NET applications: Part-II - The implementation](http://www.codeproject.com/KB/aspnet/CrossDomainSSOExample.aspx)。

今天读了一遍，发现都是对第一篇文章中原理的再解释。

并且作者还提供了一个*SSOLib.dll*，使用此dll可以实现网站SSO的部署。

主要实现的原理图

![](https://assets.devopen.club/uPic/202608/gugudata-pages/579ff348fc7a29542f9351792c792153.png)

 而在sso站点中需要实现的方法如下：

 ![](https://assets.devopen.club/uPic/202608/gugudata-pages/e13817d5b94a39fc07b1e173fe382d78.png)

主要需要去理解下第一篇文章中提到的实现原理就可以了。

[源码下载](http://files.cnblogs.com/parry/sso.zip)
