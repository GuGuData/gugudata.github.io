---
title: "智能文档字段抽取工作台功能需求文档"
description: "所属分类:AI/文档解析\\ 产品案例页:https://engineering.gugudata.com/products/ai/document-field-extraction-workbench/"
section: "gugudata"
slug: "zhi-neng-wen-dang-zi-duan-chou-qu-gong-zuo-tai-gong-neng-xu-qiu-wen-dang"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
canonicalUrl: "https://engineering.gugudata.com/products/ai/document-field-extraction-workbench/"
cover: "https://assets.devopen.club/uPic/202607/document-field-extraction-workbench-html.png"
author: "GuGuData"
---
![智能文档字段抽取工作台界面截图](https://assets.devopen.club/uPic/202607/document-field-extraction-workbench-html.png)

> 所属分类：AI/文档解析\
> 产品案例页：[https://engineering.gugudata.com/products/ai/document-field-extraction-workbench/](https://engineering.gugudata.com/products/ai/document-field-extraction-workbench/)

## 产品定位与截图范围

智能文档字段抽取工作台面向招投标、采购、合同、财务、审计和资质审核团队，把 PDF、Word、TXT、Markdown 或纯文本中的业务字段解析为经过 Schema 校验的标准 JSON。产品提供原文预览、字段模板、JSON 结果、JSON Tree、证据定位、置信度、失败原因、人工复核和异步任务管理。

截图覆盖文档队列、原始文档预览、JSON Schema 定义、JSON Tree 抽取结果、质量概览、字段级复核、OCR 与执行模式、告警、人工复核队列和多格式导出。它不是只展示一段“智能回答”的聊天页，而是让原始文档、结构定义、JSON 结果和证据链同时可核对的业务工作台。

## 目标用户与业务场景

主要用户包括招投标资料人员、采购运营、合同管理员、财务与审计人员、数据录入团队、企业知识库维护人员和后端集成开发者。

典型场景包括：

- 从采购公告中抽取项目名称、预算、截止时间和供应商要求；
- 从合同中抽取甲乙方、金额、日期、付款条件和关键条款；
- 从财务报告中抽取期间、指标、金额单位和审计意见；
- 对扫描版 PDF 自动触发 OCR，再进行字段结构化；
- 对大文档创建异步任务，完成后进入低置信度字段复核；
- 将规范化 JSON 直接写入业务系统，同时保留原值和证据片段。

## 截图可见信息组织

顶部导航包括解析工作台、任务中心、字段模板、质量复核和系统设置。左侧文档队列展示文件名、类型、大小、时间和处理状态。

中间左侧保留原始文档预览，并高亮与字段结果对应的证据。中间右侧同时展示 JSON Schema 和 JSON Tree。用户可以在“JSON 结果”和“JSON Tree”之间切换，但原始文档始终保留，不能用格式化结果替代原始资料。

下方质量概览展示字段总数、成功字段、失败字段、成功率和平均置信度。字段级复核表展示字段名、状态、原始值、规范化值、类型、置信度、证据来源和操作。

右侧配置 OCR 模式与执行模式，展示执行进度、告警、待人工复核项和导出入口。低置信度、类型不匹配或歧义字段必须进入复核，不得静默写入下游。

## 核心功能需求

1. 文档输入：`file` 与 `text` 必须二选一，支持 PDF、DOCX、DOC、TXT、MD/Markdown 和纯文本。
2. Schema 编辑：顶层必须为 `object`，支持嵌套对象、数组及常用标量类型。
3. OCR 策略：支持 `auto`、`always` 和 `never`，并显示实际文本抽取方式。
4. 执行模式：支持 `auto`、`sync` 和 `async`；大文档与扫描件优先使用异步任务。
5. 结果视图：保留原始文档，提供 JSON 结果、JSON Tree 和字段复核表。
6. 证据定位：每个字段可查看页码、段落、表格行或章节证据片段。
7. 质量控制：展示字段状态、置信度、失败原因、警告和总体成功率。
8. 人工复核：允许确认、修改、驳回或重新抽取，并保留操作记录。
9. 安全处理：凭证只保存在服务端；导出和下游写入遵守业务数据权限。

## 主要操作流程

1. 用户上传文档，或粘贴已经完成 OCR/网页抽取的纯文本。
2. 用户选择字段模板，或编辑 JSON Schema 和补充解析说明。
3. 系统校验输入二选一、Schema 合法性和文件类型。
4. 服务根据 `ocrMode` 抽取文本，并按 `executionMode` 同步处理或创建任务。
5. 页面展示原始文档、JSON 结果、JSON Tree 和质量概览。
6. 用户点击字段查看证据片段，对低置信度或失败字段进行复核。
7. 复核通过后导出 JSON、Excel、CSV 或复核报告，或写入下游系统。

## 数据与结果展示

原始文档预览是复核基准，必须保留页码、缩放、下载和证据高亮。JSON Schema 编辑器显示字段 key、类型、标题、说明、必填约束和嵌套关系。JSON 结果用于复制和接口联调，JSON Tree 用于浏览复杂层级，两者来自同一份结构化结果。

字段表需要完整显示 `status`、`value`、`normalizedValue`、`type`、`confidence`、`reason` 和 `evidence`。成功率计算为成功字段数除以字段总数，界面不得把低置信度字段自动算作已人工确认。

失败字段按 `NOT_FOUND`、`TYPE_MISMATCH`、`LOW_CONFIDENCE`、`AMBIGUOUS`、`UNSUPPORTED_SCHEMA` 和 `EXTRACTION_ERROR` 分类。页面可以针对不同失败类型提供重试或人工修正，但必须保留原始返回值和修改记录。

## 接口调用蓝图

| 业务步骤 | 接口名称 | 接口文档 | 请求地址 | 关键入参 | 关键出参 | 传参关系 |
| --- | --- | --- | --- | --- | --- | --- |
| 解析文档字段 | AI 文档字段结构化解析 | [document-field-extraction](https://www.gugudata.com/api/details/document-field-extraction) | `POST https://api.gugudata.com/v1/document-extractions` | `file` 或 `text`、`schema*`、`instruction`、`ocrMode`、`executionMode` | 文档信息、质量统计、`values`、失败字段、证据、警告或 `operationId` | 原文与 Schema 一起提交；同步返回结果，异步返回任务信息。 |
| 查询异步任务 | 任务状态查询 | operation 查询接口 | `GET https://api.gugudata.com/ai/operations/{operation_id}` | `operation_id*`、`appkey*` | `PENDING`、`RUNNING`、`SUCCEEDED`、`FAILED` 或 `EXPIRED` 及最终结果 | 使用解析接口返回的 `operationId` 轮询，成功后进入相同结果视图。 |

## 参数流转说明

上传文件时使用 `multipart/form-data` 的 `file`；调用方已经获得正文时使用 `text`。两者同时提交或同时为空都应阻止。`schema` 是 JSON 字符串，顶层 `type` 必须为 `object`，`properties` 的稳定英文 key 直接成为 `Data.values` 的字段 key。

`ocrMode=auto` 由服务判断是否需要 OCR；扫描件可用 `always`，确认存在可复制文本时可用 `never`。`executionMode=auto` 由文档大小和处理成本决定同步或异步；异步任务必须保存 `requestId`、`operationId`、轮询地址和过期时间。

复核后的值属于产品侧修订结果，必须与接口原始 `value`、`normalizedValue` 分开保存。写入下游系统前，应同时检查业务状态码、字段状态、置信度阈值和人工复核状态。

## 体验要求与验收标准

桌面端需要尽量同时展示原文、Schema/JSON 和字段复核表。较窄窗口可折叠文档队列或配置栏，但不能隐藏原文与证据入口。移动端以任务状态和字段复核为主，复杂 Schema 编辑建议进入桌面模式。

验收时需要确认：原始文档是否保留；JSON 结果和 JSON Tree 是否一致；字段点击能否定位证据；`file` 与 `text` 是否二选一；OCR 与执行模式是否正确；总体统计是否与字段表一致；低置信度字段是否进入人工复核；异步任务是否正确处理过期和失败状态。

## 截图功能验收清单

- 文档队列展示文件类型、状态和失败项；
- 原文页码、缩放、证据高亮与字段结果联动；
- Schema 编辑器可以校验类型和必填字段；
- JSON 结果与 JSON Tree 使用同一数据源；
- 字段表包含原值、规范化值、类型、置信度和证据；
- 成功数、失败数和成功率计算一致；
- 低置信度与歧义字段进入人工复核；
- 导出结果不包含未确认的产品侧修改；
- AppKey 不出现在前端代码、截图或公开文件中。

---

## 关于 GuGuData Engineering 产品案例

更多产品案例请访问 [GuGuData Engineering 产品案例](https://engineering.gugudata.com/products/)。

GuGuData Engineering 产品案例页展示基于咕咕数据接口能力构建的数据接入、业务流程和产品原型，帮助团队从真实业务场景出发，快速评估接口组合、调用方式和落地价值。
