---
title: "全国大学高校专业数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/ceemajor"
section: "gugudata"
slug: "metadata-ceemajor"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/ceemajor"
cover: "https://static.gugudata.com/api_logo_colleges-2d957b38f6.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/ceemajor](https://www.gugudata.com/api/details/ceemajor)

全国大学高校专业数据 API 大学专业多维基础数据，基础数据、高校高考等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_logo_colleges-2d957b38f6.jpg)

## 1. 产品功能

- 提供最新全国高校专业基本信息；
- 数据定时自动更新与校正；
- 同时包含专业开设课程列表；
- 毫秒级响应性能；
- 围绕“全国大学高校专业数据”提供标准化能力，便于快速接入现有业务；
- 适合将“全国大学高校专业数据”结果接入业务系统、后台工具和自动化流程；
- 适合高考、考研、招生和院校信息产品接入；
- 可与院校、专业、分数线和招生计划接口组合分析；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/ceemajor

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/ceemajor?appkey=REDACTED&keywords=YOUR_VALUE&pagesize=10&pageindex=1

**数据预览:** [https://www.gugudata.com/preview/ceemajor](https://www.gugudata.com/preview/ceemajor)

**接口测试:** [https://api.gugudata.com/metadata/ceemajor/demo](https://api.gugudata.com/metadata/ceemajor/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| keywords | string | 否 | YOUR_VALUE | 搜索关键字，模糊匹配专业名称、学科、专业介绍、开设课程。参数值为空则分页返回所有数据 |
| pagesize | int | 否 | 10 | 每页数据量，参数最大值为 20 |
| pageindex | int | 否 | 1 | 页码，第几页数据，第一页从 1 开始 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.EducationLevel | string | 学历层次 |
| Data.DisciplinaryCategory | string | 学科门类 |
| Data.DisciplinarySubCategory | string | 学科专业类 |
| Data.MajorCode | string | 专业代码 |
| Data.MajorName | string | 专业名称 |
| Data.MajorIntroduction | string | 专业介绍 |
| Data.Courses.CourseName | string | 开设课程名称 |
| Data.Courses.CourseDifficulty | string | 开设课程难度 |
| Data.GraduateScale | string | 全国普通高校毕业生规模 （概略数据） |
| Data.MaleFemaleRatio | string | 男女比例 （概略数据） |
| Data.RecommendSchools | string[] | 推荐院校列表 |
| Data.JobWorkingDetails | string[] | 工作职位推荐 |
| Data.LimitYear | string | 学习年限 |
| Data.Degree | string | 学位能力 |
| Data.SpecialSchools | string[] | 专业顶尖高校 |

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

- 适合用于字典与基础库查询，快速补齐产品侧需要的 全国大学高校专业数据 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
