---
title: "AI RAG 文档知识库问答 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/knowledge-chat"
section: "gugudata"
slug: "ai-knowledge-chat"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/knowledge-chat"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/c55e476b25a62031034e4f201dd6469c.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/knowledge-chat](https://www.gugudata.com/api/details/knowledge-chat)

AI RAG 文档知识库问答 API 支持将 API 文档、产品说明、帮助文档和协议资料构建为私有知识库，并基于已上传文档进行智能问答。AI、RAG、知识库、文档问答和流式响应等关键词场景常会用到，适合用于客服问答、开发者门户、内部知识系统、产品文档检索和多轮咨询等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/c55e476b25a62031034e4f201dd6469c.jpg)

## 1. 产品功能

- 支持上传 API 文档、产品说明、协议和帮助文档等资料构建私有知识库；
- 支持 PDF、TXT、Markdown、HTML 和 DOCX 文档上传；
- 上传后返回 document_id、解析状态、分块数量和入库状态，便于客户侧确认知识库构建结果；
- 支持知识库分组与客户侧业务分组，适合多产品、多项目或多客户场景；
- 支持基于线程的连续追问，适合嵌入客服、开发者门户和内部知识系统；
- 支持 OpenAI Chat Completions 兼容 JSON 与 SSE 流式响应；
- 回答结果包含引用来源，便于追溯内容依据；
- 客户文档仅用于当前知识库问答，不用于训练公共模型；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/knowledge-bases/{knowledge_base_id}/chat/completions

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/knowledge-bases/default/chat/completions?appkey=REDACTED

**数据预览:** [https://www.gugudata.com/preview/knowledge-chat](https://www.gugudata.com/preview/knowledge-chat)

**接口测试:** [https://api.gugudata.com/ai/knowledge-bases/default/chat/completions](https://api.gugudata.com/ai/knowledge-bases/default/chat/completions)

**OpenAPI:** [https://www.gugudata.com/openapi/gugudata.openapi.3.1.json](https://www.gugudata.com/openapi/gugudata.openapi.3.1.json)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| knowledge_base_id | string | 是 | default | URL 路径中的知识库标识 |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。推荐通过 Query 参数或 Header 传递 |
| model | string | 否 | gugudata-knowledge-chat | OpenAI Chat Completions 兼容模型名称 |
| messages | array | 是 | [{"role":"user","content":"有哪些接口？"}] | OpenAI Chat Completions 兼容消息数组，通过 JSON body 传递 |
| thread_id | string | 否 | YOUR_VALUE | 对话线程 ID，不传时自动创建新线程 |
| tenant_id | string | 否 | default | 客户侧业务分组标识 |
| stream | boolean | 否 | false | 是否使用 SSE 流式响应 |
| top_k | int | 否 | 6 | 检索引用片段数量 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| id | string | 当前回答消息 ID |
| object | string | OpenAI 兼容响应对象类型 |
| thread_id | string | 当前对话线程 ID |
| choices[0].message.content | string | 基于已上传文档生成的回答 |
| sources | array | 回答引用的文档来源片段 |
| usage | object | 本次请求的使用量摘要 |
| DataStatus.StatusCode | int | 接口返回状态码，100 表示成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 请求成功 | 接口正常返回 |
| 501 | 参数错误 | 请检查请求参数、文件大小或文件格式是否符合要求 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确 |
| -1 | 请求失败 | 知识库处理或问答过程中发生异常，请稍后重试 |

## 6. 适用场景

- 适合用于客服知识库、帮助中心和开发者门户，将产品文档、接口文档和常见问题快速转化为可问答能力。
- 适合用于企业内部知识检索、多项目资料管理和团队资料查询，减少人工查找、重复解释和上下文整理成本。
- 适合用于私有文档问答、多轮咨询和流式回复场景，将回答内容、引用来源和线程上下文直接接入业务系统。

## 7. 相关接口

### 7.1 同一接口族关联接口

| 接口名称 | 请求方式 | 资源路径 | 主要用途 |
| --- | --- | --- | --- |
| AI RAG 文档知识库问答 | POST | /ai/knowledge-bases/{knowledge_base_id}/chat/completions | 基于已上传文档进行知识库问答，支持多轮对话、引用来源和流式响应 |
| 上传知识库文档 | POST | /ai/knowledge-bases/{knowledge_base_id}/documents | 上传 PDF、TXT、Markdown、HTML、DOCX 等文档并构建私有知识库 |

其中 AI RAG 文档知识库问答为本文主接口，完整请求参数和返回参数见第 3、4 节；以下展开上传知识库文档接口。

#### 上传知识库文档

上传文档并构建私有知识库，适合在发起问答前导入 API 文档、产品说明、帮助文档、协议资料等内容。

**接口地址:** https://api.gugudata.com/ai/knowledge-bases/{knowledge_base_id}/documents

**请求方式:** POST

**请求协议:** HTTPS

**请求参数:**

| 参数名 | 参数类型 | 是否必须 | 备注 |
| --- | --- | --- | --- |
| knowledge_base_id | string | 是 | URL 路径中的知识库标识，默认可使用 default |
| appkey | string | 是 | 付费后获取的 APPKEY |
| files | array | 是 | 待上传文档，支持 PDF、TXT、Markdown、HTML 和 DOCX；单次最多 5 个文件，单文件最大 20MB |
| tenant_id | string | 否 | 客户侧业务分组标识，不传时使用 default |
| metadata | object | 否 | 客户自定义元数据，需为 JSON 对象 |
| replace_existing | boolean | 否 | 是否替换同知识库下已有同名文档，默认 false |

**返回参数:**

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码，100 表示成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| DataStatus.RequestParameter | string | 本次请求的参数摘要 |
| Data.knowledge_base_id | string | 知识库标识 |
| Data.documents[].document_id | string | 文档 ID |
| Data.documents[].file_name | string | 文件名称 |
| Data.documents[].file_size | int | 文件大小，单位为字节 |
| Data.documents[].status | string | 文档处理状态 |
| Data.documents[].parse_status | string | 文档解析状态 |
| Data.documents[].index_status | string | 索引入库状态 |
| Data.documents[].chunk_count | int | 文档分块数量 |
| Data.documents[].token_estimate | int | 文档内容的 token 估算数量 |

### 7.2 可搭配使用

- 可搭配使用：[语义化获取站点 JSON 结构内容](https://www.gugudata.com/api/details/url2json)，适合先从网页中抽取结构化内容，再沉淀到知识库或业务流程。
- 可搭配使用：[文章抽取信息化 JSON](https://www.gugudata.com/api/details/article-extract)，适合补充网页文章内容抽取和知识资料整理能力。
- 可搭配使用：[高考教育信息智能助手](https://www.gugudata.com/api/details/gaokao-chat)，适合补充教育信息问答和 RAG 问答类场景的接口能力。
