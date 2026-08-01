---
title: "高校评分实时分析与推荐 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/college-score"
section: "gugudata"
slug: "ai-college-score"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/college-score"
cover: "https://static.gugudata.com/api-cover-college-score-v2.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/college-score](https://www.gugudata.com/api/details/college-score)

高校评分实时分析与推荐 API 高校评分与推荐分析，基础数据、高校高考等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-cover-college-score-v2.png)

## 1. 产品功能

- POST JSON body 传入 universityName，支持中文或英文高校名称；
- 返回综合评分、6 个维度分项得分、分项分析、综合评价和推荐理由；
- 支持 streaming=true 使用 SSE 流式返回评分过程，streaming=false 返回标准 JSON；
- 适合院校对比、择校推荐、学校详情页评分摘要等场景；
- 围绕“高校评分实时分析与推荐”提供标准化能力，便于快速接入现有业务；
- 适合将“高校评分实时分析与推荐”结果接入业务系统、后台工具和自动化流程；
- 适合高考、考研、招生和院校信息产品接入；
- 可与院校、专业、分数线和招生计划接口组合分析；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/college-score

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/college-score?appkey=REDACTED&universityName=YOUR_VALUE&streaming=false

**数据预览:** [https://www.gugudata.com/preview/college-score](https://www.gugudata.com/preview/college-score)

**接口测试:** [https://api.gugudata.com/ai/college-score/demo](https://api.gugudata.com/ai/college-score/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| universityName | string | 是 | YOUR_VALUE | 请求体 JSON 字段，需要评分分析的大学名称，可以传中文名、英文名、简称或全称。 |
| streaming | boolean | 否 | false | Query 参数，是否启用流式输出，默认 false；true 时响应为 SSE，false 时返回标准 JSON。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算。 |
| Data.university | string | 参与评分的大学名称。 |
| Data.scores.academic_reputation | int | 学术声誉得分。 |
| Data.scores.employment_prospects | int | 就业前景得分。 |
| Data.scores.tuition_and_scholarships | int | 学费与奖助体系得分。 |
| Data.scores.student_life_and_campus | int | 学生生活与校园环境得分。 |
| Data.scores.programs_and_curriculum | int | 学科专业与课程设置得分。 |
| Data.scores.teaching_quality | int | 教学质量得分。 |
| Data.total_score | int | 综合评分，范围 0~100。 |
| Data.analysis.academic_reputation | string | 学术声誉维度分析。 |
| Data.analysis.employment_prospects | string | 就业前景维度分析。 |
| Data.analysis.tuition_and_scholarships | string | 学费与奖助体系维度分析。 |
| Data.analysis.student_life_and_campus | string | 学生生活与校园环境维度分析。 |
| Data.analysis.programs_and_curriculum | string | 学科专业与课程设置维度分析。 |
| Data.analysis.teaching_quality | string | 教学质量维度分析。 |
| Data.long_recommendation | string | 院校推荐理由与适配建议。 |
| Data.long_summary | string | 综合评价总结。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请检查传递的参数是否完整 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于字典与基础库查询，快速补齐产品侧需要的 高校评分实时分析与推荐 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
