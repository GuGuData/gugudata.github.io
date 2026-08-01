---
title: "用八字每日趋势接口构建个性化文化日历"
description: "摘要:每日文化内容需要同时处理个人出生资料、目标日期、北京时间边界、历法基础数据、文化解读和历史版本。本文演示如何使用八字每日趋势解读接口构建一个可缓存、可追踪、支持同步 JSON、异步任务和 SSE 流式响应的个性化文化日历。"
section: "gugudata"
slug: "bazi-daily-calendar-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202607/023_bazi_daily_calendar_agent_flowchart-v2.png"
author: "GuGuData"
---
摘要：每日文化内容需要同时处理个人出生资料、目标日期、北京时间边界、历法基础数据、文化解读和历史版本。本文演示如何使用八字每日趋势解读接口构建一个可缓存、可追踪、支持同步 JSON、异步任务和 SSE 流式响应的个性化文化日历。

关键词：八字每日趋势 API、个性化日历、传统文化 Agent、每日内容 API、SSE 流式输出、文化日历

## 问题背景

“今日内容”看似简单，实际很容易出现日期漂移。服务器时区、用户本地时区、缓存键和任务执行时间只要有一处不一致，就可能把昨天的内容展示为今天，或让同一目标日期生成多个无法复现的版本。

可靠的文化日历应显式传递目标日期，把出生资料与查询日期分开保存。服务端返回的农历、干支、生肖、星座和节气属于基础数据，事业学习、关系沟通、生活节奏和行动提醒属于文化解读，两者需要独立展示和缓存。

## Agent 工作流

![每日文化日历 Agent 流程图](https://assets.devopen.club/uPic/202607/023_bazi_daily_calendar_agent_flowchart-v2.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 生成每日内容 | [八字每日趋势解读](https://www.gugudata.com/api/details/bazi-daily-insight) | POST | 返回目标日期的基础历法信息和每日文化解读 |
| 查询异步任务 | 异步任务状态查询 | GET | 后台预生成次日或批量内容 |

接口地址：

```text
POST https://api.gugudata.com/ai/bazi-daily-insight
```

## 调用示例

```bash
curl -X POST \
  "https://api.gugudata.com/ai/bazi-daily-insight?appkey=REDACTED&responseMode=sync&streaming=false" \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "name": "示例用户",
      "gender": "女",
      "calendarType": "公历",
      "birthDate": "1990-12-01",
      "birthTime": "07:00",
      "birthPlace": "杭州",
      "isLeapMonth": false,
      "language": "zh-CN"
    },
    "targetDate": "2026-07-18"
  }'
```

服务端应显式构造缓存键：

```python
import hashlib
import json

def build_daily_cache_key(profile: dict, target_date: str) -> str:
    """Build a stable cache key for one profile and target date."""
    canonical = {
        "profile": profile,
        "targetDate": target_date,
        "contractVersion": "v1",
    }
    raw = json.dumps(
        canonical,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()
```

缓存键不能只使用用户 ID。用户修改出生时间、历法或语言后，旧内容不应继续命中。

## 日期边界设计

`targetDate` 使用 `YYYY-MM-DD`。未传时，服务端按北京时间当天处理，但生产系统仍建议显式传入日期，便于日志、缓存和测试复现。

| 场景 | 建议 |
| --- | --- |
| 用户主动查询某天 | 显式传入用户选择的 `targetDate` |
| 每日零点更新 | 调度任务按 `Asia/Shanghai` 生成目标日期 |
| 次日内容预生成 | 在任务记录中同时保存创建时间和目标日期 |
| 历史回看 | 读取已有版本，不重新标记为今日结果 |

前端显示的日期、接口请求日期、缓存键和历史记录日期必须一致。

## 结果怎么组织

基础数据区建议展示：

- 出生资料的规范化结果；
- 目标公历日期与农历日期；
- 年、月、日、时干支；
- 生肖、星座和节气；
- 数据生成时间。

文化解读区按每日主题、事业学习、关系沟通、生活节奏和行动提醒组织。页面可以提供收藏、复制和加入个人待办，但不能自动把文化解读变成必须执行的日程。

## 标准架构拆解

| 模块 | 责任 |
| --- | --- |
| 个人资料 | 保存出生资料和语言偏好 |
| 日期服务 | 按北京时间生成明确的目标日期 |
| 每日内容 | 调用接口并分离基础数据与文化解读 |
| 结果缓存 | 以资料、日期、语言和版本构建缓存键 |
| 历史记录 | 保存请求 ID、生成时间和结果版本 |
| 订阅任务 | 提前生成次日内容并处理失败重试 |

不要让前端根据自己的本地时间决定服务端缓存键。日期边界应由统一服务生成，再传给接口和存储层。

## 数据流与接口边界

推荐流程：

1. 用户选择个人资料和目标日期。
2. 服务端校验历法、日期、时间和闰月状态。
3. 日期服务规范化为北京时间目标日期。
4. 根据稳定缓存键查询是否已有结果。
5. 未命中时调用每日趋势接口。
6. 基础数据和文化解读分别写入结果记录。
7. 前端渲染日历组件，并保留文化娱乐参考说明。

接口负责目标日期对应的基础数据与文化内容，产品负责缓存策略、订阅推送、历史记录和用户待办。

## 响应模式选择

前台交互可使用 SSE，让用户逐步看到内容；服务端定时任务更适合 `responseMode=task`。如果应用只需要结构化结果，使用同步 JSON 最简单。

SSE 断线后不应自动把不完整文本写入正式历史记录。异步任务只有进入 `SUCCEEDED` 并取得 `Data.result` 后，才能标记为已生成。

## 错误处理

出生资料错误属于输入问题，目标日期过期或格式错误也应在调用前处理。接口限流或任务失败时，页面可以展示“暂未生成”，但不能回退到其他日期内容且不标记日期。

如果用户修改个人资料，需要使未来缓存和当前结果同时失效。已保存的历史版本可以保留，但应显示当时使用的资料快照。

## 可靠性与观测

| 指标 | 用途 |
| --- | --- |
| `daily_generation_success_rate` | 每日内容生成成功率 |
| `target_date_mismatch_count` | 发现日期串位问题 |
| `cache_hit_rate` | 衡量稳定结果复用情况 |
| `prewarm_completion_rate` | 观察次日预生成任务 |
| `sse_incomplete_result_count` | 避免保存半截内容 |
| `stale_profile_cache_count` | 发现资料变化后仍命中旧缓存 |

## 落地清单

- 生产请求显式传入 `targetDate`。
- 日期、缓存和调度统一使用 `Asia/Shanghai` 边界。
- 个人资料与目标日期分开建模。
- 缓存键包含资料、日期、语言和合同版本。
- 基础数据和文化解读分区保存。
- SSE 不完整结果不进入正式历史记录。
- 订阅内容生成失败时不回填错误日期的旧内容。
- 页面保留文化娱乐参考说明。

## 可扩展方向

文化日历可以与传统历法宜忌接口组合，为页面补充更完整的农历、节气和时辰字段。组合时应以确定性基础数据为主，不重复计算相同字段，也不把两份文化解读混成无法追踪的结果。

## 相关接口

- [八字每日趋势解读](https://www.gugudata.com/api/details/bazi-daily-insight)
- [传统历法宜忌参考](https://www.gugudata.com/api/details/traditional-calendar-guidance)
- [八字关系合参](https://www.gugudata.com/api/details/bazi-relationship-insight)
