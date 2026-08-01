---
title: "《React Native 精解与实战》书籍连载「React Native 底层原理」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "react-native-book-react-native-principle"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-08-10T12:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/b_3f2f3f5e94fc9d492a63a436de553ac2.png"
author: "Parry Qiu"
---
![截图](https://devopenclub.parryqiu.com/b_3f2f3f5e94fc9d492a63a436de553ac2.png)

此文是我的出版书籍[《React Native 精解与实战》](http://rn.parryqiu.com/)连载分享，此书由机械工业出版社出版，书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战，以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示，精选了大量实例代码，方便读者快速学习。

书籍还配套了视频教程「80 节实战课精通 React Native 开发」，此视频课程建议配合书籍学习，书籍中原理性的东西讲解的比较清晰，而视频教程对于组件、API 等部分的代码实战开发讲解比较直观。

***书籍相关所有资料请访问：[http://rn.parryqiu.com](http://rn.parryqiu.com/)***

<!--more-->

本章将深入讲解 React Native 的底层原理，万丈高楼平地起，非常深入地理解 React Native 底层的实现，在你开发或遇到难题调试时非常有帮助。
此部分包含 React Native 的框架构成、工作原理、UI 层的渲染与重绘以及组件间通信、React Native 与各个平台的通信实现以及 React Native 中的生命周期。
如果需要直接开始 React Native 的开发与实战，请直接跳至第四章开始学习。
## 3.1	React Native 框架构成
React Native 框架内部已提供了很多的内置组件，如图 3-1 所示。如 View、Text 等基本组件，用于一些功能布局的 Button、Picker 等，用于列表展示的各种 List 组件和对应 iOS 平台与 Android 平台的特定组件、API 等。同时也提供了供编写与原生平台交互的接口，在后续的章节我们会进行与原生平台的混合实战开发实战。
![截图](https://devopenclub.parryqiu.com/b_0bba6b67b995c71fc7a571216ccd1697.png)
图 3-1 React Native 框架构成
## 3.2 React Native 工作原理
在 React 框架介绍的章节，我们理解了如何将代码渲染至虚拟 DOM 并更新到真实 DOM 的过程。在 React Native 框架中，渲染到 iOS 平台与 Android 平台的过程如图 3-2 所示。
![截图](https://devopenclub.parryqiu.com/b_384ccb96356a5aa84af69507d387c12d.png)
图 3-2 React Native 渲染
在 React 框架中，JSX 源码通过 React 框架最终渲染到了浏览器的真实 DOM 中，而在 React Native 框架中，JSX 源码通过 React Native 框架编译后，通过对应平台的 Bridge 实现了与原生框架的通信。如果我们在程序中调用了 React Native 提供的 API，那么 React Native 框架就通过 Bridge 调用原生框架中的方法。
因为 React Native 的底层为 React 框架，所以如果是 UI 层的变更，那么就映射为虚拟 DOM 后进行 diff 算法，diff 算法计算出变动后的 JSON 映射文件，最终由 Native 层将此 JSON 文件映射渲染到原生 App 的页面元素上，最终实现了在项目中只需要控制 state 以及 props 的变更来引起 iOS 与 Android 平台的 UI 变更。
编写的 React Native代码最终会打包生成一个 main.bundle.js 文件供 App 加载，此文件可以在 App 设备本地，也可以存放于服务器上供 App 下载更新，后续章节讲解的热更新就会涉及到 main.bundle.js 位置的设置问题。
## 3.3	React Native 与原生平台通信
在与原生框架通信中，如图 3-3 所示，React Native 采用了 JavaScriptCore 作为 JS VM，中间通过 JSON 文件与 Bridge 进行通信。而如果在使用 Chrome 浏览器进行调试时，那么所有的 JavaScript 代码都将运行在 Chrome 的 V8 引擎中，与原生代码通过 WebSocket 进行通信。
![截图](https://devopenclub.parryqiu.com/b_813802c7db7e31befd54e9b960cc6d15.png)
图 3-3 React Native 与原生平台的通信
关于 React Native 框架与原生平台的通信原理的详细介绍，后续的混合开发章节将会有详细的讲解与实战开发。
## 3.4	组件间通信
React Native 开发最基本的元素就是组件，React Native 与 React 一样，也会涉及到组件之间的通信，用于数据在组件之间的传递，下面列出了几种常用的组件间通信的方式。
### 父子组件的通信
如同之前的章节介绍 React 组件间传递参数一样，在 React Native 中，父组件向子组件传递值，可以通过 props 的形式。
在下例中，父组件通过调用子组件并赋值子组件的 name 为 React，子组件通过 this.props.name 获取父组件传递过来的 name 的字符串值 React。
***完整代码在本书配套源码的 03-04 文件夹。***
```javascript
/**
* 章节: 03-04
* 父子组件通信，在父组件中调用子组件
* FilePath: /03-04/parent-2-child.js
* @Parry
*/

<ChildComponent name='React'/>

/**
* 章节: 03-04
* 子组件实现，通过 props 获取父页面传递的值
* FilePath: /03-04/parent-2-child.js
* @Parry
*/

class ChildComponent extends Component {
    render() {
        return (
          <Text>Hello {this.props.name}!</Text>
        );
    }
}
```
### 子父组件的通信
在开发过程中，不仅有父子之间的通信，有时还会有子组件向父组件通信传递值的需求，比如当子组件的某个值变更后，需要通知到父组件做相应的变更与响应，那么就会需要子父组件之间的通信。
示例代码如下，在父组件的定义中，在调用子组件时，同样向子组件传递了一个参数，不过这个参数是一个函数，此函数用于接收后续子组件向父组件传递过来的数据，与之前父组件向子组件传递数据不太一样。
***完整代码在本书配套源码的 03-04 文件夹。***
```javascript
/**
* 章节: 03-04
* 子父组件通信，父组件的实现
* FilePath: /03-04/child-2-parent.js
* @Parry
*/
import React, {Component} from 'react';
import ChildComponent from './ChildComponent'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'React'
    }
  }

  //传递到子组件的参数，不过参数是一个函数。
  handleChangeName(nickName) {
    this.setState({name: nickName})
  }

  render() {
    return (
      <div>
        <p>父组件的 name：{this.state.name}</p>
        <ChildComponent
          onChange={(val) => {
          this.handleChangeName(val)
        }}/>
      </div>
    );
  }
}

export default App;
```
下面为子组件的定义，子组件在页面中定义了一个按钮，点击此按钮后，调用自身的一个函数 handleChange，修改了自身 state 中的值 name 为 nickName 定义的值 Parry，那么此子组件的页面上的字符串将由之前的 Hello React! 变为 Hello Parry!，同时使用了 this.props.changeName，也就是父组件调用时传递过来的函数，向父组件传递了 nickName 的值 Parry。
父组件在接收到子组件的调用后，调用了父组件自身的函数 handleChangeName 修改了自身的 state 中的 name 的值为 Parry，也就是子组件传递过来的 Parry，所以同时，父组件的页面上的值也同时由之前的 React 变更成了 Parry。
```javascript
/**
* 章节: 03-04
* 子父组件通信，子组件的实现
* FilePath: /03-04/child-2-parent.js
* @Parry
*/

import React, {Component} from 'react'

export default class ChildComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'React'
    }
  }

  handleChange() {
    const nickName = 'Parry';
    this.setState({name: nickName})
    //调用父组件传递过来的函数参数，传递值到父组件去。
    this
      .props
      .changeName(nickName)
  }

  render() {
    const {name} = this.state;
    return (
      <div>
        <p>Hello {name}!</p>
        <Button
          onPress={this
          .handleChange
          .bind(this)}
          title="修改一下 name 为 Parry"/>
      </div>
    )
  }
}
```
### 多级组件之间的通信
如果组件之间的父子层级非常多，需要进行组件之间的传递，这时候当然可以通过上面介绍的方法进行一级一级的传递，但是当这种组件间层级很深的时候，这样的传递方法不是一个太好的方法。
解决的方法是首先要在设计 App 时，需要注意不能让组件之间的层级关系太深，一是为了避免组件之间通信的冗长，还有一个原因是太深的嵌套逻辑，用户体验上也不会很好，可以想象一下用户从最底层一层层操作返回到最顶层时的体验。
第二就是可以使用如 context 对象或 global 等方式进行多级组件间的通信，但是这种方式不推荐。
### 无直接关系组件间通信
前面提到的都是有层级关系的组件间的通信方式，而如果组件间没有层级的关系的话，可以通过如 AsyncStorage 或 JSON 文件等方式进行无直接关系组件间的通信。
当然，还可以使用 EventEmitter / EventTarget / EventDispatcher继承或实现接口的方式、Signals 模式或 Publish / Subscribe 的广播形式，都可以达到无直接关系组件间的通信。
这些组件间的通信方式使得组件之间的数据可以传递起来，后续的实战章节会有详细的代码实现，这里主要进行了理论部分的介绍。掌握这部分知识后才可以将 App 开发中的基本单位，也就是组件串联起来。

-------

![截图](https://devopenclub.parryqiu.com/b_cf4439fab2847223afa0ec56f777501b.png)
