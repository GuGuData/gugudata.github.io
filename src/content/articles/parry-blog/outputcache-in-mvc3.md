---
title: "MVC3 缓存之一:使用页面缓存"
description: "在以前的WebForm的开发中,在页面的头部加上OutputCache即可启用页面缓存,而在MVC3中,使用了Razor模板引擎的话,该如何使用页面缓存呢? <!--more-- 如何启用"
section: "parry-blog"
slug: "outputcache-in-mvc3"
lang: "en"
status: "published"
tags: ["ASP.NET","MVC","页面缓存","网站优化","技术文章"]
publishedAt: "2011-03-19T03:15:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
在以前的WebForm的开发中，在页面的头部加上OutputCache即可启用页面缓存，而在MVC3中，使用了Razor模板引擎的话，该如何使用页面缓存呢？
<!--more-->
## 如何启用

在MVC3中要如果要启用页面缓存，在页面对应的Action前面加上一个OutputCache属性即可。

我们建一个Demo来测试一下，在此Demo中，在View的Home目录下的

ndex.cshtml中让页面输入当前的时间。

{% codeblock lang:csharp%}
@{\
    Layout = null;\
}\
<!DOCTYPE html>\
<html>\
<head>\
    &lt;title&gt;Index&lt;/title&gt;\
</head>\
<body>\
    <div>\
        <h2>\
            现在时间：@DateTime.Now.ToString("T")</h2>\
    </div>\
</body>\
</html>
{% endcodeblock %}

在Controllers中添加对应的Action，并加上OutputCache属性。

<span style="color: #0000ff">[HandleError]</span>
<div><span style="color: #0000ff">public</span><span style="color: #000000"> </span><span style="color: #0000ff">class</span><span style="color: #000000"> HomeController : Controller\
{\
    [OutputCache(Duration </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #800080">5</span><span style="color: #000000">, VaryByParam </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #800000">"</span><span style="color: #800000">none</span><span style="color: #800000">"</span><span style="color: #000000">)]\
    </span><span style="color: #0000ff">public</span><span style="color: #000000"> ActionResult Index()\
    {\
        </span><span style="color: #0000ff">return</span><span style="color: #000000"> View();\
    }\
}</span>

刷新页面即可看到页面做了一个10秒的缓存。当页面中数据不是需要实时的呈现给用户时，这样的页面缓存可以减小实时地对数据处理和请求，当然这是针对整个页面做的缓存，缓存的粒度还是比较粗的。

## 缓存的位置

可以通过设置缓存的Location属性，决定将缓存放置在何处。

Location可以设置的属性如下：

<div>· Any
<div>· Client
<div>· Downstream
<div>· Server
<div>· None
<div>· ServerAndClient

Location的默认值为Any。一般推荐将用户侧的信息存储在Client端，一些公用的信息存储在Server端。

加上Location应该像这样。

<div><span style="color: #000000">[HandleError]\
</span><span style="color: #0000ff">public</span><span style="color: #000000"> </span><span style="color: #0000ff">class</span><span style="color: #000000"> HomeController : Controller\
{\
    [OutputCache(Duration </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #800080">5</span><span style="color: #000000">, VaryByParam </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #800000">"</span><span style="color: #800000">none</span><span style="color: #800000">"</span><span style="color: #000000">, Location </span><span style="color: #000000">=</span><span style="color: #000000"> OutputCacheLocation.Client, NoStore </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #0000ff">true</span><span style="color: #000000">)]\
    </span><span style="color: #0000ff">public</span><span style="color: #000000"> ActionResult Index()\
    {\
        </span><span style="color: #0000ff">return</span><span style="color: #000000"> View();\
    }\
</span><span style="font-family: 'Courier New'; font-size: 13px" class="Apple-style-span">}</span>

## 缓存依赖

VaryByParam可以对缓存设置缓存依赖条件，如一个产品详细页面，可能就是根据产品ID进行缓存页面。

缓存依赖应该设置成下面这样。

<span style="color: red; ">在MVC3中对</span><span style="color: red; ">输出缓存进行了改进，OutputCache不需要手动指定VaryByParam，会自动使用Action的参数作为缓存过期条件。（感谢”散客游“提醒）</span>

<div><span style="color: #000000">[HandleError]\
</span><span style="color: #0000ff">public</span><span style="color: #000000"> </span><span style="color: #0000ff">class</span><span style="color: #000000"> HomeController : Controller\
{\
    [OutputCache(Duration </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #0000ff">int</span><span style="color: #000000">.MaxValue, VaryByParam </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #800000">"</span><span style="color: #800000">id</span><span style="color: #800000">"</span><span style="color: #000000">)]\
    </span><span style="color: #0000ff">public</span><span style="color: #000000"> ActionResult Index()\
    {\
        </span><span style="color: #0000ff">return</span><span style="color: #000000"> View();\
    }</span>
<div><span style="color: #000000"></span><span style="color: #000000">}\
</span>

## 另一种通用的设置方法

当我们需要对多个Action进行统一的设置时，可以在web.config文件中统一配置后进行应用即可。

在web.config中配置下Caching节点

<div><span style="color: #0000ff"><</span><span style="color: #800000">caching</span><span style="color: #0000ff">></span><span style="color: #000000">\
</span><span style="color: #0000ff"><</span><span style="color: #800000">outputCacheSettings</span><span style="color: #0000ff">></span><span style="color: #000000">\
    </span><span style="color: #0000ff"><</span><span style="color: #800000">outputCacheProfiles</span><span style="color: #0000ff">></span><span style="color: #000000">\
        </span><span style="color: #0000ff"><</span><span style="color: #800000">add </span><span style="color: #ff0000">name</span><span style="color: #0000ff">="Cache1Hour"</span><span style="color: #ff0000"> duration</span><span style="color: #0000ff">="3600"</span><span style="color: #ff0000"> varyByParam</span><span style="color: #0000ff">="none"</span><span style="color: #0000ff">/></span><span style="color: #000000">\
    </span><span style="color: #0000ff"></</span><span style="color: #800000">outputCacheProfiles</span><span style="color: #0000ff">></span><span style="color: #000000">\
</span><span style="color: #0000ff"></</span><span style="color: #800000">outputCacheSettings</span><span style="color: #0000ff">></span>
<div><span style="color: #0000ff">

<span style="color: #0000ff"></</span><span style="color: #800000">caching</span><span style="color: #0000ff">></span>
</span>

那么在Action上使用该配置节点即可，这样的方法对于统一管理配置信息比较方便。

<div><span style="color: #000000">[HandleError]\
</span><span style="color: #0000ff">public</span><span style="color: #000000"> </span><span style="color: #0000ff">class</span><span style="color: #000000"> HomeController : Controller\
{\
    [OutputCache(CacheProfile </span><span style="color: #000000">=</span><span style="color: #000000"> </span><span style="color: #800000">"</span><span style="color: #800000">Cache1Hour</span><span style="color: #800000">"</span><span style="color: #000000">)]\
    </span><span style="color: #0000ff">public</span><span style="color: #000000"> ActionResult Index()\
    {\
        </span><span style="color: #0000ff">return</span><span style="color: #000000"> View();\
    }</span>
<div><span style="color: #000000"></span><span style="color: #000000">}</span>
