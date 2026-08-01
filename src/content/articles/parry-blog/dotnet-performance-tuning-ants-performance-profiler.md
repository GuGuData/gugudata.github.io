---
title: ".NET 性能调优之一:ANTS Performance Profiler 的使用"
description: "在使用 .NET 进行快速地上手与开发出应用程序后,接下来面临的问题可能就是程序性能调优方面的问题,而性能调优有时候会涉及方方面面的问题,如程序宿主系统、数据库、网络环境等等,而当程序异常庞大复杂的时候,性能调优将变得更加无从下手。本系列文章主要会介绍一些 .NET 性能调优的工具、Web 性能优化的规则(如 YSl…"
section: "parry-blog"
slug: "dotnet-performance-tuning-ants-performance-profiler"
lang: "zh-CN"
status: "published"
tags: [".NET","ASP.NET","Winform","性能调优","技术文章"]
publishedAt: "2013-01-03T17:29:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/aa7e44b12975e3269891caa8af26658d.png"
author: "Parry Qiu"
---
在使用 .NET 进行快速地上手与开发出应用程序后，接下来面临的问题可能就是程序性能调优方面的问题，而性能调优有时候会涉及方方面面的问题，如程序宿主系统、数据库、网络环境等等，而当程序异常庞大复杂的时候，性能调优将变得更加无从下手。本系列文章主要会介绍一些 .NET 性能调优的工具、Web 性能优化的规则（如 YSlow ）及方法等等内容。

<!--more-->

## ANTS Performance Profiler 的基本使用
ANTS Performance Profiler 是 RedGate 旗下强大的性能调优产品，官方产品页面在 [这里](http://www.red-gate.com/products/dotnet-development/ants-performance-profiler/) 。
先来看一下软件的基本使用。
使用下面这段代码进行简单的测试。
这是一个控制台应用程序，程序很简单，先进行 10000 次循环，输出和，再使用 LINQ 在 list 里找出 1000 的值输出。
{% codeblock lang:csharp%}
 static void Main()
 {
     var list = new List<int>();
     var sum = 0;
     for (var i = 0; i < 10000; i++)
     {
         sum += i;
         list.Add(i);
     }
     Console.WriteLine(sum);
\
     //find the value use linq: 1000
     var result = list.Where(p => p.Equals(1000));
     foreach (var i in result)
     {
         Console.WriteLine(i);
     }
     Console.ReadKey();
 }
{% endcodeblock %}

编译程序后，启动 ANTS Performance Profiler ，会自动弹出向导页面，在此页面中，可以看到软件支持多种 .NET 程序的性能监控，如 EXE，web，Windows Service 等等。
而在 Performace Counters 中可以根据需要选择多种计数器，IO，内存分配，处理器等等。
针对测试所以选择程序文件夹下 \bin\Debug\ 里面的exe 即可。
在 Profiling Mode 里可以选择监控的级别，基本就是监控信息的多少与速度的权衡，默认选择「最详细」即可。其他的详细设置可以参考帮助文档。
点击「Start Profiling」，启动程序。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/aa7e44b12975e3269891caa8af26658d.png)

## 分析结果的查看与分析

软件的基本工作原理是在 .NET 编译出的 IL 代码里放入钩子用来记录时间，然后通过直观的界面显示出哪部分代码耗能最大。所以这是性能调优最直接的方法，针对最耗时的代码段进行优化即可。
点击「Start Profiling」后启动之前编译的程序，软件开始执行，如果是其他交互程序如 winform、web 等，操作完需要进行性能调优的功能后，在顶部的运行时间轴里用鼠标选定需要查看的时间段即可，一般有性能问题的时间段会出现一个波峰，选定那个时间段即可。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/f423644c1d810d33cda8a5f4760fb082.png)

选定后可以立即在下面的结果窗口中看到最耗时的方法，比如上面的 DEMO，当然性能都消耗在了 Main 函数上。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/782a000e16472ae2c7b03bf11f2da694.png)

软件提供了多种度量值查看性能损耗，有百分比和多种时间格式，这里选定「秒」作为度量单位。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/5a4f8830c81739ed7f187fcf91a67c99.png)

再选择要查看的函数，软件强大之处就显现出来了。

*   右侧的红色标线，点击可以快速定位到最耗能的代码，颜色越深表示那段代码越耗能。
*   总的执行时间，当然还可以同时看到代码供分析使用。

至于 DEMO 里这段代码为什么第一次执行 Console.WriteLine 如此耗能，我想如果你认真看了《CLR via C#》的第一章就应该能知道答案了。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/abdf65acac2ac76b5db63dfe6cb4e3a9.png)

当然你还
这样的层次结构图还有一个好处就是可以看到 .NET Framework 的内部实现。
当进行一些决策，比如是用原生的功能还是第三方组件时，这个功能会变得非常好用，因为通过它能比较直观的地看到内部实现的性能瓶颈在哪里。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/d56cd94c24e0ddc5ca1d569d929bb11e.png)

## 结语

ANTS Performance Profiler 是我性能调优时最先使用也是最喜欢使用的工具，所以放在了第一篇文章里来分享给大家，希望能给各位带来点帮助。
它非常的直观、强大，因为手头复杂的项目不适合用来做 DEMO，所以只是写了段简单的代码作演示，它的强大之处还待你真正遇到性能问题使用它时去好好体会。
文章有所疏漏和要补充的，请留言一起讨论，也请关注后续的相关文章。
