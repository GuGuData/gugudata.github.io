---
title: "职业测评如何避免模型直接下结论：问卷评分与建议生成分层设计"
description: "职业测评如何避免模型直接下结论，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何将心理测评问卷、结构化评分和职业建议生成分层实现”给出一套可以直接落到任务状态和数据契约上的实现方式。"
section: "gugudata"
slug: "psychology-questionnaires-article-polishing"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:11.000Z"
updatedAt: "2026-09-01T12:37:11.000Z"
author: "GuGuData"
---
职业测评如何避免模型直接下结论，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何将心理测评问卷、结构化评分和职业建议生成分层实现”给出一套可以直接落到任务状态和数据契约上的实现方式。

## 问题与结果

问卷版本、原始作答、评分结果和生成建议分别保存，报告不会把模型表述冒充专业诊断。

最终交付不是一段不可追溯的模型回答，而是一组带来源、版本、状态和失败记录的数据。这样既方便接入后续系统，也能在接口、页面或模型输出变化时定位问题。

## 适用场景

- 职业发展自评工具
- 升学与专业探索
- 咨询前的结构化信息收集

## 实现前先确定边界

1. 问卷版本变化后不能复用旧评分规则
2. 评分结果生成成功后才能进入建议文本阶段
3. 高风险或异常回答应提示人工咨询

## 可验证工作流

![职业测评如何避免模型直接下结论工作流架构图](https://assets.devopen.club/uPic/202608/psychology-questionnaires-workflow.png?v=0c12c6ba6915)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 获取问卷 | [职业与发展心理测评问卷](https://www.gugudata.com/api/details/psychology-questionnaires) | GET | 获取可用问卷、维度和说明 |
| 查询详情 | 职业与发展心理测评问卷 | GET | 获取指定问卷题目和选项 |
| 提交答案 | 职业与发展心理测评问卷 | POST | 提交用户答案并生成评分结果 |
| 查询结果 | 职业与发展心理测评问卷 | GET | 根据测试 ID 获取维度分和解释 |
| 生成报告 | [文章自然润色](https://www.gugudata.com/api/details/article-polishing) | POST | 把测评结果整理成适合阅读的报告 |

## 最小可运行实现

查询可用问卷：

```bash
curl -G "https://api.gugudata.com/v1/psychology/questionnaires" \
  --data-urlencode "appkey=YOUR_APPKEY"
```

查询某份问卷详情：

```bash
curl -G "https://api.gugudata.com/v1/psychology/questionnaires/HOLLAND_SDS" \
  --data-urlencode "appkey=YOUR_APPKEY"
```

提交答案时，建议在服务端完成题号校验：

```bash
curl -X POST "https://api.gugudata.com/v1/psychology/tests?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{
    "questionnaireCode": "HOLLAND_SDS",
    "userId": "demo-user-001",
    "answers": {
      "1": "A",
      "2": "B",
      "3": "A"
    }
  }'
```

Agent 可以先检查答案完整性：

```python
def validate_answers(questionnaire: dict, answers: dict) -> list[str]:
    """Return missing question numbers before submitting answers."""
    question_numbers = {str(item["QuestionNo"]) for item in questionnaire["Data"]["Questions"]}
    answered_numbers = {str(key) for key in answers.keys()}
    return sorted(question_numbers - answered_numbers, key=int)
```

## 报告怎么生成

测评结果不建议直接展示成一堆分数。更好的结构是：

| 区块 | 内容 |
| --- | --- |
| 测评概览 | 问卷名称、测评时间、答题完整性 |
| 维度结果 | 每个维度的得分、等级和解释 |
| 职业倾向 | 与用户目标相关的兴趣方向和发展建议 |
| 行动计划 | 课程、实习、作品集、咨询或复测建议 |
| 注意事项 | 测评不是诊断结果，必要时需要专业人员解释 |

Agent 的价值在于把结构化分数变成可执行建议，而不是把测评结果神秘化。对于学生、家长或职业咨询师，报告需要能回到维度依据，而不是只给一句“你适合某职业”。

## 失败分类与降级

如果答案缺题，Agent 应指出缺失题号并引导用户补齐，不要直接提交。如果用户反复中断答题，应保存草稿状态而不是生成半成品报告。若查询结果失败，应保留测试 ID，并允许稍后重试。

心理测评涉及个人信息，系统应该尽量减少留存字段。用户 ID 可以使用业务侧匿名标识，报告分享链接应有有效期或访问控制。

## 数据契约与留痕

建议至少保存以下字段；真实项目可以继续拆分，但不要删除来源、版本和状态信息。

| 字段 | 作用 |
|---|---|
| `assessment_id` | 稳定业务标识，用于关联记录并避免名称冲突 |
| `questionnaire_version` | 规则、输入或产物版本，变更时保留旧版本 |
| `answers` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `score_profile` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `report_version` | 规则、输入或产物版本，变更时保留旧版本 |
| `review_flag` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `consent_state` | 显式状态或结果，禁止用空值代替失败 |

所有派生结果都应带生成时间和输入版本。发生重试时新增尝试记录，不要覆盖最后一次失败，以免排查时只剩“最终成功”而看不到中间问题。

## 验收清单

- [ ] 原始作答与评分可追溯
- [ ] 报告明确非医疗诊断
- [ ] 用户可区分量表结果与生成建议

## 能力边界

该流程用于信息整理和自我探索，不构成心理诊断、治疗建议或就业保证。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中，不应进入前端、文章、日志或版本库。
