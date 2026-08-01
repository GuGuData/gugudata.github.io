---
title: "如何在 Hexo 博客引擎中添加 Swiftype 搜索组件"
description: "在您现在看到的我的博客站点,后台使用的是 Hexo 作为博客引擎,但是默认集成的搜索组件是进行 form 提交到 Google 进行搜索的,为了更好地体验,本文介绍如何在 Hexo 博客中集成 Swiftype 搜索组件。 <!-- more -- 1. 关于搜索组件 站点中集成搜索组件,可以很大地方便用户进行快速查…"
section: "parry-blog"
slug: "how-to-add-swiftype-search-to-hexo"
lang: "zh-CN"
status: "published"
tags: ["Hexo","技术文章"]
publishedAt: "2016-02-03T06:39:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/b954a4bc1f5bed726297b88130809696.png"
author: "Parry Qiu"
---
在您现在看到的我的博客站点，后台使用的是 Hexo 作为博客引擎，但是默认集成的搜索组件是进行 form 提交到 Google 进行搜索的，为了更好地体验，本文介绍如何在 Hexo 博客中集成 Swiftype 搜索组件。
<!-- more -->
## 1. 关于搜索组件
站点中集成搜索组件，可以很大地方便用户进行快速查找博客内容，但是 Hexo 处理搜索默认的逻辑是：输入关键字后模拟 form 提交到 Google 进行搜索的。但是在「某些」开放的国家，Google 是不可以访问的。你可能想到可以模拟提交到贵国「高端搜索引擎」百度进行搜索啊，恩，我想了想，我还是告诉你如何接入更加方便的 [Swiftype](https://swiftype.com/) 比较好。
其实接入 Google 等搜索引擎，也是在 Google 收录了你站点的内容后才能搜索到的，用的其实就是 `site:` 语法搜索。

## 2. 效果预览
[本站](http://blog.parryqiu.com/) 接入 Swiftype 搜索组件后的效果如图所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/b954a4bc1f5bed726297b88130809696.png)

## 3. Swiftype 搜索组件介绍
[Swiftype](https://swiftype.com/) 搜索组件的原理就是你提交站点给它，它立即对内容进行索引抓取，之后提供给你类似 JS SDK 一样的东西给你使用即可，设计的非常灵活、方便。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/3d318af843c1c988a9de939cc24c563e.png)

## 4. Hexo 接入步骤
### 4.1 注册账号
在 [注册页面](https://swiftype.com/users/sign_up) 注册一个账号。

### 4.2 添加站点
添加站点的 URL 或者站点的 SiteMap 给 Swiftype 以便它进行抓取，SiteMap 可以提交多个，如我站点的 [SiteMap](http://blog.parryqiu.com/sitemap.xml) ，我都拆分进行了提交。
关于 Hexo 博客引擎如何生成站点的 SiteMap，请参见 [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap) 插件或 [hexo-generator-seo-friendly-sitemap](https://github.com/ludoviclefevre/hexo-generator-seo-friendly-sitemap) 插件。
### 4.3 站点接入
Hexo 的接入非常方便，按照如下代码修改搜索模块即可。
{% codeblock lang:html%}
<div class="search">
<input type="search" class="st-default-search-input" placeholder="<%= __('search') %>">
</div>
{% endcodeblock %}

然后在页脚引入对应的 JS 代码即可，国内网络加载没有问题。

### 4.4 其他可配置项
可以通过 Swiftype 的控制面板修改如搜索结果、智能提示样式等，可定制化的地方很多；
Swiftype 还可以手动干预搜索结果以及对搜索结果进行强制分组等。
Swiftype 的控制面板中也提供了供您分析用户搜索的分析报表。\

## 5. 结语
Swiftype 有一个试用期，到期后只会限制一些高级功能的使用，不影响搜索组件的试用。
总之，这应该是 Hexo 博客引擎一个比较优雅的搜索组件解决方案。
