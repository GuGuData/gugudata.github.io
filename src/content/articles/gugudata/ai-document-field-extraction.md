---
title: "AI 文档字段结构化解析 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/document-field-extraction"
section: "gugudata"
slug: "ai-document-field-extraction"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/document-field-extraction"
cover: "https://static.gugudata.com/api-cover-document-field-extraction-v2.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/document-field-extraction](https://www.gugudata.com/api/details/document-field-extraction)

AI 文档字段结构化解析 API 从文档结构化解析出标准 JSON 数据，AI、文档解析、字段抽取、JSON等关键词场景常会用到，适合用于内容生成与智能处理、多语言文本工作流与知识服务与问答能力接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![](https://static.gugudata.com/api-cover-document-field-extraction-v2.jpg)

## 1. 产品功能

- 支持 PDF、DOCX、DOC（Word OpenXML 内容）、TXT、MD/Markdown 及纯文本输入，可覆盖合同、招投标文件、采购公告、报告、制度文件和业务申请材料等常见文档；
- 支持调用方自定义 JSON Schema 子集字段结构，按业务字段 Key 返回标准 JSON，便于系统直接入库、对账和流程编排；
- 支持多层 object、array、string、number、integer、boolean 等字段类型定义，可表达复杂文档的层级化结构化要求；
- 支持 required、title、description、format、items、properties 等常用字段约束，让字段口径、单位、格式和业务语义更清晰；
- 内置文档文本抽取能力，能够从可复制文本的 PDF、Word、Markdown 和纯文本中提取正文、段落、表格行等信息；
- 支持 OCR 触发策略配置，原生文本不足或扫描型 PDF 可按 auto、always、never 策略选择是否进行 OCR 辅助解析；
- AI 抽取结果会经过服务端 Schema 校验、类型检查和归一化处理，降低自由文本输出对下游系统造成的不确定性；
- 每个字段返回状态、原始值、归一化值、字段类型、置信度、失败原因和证据片段，便于自动化处理与人工复核；
- 支持字段级失败原因区分，可识别未找到、类型不匹配、低置信度、结果歧义、Schema 不支持和解析异常等情况；
- 返回整体解析统计，包括字段总数、成功字段数、失败字段数和成功率，便于客户侧监控解析质量和任务效果；
- 支持同步与异步两种执行模式，小文档可同步返回，大文档、扫描件或批量任务可通过 operationId 轮询获取结果；
- 支持 Demo 原始文档地址回传，开发者可以对照原文、字段值、证据片段和解析结果快速完成联调验证；
- 适用于招投标解析、采购公告入库、合同字段抽取、财务报告解析、审计材料整理、资质文件审核等高价值业务场景；
- 统一使用 DataStatus + Data 返回结构，便于与咕咕数据现有接口、Postman 集合、OpenAPI 文档和企业后端系统集成；
- 提供 7*24 小时稳定接口服务；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v1/document-extractions

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v1/document-extractions?appkey=REDACTED&text=YOUR_VALUE&schema=YOUR_VALUE&instruction=YOUR_VALUE&ocrMode=auto&executionMode=auto

**数据预览:** [https://www.gugudata.com/preview/document-field-extraction](https://www.gugudata.com/preview/document-field-extraction)

**接口测试:** [https://api.gugudata.com/v1/document-extractions/demo](https://api.gugudata.com/v1/document-extractions/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 接口鉴权参数。购买后可在控制台获取 AppKey；支持通过 Query 参数 appkey、HTTP Header X-GUGUDATA-APPKEY / X-API-Key，或 Authorization: Bearer YOUR_TOKEN 传入。生产环境建议由服务端保存和转发，不要暴露在前端代码或公开仓库。 |
| file | file | 否 | YOUR_FILE | 待解析的文档文件。接口使用 multipart/form-data 上传，file 和 text 必须二选一且不能同时传；支持 PDF、DOCX、DOC（Word OpenXML 内容）、TXT、MD/Markdown。建议优先上传可复制文本的 PDF 或 .docx；扫描版 PDF 可配合 ocrMode=auto/always；空文件、无法识别内容或不支持的传统二进制文档会返回参数错误或文件类型不支持。Demo 原始文件：https://static.gugudata.com/api-demo/document-field-extraction/report-ai-tool-procurement.doc。 |
| text | string | 否 | YOUR_VALUE | 待解析的纯文本内容。适用于调用方已完成网页抽取、OCR、文档转换或内部系统取数后的场景；file 和 text 必须二选一且不能同时传。文本建议保留标题、段落、表格行列关系、编号、金额单位和日期上下文，以提升字段定位、类型归一化和证据片段质量。 |
| schema | string | 是 | YOUR_VALUE | 字段定义 JSON 字符串，采用 JSON Schema 子集。顶层必须是 type=object，properties 中每个 key 是返回结果里的字段 key；支持 string、number、integer、boolean、object、array，以及 required、title、description、format、items、properties 等常用约束。建议使用稳定英文 key，中文展示名放 title，单位、枚举范围、抽取口径和优先章节写入 description。示例：{"type":"object","required":["projectName"],"properties":{"projectName":{"type":"string","title":"项目名称","description":"采购或招标项目名称"}}}。 |
| instruction | string | 否 | YOUR_VALUE | 可选的补充解析说明。用于描述文档背景、金额单位、日期时区、币种、大小写规则、冲突字段优先级、是否优先某个章节等业务口径；字段结构仍以 schema 为准，不建议在 instruction 中重复整份 schema。 |
| ocrMode | string | 否 | auto | OCR 触发模式，可选 auto、always、never。auto 表示系统根据原生文本密度、页数和扫描特征自动判断是否需要 OCR；always 表示即使存在原生文本也尝试 OCR；never 表示只使用原生文本。通常建议使用 auto，扫描件或图片型 PDF 可使用 always，已确认可复制文本的文档可使用 never 降低处理时间。 |
| executionMode | string | 否 | auto | 执行模式，可选 auto、sync、async。auto 表示系统根据文档大小、字符数、页数和处理耗时预估自动选择同步或异步；sync 适合小文档和低延迟调用；async 会创建异步任务并返回 operationId，适合大文档、扫描件、批量文件和后台稳定处理。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 业务状态码。100 表示请求成功；501 表示参数错误、Schema 不受支持、输入为空或文件类型不支持；504 表示 AppKey 无效或无权限；-9 表示服务端处理异常。接入时建议同时判断 HTTP 状态码和业务状态码。 |
| DataStatus.StatusDescription | string | 业务状态说明，返回本次请求的处理结果或错误提示，便于日志记录、用户提示和异常排查。 |
| DataStatus.ResponseDateTime | string | 接口响应时间，由服务端生成，可用于调用链路日志、对账和问题定位。 |
| DataStatus.DataTotalCount | int | 本次返回的数据条数。同步解析成功时通常为 1；异步任务创建成功时表示任务返回对象数量。 |
| Data.requestId | string | 本次文档解析请求 ID。同步结果和异步任务结果都会返回，可用于客户侧日志追踪、排查单次解析结果和与技术支持沟通。 |
| Data.mode | string | 执行模式结果。sync 表示已同步完成并返回字段结果；async 表示已创建异步任务或返回异步任务结果。 |
| Data.document.fileName | string | 文档文件名。file 上传时来自上传文件名；text 输入时可为空，用于区分不同来源的解析结果。 |
| Data.document.contentType | string | 上传文件的 Content-Type，例如 application/pdf、application/vnd.openxmlformats-officedocument.wordprocessingml.document、text/plain 等。 |
| Data.document.extension | string | 服务端识别到的文档扩展名或解析类型，例如 .pdf、.docx、.txt、.md、text 等。 |
| Data.document.pageCount | int | 文档页数或解析页数估计值。PDF 通常返回实际页数，Word、TXT、Markdown 和纯文本通常按解析结果返回。 |
| Data.document.charCount | int | 服务端抽取到并参与 AI 解析的文本字符数，可用于判断文档是否为空、是否需要 OCR 或是否超出同步处理范围。 |
| Data.document.textExtraction.method | string | 文本来源方式。native 表示原生文本抽取，ocr 表示 OCR 识别，text 表示调用方直接传入纯文本。 |
| Data.document.textExtraction.sectionCount | int | 文本分段数量，通常对应段落、表格行、页面片段或 OCR 分段，可辅助判断解析覆盖范围。 |
| Data.summary.totalFields | int | schema 中需要解析的字段总数，包含嵌套对象和数组中的叶子字段。 |
| Data.summary.succeededFields | int | 成功解析并通过类型校验、归一化处理的字段数量。 |
| Data.summary.failedFields | int | 未能成功解析的字段数量，包括未找到、类型不匹配、低置信度、结果歧义、Schema 不支持或解析异常。 |
| Data.summary.successRate | number | 字段解析成功率，取值 0 到 1，计算方式为 succeededFields / totalFields，可用于质量监控和自动化阈值判断。 |
| Data.values | object | 字段解析结果对象。key 与 schema.properties 中的字段 key 保持一致，value 为字段级解析结果。 |
| Data.values.{field}.status | string | 字段级状态。可能值包括 SUCCEEDED、NOT_FOUND、TYPE_MISMATCH、LOW_CONFIDENCE、AMBIGUOUS、UNSUPPORTED_SCHEMA、EXTRACTION_ERROR。 |
| Data.values.{field}.value | any | 从文档中抽取到的原始字段值，尽量保留文档原始表达，例如 70万元、2026年7月29日09点30分、企业全称等。 |
| Data.values.{field}.normalizedValue | any | 按 schema 类型和字段语义归一化后的值，例如金额数字、标准日期时间、布尔值、整数、数组或对象；当字段未找到或类型不匹配时可能为 null。 |
| Data.values.{field}.type | string | 该字段在 schema 中声明的类型，用于客户侧做二次校验、映射和入库。 |
| Data.values.{field}.confidence | number | 字段级置信度，取值 0 到 1。数值越高表示模型越确定；低于阈值时建议进入人工复核或重试流程。 |
| Data.values.{field}.reason | string | 字段失败、低置信度或存在歧义时的原因说明；成功字段通常为空。 |
| Data.values.{field}.evidence[].source | string | 证据片段来源位置，例如 page:1、paragraph:3、table:2:row:5 或 section:1，便于回看原文。 |
| Data.values.{field}.evidence[].text | string | 支持该字段值的简短原文证据片段，便于人工核对和审计留痕。 |
| Data.failedFields[].path | string | 解析失败字段路径。嵌套字段会使用点路径表示，例如 supplier.name 或 items.amount。 |
| Data.failedFields[].status | string | 失败字段状态，取值同字段级 status，用于客户侧按失败类型分流处理。 |
| Data.failedFields[].reason | string | 失败字段原因，例如文档中未找到、提取值与类型不匹配、置信度过低或结果存在歧义。 |
| Data.warnings[] | string | 非致命警告信息。例如 OCR 服务不可用但已使用原生文本解析、OCR 未识别出更多文本等。 |
| Data.sourceDocumentUrl | string | Demo 接口返回的原始示例文档地址，方便开发者对照原文件、证据片段和解析结果；正式接口通常不返回该字段。 |
| Data.operationId | string | 异步模式下返回的任务 ID。调用方可使用 pollingUrl 或现有 operation 查询接口轮询任务状态。 |
| Data.status | string | 异步任务状态，例如 PENDING、RUNNING、SUCCEEDED、FAILED、EXPIRED。同步模式下通常不返回该字段。 |
| Data.pollingUrl | string | 异步任务轮询地址，例如 /ai/operations/{operationId}。任务成功后返回同一套文档解析结果结构。 |
| Data.expiresAt | string | 异步任务过期时间，超过该时间后任务记录可能被清理，建议客户侧及时轮询和持久化结果。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 请求成功 | 文档字段解析成功，或异步任务创建成功。 |
| 501 | 参数错误或 schema 不受支持 | 常见原因包括缺少 appkey、file 和 text 未二选一、schema 不是合法 JSON、schema 字段类型不受支持、上传文件为空或文件格式不支持。 |
| 504 | APPKEY 错误或无权限 | AppKey 不存在、已过期、未购买当前接口或没有当前接口调用权限。 |
| -9 | 处理异常 | 服务端解析、OCR、AI 抽取或异步任务处理过程中发生异常，可稍后重试或联系技术支持。 |

## 6. 适用场景

- 适合用于内容生成与智能处理，快速补齐产品侧需要的 AI 文档字段结构化解析 数据能力。
- 适合用于多语言文本工作流，减少手工整理、清洗与重复开发成本。
- 适合用于知识服务与问答能力接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[文章自然润色](https://www.gugudata.com/api/details/article-polishing)，适合补充同类场景的接口能力。
- 可搭配使用：[多语言 AI 翻译](https://www.gugudata.com/api/details/multilingual-translation)，适合补充同类场景的接口能力。
- 可搭配使用：[个人可识别信息(PII) AI 去除](https://www.gugudata.com/api/details/pii-removal)，适合补充同类场景的接口能力。
