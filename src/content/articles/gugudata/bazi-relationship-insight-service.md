---
title: "用八字关系合参接口构建双人关系洞察应用"
description: "摘要:双人关系类文化产品需要同时管理两套出生资料、历法校验、重点方向、多语言结果和使用边界。本文演示如何使用八字关系合参接口构建可追踪的关系洞察应用,并正确区分基础数据、文化解读、同步 JSON、异步任务和 SSE 流式响应。"
section: "gugudata"
slug: "bazi-relationship-insight-service"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202607/022_bazi_relationship_insight_service_flowchart-v2.png"
author: "GuGuData"
---
摘要：双人关系类文化产品需要同时管理两套出生资料、历法校验、重点方向、多语言结果和使用边界。本文演示如何使用八字关系合参接口构建可追踪的关系洞察应用，并正确区分基础数据、文化解读、同步 JSON、异步任务和 SSE 流式响应。

关键词：八字关系合参 API、双人关系洞察、传统文化 API、SSE 流式接口、异步任务、文化娱乐应用

## 问题背景

关系主题产品如果只把两段资料拼进一个提示词，容易出现双方字段串位、农历与公历混淆、输出结构漂移和历史记录无法复现等问题。

更可靠的设计是把双方资料建模成两个独立对象，在服务端完成字段校验和规范化，再由接口分别返回基础数据与文化解读。页面可以围绕沟通、家庭、价值观和长期相处组织内容，但不能把文化解读表达成现实关系结论或专业建议。

## Agent 工作流

![双人关系洞察服务流程图](https://assets.devopen.club/uPic/202607/022_bazi_relationship_insight_service_flowchart-v2.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 生成关系洞察 | [八字关系合参](https://www.gugudata.com/api/details/bazi-relationship-insight) | POST | 校验双方资料并返回关系主题文化解读 |
| 查询异步任务 | 异步任务状态查询 | GET | 任务模式下查询最终结果 |

接口地址：

```text
POST https://api.gugudata.com/ai/bazi-relationship-insight
```

`appkey`、`responseMode` 和 `streaming` 通过查询参数传入，双方资料和 `focusAreas` 使用 JSON Body。

## 调用示例

```bash
curl -X POST \
  "https://api.gugudata.com/ai/bazi-relationship-insight?appkey=REDACTED&responseMode=sync&streaming=false" \
  -H "Content-Type: application/json" \
  -d '{
    "personA": {
      "name": "甲方",
      "gender": "男",
      "calendarType": "公历",
      "birthDate": "1990-12-01",
      "birthTime": "07:00",
      "birthPlace": "杭州",
      "isLeapMonth": false,
      "language": "zh-CN"
    },
    "personB": {
      "name": "乙方",
      "gender": "女",
      "calendarType": "公历",
      "birthDate": "1992-06-15",
      "birthTime": "09:30",
      "birthPlace": "上海",
      "isLeapMonth": false,
      "language": "zh-CN"
    },
    "focusAreas": ["沟通", "家庭", "价值观", "长期相处"]
  }'
```

服务端可以先构造明确的双人请求：

```python
def build_relationship_payload(person_a: dict, person_b: dict) -> dict:
    """Build a relationship insight request without mixing profiles."""
    return {
        "personA": dict(person_a),
        "personB": dict(person_b),
        "focusAreas": ["沟通", "家庭", "价值观", "长期相处"],
    }
```

不要在这个函数里交换、合并或推断双方字段。性别、历法、日期、时间、地点和闰月状态都应保持各自来源。

## 三种响应模式怎么选择

| 模式 | 参数 | 适用场景 |
| --- | --- | --- |
| 同步 JSON | `responseMode=sync&streaming=false` | 服务端调用、结果较短、需要一次性保存 |
| 异步任务 | `responseMode=task&streaming=false` | 后台生成报告、批量任务、可轮询 |
| SSE 流式 | `responseMode=sync&streaming=true` | 前台逐步展示内容 |

任务模式与流式模式不能同时启用。异步模式返回 `operationId` 后，应轮询任务接口；SSE 模式需要处理 `end` 和 `error` 事件，不能仅依赖连接关闭判断完成。

## 结果怎么组织

结果应分为三层：

| 层级 | 内容 |
| --- | --- |
| 基础数据 | 双方规范化出生资料和历法字段 |
| 文化解读 | 关系摘要、互补特点、沟通节奏和相处建议 |
| 使用边界 | 传统文化研究与娱乐参考说明 |

基础数据用于确认输入是否正确，文化解读用于内容展示，两者不能混成一个不可追踪的长文本。产品侧如果增加图表或评分，必须明确它是页面组织方式，不得伪装成接口返回的客观测量。

## 标准架构拆解

| 模块 | 责任 |
| --- | --- |
| 双人资料 | 分别保存 A、B 两套原始输入 |
| 输入校验 | 校验性别、历法、日期、时间和闰月 |
| 请求编排 | 选择重点方向、语言和响应模式 |
| 结果适配 | 分离基础数据、文化解读和免责声明 |
| 内容复核 | 检查敏感表达、确定性承诺和使用边界 |
| 历史记录 | 保存输入快照、请求 ID、版本和生成时间 |

双方出生资料具有个人信息属性。日志中不应记录完整原文，历史记录应按业务权限控制，并提供删除或过期策略。

## 数据流与接口边界

推荐流程：

1. 前端分别收集双方资料，并明确公历或农历。
2. 服务端完成格式校验和访问权限检查。
3. Agent 根据用户选择生成 `focusAreas`，最多六项。
4. 调用关系合参接口。
5. 页面先展示规范化基础数据，供用户确认。
6. 文化解读进入内容适配与审核。
7. 保存输入快照、输出版本和免责声明。

接口负责规范化和文化解读，应用负责账号权限、内容展示、历史记录和现实使用边界。不要让模型输出触发自动化的婚姻、医疗、财务或法律决策。

## 错误处理

任何一方缺少 `gender`、`calendarType`、`birthDate` 或 `birthTime`，都应在调用前提示。农历日期需要正确设置 `isLeapMonth`，不能在接口失败后由前端猜测。

用户修改任一方资料后，旧结果必须标记为过期。任务模式失败时保留双方输入快照和失败状态，但不要继续显示上一份结果为“当前结果”。

## 可靠性与观测

| 指标 | 用途 |
| --- | --- |
| `profile_validation_failure_rate` | 判断资料录入质量 |
| `relationship_request_success_rate` | 观察接口成功率 |
| `operation_completion_rate` | 观察异步任务完成情况 |
| `sse_disconnect_rate` | 判断流式体验稳定性 |
| `stale_result_display_count` | 发现输入变化后仍展示旧结果的问题 |
| `content_review_reject_rate` | 衡量使用边界和文案质量 |

## 落地清单

- 双方资料使用两个独立对象，不拼接为自由文本。
- `focusAreas` 最多六项，并记录用户选择。
- 修改任一输入后立即使旧结果失效。
- 任务模式与 SSE 流式模式严格互斥。
- 基础数据和文化解读分区展示。
- 不记录不必要的完整出生资料日志。
- 页面与导出报告均保留文化娱乐参考说明。

## 可扩展方向

应用可以增加多语言结果、历史版本对比和内容收藏，也可以把关系洞察与每日文化日历组合。但组合时仍需保留每次请求的独立输入与结果，避免把不同时间或不同双方资料混成单一结论。

## 相关接口

- [八字关系合参](https://www.gugudata.com/api/details/bazi-relationship-insight)
- [八字每日趋势解读](https://www.gugudata.com/api/details/bazi-daily-insight)
- [传统历法宜忌参考](https://www.gugudata.com/api/details/traditional-calendar-guidance)
