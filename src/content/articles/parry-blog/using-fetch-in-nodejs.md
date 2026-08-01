---
title: "在 JS 中使用 fetch 更加高效地进行网络请求"
description: "在前端快速发展地过程中,为了契合更好的设计模式,产生了 fetch 框架,此文将简要介绍下 fetch 的基本使用。 <!-- more --"
section: "parry-blog"
slug: "using-fetch-in-nodejs"
lang: "zh-CN"
status: "published"
tags: ["JavaScript","React Native","Ionic","技术文章"]
publishedAt: "2016-03-02T12:18:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/2c2e75cedeb18fcdd19d8b15e76c8008.png"
author: "Parry Qiu"
---
在前端快速发展地过程中，为了契合更好的设计模式，产生了 fetch 框架，此文将简要介绍下 fetch 的基本使用。
<!-- more -->

在 AJAX 时代，进行 API 等网络请求都是通过 [XMLHttpRequest](http://www.w3school.com.cn/xml/xml_http.asp) 或者封装后的框架进行网络请求。
现在产生的 [fetch](https://github.com/github/fetch) 框架简直就是为了提供更加强大、高效的网络请求而生，虽然在目前会有一点浏览器兼容的问题，但是当我们进行 Hybrid App 开发的时候，如我之前介绍的 [Ionic](http://blog.parryqiu.com/categories/App-%E5%BC%80%E5%8F%91/Hybrid-App/Ionic/) 和 [React Native](http://blog.parryqiu.com/categories/App-%E5%BC%80%E5%8F%91/Hybrid-App/React-Native/)，都可以使用 fetch 进行完美的网络请求。

## 1. fetch 初体验
在 Chrome 浏览器中已经全局支持了 fetch 函数，打开调试工具，在 Console 中可以进行初体验。
先不考虑跨域请求的使用方法，我们先请求同域的资源，如在我的博客页面中，打开 Console 进行如下请求。

{% codeblock lang:js%}
fetch("http://blog.parryqiu.com").then(function(response){console.log(response)})
{% endcodeblock %}

返回的数据：

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/2c2e75cedeb18fcdd19d8b15e76c8008.png)

这样就很快速地完成了一次网络请求，我们发现返回的数据也比之前的 XMLHttpRequest 返回的数据丰富、易用的多。

## 2. 关于 fetch 标准概览
虽然 fetch 还不是作为一个稳定的标准发布，但是在其一直迭代更新的 [标准描述](https://fetch.spec.whatwg.org/) 中，我们发现已经包含了很多的好东西。
fetch 支持了大部分常用的 HTTP 的请求以及和 HTTP 标准的兼容，如 HTTP Method，HTTP Headers，Request，Response。

## 3. fetch 的使用
### 3.1 兼容浏览器的处理
可以通过下面的语句处理浏览器兼容的问题。

{% codeblock lang:js%}
if(self.fetch) {
    // 使用 fetch 框架处理
} else {
    // 使用 XMLHttpRequest 或者其他封装框架处理
}
{% endcodeblock %}

### 3.2 一般构造请求的方法
使用 fetch 的构造函数请求数据后，返回一个 [Promise](https://www.promisejs.org/) 对象，处理即可。
{% codeblock lang:js%}
fetch("http://blog.parryqiu.com")
.then(function(response){
   // do something...
})
{% endcodeblock %}

### 3.3 fetch 构成函数的其他选项
我们可以将与 HTTP Headers 兼容的格式加入到请求的头中，如每次 API 的请求我们想不受缓存的影响，那么可以像下面这样请求：

{% codeblock lang:js%}
fetch("http://blog.parryqiu.com", {
    headers: {
        'Cache-Control': 'no-cache'
    }
})
.then(function(response){
   // do something...
})
{% endcodeblock %}

具体的可选参数可以查看 [这里](https://fetch.spec.whatwg.org/#concept-request-initiator)。
如我们还可以这样使用，添加了更多的头部参数：
{% codeblock lang:js%}
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

var myInit = {
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
             };
\
fetch("http://blog.parryqiu.com", myInit)
.then(function(response){
    // do something...
})
{% endcodeblock %}

### 3.4 返回的数据结构
在请求后的 Response 中，具体的定义在 [这里](https://fetch.spec.whatwg.org/#dom-response)。
常用的有：

* Response.status 也就是 StatusCode，如成功就是 `200`；
* Response.statusText 是 StatusCode 的描述文本，如成功就是 `OK`；
* Response.ok 一个 Boolean 类型的值，判断是否正常返回，也就是 StatusCode 为 `200-299`。

做如下请求：
{% codeblock lang:js%}
fetch("http://blog.parryqiu.com")
.then(function(response){
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.ok);
})
{% endcodeblock %}

返回的数据：

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c7174375a283b8285f9079437a2ae35b.png)

### 3.5 Body 参数
因为在 Request 和 Response 中都包含 Body 的实现，所以包含以下类型：

* ArrayBuffer
* ArrayBufferView (Uint8Array and friends)
* Blob/File
* string
* URLSearchParams
* FormData

在 fetch 中实现了对应的方法，并返回的都是 [Promise](https://www.promisejs.org/) 类型。

* [arrayBuffer()](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer)
* [blob()](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)
* [json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json)
* [text()](https://developer.mozilla.org/en-US/docs/Web/API/Body/text)
* [formData()](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData)

这样处理返回的数据类型就会变的特别地方便，如处理 json 格式的数据：
{% codeblock lang:js%}
var myRequest = new Request('http://api.com/products.json');

fetch(myRequest).then(function(response) {
  return response.json().then(function(json) {
    for(i = 0; i < json.products.length; i++) {
      var name = json.products[i].Name;
      var price = json.products[i].Price;
      // do something more...
    }
  });
});
{% endcodeblock %}

## 4. 浏览器兼容
目前项目给出的浏览器支持如下图，如果需要兼容低版本浏览器，那么可以通过上面介绍的浏览器兼容处理办法解决此问题，不过相信很快就不需要考虑兼容问题了，在 Hybrid App 开发中使用基本没有问题，因为基本都是基于 Node.js 进行开发的。
有朋友提出兼容性问题的严谨性，其实通过 JS polyfill，已经可以获得很好的支持。

* 如使用 [A window.fetch JavaScript polyfill](https://github.com/github/fetch) 可以获得如下支持。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/1e06004448a0059477775a1e528e31e4.png)

* 如使用 [fetch-ie8](https://www.npmjs.com/package/fetch-ie8#windowfetch-polyfill) 可以获得如下支持。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/40fcf05c2ff1e1061a2cf83d3b3320dd.png)

## 5. 结语
下面是一个格式更好的文档，比标准描述的页面更加清晰，供参考。
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
在使用 React Native 开发 App 的时候接触到了 fetch，发现的确非常方便高效，框架的设计模式也非常清晰灵活，所以分享出来供大家探讨。
更多的细节可以查阅相关文档，有什么问题可以留言讨论交流。
