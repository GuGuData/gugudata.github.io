---
title: "用 PII 去除和命名实体识别构建更安全的 LLM 输入预处理流程"
description: "摘要:把用户原文直接交给大模型并不总是合适。本文演示如何在 LLM 或 Agent 调用前加入 PII 去除、命名实体识别和关键词提取,让文本进入模型前先完成必要的安全处理和结构化标注。"
section: "gugudata"
slug: "pii-safe-llm-workflow"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/007_pii_safe_llm_workflow.png"
author: "GuGuData"
---
摘要：把用户原文直接交给大模型并不总是合适。本文演示如何在 LLM 或 Agent 调用前加入 PII 去除、命名实体识别和关键词提取，让文本进入模型前先完成必要的安全处理和结构化标注。

关键词：PII 去除 API、命名实体识别 API、LLM 安全预处理、Agent 隐私保护、文本脱敏

## 问题背景

客服记录、用户反馈、合同摘要和表单内容都可能包含姓名、手机号、邮箱、地址、身份证号等敏感信息。业务上可能只是要总结问题、分类工单或生成回复，并不需要把所有个人信息都交给模型。

一个更稳妥的流程是：先识别实体和敏感字段，再做脱敏，最后把处理后的文本交给 LLM。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/007_pii_safe_llm_workflow.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 实体识别 | [NLP 命名实体识别](https://www.gugudata.com/api/details/nlpentityrecognition) | POST | 识别人名、地点、机构等实体 |
| PII 去除 | [个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal) | POST | 在进入 LLM 前处理个人信息 |
| 标签提取 | [多语言长文本 AI 关键字提取](https://www.gugudata.com/api/details/keyword-extraction) | POST | 给文本生成检索标签或工单标签 |

## 调用示例

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

## 错误处理

如果 PII 去除失败，Agent 不应继续调用下游模型。对于命名实体识别低置信度的内容，可以继续做普通摘要，但不要把它标记为已完成隐私处理。涉及强监管场景时，应把接口处理结果作为辅助，不替代正式合规流程。

## 工程注意点

- 不要在日志里保存未脱敏原文，除非业务确实需要且有权限控制。
- 对脱敏前后的文本分别设置访问权限。
- 对用户输入加长度限制，避免一次性提交过大的敏感文本。
- 页面上只展示业务处理结果，不展示内部脱敏规则细节。

## 标准架构拆解

PII 安全预处理流程建议放在所有 LLM 调用之前，作为统一网关能力：

| 模块 | 责任 |
| --- | --- |
| 输入网关 | 接收用户文本、业务场景和调用来源 |
| 实体识别 | 识别人名、机构、地点和其他实体 |
| 脱敏处理 | 去除或替换个人可识别信息 |
| 策略判断 | 根据场景决定是否允许进入下游模型 |
| 审计记录 | 保存处理状态、风险等级和调用链路 |

这个网关不需要知道所有业务细节，但必须知道当前场景的风险等级。例如客服总结、合同摘要、用户反馈分析的脱敏策略可能不同，但都应该先经过统一入口。

## 数据流与接口边界

推荐流程：

1. 业务系统把文本提交到预处理网关。
2. 网关调用命名实体识别，生成实体标签。
3. 网关调用 PII 去除，生成脱敏文本。
4. 策略层判断是否可以进入 LLM。
5. 下游模型只接收脱敏文本和必要标签。
6. 审计日志记录任务 ID、处理状态和风险等级。

PII 去除接口的输出是下游模型输入，命名实体识别的输出是辅助标签。二者不应混用：实体标签可以帮助分类，但不能替代脱敏处理。

## 可靠性与观测

建议记录：

| 指标 | 用途 |
| --- | --- |
| pii_detection_rate | 发现敏感信息的比例 |
| redaction_success_rate | 脱敏成功率 |
| blocked_request_count | 被策略拦截的请求数 |
| downstream_llm_call_count | 进入模型的请求数 |
| audit_missing_count | 缺少审计记录的异常数 |

如果脱敏失败或审计失败，应默认阻断下游模型调用。隐私链路里，失败放行比失败阻断风险更高。

## 落地清单

- LLM 调用统一经过预处理网关，不允许业务绕过。
- 原文、脱敏文本和日志使用不同访问权限。
- 日志中不要记录完整敏感原文。
- 每次下游调用都保存脱敏版本号和策略版本。
- 对高风险场景增加人工复核或二次确认。

## 可扩展方向

这个流程可以放在客服机器人、工单总结、用户反馈分析和知识库入库之前。随着业务增长，还可以按实体类型统计常见问题，但统计时仍应使用脱敏后的数据。

## 相关接口

- [个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)
- [NLP 命名实体识别](https://www.gugudata.com/api/details/nlpentityrecognition)
- [多语言长文本 AI 关键字提取](https://www.gugudata.com/api/details/keyword-extraction)
