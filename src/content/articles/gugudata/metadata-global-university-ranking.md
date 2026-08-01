---
title: "全球 QS 世界大学排名数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/global-university-ranking"
section: "gugudata"
slug: "metadata-global-university-ranking"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/global-university-ranking"
cover: "https://static.gugudata.com/api_global_university_ranking.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/global-university-ranking](https://www.gugudata.com/api/details/global-university-ranking)

全球 QS 世界大学排名数据 API QS 世界大学排名数据检索，高等教育等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_global_university_ranking.png)

## 1. 产品功能

- 覆盖 QS 世界大学综合排名数据，数据总量以 DataStatus.DataTotalCount 为准；
- 支持英文校名、中文校名及常见国家、城市中文别名搜索，例如 MIT、清华、美国、伦敦；
- 返回综合排名、地区、国家、城市、学校 Logo，以及学术声誉、雇主声誉、师生比例、论文引用、就业成果、国际化、可持续发展等排名与得分；
- pageIndex 从 1 开始，pageSize 取值范围 1~20；
- 围绕“全球 QS 世界大学排名数据”提供标准化能力，便于快速接入现有业务；
- 适合将“全球 QS 世界大学排名数据”结果接入业务系统、后台工具和自动化流程；
- 适合高考、考研、招生和院校信息产品接入；
- 可与院校、专业、分数线和招生计划接口组合分析；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/global-university-ranking

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/global-university-ranking?appkey=REDACTED&name=YOUR_VALUE&pageIndex=1&pageSize=10

**数据预览:** [https://www.gugudata.com/preview/global-university-ranking](https://www.gugudata.com/preview/global-university-ranking)

**接口测试:** [https://api.gugudata.com/metadata/global-university-ranking/demo](https://api.gugudata.com/metadata/global-university-ranking/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| name | string | 否 | YOUR_VALUE | 学校名称关键词，支持英文校名、中文校名以及部分国家、城市中文别名模糊搜索；不传则返回全部排名数据。例如：MIT、清华、美国、London。 |
| pageIndex | int | 否 | 1 | 分页页码，从 1 开始，默认值为 1。 |
| pageSize | int | 否 | 10 | 每页返回条数，默认值为 10，取值范围为 1~20。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算。 |
| Data.Id | string | 咕咕数据平台大学唯一标识。 |
| Data.UniversityName | string | 大学英文名称。 |
| Data.UniversityChineseName | string | 大学中文名称，海外大学中文译名仅供参考，以英文名称为准。 |
| Data.Region | string | 所在大洲或区域。 |
| Data.Country | string | 所在国家或地区。 |
| Data.City | string | 所在城市。 |
| Data.LogoUrl | string | 大学 Logo 图片地址。 |
| Data.Rank | string | QS 综合排名；可能包含并列或区间排名文本，以字符串返回。 |
| Data.AcademicReputationRank | string | 学术声誉指标排名。 |
| Data.AcademicReputationScore | string | 学术声誉指标得分。 |
| Data.CitationsPerFacultyRank | string | 篇均教员引用指标排名。 |
| Data.CitationsPerFacultyScore | string | 篇均教员引用指标得分。 |
| Data.FacultyStudentRatioRank | string | 师生比例指标排名。 |
| Data.FacultyStudentRatioScore | string | 师生比例指标得分。 |
| Data.EmployerReputationRank | string | 雇主声誉指标排名。 |
| Data.EmployerReputationScore | string | 雇主声誉指标得分。 |
| Data.EmploymentOutcomesRank | string | 就业成果指标排名。 |
| Data.EmploymentOutcomesScore | string | 就业成果指标得分。 |
| Data.InternationalStudentRatioRank | string | 国际学生比例指标排名。 |
| Data.InternationalStudentRatioScore | string | 国际学生比例指标得分。 |
| Data.InternationalResearchNetworkRank | string | 国际研究网络指标排名。 |
| Data.InternationalResearchNetworkScore | string | 国际研究网络指标得分。 |
| Data.InternationalFacultyRatioRank | string | 国际教师比例指标排名。 |
| Data.InternationalFacultyRatioScore | string | 国际教师比例指标得分。 |
| Data.SustainabilityRank | string | 可持续发展指标排名。 |
| Data.SustainabilityScore | string | 可持续发展指标得分。 |

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

- 适合用于字典与基础库查询，快速补齐产品侧需要的 全球 QS 世界大学排名数据 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
