---
title: "用高校数据、录取线和预测接口构建高考咨询 Agent"
description: "摘要:高考咨询类产品不能只让模型凭常识回答。本文演示如何把高校基础信息、历年录取线、专业录取线和录取概率预测接口组合起来,构建一个更可解释的高考咨询 Agent。"
section: "gugudata"
slug: "gaokao-ai-advisor-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202606/v2-b545cf9e07800547093cc2bd1fc2e86e_1440w.jpg"
author: "GuGuData"
---
摘要：高考咨询类产品不能只让模型凭常识回答。本文演示如何把高校基础信息、历年录取线、专业录取线和录取概率预测接口组合起来，构建一个更可解释的高考咨询 Agent。

关键词：高考志愿 Agent、高校录取概率预测 API、高校录取分数线 API、专业录取线 API、教育数据接口

## 问题背景

高考咨询的核心不是生成一段流畅建议，而是把考生省份、科类、分数、位次、目标地区、专业偏好和历史录取数据结合起来。只依赖大模型容易出现过时信息或泛泛建议。

Agent 更适合做一个问答流程：先补齐考生信息，再查历史数据，最后调用预测接口生成候选院校，并把依据展示出来。

## Agent 工作流

![img](https://assets.devopen.club/uPic/202606/v2-b545cf9e07800547093cc2bd1fc2e86e_1440w.jpg)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 查询院校 | [全国大学高校基础信息](https://www.gugudata.com/api/details/college) | GET | 获取院校所在地、层次、基础信息 |
| 查询院校线 | [历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline) | GET | 参考历史院校录取情况 |
| 查询专业线 | [历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline) | GET | 参考目标专业历史录取情况 |
| 生成预测 | [基于模型的高校录取概率预测](https://www.gugudata.com/api/details/admission-predict) | POST | 返回候选院校和录取概率 |

## 调用示例

```bash
curl -X POST "https://api.gugudata.com/ai/admission/predict?appkey=REDACTED \
  -H "Content-Type: application/json" \
  -d '{
    "province": "江苏",
    "subject_type": "物理类",
    "score": 610,
    "rank": 28000,
    "batch": "普通本科批次",
    "top_n": 50,
    "include_explanation": false,
    "prefer_local": false,
    "year": 2025,
    "major_name": "计算机科学与技术"
  }'
```

Agent 可以先做参数补全，再调用预测：

```python
def build_admission_payload(profile: dict) -> dict:
    """Build a normalized admission prediction payload."""
    return {
        "province": profile["province"],
        "subject_type": profile["subject_type"],
        "score": profile["score"],
        "rank": profile.get("rank"),
        "batch": profile.get("batch", "普通本科批次"),
        "top_n": profile.get("top_n", 50),
        "include_explanation": False,
        "prefer_local": profile.get("prefer_local", False),
        "year": profile.get("year", 2025),
        "major_name": profile.get("major_name"),
    }
```

## 咨询输出怎么组织

建议把结果拆成三层：

| 层级 | 内容 |
| --- | --- |
| 候选结果 | 院校名称、地区、专业方向、预测概率 |
| 解释依据 | 分数、位次、历史录取线、目标专业线 |
| 决策提醒 | 批次规则、院校偏好、是否需要人工复核 |

这样文章、产品页面或客服回复都不会显得像单纯广告，而是一个可落地的技术方案。

## 错误处理

如果用户没有提供省份、科类或分数，Agent 应先追问，不要直接调用预测接口。如果目标专业样本不足，应该提示结果可能退回院校层面参考。对于跨年份数据，要明确预测年份，避免把不同年份规则混在一起。

## 工程注意点

- 高考咨询建议需要保守表述，避免把预测结果写成确定录取。
- 保存用户输入时要遵守隐私边界，只保存业务必要字段。
- 对同一考生可以缓存候选结果，但应记录预测年份和参数。
- 面向用户展示时，重点展示业务依据，不展示内部实现细节。

## 标准架构拆解

高考咨询 Agent 更适合做成“数据查询 + 规则过滤 + 预测解释”的组合系统：

| 模块 | 责任 |
| --- | --- |
| 用户画像 | 收集省份、科类、分数、位次、批次和偏好 |
| 数据查询 | 查询高校、院校线、专业线等基础数据 |
| 预测服务 | 调用录取概率预测接口生成候选结果 |
| 结果编排 | 按冲、稳、保和用户偏好组织列表 |
| 咨询输出 | 生成可读解释和下一步建议 |

在这个系统里，模型不应该替代数据查询。模型更适合把结构化数据转成用户能理解的说明，而不是凭空判断院校是否适合。

## 数据流与接口边界

推荐流程如下：

1. 校验用户输入，缺失省份、科类或分数时先补齐。
2. 查询目标院校和专业基础数据，过滤不符合偏好的选项。
3. 查询历年录取线，作为解释依据。
4. 调用录取概率预测接口生成候选列表。
5. 将预测结果分层展示，并标记数据年份和查询参数。
6. 用户调整偏好后重新计算，不覆盖旧结果。

接口边界上，历史录取线是事实数据，预测结果是模型输出。页面和文章里都应清楚区分“历史参考”和“概率预测”，避免把二者混成确定性结论。

## 可靠性与观测

教育咨询类产品需要关注结果质量，而不只是接口成功率：

| 指标 | 用途 |
| --- | --- |
| required_profile_complete_rate | 用户画像完整率 |
| prediction_success_rate | 预测接口成功率 |
| no_result_rate | 无候选结果比例 |
| user_filter_usage | 用户偏好过滤使用情况 |
| result_refresh_count | 用户反复调整方案的次数 |

当无结果比例升高时，要检查是否是批次、年份、专业名或地区筛选过严。Agent 应优先提示用户放宽条件，而不是返回一段泛泛建议。

## 落地清单

- 输入字段用表单结构化收集，不要只让用户自由描述。
- 结果列表展示预测概率、院校信息和历史线索。
- 对每次预测保存参数快照，方便用户回看方案。
- 对教育场景使用谨慎文案，避免承诺式表达。
- 允许人工顾问复核和补充建议。

## 可扩展方向

这个 Agent 可以继续接入高校评分接口，用来补充院校综合评价；也可以根据用户偏好加入地域、学费、专业方向等筛选条件，形成更完整的志愿辅助流程。

## 相关接口

- [全国大学高校基础信息](https://www.gugudata.com/api/details/college)
- [历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)
- [历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)
- [基于模型的高校录取概率预测](https://www.gugudata.com/api/details/admission-predict)
- [高校评分实时分析与推荐](https://www.gugudata.com/api/details/college-score)
