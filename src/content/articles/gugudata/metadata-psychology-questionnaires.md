---
title: "职业与发展心理测评问卷 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/psychology-questionnaires"
section: "gugudata"
slug: "metadata-psychology-questionnaires"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/psychology-questionnaires"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/af09c4a2c2a9df8167dc4c2e61bed692.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/psychology-questionnaires](https://www.gugudata.com/api/details/psychology-questionnaires)

职业与发展心理测评问卷 API 职业发展心理测评题库，心理测评、原创题库、职业发展、高考心理等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/af09c4a2c2a9df8167dc4c2e61bed692.png)

## 1. 产品功能

- 支持检索职业与发展心理测评问卷元数据；
- 返回问卷编码、名称、题量、维度和来源，便于后续发起测评或展示问卷库；
- keyword 可按名称、英文名或描述进行筛选；
- 适合职业规划、人才测评、教育咨询和成长发展类产品接入；
- 围绕“职业与发展心理测评问卷”提供标准化能力，便于快速接入现有业务；
- 适合将“职业与发展心理测评问卷”结果接入业务系统、后台工具和自动化流程；
- 适合高考、考研、招生和院校信息产品接入；
- 可与院校、专业、分数线和招生计划接口组合分析；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v1/psychology/questionnaires

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v1/psychology/questionnaires?appkey=REDACTED&keyword=YOUR_VALUE&pageIndex=1&pageSize=20

**数据预览:** [https://www.gugudata.com/preview/psychology-questionnaires](https://www.gugudata.com/preview/psychology-questionnaires)

**接口测试:** [https://api.gugudata.com/v1/psychology/questionnaires/demo](https://api.gugudata.com/v1/psychology/questionnaires/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| keyword | string | 否 | YOUR_VALUE | 问卷名称、英文名或描述关键词。 |
| pageIndex | int | 否 | 1 | 分页页码，从 1 开始。 |
| pageSize | int | 否 | 20 | 每页数量。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.QuestionnaireCode | string | 问卷编码。 |
| Data.QuestionnaireName | string | 问卷中文名称。 |
| Data.QuestionnaireNameEn | string | 问卷英文名称。 |
| Data.Description | string | 问卷简介。 |
| Data.QuestionCount | int | 题目数量。 |
| Data.Dimensions | array | 测评维度列表。 |
| Data.Source | string | 问卷来源或参考体系。 |
| Data.UseCount | int | 使用次数。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 501 | 参数错误 | 检查必填参数、问卷编码、答案格式（answers 必须为对象且包含全部题号） |
| 502 | 请求频率受限 | 网关/CDN 可能返回 429 或业务状态码 502 |
| 503 | 账号欠费或订单过期 | 请前往开发者中心检查订单有效期 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确 |
| 900 | 服务器内部错误 | 请联系技术支持 |

## 6. 适用场景

- 适合用于字典与基础库查询，快速补齐产品侧需要的 职业与发展心理测评问卷 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[获取问卷详情](https://api.gugudata.com/v1/psychology/questionnaires/{{questionnaireCode}})（GET），获取指定问卷的详细信息和所有题目。
- 相关接口：[提交测试答案](https://api.gugudata.com/v1/psychology/tests)（POST），提交用户答案，自动计算得分并生成测评结果。
- 相关接口：[查询测试结果](https://api.gugudata.com/v1/psychology/tests/{{testId}})（GET），根据测试ID查询测试结果详情。
- 相关接口：[用户测试历史](https://api.gugudata.com/v1/psychology/tests)（GET），查询用户的历史测试记录列表，支持按问卷类型过滤。
