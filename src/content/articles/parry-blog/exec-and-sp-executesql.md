---
title: "EXEC与sp_executesql的区别及应用"
description: "在项目中需要将内部 DECLARE 的参数通过 EXEC 赋值后再作为下面一个 EXEC 参数的时候,发现都使用 EXEC时,问题就不是那么简单了。\\ <!--mhttps://oindk07nf.qnssl.com EXEC的使用缺陷\\ EXEC 命令有两种用法,一种是执行一个存储过程,另一种是执行一个动态的批处理…"
section: "parry-blog"
slug: "exec-and-sp-executesql"
lang: "zh-CN"
status: "published"
tags: ["MS SQL Server","数据库","技术文章"]
publishedAt: "2010-10-26T01:11:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://devopenclub.parryqiu.com/blog_1.png"
author: "Parry Qiu"
---
在项目中需要将内部 DECLARE 的参数通过 EXEC 赋值后再作为下面一个 EXEC 参数的时候，发现都使用 EXEC时，问题就不是那么简单了。\
<!--mhttps://oindk07nf.qnssl.com
## EXEC的使用缺陷\
EXEC 命令有两种用法，一种是执行一个存储过程，另一种是执行一个动态的批处理  。
一般的使用如下，做动态SQL语句拼接，然后执行。

 ![](https://devopenclub.parryqiu.com/blog_1.png)

然而上面这样的拼接语句又称为“串联变量”，而串联变量是不支持执行计划的，在我的演示代码中我已加了测试的SQL语句。\
使用DBChttps://oindk07nf.qnssl.com[<fonts>http://msdn.microsoft.com/zh-cn/library/ms174283.aspx</fonts>](http://msdn.microsoft.com/zh-cn/library/ms174283.aspx)<fonts>)\
</fonts>

在输出的数据中我们很清楚的看到系统执行了两次，没有很好地使用执行计划
https://oindk07nf.qnssl.com
 ![](https://devopenclub.parryqiu.com/blog_2.png)

而最重要的是当我有下面这样的需求
https://oindk07nf.qnssl.com
 ![](https://devopenclub.parryqiu.com/blog_3.png)

出错啦！
https://oindk07nf.qnssl.com
 ![](https://devopenclub.parryqiu.com/blog_4.png)

 然而我们发现这样的需求变相也是可以满足的，就是有点麻烦了，解决方案如下，使用临时表

 ![](https://devopenclub.parryqiu.com/blog_5.png)

## sp_executesql的使用
使用sp_executesql的话，一切将变的很简单\
sp_executesql命令比EXEC命令更灵活，因为它提供一个接口，该接口及支持输入参数也支持输出参数。这功能使你可以创建带参数的查询字符串，这样就可以比EXEC更好的重用执行计划,sp_executesql的构成与存储过程非常相似，不同之处在于你是动态构建代码。它的构成包括：代码快，参数声明部分，参数赋值部分。\
**sp_executesql的语法**\
EXEC sp_executesql\
@stmt = <statement>,--类似存储过程主体\
@params = <params>, --类似存储过程参数部分\
<params assignment> --类似存储过程调用\
@stmthttps://oindk07nf.qnssl.com一样，只不过它是动态的，而存储过程是静态的，不过你也可以在存储过程中使用sp_executesql;\
@params参数与定义输入/输出参数的存储过程头类似，实际上和存储过程头的语法完全一样；\
@<params assignment> 与调用存储过程的EXEC部分类似。\
现在我们按照sp_executesql的语法改造下上面的查询
https://oindk07nf.qnssl.com
 ![](https://devopenclub.parryqiu.com/blog_6.png)

 查看执行计划的调用，很好的利用了已有的执行计划提升查询效率

![](https://devopenclub.parryqiu.com/blog_9.png)\

 我们再https://oindk07nf.qnssl.com
代码如下，可以将@TitleOutPut取出后再作为查询的参数给@TitleInPut赋值。\

难题得解！

![](https://devopenclub.parryqiu.com/blog_10.png)
