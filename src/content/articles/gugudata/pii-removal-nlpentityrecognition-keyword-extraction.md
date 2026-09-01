---
title: "LLM 输入前如何处理隐私信息：PII 脱敏与实体标注工作流"
description: "LLM 输入前如何处理隐私信息，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何在调用大模型前完成 PII 去除、实体识别和最小必要文本处理”给出一套可以直接落到任务状态和数据契约上的实现方式。"
section: "gugudata"
slug: "pii-removal-nlpentityrecognition-keyword-extraction"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:06.000Z"
updatedAt: "2026-09-01T12:37:06.000Z"
author: "GuGuData"
---
LLM 输入前如何处理隐私信息，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何在调用大模型前完成 PII 去除、实体识别和最小必要文本处理”给出一套可以直接落到任务状态和数据契约上的实现方式。

## 问题与结果

敏感原文留在受控边界内，模型只接收通过策略检查的脱敏文本和必要标签。

最终交付不是一段不可追溯的模型回答，而是一组带来源、版本、状态和失败记录的数据。这样既方便接入后续系统，也能在接口、页面或模型输出变化时定位问题。

## 适用场景

- 客服记录进入 LLM 前预处理
- 用户反馈分析
- 内部文档摘要与知识库入库

## 实现前先确定边界

1. 先分类数据敏感级别，再决定是否允许处理
2. 脱敏失败或疑似残留时禁止继续调用模型
3. 原文与脱敏结果分库存储并使用不同权限

## 可验证工作流

![LLM 输入前如何处理隐私信息工作流架构图](https://assets.devopen.club/uPic/202608/pii-removal-workflow.png?v=f9b5acccf526)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 实体识别 | [NLP 命名实体识别](https://www.gugudata.com/api/details/nlpentityrecognition) | POST | 识别人名、地点、机构等实体 |
| PII 去除 | [个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal) | POST | 在进入 LLM 前处理个人信息 |
| 标签提取 | [多语言长文本 AI 关键字提取](https://www.gugudata.com/api/details/keyword-extraction) | POST | 给文本生成检索标签或工单标签 |

## 最小可运行实现

```bash
curl -X POST "https://api.gugudata.com/ai/pii-removal" \
  -H "Content-Type: application/json" \
  -d '{
    "appkey": "YOUR_APPKEY",
    "content": "张三的手机号是 13800000000，他想查询订单配送进度。",
    "streaming": false
  }'
```

```bash
curl -X POST "https://api.gugudata.com/text/entityrecognition" \
  -H "Content-Type: application/json" \
  -d '{
    "appkey": "YOUR_APPKEY",
    "content": "张三的手机号是 13800000000，他想查询订单配送进度。"
  }'
```

在应用侧可以强制所有 LLM 输入先走预处理：

```python
def build_llm_input(redacted_text: str, entities: list[dict]) -> dict:
    """Build a sanitized payload for downstream LLM calls."""
    return {
        "text": redacted_text,
        "entityTypes": sorted({item.get("type") for item in entities if item.get("type")}),
        "policy": "Do not reconstruct removed personal information.",
    }
```

## 输出建议

| 字段 | 说明 |
| --- | --- |
| redacted_text | 脱敏后的文本 |
| entities | 命名实体识别结果 |
| pii_removed | 是否完成 PII 去除 |
| risk_level | 根据业务规则得到的风险等级 |
| next_action | 自动总结、人工复核或拒绝处理 |

## 失败分类与降级

如果 PII 去除失败，Agent 不应继续调用下游模型。对于命名实体识别低置信度的内容，可以继续做普通摘要，但不要把它标记为已完成隐私处理。涉及强监管场景时，应把接口处理结果作为辅助，不替代正式合规流程。

## 工程化注意事项

- 不要在日志里保存未脱敏原文，除非业务确实需要且有权限控制。
- 对脱敏前后的文本分别设置访问权限。
- 对用户输入加长度限制，避免一次性提交过大的敏感文本。
- 页面上只展示业务处理结果，不展示内部脱敏规则细节。

## 数据契约与留痕

建议至少保存以下字段；真实项目可以继续拆分，但不要删除来源、版本和状态信息。

| 字段 | 作用 |
|---|---|
| `record_id` | 稳定业务标识，用于关联记录并避免名称冲突 |
| `classification` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `entity_spans` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `redaction_policy` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `sanitized_text` | 正文内容，与来源和版本绑定保存 |
| `review_result` | 显式状态或结果，禁止用空值代替失败 |
| `model_request_id` | 稳定业务标识，用于关联记录并避免名称冲突 |

所有派生结果都应带生成时间和输入版本。发生重试时新增尝试记录，不要覆盖最后一次失败，以免排查时只剩“最终成功”而看不到中间问题。

## 验收清单

- [ ] 测试样本覆盖姓名、电话、地址和证件类信息
- [ ] 日志不记录原始敏感文本
- [ ] 脱敏结果可由授权人员抽样复核

## 能力边界

自动脱敏不能替代数据分类、访问控制、保留期限和合规评估；高风险数据应默认拒绝外发。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中，不应进入前端、文章、日志或版本库。
