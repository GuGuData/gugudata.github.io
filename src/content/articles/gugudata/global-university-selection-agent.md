---
title: "用全球大学基础信息和 QS 排名接口构建留学择校 Agent"
description: "摘要:留学择校类产品不能只让模型根据记忆推荐学校。本文演示如何把全球大学基础信息、QS 世界大学排名和高校评分接口组合起来,构建一个面向留学咨询、院校库检索和申请短名单生成的 Agent 工作流。"
section: "gugudata"
slug: "global-university-selection-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/011_global_university_selection_agent.png"
author: "GuGuData"
---
摘要：留学择校类产品不能只让模型根据记忆推荐学校。本文演示如何把全球大学基础信息、QS 世界大学排名和高校评分接口组合起来，构建一个面向留学咨询、院校库检索和申请短名单生成的 Agent 工作流。

关键词：留学择校 Agent、全球大学 API、QS 世界大学排名 API、高校评分 API、国际院校数据

## 问题背景

用户在咨询留学时，通常不会只问“推荐几所学校”。真实需求往往包含国家、地区、城市、专业方向、预算、排名偏好、就业关注点、申请难度和语言环境。大模型可以把这些信息整理成自然语言建议，但如果缺少结构化院校数据，回答很容易停留在泛泛推荐。

更稳妥的做法是让 Agent 先把用户偏好转换成检索条件，再查询全球大学基础信息和 QS 排名，形成候选学校列表。模型只负责解释、对比和补充注意事项，不直接凭空判断学校是否适合。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/011_global_university_selection_agent.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 查询学校库 | [全球大学基础信息数据](https://www.gugudata.com/api/details/global-university) | GET | 按国家、地区、城市、学校名筛选候选院校 |
| 补充排名 | [全球 QS 世界大学排名数据](https://www.gugudata.com/api/details/global-university-ranking) | GET | 获取综合排名、声誉、师生比、就业成果等维度 |
| 生成评分 | [高校评分实时分析与推荐](https://www.gugudata.com/api/details/college-score) | POST | 对目标院校生成更容易理解的综合分析 |
| 语言处理 | [多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation) | POST | 对英文学校信息生成中文说明，或输出英文版报告 |

## 调用示例

先按地区查询全球大学基础信息：

```bash
curl -G "https://api.gugudata.com/college/global-university" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "country=United Kingdom" \
  --data-urlencode "city=London" \
  --data-urlencode "pageindex=1" \
  --data-urlencode "pagesize=10"
```

再按学校名称补充 QS 排名信息：

```bash
curl -G "https://api.gugudata.com/metadata/global-university-ranking" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "name=University College London" \
  --data-urlencode "pageIndex=1" \
  --data-urlencode "pageSize=10"
```

如果用户已经锁定某所学校，可以生成学校评分说明：

```bash
curl -X POST "https://api.gugudata.com/ai/college-score?appkey=REDACTED&streaming=false" \
  -H "Content-Type: application/json" \
  -d '{
    "universityName": "University College London",
    "streaming": false
  }'
```

Agent 侧可以把输入规范化成一组可查询条件：

```python
import requests

APPKEY = "YOUR_APPKEY"

def search_global_universities(profile: dict) -> dict:
    """Search global universities by user preference."""
    params = {
        "appkey": APPKEY,
        "country": profile.get("country"),
        "region": profile.get("region"),
        "city": profile.get("city"),
        "name": profile.get("keyword"),
        "sort": profile.get("sort", "rank"),
        "pageindex": 1,
        "pagesize": 10,
    }
    response = requests.get(
        "https://api.gugudata.com/college/global-university",
        params={k: v for k, v in params.items() if v},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()
```

## 候选学校怎么组织

择校 Agent 的输出建议分成四层，而不是直接给出一段长文字：

| 层级 | 内容 |
| --- | --- |
| 基础匹配 | 学校名称、国家、城市、地区、Logo 或官网线索 |
| 排名参考 | 综合排名、学术声誉、雇主声誉、就业成果、国际化指标 |
| 偏好解释 | 为什么符合用户的国家、城市、专业和职业目标 |
| 风险提醒 | 申请难度、信息时效、语言要求、是否需要顾问复核 |

这样做的好处是，列表页可以展示结构化字段，详情页可以展示解释性文本，咨询报告可以把两者组合起来。用户看到的不是“模型推荐”，而是“数据筛选 + 排名参考 + 可解释建议”。

## 标准架构拆解

一个可维护的留学择校系统可以拆成以下模块：

| 模块 | 责任 |
| --- | --- |
| 用户画像 | 收集国家、城市、专业方向、预算、排名偏好和申请阶段 |
| 院校检索 | 调用全球大学基础信息接口生成候选池 |
| 排名补全 | 调用 QS 排名接口补充多维指标 |
| 评分解释 | 对候选学校生成综合说明，避免只看排名 |
| 报告生成 | 输出学校短名单、对比表和下一步准备清单 |

模型不应该替代院校库检索。它更适合把结构化数据转成用户能理解的择校理由，并在信息不足时主动追问，例如“是否接受非英语国家”“是否优先考虑就业城市”“是否有预算上限”。

## 数据流与接口边界

推荐的数据流如下：

1. 用户提交留学目标和约束条件。
2. Agent 把自由文本拆成国家、城市、专业方向、排名偏好等字段。
3. 调用全球大学基础信息接口筛选候选学校。
4. 调用 QS 排名接口补充排名和维度得分。
5. 对候选学校做规则过滤，例如地区、排名区间、城市偏好。
6. 调用高校评分接口生成解释性说明。
7. 输出短名单，并保留查询参数和数据年份。

接口边界上，全球大学基础信息是事实库，QS 排名是参考指标，高校评分是解释性输出。页面上应把三类信息分开展示，避免把评分文字当成录取保证或申请结果预测。

## 错误处理

如果用户只输入“想去欧洲读商科”，Agent 不应该直接生成院校名单，而应追问预算、国家偏好、学位阶段和排名范围。若某个学校没有 QS 排名数据，可以保留在候选池中，但要在结果里标记“排名信息未匹配”，不要用空值参与排序。

对于多语言学校名称，建议同时保存英文名、中文名和用户原始输入。查询失败时可以尝试英文名、简称、城市等二级条件，但不要在结果里伪造学校名称或排名。

## 可靠性与观测

择校系统需要关注结果质量，而不只是接口是否成功：

| 指标 | 用途 |
| --- | --- |
| profile_complete_rate | 判断用户画像是否足够完整 |
| candidate_count | 判断筛选条件是否过宽或过窄 |
| ranking_match_rate | 判断候选学校能否匹配到排名数据 |
| explanation_latency_ms | 观察评分说明生成耗时 |
| shortlist_revision_count | 判断用户是否频繁调整条件 |

当候选学校数量过少时，Agent 应提示用户放宽城市、排名或专业条件。当候选学校过多时，应引导用户增加预算、就业目标、学位阶段等过滤条件。

## 落地清单

- 输入侧使用表单加自由文本，避免只依赖自然语言解析。
- 候选池保留筛选条件，方便用户回看每次方案。
- 排名和评分要标记数据来源，不混成单一结论。
- 对用户展示“建议”和“事实数据”的边界。
- 报告输出支持中英文版本，方便留学顾问和学生共同使用。

## 可扩展方向

这个 Agent 可以继续接入国家地区基础信息接口，用来补充国家和地区维度；也可以把用户收藏、咨询记录和后续申请状态接入 CRM，形成从“择校短名单”到“申请进度管理”的闭环。

## 相关接口

- [全球大学基础信息数据](https://www.gugudata.com/api/details/global-university)
- [全球 QS 世界大学排名数据](https://www.gugudata.com/api/details/global-university-ranking)
- [高校评分实时分析与推荐](https://www.gugudata.com/api/details/college-score)
- [多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)
