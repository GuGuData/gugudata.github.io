---
title: "微信小程序开发教程 043 - 在小程序开发中使用 npm"
description: "本文介绍了如何在微信小程序开发中使用 npm 中包的功能,大大提高微信小程序的开发效率,同时也是微信小程序系列教程的视频版更新。"
section: "parry-blog"
slug: "wxminiapp-using-npm"
lang: "zh-CN"
status: "published"
tags: ["DevOpenClub 教案","微信开发","小程序开发","视频教程","技术文章"]
publishedAt: "2018-10-11T08:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/7a8eca21d23c960a2d59768c411bd46f.png"
author: "Parry Qiu"
---
本文介绍了如何在微信小程序开发中使用 npm 中包的功能，大大提高微信小程序的开发效率，同时也是微信小程序系列教程的视频版更新。

<!-- more -->

微信小程序在发布之初没有对 npm 的支持功能，这也是目前很多前端开发人员在熟悉了 npm 生态环境后，对微信小程序诟病的地方。

微信小程序在 2.2.1 版本后增加了对 npm 包加载的支持，使得小程序支持使用 npm 安装第三方包。

微信小程序的功能更新最近更新的也非常给力，如之前给大家介绍的[微信小程序开发平台新功能「云开发」快速上手体验](http://blog.parryqiu.com/2018/08/17/weixin-miniapp-wxclouddev-demo/)。

## 1. 在小程序中加载 npm 包
微信小程序关于 npm 包的加载使用官方文档在[这里](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)，此实战部分我们通过加载一个 npm 的第三方库[miniprogram-datepicker
](https://www.npmjs.com/package/miniprogram-datepicker)，此类库用于实现公历与农历的日期选择功能，而微信小程序官方的组件只能简单地选择一个公历时间。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/7a8eca21d23c960a2d59768c411bd46f.png)

在终端中定位到微信小程序的项目文件夹，通过 npm 的安装命令安装。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/55c1029b03105075b69b5a8b76c44321.png)

> 此处请务必使用 --production 选项，可以减少安装一些业务无关的 npm 包，从而减少整个小程序包的大小。

## 2. 构建 npm 包
在微信小程序开发工具的「工具」菜单下点击「构建 npm」命令，进行 npm 包的构建，此构建可以将 npm 包构建成在小程序中可加载使用的包。

> 为了帮助大家更好的理解发布 npm 包中提到的各种要求，这里简单介绍一下原理：

> 首先 node_modules 目录不会参与编译、上传和打包中，所以小程序想要使用 npm 包必须走一遍“构建 npm”的过程，在最外层的 node_modules 的同级目录下会生成一个 miniprogram_npm 目录，里面会存放构建打包后的 npm 包，也就是小程序真正使用的 npm 包。
> 构建打包分为两种：小程序 npm 包会直接拷贝构建文件生成目录下的所有文件到 miniprogram_npm 中；其他 npm 包则会从入口 js 文件开始走一遍依赖分析和打包过程（类似 webpack）。
> 寻找 npm 包的过程和 npm 的实现类似，从依赖 npm 包的文件所在目录开始逐层往外找，直到找到可用的 npm 包或是小程序根目录为止。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/f108851578d077cd3a48dd01ddf07038.png)

构建完成后还需要确认项目已勾选了「使用 npm 模块」。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/93928537cf12d29c4d3fb1cee35f7c7c.png)

## 3. 在项目中使用第三方模块
在我们之前实战项目中，在首页中测试下此 npm 模块的加载。

```jsx
<view class="doc-container">
  <view class="doc-title">今日精选</view>

  <datepicker value="{{solar}}" bindchange="bindSolarChange">
    <button type="default">公历</button>
  </datepicker>
  <datepicker value="{{lunar}}" chinese="{{true}}" bindchange="bindLunarChange">
    <button type="default">农历</button>
  </datepicker>

  <block wx:for="{{feeds}}" wx:key="{{item.ArticleId}}">
    <view class="list" data-para="{{item}}" bindtap="tapItem">
      <view class="view_preinfo">
        <text class="list_preinfo">{{item.CreateDateTime}} / {{item.ArticleAuthor}}</text>
      </view>
      <text class="list_title">{{item.ArticleTitle}}</text>
      <view>
        <block wx:for="{{item.Tags}}" wx:key="{{item.TagName}}">
          <text class="list_tag" style="border: solid 1px {{item.BackgroundColor}};">{{item.TagName}}</text>
        </block>
      </view>
    </view>
  </block>
</view>
```

在页面中布局完 `datepicker` 后，保存并完成项目的编译后，点击按钮即可看到组件的加载情况。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/04ccc13ea94198ea3ce669731227f721.png)

## 4. 项目笔记以及视频演示

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/59a0749a0c5d456cbc965917e8e6288c.png)

此章节的配套视频教程在 [微信小程序开发视频教程 #043 - 在小程序开发中使用 npm](https://www.bilibili.com/video/av33594693/)。
