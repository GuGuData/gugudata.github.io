---
title: "IIS 开启 GZIP 压缩效率对比及部署方法"
description: "HTTP 压缩是在 Web 服务器和浏览器间传输压缩文本内容的方法。HTTP 压缩采用通用的压缩算法如 GZIP 等压缩 HTML、JavaScript 或 CSS 文件。压缩的最大好处就是降低了网络传输的数据量,从而提高客户端浏览器的访问速度。当然,同时也会增加一点点服务器的负担。GZIP 是比常见的一种 HTTP…"
section: "parry-blog"
slug: "how-to-gzip"
lang: "zh-CN"
status: "published"
tags: ["SEO","架构","Windows Server","GZIP","网站优化","技术文章"]
publishedAt: "2010-10-26T01:20:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/04a2120d0bb95c8e0f4d497065a76c0c.jpg"
author: "Parry Qiu"
---
HTTP 压缩是在 Web 服务器和浏览器间传输压缩文本内容的方法。HTTP 压缩采用通用的压缩算法如 GZIP 等压缩 HTML、JavaScript 或 CSS 文件。压缩的最大好处就是降低了网络传输的数据量，从而提高客户端浏览器的访问速度。当然，同时也会增加一点点服务器的负担。GZIP 是比常见的一种 HTTP 压缩算法。\
<!--more-->

## 压缩

在部署的IIS 6.0上配置了GZIP压缩，详细的测试结果如下。\
未开启GZIP压缩前，访问网站首页进行抓包分析。\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/04a2120d0bb95c8e0f4d497065a76c0c.jpg)\

开启GZIP后，清空本地IE缓存，再次访问抓包分析。\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/b778de8b16841ac5a2806bb173b8e704.jpg)\

开启前后，页面大小减小了89213bytes，压缩掉原始大小的87%。\
当对CSS、JS等文件都开启GZIP压缩后，原21100bytes的文件，压缩后如图所示，压缩比为80%。\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/00039972a7ae927608e8293fe22d988e.jpg)\

在 [http://www.port80software.com/tools/compresscheck.asp](http://www.port80software.com/tools/compresscheck.asp) 上测试结果如下。\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/64692eb3478abd1aef238fd670ae5cd4.jpg)\

## 部署

*  打开Internet信息服务(IIS)管理器，右击"网站"->"属性"，选择"服务"。在"HTTP压缩"框中选中"压缩应用程序文件"和"压缩静态文件"，按需要设置"临时目录"和"临时目录的最大限制"；\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/8ef9529daa449a2ca7705fb4b2f9e993.jpg)\

* 在Internet信息服务(IIS)管理器，右击"Web服务扩展"->"增加一个新的Web服务扩展..."，在"新建Web服务扩展"框中输入扩展名"HTTP Compression"，添加"要求的文件"为C:\WINDOWS\system32\inetsrv\gzip.dll，其中Windows系统目录根据您的安装可能有所不同，选中"设置扩展状态为允许"；\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/cbc4b1a93adedfeb4f0d17ad8a6610eb.jpg)\

 * 使etaBase.xml(建议先备份),找到Location ="/LM/W3SVC/Filters/Compression/gzip用于设置gzip压缩，找到Location ="/LM/W3SVC/Filters/Compression/deflate"用于设置deflate压缩。上面两个节点紧挨着，并且设置的属性相同。
 * 如果需要压缩动态文件，则将HcDoDynamicCompression设置为"TRUE"，并在HcScriptFileExtensions中增加您要压缩的动态文件后缀名，如aspx；如果需要压缩静态文件，则将HcDoStaticCompression和HcDoOnDemandCompression设置为"TRUE"，并在HcFileExtensions中增加您需要压缩的静态文件后缀名，如xml、css等；
 * HcDynamicCompressionLevel和HcOnDemandCompLevel表示需要的压缩率，数值在0-10, 默认为0。这两个属性值一般推荐设置为9, 具有最佳性价比。\


![](https://assets.devopen.club/uPic/202608/gugudata-pages/3a97002c7419c1661f2f2cf756db8fd2.jpg)\

## 注意

1. 在编辑MetaBase.xml前需要停止IIS，可以使用 net stop iisadmin\
2. 修改完成后开启iisadmin服务，并执行iisreset命令\

## 关于SEO的测试

压缩是否对SEO有影响，经测试，开启后仍然可以被很好的收录。\
关于对SEO影响的研究文章，还可以参考下面的几篇文章。\
具体的效率问题，将继续监控以作研究。\
文章链接：\

* 实时进行GZIP压缩优化Asp.Net页面的CompressionModule对Asp.Net Ajax及搜索引擎的兼容性测试!.\
[http://www.cnblogs.com/aspxcn/archive/2009/02/03/1037924.html](http://www.cnblogs.com/aspxcn/archive/2009/02/03/1037924.html)\
* Matt Cutts: Gadgets, Google, and SEO\
[http://www.mattcutts.com/blog/crawl-caching-proxy/](http://www.mattcutts.com/blog/crawl-caching-proxy/)
