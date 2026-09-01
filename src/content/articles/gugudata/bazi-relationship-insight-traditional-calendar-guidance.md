---
title: "双人文化关系应用如何管理两套资料：输入校验、响应模式与使用边界"
description: "双人文化关系应用如何管理两套资料，关键不是完成一次调用，而是让输入口径、处理状态和结果证据可以复核。本文围绕“如何管理双方出生资料、重点方向、同步异步响应和文化娱乐使用边界”给出一套面向真实业务流程的实现方式。"
section: "gugudata"
slug: "bazi-relationship-insight-traditional-calendar-guidance"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:21.000Z"
updatedAt: "2026-09-01T12:37:21.000Z"
author: "GuGuData"
---
双人文化关系应用如何管理两套资料，关键不是完成一次调用，而是让输入口径、处理状态和结果证据可以复核。本文围绕“如何管理双方出生资料、重点方向、同步异步响应和文化娱乐使用边界”给出一套面向真实业务流程的实现方式。

## 问题与结果

双方资料独立校验和版本化，基础历法数据与文化解读分层，输出明确标注娱乐参考属性。

## 适用场景

- 双人关系文化内容产品
- 互动报告和历史记录
- 多语言文化内容展示

## 实现前先确定边界

1. 双方资料必须分别校验，不能用一方默认值补另一方
2. 关注方向必须限制数量并记录版本
3. 同步、异步和 SSE 是交付模式，不改变同一业务结果

## 可验证工作流

![双人文化关系应用如何管理两套资料工作流架构图](https://assets.devopen.club/uPic/202608/bazi-relationship-insight-workflow.png?v=ef2712e3faa6)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 生成关系洞察 | [八字关系合参](https://www.gugudata.com/api/details/bazi-relationship-insight) | POST | 校验双方资料并返回关系主题文化解读 |
| 查询异步任务 | 异步任务状态查询 | GET | 任务模式下查询最终结果 |

接口地址：

```text
POST https://api.gugudata.com/ai/bazi-relationship-insight
```

`appkey` 可通过 Query、`X-GUGUDATA-APPKEY`、Bearer 或 JSON Body 传入。双方资料和 `focusAreas` 使用完整 JSON Body，不要将嵌套对象展开成 Query 参数。

## 最小可运行实现

```bash
curl -X POST \
  "https://api.gugudata.com/ai/bazi-relationship-insight?appkey=YOUR_APPKEY&responseMode=sync&streaming=false" \
  -H "Content-Type: application/json" \
  -d '{
    "personA": {
      "gender": "男",
      "calendarType": "公历",
      "birthDate": "1990-12-01",
      "birthTime": "07:30:00",
      "birthPlace": "浙江杭州",
      "isLeapMonth": false,
      "language": "zh-CN"
    },
    "personB": {
      "gender": "女",
      "calendarType": "农历",
      "birthDate": "1992-05-15",
      "birthTime": "09:20:00",
      "birthPlace": "江苏苏州",
      "isLeapMonth": false,
      "language": "zh-CN"
    },
    "focusAreas": ["沟通方式", "价值观", "长期相处"]
  }'
```

服务端可以先构造明确的双人请求：

```python
def build_relationship_payload(person_a: dict, person_b: dict) -> dict:
    """Build a relationship insight request without mixing profiles."""
    return {
        "personA": dict(person_a),
        "personB": dict(person_b),
        "focusAreas": ["沟通方式", "价值观", "长期相处"],
    }
```

不要在这个函数里交换、合并或推断双方字段。性别、历法、日期、时间、地点和闰月状态都应保持各自来源。

双方 `language` 必须一致；它决定文化解读语言，JSON 字段名保持中文。农历输入必须按实际月份设置 `isLeapMonth`。公历输入设置闰月、不存在的农历闰月、越界日期和非法时间都会返回参数错误，调用方不应自行猜测或降级为公历。若页面还需要展示独立的日期与节气事实，可调用 [传统历法宜忌参考](https://www.gugudata.com/api/details/traditional-calendar-guidance)，但不要把另一接口的结果混入关系洞察原始响应。

## 三种响应模式怎么选择

| 模式 | 参数 | 适用场景 |
| --- | --- | --- |
| 同步 JSON | `responseMode=sync&streaming=false` | 服务端调用、结果较短、需要一次性保存 |
| 异步任务 | `responseMode=task&streaming=false` | 后台生成报告、批量任务、可轮询 |
| SSE 流式 | `responseMode=sync&streaming=true` | 前台逐步展示内容 |

任务模式与流式模式不能同时启用。异步模式返回 `operationId` 后，应使用创建任务的同一 APPKEY 轮询任务接口；SSE 模式只有收到包含完整结果的 `done.result` 才能记为成功。`error` 事件或断流不能沿用上一次结果。

## 结果怎么组织

结果应分为三层：

| 层级 | 内容 |
| --- | --- |
| 基础数据 | 双方出生资料、历法换算、四柱、八字和关注方向 |
| 文化解读 | 关系摘要、互补特点、沟通建议、长期相处建议和注意事项 |
| 使用边界 | 传统文化研究与娱乐参考说明 |

基础数据用于确认输入和双方排盘是否正确，文化解读用于内容展示，两者不能混成一个不可追踪的长文本。产品侧不应额外生成无法解释的匹配分数、确定性婚姻结论或新的排盘事实。

## 失败分类与降级

任何一方缺少 `gender`、`calendarType`、`birthDate` 或 `birthTime`，都应在调用前提示。农历日期需要正确设置 `isLeapMonth`，不能在接口失败后由前端猜测。

用户修改任一方资料后，旧结果必须标记为过期。任务模式失败时保留必要的失败状态，但不要继续显示上一份结果为“当前结果”。建议按 HTTP 和业务码分开处理：`501/400` 用于参数错误，`504/401` 用于 APPKEY 缺失或无效，`901/503` 用于解读或依赖不可用。

## 数据契约与留痕

| 字段 | 作用 |
|---|---|
| `request_id` | 稳定业务标识，用于关联记录和请求追踪 |
| `person_a_version` | 输入、规则或产物版本，变更时保留旧版本 |
| `person_b_version` | 输入、规则或产物版本，变更时保留旧版本 |
| `focus_topics` | 业务数据字段，保存来源、口径和缺失状态 |
| `response_mode` | 业务数据字段，保存来源、口径和缺失状态 |
| `result_version` | 输入、规则或产物版本，变更时保留旧版本 |
| `generated_at` | 带时区的采样或生成时间 |
| `boundary_notice` | 业务数据字段，保存来源、口径和缺失状态 |

重试应新增尝试记录，不覆盖最后一次失败。派生结果必须关联输入版本、生成时间和业务状态。

## 验收清单

- [ ] 两套资料修改后会生成新结果版本
- [ ] 三种响应模式最终结果可对账
- [ ] 页面始终展示文化娱乐参考说明

## 能力边界

文化关系内容不构成婚恋、心理、医疗、法律或重大人生决策建议。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中。
