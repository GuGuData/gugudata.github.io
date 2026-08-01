---
title: "Ionic 入门与实战之第三章:Ionic 项目结构以及路由配置"
description: "本文是「Ionic 入门与实战」系列连载的第三章,主要对 Ionic 的项目结构作了介绍,并讲解了Ionic 中的路由概念以及相关配置。 <!-- more -- 1. Ionic 项目结构 这是初始化创建的 Ionic 项目结构,接下来将一一讲解。"
section: "parry-blog"
slug: "ionic-chapter-3-ionic-structure"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","书籍连载","技术文章"]
publishedAt: "2016-04-28T12:56:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_1b10eeccc0e0b743315fa6aa4654e81b.png"
author: "Parry Qiu"
---
本文是「Ionic 入门与实战」系列连载的第三章，主要对 Ionic 的项目结构作了介绍，并讲解了Ionic 中的路由概念以及相关配置。
<!-- more -->
## 1. Ionic 项目结构
这是初始化创建的 Ionic 项目结构，接下来将一一讲解。

![截图](https://devopenclub.parryqiu.com/blog_1b10eeccc0e0b743315fa6aa4654e81b.png)

因为 Ionic 使用了 Cordova 技术，所以项目的文件架构基本和 Cordova 的项目类似。

### 1.1 app 文件夹
项目文件夹，后续的代码编写都将在这里进行，因为使用的语言就是 HTML5/CSS(Sass)/JavaScript，所以项目结构类似于静态网站的项目结构。

### 1.2 hooks 文件夹
hooks 文件夹 主要放置在提交给 Cordova 处理的时候，自定义的一些动作，主要用于一些自动化处理的动作，如在编译前、编译后、运行前等等时刻插入自己定义好的动作。具体的介绍可以查看其中包含的文件 `README.md`。

### 1.3 node_modules 文件夹
包含了所有使用 npm 安装的依赖包。

### 1.4 platforms 文件夹
platforms 包含了 iOS 平台和 Android 平台的项目文件，一般不需要去修改，除非你需要修改一些原生的配置，如需要配置不同平台的推送通知的时候，才需要对其中的相关文件进行修改。

### 1.5 plugins 文件夹
存储所有 Cordova 插件的位置，注意区别于 npm 安装依赖包的位置。
安装命令如下，{plugin} 是插件的 ID 或者 插件 GitHub 的 URL：

```
ionic plugin add {plugin}
```

### 1.6 resources 文件夹
放置了平台的图标(icon)和启动界面图片(splash)，注意适配不同的分辨率，后续章节会作详细介绍。

### 1.7 www 文件夹
独立的项目，用于在浏览器调试时生成的文件夹，这样项目生成的 cordova/ionic 等编译文件将不在项目文件夹中存在，可以用于单纯的 web 发布使用。具体的配置在下面的 `ionic.project` 文件中有详细的介绍。里面的 index.html 是 app 的入口。

### 1.8 config.xml
项目整体配置，配置文件的节点和 Cordova 是一样的，具体的节点解释可以参见[这里](https://cordova.apache.org/docs/en/4.0.0/config_ref/)。

### 1.9 gulpfile.js
[gulp](http://gulpjs.com/) 是一个基于流的自动化构建工具，文件中配置了项目编译过程中执行的构建流事件。大型项目需要自动构建的时候才会去修改相关配置，一般不去修改即可。

### 1.10 ionic.config.js
配置用于执行 Ionic CLI 时候使用。

### 1.11 ionic.config.json
可以自定义配置值，供项目读取。

### 1.12 ionic.project
除了基本信息的配置，还可以在其中添加一些外部的配置，如添加一个 Gulp Watch，用于实现 LiveReload。

```
"gulpStartupTasks": [
 "watch"
],
"watchPatterns": [
 "./scss/**/*.scss",
 "./www/js/**/*.js",
 "./www/build/index.html"
]
```

### 1.13 package.json
项目依赖的包在这里管理，如果项目中丢失或者初始化，使用 `npm install` 命令的时候，会加载此配置文件中的依赖包。

这里只是大概了解了每个文件夹、文件的作用，更多的使用方法将在接下来的实际项目中有详细地讲解。
