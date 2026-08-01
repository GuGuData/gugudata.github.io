---
title: "小心 DataContractJsonSerializer 和 JavaScriptSerializer 的实现差异"
description: "本文主要阐述了在使用 DataContractJsonSerializer 和 JavaScriptSerializer 中遇到的问题。 <!--more--"
section: "parry-blog"
slug: "diff-json-method"
lang: "zh-CN"
status: "published"
tags: [".NET","ASP.NET","技术文章"]
publishedAt: "2012-12-04T10:37:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
本文主要阐述了在使用 DataContractJsonSerializer 和 JavaScriptSerializer 中遇到的问题。
<!--more-->

## 问题的引子
先来看问题的引子。
定义一个下面这样的类，此类有 Serializable 属性，并且有一个属性的定义没有使用自动属性来实现。
{% codeblock lang:csharp%}
 [Serializable]
 public class Users
 {
     pulic int UserID { get; set; }

     public string UserName { get; set; }

     public string UserEmail { get; set; }

     private string _testProperty;
     public string TestProperty
     {
         get { return _testProperty; }
         set { _testProperty = value; }
     }
 }
{% endcodeblock %}

然后分别使用 DataContractJsonSerializer 和 JavaScriptSerializer 对此对象的示例进行序列化。
使用 DataContractJsonSerializer 序列化后的结果。

{% codeblock lang:js%}
{"_testProperty":"TestPropertyValue","<UserEmail>k__BackingField":"parry@cnblogs.com"<span style="color: #000000;">,
    </span>"<UserID>k__BackingField":1,"<UserName>k__BackingField":"Parry"}
{% endcodeblock %}

使用 JavaScriptSerializer 序列化后的结果。

{% codeblock lang:js%}
{"UserID":1,"UserName":"Parry","UserEmail":"parry@cnblogs.com","TestProperty":"TestPropertyValue"}
{% endcodeblock %}
## DataContractJsonSerializer 和 JavaScriptSerializer 的实现差异

DataContractJsonSerializer 在 .NET Framework 3.5 中引入，主要因为 WCF 的引入而添加了这个对象序列化的基本方法，并且微软同时将 JavaScriptSerializer 打上了过时（obsolete）的标签，编译时就会有警告出现。
而在 .NET Framework 3.5 SP1 中，微软又将 JavaScriptSerializer 的「过时」标签给去掉了。
使用 Reflector 去比较这两个类的内部实现发现，DataContractJsonSerializer 在对象序列化时进行了更为严格的检查，感兴趣的可以去 System.Runtime.Serialization.Json 下面的核心方法InternalWriteObjectContent 去看其实现。
而在 .NET Framework 3.5 引入的自动属性，实际上就是个语法糖，编译器还是会生成一个 int 类型的<Name>k_BackingField 的私有字段作为这个属性的后端字段，内部还是和以前的 get/set 方法一样。
所以直接使用 DataContractJsonSerializer 进行序列化时，又将编译器生成的 k_BackingField 带了出来。
而 JavaScriptSerializer 的实现则非常简单，将属性名和属性值分别存储在 Dictionary 里，然后进行字符串拼接返回而已，所以对类定义几乎没有检查并且对复杂类的支持不太好。
下面是 JavaScriptSerializer 里面的核心方法 SerializeValue 的实现。

{% codeblock lang:csharp %}
 private void SerializeValue(object o, StringBuilder sb, int depth, Hashtable objectsInUse,
SerializationFormat serializationFormat, MemberInfo currentMember = null) {
    if (++depth > _recursionLimit) {
        throw new ArgumentException(AtlasWeb.JSON_DepthLimitExceeded);
    }

    // Check whether a custom converter is available for this type.
    JavaScriptConverter converter = null;
    if (o != null && ConverterExistsForType(o.GetType(), out converter)) {
        IDictionary<string, object> dict = converter.Serialize(o, this);

        if (TypeResolver != null) {
            string typeString = TypeResolver.ResolveTypeId(o.GetType());
            if (typeString != null) {
                dict[ServerTypeFieldName] = typeString;
            }
        }

        sb.Append(Serialize(dict, serializationFormat));
        return;
    }

    SerializeValueInternal(o, sb, depth, objectsInUse, serializationFormat, currentMember);
}
{% endcodeblock %}

## 解决方法
如果一定要使用 DataContractJsonSerializer，只有当为类加上 [DataContract] 属性，并且为需要序列化的属性加上 [DataMember] 后，使用 DataContractJsonSerializer 才可以生成干净、整洁的JSON数据。
而当我们使用一些不能修改的类定义，如上面的 Users 类定义，我们没有权限去修改其定义，那么就可以使用 JavaScriptSerializer 去进行 JSON 序列化。
当然第三方的 Json.NET (Newtonsoft.Json) 也是可以实现的，并且在支持的功能和效率方面往往是一个更好的选择，在 [这里](http://json.codeplex.com/) 看它和 DataContractJsonSerializer 以及 JavaScriptSerializer 的使用对比。
所以在使用时需要稍微注意下这三个 JSON 序列化方法的差异，根据自己的需求灵活选择合适的组件。
