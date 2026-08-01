---
title: "《React Native 精解与实战》书籍连载「React Native 网络请求与列表绑定」"
description: "此文是我的出版书籍《React Native 精解与实战》连载分享,此书由机械工业出版社出版,书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战,以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示,…"
section: "parry-blog"
slug: "react-native-book-react-native-list-bind"
lang: "zh-CN"
status: "published"
tags: ["React Native","书籍连载","视频教程","书籍出版","技术文章"]
publishedAt: "2018-08-21T00:00:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/01fd40aa5af29d6d6471e692dfa30510.png"
author: "Parry Qiu"
---
![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/01fd40aa5af29d6d6471e692dfa30510.png)

此文是我的出版书籍[《React Native 精解与实战》](http://rn.parryqiu.com/)连载分享，此书由机械工业出版社出版，书中详解了 React Native 框架底层原理、React Native 组件布局、组件与 API 的介绍与代码实战，以及 React Native 与 iOS、Android 平台的混合开发底层原理讲解与代码实战演示，精选了大量实例代码，方便读者快速学习。

书籍还配套了视频教程「80 节实战课精通 React Native 开发」，此视频课程建议配合书籍学习，书籍中原理性的东西讲解的比较清晰，而视频教程对于组件、API 等部分的代码实战开发讲解比较直观。

***书籍相关所有资料请访问：[http://rn.parryqiu.com](http://rn.parryqiu.com/)***

<!--more-->

***相关连载更新***
[《React Native 精解与实战》书籍连载「React 与 React Native 简介」](http://blog.parryqiu.com/2018/08/09/rn_book_intro_react_and_reactnative/)
[《React Native 精解与实战》书籍连载「React Native 底层原理」](http://blog.parryqiu.com/2018/08/10/react_native_book_react_native_principle/)
[《React Native 精解与实战》书籍连载「Node.js 简介与 React Native 开发环境配置」](http://blog.parryqiu.com/2018/08/10/rn_book_intro_nodejs_and_dev_config/)
[《React Native 精解与实战》书籍连载「React Native 中的生命周期」](http://blog.parryqiu.com/2018/08/16/react-natvie-lifecycle/)
[原创「80节实战课精通 React Native 开发」视频课程大纲](http://blog.parryqiu.com/2018/07/10/react-native-in-action/)

## 8.4 React Native 网络请求与列表绑定方案
下面我们就通过结合 Fetch API 以及 React Native 框架中的列表组件，通过代码实战的形式进行这两个重要知识点的学习。
首先我们数据获取使用豆瓣的公开 API，获取目前正在上映的 20 部电影的信息，豆瓣 API 地址为：https://api.douban.com/v2/movie/in_theaters?count=20，API 接口返回的 JSON 数据如图 8-6 所示。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/36b973c960df5599107b905b4542df7b.png)
*图 8-6 豆瓣 API 返回的 JSON 数据*

在此示例代码中，将采用组件开发的思想，首页加载 4 个 Tab，每一个 Tab 加载对应的页面组件。这里的列表加载在第一个 Tab 中，组件定义为 Home，在项目中建立的文件名为 home.js。
完整代码在本书配套源码的 08-03 文件夹。

```jsx

1.	/**
2.	 * 章节: 08-03
3.	 * App.js 定义了项目的大结构，使用 4 个 Tab 进行布局。
4.	 * FilePath: /08-03/ListDemo/App.js
5.	 * @Parry
6.	 */
7.
8.	import React, {Component} from 'react';
9.	import {Platform, StyleSheet, Text, View, Image} from 'react-native';
10.	import TabNavigator from 'react-native-tab-navigator';
11.	import HomePage from './home';
12.
13.	export default class App extends Component < {} > {
14.
15.	  state = {
16.	    selectedTab: 'home'
17.	  };
18.
19.	  _renderContent = (color : string, index : string) => {
20.	    switch (index) {
21.	      case "home":
22.	        return (<HomePage/>);
23.	    }
24.	  };
25.
26.	  render() {
27.	    return (
28.	      <TabNavigator>
29.	        <TabNavigator.Item
30.	          selected={this.state.selectedTab === 'home'}
31.	          title="首页"
32.	          renderIcon={() => <Image
33.	          style={ {
34.	          width: 25,
35.	          height: 25
36.	        } }
37.	          source={require('./flux.png')}/>}
38.	          renderSelectedIcon={() => <Image
39.	          style={ {
40.	          width: 25,
41.	          height: 25
42.	        } }
43.	          source={require('./relay.png')}/>}
44.	          onPress={() => this.setState({selectedTab: 'home'})}>
45.	          {this._renderContent('#FFFFFF', 'home')}
46.	        </TabNavigator.Item>
47.
48.	        ...... //此处省略了其他三个 Tab 的定义
49.	               //完整代码在书籍的配套源码中
50.
51.	      </TabNavigator>
52.	    );
53.	  }
54.	}

```

上面这段代码为 App.js 的部分主要逻辑，注意在代码的第 11 行导入外部 Home 组件的方法，以及针对之前 Tab 组件章节的逻辑修改了加载对应组件的方法，主要为代码第 20 行的部分。

```jsx

1.	/**
2.	 * 章节: 08-03
3.	 * home.js 定义了第一个 Tab 加载的页面组件，用于加载豆瓣电影列表
4.	 *         同时演示了 ListView 绑定方法
5.	 * FilePath: /08-03/ListDemo/home.js
6.	 * @Parry
7.	 */
8.
9.	import React, {Component} from 'react';
10.	import {
11.	    Platform,
12.	    StyleSheet,
13.	    Text,
14.	    View,
15.	    Image,
16.	    ListView,
17.	    SafeAreaView
18.	} from 'react-native';
19.
20.	export default class HomePage extends Component < {} > {
21.
22.	    constructor(props) {
23.	        super(props);
24.	        this.state = {
25.	            dataSource: new ListView.DataSource({ //定义数据源
26.	                rowHasChanged: (row1, row2) => row1 !== row2
27.	            }),
28.	            loaded: false
29.	        };
30.	    }
31.
32.	    componentDidMount() {
33.	        this.fetchData(); //开始请求数据
34.	    };
35.
36.	    fetchData() {
37.	        fetch("https://api.douban.com/v2/movie/in_theaters").then((response) => response.json()).then((responseData) => {
38.	            this.setState({
39.	                dataSource: this
40.	                    .state
41.	                    .dataSource
42.	                    .cloneWithRows(responseData.subjects), //读取返回的所有电影数据
43.	                loaded: true
44.	            });
45.	        }).done();
46.	    };
47.
48.	    render() {
49.	        return (
50.	            <View style={styles.container}>
51.	                <ListView automaticallyAdjustContentInsets={false} //此选项可以修复掉会自动多出来的大约 10px 的空行
52.	                    dataSource={this.state.dataSource} renderRow={this._renderRow}/>
53.	            </View>
54.	        );
55.	    };
56.
57.	    _renderRow(rowData, sectionID, rowID) {
58.	        return (
59.	            <SafeAreaView>
60.	                <View style={styles.row}>
61.	                    <Image
62.	                        style={styles.thumb}
63.	                        source= { {
64.	                        uri: rowData.images.large
65.	                        } } />
66.	                    <View style={styles.texts}>
67.	                        <Text style={styles.textTitle}>
68.	                            {rowData.title}
69.	                        </Text>
70.	                        <Text style={styles.textTitle}>
71.	                            年份: {rowData.year}
72.	                        </Text>
73.	                        <Text style={styles.textTitle}>
74.	                            豆瓣评分: {rowData.rating.average}
75.	                        </Text>
76.	                    </View>
77.	                </View>
78.	                <View style={styles.separator}/>
79.	            </SafeAreaView>
80.	        );
81.	    };
82.	}
83.
84.	var styles = StyleSheet.create({
85.	    container: {
86.	        flex: 1
87.	    },
88.	    row: {
89.	        flexDirection: 'row',
90.	        padding: 10
91.	    },
92.	    separator: {
93.	        height: 1,
94.	        backgroundColor: '#EEEEEE'
95.	    },
96.	    thumb: {
97.	        width: 60,
98.	        height: 80,
99.	        borderRadius: 2
100.	    },
101.	    textTitle: {
102.	        flex: 1,
103.	        textAlign: "left",
104.	        paddingLeft: 10,
105.	        fontWeight: "bold",
106.	        flexDirection: 'row',
107.	        color: "#666666"
108.	    },
109.	    texts:{
110.	        flexDirection: 'column',
111.	        paddingTop: 5
112.	    }
113.	});

```

上面代码为 Home 组件的实现方法，下面主要对代码中的一些重要逻辑作一些说明：
* 代码在 17 行导入了一个新的 View 组件，SafeAreaView 用于在 iPhone X 下布局 View 而控制整个 View 安全布局于手机的可视区域中；
* 代码的第 25 - 27 行，定义了 ListView 的数据源，同时定义了 rowHasChanged 的逻辑；
* 代码第 32 行在生命周期 componentDidMount 中定义了从 API 中加载数据的方法；
* 代码第 36 - 46 行定义了从豆瓣 API 使用 Fetch API 请求数据的方法，注意对 Fetch API 返回的 Promise 对象的处理方法；
* 	代码第 51 行定义了 ListView 绑定的方法，行渲染的方法为代码中第 57 行定义的方法 _renderRow；
* 	代码第 57 - 81 行定义了列表渲染的方法，使用 View 与 Text 组件进行了列表的展示布局；
* 	后续的样式定义如之前学习的样式定义一样，进行精细布局控制即可。
项目运行在 iOS 平台的效果如图 8-7 所示，Android 平台大家也可以直接下载本书配套源码在本地学习、测试与运行。

![截图](https://assets.devopen.club/uPic/202608/gugudata-pages/c1222c6ba96d9b5f2a9c81bd460242c9.png)
*图 8-7 iOS 下的 ListView 运行效果*

## 8.5	本章小结
列表绑定是 App 开发最常用的一个开发功能，你可以随手打开自己手机上的 App 就会发现许多 App 的首页都是进行了数据请求、列表绑定或列表数据刷新等动作，这也真是移动互联网的魅力所在，用户可以随时获取到最新的资讯信息。所以此章节是一个重要的章节，并从底层知识点到实战代码都进行了详细地讲解与演示，希望能帮助你开发出你的 App 的首页列表组件。
