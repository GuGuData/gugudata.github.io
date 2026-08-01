---
title: "MVC3 缓存之二:页面缓存中的局部动态"
description: "在之前的文章中我们讨论了MVC中使用页面缓存的一些方法,而其中由于页面缓存的粒度太粗,不能对页面进行局部的缓存,或者说,如果我们想在页面缓存的同时对局部进行动态输出该怎么办?下面我们看下这类问题的处理。 <!--more-- MVC 有一个Post-cache substitution的东西,可以对缓存的内容进行替换。"
section: "parry-blog"
slug: "dynamiccontent-outputcache-in-mvc3"
lang: "en"
status: "published"
tags: ["ASP.NET","MVC","页面缓存","网站优化","技术文章"]
publishedAt: "2011-03-29T03:08:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
在之前的文章中我们讨论了MVC中使用页面缓存的一些方法，而其中由于页面缓存的粒度太粗，不能对页面进行局部的缓存，或者说，如果我们想在页面缓存的同时对局部进行动态输出该怎么办？下面我们看下这类问题的处理。
<!--more-->
MVC 有一个Post-cache substitution的东西，可以对缓存的内容进行替换。

## 使用Post-Cache Substitution

*   定义一个返回需要显示的动态内容string的方法。
*   调用HttpResponse.WriteSubstitution()方法即可。

示例，我们在Model层中定义一个随机返回新闻的方法。

{% codeblock lang:csharp%}
using System;\

using System.Collections.Generic;\

using System.Web;\

namespace MvcApplication1.Models\

{\

    public class News\

    {\

        public static string RenderNews(HttpContext context)\

        {\

            var news = new List<string>\

                {\

                    "Gas prices go up!",\

                    "Life discovered on Mars!",\

                    "Moon disappears!"\

                };\

            var rnd = new Random();\

            return news[rnd.Next(news.Count)];\

        }\

    }
{% endcodeblock %}

然后在页面中需要动态显示内容的地方调用。

<div><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;">@ Page Language</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">C#</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> AutoEventWireup</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">true</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> CodeBehind</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">Index.aspx.cs</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> Inherits</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">MvcApplication1.Views.Home.Index</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

</span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;">@ Import Namespace</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">MvcApplication1.Models</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><!</span><span style="color: #FF00FF;">DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><</span><span style="color: #800000;">html </span><span style="color: #FF0000;">xmlns</span><span style="color: #0000FF;">="http://www.w3.org/1999/xhtml"</span><span style="color: #FF0000;"> </span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><</span><span style="color: #800000;">head </span><span style="color: #FF0000;">runat</span><span style="color: #0000FF;">="server"</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"><</span><span style="color: #800000;">title</span><span style="color: #0000FF;">></span><span style="color: #000000;">Index</span><span style="color: #0000FF;"></</span><span style="color: #800000;">title</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"></</span><span style="color: #800000;">head</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><</span><span style="color: #800000;">body</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"><</span><span style="color: #800000;">div</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

    </span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;"> Response.WriteSubstitution(News.RenderNews); </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"><</span><span style="color: #800000;">hr </span><span style="color: #0000FF;">/></span><span style="color: #000000;">\

    The content of this page is output cached.\

    </span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #000000;"> DateTime.Now </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"></</span><span style="color: #800000;">div</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"></</span><span style="color: #800000;">body</span><span style="color: #0000FF;">></span>

<span class="Apple-style-span" style="font-family: verdana, 'courier new'; font-size: 14px; "><span style="font-family: 'Courier New'; font-size: 13px; "><span style="color: #0000ff; "></</span><span style="color: #800000; ">html</span><span style="color: #0000ff; ">></span></span></span>

如在上一篇文章中说明的那样，给Controller加上缓存属性。

<div><span style="color: #0000FF;">using</span><span style="color: #000000;"> System.Web.Mvc;\

</span><span style="color: #0000FF;">namespace</span><span style="color: #000000;"> MvcApplication1.Controllers\

{\

    [HandleError]\

    </span><span style="color: #0000FF;">public</span><span style="color: #000000;"> </span><span style="color: #0000FF;">class</span><span style="color: #000000;"> HomeController : Controller\

    {\

        [OutputCache(Duration</span><span style="color: #000000;">=</span><span style="color: #800080;">60</span><span style="color: #000000;">, VaryByParam</span><span style="color: #000000;">=</span><span style="color: #800000;">"</span><span style="color: #800000;">none</span><span style="color: #800000;">"</span><span style="color: #000000;">)]\

        </span><span style="color: #0000FF;">public</span><span style="color: #000000;"> ActionResult Index()\

        {\

            </span><span style="color: #0000FF;">return</span><span style="color: #000000;"> View();\

        }\

    }\

</span>

}

可以发现，程序对整个页面进行了缓存60s的处理，但调用WriteSubstitution方法的地方还是进行了随机动态显示内容。

## 对Post-Cache Substitution的封装

将静态显示广告Banner的方法封装在AdHelper中。

<div><span style="color: #0000FF;">using</span><span style="color: #000000;"> System;\

</span><span style="color: #0000FF;">using</span><span style="color: #000000;"> System.Collections.Generic;\

</span><span style="color: #0000FF;">using</span><span style="color: #000000;"> System.Web;\

</span><span style="color: #0000FF;">using</span><span style="color: #000000;"> System.Web.Mvc;\

</span><span style="color: #0000FF;">namespace</span><span style="color: #000000;"> MvcApplication1.Helpers\

{\

    </span><span style="color: #0000FF;">public</span><span style="color: #000000;"> </span><span style="color: #0000FF;">static</span><span style="color: #000000;"> </span><span style="color: #0000FF;">class</span><span style="color: #000000;"> AdHelper\

    {\

        </span><span style="color: #0000FF;">public</span><span style="color: #000000;"> </span><span style="color: #0000FF;">static</span><span style="color: #000000;"> </span><span style="color: #0000FF;">void</span><span style="color: #000000;"> RenderBanner(</span><span style="color: #0000FF;">this</span><span style="color: #000000;"> HtmlHelper helper)\

        {\

            var context </span><span style="color: #000000;">=</span><span style="color: #000000;"> helper.ViewContext.HttpContext;\

            context.Response.WriteSubstitution(RenderBannerInternal);\

        }\

        </span><span style="color: #0000FF;">private</span><span style="color: #000000;"> </span><span style="color: #0000FF;">static</span><span style="color: #000000;"> </span><span style="color: #0000FF;">string</span><span style="color: #000000;"> RenderBannerInternal(HttpContext context)\

        {\

            var ads </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #0000FF;">new</span><span style="color: #000000;"> List</span><span style="color: #000000;"><</span><span style="color: #0000FF;">string</span><span style="color: #000000;">></span><span style="color: #000000;">\

                {\

                    </span><span style="color: #800000;">"</span><span style="color: #800000;">/ads/banner1.gif</span><span style="color: #800000;">"</span><span style="color: #000000;">,\

                    </span><span style="color: #800000;">"</span><span style="color: #800000;">/ads/banner2.gif</span><span style="color: #800000;">"</span><span style="color: #000000;">,\

                    </span><span style="color: #800000;">"</span><span style="color: #800000;">/ads/banner3.gif</span><span style="color: #800000;">"</span><span style="color: #000000;">\

                };\

            var rnd </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #0000FF;">new</span><span style="color: #000000;"> Random();\

            var ad </span><span style="color: #000000;">=</span><span style="color: #000000;"> ads[rnd.Next(ads.Count)];\

            </span><span style="color: #0000FF;">return</span><span style="color: #000000;"> String.Format(</span><span style="color: #800000;">"</span><span style="color: #800000;"><img src='{0}' /></span><span style="color: #800000;">"</span><span style="color: #000000;">, ad);\

        }\

    }</span>

}

这样在页面中只要进行这样的调用，记得需要在头部导入命名空间。

<div><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;">@ Page Language</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">C#</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> AutoEventWireup</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">true</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> CodeBehind</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">Index.aspx.cs</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> Inherits</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">MvcApplication1.Views.Home.Index</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

</span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;">@ Import Namespace</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">MvcApplication1.Models</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

</span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;">@ Import Namespace</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #800000;">MvcApplication1.Helpers</span><span style="background-color: #F5F5F5; color: #800000;">"</span><span style="background-color: #F5F5F5; color: #000000;"> </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><!</span><span style="color: #FF00FF;">DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><</span><span style="color: #800000;">html </span><span style="color: #FF0000;">xmlns</span><span style="color: #0000FF;">="http://www.w3.org/1999/xhtml"</span><span style="color: #FF0000;"> </span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><</span><span style="color: #800000;">head </span><span style="color: #FF0000;">runat</span><span style="color: #0000FF;">="server"</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"><</span><span style="color: #800000;">title</span><span style="color: #0000FF;">></span><span style="color: #000000;">Index</span><span style="color: #0000FF;"></</span><span style="color: #800000;">title</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"></</span><span style="color: #800000;">head</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"><</span><span style="color: #800000;">body</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"><</span><span style="color: #800000;">div</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

    </span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;"> Response.WriteSubstitution(News.RenderNews); </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"><</span><span style="color: #800000;">hr </span><span style="color: #0000FF;">/></span><span style="color: #000000;">\

    </span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;"> Html.RenderBanner(); </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"><</span><span style="color: #800000;">hr </span><span style="color: #0000FF;">/></span><span style="color: #000000;">\

    The content of this page is output cached.\

    </span><span style="background-color: #FFFF00; color: #000000;"><%</span><span style="background-color: #F5F5F5; color: #000000;">=</span><span style="background-color: #F5F5F5; color: #000000;"> DateTime.Now </span><span style="background-color: #FFFF00; color: #000000;">%></span><span style="color: #000000;">\

    </span><span style="color: #0000FF;"></</span><span style="color: #800000;">div</span><span style="color: #0000FF;">></span><span style="color: #000000;">\

</span><span style="color: #0000FF;"></</span><span style="color: #800000;">body</span><span style="color: #0000FF;">></span>

<span class="Apple-style-span" style="font-family: verdana, 'courier new'; font-size: 14px; "><span style="font-family: 'Courier New'; font-size: 13px; "><span style="color: #0000ff; "></</span><span style="color: #800000; ">html</span><span style="color: #0000ff; ">></span></span></span><span class="Apple-style-span" style="font-family: verdana, 'courier new'; font-size: 14px; "> </span>

使用这样的方法可以使得内部逻辑对外呈现出更好的封装。
</div></div></div></div>
