---
title: "多说评论系统API调用和本地身份说明(JWT)"
description: "多说评论系统 是一个非常好用的第三方评论插件,聚合了大多数的 SNS 平台账号登录和分享功能,UI 也很不错。 作为网站快速接入评论系统,多说是一个比较好的选择,其也提供了一些实用的 API 去满足定制化需求。 多说 API 支持将本地的用户基本信息同步到多说服务器,实现了本地用户系统和多说用户验证机制的一致。 大概…"
section: "parry-blog"
slug: "duoshuo-sdk-jwt"
lang: "zh-CN"
status: "published"
tags: ["API","多说",".NET","ASP.NET","网站开发","技术文章"]
publishedAt: "2014-02-26T19:44:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
author: "Parry Qiu"
---
[多说评论系统](http://duoshuo.com/) 是一个非常好用的第三方评论插件，聚合了大多数的 SNS 平台账号登录和分享功能，UI 也很不错。
作为网站快速接入评论系统，多说是一个比较好的选择，其也提供了一些实用的 API 去满足定制化需求。
多说 API 支持将本地的用户基本信息同步到多说服务器，实现了本地用户系统和多说用户验证机制的一致。
大概的过程：在用户注册或者修改个人信息的时候将用户信息同步至多说服务器，并在用户登录后在本地 cookie 写入 JWT 值，多说可以进行判断而实现用户无需再登录多说系统就可以进行评论。
<!--more-->

## 1. Array参数注意点

在使用 [多说同步用户信息API](http://dev.duoshuo.com/docs/51435552047fe92f490225de) 时，用户的信息 users 参数的类型为 array，这里需要特别注意其格式处理。
不过还是推荐多说团队使用 json 作为参数格式或者使用新浪微博的处理方式：参数类型为 string，多个参数使用逗号分隔，开发者的处理成本会小很多。
具体的参数格式为：
{% codeblock lang:js%}
users[0][<span>user_key</span>]=1&amp;users[0][<span>name</span>]=parry&amp;....
{% endcodeblock %}
这个具体的正确格式尝试了很多种方式后，在看到原始的 ASP 处理方式时才知道，谢谢多说技术人员小武的耐心解答（QQ：1175762238）。
他给的 asp 源码在 [这里](https://github.com/zsxsoft/duoshuo-zblog/blob/master/noresponse.asp#L185)。

## 2. 两个辅助函数

顺手整理出了两个方法：POST 数据到多说的 API 接口和设置多说本地身份说明 (JWT)。
注意：在 POST 数据到多说的 API 接口方法中只处理了一个 arrayPostData 的情况，多个数组的形式请自行修改。
项目名称就叫 DuoShuo.SDK.Partial 了，希望更多的人来完善 SDK。
有可以优化的地方请多指教。
{% codeblock lang:csharp%}
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace DuoShuo.SDK.Partial
{
    /// <summary>
    /// 多说POST请求的帮助类，主要解释了array参数的拼接格式和JWT的设置
    /// </summary>
    /// <author>
    /// Parry
    /// Mail: qiupengyuan@gmail.com
    /// Blog: http://www.cnblogs.com/parry
    /// </author>
    public class DuoShuoHelper
    {
        #region POST数据

        /// <summary>
        /// POST数据到多说的API接口
        /// </summary>
        /// <summary>http://dev.duoshuo.com/docs/51435552047fe92f490225de</summary>
        /// <param name="apiUrl">接口的URL，如http://api.duoshuo.com/users/import.json</param>
        /// <param name="prePostData">不包含array参数的前置数据，类似：short_name=当前站点注册的多说二级域名&secret=REDACTED
        /// <param name="arrayName">array形式的参数的名称，如users</param>
        /// <param name="arrayPostData">array形式的参数数据</param>
        /// <returns>接口返回的字符串</returns>
        /// <example>
        /// 注意array参数，在.NET下可以使用HashTable或者Dictionary实现
        /// 如：
        /// Dictionary<string, object> arrayPostData = new Dictionary<string, object>();
        /// arrayPostData.Add("user_key", 1);
        /// arrayPostData.Add("name", "Parry");
        /// arrayPostData.Add("role", "user");
        /// arrayPostData.Add("avatar_url", "");
        /// arrayPostData.Add("url", "");
        /// arrayPostData.Add("email", "");
        /// arrayPostData.Add("created_at", DateTime.Now.ToString("yyyy-mm-dd hh:MM:ss"));
        /// </example>
        /// <remarks>注意：此方法只处理了一个arrayPostData的情况，多个数组的形式请自行修改</remarks>
        public string HttpPostData(string apiUrl, string prePostData, string arrayName, Dictionary<string, object> arrayPostData)
        {
            var webRequest = WebRequest.Create(apiUrl) as HttpWebRequest;
            if (webRequest != null)
            {
                webRequest.Method = "post";
                webRequest.ContentType = "application/x-www-form-urlencoded";

                //postData赋值
                var postData = prePostData + "&" + string.Join("&", arrayPostData.Select(keyValuePair => string.Format("{0}[0][{1}]={2}", arrayName, keyValuePair.Key, keyValuePair.Value)).ToArray());

                ////使用非LINQ实现postData赋值
                //var listJoinArrayParamemter = new List<string>();
                //foreach (KeyValuePair<string, object> keyValuePair in arrayPostData)
                //{
                //    listJoinArrayParamemter.Add(string.Format("users[0][{0}]={1}", keyValuePair.Key, keyValuePair.Value));
                //}
                //var postData = prePostData + "&" + string.Join("&", listJoinArrayParamemter.ToArray());

                using (var sw = new StreamWriter(webRequest.GetRequestStream()))
                {
                    sw.Write(postData);
                }

                using (var response = webRequest.GetResponse())
                {
                    var stream = response.GetResponseStream();
                    if (stream == null) return string.Empty;
                    using (var sr = new StreamReader(stream))
                    {
                        return sr.ReadToEnd();
                    }
                }
            }
            return string.Empty;
        }

        #endregion

        #region 多说本地身份说明(JWT)

        /// <summary>
        /// 设置多说本地身份说明(JWT)
        /// </summary>
        /// <summary>http://dev.duoshuo.com/docs/501e6ce1cff715f71800000d</summary>
        /// <param name="secretKey">站点多说密钥</param>
        /// <param name="shortName">当前站点注册的多说二级域名</param>
        /// <param name="userKey">用户在当前站点中对应的唯一标示，通常是用户ID</param>
        /// <param name="name">用户在当前网站的用户名</param>
        public void SetLocalJwt(string secretKey, string shortName, string userKey, string name)
        {
            var array = new Dictionary<string, object>
            {
                {"short_name", shortName},
                {"user_key", userKey},
                {"name", name}
            };
            string token = JsonWebToken.Encode(array, secretKey, JwtHashAlgorithm.HS256);
            //cookie设置了一年过期
            var cookie = new HttpCookie("duoshuo_token") { Value = token, Expires = DateTime.Now.AddDays(365) };
            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        #endregion

    }
}
{% endcodeblock %}

## 3. 完整源码下载
[完整源码下载](http://files.cnblogs.com/parry/DuoShuo.SDK.Partial.zip)，包含 JWT 公共类。
