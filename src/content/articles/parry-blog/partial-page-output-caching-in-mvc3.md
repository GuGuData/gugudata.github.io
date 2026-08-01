---
title: "MVC3 缓存之三:MVC3中的局部缓存(Partial Page)"
description: "在之前的文章 MVC3 缓存之二:页面缓存中的局部动态中,没有注意到 MVC3 的版本中对输出缓存进行了修改,园友的评论中提及了此问题,所以又去抽时间看了下局缓存的解决方案。 <!--more-- 最后发现在发布的MVC3版本中,新增了一个叫做Partial Page的东西,即可以对载入到当前页面的另外的一个View…"
section: "parry-blog"
slug: "partial-page-output-caching-in-mvc3"
lang: "zh-CN"
status: "published"
tags: ["ASP.NET","MVC","页面缓存","网站优化","技术文章"]
publishedAt: "2011-04-11T06:59:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://images.cnblogs.com/cnblogs_com/parry/ca2.png"
author: "Parry Qiu"
---
在之前的文章 MVC3 缓存之二：页面缓存中的局部动态中，没有注意到 MVC3 的版本中对输出缓存进行了修改，园友的评论中提及了此问题，所以又去抽时间看了下局缓存的解决方案。
<!--more-->
最后发现在发布的MVC3版本中，新增了一个叫做Partial Page的东西，即可以对载入到当前页面的另外的一个View进行缓存后输出，这与我们之前讨论的局部动态刚好相反了，即之前我们进行这个页面的缓存，然后对局部进行动态输出，现在的解决方案是：页面时动态输出的，而对需要缓存的局部进行缓存处理。查来查去还没有看到局部动态的解决方案，所以我们先看看局部缓存的处理方法。

## 局部缓存（Partial Page）

我们先建立一个需要局部缓存的页面View，叫做PartialCache.cshtml，页面内容如下：

{% codeblock lang:csharp%}
<p>@ViewBag.Time2</p>
{% endcodeblock %}

在其对应的Controller中添加对应的Action

<div><span style="color: #000000;">[OutputCache(Duration </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #800080;">10</span><span style="color: #000000;">)]\

</span><span style="color: #0000ff;">public</span><span style="color: #000000;"> ActionResult PartialCache()\

{\

    ViewBag.Time2 </span><span style="color: #000000;">=</span><span style="color: #000000;"> DateTime.Now.ToLongTimeString();\

    </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> PartialView();\

}</span>

我们可以看到对其Action做了缓存处理，对页面进行缓存10秒钟。

而在Index的View中调用此缓存了的页面则需要这样：\

<div><span style="color: #000000;">@{\

    ViewBag.Title = "Index";\

}\

</span><span style="color: #0000ff;"><</span><span style="color: #800000;">h2</span><span style="color: #0000ff;">></span><span style="color: #000000;">\

    OutputCache Demo</span><span style="color: #0000ff;"></</span><span style="color: #800000;">h2</span><span style="color: #0000ff;">></span><span style="color: #000000;">\

</span><span style="color: #0000ff;"><</span><span style="color: #800000;">p</span><span style="color: #0000ff;">></span><span style="color: #000000;">\

    No Cache</span><span style="color: #0000ff;"></</span><span style="color: #800000;">p</span><span style="color: #0000ff;">></span><span style="color: #000000;">\

</span><span style="color: #0000ff;"><</span><span style="color: #800000;">div</span><span style="color: #0000ff;">></span><span style="color: #000000;">@DateTime.Now.ToLongTimeString()\

</span><span style="color: #0000ff;"></</span><span style="color: #800000;">div</span><span style="color: #0000ff;">></span><span style="color: #000000;">\

</span><span style="color: #0000ff;"><</span><span style="color: #800000;">br </span><span style="color: #0000ff;">/></span><span style="color: #000000;">\

</span><span style="color: #0000ff;"><</span><span style="color: #800000;">p</span><span style="color: #0000ff;">></span><span style="color: #000000;">\

    Partial Cache 10 mins\

</span><span style="color: #0000ff;"></</span><span style="color: #800000;">p</span><span style="color: #0000ff;">></span><span style="color: #000000;">\

</span><span style="color: #0000ff;"><</span><span style="color: #800000;">div </span><span style="color: #ff0000;">class</span><span style="color: #0000ff;">="bar2"</span><span style="color: #0000ff;">></span><span style="color: #000000;">@Html.Action("PartialCache", "Index", null)</span><span style="color: #0000ff;"></</span><span style="color: #800000;">div</span><span style="color: #0000ff;">></span>

运行后，我们刷新页面可以发现Index的主体没有缓存，而引用到的<span style="color: #000000;">PartialCache进行了10秒缓存的处理。</span>

<div>
![](https://images.cnblogs.com/cnblogs_com/parry/ca2.png)\

[下载源码](http://files.cnblogs.com/parry/PartialView.rar "PartialView")\

</div></div></div>
