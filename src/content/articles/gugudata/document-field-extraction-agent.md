---
title: "用 JSON Schema 和文档字段抽取接口构建结构化入库 Agent"
description: "摘要:合同、采购公告、财务报告和申请材料中的关键字段通常散落在正文、表格与附件中。本文演示如何使用 AI 文档字段结构化解析接口,把 PDF、Word、TXT、Markdown 或纯文本转换为经过 Schema 校验、带置信度和原文证据的标准 JSON,并构建可人工复核的结构化入库 Agent。"
section: "gugudata"
slug: "document-field-extraction-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202607/021_document_field_extraction_agent_flowchart-v2.png"
author: "GuGuData"
---
摘要：合同、采购公告、财务报告和申请材料中的关键字段通常散落在正文、表格与附件中。本文演示如何使用 AI 文档字段结构化解析接口，把 PDF、Word、TXT、Markdown 或纯文本转换为经过 Schema 校验、带置信度和原文证据的标准 JSON，并构建可人工复核的结构化入库 Agent。

关键词：文档字段抽取 API、JSON Schema、文档解析 Agent、PDF 结构化、合同字段提取、AI 数据入库

## 问题背景

传统文档录入流程通常依赖人工复制字段，或者先 OCR 再用正则表达式匹配。前者成本高、难以追踪，后者面对版式变化、同义字段和复杂表格时维护成本很高。

更稳妥的做法是由调用方先定义业务字段 Schema，再让文档解析服务完成文本抽取、OCR、字段识别、类型归一化和证据定位。Agent 不直接相信自由文本回答，而是根据字段状态、置信度和 Schema 校验结果决定自动入库、人工复核或拒绝处理。

## Agent 工作流

![文档字段抽取 Agent 流程图](https://assets.devopen.club/uPic/202607/021_document_field_extraction_agent_flowchart-v2.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 文档解析 | [AI 文档字段结构化解析](https://www.gugudata.com/api/details/document-field-extraction) | POST | 上传文件或文本，并按 JSON Schema 返回结构化字段 |
| 任务查询 | 异步任务状态查询 | GET | 大文档或扫描件使用 `operationId` 查询处理状态 |

主接口地址为：

```text
POST https://api.gugudata.com/v1/document-extractions
```

接口使用 `multipart/form-data`。`file` 与 `text` 必须二选一，`schema` 必填；`ocrMode` 支持 `auto`、`always`、`never`，`executionMode` 支持 `auto`、`sync`、`async`。

## 调用示例

先定义稳定的业务字段：

```json
{
  "type": "object",
  "required": ["projectName", "budgetAmount"],
  "properties": {
    "projectName": {
      "type": "string",
      "title": "项目名称"
    },
    "budgetAmount": {
      "type": "number",
      "title": "预算金额",
      "description": "统一按万元返回"
    },
    "bidDeadline": {
      "type": "string",
      "format": "date-time",
      "title": "投标截止时间"
    }
  }
}
```

使用文件上传：

```bash
curl -X POST "https://api.gugudata.com/v1/document-extractions?appkey=REDACTED \
  -F "file=@procurement-notice.pdf" \
  -F 'schema={"type":"object","required":["projectName","budgetAmount"],"properties":{"projectName":{"type":"string","title":"项目名称"},"budgetAmount":{"type":"number","title":"预算金额","description":"统一按万元返回"},"bidDeadline":{"type":"string","format":"date-time","title":"投标截止时间"}}}' \
  -F "instruction=金额统一按万元，日期使用北京时间" \
  -F "ocrMode=auto" \
  -F "executionMode=auto"
```

在 Python 服务中可以把 Schema 和文件一起提交：

```python
import json
import requests

APPKEY = "YOUR_APPKEY"

def extract_document(path: str, schema: dict) -> dict:
    """Extract validated fields from one document."""
    with open(path, "rb") as document:
        response = requests.post(
            "https://api.gugudata.com/v1/document-extractions",
            params={"appkey": APPKEY},
            files={"file": document},
            data={
                "schema": json.dumps(schema, ensure_ascii=False),
                "instruction": "金额统一按万元，日期使用北京时间",
                "ocrMode": "auto",
                "executionMode": "auto",
            },
            timeout=120,
        )
    response.raise_for_status()
    return response.json()
```

## 结果如何进入业务系统

同步成功时，重点读取以下字段：

| 字段 | 用途 |
| --- | --- |
| `Data.document` | 文件名、类型、页数、字符数和实际文本提取方式 |
| `Data.summary` | 字段总数、成功数、失败数和成功率 |
| `Data.values` | 字段状态、原值、规范化值、类型、置信度和证据 |
| `Data.failedFields` | 需要重试或人工复核的字段路径 |
| `Data.warnings` | OCR 降级等非致命警告 |

入库时不要只保存 `normalizedValue`。建议同时保存 `value`、`status`、`confidence`、`evidence`、`requestId` 和 Schema 版本。这样字段发生争议时可以回到原文证据，而不是重新猜测模型当时为何返回该值。

## 异步任务设计

当接口返回 `mode=async` 和 `operationId` 时，Agent 应进入任务状态机，而不是把创建成功当成解析成功：

```text
PENDING -> RUNNING -> SUCCEEDED
                   -> FAILED
                   -> EXPIRED
```

查询地址示例：

```bash
curl -G "https://api.gugudata.com/ai/operations/OPERATION_ID" \
  --data-urlencode "appkey=YOUR_APPKEY"
```

任务成功后，最终结果位于 `Data.result`，使用与同步结果相同的复核和入库流程。

## 标准架构拆解

| 模块 | 责任 |
| --- | --- |
| 文档入口 | 接收文件、文本、业务类型和任务优先级 |
| Schema 管理 | 保存字段定义、版本、单位和必填规则 |
| 文本提取 | 按 `ocrMode` 选择原生文本或 OCR |
| 字段抽取 | 生成字段原值、规范化值和证据 |
| 质量网关 | 检查状态、类型、置信度和必填字段 |
| 人工复核 | 处理低置信度、歧义和未找到字段 |
| 入库适配 | 把已确认结果映射到业务表或消息队列 |

Schema 是业务合同，不应该临时拼接在提示词里。字段新增、类型变更或单位调整都需要产生新版本，并记录每次任务使用的版本号。

## 数据流与接口边界

推荐流程：

1. 业务系统创建解析任务并选择 Schema 版本。
2. 文件和 Schema 通过服务端提交，AppKey 不进入浏览器。
3. 服务提取原生文本，必要时按策略触发 OCR。
4. AI 按 Schema 生成字段结果。
5. 服务完成类型检查、归一化和证据整理。
6. 质量网关把字段分为自动通过、人工复核和失败。
7. 已确认结果写入业务系统，原始结果进入审计存储。

接口负责文档解析和结构化结果，业务系统负责权限、复核阈值和最终入库。不要让接口成功状态绕过业务侧的数据质量规则。

## 错误处理

`file` 与 `text` 同时存在、同时为空、Schema 非法、文件类型不支持时，应直接标记为输入错误。`LOW_CONFIDENCE` 和 `AMBIGUOUS` 不是系统异常，而是需要人工判断的字段状态。

扫描件 OCR 失败但原生文本仍可用时，接口可能返回警告。Agent 可以继续处理，但必须保留 `warnings`，并避免把任务标记为“无警告成功”。

## 可靠性与观测

| 指标 | 用途 |
| --- | --- |
| `document_parse_success_rate` | 判断文档是否成功进入字段抽取 |
| `field_success_rate` | 观察 Schema 字段整体成功率 |
| `low_confidence_rate` | 判断人工复核压力 |
| `ocr_fallback_rate` | 识别扫描件和原生文本质量 |
| `schema_validation_failure_count` | 发现字段设计或调用错误 |
| `manual_review_latency_ms` | 衡量复核队列时效 |

指标需要按文档类型和 Schema 版本拆分。不同模板混在一起统计，会掩盖某一类合同或报告的质量退化。

## 落地清单

- `file` 与 `text` 严格二选一。
- Schema 使用稳定英文 key，中文名称写入 `title`。
- 低置信度字段不自动进入正式业务表。
- 原值、规范化值和人工修改值分开保存。
- AppKey 只保存在服务端或密钥管理系统中。
- 大文档使用异步任务，并处理过期状态。
- 导出或日志避免包含无权限查看的原始文档内容。

## 可扩展方向

文档字段抽取可以接在 PDF/OCR、网页正文抽取和邮件附件处理之后，也可以与 PII 去除接口组合，在结果进入知识库前完成敏感信息治理。对于高价值业务，还可以基于证据片段建立抽样复核和 Schema 回归测试集。

## 相关接口

- [AI 文档字段结构化解析](https://www.gugudata.com/api/details/document-field-extraction)
- [通用 PDF 文件流 OCR 到文本](https://www.gugudata.com/api/details/pdf2text)
- [通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr)
- [个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)
