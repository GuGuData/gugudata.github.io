---
title: "SupeSite标签数据源的处理及页面标签的定义技巧"
description: "开发的 CMS 系统中模板引擎和标签的开发算是告一段落,而在 Discuz 的 CMS 系统 SupeSite 中借鉴到了很多东西,略作小记。\\ <!--more-- 当需要将页面解析成静态页面时, 然需要借助模板引擎去对标签作解析。而标签数据源的定义颇值得研究。\\ 在先前的标签设计中,由于数据存储使用动态模型,所以…"
section: "parry-blog"
slug: "supesite-tags"
lang: "zh-CN"
status: "published"
tags: ["架构","模板引擎","技术文章"]
publishedAt: "2010-10-26T01:15:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/82865e32dfcca84f7a000ec318fe6fb1.png"
author: "Parry Qiu"
---
开发的 CMS 系统中模板引擎和标签的开发算是告一段落，而在 Discuz 的 CMS 系统 SupeSite 中借鉴到了很多东西，略作小记。\
<!--more-->
当需要将页面解析成静态页面时，
然需要借助模板引擎去对标签作解析。而标签数据源的定义颇值得研究。\
在先前的标签设计中，由于数据存储使用动态模型，所以并没有涉及到多张表的逐个定义标签解析。而在后期的开发中，脱离动态模型的表越来越多，而每一个表的数据解析，就需要去定义一个标签数据源，再对每一个数据源赋值，最后模板引擎作解析。而就在前段时间，下载了个SupeSite搭建系统做研究，发现其设计很精妙。\
在其系统设计中有个叫“模块管理”的东西，将各个数据源统一管理，使得读取数据最大化自定义且可以复用。\
<fon查询条件，作为标签数据源，模板引擎解析后在页面显示。\

## SupeSite已经做成了向导模式，选择“资讯”

![](https://assets.devopen.club/uPic/202608/gugudata-pages/82865e32dfcca84f7a000ec318fe6fb1.png)

## 生成block
代码如下，注意其中的cachename，即数据源名称，很显然，SupeSite对其做了cache，可以在cache设置中配置更新时间间隔。而name为唯一标识。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/6d920ffb8f4b0b4c968b1ab22b001efa.png)

## 页面中的调用

![](https://assets.devopen.club/uPic/202608/gugudata-pages/17468b663f0f32d83d4364ed6727bc9f.png)
我们又发现SupeSite标签定义**细致**的一个地方：将标签放置与<!-- -->之间，这样做的好处显而易见，当模板引擎出错、预览模板时，由于是放置于html注释之间，所以不会破坏页面结构，很好的设计。\
SupeSite这样的设计完全将用户需求又转交给了用户，让用户去自定义数据源，以满足各类需求，且维护数据源极其方便。\
而SupeSite这样的设计又有**一个缺点**：当修改了block内容后，所有引用到此block的页面都需要修改，既然已经有了唯一的block name，那么在页面中数据源只需填写name，具体的数据读取参数使用数据库作一一对应，那么当修改了name对应的数据读取参数后，页面中的name不需要变化，那么模板完全不需要作任何调整，不知SupeSite设计时是如何考虑这一点的。\
在我目前开发的系统中，我已将此设计思路用于当前的数据源管理中，且修正了SupeSite的一个设计缺点，可以很完美的应对各类特殊查询需求，一劳永逸。
