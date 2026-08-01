---
title: "职教高考及高职分类招生控制线 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/vocationalcontrollines"
section: "gugudata"
slug: "metadata-vocationalcontrollines"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-05-23T08:00:41.000Z"
updatedAt: "2026-05-23T08:00:41.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/vocationalcontrollines"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/904c03a1efdd19942df36d695d356dba.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/vocationalcontrollines](https://www.gugudata.com/api/details/vocationalcontrollines)

职教高考及高职分类招生控制线 API 查询职教高考及高职分类招生控制线，基础数据、职教高考等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/904c03a1efdd19942df36d695d356dba.png)

## 1. 产品功能

- 支持 2021 年至 2026 年多年份控制线数据查询；
- 支持按省份、招生类别、考生类型、录取批次、科类等多维条件筛选；
- 覆盖职教高考及高职分类招生相关控制线数据；
- 提供 /metadata/vocational-control-lines/enums 枚举辅助接口；
- 围绕“职教高考及高职分类招生控制线”提供标准化能力，便于快速接入现有业务；
- 适合将“职教高考及高职分类招生控制线”结果接入业务系统、后台工具和自动化流程；
- 适合高考、考研、招生和院校信息产品接入；
- 可与院校、专业、分数线和招生计划接口组合分析；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/vocational-control-lines

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/vocational-control-lines?appkey=REDACTED&year=2026&provinceName=YOUR_VALUE&categoryCode=YOUR_VALUE&category=YOUR_VALUE&studentType=YOUR_VALUE&scoreBatch=YOUR_VALUE&subjectCategory=YOUR_VALUE&pageIndex=1&pageSize=10

**数据预览:** [https://www.gugudata.com/preview/vocationalcontrollines](https://www.gugudata.com/preview/vocationalcontrollines)

**接口测试:** [https://api.gugudata.com/metadata/vocational-control-lines/demo](https://api.gugudata.com/metadata/vocational-control-lines/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| year | int | 是 | 2025 | 查询年份，如 2021、2022、2023、2024、2025、2026 |
| provinceName | string | 否 | YOUR_VALUE | 省份名称，如：江苏、河北、广东等 |
| categoryCode | string | 否 | YOUR_VALUE | 招生类别编码，如 75011。传空则不按类别编码筛选 |
| category | string | 否 | YOUR_VALUE | 招生类别名称，如：职教高考、3+证书等。建议先调用 /metadata/vocational-control-lines/enums 获取可选值 |
| studentType | string | 否 | YOUR_VALUE | 考生类型，如：其他考生。建议先调用 /metadata/vocational-control-lines/enums 获取可选值 |
| scoreBatch | string | 否 | YOUR_VALUE | 录取批次，如：本科、专科第一批次。建议先调用 /metadata/vocational-control-lines/enums 获取可选值 |
| subjectCategory | string | 否 | YOUR_VALUE | 科类名称，如：财会、体育、计算机。建议先调用 /metadata/vocational-control-lines/enums 获取可选值 |
| pageIndex | int | 否 | 1 | 分页参数，第几页，默认值为 1 |
| pageSize | int | 否 | 10 | 分页参数，每页条数，取值范围在 1 ~ 100 之间（含） |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.DataId | string | 数据全局唯一 ID |
| Data.Year | int | 年份 |
| Data.Province | string | 省份名称 |
| Data.Category | string | 招生类别名称 |
| Data.StudentType | string | 考生类型 |
| Data.ScoreBatch | string | 录取批次 |
| Data.SubjectCategory | string | 科类名称 |
| Data.Score | int | 控制线分数，没有值时返回 null |
| Data.Remark | string | 备注说明，没有值时返回空字符串 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 可通过判断此状态码断言接口正常返回。 |
| 501 | 参数错误 | 请检查传递的参数个数、取值范围和参数类型是否匹配。 |
| 502 | 请求频率受限 | 默认情况下，每个接口提供 10 QPS 并发能力，可满足大多数业务场景。超出当前并发能力时，网关可能返回 429 请求频率受限；如需更高吞吐，可按需购买额外 QPS 扩展包，高频调用场景支持白名单接入与独立流控策略。 |
| 503 | APPKEY 权限超限或订单到期 | 请前往开发者中心检查 APPKEY 状态与订单有效期。 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确。 |
| 505 | 请求次数超出接口限制 | 请检查接口剩余请求次数与配额限制。 |
| 900 | 接口内部响应错误 | 接口服务暂时不可用，请稍后重试。 |

## 6. 适用场景

- 适合用于字典与基础库查询，快速补齐产品侧需要的 职教高考及高职分类招生控制线 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
