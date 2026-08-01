---
title: "历年高考高校录取分数线 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/ceecollegeline"
section: "gugudata"
slug: "metadata-ceecollegeline"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/ceecollegeline"
cover: "https://static.gugudata.com/api_cee_college_line.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/ceecollegeline](https://www.gugudata.com/api/details/ceecollegeline)

历年高考高校录取分数线 API 高校在各省录取分数线，基础数据、高校高考等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cee_college_line.jpg)

## 1. 产品功能

- 2026 年数据即将更新；
- 全国所有高校在全国各省的详细录取数据，从 2015 年至 2025 年；
- 百万级别已校对历史数据；
- 多种查询条件便于多维度分析；
- 数据持续自动更新与维护；
- 毫秒级查询性能；
- 围绕“历年高考高校录取分数线”提供标准化能力，便于快速接入现有业务；
- 适合将“历年高考高校录取分数线”结果接入业务系统、后台工具和自动化流程；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/ceecollegeline

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/ceecollegeline?appkey=REDACTED&searchtype=YOUR_VALUE&keyword=YOUR_VALUE&pageindex=1&pagesize=10&year=YOUR_VALUE&min=YOUR_VALUE&type=YOUR_VALUE&keywordstrict=false&enrollprovince=YOUR_VALUE&batchname=YOUR_VALUE&collegeprovincename=YOUR_VALUE&enrollmenttype=YOUR_VALUE&schooluuid=YOUR_VALUE&sort=YOUR_VALUE&minrange=0

**数据预览:** [https://www.gugudata.com/preview/ceecollegeline](https://www.gugudata.com/preview/ceecollegeline)

**接口测试:** [https://api.gugudata.com/metadata/ceecollegeline/demo](https://api.gugudata.com/metadata/ceecollegeline/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| searchtype | string | 是 | YOUR_VALUE | 查询条件类型，支持录取省份以及高校名称查询，参数值分别为：PROVINCENAME 或 COLLEGENAME |
| keyword | string | 是 | YOUR_VALUE | 录取省份或高校名称，高校名称支持模糊查询。searchtype=PROVINCENAME，此参数值传递录取省份；searchtype=COLLEGENAME，此参数值传递高校名称。招生省份枚举：上海\|云南\|内蒙古\|北京\|台湾\|吉林\|四川\|天津\|宁夏\|安徽\|山东\|山西\|广东\|广西\|新疆\|江苏\|江西\|河北\|河南\|浙江\|海南\|湖北\|湖南\|澳门\|甘肃\|福建\|西藏\|贵州\|辽宁\|重庆\|陕西\|青海\|香港\|黑龙江 |
| pageindex | int | 是 | 1 | 分页参数，第几页 |
| pagesize | int | 是 | 10 | 分页参数，每页总条数，取值范围在 1 ~ 20 之间（含） |
| year | int | 是 | YOUR_VALUE | 查询的录取年份，如 2020、2021、2022、2023、2024、2025。参数默认值为 0：即获取所有年份的录取数据 |
| min | int | 否 | YOUR_VALUE | 录取最低分查询条件，筛选出最低分小于等于查询条件的值 |
| type | string | 否 | YOUR_VALUE | 传递的参数值可选为：3+证书\|体育文\|体育理\|体育类\|体育类（历史）\|体育类（物理）\|其他艺术\|农学类\|医学类\|历史类\|学考\|学考文\|学考理\|幼师类\|建筑类\|文科\|旅游类\|汉授体育\|汉授编导\|汉授美术\|汉授音乐\|汽驾类\|烹饪类\|牧医类\|物理类\|理科\|综合\|美工设计类\|艺术文\|艺术理\|艺术类\|艺术类（历史）\|艺术类（物理）\|蒙授体育\|蒙授其他艺术\|蒙授文科\|蒙授理科\|蒙授美术\|蒙授音乐\|蒙牧医类\|计算机类\|财会类 |
| keywordstrict | string | 否 | false | 控制 keyword 参数在查询高校名称时是否进行模糊查询，true 为精确匹配，默认值为 false 进行模糊查询 |
| enrollprovince | string | 否 | YOUR_VALUE | 用于 searchtype=COLLEGENAME 时，附加一个招生省份的条件，如查询北京大学在江苏的录取数据，那么该值传递 “江苏” 即可 |
| batchname | string | 否 | YOUR_VALUE | 录取批次参数，可使用英文逗号分隔传递多个值。可选枚举值：专科批\|专科批A段\|专科批B段\|专科批F段\|专科提前批\|专科提前批A段\|专科特殊类型批\|专科特殊类型批次K段\|专项计划批\|体育本科提前批\|体育类本科批\|国家专项计划\|国家专项计划本科一批\|国家专项计划本科二批\|国家专项计划本科批\|国家及地方专项、南疆单列、对口援疆计划本科一批次\|地方专项计划本科批\|地方农村专项计划批\|平行录取一段\|平行录取三段\|平行录取二段\|提前一批本科\|提前专项批\|提前批\|提前批A段\|提前批B段\|提前批第一批本科\|提前本科批\|普通本科批\|普通类一段\|普通类二段\|普通类平行录取\|普通类提前批\|本科A批\|本科A段\|本科B批\|本科一批\|本科一批A1段\|本科一批A段\|本科一批B段\|本科一批H段\|本科一批I段\|本科一批U段\|本科一批预科\|本科一段\|本科三批\|本科三批A段\|本科三批B段\|本科专项计划批\|本科二批\|本科二批A段\|本科二批B段\|本科二批C段\|本科二批K段\|本科二批及预科\|本科二段\|本科批\|本科批A段\|本科批B段\|本科批C段\|本科批一段\|本科提前批\|本科提前批A段\|本科提前批B段\|本科提前批C\|本科提前批C段\|本科提前批艺术本科第二批\|本科提前批艺术类\|本科提前批艺术类A段\|本科提前批艺术类第1小批\|本科提前批（非军检）\|本科第一批提前批\|本科综合评价批\|本科艺术甲批平行段\|第一批\|第二批第二段\|艺本一批\|艺术本科A段\|艺术本科批B段\|艺术本科提前批\|艺术类专科批\|艺术类本科A段\|艺术类本科批\|艺术类本科提前批\|艺术类本科提前批B段\|艺术类第一批\|艺术类（本科二批B段）\|蒙授本科一批\|蒙授本科二批\|蒙授高职高专\|零志愿批次\|零批次\|高分优先投档批\|高校专项计划\|高校专项计划批次\|高校专项计划本科批\|高职（专科）批Q段\|高职（专科）批R段 |
| collegeprovincename | string | 否 | YOUR_VALUE | 学院所属省份筛选，如获取所有江苏省高校的录取分数线，那么该值传递 “江苏” 即可，院校省份枚举：上海\|云南\|内蒙古\|北京\|吉林\|四川\|天津\|宁夏\|安徽\|山东\|山西\|广东\|广西\|新疆\|江苏\|江西\|河北\|河南\|浙江\|海南\|湖北\|湖南\|甘肃\|福建\|西藏\|贵州\|辽宁\|重庆\|陕西\|青海\|香港\|黑龙江 |
| enrollmenttype | string | 否 | YOUR_VALUE | 招生类型筛选，如：普通类 |
| schooluuid | string | 否 | YOUR_VALUE | 咕咕数据平台高校唯一 ID，此唯一 ID 可与 [全国大学高校基础信息](https://www.gugudata.com/api/details/college)、[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline) 等接口中的 SchoolUUID 进行唯一匹配 |
| sort | string | 否 | YOUR_VALUE | 排序控制，格式为 字段\|排序方向。未传 sort 时使用默认排序：min > 0 时按 LowestScore\|desc、Year\|desc；min 为空或 0 时按 Year\|desc；同分或同年记录按系统稳定顺序补位。排序方向可选 asc、desc：asc 表示升序（从小到大），desc 表示降序（从大到小）。多个排序条件用英文逗号分隔，并按传入顺序依次排序。支持字段：HighestScore（录取最高分，对应返回字段 HighestScore）、AverageScore（录取平均分，对应 AverageScore）、LowestScore（录取最低分，对应 LowestScore）、LowestRank（录取最低位次，对应 LowestRank）、ProvincialControlLine（省控线，对应 ProvincialControlLine）、EnrollmentType（招生类型，对应 EnrollmentType）、SelectionLevel（选测等级，对应 SelectionLevel，主要用于特定省份历史数据）。示例：LowestScore\|desc、LowestRank\|asc、HighestScore\|desc,LowestScore\|desc。 |
| minrange | string | 否 | 0 | 录取最低分区间查询条件，使用逗号分隔，左右都为闭区间，格式为：500,700 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| DataStatus.RequestParameter | string | 请求参数，一般用于调试 |
| Data.Province | string | 招生的省份 |
| Data.SchoolUUID | string | 咕咕数据平台高校唯一 ID，此唯一 ID 可与 [全国大学高校基础信息](https://www.gugudata.com/api/details/college)、[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline) 等接口中的 SchoolUUID 进行唯一匹配 |
| Data.CollegeName | string | 高校名称 |
| Data.Year | int | 招生年份 |
| Data.HighestScore | string | 录取最高分 |
| Data.AverageScore | string | 录取平均分 |
| Data.LowestScore | string | 录取最低分 |
| Data.LowestRank | string | 录取最低位次 |
| Data.ProvincialControlLine | string | 录取省控线 |
| Data.EnrollmentType | string | 招生类型 |
| Data.SelectionLevel | string | 选测等级（特定省） |
| Data.AdmissionBatch | string | 录取批次。枚举值为：专科批\|本科二批\|本科一批\|本科批\|本科三批\|本科二批A段\|本科提前批\|本科批A段\|本科一批A段\|平行录取二段\|本科二批B段\|国家专项计划本科批\|专科批A段\|本科二批C段\|平行录取一段\|本科二批及预科\|普通类一段\|本科一批B段\|本科三批A段\|平行录取三段\|本科A批\|本科一段\|本科批B段\|本科二批K段\|蒙授高职高专\|本科一批I段\|普通类二段\|本科B批\|专科提前批\|本科提前批A段\|地方专项计划本科批\|本科二段\|本科一批A1段\|国家专项计划本科一批\|本科一批预科\|本科提前批B段\|蒙授本科一批\|本科提前批（非军检）\|蒙授本科二批\|普通类提前批\|国家专项计划本科二批\|地方农村专项计划批\|零批次\|高校专项计划本科批\|本科三批B段\|提前专项批\|专科批B段\|本科综合评价批\|高分优先投档批\|普通本科批 |
| Data.TypeName | string | 文科、理科或综合。枚举值为：理科\|文科\|综合\|艺术类\|体育类\|体育理\|蒙授理科\|艺术文\|体育文\|汉授美术\|蒙授文科\|学考文\|学考理\|艺术理\|汉授音乐\|汉授体育\|其他艺术\|汉授编导\|蒙授音乐\|蒙授体育\|蒙授美术\|旅游类\|计算机类\|3+证书\|蒙授其他艺术\|农学类\|财会类\|牧医类\|蒙牧医类\|美工设计类\|汽驾类\|幼师类\|建筑类\|烹饪类 |
| Data.CourseSelection | string | 选科要求 |
| Data.CourseSelectionName | string | 专业组 |
| Data.SchoolType | string | 学校类型，如公办、民办 |
| Data.SchoolInCity | string | 高校所在的城市 |
| Data.Is985 | boolean | 是否为 985 院校 |
| Data.Is211 | boolean | 是否为 211 院校 |
| Data.IsDualClass | boolean | 是否为双一流院校 |
| Data.CoverImage | string | 高校 logo |

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

- 适合用于字典与基础库查询，快速补齐产品侧需要的 历年高考高校录取分数线 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 前置接口：[历年高考高校录取分数线-查询参数枚举](https://api.gugudata.com/metadata/ceecollegeline/enums)（GET），返回 type、batchName、enrollmentType、collegeProvinceName 的枚举集合。
- 相关接口：[历年高考高校录取分数线-查询参数枚举](https://api.gugudata.com/metadata/ceecollegeline/enums)（GET），返回 type、batchName、enrollmentType、collegeProvinceName 的枚举集合。
