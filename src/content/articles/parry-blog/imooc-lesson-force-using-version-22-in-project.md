---
title: "在 Ionic 2 项目中强制使用 22 版本"
description: "本文分享了如何在 Ionic 2 项目中强制使用 22 版本,供慕课网同学或其他朋友参考。 <!-- more -- 因为慕课网的部分同学需要依旧使用 22 版本的 Ionic 2 进行课程的学习以及项目的构建,所以本文将介绍一下如何快速地搭建一个 22 版本的开发环境。 1. 安装对应的 Ionic CLI 需要注…"
section: "parry-blog"
slug: "imooc-lesson-force-using-version-22-in-project"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-10-13T14:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/d94fab9485b2a0051a3f3eec7275d0e2.png"
author: "Parry Qiu"
---
本文分享了如何在 Ionic 2 项目中强制使用 22 版本，供慕课网同学或其他朋友参考。
<!-- more -->
因为慕课网的部分同学需要依旧使用 22 版本的 Ionic 2 进行课程的学习以及项目的构建，所以本文将介绍一下如何快速地搭建一个 22 版本的开发环境。
## 1. 安装对应的 Ionic CLI
需要注意的是，我在[之前的文章](http://blog.parryqiu.com/2016/08/24/how_to_install_ionic1/)中分享了如何安装制定的 Ionic 版本，但是后来 Ionic 变更了版本号的命名，所以这里需要注意命令的改变，使用下面的命令安装即可。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/d94fab9485b2a0051a3f3eec7275d0e2.png)

## 2. 检查安装完成后的环境
使用命令 `ionic info` 进行相关环境的检查。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/aaaad64191a1deecbb41ffc244100774.png)

## 3. 下载现有的项目文档
我已将对应的 22 版本的项目上传到了 GitHub 上，请大家下载此项目文件夹。
空项目地址：[https://github.com/ParryQiu/Ionic2-empty-project-for-v22](https://github.com/ParryQiu/Ionic2-empty-project-for-v22)
因为所有的配置依赖都在 `package.json` 文件中，所以下载后直接使用 `npm install` 命令指定环境的初始化即可，注意此过程可能需要翻墙或者配置 CNPM，这部分内容请参阅之前的相关文章。
直接在下载好的文件夹根目录下执行命令即可，也一步也即是根据配置文件恢复项目中的 node_modules 文件夹。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/284ec338f1b8251309c81c856a26cd3e.png)

## 4. 运行项目
使用命令 `ionic serve` 进行项目的启动，注意命令行中会有一些警告信息，忽略即可。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/9f581c4c6420bc5433840386fb1b49b0.png)

项目成功启动。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/6ec85c3b267560613436916cfd2da6e9.png)

这样就可以在此项目中按照课程继续使用 22 版本进行学习与项目构建，基础文件还是 JS 格式，并且相关 API 和课程是完全对应的。
