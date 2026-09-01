---
title: "题库去重如何减少误判：文本规范化、相似度与人工复核流程"
description: "题库去重如何减少误判，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何结合考题相似度、文本相似度、纠错和分词治理重复与近似题”给出一套可以直接落到任务状态和数据契约上的实现方式。"
section: "gugudata"
slug: "exam-question-similarity-nlpsimilarity-nlpcorrect"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:17.000Z"
updatedAt: "2026-09-01T12:37:17.000Z"
author: "GuGuData"
---
题库去重如何减少误判，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何结合考题相似度、文本相似度、纠错和分词治理重复与近似题”给出一套可以直接落到任务状态和数据契约上的实现方式。

## 问题与结果

先规范化题面，再分层计算候选相似度，最终合并动作由可审计规则或人工确认决定。

最终交付不是一段不可追溯的模型回答，而是一组带来源、版本、状态和失败记录的数据。这样既方便接入后续系统，也能在接口、页面或模型输出变化时定位问题。

## 适用场景

- 题库导入去重
- 相似题推荐
- 题面质量巡检

## 实现前先确定边界

1. 保留原题，不用纠错结果覆盖来源文本
2. 相似度用于召回候选，不直接执行删除
3. 图片题和双文档题必须保留资源关联

## 可验证工作流

![题库去重如何减少误判工作流架构图](https://assets.devopen.club/uPic/202608/exam-question-similarity-workflow.png?v=4867d90d2da2)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 文本纠错 | [NLP 中文智能纠错](https://www.gugudata.com/api/details/nlpcorrect) | POST | 修正明显错别字，降低噪声 |
| 中文分词 | [NLP 中文文本分词](https://www.gugudata.com/api/details/segment) | GET | 为关键词和规则匹配提供分词结果 |
| 实体识别 | [NLP 命名实体识别](https://www.gugudata.com/api/details/nlpentityrecognition) | POST | 识别题目中的人名、地点、机构等实体 |
| 文本相似度 | [NLP 文本语义相似度检测](https://www.gugudata.com/api/details/nlpsimilarity) | POST | 计算通用语义相似度 |
| 考题相似度 | [考题相似度 AI 分析](https://www.gugudata.com/api/details/exam-question-similarity) | POST | 针对考题场景判断相似风险 |

## 最小可运行实现

先做中文纠错：

```bash
curl -X POST "https://api.gugudata.com/text/correct?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "这里放入待检查题干"
  }'
```

再比较两道题的相似度：

```bash
curl -X POST "https://api.gugudata.com/education/exam-question-similarity" \
  -H "Authorization: Bearer YOUR_APPKEY" \
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

相似题审核建议展示为结构化结果。`score` 是内容相似度，不是重复概率，也不能单独替代审核规则：

| 区块 | 内容 |
| --- | --- |
| 新题信息 | 学科、年级、题型、题干摘要 |
| 候选相似题 | 已入库题目 ID、相似度、重复类型 |
| 文本差异 | 题干、选项、解析的差异点 |
| 可核验证据 | 两道题各自的原文片段或图片序号 |
| 审核建议 | 自动通过、人工复核、疑似重复、拒绝入库 |
| 处理记录 | 审核人、处理时间、最终状态 |

Agent 的输出应帮助审核人员更快判断，而不是替代所有审核。对高风险题目，必须保留候选题和相似度依据。

## 失败分类与降级

如果纠错接口失败，可以保留原题继续进入候选召回，但要标记“未纠错”。业务码 501 表示输入需要修正；901 表示模型、图片下载或解析依赖暂时不可用，应进入受控重试队列，而不是直接放行。任务不存在、过期或不属于当前 AppKey 时统一按 404 处理。

对数学公式、图片题和表格题，可在题目对象中提交 Base64 图片或公开 HTTPS 图片。服务端会安全下载并校验图片，业务日志不应保存图片 URL、题目正文或证据文本。

## 图片与双文档流程

单题图片对比适合已经拆分好的题目；整份试卷应使用双文档异步接口。上传 PDF、DOCX、HTML、TXT 或 Markdown 后保存 `operationId`，再通过 Header 鉴权轮询任务。成功结果应满足 `processedCharCount=charCount` 且 `isComplete=true`，并返回稳定题目 ID、位置、重复类型和证据。

扫描 PDF、文档后半段题目和跨页内容都必须进入处理范围。超出页数、字符数、200 道题或 600 个候选对时，应拆分文档后重新提交，不能接受静默截断。

## 数据契约与留痕

建议至少保存以下字段；真实项目可以继续拆分，但不要删除来源、版本和状态信息。

| 字段 | 作用 |
|---|---|
| `question_id` | 稳定业务标识，用于关联记录并避免名称冲突 |
| `source_text` | 原始来源或原始响应，供后续复核 |
| `normalized_text` | 正文内容，与来源和版本绑定保存 |
| `tokens` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `entities` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `candidate_id` | 稳定业务标识，用于关联记录并避免名称冲突 |
| `similarity_scores` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `review_decision` | 业务数据字段，保存时记录来源、口径和缺失状态 |

所有派生结果都应带生成时间和输入版本。发生重试时新增尝试记录，不要覆盖最后一次失败，以免排查时只剩“最终成功”而看不到中间问题。

## 验收清单

- [ ] 完全重复、近似表达和同知识点能被区分
- [ ] 阈值和模型版本可追溯
- [ ] 合并或保留决定有审核记录

## 能力边界

文本相似不等于题目等价，公式、图片、答案和适用年级仍需业务规则与人工复核。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中，不应进入前端、文章、日志或版本库。
