---
title: "全国中学基础信息 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/middleschool"
section: "gugudata"
slug: "metadata-middleschool"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/middleschool"
cover: "https://static.gugudata.com/aip_cover_metadata_middle-school_v2.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/middleschool](https://www.gugudata.com/api/details/middleschool)

全国中学基础信息 API 提供全国初级高级中学基础数据，基础数据、高校高考等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/aip_cover_metadata_middle-school_v2.jpg)

## 1. 产品功能

- 2026 年数据已更新，提供最新全国中学学校基本信息；
- 包含全国初级中学与高等中学；
- 总计近 10 万条全国中学精准数据；
- 每月一次数据自动更新校正；
- 包含学校各类属性信息；
- 毫秒级响应性能；
- 围绕“全国中学基础信息”提供标准化能力，便于快速接入现有业务；
- 适合将“全国中学基础信息”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/middle-school

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/middle-school?appkey=REDACTED&pageIndex=1&pageSize=10&schoolType=ALL&schoolName=YOUR_VALUE&provinceName=YOUR_VALUE&cityName=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/middleschool](https://www.gugudata.com/preview/middleschool)

**接口测试:** [https://api.gugudata.com/metadata/middle-school/demo](https://api.gugudata.com/metadata/middle-school/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| pageIndex | int | 是 | 1 | 页码，第几页数据 |
| pageSize | int | 是 | 10 | 每页数据量，参数最大值为 20 |
| schoolType | string | 否 | ALL | 中学类型：ALL (不限制) \| MIDDLE_SCHOOL (初级中学) \| HIGH_SCHOOL (高级中学) |
| schoolName | string | 否 | YOUR_VALUE | 学校名称，模糊搜索，参数默认值为空，不进行筛选 |
| provinceName | string | 否 | YOUR_VALUE | 学校所在省份，参数默认值为空，不进行筛选 |
| cityName | string | 否 | YOUR_VALUE | 学校所在城市，参数默认值为空，不进行筛选 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| RequestParameter | string | 接口请求参数 |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Id | string | 数据全局唯一 ID，仅用于标识数据的唯一 |
| Data.SchoolName | string | 中学学校名称 |
| Data.SchoolType | string | 中学类型 |
| Data.Province | string | 学校所在省份 |
| Data.City | string | 学校所在城市 |
| Data.District | string | 学校所在区县 |
| Data.Address | string | 学校地址 |
| Data.PostalCode | string | 学校邮政编码 |
| Data.PhoneCode | string | 学校电话区号 |

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

- 适合用于字典与基础库查询，快速补齐产品侧需要的 全国中学基础信息 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
