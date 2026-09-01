---
title: "RAG 文档入库如何减少脏数据：OCR、文本抽取与摘要的分层处理"
description: "RAG 文档入库如何减少脏数据，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何设计 OCR、PDF 文本抽取和摘要分层的 RAG 文档入库流程”给出一套可以直接落到任务状态和数据契约上的实现方式。"
section: "gugudata"
slug: "imagestreamocr-pdf2text-summarize-pdf"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:02.000Z"
updatedAt: "2026-09-01T12:37:02.000Z"
author: "GuGuData"
---
RAG 文档入库如何减少脏数据，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何设计 OCR、PDF 文本抽取和摘要分层的 RAG 文档入库流程”给出一套可以直接落到任务状态和数据契约上的实现方式。

## 问题与结果

将文件原件、抽取文本、切片、摘要和索引元数据分层，失败文档不会混入可检索语料。

最终交付不是一段不可追溯的模型回答，而是一组带来源、版本、状态和失败记录的数据。这样既方便接入后续系统，也能在接口、页面或模型输出变化时定位问题。

## 适用场景

- 扫描件和 PDF 知识库入库
- 合同与报告的可检索归档
- 企业文档问答前的数据治理

## 实现前先确定边界

1. 先判断文件类型和可读性，再选择 OCR 或 PDF 文本抽取
2. 摘要只从已验收文本生成
3. 抽取为空、乱码或页数异常时停止索引

## 可验证工作流

![RAG 文档入库如何减少脏数据工作流架构图](https://assets.devopen.club/uPic/202608/imagestreamocr-workflow.png?v=e6427ea23252)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 图片识别 | [通用图片文件流 OCR 到文本](https://www.gugudata.com/api/details/imagestreamocr) | POST | 处理图片、扫描件、截图中的文字 |
| PDF 文本抽取 | [通用 PDF 文件流 OCR 到文本](https://www.gugudata.com/api/details/pdf2text) | POST | 把 PDF 转成可检索文本 |
| PDF 摘要 | [PDF 全文多语言 AI 摘要](https://www.gugudata.com/api/details/summarize-pdf) | POST | 生成文档摘要，作为检索元数据 |

## 最小可运行实现

上传 PDF 并抽取文本：

```bash
curl -X POST "https://api.gugudata.com/imagerecognition/pdf2text?appkey=YOUR_APPKEY" \
  -F "file=@./report.pdf"
```

对同一份 PDF 生成摘要：

```bash
curl -X POST "https://api.gugudata.com/ai/summarize?appkey=YOUR_APPKEY&lang=zh-cn&streaming=false" \
  -F "file=@./report.pdf"
```

Python 侧可以把转换结果交给入库任务：

```python
import requests

APPKEY = "YOUR_APPKEY"


def pdf_to_text(path: str) -> str:
    """Convert a PDF file to text before indexing."""
    with open(path, "rb") as file_obj:
        response = requests.post(
            "https://api.gugudata.com/imagerecognition/pdf2text",
            params={"appkey": APPKEY},
            files={"file": file_obj},
            timeout=120,
        )
    response.raise_for_status()
    payload = response.json()
    return payload["Data"]
```

## 入库设计

文档入库时建议保存这些字段：

| 字段 | 说明 |
| --- | --- |
| document_id | 自己系统里的文档 ID |
| source_file | 原始文件名或业务来源 |
| extracted_text | OCR 或 PDF 转文本结果 |
| summary | 摘要接口返回的文档摘要 |
| chunk_id | 分段后的文本块 ID |
| extracted_at | 转换时间，便于刷新和审计 |

## 失败分类与降级

图片或 PDF 转换失败时，Agent 不应该直接生成答案。它应该把文档标记为“转换失败”，保留失败原因，并允许人工重新上传或换用更清晰的文件。对于大文件，可以先做文件大小和格式检查，再调用接口，减少无效请求。

## 工程化注意事项

- OCR 结果要保留原始页码或文件来源，方便定位答案出处。
- 分段时不要只按固定字数切分，要尽量保留标题、段落和表格上下文。
- 入库前去掉明显页眉、页脚和重复水印，减少检索噪声。
- 对敏感文档先做权限控制，再开放给问答系统。

## 数据契约与留痕

建议至少保存以下字段；真实项目可以继续拆分，但不要删除来源、版本和状态信息。

| 字段 | 作用 |
|---|---|
| `document_id` | 稳定业务标识，用于关联记录并避免名称冲突 |
| `file_hash` | 内容哈希，用于完整性校验、版本识别和去重 |
| `extract_method` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `page_count` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `text_version` | 规则、输入或产物版本，变更时保留旧版本 |
| `summary` | 派生结果，必须关联输入版本与生成时间 |
| `index_status` | 显式状态或结果，禁止用空值代替失败 |

所有派生结果都应带生成时间和输入版本。发生重试时新增尝试记录，不要覆盖最后一次失败，以免排查时只剩“最终成功”而看不到中间问题。

## 验收清单

- [ ] 同一文件重复上传不会产生重复索引
- [ ] 每个切片可回溯到页码或原文件
- [ ] 抽取失败与摘要失败分开记录

## 能力边界

公开 Demo 只能证明响应形状；OCR 准确率、文件上限、并发和配额需要按实际账号重新验证。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中，不应进入前端、文章、日志或版本库。
