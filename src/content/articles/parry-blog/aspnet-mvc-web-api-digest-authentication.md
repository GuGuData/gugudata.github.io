---
title: "MVC Web API(三):安全验证之使用摘要认证"
description: "在前一篇文章中,主要讨论了使用 HTTP 基本认证的方法,因为 HTTP 基本认证的方式决定了它在安全性方面存很大的问题,所以接下来看看另一种验证的方式:digest authentication,即摘要认证。 <!--more--"
section: "parry-blog"
slug: "aspnet-mvc-web-api-digest-authentication"
lang: "zh-CN"
status: "published"
tags: ["API","ASP.NET","MVC","技术文章"]
publishedAt: "2013-07-05T07:52:00.000Z"
updatedAt: "2025-07-13T13:40:31.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/cdf5a02d6cf7f9c5654954e2daac8000.png"
author: "Parry Qiu"
---
在前一篇文章中，主要讨论了使用 HTTP 基本认证的方法，因为 HTTP 基本认证的方式决定了它在安全性方面存很大的问题，所以接下来看看另一种验证的方式：digest authentication，即摘要认证。
<!--more-->

## 摘要认证原理

在基本认过一些手段避免了此问题，大大增加了安全性。

下图为摘要验证的验证原理流程图。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/cdf5a02d6cf7f9c5654954e2daac8000.png)

下面大致看一下这部分的验证流程：

1. 客户端请求 /api/employees；
2. 服务端返回 401 未验证的状态，并且在返回的信息中包含了验证方式 Digest 和 realm的值，QOP (<span>quality of protection</span>) 只设置成 auth，nonce 为一串随机值，在下面的请求中会一直使用到，当过了存活期后服务端将刷新生成一个新的 nonce 值；
3. 客户端接受到请求返回后，将 username:realm:password 进行 HASH 运算，假设运算后的值为 HA1 。又将请求的路径 /api/employees 进行 HASH 运算，假设运算后的值为 HA2。再将HA1:nonce:nc:cnonce:qop:HA2 进行 HASH 运算，得到的值放在 response 中。这里的 cnonce 为客户端生成的 nonce 值，而 nc 用于统计，假设开始时为 00000001，下次请求后就变成了 00000002，不一定每次都加 1，但是后面请求中的 nc 值肯定大于前一次请求中的 nc 值。
4. 服，即第二步的状态。如果没有过期，那么比较 nc 值，如果比前一次 nc 值小或者前一次根本没有存储的 nc 值，那么也将直接返回 401 状态。如果前面的验证都通过，那么服务端也将按照步骤 3 中计算最终HASH值的步骤计算出 HASH 值与客户端的进行比较，然后比较客户端提交过来的 HASH 值与服务端计算出来的 HASH 进行比较，不匹配返回 401，匹配获取请求的数据并返回状态 200。
摘要验证主要就是通过上面的 HASH 比较的步骤避免掉了基本验证中的安全性问题。
需要注意的是，如果需要 IIS 支持摘要验证，需要把 IIS 摘要验证的特性勾上。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/225dac511c326817d855fff5f546e9e3.png)

## 摘要验证的实现

在理解了摘要验证的原理之后，只需要用代码实现即可。
判断 nonce 是否过期的方法。
{% codeblock lang:csharp%}
public static bool IsValid(string nonce, string nonceCount)
        {
            Tuple<int, DateTime> cachedNonce = null;
            nonces.TryGetValue(nonce, out cachedNonce);

            if (cachedNonce != null) // nonce is found
            {
                // nonce count is greater than the one in record
                if (Int32.Parse(nonceCount) > cachedNonce.Item1)
                {
                    // nonce has not expired yet
                    if (cachedNonce.Item2 > DateTime.Now)
                    {
                        // update the dictionary to reflect the nonce count just received in this request
                        nonces[nonce] = new Tuple<int, DateTime>(Int32.Parse(nonceCount),
                                                                                                            cachedNonce.Item2);

                        // Every thing looks ok - server nonce is fresh and nonce count seems to be
                        // incremented. Does not look like replay.
                        return true;
                    }
                }
            }

            return false;
        }
{% endcodeblock %}

下面为摘要验证实现的核心方法
{% codeblock lang:csharp%}
namespace DigestAuthentication
{
    public class AuthenticationHandler : DelegatingHandler
    {
        protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            try
            {
                var headers = request.Headers;
                if (headers.Authorization != null)
                {
                    Header header = new Header(request.Headers.Authorization.Parameter,
                                                                                                                      request.Method.Method);

                    if (Nonce.IsValid(header.Nonce, header.NounceCounter))
                    {
                        // Just assuming password is same as username for the purpose of illustration
                        string password = header.UserName;

                        string ha1 = String.Format("{0}:{1}:{2}", header.UserName, header.Realm,
                                                                                                                             password).ToMD5Hash();

                        string ha2 = String.Format("{0}:{1}", header.Method, header.Uri).ToMD5Hash();

                        string computedResponse = String
                                      .Format("{0}:{1}:{2}:{3}:{4}:{5}",
                                            ha1, header.Nonce, header.NounceCounter,
                                                                                         header.Cnonce, "auth", ha2).ToMD5Hash();

                        if (String.CompareOrdinal(header.Response, computedResponse) == 0)
                        {
                            // digest computed matches the value sent by client in the response field.
                            // Looks like an authentic client! Create a principal.
                            var claims = new List<Claim>
                            {
                                            new Claim(ClaimTypes.Name, header.UserName),
                                            new Claim(ClaimTypes.AuthenticationMethod, AuthenticationMethods.Password)
                            };

                            var principal = new ClaimsPrincipal(new[] { new ClaimsIdentity(claims, "Digest") });

                            Thread.CurrentPrincipal = principal;

                            if (HttpContext.Current != null)
                                HttpContext.Current.User = principal;
                        }
                    }
                }

                var response = await base.SendAsync(request, cancellationToken);

                if (response.StatusCode == HttpStatusCode.Unauthorized)
                {
                    response.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue("Digest",
                                                                                     Header.UnauthorizedResponseHeader.ToString()));
                }

                return response;
            }
            catch (Exception)
            {
                var response = request.CreateResponse(HttpStatusCode.Unauthorized);
                response.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue("Digest",
                                                                                       Header.UnauthorizedResponseHeader.ToString()));

                return response;
            }
        }
    }

}
{% endcodeblock %}

实现完成后，使用摘要验证只需要在对应的方法加上 [Authorize] 属性标签即可。

![](https://assets.devopen.club/uPic/202608/gugudata-pages/4a3cc5d2e1be6d84d35186e871a3cbfd.png)

## 摘要验证的优缺点
摘要验证很好地解决了使用基本验证所担心的安全性问题。
但是永远没有绝对的安全，当用户使用字典进行穷举破解时，还是会存在一些被破解的隐患。

## 源码下载
编辑器里怎么找不到上传文件的地方了？我上传到了百度网盘里。
[源代码下载](http://pan.baidu.com/share/link?shareid=3825803026&uk=167925763)
