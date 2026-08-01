---
title: "用心理测评问卷接口构建职业发展评估 Agent"
description: "摘要:职业规划和升学咨询并不适合让模型直接给结论。本文演示如何把心理测评问卷、答题提交、结果查询和文本生成组合成一个职业发展评估 Agent,让系统先完成结构化测评,再生成可解释的建议报告。"
section: "gugudata"
slug: "psychology-career-assessment-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/012_psychology_career_assessment_agent.png"
author: "GuGuData"
---
摘要：职业规划和升学咨询并不适合让模型直接给结论。本文演示如何把心理测评问卷、答题提交、结果查询和文本生成组合成一个职业发展评估 Agent，让系统先完成结构化测评，再生成可解释的建议报告。

关键词：职业测评 Agent、心理测评 API、职业发展测评、问卷评分接口、教育咨询 Agent

## 问题背景

很多职业规划产品会让用户输入一段自我描述，然后让模型直接分析性格、兴趣和职业方向。这种方式交互简单，但结果不稳定，也很难解释依据。对教育咨询、大学生职业发展和高考心理辅助这类场景，更合适的做法是先完成标准化问卷，再把结果交给 Agent 生成建议。

职业与发展心理测评问卷接口提供问卷列表、问卷详情、答题提交、结果查询和历史记录能力。Agent 可以负责选择问卷、引导答题、检查缺题、解释结果，并把测评结果转换成用户能理解的行动建议。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/012_psychology_career_assessment_agent.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 获取问卷 | [职业与发展心理测评问卷](https://www.gugudata.com/api/details/psychology-questionnaires) | GET | 获取可用问卷、维度和说明 |
| 查询详情 | [职业与发展心理测评问卷](https://www.gugudata.com/api/details/psychology-questionnaires) | GET | 获取指定问卷题目和选项 |
| 提交答案 | [职业与发展心理测评问卷](https://www.gugudata.com/api/details/psychology-questionnaires) | POST | 提交用户答案并生成评分结果 |
| 查询结果 | [职业与发展心理测评问卷](https://www.gugudata.com/api/details/psychology-questionnaires) | GET | 根据测试 ID 获取维度分和解释 |
| 生成报告 | [文章自然润色](https://www.gugudata.com/api/details/article-polishing) | POST | 把测评结果整理成适合阅读的报告 |

## 调用示例

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
curl -X POST "https://api.gugudata.com/v1/psychology/tests?appkey=REDACTED \
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

## 标准架构拆解

职业发展评估系统可以拆成五个模块：

| 模块 | 责任 |
| --- | --- |
| 测评选择 | 根据用户年龄、阶段和目标推荐合适问卷 |
| 答题引导 | 分页展示题目，保存进度，检查缺题 |
| 评分查询 | 提交答案并读取维度分、总分和解释 |
| 报告生成 | 把测评数据转换成用户可读建议 |
| 隐私控制 | 控制用户 ID、历史记录和报告访问权限 |

测评选择可以由规则驱动。比如高考心理场景优先使用高考相关问卷，大学毕业过渡场景优先使用职业发展问卷。模型只参与解释和表达，不应该修改原始分数或维度定义。

## 数据流与接口边界

推荐流程如下：

1. 用户选择测评目标，例如职业探索、升学规划或毕业过渡。
2. Agent 查询问卷列表，筛选适合的问卷。
3. 用户开始答题，前端保存临时进度。
4. 提交前校验题号完整性和答案格式。
5. 调用提交测试答案接口。
6. 根据测试 ID 查询结果。
7. 用结果生成报告，并提供再次查看入口。

接口返回的是测评数据和解释基础，不应该被改写。报告生成层可以调整语气和结构，但不能把低置信度的测评结果包装成确定性结论。

## 错误处理

如果答案缺题，Agent 应指出缺失题号并引导用户补齐，不要直接提交。如果用户反复中断答题，应保存草稿状态而不是生成半成品报告。若查询结果失败，应保留测试 ID，并允许稍后重试。

心理测评涉及个人信息，系统应该尽量减少留存字段。用户 ID 可以使用业务侧匿名标识，报告分享链接应有有效期或访问控制。

## 可靠性与观测

建议记录这些指标：

| 指标 | 用途 |
| --- | --- |
| questionnaire_start_count | 问卷开始次数 |
| answer_completion_rate | 答题完成率 |
| validation_failed_count | 缺题或格式错误次数 |
| report_generation_success_rate | 报告生成成功率 |
| result_revisit_count | 用户回看报告次数 |

如果完成率偏低，可能是题目太长、移动端体验不好或问卷推荐不准确。Agent 应优先优化引导流程，而不是用模型缩短测评本身。

## 落地清单

- 每份问卷展示前先读取题目数量和维度说明。
- 答案提交前做完整性校验。
- 报告中保留维度得分依据，不只输出总结。
- 不把测评结果写成医学诊断或绝对结论。
- 允许用户删除历史记录或重新测评。

## 可扩展方向

这个 Agent 可以继续接入高校专业数据接口，把职业倾向和专业方向做轻量匹配；也可以接入多语言翻译接口，为国际学校或留学生咨询场景生成英文报告。

## 相关接口

- [职业与发展心理测评问卷](https://www.gugudata.com/api/details/psychology-questionnaires)
- [文章自然润色](https://www.gugudata.com/api/details/article-polishing)
- [全国大学高校专业数据](https://www.gugudata.com/api/details/ceemajor)
- [多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)
