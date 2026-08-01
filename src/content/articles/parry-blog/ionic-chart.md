---
title: "Ionic 中使用 Chart.js 进行图表展示"
description: "本文介绍了如何在 Ionic 中使用图表展示数据。 <!--more-- Angular Chart 简介 在 之前的文章 中介绍了使用 Ionic 开发跨平台(iOS & Android)应用中遇到的一些问题的解决方案。 在更新0.1.3版本的过程中遇到了需要使用图表展示一周搜索引擎抓取变化的需求,因为之前使用过…"
section: "parry-blog"
slug: "ionic-chart"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","App开发","开源项目","教程","咕咕监控","iOS"]
publishedAt: "2015-11-25T17:25:11.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/def62b0ed9cc3026ccf0b3ae92351a70.jpg"
author: "Parry Qiu"
---
本文介绍了如何在 Ionic 中使用图表展示数据。
<!--more-->
## Angular Chart 简介
在 [之前的文章](http://0.0.0.0:4000/2015/11/22/ionic-development-issues/) 中介绍了使用 Ionic 开发跨平台（iOS & Android）应用中遇到的一些问题的解决方案。
在更新0.1.3版本的过程中遇到了需要使用图表展示一周搜索引擎抓取变化的需求，因为之前使用过 [Chart.js](http://www.chartjs.org/), 所以去查了些资料果然是有既有的模块的。
[Angular Chart](http://jtblin.github.io/angular-chart.js/) 就是基于 Chart.js 以及 Angular 构件的图标展示组件。
 ![Chart Using](https://assets.devopen.club/uPic/202608/gugudata-pages/def62b0ed9cc3026ccf0b3ae92351a70.jpg)

## Angular Chart 的使用
分别下载 Chart.js 和 Angular Chart，下载后在项目中添加 angular-chart.min.js 和 Chart.min.js 以及 angular-chart.css。
添加应用后需要在 app.js 中添加模块包含。
{% codeblock lang:js%}
angular.module('starter', ['ionic', 'chart.js'])
{% endcodeblock %}
数据的提供主要为 x 轴线和 y 轴的数据以及数据项的名称。
x 轴：chart-labels，数组
y 轴：chart-data，多维数组
数据项的名称：chart-series，数组
这些数据源可以在对于的 controller 中设置，如：
{% codeblock lang:js%}
$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
$scope.series = ['Series A', 'Series B'];
$scope.data = [
     [65, 59, 80, 81, 56, 55, 40],
     [28, 48, 40, 19, 86, 27, 90]
];
{% endcodeblock %}
如果有多个图标，可以在 repeater 中进行绑定也可，如：
{% codeblock lang:html%}
<div class="item item-divider">
    一周收录变化
</div>
<div class="item item-text-wrap">
     <canvas id="line" class="chart chart-line" data="site.ChartData" chart-labels="site.ChartLabels" legend="true" series="series"
     options="{showTooltips: true}"></canvas>
</div>
{% endcodeblock %}
而 option 的控制和 Chart js 的 options 是一样的。
如控制不显示 tooltip，则通过 `options="{showTooltips: false}"`  进行控制。
发布打包后发现在 iOS 中性能表现完全满足，在 Android 中的性能表现比 iOS 差很多，不过这也算是 Ionic 平台的缺陷了。

## 项目开源地址
官网：[http://gugujiankong.com/](http://gugujiankong.com/)
iOS 版本：[https://itunes.apple.com/cn/app/gu-gu-jian-kong-zhuan-zhu/id1042192962?l=en&mt=8](https://itunes.apple.com/cn/app/gu-gu-jian-kong-zhuan-zhu/id1042192962?l=en&mt=8)
Android 版本：[http://www.wandoujia.com/apps/com.gugujiankong.iosapp](http://www.wandoujia.com/apps/com.gugujiankong.iosapp)
GitHub开源：[https://github.com/ParryQiu/GuGuJianKong](https://github.com/ParryQiu/GuGuJianKong)
