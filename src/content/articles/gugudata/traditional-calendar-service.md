---
title: "用传统历法宜忌接口构建节气日历服务"
description: "摘要:传统历法页面不仅要显示农历日期,还要正确处理公历日期、具体时间、北京时间时区、四柱干支、生肖星座、节气、宜忌和历史缓存。本文演示如何使用传统历法宜忌参考接口构建确定性基础数据与文化参考分层的节气日历服务。"
section: "gugudata"
slug: "traditional-calendar-service"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202607/025_traditional_calendar_service_flowchart-v2.png"
author: "GuGuData"
---
摘要：传统历法页面不仅要显示农历日期，还要正确处理公历日期、具体时间、北京时间时区、四柱干支、生肖星座、节气、宜忌和历史缓存。本文演示如何使用传统历法宜忌参考接口构建确定性基础数据与文化参考分层的节气日历服务。

关键词：传统历法 API、农历 API、二十四节气 API、宜忌接口、日历组件、传统文化数据服务

## 问题背景

日历产品容易把多个来源的数据直接拼在页面上，导致公历日期、农历日期、节气和时辰并不属于同一查询时刻。用户切换时间后，如果只刷新时辰而没有刷新相关干支字段，页面就会出现内部矛盾。

可靠的服务应以明确的 `date`、`time` 和 `timezone` 作为唯一输入，先生成确定性的历法基础数据，再生成文化参考内容。基础数据可以稳定缓存，文化解读需要保留版本和使用边界。

## Agent 工作流

![传统历法服务流程图](https://assets.devopen.club/uPic/202607/025_traditional_calendar_service_flowchart-v2.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 查询历法与参考 | [传统历法宜忌参考](https://www.gugudata.com/api/details/traditional-calendar-guidance) | POST | 返回农历、干支、生肖、星座、节气、宜忌和文化参考 |
| 查询异步任务 | 异步任务状态查询 | GET | 月历预生成或后台批量任务 |

接口地址：

```text
POST https://api.gugudata.com/ai/traditional-calendar-guidance
```

当前 `timezone` 固定支持 `Asia/Shanghai`。`date` 必填，`time` 可选；未传时间时按 12:00 计算。

## 调用示例

```bash
curl -X POST \
  "https://api.gugudata.com/ai/traditional-calendar-guidance?appkey=REDACTED&responseMode=sync&streaming=false" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-07-18",
    "time": "12:00",
    "timezone": "Asia/Shanghai",
    "language": "zh-CN"
  }'
```

应用侧应显式保存最终查询条件：

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class CalendarQuery:
    date: str
    time: str = "12:00"
    timezone: str = "Asia/Shanghai"
    language: str = "zh-CN"

def build_calendar_payload(query: CalendarQuery) -> dict:
    """Build an explicit traditional calendar request."""
    return {
        "date": query.date,
        "time": query.time,
        "timezone": query.timezone,
        "language": query.language,
    }
```

即使用户没有填写时间，也建议应用侧把默认值 12:00 写入请求和记录，避免之后无法解释时柱为何如此。

## 基础数据与文化参考分层

基础数据包括：

- 农历年月日和中文日期；
- 年、月、日、时干支；
- 生肖和星座；
- 当前节气、下一节气及日期；
- 宜、忌和其他传统历法字段。

文化参考用于组织日程说明。页面应明确它属于传统文化研究与娱乐参考，不应触发自动审批、排期、交易、医疗或其他现实决策。

## 缓存与版本设计

基础缓存键至少包含：

```text
date + time + timezone + language + contractVersion
```

如果月历页面只需要每天中午对应的日级数据，可以固定 `time=12:00` 批量预生成。如果页面允许用户查看不同时辰，就必须把时间加入缓存键。

同一输入应稳定复用，但历史版本不能被新合同版本静默覆盖。建议保留 `generatedAt`、请求 ID、接口版本和内容版本。

## 月历预生成

生成整月内容时，不建议前端同时发起几十个同步请求。可以由后台：

1. 为目标月份创建每日任务。
2. 固定时区和默认时刻。
3. 使用异步任务模式或有界并发。
4. 保存每一天的独立状态。
5. 只重试失败日期。
6. 月历读取已完成结果并显示缺失状态。

某一天失败不能让整月任务只返回一个模糊的失败结果。

## 标准架构拆解

| 模块 | 责任 |
| --- | --- |
| 查询入口 | 接收日期、时间、语言和页面来源 |
| 参数校验 | 校验日期、24 小时制时间和固定时区 |
| 历法服务 | 调用接口并分离基础数据与文化参考 |
| 缓存层 | 按完整查询条件和版本复用结果 |
| 月历任务 | 有界并发预生成每日内容 |
| 组件适配 | 为日历、节气页和历史查询提供结构化结果 |
| 内容边界 | 展示文化娱乐参考说明 |

## 数据流与接口边界

推荐流程：

1. 用户选择日期和可选时间。
2. 服务端补齐默认时间并固定 `Asia/Shanghai`。
3. 校验请求格式并构建完整缓存键。
4. 缓存未命中时调用传统历法接口。
5. 基础数据和文化参考分别保存。
6. 日历组件读取结构化字段。
7. 历史查询读取当时版本，不重新标记为当前结果。

接口负责历法基础字段与文化参考，应用负责缓存、版本、展示层级和现实使用边界。

## 错误处理

日期必须使用 `YYYY-MM-DD`，时间使用 `HH:mm` 或 `HH:mm:ss`。传入其他时区时，当前应直接提示不支持，而不是悄悄改成北京时间。

用户切换时间后，与时柱和时辰相关的旧结果必须失效。批量月历任务发生部分失败时，页面显示缺失日期，并允许后台重试，不能复制相邻日期内容填补。

## 可靠性与观测

| 指标 | 用途 |
| --- | --- |
| `calendar_query_success_rate` | 历法查询成功率 |
| `invalid_datetime_count` | 发现日期时间输入问题 |
| `cache_hit_rate` | 衡量稳定结果复用 |
| `month_prewarm_completion_rate` | 整月预生成完成率 |
| `partial_month_failure_count` | 发现部分日期失败 |
| `query_result_mismatch_count` | 检测页面条件与结果串位 |

## 落地清单

- 明确记录 `date`、`time` 和 `timezone`。
- 未传时间时显式使用并展示 12:00。
- 当前仅允许 `Asia/Shanghai`。
- 基础数据与文化参考分层保存。
- 切换日期或时间后完整刷新依赖字段。
- 月历预生成使用有界并发和逐日状态。
- 历史结果保留请求条件与版本。
- 页面不根据文化参考自动执行现实事项。

## 可扩展方向

传统历法服务可以与天气、空气质量、日出日落和二十四节气内容组合成城市日历组件。组合数据时，应把城市、日期、时区和更新时间作为共同上下文，并明确各数据源的更新时间。

## 相关接口

- [传统历法宜忌参考](https://www.gugudata.com/api/details/traditional-calendar-guidance)
- [全国天气预报信息](https://www.gugudata.com/api/details/weatherinfo)
- [全国城市实时空气质量指数](https://www.gugudata.com/api/details/airquality)
- [日出与日落时间](https://www.gugudata.com/api/details/sunrisesunset)
