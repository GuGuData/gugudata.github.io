---
title: "Ionic2 下处理 Android 设备下返回按钮的事件"
description: "本文分享了 Ionic2 下处理 Android 设备下返回按钮的事件,供参考。 <!-- more --"
section: "parry-blog"
slug: "ionic2-android-handling-the-hardware-back-buttons"
lang: "zh-CN"
status: "published"
tags: ["Hybrid App","Ionic","Ionic 入门与实战","技术文章"]
publishedAt: "2016-09-25T08:06:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
本文分享了 Ionic2 下处理 Android 设备下返回按钮的事件，供参考。
<!-- more -->

代码中我分享了如何捕捉 Ionic2 项目在 Android 设备下返回按钮事件，并在捕捉到的事件中可以灵活根据需求编写相关业务逻辑，如退出、返回等。
详细的逻辑处理参见下面代码即可。

{% codeblock lang:js%}
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {App, NavController} from 'ionic-angular';
import {ViewChild} from '@angular/core';

@Component({
  template: '<ion-nav #rootNavController [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>'
})

export class MyApp {
  @ViewChild('rootNavController') nav: NavController;
  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //退出按钮重写******开始******
      document.addEventListener('backbutton', () => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;

        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            console.log('检测到在根视图点击了返回按钮。');
            return platform.exitApp();
          }
          console.log('检测到在子路径中点击了返回按钮。');
          return this.nav.pop();
        }

        let tabs = page.tabs;
        let activeNav = tabs.getSelected();

        if (!activeNav.canGoBack()) {
          console.log('检测到在 tab 页面的顶层点击了返回按钮。');
          return platform.exitApp();
        }

        console.log('检测到当前 tab 弹出层的情况下点击了返回按钮。');
        return activeNav.pop();

      }, false);

      //退出按钮重写******结束******
    });
  }
}
ionicBootstrap(MyApp);

{% endcodeblock %}
