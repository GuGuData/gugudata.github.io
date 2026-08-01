---
title: "React.js 开发参见问题 Q&A"
description: "文章中我整理了 React.js 开发过程中一些参见问题的解答汇总,供大家参考。 <!-- more --"
section: "parry-blog"
slug: "react-q-and-a"
lang: "zh-CN"
status: "published"
tags: ["React","视频教程","技术文章"]
publishedAt: "2017-03-09T00:23:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_9fd16ff87947d2c221d9f9c828f9328f.png"
author: "Parry Qiu"
---
![截图](https://devopenclub.parryqiu.com/blog_9fd16ff87947d2c221d9f9c828f9328f.png)

文章中我整理了 React.js 开发过程中一些参见问题的解答汇总，供大家参考。
<!-- more -->

## 1. 一些课程资源

课程源码 GitHub 地址：[https://github.com/ParryQiu/IMOOC-React](https://github.com/ParryQiu/IMOOC-React)

### 1.1 2018-03-26 更新

针对源码文件夹 react-router-4_webpack-2-update 更新了免费的讲解视频。

**主要讲解了如下几个问题**

1. 如果初始化下载的源码；
2. 如何在本地运行项目；
3. 如何修改代码，可以直接打开 html 就可以运行，这样你就可以将 React 的项目直接当成一个静态站点进行部署。

### 1.2 我提供的其他原创免费视频课程

* Webpack 2 视频教程 [https://devopen.club/course/webpack](https://devopen.club/course/webpack)

* VSCode 高效开发必装插件 [https://devopen.club/course/vscode](https://devopen.club/course/vscode)

### 1.3 其他下载
* 课程完整的思维导图请查考文章：[React.js 入门与实战课程思维导图](http://blog.parryqiu.com/2017/03/05/imooc-react-mind-map/)，我使用的思维导图软件是 Mac 下的 iThoughtsx。

* 如果你想下载不包含 node_modules 的源码，请访问我上传到 GitHub 的版本：[https://github.com/ParryQiu/IMOOC-React](https://github.com/ParryQiu/IMOOC-React)

* 课程网站源码包请参考慕课问答区：[课程里面说的各个章节的源码在哪里哦](http://coding.imooc.com/learn/questiondetail/6090.html)，此源码包含了 node_modules ，所以压缩文件达到了 1 个多 G，不过这样就保证了不会因为组件版本的原因引起的课程学习疑惑。

## 2. 执行 webpack-dev-server --content-base src --hot --inline 出错

在新版本的 webpack-dev-server 中，因为取消了 content-base 参数，所以需要热加载自动刷新的话，直接执行命令 `webpack-dev-server --hot --inline` 即可。

## 3. 使用 Webpack 2 搭建的 React 浏览器自动刷新的项目模板

如果还是有同学不能搭建出能够浏览器自动刷新的配置，那么请直接下载我配置好并测试过的，使用最新的 webpack 2 配置的项目模版即可。
项目地址: [https://github.com/ParryQiu/React-Webpack2-HMR-Template](https://github.com/ParryQiu/React-Webpack2-HMR-Template)

### 运行方法
* cd React-Webpack2-HMR-Template
* npm install
* npm start
* 修改 index.js 文件代码，浏览器自动刷新

## 4. 安装了 React Developer Tool 后调试状态下不显示

![截图](https://devopenclub.parryqiu.com/blog_5d03291404577c508594b5e9cd355174.png)

请确认下载安装的版本是 2.0 版本，建议直接科学上网后去官方商店下载，不要使用百度等搜索引擎搜索下载旧版本。

## 5. 缺少 react-html-attrs 插件

![截图](https://devopenclub.parryqiu.com/blog_bedd2f19ddf60a1f8e951fd3d0c11490.png)

在项目文件夹下执行命令 `npm install babel-plugin-react-html-attrs` 即可。

## 6. 关于处理 babel-loader 没加载的错误

如果在运行 `webpack-dev-server` 的时候出现了如下的错误。

![截图](https://devopenclub.parryqiu.com/blog_86c87eb19411247f357893d18cd741a3.png)

请执行以下命令 `npm install babel-loader`
重新运行后即可正常运行了。

![截图](https://devopenclub.parryqiu.com/blog_749cc4b5d6ce98b1f59781f259f1a2fc.png)

## 7. 使用 React 中的 fetch

可以参考我的博文：[在 JS 中使用 fetch 更加高效地进行网络请求](http://blog.parryqiu.com/2016/03/02/using_fetch_in_nodejs/)

## 8. webpack-dev-server 占用端口 8080 的问题

![截图](https://devopenclub.parryqiu.com/blog_ac7f3d71d21304b4d7589963adcc4df5.png)

当出现了端口占用的问题时，请结束掉占用端口的进程后重新运行即可。

## 9. 错误 The root route must render a single element 的处理

![截图](https://devopenclub.parryqiu.com/blog_6c3e6c605d7fd0813e37344cffbb2b3b.png)

需要注意 Route 绑定的 component 中的 class 有没有添加 `export default`。

## 10. 如何在chrome console 中打开 paint flashing

在 console 中的第二个窗口 rendering 下，如果不显示你可以在 console 下点击键盘 Esc 打开。

## 11. 父组件通过 refs 获取子组件真实 DOM 节点的问题

请参见问答区：[父组件通过refs获取子组件真实dom节点的问题](http://coding.imooc.com/learn/questiondetail/6639.html)
主要是可以通过 ReactDOM.findDOMNode(this.refs.rootChild) 进行获取。

## 12. 代码跳转 Route 的问题

请参见问答区：[老师你好，我想在点击登录的时候用router定位到特定页面怎么做？](http://coding.imooc.com/learn/questiondetail/6776.html)

## 13. 如何将 AntDesign 中的 getFieldProps 替换成 getFieldDecorator

请参见问答区：[如果要把getFieldProps替换成getFieldDecorator的话](http://coding.imooc.com/learn/questiondetail/6728.html)
或者参见官方文档：[Form 表单](https://ant.design/components/form-cn/)

## 14. Target container is not a DOM element

 错误截图如下

 ![截图](https://devopenclub.parryqiu.com/blog_e69bf3a00dda7b9269514338d1a17c17.png)

 原因是没有将页面的 JS 文件放在目标 div 的下面，注意下图正确的文件顺序。

 ![截图](https://devopenclub.parryqiu.com/blog_a529c4acd0a812e92dd8d4eb8e769485.png)

## 15. 慕课没有发布的更新课程

之前录制了「项目优化实战与可维护代码的编写」，没有通过慕课的审核，所以分享给需要这部分知识的同学继续学习，注意，即使是这两集，也不可用于任何商业用途，否则必将追究一切的法律责任，小心 ^_^。

链接: https://pan.baidu.com/s/1c37UhQK
密码: rwug

## 16. React Router 4.0 中 location undefined 的问题

版本 4.0 中对 hashHistory 做了迁移，你需要执行包安装命令 `npm install react-router-dom` 后，按照如下的代码进行使用即可。

{% codeblock lang:csharp%}
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App/>
</HashRouter>
{% endcodeblock %}

文档请参见这里：[https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md)

官方的 issue：[https://github.com/ReactTraining/react-router/issues/4752](https://github.com/ReactTraining/react-router/issues/4752)

## 17. AntDesign 文档中的函数语法错误以及 ES7 语法的支持方法

如果你直接照搬 AntDesign 的语法，可能会遇到如下错误。

![截图](https://devopenclub.parryqiu.com/blog_a5a7fc501a3d144daa11c1dc1fa3f765.png)

原因是因为此文档使用了最新的 ES7 的语法，所以如果你想这样使用，你需要安装 `babel-preset-stage-0` 组件。
需要在项目文件夹下执行如下命令即可：`npm install --save-dev babel-preset-stage-0`。

如果需要安装其他对应的规则集，如下供参考。

* ES2015转码规则
$ npm install --save-dev babel-preset-es2015

* react转码规则
$ npm install --save-dev babel-preset-react

* ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3

## 18. 解决 webpack-dev-server 不能自动刷新的问题

请参见我的博文 [解决 webpack-dev-server 不能自动刷新的问题](http://blog.parryqiu.com/2017/03/25/fix-webpack-dev-server-automatic-refresh/)

2017-04-08 更新了最新版本的 webpack 2 浏览器自动刷新的视频教程，请参见这里：[http://v.youku.com/v_show/id_XMjY5NTg4NzU4OA==.html](http://v.youku.com/v_show/id_XMjY5NTg4NzU4OA==.html)，如果你不想使用和课程一样的 1.0 版本但是又看不懂最新版本的文档，请参见此视频即可。

## 19. 解决课程中 React Router 版本的差异问题

您可以直接查看最新的 React Router 4 的文档自己学习，如果想使用和课程一样的版本，请安装特定的版本和课程同步学习。

`npm install react-router@2.8.1`

这样安装的版本就是 React Router 2 的版本，所有的使用就会和课程一样了。

## 20. 课程实战新闻项目 API 源码以及 API 地址

源码地址：[https://github.com/ParryQiu/IMOOC-React-NewsAPI](https://github.com/ParryQiu/IMOOC-React-NewsAPI)

API 请求地址
* [获取新闻列表](http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10)
* [获取新闻详情](http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=161022191707874)
* [获取文章评论](http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=123)
* [新闻添加评论](http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=1&uniquekey=123&commnet=content)
* [收藏新闻](http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=1&uniquekey=123)
* [注册登录接口](http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=REDACTED&r_userName=r_userName&r_password=r_password&r_confirmPassword=r_confirmPassword)
* [获取用户收藏](http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=1)
* [获取用户发出的评论](http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=1)

## 21. 针对源码文件夹 react-router-4_webpack-2-update 更新的讲解视频

* 主要讲解了如下几个问题

1. 如果初始化下载的源码；

2. 如何在本地运行项目；

3. 如何修改代码，可以直接打开 html 就可以运行，这样你就可以将 React 的项目直接当成一个静态站点进行部署。

* 视频地址

* [React 项目的优化、打包与部署 优酷](http://v.youku.com/v_show/id_XMzQ5MjE3NDg1Ng==.html)

* [React 项目的优化、打包与部署 bilibili](https://www.bilibili.com/video/av21258295/)
