---
title: "在 Ionic2 TypeScript 项目中导入第三方 JS 库"
description: "本文分享了在Ionic2 TypeScript 项目中导入第三方 JS 库的方法,供参考。 <!-- more -- 1. Typings 的方式 因在 TypeScript 中引用之前的 JS 库还需要引入对应的类型定义,也就是 .d.ts 文件。对于一些流行的 JS 库,相应地有了一个 Typings 库。Typ…"
section: "parry-blog"
slug: "import-js-to-ionic2-ts-project"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-09-18T01:37:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_1df37619a7b19b97395ecc4ca6d96cb4.png"
author: "Parry Qiu"
---
本文分享了在Ionic2 TypeScript 项目中导入第三方 JS 库的方法，供参考。
<!-- more -->
## 1. Typings 的方式
因在 TypeScript 中引用之前的 JS 库还需要引入对应的类型定义，也就是 .d.ts 文件。对于一些流行的 JS 库，相应地有了一个 [Typings 库](https://github.com/typings/typings)。Typings 库的作用就是将一些现有的 JS 库生成好了对应的定义文件，可以通过 Typings 直接加载到项目中。详细可见 [Typings for NPM Packages](https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html) 。

## 2. 其他第三方 JS 库的引用
这里以国内的百度地图库作为示例进行说明。
百度地图在 TypeScript 中是不存在的，所以本文就看看如何在 Ionic2 的 TypeScript 项目中引用。

## 3. 项目中引用 JS 库
和一般的引用 JS 库一样，直接在项目的 index.html 中引用即可。
这里申请好百度地图的 key 并引入百度地图的 JS SDK 文件。

![截图](https://devopenclub.parryqiu.com/blog_1df37619a7b19b97395ecc4ca6d96cb4.png)

## 4. 全局对应的定义与使用
在引用了百度地图 SDK 后，在 console 中发现已经可以读取到百度地图中的全局参数定义了。

![截图](https://devopenclub.parryqiu.com/blog_795fd44f686518893e8f1b82dade2c85.png)

那么只需要在对应的 TS 文件中定义一个参数即可。

{% codeblock lang:js %}

declare var BMap;

{% endcodeblock %}

定义好后在文件中就可以直接使用百度地图 JS SDK 的所有功能了。

{% codeblock lang:js %}
import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';

declare var BMap;

@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {

  @ViewChild('container') mapElement: ElementRef;
  container: any;

  constructor(private navCtrl: NavController) {
\
  }

  ionViewLoaded() {
    this.loadMap();
  }

  loadMap() {
    var map = new BMap.Map(this.mapElement.nativeElement);          // 创建地图实例
    var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    //创建小狐狸
    var pt = new BMap.Point(116.404, 39.915);
    var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));
    var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中
  }
}

{% endcodeblock %}

对应的 HTML 页面代码如下。

{% codeblock lang:html %}

<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic - 地图
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content class="map">
  <div #container id="container" class="mapContainer"></div>
</ion-content>

{% endcodeblock %}

效果如下。

![截图](https://devopenclub.parryqiu.com/blog_b7c05f71e8d359a1b7c858471d616723.png)
