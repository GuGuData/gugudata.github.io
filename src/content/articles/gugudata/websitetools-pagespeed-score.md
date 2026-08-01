---
title: "网页性能与 SEO 评分 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/pagespeed-score"
section: "gugudata"
slug: "websitetools-pagespeed-score"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-05-23T08:00:41.000Z"
updatedAt: "2026-05-23T08:00:41.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/pagespeed-score"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/8951951cea1dc793c4811bcb008d8cc3.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/pagespeed-score](https://www.gugudata.com/api/details/pagespeed-score)

网页性能与 SEO 评分 API 网页性能与 SEO 体验评分，页面评分、SEO 评分、页面性能等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/8951951cea1dc793c4811bcb008d8cc3.jpg)

## 1. 产品功能

- 获取 performance、accessibility、best-practices、seo 四类评分，分值范围 0~100；
- 支持 mobile 与 desktop 两种检测策略，默认 mobile；
- 返回 FCP、LCP、Speed Index、TBT、CLS 等核心页面体验指标；
- 返回标题、描述、可抓取链接、索引可用性、Canonical、HTTP 状态、robots.txt 与 viewport 等 SEO 审计摘要；
- TopIssues 返回最多 10 条主要待优化项，便于快速定位页面优化方向；
- 支持复用近期检测结果，forceRefresh=true 可重新检测并刷新结果；
- 围绕“网页性能与 SEO 评分”提供标准化能力，便于快速接入现有业务；
- 适合将“网页性能与 SEO 评分”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/websitetools/pagespeed-score

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/websitetools/pagespeed-score?appkey=REDACTED&url=YOUR_VALUE&strategy=mobile&locale=zh-CN&categories=YOUR_VALUE&forceRefresh=false

**数据预览:** [https://www.gugudata.com/preview/pagespeed-score](https://www.gugudata.com/preview/pagespeed-score)

**接口测试:** [https://api.gugudata.com/websitetools/pagespeed-score/demo](https://api.gugudata.com/websitetools/pagespeed-score/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| url | string | 是 | YOUR_VALUE | 需要检测评分的网页 URL，必须是有效的 HTTP 或 HTTPS 链接，例如：https://www.baidu.com。 |
| strategy | string | 否 | mobile | 检测策略，可选 mobile 或 desktop，默认 mobile。 |
| locale | string | 否 | zh-CN | 返回语言区域，默认 zh-CN。 |
| categories | string | 否 | YOUR_VALUE | 评分类别，可选 performance、accessibility、best-practices、seo；多个值用英文逗号分隔，不传时返回全部类别。 |
| forceRefresh | boolean | 否 | false | 是否重新检测并刷新结果，默认 false；false 时可优先返回近期已有检测结果。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算。 |
| Data.RequestedUrl | string | 请求检测的网页 URL。 |
| Data.FinalUrl | string | 检测完成后的最终网页 URL，可能是重定向后的地址。 |
| Data.Strategy | string | 本次检测使用的策略，mobile 或 desktop。 |
| Data.Locale | string | 本次检测使用的语言区域。 |
| Data.ReportVersion | string | 页面评分报告版本。 |
| Data.FetchTime | string | 检测报告生成时间。 |
| Data.Cached | boolean | 本次返回是否来自近期已有检测结果。 |
| Data.Scores.Performance | int | 性能评分，范围 0~100，没有对应分类时返回 null。 |
| Data.Scores.Accessibility | int | 可访问性评分，范围 0~100，没有对应分类时返回 null。 |
| Data.Scores.BestPractices | int | 最佳实践评分，范围 0~100，没有对应分类时返回 null。 |
| Data.Scores.Seo | int | SEO 评分，范围 0~100，没有对应分类时返回 null。 |
| Data.Metrics.FirstContentfulPaintMs | double | 首次内容绘制耗时，单位毫秒。 |
| Data.Metrics.LargestContentfulPaintMs | double | 最大内容绘制耗时，单位毫秒。 |
| Data.Metrics.SpeedIndexMs | double | 速度指数，单位毫秒。 |
| Data.Metrics.TotalBlockingTimeMs | double | 总阻塞时间，单位毫秒。 |
| Data.Metrics.CumulativeLayoutShift | double | 累计布局偏移。 |
| Data.SeoAudits.Title | object | 网页标题 SEO 审计摘要。 |
| Data.SeoAudits.MetaDescription | object | 网页描述 SEO 审计摘要。 |
| Data.SeoAudits.CrawlableAnchors | object | 可抓取链接审计摘要。 |
| Data.SeoAudits.IsCrawlable | object | 索引可用性审计摘要。 |
| Data.SeoAudits.Canonical | object | Canonical 链接审计摘要。 |
| Data.SeoAudits.HttpStatusCode | object | 网页 HTTP 状态审计摘要。 |
| Data.SeoAudits.RobotsTxt | object | robots.txt 审计摘要。 |
| Data.SeoAudits.Viewport | object | 移动端视口配置审计摘要。 |
| Data.TopIssues.Id | string | 主要待优化项 ID。 |
| Data.TopIssues.Title | string | 主要待优化项标题。 |
| Data.TopIssues.Score | int | 主要待优化项得分，范围 0~100，没有得分时返回 null。 |
| Data.TopIssues.DisplayValue | string | 主要待优化项展示值。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 可通过判断此状态码断言接口正常返回。 |
| 501 | 参数错误 | 请检查 URL、strategy、locale、categories 等参数是否正确。 |
| 502 | 请求频率受限 | 默认情况下，每个接口提供 10 QPS 并发能力，可满足大多数业务场景。超出当前并发能力时，网关可能返回请求频率受限；如需更高吞吐，可按需购买额外 QPS 扩展包。 |
| 503 | APPKEY 权限超限或订单到期 | 请前往开发者中心检查 APPKEY 状态与订单有效期。 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确。 |
| 505 | 请求次数超出接口限制 | 请检查接口剩余请求次数与配额限制。 |
| 900 | 接口内部响应错误 | 接口服务暂时不可用，请稍后重试。 |

## 6. 适用场景

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 网页性能与 SEO 评分 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
