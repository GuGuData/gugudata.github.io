---
title: "Webpack 3 中的新特性"
description: "本文简短地分享下最新发布的 Webpack 3 中的新特性,供大家参考。"
section: "parry-blog"
slug: "webpack-3-new-features"
lang: "zh-CN"
status: "published"
tags: ["Webpack","视频教程","技术文章"]
publishedAt: "2017-06-20T01:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/25061f15e2e6e542bf7f67e23d25a0e9.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/25061f15e2e6e542bf7f67e23d25a0e9.png)

本文简短地分享下最新发布的 Webpack 3 中的新特性，供大家参考。

<!-- more -->

## 1. Webpack 3 的新特性
6 月 20 日，Webpack 发布了最新的 3.0 版本，并在 [Medium 发布了公告](https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b)。

Webpack 目前几乎作为前端开发的标配，一些变化都可能影响到实际的项目，所以我们一起来看一看新版中有哪些主要的特性更新。
看下来，Webpack 3.0 整体相对于 2.0 变化不大，如果升级的话，配置以及编译方面不必做特别的修改，不必惊慌。
Webpack 2.0 的相关视频教程，可以参见我录制的共计 20 集免费的视频教程，[Webpack 2 视频教程](https://devopen.club/course/webpack2.html)。

下面是 v3.0 Release 中的 Features List。

* node_modules no longer mangle to ~ in stats [breaking change]
* timeout for HMR requests is configurable
* added experimental Scope Hoisting (webpack.optimize.ModuleConcatenationPlugin)
* some performance improvements
* added output.libraryExport to select an export for the library
* sourceMapFilename now supports [contenthash] [breaking change]
* module.noParse supports functions
* add node: false option to disable all node specific additions

Webpack 的更新很大部分依据于官方的一个新功能 [投票页面](https://webpack.js.org/vote/)，搞的还挺民主的感觉，一些开源软件可以参考这种运营方式。

### 1.1 更新方法以及版本迁移

通过命令直接安装即可，后面需要加上版本号。

```
npm install webpack@3.0.0 --save-dev
```

或者

```
yarn add webpack@3.0.0 --dev
```

至于从 Webpack 2 升级到 Webpack 3，官方的原话是：

> no effort beyond running the upgrade commands in your terminal

所以可以断定，虽然版本号进行了大版本号的变更，不过并不会有太大的变化，可以松一口气了。

### 1.2 Scope Hoisting
之前的每一个 module 都被包含在一个独立的 function closures 中，这样的处理方式就造成了在代码在浏览器中执行缓慢的问题。
开发团队参考了 [Closure Compiler](https://developers.google.com/closure/compiler/) 和 [RollupJS](https://rollupjs.org/) 等框架后，将 function closures 的包裹方式变成了可配置的形式。
就是在之前的 plugins 中配置即可。

{% codeblock lang:js%}

module.exports = {\
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

{% endcodeblock %}

当然可能因为某些模块的加载导致不能配置成功，官方提供了 CLI 的参数 `--display-optimization-bailout` 用于 debug 是什么原因导致了配置失败。

### 1.3 Magic Comments
其实就是可以命令 chunk name 了。

{% codeblock lang:js%}

import(/* webpackChunkName: "my-chunk-name" */ 'module');

{% endcodeblock %}

更多的使用可以参考[这里](https://medium.com/webpack/how-to-use-webpacks-new-magic-comment-feature-with-react-universal-component-ssr-a38fd3e296a)。

## 2. 接下来的新特性

* 更好的编译缓存
* 更快的首次以及增量编译速度
* 对 TypeScript 更加友好地支持
* 修改 Long term caching
* 增加对 WASM Module 的支持
* 用户体验的改进

## 3. 总结
总体看来变化不大，而且如 `Magic Comments` 等功能就已经在 2.4 的版本中发布了，个人感觉，发布一个 3.0 的版本主要是团队提供更好产品的一个决心象征吧。
