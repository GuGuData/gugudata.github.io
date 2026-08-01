---
title: "[视频课程笔记]微信小程序布局精解实战"
description: "以微信小程序开发常见布局实例为主题,通过代码实战形式讲解最常用的页面布局实现逻辑,以此掌握 CSS3 常用属性、Flex 布局以及响应式原理与相关属性。"
section: "parry-blog"
slug: "shi-pin-ke-cheng-bi-ji-wei-xin-xiao-cheng-xu-bu-ju-jing-jie-shi-zhan"
lang: "zh-CN"
status: "archived"
tags: ["技术文章"]
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/section-parry-blog-ef515901767d7bb3.webp"
author: "Parry Qiu"
---
以微信小程序开发常见布局实例为主题，通过代码实战形式讲解最常用的页面布局实现逻辑，以此掌握 CSS3 常用属性、Flex 布局以及响应式原理与相关属性。

课程地址：[https://devopen.club/course/css3](https://devopen.club/course/css3)

## 001 - 小程序实战项目简介与无 CSS 的页面流布局

微信小程序里面的布局基本元素 view 就是对应了 HTML 里面的 div。

默认没有样式控制的时候：**从左到右 从上到下**

float: none

## 002 - 小程序布局基础以及深入了解 float

### 2.1 重要的 float

## 003 - 理解 clear 的作用

[https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

### 3.1 clear 属性

指定段落的左侧或右侧不允许浮动的元素。

## 004 - overflow 的重要作用

overflow 属性规定当内容溢出元素框时发生的事情。

## 005 - position 之 absolute

**定位**

绝对定位

我想要一个元素完全脱离流式布局，进行绝对的像素定位

[https://www.iconfont.cn/](https://www.iconfont.cn/)

- 将 add 的图标定位到页面的右下角

## 006 - position 之 fixed

和 absolute 区别

- fixed 不会随着页面的滚动进行滚动 （回到顶部，右下角客服，电话，微信二维码）

- absolute 会随着页面的滚动进行滚动 （用于页面元素的布局，位置应该跟随父元素滚动）

## 007 - position 之 relative 与 sticky

相对定位是一个非常容易掌握的概念。如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直或水平位置，让这个元素“相对于”它的起点进行移动。

如果将 top 设置为 20px，那么框将在原位置顶部下面 20 像素的地方。如果 left 设置为 30 像素，那么会在元素左边创建 30 像素的空间，也就是将元素向右移动。

position:sticky 是 css 定位新增属性；可以说是相对定位relative和固定定位fixed的结合；它主要用在对scroll事件的监听上；简单来说，在滑动过程中，某个元素距离其父元素的距离达到sticky粘性定位的要求时(比如top：100px)；position:sticky这时的效果相当于fixed定位，固定到适当位置。

## 008 - position 属性深入

### 8.1 直观图例

在线 Demo: [https://developer.mozilla.org/en-US/docs/Web/CSS/position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

### 8.2 使用 Chrome 调试

### 8.3 浏览器版本兼容

## 009 - 弹性盒子 Flex Box

### 9.1 概述

[https://developers.weixin.qq.com/miniprogram/dev/component/view.html](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)

其他移动开发框架

[https://ionicframework.com/docs/layout/css-utilities#flex-properties](https://ionicframework.com/docs/layout/css-utilities#flex-properties)

### 9.2 在线工具

[https://cssreference.io/flexbox/](https://cssreference.io/flexbox/)

[http://cssreference.parryqiu.com/flexbox/](http://cssreference.parryqiu.com/flexbox/)

## 010 - media 查询

```css
@media screen and (max-width: 960px){
    body{
        background: #000;
    }
}
```

```html
<link rel="stylesheet" type="text/css" href="A.css" media="screen and (min-width: 400px)">
<link rel="stylesheet" type="text/css" href="B.css" media="screen and (min-width: 600px) and (max-width: 800px)">
```

```css
@media screen and (min-width:1200px){}
@media screen and (min-width: 960px) and (max-width: 1199px) {  }
@media screen and (min-width: 768px) and (max-width: 959px) {  }
@media only screen and (min-width: 480px) and (max-width: 767px){  }
@media only screen and (max-width: 479px) {  }
```

* 像素值是否可以设置为小数
  https://blog.lisong.hn.cn/css/2017/09/16/%E7%90%86%E8%A7%A3css%E5%B0%8F%E6%95%B0%E7%82%B9%E5%83%8F%E7%B4%A0/

* https://v4.bootcss.com/docs/layout/overview/#responsive-breakpoints

* https://www.runoob.com/cssref/css3-pr-mediaquery.html

\

## 011 - flex 属性 align-content

定义 flexbox 容器中每一行的对齐方式。此属性仅当预先设置了 `flex-wrap: wrap` 后有效，且 flexbox 的子元素有**多行**。

### 11.1 UI 模板

* http://www.sketchappsources.com/

* https://www.sketchappsources.com/free-source/4450-flower-store-ui-kit-sketch-freebie-resource.html

### 11.2 属性详解

http://cssreference.parryqiu.com/flexbox/#align-content

## 012 - flex 属性 align-items

### 12.1 基本定义

定义了在 flexbox 容器的一行内，子元素在**纵向**轴的对齐方式。

http://cssreference.parryqiu.com/flexbox/#align-items

### 12.2 与 align-content 的区别

*align-items 属性适用于所有的 flex 容器，它是用来设置每个 flex 元素在交叉轴上的默认对齐方式。*

*align-items 和 align-content 有相同的功能，不过不同点是它是用来让每一个单行的容器居中而不是让整个容器居中。*

*align-content 属性只适用于**多行**的 flex 容器，并且当交叉轴上有多余空间使  flex 容器内的  flex 线对齐。*

## 013 - flex 属性 align-self

仅仅作用于**一个** flexbox 元素，而不是作用于所有的元素。

「只控制自己」

## 014 - flex 属性 flex-basis

预先设定元素的大小，flexbox 的初始化大小。

- 当是 row 布局的时候，控制的是宽；

- 当是 column 布局的时候，控制的是高。

## 015 - flex 属性 flex-direction

定义了元素在 flexbox 容器中的排序方式。

- flex-direction: row;

- flex-direction: row-reverse;

- flex-direction: column;

- flex-direction: column-reverse;

## 016 - flex 属性 flex-flow

是 `flex-direction` 和 `flex-wrap` 的缩写形式。

## 017 - flex 属性 flex-grow

定义了元素当有可用空间的时候如何 **占用**。

```
默认属性 flex-grow: 0;
```

元素 **不** 占用剩余空间。它仅仅占用自身所需空间。

```
flex-grow: 1;
```

元素将 **占用** 扩展因子 **1**。如果没有其他元素也设置了 `flex-grow` 的话，它将占用剩下的所有空间。

```
flex-grow: 2;
```

因为 flex-grow 的值是**相对的**，它的具体表现还取决于此元素的**同级元素**。

## 018 - flex 属性 flex-shrink

定义了当没有足够空间的时候，元素如何**压缩**自身空间。

```
默认属性 flex-shrink: 1;
```

当主轴（横向轴）没有**足够**空间的时候，元素将按照扩展因子 **1** 来进行**压缩**，也将导致换行（折叠）其自身的内容。

```
flex-shrink: 0;
```

元素**不**压缩：占用它所需要的宽且**不**换行（折叠）自身的内容。同级元素将压缩给出目标元素足够的空间。

因为目标元素不换行（折叠）自身的内容，所以可能会导致 flexbox 容器的内容产生元素移除。

```
flex-shrink: 2;
```

因为 flex-shrink 的值是**相对**的，它的具体表现还取决于此元素的**同级元素**。

## 019 - flex 属性 flex-wrap

定义了元素在 flexbox 容器中是显示**一行**还是**多行**。

```
默认属性 flex-wrap: nowrap;
```

元素将始终保持**单行**，最终，如果需要将会进行元素溢出。

```
flex-wrap: wrap;
```

元素将根据实际情况分布在**多行**。

```
flex-wrap: wrap-reverse;
```

元素将根据实际情况分布在**多行**。任何新增的行都将会被添加在之前的一行**之前**。

## 020 - flex 属性 justify-content 与 order

### justify-content

定义了在 flexbox 容器中，**元素** 沿着 **主轴（横向轴）** 的对齐情况。

```
默认属性 justify-content: flex-start;
```

元素朝着主轴（横向轴）的**开始**方向排列。

```
justify-content: flex-end;
```

元素朝着主轴（横向轴）的**末尾**方向排列。

```
justify-content: center;
```

元素朝着主轴（横向轴）的**中间**排列。

```
justify-content: space-between;
```

剩余的空间平均分布在元素**之间**。

```
justify-content: space-around;
```

剩余的空间平均分布在元素的**开始和结束**处：在第一个元素的前面和最后一个元素的后面也分配空间。

### Order

定义元素的排序。

```
默认属性 order: 0;
```

元素的排序按照其 **HTML 代码**中的排序。

```
order: 1;
```

元素的排序与其*同级元素*具有**相关性**。最终的排序将会考虑到所有元素的排序值。

```
order: -1;
```

值你可以使用**负数**。

```
order: 9;
```

你可以为每一个元素设置**不同的**值。
