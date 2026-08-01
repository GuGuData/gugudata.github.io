---
title: "跨域SSO的实现之一:架构设计"
description: "翻译自 CodeProject 网站 ASP.NET 9月份最佳文章:Single Sign On (SSO) for cross-domain ASP.NET applications。 翻译不妥之处还望大家多多指导、相互交流。 文章分为两部分:架构设计和程序实现,此为第一篇即:架构设计或者叫设计蓝图(Part-I…"
section: "parry-blog"
slug: "sso-for-cross-domain-aspnet-applications-part-i-the-design-blue-print"
lang: "zh-CN"
status: "published"
tags: ["ASP.NET","架构","英文翻译","SSO","技术文章"]
publishedAt: "2010-10-28T03:34:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://images.cnblogs.com/cnblogs_com/parry/Forms_Authentication.png"
author: "Parry Qiu"
---
翻译自 CodeProject 网站 ASP.NET 9月份最佳文章：[Single Sign On (SSO) for cross-domain ASP.NET applications](http://www.codeproject.com/KB/aspnet/CrossDomainSSOModel.aspx)。
翻译不妥之处还望大家多多指导、相互交流。
文章分为两部分：架构设计和程序实现，此为第一篇即：架构设计或者叫设计蓝图（Part-I - The design blue print）。
<!--more-->

## 简介

周一的早晨，当你正在纳闷周末咋就一眨眼过去了并对接下来漫长的一周感到无比蛋疼之时，你收到了一份Email。

操蛋的是它既不是微软的offer也不是Google的offer，而是客户发来的一个新需求。

他说你们现在帮我们公司做了很多的ASP.NET的网站和忽悠我们上线的各种系统，现在我想要我的客户只要在我们拥有的任何一个网站上登录一次，那么在我所有的网站上该用户就都已经登录了，同样，随便他从哪个网站上注销掉，那么他也就从我们所有的网站上注销了......

你受不了客户这么罗嗦了，心想不就是要一个SSO功能吗？使用ASP.NET的form authentication不就可以实现了？因为这样可以在同域的不用网站下共享cookie，只需要在machineKey设置一样的配置节就可以了。放狗一搜，果然有xxxx条结果。放狗找东西可是我们程序员的特长。

开工前，你又扫了一眼邮件，等等，你看到了邮件中的一行话，微微一蛋疼：我们部署了那些网站，但不是都在同一个域名下。

你的客户狠狠地给你来了个下马威，好像他早就放狗搜过，因为cookie不能跨域共享，也就不能用来实现跨域验证了。

这到底是神马一回事情！（和老外一样扯玩淡，下面正经些）

## ASP.NET中的验证原理

这个问题可能是老生常谈了，但在解决难题之前，还是先回归基础来看一看事物的本质到底是如何的。因此，我们重温一下ASP.NET表单验证的原理也并不坏。\
下面是ASP.NET表单验证的流程图

![](https://images.cnblogs.com/cnblogs_com/parry/Forms_Authentication.png)

验证流程

1：你访问一个需要用户验证的ASP.NET页面

2：在此请求中ASP.NET运行时开始查找cookie(由于表单验证的cookie)，如果没有查找到，那么将跳转到登录页面(登录页地址配置在了web.config文件中)

3：在登录页面中，你提供了相关的验证凭证并点击了登录按钮，系统和已存储的数据对比验证成功后，将Thread.CurrentPrincipal.Identity.Name的属性值设置成了你提供的用户名，并在Response中写入了cookie(同时还写入了用户信息和一些如cookie名，失效日期等)，并重定向到登录前的页面。

4：当你再点击其他的页面(或者点击导航到其他的页面)，浏览器发送验证的cookie(也可能包含在该网站下写入的一些其他cookie)，这一次已经包含了在上一次response中上次验证获取到的cookie。

5：和以前一样，ASP.NET运行时在请求中查找验证的cookie，这一次找到了，接下来做一些检查(如失效日期、路径等等)，如果还没有失效，那么读取出它的值，恢复出用户的信息，将Thread.CurrentPrincipal.Identity.Name的属性值设置成恢复出的用户名，检查该用户是否有权限去访问当前请求的页面，如果有，那么页面执行的结果返回到用户的浏览器。

过程很简单，对吗？

## ASP.NET中多站点同域下的验证原理

如前所述，ASP.NET表单验证完全依赖于cookie。那么只要使得不同的站点共享同样的验证cookie，那么就可以实现在一个站点登录实现所有站点的登录。

HTTP协议指出，如果两个站点是同域(或者是子域)的，那么可以共享cookie。本地的处理是浏览器根据网站的URL存储cookie在本地(磁盘或者内存中)。当你请求接下来的任意页面时，浏览器读取和当前请求的URL匹配的域或子域的cookies，并将此cookies包含在当前的请求中。

现在我们假设有下面两个网站：

[www.mydomain.com/site1](http://www.mydomain.com/site1)

[www.mydomain.com/site2](http://www.mydomain.com/site2)

这两个站点共享同样的主机地址(同样的域mydomain.com和子域www)，且两个站点都被配置成了对用户验证和授权都使用表单验证。假设你已经登录过了站点[www.mydomain.com/site1](http://www.mydomain.com/site1)，如前所述，你的浏览器现在对于站点[www.mydomain.com/site1](http://www.mydomain.com/site1)已经有了表单验证的cookie。

现在你随意访问以[www.mydomain.com/site1](http://www.mydomain.com/site1)开头的URL，表单验证的cookie都将被包含在请求被发送。为什么？是因为此cookie本来就属于该站点吗？对的，但不是完全正确。事实上，是因为请求的URL：[www.mydomain.com/site1](http://www.mydomain.com/site1)和[http://www.mydomain.com/](http://www.mydomain.com/)拥有同样的域名和子域名。

那么在你登录了[www.mydomain.com/site1](http://www.mydomain.com/site1)后，如果你点击[www.mydomain.com/site2](http://www.mydomain.com/site2)下的URL，表单验证的cookie也将被包含在请求中发送，这同样是因为[www.mydomain.com/site2](http://www.mydomain.com/site2)与站点[http://www.mydomain.com/](http://www.mydomain.com/)拥有同样的域名和子域名，尽管它是不一样的应用站点(site2)。显然，在拥有一样主机地址不一样的应用站点名之间是可以共享表单验证cookie的，这样就实现了一处登录处处都已经登录的功能(也就是单点登录)。

然而，ASP.NET没有允许你仅仅通过将同主机地址下的站点部署上表单验证后就自动完成了单点登录。为什么这样呢？因为每一个不同的ASP.NET web应用程序使用它自己的密钥去加密和加密cookie(还有诸如ViewState之类的)从而确保了安全。除非你给每一个站点指定了同样的加密密钥，那么cookies将被发送，但是另一个应用站点不能够读取验证cookies的值。

指定同样的验证密钥可以解决这个问题。为每一个ASP.NET应用站点使用同样的<machinekey>配置节即可，如下：

{% codeblock lang:csharp%}
<machineKey\
  validationKey="YOUR_VALUE"\
  decryptionKey="YOUR_VALUE"\
  validation="SHA1"\
  decryption="AES"/>\

{% endcodeblock %}

如果同样的machinekey(包括validationKey和decryptionKey)被用在同域下的所有应用站点时，就可以实现了跨站点读取cookie。\

## 如果是同样的域不同的子域呢？

假定你有下面两个站点：\
site1.mydomain.com\
site2.mydomain.com\
这两个站点共享同样的域(同样的二级域名mydomain.com)，但拥有不一样的三级域名(不一样的子域site1和site2)。\
默认情况下浏览器仅仅发送主机地址一样(相同的域和子域)的站点的cookie。因此站点site1.mydomain.com不能获取到站点site2.mydomain.com下的cookie(因为他们没有相同的主机地址，它们的子域不同)，尽管你为这两个站点配置了相同的machineKey，一个站点还是不能获取另一个站点下的cookie。\
除了你为所有的站点配置了一样的machineKey，你还需要为验证cookie定义相同的域以使得浏览器在同样的域名下能够发送任何请求。

你需要像下面这样配置表单验证cookie：

<div><span style="color: #0000ff;"><</span><span style="color: #800000;">forms </span><span style="color: #ff0000;">name</span><span style="color: #0000ff;">="name"</span><span style="color: #ff0000;"> loginUrl</span><span style="color: #0000ff;">="URL"</span><span style="color: #ff0000;"> defaultUrl</span><span style="color: #0000ff;">="URL"</span><span style="color: #ff0000;"> domain</span><span style="color: #0000ff;">="mydomain.com"</span><span style="color: #0000ff;">/></span><span style="color: #000000;">\
</span>

### 那么，在不用的域下如何去共享验证cookie呢?

显然这是不可能的，因为HTTP协议基于安全的原因阻止了你在不同的域之间共享cookie。\
同样，假设有下面这两个域名：\
[http://www.domain1.com/](http://www.domain1.com/)\
[http://www.domain2.com/](http://www.domain2.com/)\
如果你使用表单验证登录进了[http://www.domain1.com/](http://www.domain1.com/)，当你点击[http://www.domain2.com/](http://www.domain2.com/)下的URL时，浏览器将不能发送domain1.com的cookie到domain2.com。在ASP.NET中没有内置的方法去完成在两个不同的站点间实现单点登录。\
要在两个站点间通过访问同样的cookie来实现单点登录，还真没有什么高级的技巧或即有的架构模型去解决它。\

### 跨域单点登录设计雏形

假设有下面三个站点：\
[http://www.domain1.com/](http://www.domain1.com/)

[http://www.domain2.com/](http://www.domain2.com/)\
[http://www.domain3.com/](http://www.domain3.com/)\
为了实现在这些站之间实现SSO，当用户在任意一个站登录时，我们需要为所有的站点设置验证cookie。\
如果用户1登录进[http://www.domain1.com/](http://www.domain1.com/)，那么在给站点1response前会在response中加入验证的cookie，但当我们需要同时能够登录进[http://www.domain2.com/](http://www.domain2.com/)和[http://www.domain3.com/](http://www.domain3.com/)时，我们需要同时在同样的客户端浏览器上为站点2和站点3设置验证cookie。因此，在response返回到浏览器前，站点1不得不定向到站点2和站点3去设置验证cookie。

下面的流程图详细描述了思路：

![](https://images.cnblogs.com/cnblogs_com/parry/Basic_SSO_model_overview.png)

操作流程：\
![](https://images.cnblogs.com/cnblogs_com/parry/SSO_Basic_Model.png)
请求[http://www.domain1.com/](http://www.domain1.com/)中一个需要验证的页面
<span style="color: #000000;">状态：浏览器没有验证cookie</span>浏览器发送一个请求到[http://www.domain1.com/](http://www.domain1.com/)，但请求中没有验证cookie(因为还没有属于[http://www.domain1.com/](http://www.domain1.com/)的cookie)。
<span style="color: #000000;">状态：浏览器没有验证cookie\
</span>因为请求中没有验证cookie，所以请求[http://www.domain1.com/](http://www.domain1.com/)的登录页面
<span style="color: #000000;">状态：浏览器没有验证cookie</span>用户提供登录凭证点击登录按钮，浏览器发送一个POST请求到[http://www.domain1.com/](http://www.domain1.com/)\
[http://www.domain1.com/](http://www.domain1.com/)验证用户提供的登录凭证，验证通过后，标记用户的状态为已登录，添加验证的cookie和其他的用户信息一起添加在response中
<span style="color: #000000;">状态：浏览器没有验证cookie</span>response并没有返回给浏览器，而是将请求重定向到[http://www.domain2.com/](http://www.domain2.com/)的一个页面，并将ReturnUrl设置成重定向前[http://www.domain1.com/](http://www.domain1.com/)的URL值。在验证cookie被包含在了response中了后，cookie被发送给浏览器。
<span style="color: #000000;">状态：浏览器没有验证cookie</span>浏览器接收到了包含验证cookie的response和重定向到[http://www.domain2.com/](http://www.domain2.com/)的命令。浏览器存储了[http://www.domain2.com/](http://www.domain2.com/)的验证cookie并向[http://www.domain2.com/](http://www.domain2.com/)发送请求。[
<span style="color: #000000;">状态：浏览器包含了http://www.domain2.com/的验证cookie</span>http://www.domain2.com/](http://www.domain2.com/)立即再重定向到存储在ReturnUrl中的URL地址，在此请求中读取cookie值并为[http://www.domain1.com/](http://www.domain1.com/)设置验证cookie。最终，在重定向的命令中也包含了这些验证cookie。
<span style="color: #000000;">状态：浏览器包含了[http://www.domain2.com/](http://www.domain2.com/)的验证cookie</span>浏览器接收到包含了验证cookie的重定向命令跳转到[http://www.domain1.com/](http://www.domain1.com/)。现在浏览器存储了站点1的验证cookie并开始请求站点1，当然在请求中包含了验证cookie。
<span style="color: #000000;">状态：浏览器包含了http://www.domain1.com/和[http://www.domain2.com/](http://www.domain2.com/)的验证cookie</span>站点1检查了请求中包含了验证cookie，就不需要再去跳转到验证页面去验证，而是返回用户请求的页面
<span style="color: #000000;">状态：浏览器包含了http://www.domain1.com/和http://www.domain2.com/的验证cookie</span>

如果此时用户请求站点2， 因为浏览器已经存储了站点2的验证cookie，cookie将被包含在请求中，站点2从cookie中获取到用户信息，并为此用户返回请求的页面。\
当浏览器验证了站点2和站点3后，那么用户就已经登录了所有的站点，这样就完成了一次单点登录。

### 如何单点注销？

作为单点登录的一部分，我们还需要去关注下单点注销，就是说当用户在一个站点注销后，那么就认为他从所有的站点都注销了。\
清除所有站点的cookie和上面登录一样，也是请求-重定向-返回的过程。只是和设置验证cookie不一样的是，这次从response中移除验证cookie。\

### 此单点登录模型的缺点

这个模型在两个站点上还是能运行的很好的。从一个站点登录或注销，此SSO模型下的站点都将遵从请求-重定向-返回的流程。当用户登录任一页面时，因为已经存储了所有站点的验证cookie，那么就不需要再执行上面的那个循环的流程了。\
但是当站点超过两个时，问题就变得复杂了，当登录站点1时，程序将重定向到站点2和站点3进行验证cookie的设置，最后站点3在跳转到站点1，服务器返回用户请求的页面。这使得每个站点的登录和注销的过程变得复杂并花费较高的代价。如何超过3个站点呢？如果这样去设计20+站点的单点登录呢？这个模型将完全不能胜任了。\
并且此模型需要每个站点都具备用户验证逻辑，因为需要来请求此站点并设置其验证cookie。\
因此此模型丢失了一般意义上的单点登录的概念，我们需要一个更好一点的模型去实现单点登录的功能。\

### 更好的跨域单点登录架构

前面提到的架构中，设置移除cookie都需要跳转到N-1个站点去完成。每个站点还需要知道N-1个站点复杂的登录注销逻辑，\
如果我们为所有的站点只去维护一份验证cookie呢？使用一个独立的站点去完成验证用户并设置验证cookie的工作呢？这个想法好像不错。\
要使用单点登录，那么就需要用户的数据是统一的，这样的话就可以通过一个站点提供web或者WCF服务来完成验证和授权的功能。这样就省去了冗余的用户验证逻辑，现在最重要的是这个独立的站点如何在SSO架构中起作用。\
在这个架构模型中，浏览器不存储任何其他站点的验证cookie，只存那个独立站点的验证cookie，我们就给它起名叫[http://www.sso.com/](http://www.sso.com/)。\
在此架构中，对每一个站点的请求都将被直接跳转到[http://www.sso.com/](http://www.sso.com/)，由于检查验证cookie是否存在。如果cookie存在，如果存在，返回请求的页面，如果不存在，那么就跳转到对应的登录页面。\
大致流程图如下：

![](https://images.cnblogs.com/cnblogs_com/parry/Proposed_SSO_model_overview.png)

便于理解，我们假定有下面两个网站：\
[http://www.domain1.com/](http://www.domain1.com/)\
[http://www.domain2.com/](http://www.domain2.com/)\
还有一个用于管理验证cookie的站点：[http://www.sso.com/](http://www.sso.com/)。\
验证流程如下：

![](https://images.cnblogs.com/cnblogs_com/parry/SSO_Proposed_Model_Part_I.png)

用户请求[http://www.domain1.com/](http://www.domain1.com/)中一个需要验证的页面\
重定向到[http://www.sso.com/](http://www.sso.com/)，ReturnUrl参数设置成请求站点1时的URL。\
[http://www.sso.com/](http://www.sso.com/)检查是否有验证cookie存在，如果在请求中没有任何用户令牌存在，那么请求中带着用户需要登录的指令就跳转到站点1。在query string中仍然保留着之前ReturnUrl参数的值。\
站点1从参数中得知是从[http://www.sso.com/](http://www.sso.com/)跳转而来，且得知没有用户验证cookie，最后跳转到站点1的登录页面进行登录，而不跳转到[http://www.sso.com/](http://www.sso.com/)。\
![](https://images.cnblogs.com/cnblogs_com/parry/SSO_Proposed_Model_Part_II.png)用户提供验证信息点击登录按钮，请求没有回置到站点[http://www.sso.com/](http://www.sso.com/)，这时，站点1通过[http://www.sso.com/](http://www.sso.com/)提供的web/WCF接口进行用户的验证，如果验证成功，那么为用户颁发一个令牌(可以是一个GUID)。\
站点1标志用户已经登录成功（在session中存储用户对象），一个包含了令牌的URL跳转到[http://www.sso.com/](http://www.sso.com/)设置验证cookie，ReturnUrl参数还是设置成前面请求的URL。\
[http://www.sso.com/](http://www.sso.com/)站点检查过来的URL，发现有用户令牌，但还没有用户验证cookie，说明已经通过了站点1的认证，现在需要设置站点[http://www.sso.com/](http://www.sso.com/)下的验证cookie。照例设置好了cookie后，将cookie添加在response中，还添加上用户令牌按照ReturnUrl参数中的URL一并返回。\
浏览器得知要跳转到站点1，并且有了站点[http://www.sso.com/](http://www.sso.com/)的验证cookie，在本地存储下sso站点的验证cookie并对站点1发起请求。\
站点1检查了用户令牌，因为是通过站点SSO的web/WCF服务验证并通过的，所以站点1返回用户请求的页面。\
![](https://images.cnblogs.com/cnblogs_com/parry/SSO_Proposed_Model_Part_III.png)

现在用户请求站点2\
浏览器跳转到sso站点，依然设置好ReturnUrl的值。\
浏览器因为要跳转到sso站点，发现本地有了sso站点的验证cookie，所以将cookie添加在请求中一并发出。\
sso站点检查cookie，发现cookie还没有过期，那么在query string中添加上用户令牌按照ReturnUrl返回。\
站点2发现有用户令牌，证明已经走过验证流程，那么就返回用户请求的页面。

### 总结

刚开始，浏览器没有任何[http://www.sso.com/](http://www.sso.com/)站点下的验证cookie。请求站点1和站点2任何需要验证的页面(需要内部的跳转到sso站点检查验证cookie是否存在)。用户登录后，sso站点的验证cookie存储在本地（重要的是用户令牌仅仅用户用户登录会话时）。\
现在请求站点1或者站点2都跳转到sso站点，浏览器发送sso站点的验证cookie并检查用户令牌，验证后再跳转到原始请求的URL，原始站点检查用户令牌正确后返回用户请求的页面。\

### 传输代价

**场景1：访问公共页面\
**从浏览器到站点+站点到浏览器\
1请求+1返回\
**场景2：访问一个需要验证的页\
**从浏览器到站点+重定向到sso站点（检查cookie）+重定向到原站点（没有cookie）+原站点返回登录页面到浏览器\
1请求+2跳转+1返回\
**场景3：登录\
**浏览器POST到站点+调用验证服务进行用户验证+浏览器跳转到SSO站点（带有令牌）+重定向到原站点（带有验证cookie）+通用服务验证令牌+返回用户请求的需要验证的页面\
1请求+2验证服务调用+2跳转+1返回\
**场景4：登录后请求一个需要验证的页面\
**请求站点+向SSO站点跳转验证cookie（带有验证cookie）+跳转到原站点（检查验证cookie）+调用服务验证令牌+返回请求页面\
1请求+2跳转+1服务请求+1返回\
**场景5:注销\
**请求站点进行注销+请求SSO站点进行注销+请求原站点移除验证cookie+返回\
1请求+2跳转+1返回\

### 孰是孰非

比较这两种架构，第一中架构更适合两个站点，最多三个站点，虽然需要部署复杂冗余的验证逻辑，但是随后的页面请求中就是普通的页面请求了（1请求+1返回）。\
第一种架构不易于扩展，且会冗余出很多的用户验证逻辑。\
而第二种架构，不管有多少个需要进行单点登录的网站，也不需要其他网站参与此过程，验证的cookie只有sso站点管理，这样的架构逻辑清晰、易扩且部署方便。\
然而有一些性能的问题，不同于第一种架构，这种架构当用户请求一个需要验证的页面时需要请求三次（请求sso站点和原站点，两次请求是内部的跳转），且多的两次请求花费的时间很少（空跳转请求，用于设置和检查cookie），在如今这样的网络环境下是可以接受的。\

### 第二种架构的程序实现

等有空了来翻译完第二部分：程序实现\
等不及的朋友可以先看原文：[http://www.codeproject.com/KB/aspnet/CrossDomainSSOExample.aspx](http://www.codeproject.com/KB/aspnet/CrossDomainSSOExample.aspx)

[程序实现源码下载](http://files.cnblogs.com/parry/sso.zip)
