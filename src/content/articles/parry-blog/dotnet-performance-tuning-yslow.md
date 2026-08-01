---
title: ".NET 性能调优之三:YSlow相关规则的调优工具和方法"
description: "在这篇文章里来谈谈 web 前端的相关优化,主要遵从 YSlow 规则,具体的规则意义在 YSlow的23条规则描述 里已经描述的很清楚,不再赘述,那么这里主要来探讨下如何针对部分规则进行相关调优。 <!--more--"
section: "parry-blog"
slug: "dotnet-performance-tuning-yslow"
lang: "zh-CN"
status: "published"
tags: [".NET","ASP.NET","网站开发","性能优化","YSlow","技术文章"]
publishedAt: "2013-01-08T10:01:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_08124426-ffb4c4941f394ae19c8bb36d798ff46e.png"
author: "Parry Qiu"
---
在这篇文章里来谈谈 web 前端的相关优化，主要遵从 [YSlow](http://yslow.org/) 规则，具体的规则意义在 [YSlow的23条规则描述](http://yslow.org/) 里已经描述的很清楚，不再赘述，那么这里主要来探讨下如何针对部分规则进行相关调优。
<!--more-->

## 1. YSlow 简介
雅虎的 https://oindk07nf.qnssl.comeb 页面进行性能改善的 [34条规则](http://developer.yahoo.com/performance/rules.html) ，而 YSlow 从里面提取出来了 23 条规则来指导开发者进行 web 页面优化，常被称为 23 条军规，具有很强的指导意义。要知道，第一个开始做门户类 web 网站并且当年做的风生水起的就是雅虎。

运行相关的 YSlow 插件对需要分析的网站分析后，插件会给出这个网站的整体评分和 23 条规则的详细评分，以供开发者逐条优化，评分从 A-F，分值越高（ A 最高 F 最低），说明与规则越贴合。

![](https://devopenclub.parryqiu.com/blog_08124426-ffb4c4941f394ae19c8bb36d798ff46e.png)

## 2.https://oindk07nf.qnssl.com

下面这张图是 YSlow 提供的插件，按照自己的需要 [下载安装](http://yslow.org/) 即可。

![](https://devopenclub.parryqiu.com/blog_08124826-7ed9c0f824f24a61b8b5fb8571c26d0d.png)

以 Chrome 为例，打开需要分析的网站，安装后点击插件工具栏的 YSlow 图标运行分析后即可看到分析结果。

下面列出了 YSlow 的 23 条规则。

这里暂且不去探讨如 CDN 等服务器部署架构方面的内容，只从代码实现优化的角度去讨论这些规则。

1.  [Minimize HTTP Requests](http://developer.yahoo.com/performance/rules.html#num_http)
2.  [Use a Content Delivery Network](http://developer.yahoo.com/performance/rules.html#cdn)
3.  [Avoid empty src or href](http://developer.yahoo.com/performance/rules.html#emptysrc)
4.  [Add an Expires or a Cache-Control Header](http://developer.yahoo.com/performance/rules.html#expires)
5.  [Gzip Components](http://developer.yahoo.com/performance/rules.html#gzip)
6.  [Put StyleSheets at the Top](http://developer.yahoo.com/performance/rules.html#css_top)
7.  [Put Scripts at the Bottom](http://developer.yahoo.com/performance/rules.html#js_bottom)
8.  [Avoid CSS Expressions](http://developer.yahoo.com/performance/rules.html#css_expressions)
9.  [Make JavaScript and CSS External](http://developer.yahoo.com/performance/rules.html#external)
10.  [Reduce DNS Lookups](http://developer.yahoo.com/performance/rules.html#dns_lookups)
11.  [Minify JavaScript and CSS](http://developer.yahoo.com/performance/rules.html#minify)
12.  [Avoid Redirects](http://developer.yahoo.com/performance/rules.html#redirects)
13.  [Remove Duplicate Scripts](http://developer.yahoo.com/performance/rules.html#js_dupes)
14.  [Configure ETags](http://developer.yahoo.com/performance/rules.html#etags)
15.  [Make AJAX Cacheable](http://developer.yahoo.com/performance/rules.html#cacheajax)
16.  [Use GET for AJAX Requests](http://developer.yahoo.com/performance/rules.html#ajax_get)
17.  [Reduce the Number of DOM Elements](http://developer.yahoo.com/performance/rules.html#min_dom)
18.  [No 404s](http://developer.yahoo.com/performance/rules.html#no404)
19.  [Reduce Cookie Size](http://developer.yahoo.com/performance/rules.html#cookie_size)
20.  [Use Cookie-Free Domains for Components](http://developer.yahoo.com/performance/rules.html#cookie_free)
21.  [Avoid Filters](http://developer.yahoo.com/performance/rules.html#no_filters)
22.  [Do Not Scale Images in HTML](http://developer.yahoo.com/performance/rules.html#no_scale)
23.  [Make favicon.ico Small and Cacheable](http://developer.yahoo.com/performance/rules.html#favicon)

## 3. 如何减少 HTTP 请求和 CSS Sprite 工具

减少 HTTP 请求的目的可以去查看规则的详细解释，或者使用 Chrome 里面开发者插件的 Network 功能请求一个网站后查看资源请求的 Timeline 你就应该能明白了，这里就不再赘述。
实现减少 HTTP 请求方面，资源文件方面能做的就是合并操作了，包括 CSS、JavaScript 的合并，当然还包含图片的合并。
关于 Chttps://oindk07nf.qnssl.com
而图片的合并最常用的方法就是 CSS Sprite 技术了，具体的原理解释见 [这里](http://baike.baidu.com/view/2173476.htm)。
这是网易首页使用 CSS Sprite 技术合并后的图片。

![](https://devopenclub.parryqiu.com/blog_08165337-858d0444a7f54dfd9bb18443dbd5adce.png)

网站如果在前期就使用 CSS Sprite 技术对图片进行了合并，开发起来还是挺方便的，而如果是开发好后再来整理零散的图片就会很麻烦，需要对齐图片像素、调整相关 CSS 样式等。
还好有工https://oindk07nf.qnssl.com工具：[CSS Sprite Generator](http://cn.spritegen.website-performance.org/)

将需要合并的图片压缩成一个 zip 包上传，并配置相关的选项。

![](https://devopenclub.parryqiu.com/blog_08165300-09970aa8903d4fa2a1c616888e5b4647.png)

点击生成按钮后，即可生成对应的 CSS 和合并后的图片，红线标注的部分就是 CSS Sprite 技术的精髓：通过图片的偏移实现显示合并的图片上不同位置的小图片。

![](https://devopenclub.parryqiu.com/blog_08165515-fb22bd09c7d147529d3ebc85a274abcd.png)

很简单对吗？为什么还不动动手将你网站零散的图片进行合并来降低网站对服务器的 HTTP 的请求呢？

## 4. GZIP 压缩和资源文件压缩

GZIP 压缩有时能达到 80% 左右的压缩率，如果可以开启（有些虚拟主机没有权限开启）就尽量开启吧。
关于 GZIP的详细设置、压缩比较等内容可以参见我之前的文章。
而关于 CSS、JavaScript 资源的压缩可以参见我之前的文章。
当然有很多方法、框架可以实现这类的功能，可以在了解了原理后自行搜索相关文章。

## 5. CSS、JavaScript资源文件相关

*   尽量不要使用CSS表达式，如 background-color: expression((new Date()).getHours()%2?"#B8D4FF":"#F08A00") 这样的内容，因为会带来诸多的浏览器性能问题。
*   不要有重复的脚本内容。
*   AJAX使用缓存并尽量使用 get 进行请求。

## 6. 图片相关

*   不要将 src、href 的属性设置为空。
*   不要强制去缩放图片，如这样的标签 `<img width="100" height="100" src="mycat.jpg" alt="My Cat" />` 中的图片，就不要使用宽高大于 100px 的图片，不然会带来如加载缓慢、图片模糊等问题。
*   不要使用太大的 favicon.ico，推荐是 1K 以下并设置缓存。

## 7. 结语

YSlow 的 23 条规则基本包含了 web 前端优化的众多细节，优化时各个规则突破，如果网站跑分等级能在 C 以上，最起码从前端性能和 SEO 方面来说就很不错了。
了解这 23 条优化规则也能在开发的过程中引导着你处理和决策问题的方法，所以还是很有益处的。
文章有所疏漏和要补充的，请留言一起讨论，也请关注后续的相关文章。
