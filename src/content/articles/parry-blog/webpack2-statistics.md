---
title: "使用可视化图表对 Webpack 2 的编译与打包进行统计分析"
description: "此文是「Webpack 2 视频教程」的第十八集的补充文字文档,主要对使用可视化图表对 Webpack 2 的编译与打包进行统计分析进行了详细地讲解,供您更加直观地参考。"
section: "parry-blog"
slug: "webpack2-statistics"
lang: "zh-CN"
status: "published"
tags: ["Webpack","视频教程","技术文章"]
publishedAt: "2017-06-16T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/964a8b23ee86e92de84fec1235b0d5ce.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/964a8b23ee86e92de84fec1235b0d5ce.png)

此文是「Webpack 2 视频教程」的第十八集的补充文字文档，主要对使用可视化图表对 Webpack 2 的编译与打包进行统计分析进行了详细地讲解，供您更加直观地参考。

<!-- more -->

在之前更新的共十七集[「Webpack 2 视频教程」](https://devopen.club/course/webpack2.html)中，我们陆续讲解了 Webpack 2 从配置到打包、压缩优化到调试状态等情况都进行了详细地讲解，在这一小节，我们通过可视化的图表对 Webpack 2 的打包编译过程进行一个更加深刻地认识，同时可视化图表也是对项目概况以及优化指导是一个非常直观的方案。

## 1. Webpack 2 的编译统计信息生成
让 Webpack 2 生成统计信息的参数主要是配置以下两个。

* --profile 统计生成至执行时间相关信息，可选参数；
* --json 让 Webpack 生成统计信息，输出格式为 json。

以下为测试项目 `package.json` 中的配置截图。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/9210a613b37b05ecf8ecb1bdeceb8baf.png)

配置后在命令行执行命令 `npm run stats` 即可在项目目录中看到生成的统计文件 `stats.json`。

## 2. 利用生成的数据生成可视化图表
### 2.1 官方可视化分析工具

官方就给出了一个可视化工具，地址在 [https://webpack.github.io/analyse/](https://webpack.github.io/analyse/)，选择上面生成的 `stats.json` 文件后即可生成针对项目生成的可视化图表。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/07d38d02f63cd0163dffa8882d0a7db9.png)

在此图表中你可以看到你项目的生成文件的大小、引用关系以及项目中 modules 的相关信息。

### 2.2 Webpack Visualizer
同样也是一个 Web 生成工具，选择上传生成的 `stats.json` 文件即可生成图表。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/39a4dc0147ff8370b17bad3437bbefbb.png)

## 2.3 重复包的检测与图表化
可以安装 [duplicate-package-checker-webpack-plugin](https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin) 插件对项目中的重复包进行检测，以便于对项目进行引用优化。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/860cdcc99d7ff04e7d09dc73f370428a.png)

当然，你可以直接利用之前生成的数据文件直接生成一个更加炫酷的图形化统计信息。
[https://alexkuz.github.io/webpack-chart/](https://alexkuz.github.io/webpack-chart/)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/a94c238ac987bb129e209260150b95fe.png)

## 2.4 未使用资源检测

使用 [https://www.npmjs.com/package/webpack-unused](https://www.npmjs.com/package/webpack-unused) 还可以检测项目中那些资源文件没有被使用，供后期优化项目参考。

## 2.5 3D 图表生成

还有一个可以生成 3D 图标的工具，不过看起来信息太过混乱，当玩具玩玩就好。
[https://alexkuz.github.io/stellar-webpack/](https://alexkuz.github.io/stellar-webpack/)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/a8442224aaa96f6f16116c7a679d2181.png)

## 2.6 一些其他工具

可以在本地装一个组件，生成可以放大缩小的资源占用图标。
[https://www.npmjs.com/package/webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/f0de042c8b0124fb57889a8b1e6fbc10.gif)

一个用于生成包依赖关系的可视化工具，可以用于图表化地查看包之间的循环依赖之类的信息。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/ee006d8e0ddb2cb1a92decffcf5667f7.png)

## 3. 总结
这些可视化的工具可以供后期优化项目时大大提高寻找优化目标的效率。
不过所有的性能问题以及包依赖的准则应该一直贯穿于整个项目的开发过程中，而不是指望最后再来优化项目依赖混乱等问题，免得积重难返。

课程中的源码地址：[https://github.com/ParryQiu/DevOpenClub-Tech-Webpack2](https://github.com/ParryQiu/DevOpenClub-Tech-Webpack2)
