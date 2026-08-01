---
title: "RetrieveFavicon 获取任何站点的 favicon"
description: "{% codeblock lang:csharp%} [TestMethod] public void CanGetFaviconIco() { var faviconUrl = Common.Helper.RetrieveFavicon.Favicon.RetrieveFavicon(\"https://github…"
section: "parry-blog"
slug: "retrieve-favicon-using-csharp"
lang: "en"
status: "published"
tags: ["开源项目",".NET","技术文章"]
publishedAt: "2016-12-27T14:08:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/favicons-post.png?imageView2/1/w/800/h/260/interlace/0/q/100"
author: "Parry Qiu"
---
![Website Favicon](https://devopenclub.parryqiu.com/favicons-post.png?imageView2/1/w/800/h/260/interlace/0/q/100)
开源了一个获取任何站点 favicon 的类库，供使用。
<!-- more -->

## RetrieveFavicon
[Project GitHub](https://github.com/ParryQiu/RetrieveFavicon)
Retrieve favicon from any website url using C#.
A part of project [GuGuJianKong](https://github.com/ParryQiu/GuGuJianKong) backend API.

## Retrieve favicon type
* direct retrieve `$website url/favicon.ico`
* retrieve `href` from website content where contains `<link rel="* icon" href="..." />`
* retrieve `href` from website content where contains `<link rel="apple-touch-icon" href="..." />`

## Usage

{% codeblock lang:csharp%}
[TestMethod]
public void CanGetFaviconIco()
{
    var faviconUrl = Common.Helper.RetrieveFavicon.Favicon.RetrieveFavicon("https://github.com/parryqiu");
    Debug.Print(faviconUrl);
    Assert.IsTrue(faviconUrl != null);
}
{% endcodeblock %}

## NuGet References
* [Html Agility Pack](https://www.nuget.org/packages/HtmlAgilityPack)
