---
title: "用网页内容、页面速度、DNS、SSL 和 WHOIS 接口构建 SEO 巡检 Agent"
description: "摘要:SEO 巡检不应该只看标题和关键词。一个更完整的 Agent 可以同时检查页面可读内容、性能评分、DNS、SSL 证书和 WHOIS 信息,把内容问题和站点基础状态一起纳入巡检报告。"
section: "gugudata"
slug: "seo-content-audit-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/009_seo_content_audit_agent.png"
author: "GuGuData"
---
摘要：SEO 巡检不应该只看标题和关键词。一个更完整的 Agent 可以同时检查页面可读内容、性能评分、DNS、SSL 证书和 WHOIS 信息，把内容问题和站点基础状态一起纳入巡检报告。

关键词：SEO 巡检 Agent、网页性能评分 API、DNS 查询 API、SSL 证书 API、WHOIS API

## 问题背景

站点 SEO 问题通常分散在多个层面：页面正文是否可读、标题是否完整、加载性能是否异常、域名解析是否正确、证书是否临近到期。人工巡检容易漏项，单纯内容分析又看不到域名和证书状态。

Agent 可以把这些检查组合成定时任务，输出一份可追踪的 SEO 巡检记录。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/009_seo_content_audit_agent.png)

## 接口编排

| 检查项 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 页面正文 | [网页可读内容抽取](https://www.gugudata.com/api/details/readability) | POST | 判断页面主体内容是否可抽取 |
| 性能和 SEO | [网页性能与 SEO 评分](https://www.gugudata.com/api/details/pagespeed-score) | GET | 获取页面速度和 SEO 相关评分 |
| DNS | [域名 DNS 信息查询](https://www.gugudata.com/api/details/dnslookup) | GET | 检查解析记录 |
| SSL | [域名 SSL 证书信息解析](https://www.gugudata.com/api/details/sslcertinfo) | GET | 检查证书信息和有效期 |
| WHOIS | [域名 Whois 查询](https://www.gugudata.com/api/details/whois) | GET | 获取域名注册相关信息 |

## 调用示例

```bash
curl -G "https://api.gugudata.com/websitetools/pagespeed-score" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "url=https://www.example.com/"
```

```bash
curl -G "https://api.gugudata.com/v2/websitetools/dns-lookup" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "domain=example.com"
```

```bash
curl -G "https://api.gugudata.com/v2/websitetools/sslcertinfo" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "domain=example.com"
```

可以把巡检结果归一成统一结构：

```python
def build_audit_item(name: str, status: str, detail: str) -> dict:
    """Build a normalized SEO audit item."""
    return {
        "name": name,
        "status": status,
        "detail": detail,
    }
```

## 巡检报告结构

| 模块 | 内容 |
| --- | --- |
| 内容检查 | 页面是否可抽取、正文长度、标题完整度 |
| 性能检查 | 页面速度、SEO 评分、可优化项 |
| 域名检查 | DNS 解析、WHOIS 信息、SSL 证书状态 |
| 行动建议 | 需要立刻处理、观察、可排期优化的事项 |

## 错误处理

站点不可访问时，Agent 应先记录访问失败，再停止依赖页面内容的检查。DNS 或 SSL 查询失败时，不要把它解释成 SEO 内容问题，而应归类为站点基础状态异常。定时巡检最好保存上次结果，用变化趋势判断是否需要告警。

## 工程注意点

- 定时任务要控制频率，不要对同一个站点做过高并发巡检。
- 巡检报告要面向业务动作，不要堆砌无关技术细节。
- 对异常项保留原始接口状态，方便排查。
- 对首页、栏目页和重点落地页分别建任务，不要只看一个 URL。

## 标准架构拆解

SEO 巡检 Agent 可以按“页面层、站点层、报告层”设计：

| 层级 | 责任 |
| --- | --- |
| 页面层 | 抽取正文、检查页面性能和 SEO 评分 |
| 站点层 | 检查 DNS、SSL、WHOIS 等域名基础状态 |
| 规则层 | 判断异常级别和处理优先级 |
| 报告层 | 输出巡检摘要、问题列表和行动建议 |
| 趋势层 | 对比历史结果，识别持续恶化的问题 |

页面层和站点层要分开。正文抽取失败不一定代表域名异常，SSL 证书问题也不一定影响页面内容质量。报告层需要把问题归类清楚，才能让运营和研发分别处理。

## 数据流与接口边界

推荐流程：

1. 任务系统按站点和 URL 列表触发巡检。
2. 页面层调用可读内容抽取和页面速度评分。
3. 站点层调用 DNS、SSL 和 WHOIS 查询。
4. 规则层把接口结果归类为健康、观察中、异常。
5. 报告层生成摘要和问题表。
6. 趋势层对比上一轮结果，决定是否告警。

接口边界上，页面速度评分和正文抽取是 URL 级能力，DNS、SSL、WHOIS 是域名级能力。一个站点可以有多个 URL，但域名检查不需要对每个 URL 重复执行。

## 可靠性与观测

建议记录：

| 指标 | 用途 |
| --- | --- |
| page_audit_success_rate | URL 级巡检成功率 |
| domain_audit_success_rate | 域名级巡检成功率 |
| seo_score_delta | SEO 分数变化 |
| certificate_days_left | SSL 剩余有效期 |
| repeated_issue_count | 连续出现的问题数量 |

告警不宜只看单次失败。外部网络波动会导致偶发异常，更可靠的策略是连续多次失败或关键指标明显下降时再通知负责人。

## 落地清单

- URL 级任务和域名级任务分开调度。
- 巡检结果保留上次值和本次值，报告里展示变化。
- SSL 到期、DNS 异常和页面不可读应分不同优先级。
- 每条问题都给出负责人可执行的下一步。
- 对重点页面建立单独监控，不只巡检首页。

## 可扩展方向

可以继续接入 URL 链接提取，自动发现站内重点页面；也可以接入文本摘要，把每次巡检报告压缩成日报，发送给运营或技术团队。

## 相关接口

- [网页可读内容抽取](https://www.gugudata.com/api/details/readability)
- [网页性能与 SEO 评分](https://www.gugudata.com/api/details/pagespeed-score)
- [域名 DNS 信息查询](https://www.gugudata.com/api/details/dnslookup)
- [域名 SSL 证书信息解析](https://www.gugudata.com/api/details/sslcertinfo)
- [域名 Whois 查询](https://www.gugudata.com/api/details/whois)
