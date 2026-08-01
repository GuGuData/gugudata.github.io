---
title: "全球大学基础信息数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/global-university"
section: "gugudata"
slug: "metadata-global-university"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-18T12:25:23.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/global-university"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/e7097aac4281f3bf4c3f1f214e1b2aa2.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/global-university](https://www.gugudata.com/api/details/global-university)

全球大学基础信息数据 API 全球高校基础信息以及专业摘要数据查询，QS排名、世界大学、国际教育等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/e7097aac4281f3bf4c3f1f214e1b2aa2.jpg)

## 1. 产品功能

- 近 7000 所世界大学最新基础数据；
- 提供全球顶尖大学详细排名信息；
- 每半个月人工手动定时更新数据；
- 包含大学基本信息、地理位置、官方网站等数据；
- 支持按国家、地区、城市多维度筛选；
- 支持模糊搜索和多字段排序；
- 数据与咕咕数据平台其他高校接口完全兼容；
- 返回每所大学可用专业数量，并内嵌最多 20 条专业摘要；
- 毫秒级响应性能；

## 2. API 文档

**接口地址:** https://api.gugudata.com/college/global-university

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/college/global-university?appkey=REDACTED&name=YOUR_VALUE&country=YOUR_VALUE&region=YOUR_VALUE&city=YOUR_VALUE&sort=YOUR_VALUE&pagesize=10&pageindex=1

**数据预览:** [https://www.gugudata.com/preview/global-university](https://www.gugudata.com/preview/global-university)

**接口测试:** [https://api.gugudata.com/college/global-university/demo](https://api.gugudata.com/college/global-university/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| name | string | 否 | YOUR_VALUE | 搜索关键字，模糊匹配大学名称或大学中文名称进行模糊匹配，参数值为空则返回所有数据 |
| country | string | 否 | YOUR_VALUE | 按国家筛选，支持模糊匹配，参数值为空则不进行筛选 |
| region | string | 否 | YOUR_VALUE | 按地区筛选，支持模糊匹配，参数值为空则不进行筛选 |
| city | string | 否 | YOUR_VALUE | 按城市筛选，支持模糊匹配，参数值为空则不进行筛选 |
| sort | string | 否 | YOUR_VALUE | 排序方式，支持的排序字段：rank（排名）、title（大学名称），排序方向：asc（升序）、desc（降序）。格式：字段名\|排序方向 |
| pagesize | int | 否 | 10 | 每页数据量，参数最大值为 20，用于控制分页 |
| pageindex | int | 否 | 1 | 页码，第几页数据，用于控制分页 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Rank | int | QS 世界大学排名 |
| Data.UniversityName | string | 大学名称 |
| Data.UniversityChineseName | string | 大学中文名称（中文翻译供参考，以英文为准） |
| Data.Country | string | 大学所在国家 |
| Data.Region | string | 大学所在地区 |
| Data.City | string | 大学所在城市 |
| Data.Logo | string | 大学校徽图片 URL |
| Data.InternationalStudents | int | 国际生数量 |
| Data.SubjectCount | int | 学科数量 |
| Data.Website | string | 大学官方网站 |
| Data.SchoolUUID | string | 咕咕数据平台大学唯一 ID，可用于查询该大学专业明细。 |
| Data.InstitutionType | string | 学校性质，可能值为公办或私立；暂未覆盖时返回空字符串。 |
| Data.ProgrammeCount | int | 该大学可查询的专业总数；没有专业明细时返回 0。 |
| Data.ProgrammeDataAvailable | boolean | 是否存在可查询的专业明细数据。 |
| Data.Programmes | array | 当前大学内嵌的专业摘要列表，最多返回 20 条；完整专业列表请使用关联接口分页查询。 |
| Data.Programmes.ProgrammeId | string | 专业唯一 ID。 |
| Data.Programmes.ProgrammeName | string | 专业名称。 |
| Data.Programmes.StudyLevel | string | 学习层级，例如 Undergraduate、Postgraduate、PhD、MBA。 |

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

- 适合用于字典与基础库查询，快速补齐产品侧需要的 全球大学基础信息数据 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[学校专业明细分页查询](https://api.gugudata.com/college/global-university-programmes)（GET），根据全球大学基础信息接口返回的 SchoolUUID，分页查询该大学下的完整专业列表。
