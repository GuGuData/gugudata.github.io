---
title: "解决 webpack-dev-server 不能自动刷新的问题"
description: "此文主要帮助大家解决 webpack-dev-server 启动后修改源文件浏览器不能自动刷新的问题。"
section: "parry-blog"
slug: "fix-webpack-dev-server-automatic-refresh"
lang: "zh-CN"
status: "published"
tags: ["Webpack","视频教程","技术文章"]
publishedAt: "2017-03-25T14:08:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/25061f15e2e6e542bf7f67e23d25a0e9.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/25061f15e2e6e542bf7f67e23d25a0e9.png)

此文主要帮助大家解决 webpack-dev-server 启动后修改源文件浏览器不能自动刷新的问题。

<!-- more -->

## 1. webpack 不能热加载的问题

主要的问题是各个版本之间的兼容性问题，请在本地的项目配置文件 `package.json` 中直接拷贝下面的配置文件，然后完整删除 `node_modules` 文件夹后，在项目文件夹下执行 `npm install` 即可。注意 Mac 系统下需要在命令前加 `sudo`。
安装完成后执行 `webpack-dev-server --inline --hot` 即可正常自动刷新了。

{% codeblock lang:js%}
    {
  "name": "10-03",
  "version": "1.0.0",
  "description": "",
  "main": "root.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "antd": "^2.1.0",
    "babel": "^5.8.23",
    "babel-core": "^6.1.21",
    "babel-loader": "^6.1.0",
    "babel-plugin-react-html-attrs": "^2.0.0",
    "babel-preset-es2015": "^6.24.0",
    "babel-preset-react": "^6.23.0",
    "babelify": "^7.3.0",
    "css-loader": "^0.25.0",
    "fetch": "^1.1.0",
    "json-loader": "^0.5.4",
    "react": "^15.3.2",
    "react-dom": "^15.3.2",
    "react-mixin": "^2.0.2",
    "react-responsive": "^1.2.1",
    "react-router": "^2.8.1",
    "style-loader": "^0.13.1",
    "webpack": "^1.13.2",
    "webpack-dev-server": "^1.16.1"
  },
  "devDependencies": {
    "babel-plugin-import": "^1.0.1"
  }
}

{% endcodeblock %}
