---
title: ".NET下实现Server Push"
description: "无意在网上看到了一份.NET下实现Server Push(服务器推)的源码,断断续续看了两天,难点较多,遂成此文。\\ 关于服务器推技术,我们最深刻的体验应该是WebQQ的使用,通过服务器向客户端进行信息推送,而不是客户端去主动取数据(Client Pull)。\\ <!--more-- 在AJAX技术大行其道之时,服务…"
section: "parry-blog"
slug: "server-push-in-dotnet"
lang: "zh-CN"
status: "published"
tags: [".NET","ASP.NET","长连接","技术文章"]
publishedAt: "2010-11-18T06:30:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/35db408f533ddb6204b6ff7460b3a99d.png"
author: "Parry Qiu"
---
无意在网上看到了一份.NET下实现Server Push(服务器推)的源码，断断续续看了两天，难点较多，遂成此文。\
关于服务器推技术，我们最深刻的体验应该是WebQQ的使用，通过服务器向客户端进行信息推送，而不是客户端去主动取数据(Client Pull)。\
<!--more-->
在AJAX技术大行其道之时，服务器推技术
是未来的主角。\

<span style="background-color: #c0c0c0;">AJAX 只是实现了单用户的响应回调，与服务器的异步通讯，但是并不能反映多用户的协同相应。一个页面中同时存在的多个AJAX的异步很可能让用户修改了没有显示 出来的数据，在逻辑上存在数据库事务中“脏读”或者“幻影读”的概念，还没有看到数据，发出下一个请求（当然请求是发送到了别的页面元素，但愿有页面元素 中仍然是刷新了未修改的AJAX请求信息。）。</span>

所以就相应的有了服务器推技术。在应用COMET框架的 网页中，页面初始化后，会维持一连接，同时监听服务器端的事件信息。服务器通过事件机制来完成对浏览器（也可以是客户端）的“推”机制。不同客户端同时监 听到服务器端的事件，并获得服务器传来的数据，而每一个客户端的请求都变成服务器的事件在网络中进行“广播”。\

网上出现过基于客户端的服务器推技术，实际上都是使用IFRAME，APPLET，FLASH这样的元素实现的长连接，在[http://www.ibm.com/developerworks/cn/web/wa-lo-comet/](http://www.ibm.com/developerworks/cn/web/wa-lo-comet/)一文中，IBM工程师对这几者做了相应介绍。\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/35db408f533ddb6204b6ff7460b3a99d.png)

## 系统设计中的麻烦

首先就是如何让我们的浏览器接收到服务器发来的事件呢？\

有一种实现方式是借由无实体大小的FLASH，IFRAME或者APPLET等组件来间接打通客户端SOCKET，然后向这些元件中推入信息，并通过 javascript线程，得到元件返回的信息（当然也有极个别情况下，由这些元件来直接向页面注入信息）。\

从最终结果看，我们好似得到了一个服务器的稳定连接，并刷新了页面信息。但是实际上，这样的实现方式实在是有点不够“直接”。\

FLASH（或 FLEX）本身可以通过WEBSERVICE组件调用WSDL，或者直接调用java serverlet，这是FlashPlayer给我们的便利条件，但通过FLASH通讯的办法来实现SERVER PUSH总是让人觉得无法接受，为何不直接做一个FLASH通讯呢。\

APPLET更不用说，直接将JAR包“推”到页面运行，启动麻烦的JRE的同时还要下载庞大的JAVA程序。没有JRE的情况下，还需要相应下载。\

SliverLight的机制与FLASH类似，那是由于并没有FlashPlayer普及，用户同样需要下载相应播放器。\

以上三者实在谈不上是完全的web应用，我们只是想用最纯粹的javascript和html来解决问题，又何必劳师动众呢？单纯的javascript 事件和线程，难道就不能满足我们的需要么？\

于是又有人想到了IFRAME，通过一个隐形的IFRAME来发送AJAX请求，通过长轮询得到消息。但这也不是真正意义上COMET，顶多是一个不成熟的AJAX应用。\

COMET的精髓就在于用服务器与javascript来维持浏览器的长连接，同时完成服务器端事件的浏览器端响应。这样的事件广播机制是跨网络的，同时也是实时的。\

## COMET技术难点

1.维持长连接\

2.维持服务器端的“心跳”\

3.浏览器端对“心跳”的“感应”\

4.维持长连接与超时的平衡\

5.线程同步\

6.通用的接口设计\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/199fdc4e4d89adf4b81d27b113d21e1d.png)\

![](https://assets.devopen.club/uPic/202608/gugudata-pages/cb432adbf50f4480e31929a6e877f696.png)\

**实体类**\

1.CometClient:COMET的服务实体，实例化一个CometClinet的意义在于记录必要的服务信息，比如用户名称超时设置等。\

2.CometMessage:包含对服务信息和相信属性的实体类，是消息传输的主体。\

3.InProcCometStateProvider：继承了ICometStateProvider并实现了消息操作的方法，同时将消息保存在内存中。\

**接口类**\

1.ICometStateProvider:定义了一系列的接口来提供对CometClient实体和CometMessage的操作。\

**异常类**\

1.CometException:没有什么特殊的异常类。\

**事件**\

1.CometClientEventHandler:CometClient的事件监听类和广播类。\

**线程相关**\

1.CometWaitThread:服务器端线程池，排队等待信息请求并调用，同时提供超时等操作。\

2.CometWaitRequest:服务器端线程，监听客户端的message请求。\

3.CometAsyncResult:异步请求的管理类，通过继承SYSTEM.IAsyncResult来实现异步。\

**主体**\

**CometStateManager：**用来管理线程池，管理线程和用户连接，消息转发等一系列操作的工厂类。\

CometMessage类是COMET的通信载体，对消息的主体进行抽象，实际上这个类是最容易进行扩展的，因为从设计上看，它只是一个消息的容器。而诸如地理坐标，业务数据等，都可以通过这个类来进行直接扩充。\

类的设计简单明了，这里有必要解释下使用System.Runtime.Serialization命名空间的意义。\

“System.Runtime.Serialization 命名空间包含可用于将对象序列化和反序列化的类。序列化是将对象或对象图形转换为线性字节序列，以存储或传输到另一个位置的过程。反序列化是接受存储的信息并利用它重新创建对象的过程。”\

这 是MSDN给我们的解释，将对象转变为线性字节，然后方便传输与调用。当然这个例子中的数据类型并不复杂，但也包含了 LONG，OBJECT，STRING这样的数据类型。其中Contents成员为object对象，这给我们留下了非常大的想像空间。（图片？复杂对象 类型？自定义对象类型？……）\

**CometClient类：**CometClient 类是对客户端信息的抽象类，同时包含了两个关键属性 ConnectionIdleSeconds和ConnectionTimeoutSeconds。由于考虑到不同客户端间传递属性，仍然使用 System.Runtime.Serialization来序列化信息。\

ConnectionIdleSeconds：用来设置连接线程，当connection断线后，后台 Thread的存活时间。\

ConnectionTimeoutSeconds：客户端的超时时间，当超过时间后，客户端重新连接服务器。\

ps:有这两个属性后，基本上完成了客户端连接的控制，超时重连接，无连接时杀死后台线程。\

**ICometStateProvider接口：**ICometStateProvider 接口直接被CometStateMessager建立，这样的好处是实例化CometStateMessager对象 后，CometStateMessager对象可以直接调用ICometStateProvider接口的实现，实际上实现了Adapter的方式，我们 可以定制不同的InProcCometStateProvider类（在下面会提到）来定制自己的接口。\

ICometStateProvider接口类提供了如下几个接口。\

InitializeClient:提供ComentClient的初始化操作。\

GetMessages:得到一个Messages的消息队列。\

SendMessage:发送Message数据。\

SendMessage:可以针对Client name来进行消息发布（私人会话）。\

GetCometClient:返回一个Client。\

KillIdleCometClient:杀掉一个无效的Client对象。\

ps:当然这个接口是可以被拓展的，而且实现起来非常简单。得到Client队列信息，得到Client状态等等。甚至你可以想象一些更复杂的应用（比如加入一个流媒体消息……）。\

**InProcCometStateProvider类：**InProcCometStateProvider类实现了ICometStateProvider接口，并且提供了一个很好的范例，针对这个类，我们可以想象很多很好的拓展，诸如调用AO组件，封装报警信息等等。\

InProcCometStateProvider 类包含类一个私有的内部类InProcCometStateProvider，实际上可以理解为一种对消息的简单封装，设计的时候考虑到需要关联 CometClient和Message，其实也可以单独作为一个外部类来设计。不过 Adapter本身不应该太多关联类，这样做也是权衡了一些拓展上的需求。\

**CometWaitRequest类：**CometWaitRequest 是一个请求信息的控制信息的抽象，包含了所有需要的控制信息，并且由CometWaitThread直接调用。简单地理解这个类，服务器事件的发布需要有 一些线程进行管理，CometWaitRequest对这些事件的控制信息进行抽象，一个用户可以引发多个客户端请求，服务器端需要对这样的请求进行映 射，一个用户提交给服务器的信息，需要分别由相应线程进行管制，事件的队列化，然后就是请求的队列化，消息的队列化，都需要线程的直接管理，这个类是客户 端管理信息的抽象。\

**CometAsyncResult类：**这个类也很有趣，MSDN上对IAsyncResult 接口有如下的解释：\

“IAsyncResult 接口由包含可异步操作的方法的类实现。它是启动异步操作的方法的返回类型，如 FileStream.BeginRead，也是结束异步操作的方法的第三个参数的类型，如 FileStream.EndRead。当异步操作完成时，IAsyncResult 对象也将传递给由 AsyncCallback 委托调用的方法。\

支持 IAsyncResult 接口的对象存储异步操作的状态信息，并提供同步对象以允许线程在操作完成时终止。”\

CometAsyncResult类继承了IAsyncResult 接口有很多的好处，首先我们可以直接借用.net框架AsyncCallback的BeginInvoke和EndInvoke启动或终结异步操作。\

“.NET Framework 允许您异步调用任何方法。为此，应定义与您要调用的方法具有相同签名的委托；公共语言运行库会自动使用适当的签名为该委托定义 BeginInvoke 和 EndInvoke 方法。\

BeginInvoke 方法可启动异步调用。它与您需要异步执行的方法具有相同的参数，另外它还有两个可选参数。第一个参数是一个 AsyncCallback 委托，该委托引用在异步调用完成时要调用的方法。第二个参数是一个用户定义的对象，该对象可向回调方法传递信息。BeginInvoke 立即返回，不等待异步调用完成。BeginInvoke 会返回 IAsyncResult，这个结果可用于监视异步调用进度。\

EndInvoke 方法检索异步调用的结果。调用 BeginInvoke 后可随时调用 EndInvoke 方法；如果异步调用尚未完成，EndInvoke 将一直阻止调用线程，直到异步调用完成后才允许调用线程执行。EndInvoke 的参数包括您需要异步执行的方法的 out 和 ref 参数（在 Visual Basic 中为 <Out> ByRef 和 ByRef）以及由 BeginInvoke 返回的 IAsyncResult。”\

**CometWaitThread类：**CometWaitThread线程类负责控制CometWaitRequest，当一个用户提交了消息以后，会建立相应的CometWaitThread。\

**CometStateManager类：**CometStateManager 是整套COMET机制的核心，它将CometWaitThread和ICometStateProvider、CometClient、 CometMessage结合在了一起，形成了整套COMET的应用框架。是拓展COMET应用必须要改造的类。

[<span style="color: red; font-size: 18pt;">源码下载</span>](http://files.cnblogs.com/parry/ServerPush.rar)

</div>
