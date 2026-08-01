---
title: "历年高考一分一段数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/ceeline-one-score-one-section"
section: "gugudata"
slug: "metadata-ceeline-one-score-one-section"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/ceeline-one-score-one-section"
cover: "https://static.gugudata.com/api_ceeline_one_score_one_section_v2.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/ceeline-one-score-one-section](https://www.gugudata.com/api/details/ceeline-one-score-one-section)

历年高考一分一段数据 API 高考一分一段查询，基础数据、高校招生等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_ceeline_one_score_one_section_v2.jpg)

## 1. 产品功能

- 2026 年数据已更新完毕；
- 历年数据第一时间手动校对更新；
- 支持全国各省份高考分数线一分一段表查询；
- 包含历年同分段与同位次分数对比数据；
- 支持物理类、历史类等不同科目选择类型；
- 支持按分数查询对应分数段和位次；
- 围绕“历年高考一分一段数据”提供标准化能力，便于快速接入现有业务；
- 适合将“历年高考一分一段数据”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/ceeline/one-score-one-section

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/ceeline/one-score-one-section?appkey=REDACTED&year=YOUR_VALUE&provinceName=YOUR_VALUE&subjectSelection=YOUR_VALUE&isArtLine=false&artLineType=YOUR_VALUE&pageIndex=1&pageSize=10&score=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/ceeline-one-score-one-section](https://www.gugudata.com/preview/ceeline-one-score-one-section)

**接口测试:** [https://api.gugudata.com/metadata/ceeline/one-score-one-section/demo](https://api.gugudata.com/metadata/ceeline/one-score-one-section/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| year | string | 是 | YOUR_VALUE | 查询的年份，如 2020、2021、2022、2023、2024、2025、2026 |
| provinceName | string | 是 | YOUR_VALUE | 省份名称，如：北京、上海、江苏等 |
| subjectSelection | string | 是 | YOUR_VALUE | 科目选择类型，如：物理类、历史类等，需要注意对应的年份和省份下，科目选择类型可能不同 |
| isArtLine | boolean | 否 | false | 是否查询艺术类一分一段数据；true 表示查询艺术类，false 或不传表示查询普通类。 |
| artLineType | string | 否 | YOUR_VALUE | 艺术类数据的分数线类型，isArtLine=true 时可传；例如：统考成绩排名。 |
| pageIndex | int | 否 | 1 | 分页参数，第几页，默认值为1 |
| pageSize | int | 否 | 10 | 分页参数，每页条数，取值范围在 1 ~ 100 之间（含） |
| score | number | 否 | YOUR_VALUE | 按高考分数查询对应分数段和位次，支持整数或小数；为空时返回分页列表。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.ExaminationScore | string | 高考分数 |
| Data.CandidateCount | int | 该分数考生人数 |
| Data.TotalCandidates | int | 累计考生人数 |
| Data.RankingRange | string | 位次范围 |
| Data.AdmissionBatchName | string | 录取批次名称 |
| Data.MinimumAdmissionScore | string | 最低录取控制分数线 |
| Data.Ranking | string | 位次 |
| Data.HistoricalScores | array | 历年同分段数据 |
| Data.HistoricalSameRankScores | array | 历年同位次分数 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | - |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于字典与基础库查询，快速补齐产品侧需要的 历年高考一分一段数据 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[历年高考一分一段数据-查询参数枚举](https://api.gugudata.com/metadata/ceeline/one-score-one-section/enums)（GET），返回 subjectSelection、artLineType 的枚举集合。
- 相关接口：[历年高考一分一段数据-查询参数枚举](https://api.gugudata.com/metadata/ceeline/one-score-one-section/enums)（GET），返回 subjectSelection、artLineType 的枚举集合。
- 相关接口：[历年高考一分一段数据-科目类型枚举（兼容路由）](https://api.gugudata.com/metadata/one-score-one-section/subject-selection-enums)（GET），兼容路由，返回按省份与年份组织的 subjectSelection 枚举数据。
