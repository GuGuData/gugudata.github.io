---
title: "文档字段抽取如何避免“有值但无证据”：JSON Schema、置信度与人工复核"
description: "文档字段抽取如何避免“有值但无证据”，关键不是完成一次调用，而是让输入口径、处理状态和结果证据可以复核。本文围绕“如何从 PDF、DOCX 或纯文本中抽取结构化字段，并保存字段原值、规范值和证据位置”给出一套面向真实业务流程的实现方式。"
section: "gugudata"
slug: "document-field-extraction-pdf2text-imagestreamocr"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:20.000Z"
updatedAt: "2026-09-01T12:37:20.000Z"
author: "GuGuData"
---
文档字段抽取如何避免“有值但无证据”，关键不是完成一次调用，而是让输入口径、处理状态和结果证据可以复核。本文围绕“如何从 PDF、DOCX 或纯文本中抽取结构化字段，并保存字段原值、规范值和证据位置”给出一套面向真实业务流程的实现方式。

## 问题与结果

将文档读取、字段抽取、Schema 校验和人工复核拆成独立状态，任何字段都能回到原文证据。

## 适用场景

- 合同与报告字段入库
- 长文档结构化归档
- 业务表单自动预填与复核

## 实现前先确定边界

1. 文件和纯文本只能选择一种主输入
2. Schema 必须在抽取前版本化
3. 低置信度、类型错误或证据缺失的字段进入人工复核

## 可验证工作流

![文档字段抽取如何避免“有值但无证据”工作流架构图](https://assets.devopen.club/uPic/202608/document-field-extraction-workflow.png?v=0495b14089a1)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 文档解析 | [AI 文档字段结构化解析](https://www.gugudata.com/api/details/document-field-extraction) | POST | 上传文件或文本，并按 JSON Schema 返回结构化字段 |
| 任务查询 | 异步任务状态查询 | GET | 大文档或扫描件使用 `operationId` 查询处理状态 |

主接口地址为：

```text
POST https://api.gugudata.com/v1/document-extractions
```

接口使用 `multipart/form-data`。`file` 与 `text` 必须二选一，`schema` 必填；`ocrMode` 支持 `auto`、`always`、`never`，`executionMode` 支持 `auto`、`sync`、`async`。

## 最小可运行实现

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
curl -X POST "https://api.gugudata.com/v1/document-extractions?appkey=YOUR_APPKEY" \
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
            timeout=90,
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

长文本不会只处理前半段。调用方应在成功结果中检查 `processedCharCount == charCount` 且 `isComplete=true`，并记录 `chunkCount`。任一文本块处理失败时，任务不会以完整成功结束。

## 格式与 Schema 边界

- 文件最大 30 MiB；PDF 最多 500 页；文本最多 120,000 字符。
- 支持 PDF、DOCX、TXT、MD/Markdown；二进制 `.doc` 需要先转换为 `.docx` 或 PDF。对于可复制文本的 PDF，可以先用 [PDF 文本提取](https://www.gugudata.com/api/details/pdf2text) 建立全文基线；扫描件则通过 [图片流 OCR](https://www.gugudata.com/api/details/imagestreamocr) 补充识别结果，并保留实际处理方式。
- Schema 最大 64 KiB，顶层必须是 object，最多 6 层、200 节点和 100 个叶子字段。
- `format` 仅支持 `date`、`date-time`、`email` 和 `uri`。
- `instruction` 最多 4,000 字符，不能改变 Schema 或证据规则。

## 异步任务设计

当接口返回 `mode=async` 和 `operationId` 时，Agent 应进入任务状态机，而不是把创建成功当成解析成功：

```text
PENDING -> RUNNING -> SUCCEEDED
                   -> FAILED
                   -> EXPIRED
```

查询地址示例：

```bash
curl "https://api.gugudata.com/ai/operations/OPERATION_ID" \
  -H "X-GUGUDATA-APPKEY: YOUR_APPKEY"
```

任务成功后，最终结果位于 `Data.result`，使用与同步结果相同的复核和入库流程。

## 失败分类与降级

`file` 与 `text` 同时存在、同时为空、Schema 非法、文件类型不支持时，应直接标记为输入错误。`LOW_CONFIDENCE` 和 `AMBIGUOUS` 不是系统异常，而是需要人工判断的字段状态。模型、OCR 或外部依赖失败时返回业务码 901 与 HTTP 503，不应伪装为成功结果。

扫描件 OCR 失败但原生文本仍可用时，接口可能返回警告。Agent 可以继续处理，但必须保留 `warnings`，并避免把任务标记为“无警告成功”。

## 数据契约与留痕

| 字段 | 作用 |
|---|---|
| `document_id` | 稳定业务标识，用于关联记录和请求追踪 |
| `source_hash` | 内容哈希，用于完整性、版本和重复识别 |
| `schema_version` | 输入、规则或产物版本，变更时保留旧版本 |
| `field_path` | 业务数据字段，保存来源、口径和缺失状态 |
| `raw_value` | 原始来源或响应，供后续复核 |
| `normalized_value` | 业务数据字段，保存来源、口径和缺失状态 |
| `evidence_location` | 业务数据字段，保存来源、口径和缺失状态 |
| `review_status` | 显式状态或原因，禁止以空值代替失败 |

重试应新增尝试记录，不覆盖最后一次失败。派生结果必须关联输入版本、生成时间和业务状态。

## 验收清单

- [ ] 每个必填字段都有值或明确缺失原因
- [ ] 字段值可以定位到页码、段落或文本片段
- [ ] 人工修改保留原值和修改记录

## 能力边界

字段抽取结果是候选结构化数据，不能替代合同审查、身份核验或其他专业判断。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中。
