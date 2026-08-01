---
title: "5行代码实现微信小程序图片上传与腾讯免费5G存储空间的使用"
description: "本文介绍了如何在微信小程序开发中使用腾讯官方提供的云开发功能快速实现图片的上传与存储,以及介绍云开发的 5G 存储空间的基本使用方法,这将大大提高微信小程序的开发效率,同时也是微信小程序系列教程的视频版更新的文字版本摘要。"
section: "parry-blog"
slug: "wechat-miniapp-using-cloud-dev-image-cdn"
lang: "zh-CN"
status: "published"
tags: ["DevOpenClub 教案","微信开发","小程序开发","视频教程","技术文章"]
publishedAt: "2018-11-12T06:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/071bc719f13a60100d3fe9599bd18f47.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/071bc719f13a60100d3fe9599bd18f47.png)

本文介绍了如何在微信小程序开发中使用腾讯官方提供的云开发功能快速实现图片的上传与存储，以及介绍云开发的 5G 存储空间的基本使用方法，这将大大提高微信小程序的开发效率，同时也是微信小程序系列教程的视频版更新的文字版本摘要。

<!-- more -->

此文为 [「60 节实战课微信小程序开发视频教程」](https://devopen.club/course/wxminiapp) 的第 51 小节内容，如果需要查看视频版本的实战操作，请直接跳至文章的最后部分查看。

## 1.云开发图片空间简介
在之前的文章 [微信小程序开发平台新功能「云开发」快速上手体验](http://blog.parryqiu.com/2018/08/17/weixin-miniapp-wxclouddev-demo/) 中我们简要介绍了腾讯官方给所有的微信小程序开发提供的云开发的主要功能点，主要包含了下面几个大的功能。

> 目前提供三大基础能力支持：
> 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写自身业务逻辑代码
> 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库
> 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

对于一般的图片上传功能开发，我们一般需要实现如下几个技术点：

1. 后台服务器的购买；
2. API 域名的购买与配置；
3. API 功能的开发；
4. 图片空间的逻辑处理以及合理管理；
5. 配置图片 CDN 加速图片加载效率。

而当我们使用腾讯提供的云开发功能时，只需要几行代码即可在微信小程序里实现完整的图片上传逻辑，非常地方便、高效。

## 2.图片上传的代码实现
使用腾讯云开发实现图片上传的主要业务逻辑如下：
1. 通过 `wx.chooseImage` 方法让用户选择设备中的图片资源；
2. 通过 `wx.cloud.uploadFile` 方法实现图片的上传，上传至腾讯提供的免费 5G 空间中；
3. 通过 `wx.cloud.uploadFile` 的回调事件处理云端返回的图片资源 ID、链接等相关属性，进行后续地处理。

下面我们直接看这三个业务逻辑的代码部分。

```js
/* 图片的选择与上传部分逻辑 */
 // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        // 这部分可以自行处理图片的命名方式，这里图片进行了固定命名为 my-image
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            // 上传成功后，页面进行跳转，在详情页加载图片显示等操作
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
```

```js
/* 这部分比较简单，直接在页面读取加载到的图片链接即可 */
  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })
  },
```

图片在云开发管理器中的管理与查看，可以看到图片已成功上传。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/5eda60f6e4f5d49bc4e99fb132c0a826.png)

上传后跳转的页面展示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/40ae24f582c403434918b20a01591296.png)

## 3.视频版实战演示
如果你需要更加直观地查看此功能的视频教程，请跳转至此集的 B 站查看。

[bilibili - 微信小程序开发视频教程 #051-开发平台「云开发」图片上传功能实战](https://www.bilibili.com/video/av35817215/)

此系列课程的完整更新大纲请参见：[[原创] 微信小程序开发视频教程](https://devopen.club/course/wxminiapp)

-------

**加入社群，与 1000 多位朋友们共同成长**

DevOpen.Club Pro 高质量软件开发分享讨论群，汇聚了近 1000 多名各行各业的软件开发人员，是供朋友们分享高质量资源、讨论软件开发问题解决方案、寻求孵化项目合作伙伴的干货社区。

任何技术都不是限制，我们最终目的是将技术转化成收入，实现财务自由。
![DevOpenClub 知识星球](https://assets.devopen.club/uPic/202608/gugudata-pages/7d6ba47e6c3ec923c431d3946869f4f4.png)
**社群中正在更新的原创视频教程 & 孵化项目进度**

1. 编程大世界：软件开发基础知识通解，带你进入软件开发的大世界；
2. 80 节实战课精通 React Native 开发：我出版的书籍《React Native 精解与实战》配套视频教程；
3. 微信小程序开发视频教程：最实战的小程序开发视频教程，重新规划课程内容增加至 60 小节；
4. 50 个 Chrome Developer Tools 必备技巧：前端开发人员必备技能点；
5. 我们的微信群中孵化出来的一个团队，在做一个服务于伦敦的小程序项目；
6. 付费数据接口的无限制免费调用权限，已在微信群中分配了最高权限的 Key。

**DevOpenClub Pro 社群指南**

1. 每日分享高质量的技术开发头条信息与资源；
2. 遇到任何技术问题都可以进行快速提问、讨论交流；
3. 永久获取每年原创的开发视频教程第一手资源更新；
4. 获取其他高质量软件开发行业新闻、技术文章、教学视频分享；
5. 群中认识更多的朋友以及分享合作开发项目的机会；
6. 认识更多的行业朋友，或者交流自己的创业小项目；
7. 交流与分享技术面试心得；
8. 高质量、有价值的社区永远都不会是你所在的 QQ 群或微信群。
