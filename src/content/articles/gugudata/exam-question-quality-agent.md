---
title: "用考题相似度和 NLP 接口构建题库质量治理 Agent"
description: "摘要:题库系统需要处理重复题、近似题、错别字、分词和语义相似度问题。本文演示如何把考题相似度 AI 分析、NLP 文本相似度、中文纠错、分词和命名实体识别组合起来,构建一个题库质量治理 Agent。"
section: "gugudata"
slug: "exam-question-quality-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/018_exam_question_quality_agent.png"
author: "GuGuData"
---
摘要：题库系统需要处理重复题、近似题、错别字、分词和语义相似度问题。本文演示如何把考题相似度 AI 分析、NLP 文本相似度、中文纠错、分词和命名实体识别组合起来，构建一个题库质量治理 Agent。

关键词：题库治理 Agent、考题相似度 API、文本相似度 API、中文纠错 API、教育题库去重

## 问题背景

在线教育、考试训练和题库运营经常遇到相似题重复入库的问题。题干只改几个数字、选项顺序变化、解析措辞不同，都会让简单的字符串去重失效。人工审核准确但成本高，直接让模型判断又难以形成稳定流程。

更可维护的做法是先做文本规范化，再用相似度接口和考题相似度接口生成风险评分，最后让人工或审核规则处理高风险题目。Agent 负责编排这个流程，并把每一步的依据保存下来。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/018_exam_question_quality_agent.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 文本纠错 | [NLP 中文智能纠错](https://www.gugudata.com/api/details/nlpcorrect) | POST | 修正明显错别字，降低噪声 |
| 中文分词 | [NLP 中文文本分词](https://www.gugudata.com/api/details/segment) | GET | 为关键词和规则匹配提供分词结果 |
| 实体识别 | [NLP 命名实体识别](https://www.gugudata.com/api/details/nlpentityrecognition) | POST | 识别题目中的人名、地点、机构等实体 |
| 文本相似度 | [NLP 文本语义相似度检测](https://www.gugudata.com/api/details/nlpsimilarity) | POST | 计算通用语义相似度 |
| 考题相似度 | [考题相似度 AI 分析](https://www.gugudata.com/api/details/exam-question-similarity) | POST | 针对考题场景判断相似风险 |

## 调用示例

先做中文纠错：

```bash
curl -X POST "https://api.gugudata.com/text/correct?appkey=REDACTED \
  -H "Content-Type: application/json" \
  -d '{
    "content": "这里放入待检查题干"
  }'
```

再比较两道题的相似度：

```bash
curl -X POST "https://api.gugudata.com/education/exam-question-similarity?appkey=REDACTED \
  -H "Content-Type: application/json" \
  -d '{
    "exam1": "第一道题的题干、选项和解析",
    "exam2": "第二道题的题干、选项和解析"
  }'
```

Agent 可以先构造候选对，避免全量两两比较：

```python
def build_candidate_pairs(new_item: dict, existing_items: list[dict]) -> list[tuple[str, str]]:
    """Build candidate question pairs by subject and keyword overlap."""
    subject = new_item.get("subject")
    keywords = set(new_item.get("keywords", []))
    pairs = []
    for item in existing_items:
        if item.get("subject") != subject:
            continue
        if keywords & set(item.get("keywords", [])):
            pairs.append((new_item["id"], item["id"]))
    return pairs
```

## 题库治理结果怎么组织

相似题审核建议展示为结构化结果：

| 区块 | 内容 |
| --- | --- |
| 新题信息 | 学科、年级、题型、题干摘要 |
| 候选相似题 | 已入库题目 ID、相似度、匹配原因 |
| 文本差异 | 题干、选项、解析的差异点 |
| 审核建议 | 自动通过、人工复核、疑似重复、拒绝入库 |
| 处理记录 | 审核人、处理时间、最终状态 |

Agent 的输出应帮助审核人员更快判断，而不是替代所有审核。对高风险题目，必须保留候选题和相似度依据。

## 标准架构拆解

题库质量治理可以拆成以下模块：

| 模块 | 责任 |
| --- | --- |
| 文本规范化 | 纠错、去空白、统一符号和选项格式 |
| 候选召回 | 用学科、题型、关键词先缩小比较范围 |
| 相似度计算 | 调用文本相似度和考题相似度接口 |
| 风险分级 | 根据阈值生成通过、复核、疑似重复 |
| 审核闭环 | 保存人工处理结果，反哺阈值和规则 |

候选召回是性能关键。不要对全库题目做暴力两两比较，应先用学科、年级、题型、关键词和实体信息过滤。

## 数据流与接口边界

推荐流程如下：

1. 新题进入待审核队列。
2. 对题干、选项和解析做文本规范化。
3. 提取关键词、分词和实体信息。
4. 从题库中召回候选相似题。
5. 调用相似度接口和考题相似度接口。
6. 根据阈值生成风险分级。
7. 高风险题进入人工复核，低风险题自动入库。

接口边界上，相似度接口提供风险依据，最终是否入库仍是业务规则。不要把相似度分数直接当成唯一判断。

## 错误处理

如果纠错接口失败，可以保留原题继续进入候选召回，但要标记“未纠错”。如果相似度计算超时，应让题目进入待重试队列，而不是直接放行。若题目字段缺失，例如没有选项或解析，Agent 应提示补齐。

对数学公式、图片题和表格题，需要保留原始资源链接。纯文本相似度不一定能覆盖所有题型。

## 可靠性与观测

建议记录以下指标：

| 指标 | 用途 |
| --- | --- |
| normalization_success_rate | 文本规范化成功率 |
| candidate_pair_count | 每道题召回的候选数量 |
| similarity_latency_ms | 相似度计算耗时 |
| manual_review_rate | 进入人工复核比例 |
| duplicate_confirm_rate | 人工确认重复比例 |

如果人工确认重复比例很低，说明阈值过严或候选召回太宽；如果漏重较多，说明候选召回或相似度规则需要调整。

## 落地清单

- 新题入库前先进入审核队列。
- 用学科、年级、题型缩小候选范围。
- 保存相似度依据和候选题 ID。
- 对高风险题保留人工复核入口。
- 不用模型直接覆盖题干、选项或解析原文。

## 可扩展方向

这个 Agent 可以继续接入图片 OCR 和 PDF 转文本接口，把扫描试卷、图片题和 PDF 试卷解析成可比较文本；也可以接入摘要接口，为长解析题生成审核摘要。

## 相关接口

- [考题相似度 AI 分析](https://www.gugudata.com/api/details/exam-question-similarity)
- [NLP 文本语义相似度检测](https://www.gugudata.com/api/details/nlpsimilarity)
- [NLP 中文智能纠错](https://www.gugudata.com/api/details/nlpcorrect)
- [NLP 中文文本分词](https://www.gugudata.com/api/details/segment)
- [NLP 命名实体识别](https://www.gugudata.com/api/details/nlpentityrecognition)
