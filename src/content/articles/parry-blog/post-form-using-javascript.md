---
title: "js 模拟 form 提交的一些问题"
description: "当在页面中需要进行 post 提交时,一般的做法是将控件放入 form 标签中,加入一个 submit 按钮进行 post 方式的提交。 页面中有两个 Tab 进行切换,一个 tab 中需要获取用户输入的值进行 post 提交到 search 页面进行搜索操作,另一个 tab 中是获取用户输入的值进行 get 方法提…"
section: "parry-blog"
slug: "post-form-using-javascript"
lang: "zh-CN"
status: "published"
tags: ["JavaScript","ASP.NET","技术文章"]
publishedAt: "2010-09-07T09:39:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
当在页面中需要进行 post 提交时，一般的做法是将控件放入 form 标签中，加入一个 submit 按钮进行 post 方式的提交。
页面中有两个 Tab 进行切换，一个 tab 中需要获取用户输入的值进行 post 提交到 search 页面进行搜索操作，另一个 tab 中是获取用户输入的值进行 get 方法提交到另一个页面进行查询操作，那么那个按钮就能使用 submit 类型的按钮了（后来发现那样也可以实现相应的功能），那么想到的方法就是模拟一个 form 进行 post 提交。
<!--more-->

## 解决的方法
在页面中放入下面的模拟 form

{% codeblock lang:html %}
<form id="formSearch" method="post" action="/search.aspx">\
    <input type="hidden" id="hiddenWord" name="word" value="" />\
</form>
{% endcodeblock %}

在第一个 tab 对应的按钮事件中添加如下的 js 代码。
{% codeblock lang:js %}
$("#hiddenWord").val($("#word").val());
$("#formSearch").submit();
{% endcodeblock %}
id 为 word 的控件为用户输入条件的 input 控件。
这样就实现了 js 的模拟 post 提交，实际上这样还解决了 aspx 页面的 form 中嵌套 from 标签的问题。

## 编码的问题

当前的页面编码为 UTF-8 的编码，而 search.aspx 的编码为 GB2312，所以 post 过去的数据出现了乱码，当然也可以使用 js 的 [encodeURIComponent](http://www.w3school.com.cn/js/jsref_encodeURIComponent.asp) 进行编码。
实际上在aspx页面的头部page注册时有这样一个属性：[ResponseEncoding ](http://msdn.microsoft.com/zh-cn/library/system.web.ui.page.responseencoding.aspx)
加入此属性后 aspx 页面的头部应该像下面这个样子。
{% codeblock lang:html %}
<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="false" ResponseEncoding="GB2312" %>
{% endcodeblock %}
这样就解决了页面编码不一致的问题。

## 另一个小技巧
在 submit 按钮 post 前可以进行自定义函数的检查，即可以阻止掉 post 的提交过程。
在 submit 的时候执行一些自定义的操作，需要先用 preventDefault 阻止提交。
{% codeblock lang:js %}
$("#id_form").submit(function(e) { e.preventDefault(); doSomething(); e.target.submit();})
{% endcodeblock %}
click 的时候就不需要，直接操作就可以。
{% codeblock lang:js %}
$("#id_save").click(function(e) { doSomething(); })
{% endcodeblock %}
