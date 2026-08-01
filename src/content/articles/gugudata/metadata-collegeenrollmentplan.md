---
title: "历年高校招生计划数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/collegeenrollmentplan"
section: "gugudata"
slug: "metadata-collegeenrollmentplan"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/collegeenrollmentplan"
cover: "https://static.gugudata.com/api_college_enrollment_plan.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/collegeenrollmentplan](https://www.gugudata.com/api/details/collegeenrollmentplan)

历年高校招生计划数据 API 各高校历年招生计划数据，基础数据、高校招生等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_college_enrollment_plan.jpg)

## 1. 产品功能

- 2026 年数据已更新完毕；
- 支持历年高校招生计划数据查询，包含 2018 年至 2026 年数据；
- 包含各高校招生计划详细数据，百万级数据；
- 多维度查询条件支持；
- 毫秒级查询性能；
- 围绕“历年高校招生计划数据”提供标准化能力，便于快速接入现有业务；
- 适合将“历年高校招生计划数据”结果接入业务系统、后台工具和自动化流程；
- 适合高考、考研、招生和院校信息产品接入；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/college-enrollment-plan

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/college-enrollment-plan?appkey=REDACTED&collegemajorname=YOUR_VALUE&year=YOUR_VALUE&pageIndex=1&pageSize=10&schoolname=YOUR_VALUE&provincename=YOUR_VALUE&classone=YOUR_VALUE&classtwo=YOUR_VALUE&batchname=YOUR_VALUE&type=YOUR_VALUE&schooluuid=YOUR_VALUE&minTuition=YOUR_VALUE&maxTuition=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/collegeenrollmentplan](https://www.gugudata.com/preview/collegeenrollmentplan)

**接口测试:** [https://api.gugudata.com/metadata/college-enrollment-plan/demo](https://api.gugudata.com/metadata/college-enrollment-plan/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| collegemajorname | string | 否 | YOUR_VALUE | 查询的高校专业名称，支持模糊查询。 |
| year | int | 是 | YOUR_VALUE | 查询的招生年份，当前支持 2018 至 2026；2026 数据随各省发布进度持续补齐。 |
| pageIndex | int | 是 | 1 | 分页页码，从 1 开始。 |
| pageSize | int | 是 | 10 | 每页数量，取值范围为 1~100。 |
| schoolname | string | 否 | YOUR_VALUE | 高校名称，支持模糊查询。 |
| provincename | string | 否 | YOUR_VALUE | 招生省份名称，可先调用关联接口获取当前年份可用省份。 |
| classone | string | 否 | YOUR_VALUE | 专业门类/一级分类，可先调用关联接口获取可用枚举。 |
| classtwo | string | 否 | YOUR_VALUE | 专业类/二级分类，可先调用关联接口获取可用枚举。 |
| batchname | string | 否 | YOUR_VALUE | 录取批次名称，可先调用关联接口获取当前年份和省份下的可用批次。 |
| type | string | 否 | YOUR_VALUE | 科类/选科类型，可先调用关联接口获取当前年份和省份下的可用科类。 |
| schooluuid | string | 否 | YOUR_VALUE | 高校唯一标识，适合与高校基础数据、分数线接口进行关联。 |
| minTuition | number | 否 | YOUR_VALUE | 最低学费筛选，单位通常为元/学年；为空时不筛选。 |
| maxTuition | number | 否 | YOUR_VALUE | 最高学费筛选，单位通常为元/学年；为空时不筛选。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求参数字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算。 |
| Data.DataId | string | 招生计划明细唯一标识。 |
| Data.InSchoolYears | string | 学制年限。 |
| Data.ClassOne | string | 专业门类/一级分类。 |
| Data.ClassTwo | string | 专业类/二级分类。 |
| Data.BatchName | string | 录取批次名称。 |
| Data.Type | string | 招生科类/选科类型。 |
| Data.SchoolName | string | 高校名称。 |
| Data.RecruitCode | string | 院校招生代码。 |
| Data.EnrollmentNumbers | string | 计划招生人数。 |
| Data.SchoolUUID | string | 高校唯一标识。 |
| Data.CourseSelectionRequirements | string | 选科要求。 |
| Data.CollegeMajorName | string | 招生计划中的专业名称与说明。 |
| Data.ShortCollegeMajorName | string | 专业名称短名称。 |
| Data.CollegeMajorCode | string | 标准专业代码/专业目录代码；部分源数据可能为空或不适用。 |
| Data.LocalMajorCode | string | 招生目录中的本地专业代码；不等同于 CollegeMajorCode 标准专业代码。 |
| Data.major_category | object | AI 解析的专业分类结果。 |
| Data.included_majors | array | AI 解析出的包含专业列表。 |
| Data.campus | string | AI 解析出的校区信息。 |
| Data.special_requirements | string | AI 解析出的特殊要求。 |
| Data.Tuition | string | 学费，单位通常为元/学年；以源数据文本为准。 |
| Data.Year | int | 招生年份。 |
| Data.ProvinceName | string | 招生省份。 |
| Data.SpecialGroup | string | 专业组/招生组标识；为空表示该省份或批次不适用。 |
| Data.SpecialCode | string | 招生计划明细中的专业代码/专业组内代码；不等同于标准专业代码。 |
| Data.SpecialGroupName | string | 专业组名称，例如（03）。 |

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

- 适合用于字典与基础库查询，快速补齐产品侧需要的 历年高校招生计划数据 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[历年高校招生计划数据-查询参数枚举](https://api.gugudata.com/metadata/college-enrollment-plan/enums)（GET），查询指定年份和省份下招生计划可用的专业门类、专业类、批次、科类和选科枚举。
- 相关接口：[历年高校招生计划数据-院校招生代码查询](https://api.gugudata.com/metadata/college-enrollment-plan/recruit-codes)（GET），查询指定年份、招生省份、批次、科类和院校对应的院校招生代码，并返回计划招生人数、专业数量及内部招生专业代码，便于和招生计划明细一起核验。 返回字段 RecruitCodeReason 用于说明同一院校不同院校代码的区分原因。
