---
title: "搜索可见性 SERP 数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/search-visibility"
section: "gugudata"
slug: "websitetools-search-visibility"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/search-visibility"
cover: "https://static.gugudata.com/api-cover-serp.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/search-visibility](https://www.gugudata.com/api/details/search-visibility)

搜索可见性 SERP 数据 API 支持创建关键词搜索可见性报告，并自动发起 Google、Bing、Baidu 等搜索来源的排名观测任务。搜索可见性、SEO、SERP、关键词排名和竞品分析等关键词场景常会用到，适合用于品牌曝光监控、搜索排名追踪、竞品差距分析、SEO 周报和增长数据看板等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-cover-serp.jpg)

## 1. 产品功能

- 支持 Google、Bing、Baidu 多搜索来源的关键词排名观测；
- 支持 Top10、Top20、Top50 三种观测深度，按深度折算 credits；
- 返回 SERP 可见性评分、最佳排名、Top10/Top20 覆盖率和来源覆盖率；
- 支持品牌别名和竞品域名配置，输出品牌匹配和竞品差距；
- 报告创建后自动发起首个观测任务，后续可手动重跑并分页查询结果；
- 创建报告和创建观测任务消耗 credits，读取报告、任务和结果不消耗 credits；
- 支持按报告、观测任务和关键词级结果逐层读取数据；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v1/searchVisibilityReports

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v1/searchVisibilityReports?appkey=REDACTED

**数据预览:** [https://www.gugudata.com/preview/search-visibility](https://www.gugudata.com/preview/search-visibility)

**接口测试:** [https://api.gugudata.com/v1/searchVisibilityReports](https://api.gugudata.com/v1/searchVisibilityReports)

**OpenAPI:** [https://www.gugudata.com/openapi/gugudata.openapi.3.1.json](https://www.gugudata.com/openapi/gugudata.openapi.3.1.json)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。推荐通过 Query 参数或 Header 传递 |
| brand | string | 是 | YOUR_VALUE | 品牌或产品名称，长度 1-120，用于匹配标题、摘要和结果链接中的品牌信号 |
| domain | string | 是 | YOUR_VALUE | 需要观测的主域名，长度 1-255。可传 gugudata.com 或 https://www.gugudata.com，系统会按主域名规范化 |
| queries | array | 是 | ["gugudata api"] | 需要观测的搜索关键词列表，1-50 个。创建报告会自动创建首个观测任务，按关键词数量计入 credits 计算 |
| sources | array | 是 | ["google_web"] | 搜索来源，1-3 个；支持 google_web、bing_web、baidu_web |
| displayName | string | 否 | YOUR_VALUE | 报告显示名称，便于在列表中识别 |
| aliases | array | 否 | [] | 品牌别名列表，最多 20 个，用于补充匹配英文名、简称、产品名等品牌信号 |
| competitors | array | 否 | [] | 竞品域名定义列表，最多 10 个；每项支持 domain、name、aliases |
| locale | string | 否 | zh-CN | 语言区域提示，如 zh-CN、en-US |
| region | string | 否 | CN | 地域提示，如 CN、US、HK |
| maxRank | int | 否 | 20 | 观测排名深度，仅支持 10、20、50 |
| includeRawResponse | boolean | 否 | false | 是否在问题排查场景保留扩展返回引用，普通业务接入建议保持 false |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| name | string | 报告资源名，格式为 searchVisibilityReports/{reportId} |
| reportId | string | 报告 ID，后续查询报告、创建观测任务时使用 |
| displayName | string | 报告显示名称 |
| brand | string | 品牌或产品名称 |
| domain | string | 需要观测的主域名，系统会按规范域名返回 |
| aliases | array | 品牌别名列表 |
| competitors | array | 竞品定义列表，包含 domain、name、aliases |
| queries | array | 报告内需要持续观测的搜索关键词 |
| sources | array | 搜索来源列表，支持 google_web、bing_web、baidu_web |
| locale | string | 语言区域提示，如 zh-CN、en-US |
| region | string | 地域提示，如 CN、US、HK |
| maxRank | int | 观测排名深度，仅支持 10、20、50 |
| latestRunId | string | 最近一次观测任务 ID。创建报告时会自动创建首个观测任务 |
| latestRunStatus | string | 最近一次观测任务状态，可能为 PENDING、RUNNING、SUCCEEDED、FAILED、PARTIALLY_FAILED、CANCELLED |
| latestMetrics | object | 最近一次观测任务聚合指标，任务完成前可能为空对象 |
| createdAt | string | 报告创建时间，UTC RFC3339 格式 |
| updatedAt | string | 报告最近更新时间，UTC RFC3339 格式 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 接口正常返回 |
| 400 | 请求参数无效 | 请检查品牌、域名、关键词、搜索来源和观测深度等参数 |
| 401 | APPKEY 无效或未提供 | 请检查传递的 APPKEY 是否正确 |
| 403 | 当前 APPKEY 未开通该产品权益 | 请前往开发者中心检查接口购买状态与订单有效期 |
| 429 | 超出年度 credits 额度或请求频率限制 | 请检查 credits 余额、调用频率或购买额外额度 |

## 6. 适用场景

- 适合用于品牌曝光监控和 SEO 周报，持续观察核心关键词在 Google、Bing、Baidu 中的可见性变化。
- 适合用于竞品排名分析和搜索增长看板，将品牌匹配、竞品差距、Top10/Top20 覆盖率等指标接入业务报表。
- 适合用于新品发布、内容营销和站点优化评估，在关键词、地区、语言和搜索来源维度沉淀可追踪的观测数据。

## 7. 相关接口

### 7.1 同一接口族关联接口

| 接口名称 | 请求方式 | 资源路径 | 主要用途 |
| --- | --- | --- | --- |
| 创建搜索可见性报告 | POST | /v1/searchVisibilityReports | 创建关键词搜索可见性报告，并自动创建首个观测任务 |
| 搜索可见性报告列表 | GET | /v1/searchVisibilityReports | 分页读取当前 AppKey 下的搜索可见性报告，可用于报告列表页和历史报告管理 |
| 获取搜索可见性报告 | GET | /v1/searchVisibilityReports/{reportId} | 读取指定报告配置、最近一次观测任务和最近聚合指标 |
| 创建搜索可见性观测任务 | POST | /v1/searchVisibilityReports/{reportId}/runs | 为指定报告创建一次新的搜索观测任务，可用于手动重跑或定期观测 |
| 搜索可见性观测任务列表 | GET | /v1/searchVisibilityReports/{reportId}/runs | 分页读取报告下的观测任务，支持按状态过滤和排序 |
| 获取搜索可见性观测任务 | GET | /v1/searchVisibilityRuns/{runId} | 读取指定观测任务状态、credits 消耗和聚合指标 |
| 搜索可见性观测结果列表 | GET | /v1/searchVisibilityRuns/{runId}/results | 分页读取观测任务下的关键词级结果，支持按 source/query 过滤 |
| 获取搜索可见性观测结果 | GET | /v1/searchVisibilityResults/{resultId} | 读取指定关键词和搜索来源的观测结果，包含排名列表、品牌匹配和竞品匹配 |

其中创建搜索可见性报告为本文主接口，完整请求参数和返回参数见第 3、4 节；以下展开其余关联接口。

#### 搜索可见性报告列表

分页读取当前 AppKey 下的搜索可见性报告。适合用于报告管理页、历史报告查询和定期观测任务的前置查询；读取报告列表不消耗搜索可见性 credits。

**接口地址:** https://api.gugudata.com/v1/searchVisibilityReports

**请求方式:** GET

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| appkey | string | 是 | 付费后获取的 APPKEY |
| pageSize | int | 否 | 每页返回数量 |
| pageToken | string | 否 | 分页令牌 |
| filter | string | 否 | 过滤表达式，可用于按 brand/domain 等条件筛选 |
| orderBy | string | 否 | 排序表达式，可用于按 createdAt、updatedAt、domain 等字段排序 |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| reports | array | 当前页报告列表 |
| reports[].name | string | 报告资源名，格式为 searchVisibilityReports/{reportId} |
| reports[].reportId | string | 报告 ID |
| reports[].displayName | string | 报告显示名称 |
| reports[].brand | string | 品牌或产品名称 |
| reports[].domain | string | 需要观测的主域名，系统会按规范域名返回 |
| reports[].aliases | array | 品牌别名列表 |
| reports[].competitors | array | 竞品定义列表 |
| reports[].competitors[].domain | string | 竞品域名 |
| reports[].competitors[].name | string | 竞品名称 |
| reports[].competitors[].aliases | array | 竞品别名列表 |
| reports[].queries | array | 报告内需要持续观测的搜索关键词 |
| reports[].sources | array | 搜索来源列表，支持 google_web、bing_web、baidu_web |
| reports[].locale | string | 语言区域提示，如 zh-CN、en-US |
| reports[].region | string | 地域提示，如 CN、US、HK |
| reports[].maxRank | int | 观测排名深度，仅支持 10、20、50 |
| reports[].latestRunId | string | 最近一次观测任务 ID |
| reports[].latestRunStatus | string | 最近一次观测任务状态 |
| reports[].latestMetrics | object | 最近一次观测任务聚合指标，任务完成前可能为空对象 |
| reports[].createdAt | string | 报告创建时间，UTC RFC3339 格式 |
| reports[].updatedAt | string | 报告最近更新时间，UTC RFC3339 格式 |
| nextPageToken | string | 下一页分页令牌；为空表示没有下一页 |

#### 获取搜索可见性报告

读取指定搜索可见性报告，返回报告配置、最近一次观测任务和最近聚合指标；读取报告不消耗搜索可见性 credits。

**接口地址:** https://api.gugudata.com/v1/searchVisibilityReports/{reportId}

**请求方式:** GET

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| appkey | string | 是 | 付费后获取的 APPKEY |
| reportId | string | 是 | 报告 ID |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| name | string | 报告资源名，格式为 searchVisibilityReports/{reportId} |
| reportId | string | 报告 ID |
| displayName | string | 报告显示名称 |
| brand | string | 品牌或产品名称 |
| domain | string | 需要观测的主域名，系统会按规范域名返回 |
| aliases | array | 品牌别名列表 |
| competitors | array | 竞品定义列表 |
| competitors[].domain | string | 竞品域名 |
| competitors[].name | string | 竞品名称 |
| competitors[].aliases | array | 竞品别名列表 |
| queries | array | 报告内需要持续观测的搜索关键词 |
| sources | array | 搜索来源列表，支持 google_web、bing_web、baidu_web |
| locale | string | 语言区域提示，如 zh-CN、en-US |
| region | string | 地域提示，如 CN、US、HK |
| maxRank | int | 观测排名深度，仅支持 10、20、50 |
| latestRunId | string | 最近一次观测任务 ID |
| latestRunStatus | string | 最近一次观测任务状态 |
| latestMetrics | object | 最近一次观测任务聚合指标，任务完成前可能为空对象 |
| createdAt | string | 报告创建时间，UTC RFC3339 格式 |
| updatedAt | string | 报告最近更新时间，UTC RFC3339 格式 |

#### 创建搜索可见性观测任务

为报告创建一次新的采样观测任务。该接口会按关键词、搜索来源和排名深度消耗 credits；forceRefresh=true 重新观测时同样消耗 credits。

**接口地址:** https://api.gugudata.com/v1/searchVisibilityReports/{reportId}/runs

**请求方式:** POST

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| appkey | string | 是 | 付费后获取的 APPKEY |
| reportId | string | 是 | 报告 ID |
| forceRefresh | boolean | 否 | 是否跳过短期复用结果并重新观测，默认 false；设置为 true 会重新创建观测并消耗 credits |
| includeRawResponse | boolean | 否 | 是否在问题排查场景保留扩展返回引用，普通业务接入建议保持 false |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| name | string | 观测任务资源名，格式为 searchVisibilityRuns/{runId} |
| runId | string | 观测任务 ID |
| reportId | string | 所属报告 ID |
| state | string | 任务状态，可能为 PENDING、RUNNING、SUCCEEDED、FAILED、PARTIALLY_FAILED、CANCELLED |
| forceRefresh | boolean | 是否跳过短期复用结果并重新观测 |
| creditCost | int | 本次观测消耗的 credits |
| tasksTotal | int | 本次观测拆分后的任务总数，通常为关键词数乘以搜索来源数 |
| tasksSucceeded | int | 已成功完成的任务数 |
| tasksFailed | int | 执行失败的任务数 |
| metrics | object | 任务完成后的聚合指标 |
| metrics.queryCoverageRate | number | 关键词和来源组合中品牌可见的比例，0 到 1 |
| metrics.top10PresenceRate | number | 进入前 10 名的比例，0 到 1 |
| metrics.top20PresenceRate | number | 进入前 20 名的比例，0 到 1 |
| metrics.bestRank | int | 本次观测中品牌域名出现的最佳排名 |
| metrics.averageVisibleRank | number | 有排名结果时的平均可见排名 |
| metrics.averageRankWithPenalty | number | 未命中时按 maxRank + 1 计入后的平均排名 |
| metrics.competitorGap | number | 品牌最佳排名与竞品最佳排名的平均差值，正数表示品牌更靠前 |
| metrics.sourceCoverage | object | 按搜索来源统计的可见比例 |
| metrics.visibilityScore | number | 综合可见性评分，0 到 100 |
| errorSummary | array | 失败任务摘要，包含失败来源、关键词和错误说明 |
| createdAt | string | 任务创建时间，UTC RFC3339 格式 |
| updatedAt | string | 任务最近更新时间，UTC RFC3339 格式 |
| completedAt | string | 任务完成时间，UTC RFC3339 格式 |

#### 搜索可见性观测任务列表

分页读取报告下的观测任务。支持按 state 过滤，按 createdAt、updatedAt、state 排序；读取任务列表不消耗搜索可见性 credits。

**接口地址:** https://api.gugudata.com/v1/searchVisibilityReports/{reportId}/runs

**请求方式:** GET

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| appkey | string | 是 | 付费后获取的 APPKEY |
| reportId | string | 是 | 报告 ID |
| pageSize | int | 否 | 每页返回数量 |
| pageToken | string | 否 | 分页令牌 |
| filter | string | 否 | 过滤表达式 |
| orderBy | string | 否 | 排序表达式 |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| runs | array | 当前页观测任务列表 |
| runs[].name | string | 观测任务资源名，格式为 searchVisibilityRuns/{runId} |
| runs[].runId | string | 观测任务 ID |
| runs[].reportId | string | 所属报告 ID |
| runs[].state | string | 任务状态，可能为 PENDING、RUNNING、SUCCEEDED、FAILED、PARTIALLY_FAILED、CANCELLED |
| runs[].forceRefresh | boolean | 是否跳过短期复用结果并重新观测 |
| runs[].creditCost | int | 本次观测消耗的 credits |
| runs[].tasksTotal | int | 本次观测拆分后的任务总数 |
| runs[].tasksSucceeded | int | 已成功完成的任务数 |
| runs[].tasksFailed | int | 执行失败的任务数 |
| runs[].metrics | object | 任务完成后的聚合指标 |
| runs[].metrics.queryCoverageRate | number | 关键词和来源组合中品牌可见的比例，0 到 1 |
| runs[].metrics.top10PresenceRate | number | 进入前 10 名的比例，0 到 1 |
| runs[].metrics.top20PresenceRate | number | 进入前 20 名的比例，0 到 1 |
| runs[].metrics.bestRank | int | 本次观测中品牌域名出现的最佳排名 |
| runs[].metrics.averageVisibleRank | number | 有排名结果时的平均可见排名 |
| runs[].metrics.averageRankWithPenalty | number | 未命中时按 maxRank + 1 计入后的平均排名 |
| runs[].metrics.competitorGap | number | 品牌最佳排名与竞品最佳排名的平均差值，正数表示品牌更靠前 |
| runs[].metrics.sourceCoverage | object | 按搜索来源统计的可见比例 |
| runs[].metrics.visibilityScore | number | 综合可见性评分，0 到 100 |
| runs[].errorSummary | array | 失败任务摘要，包含失败来源、关键词和错误说明 |
| runs[].createdAt | string | 任务创建时间，UTC RFC3339 格式 |
| runs[].updatedAt | string | 任务最近更新时间，UTC RFC3339 格式 |
| runs[].completedAt | string | 任务完成时间，UTC RFC3339 格式 |
| nextPageToken | string | 下一页分页令牌；为空表示没有下一页 |

#### 获取搜索可见性观测任务

读取指定观测任务，适合轮询任务状态、查看 creditCost 和获取聚合指标；读取任务不消耗搜索可见性 credits。

**接口地址:** https://api.gugudata.com/v1/searchVisibilityRuns/{runId}

**请求方式:** GET

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| appkey | string | 是 | 付费后获取的 APPKEY |
| runId | string | 是 | 观测任务 ID |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| name | string | 观测任务资源名，格式为 searchVisibilityRuns/{runId} |
| runId | string | 观测任务 ID |
| reportId | string | 所属报告 ID |
| state | string | 任务状态，可能为 PENDING、RUNNING、SUCCEEDED、FAILED、PARTIALLY_FAILED、CANCELLED |
| forceRefresh | boolean | 是否跳过短期复用结果并重新观测 |
| creditCost | int | 本次观测消耗的 credits |
| tasksTotal | int | 本次观测拆分后的任务总数，通常为关键词数乘以搜索来源数 |
| tasksSucceeded | int | 已成功完成的任务数 |
| tasksFailed | int | 执行失败的任务数 |
| metrics | object | 任务完成后的聚合指标 |
| metrics.queryCoverageRate | number | 关键词和来源组合中品牌可见的比例，0 到 1 |
| metrics.top10PresenceRate | number | 进入前 10 名的比例，0 到 1 |
| metrics.top20PresenceRate | number | 进入前 20 名的比例，0 到 1 |
| metrics.bestRank | int | 本次观测中品牌域名出现的最佳排名 |
| metrics.averageVisibleRank | number | 有排名结果时的平均可见排名 |
| metrics.averageRankWithPenalty | number | 未命中时按 maxRank + 1 计入后的平均排名 |
| metrics.competitorGap | number | 品牌最佳排名与竞品最佳排名的平均差值，正数表示品牌更靠前 |
| metrics.sourceCoverage | object | 按搜索来源统计的可见比例 |
| metrics.visibilityScore | number | 综合可见性评分，0 到 100 |
| errorSummary | array | 失败任务摘要，包含失败来源、关键词和错误说明 |
| createdAt | string | 任务创建时间，UTC RFC3339 格式 |
| updatedAt | string | 任务最近更新时间，UTC RFC3339 格式 |
| completedAt | string | 任务完成时间，UTC RFC3339 格式 |

#### 搜索可见性观测结果列表

分页读取观测任务下的关键词级结果。支持按 source/query 过滤，按 checkedAt、source、query 排序；读取结果列表不消耗搜索可见性 credits。

**接口地址:** https://api.gugudata.com/v1/searchVisibilityRuns/{runId}/results

**请求方式:** GET

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| appkey | string | 是 | 付费后获取的 APPKEY |
| runId | string | 是 | 观测任务 ID |
| pageSize | int | 否 | 每页返回数量 |
| pageToken | string | 否 | 分页令牌 |
| filter | string | 否 | 过滤表达式 |
| orderBy | string | 否 | 排序表达式 |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| results | array | 当前页关键词级观测结果列表 |
| results[].name | string | 观测结果资源名，格式为 searchVisibilityResults/{resultId} |
| results[].resultId | string | 观测结果 ID |
| results[].reportId | string | 所属报告 ID |
| results[].runId | string | 所属观测任务 ID |
| results[].query | string | 本条结果对应的关键词 |
| results[].source | string | 本条结果对应的搜索来源 |
| results[].checkedAt | string | 本条结果观测时间，UTC RFC3339 格式 |
| results[].cacheHit | boolean | 是否复用了短期内已有观测结果 |
| results[].metrics | object | 本关键词和来源的可见性指标 |
| results[].metrics.visible | boolean | 品牌域名或品牌别名是否在观测排名范围内出现 |
| results[].metrics.top10 | boolean | 品牌是否进入前 10 名 |
| results[].metrics.top20 | boolean | 品牌是否进入前 20 名 |
| results[].metrics.bestRank | int | 品牌出现的最佳排名，未出现时为 null |
| results[].metrics.averageRankWithPenalty | number | 未命中时按 maxRank + 1 计入的排名值 |
| results[].metrics.bestCompetitorRank | int | 竞品出现的最佳排名，未出现时为 null |
| results[].metrics.competitorGap | number | 品牌最佳排名与竞品最佳排名的差值 |
| results[].metrics.matchedUrlCount | int | 匹配到品牌域名或品牌别名的结果数量 |
| results[].metrics.visibilityScore | number | 本关键词和来源的可见性评分，0 到 100 |
| results[].observedItems | array | 采样搜索结果列表 |
| results[].observedItems[].rank | int | 搜索结果排名 |
| results[].observedItems[].title | string | 搜索结果标题 |
| results[].observedItems[].url | string | 搜索结果 URL |
| results[].observedItems[].domain | string | 搜索结果域名 |
| results[].observedItems[].snippet | string | 搜索结果摘要 |
| results[].brandMatches | array | 匹配到品牌域名或品牌别名的结果列表 |
| results[].brandMatches[].rank | int | 匹配结果排名 |
| results[].brandMatches[].url | string | 匹配结果 URL |
| results[].brandMatches[].domain | string | 匹配结果域名 |
| results[].brandMatches[].registrableDomain | string | 匹配结果主域名 |
| results[].brandMatches[].title | string | 匹配结果标题 |
| results[].competitorMatches | array | 匹配到竞品域名或竞品别名的结果列表 |
| results[].competitorMatches[].rank | int | 竞品匹配结果排名 |
| results[].competitorMatches[].url | string | 竞品匹配结果 URL |
| results[].competitorMatches[].domain | string | 竞品匹配结果域名 |
| results[].competitorMatches[].registrableDomain | string | 竞品匹配结果主域名 |
| results[].competitorMatches[].title | string | 竞品匹配结果标题 |
| results[].competitorMatches[].competitorDomain | string | 竞品配置域名 |
| results[].competitorMatches[].competitorName | string | 竞品配置名称 |
| nextPageToken | string | 下一页分页令牌；为空表示没有下一页 |

#### 获取搜索可见性观测结果

读取指定关键词和搜索来源的观测结果，包含排名列表、品牌匹配、竞品匹配和单项指标；读取结果不消耗搜索可见性 credits。

**接口地址:** https://api.gugudata.com/v1/searchVisibilityResults/{resultId}

**请求方式:** GET

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| appkey | string | 是 | 付费后获取的 APPKEY |
| resultId | string | 是 | 观测结果 ID |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| name | string | 观测结果资源名，格式为 searchVisibilityResults/{resultId} |
| resultId | string | 观测结果 ID |
| reportId | string | 所属报告 ID |
| runId | string | 所属观测任务 ID |
| query | string | 本条结果对应的关键词 |
| source | string | 本条结果对应的搜索来源 |
| checkedAt | string | 本条结果观测时间，UTC RFC3339 格式 |
| cacheHit | boolean | 是否复用了短期内已有观测结果 |
| metrics | object | 本关键词和来源的可见性指标 |
| metrics.visible | boolean | 品牌域名或品牌别名是否在观测排名范围内出现 |
| metrics.top10 | boolean | 品牌是否进入前 10 名 |
| metrics.top20 | boolean | 品牌是否进入前 20 名 |
| metrics.bestRank | int | 品牌出现的最佳排名，未出现时为 null |
| metrics.averageRankWithPenalty | number | 未命中时按 maxRank + 1 计入的排名值 |
| metrics.bestCompetitorRank | int | 竞品出现的最佳排名，未出现时为 null |
| metrics.competitorGap | number | 品牌最佳排名与竞品最佳排名的差值 |
| metrics.matchedUrlCount | int | 匹配到品牌域名或品牌别名的结果数量 |
| metrics.visibilityScore | number | 本关键词和来源的可见性评分，0 到 100 |
| observedItems | array | 采样搜索结果列表 |
| observedItems[].rank | int | 搜索结果排名 |
| observedItems[].title | string | 搜索结果标题 |
| observedItems[].url | string | 搜索结果 URL |
| observedItems[].domain | string | 搜索结果域名 |
| observedItems[].snippet | string | 搜索结果摘要 |
| brandMatches | array | 匹配到品牌域名或品牌别名的结果列表 |
| brandMatches[].rank | int | 匹配结果排名 |
| brandMatches[].url | string | 匹配结果 URL |
| brandMatches[].domain | string | 匹配结果域名 |
| brandMatches[].registrableDomain | string | 匹配结果主域名 |
| brandMatches[].title | string | 匹配结果标题 |
| competitorMatches | array | 匹配到竞品域名或竞品别名的结果列表 |
| competitorMatches[].rank | int | 竞品匹配结果排名 |
| competitorMatches[].url | string | 竞品匹配结果 URL |
| competitorMatches[].domain | string | 竞品匹配结果域名 |
| competitorMatches[].registrableDomain | string | 竞品匹配结果主域名 |
| competitorMatches[].title | string | 竞品匹配结果标题 |
| competitorMatches[].competitorDomain | string | 竞品配置域名 |
| competitorMatches[].competitorName | string | 竞品配置名称 |

### 7.2 可搭配使用

- 可搭配使用：[网页性能与 SEO 评分](https://www.gugudata.com/api/details/pagespeed-score)，适合补充页面质量、SEO 审计和核心性能指标分析。
- 可搭配使用：[网页 URL 链接提取](https://www.gugudata.com/api/details/url2links)，适合补充页面链接结构、内外链和站点结构分析。
- 可搭配使用：[网页可读内容抽取](https://www.gugudata.com/api/details/readability)，适合补充搜索结果落地页内容抽取和内容质量分析。
