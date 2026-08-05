---
title: "研究生招生专业目录 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/postgraduateprogram"
section: "gugudata"
slug: "metadata-postgraduateprogram"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/postgraduateprogram"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/e622d2313024ef5bdae4c16aa6210a7c.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/postgraduateprogram](https://www.gugudata.com/api/details/postgraduateprogram)

研究生招生专业目录 API 提供 2026 年研究生招生单位、院系、专业、研究方向、考试科目、拟招生人数和招生简章摘要等结构化数据，支持按学校、地区、专业、学位类型、学习方式、双一流高校和自主划线单位等条件筛选。适合用于教育数据平台、考研信息工具、院校专业库、招生目录检索和业务数据分析等场景。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/e622d2313024ef5bdae4c16aa6210a7c.jpg)

## 1. 产品功能

- 支持查询 2026 年研究生招生专业目录，返回招生单位、院系、专业、研究方向和学习方式等结构化字段；
- 支持按招生年份、学校唯一 ID、学校代码、学校名称、省份、专业代码、专业名称等条件筛选；
- 支持按学位类型筛选，可用于区分学术学位和专业学位招生目录；
- 支持按学习方式筛选，可用于区分全日制和非全日制专业方向；
- 支持双一流建设高校、设有研究生院、自主划线招生单位等学校特征字段；
- 返回考试科目组，包含思想政治理论、外语、业务课一、业务课二等科目代码、名称和说明；
- 返回拟招生人数文本、导师信息和专业备注；源站公开且年份匹配时，同时返回招生简章标题、发布日期和摘要；
- 已可靠关联到高校基础信息的记录会返回 SchoolUUID、学校封面图或校徽图片，无法可靠关联时相关字段为空；
- 支持分页查询，便于在后台任务、搜索页、筛选器和数据看板中稳定接入；
- 覆盖大陆 31 个省级地区的高校、科研院所等招生单位；部分招生单位未公开专业明细时，接口不生成推测数据；
- 接口使用 HTTPS，请以公开文档和实际响应为准；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/postgraduate-program

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/postgraduate-program?appkey=YOUR_APPKEY&year=2026&schooluuid=YOUR_VALUE&schoolcode=10001&schoolname=北京大学&province=北京&majorcode=010101&majorname=哲学&degreeType=academic&studyMode=full_time&isDoubleFirstClass=true&isSelfMarking=true&pageindex=1&pagesize=10

**数据预览:** [https://www.gugudata.com/preview/postgraduateprogram](https://www.gugudata.com/preview/postgraduateprogram)

**接口测试:** [https://api.gugudata.com/metadata/postgraduate-program/demo](https://api.gugudata.com/metadata/postgraduate-program/demo)

**OpenAPI:** [https://www.gugudata.com/openapi/gugudata.openapi.3.1.json](https://www.gugudata.com/openapi/gugudata.openapi.3.1.json)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| year | int | 否 | 2026 | 招生年份；当前提供 2026 年目录，不传时默认查询 2026 年 |
| schooluuid | string | 否 | YOUR_VALUE | 咕咕数据平台高校唯一 ID，可与全国大学高校基础信息接口关联 |
| schoolcode | string | 否 | 10001 | 招生单位代码，如北京大学为 10001 |
| schoolname | string | 否 | 北京大学 | 招生单位名称关键词，支持按学校名称检索 |
| province | string | 否 | 北京 | 招生单位所在省份名称，如北京、江苏、上海、广东等 |
| majorcode | string | 否 | 010101 | 专业代码，如 010101 |
| majorname | string | 否 | 哲学 | 专业名称关键词，如哲学、计算机、金融等 |
| degreeType | string | 否 | academic | 学位类型，支持 academic、professional、学术学位、专业学位 |
| studyMode | string | 否 | full_time | 学习方式，支持 full_time、part_time、全日制、非全日制 |
| isDoubleFirstClass | boolean | 否 | true | 是否筛选双一流建设高校 |
| isSelfMarking | boolean | 否 | true | 是否筛选自主划线招生单位 |
| pageindex | int | 否 | 1 | 分页参数，第几页，从 1 开始 |
| pagesize | int | 否 | 10 | 分页参数，每页条数，取值范围 1 ~ 20 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要，不包含 APPKEY |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Year | int | 招生年份 |
| Data.SchoolUUID | string | 咕咕数据平台高校唯一 ID，无法可靠关联时为空 |
| Data.SchoolCode | string | 招生单位代码 |
| Data.SchoolName | string | 招生单位名称 |
| Data.Province | string | 招生单位所在省份 |
| Data.City | string | 招生单位所在城市 |
| Data.CoverImage | string | 学校封面图或校徽图片 |
| Data.IsDoubleFirstClass | boolean | 是否为双一流建设高校 |
| Data.HasGraduateSchool | boolean | 是否设有研究生院 |
| Data.IsSelfMarking | boolean | 是否为自主划线招生单位 |
| Data.DepartmentName | string | 院系名称 |
| Data.MajorCode | string | 专业代码 |
| Data.MajorName | string | 专业名称 |
| Data.DegreeType | string | 学位类型，例如学术学位、专业学位 |
| Data.DisciplineCategoryCode | string | 门类代码 |
| Data.DisciplineCategoryName | string | 门类名称 |
| Data.FirstLevelDisciplineCode | string | 一级学科或专业学位类别代码 |
| Data.FirstLevelDisciplineName | string | 一级学科或专业学位类别名称 |
| Data.DirectionName | string | 研究方向名称 |
| Data.StudyMode | string | 学习方式，例如全日制、非全日制 |
| Data.ExamMethod | string | 考试方式 |
| Data.Advisor | string | 导师信息 |
| Data.PlannedEnrollmentText | string | 拟招生人数文本 |
| Data.Remark | string | 专业备注 |
| Data.ExamSubjectGroups | array | 考试科目组，一个专业方向可能包含多组可选考试科目 |
| Data.ExamSubjectGroups[].Subject1.Code | string | 第一科考试科目代码 |
| Data.ExamSubjectGroups[].Subject1.Name | string | 第一科考试科目名称 |
| Data.ExamSubjectGroups[].Subject1.Description | string | 第一科考试科目说明 |
| Data.ExamSubjectGroups[].Subject2.Code | string | 第二科考试科目代码 |
| Data.ExamSubjectGroups[].Subject2.Name | string | 第二科考试科目名称 |
| Data.ExamSubjectGroups[].Subject2.Description | string | 第二科考试科目说明 |
| Data.ExamSubjectGroups[].Subject3.Code | string | 第三科考试科目代码 |
| Data.ExamSubjectGroups[].Subject3.Name | string | 第三科考试科目名称 |
| Data.ExamSubjectGroups[].Subject3.Description | string | 第三科考试科目说明 |
| Data.ExamSubjectGroups[].Subject4.Code | string | 第四科考试科目代码 |
| Data.ExamSubjectGroups[].Subject4.Name | string | 第四科考试科目名称 |
| Data.ExamSubjectGroups[].Subject4.Description | string | 第四科考试科目说明 |
| Data.BrochureTitle | string | 招生简章标题 |
| Data.BrochurePublishedDate | string | 招生简章发布日期 |
| Data.BrochureSummary | string | 招生简章摘要 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 可通过判断此状态码断言接口正常返回 |
| -1 | 请求失败 | 请求处理失败，请检查请求后重试 |
| 501 | 参数错误 | 请检查传递的参数个数、取值范围和参数类型是否匹配 |
| 502 | 请求频率受限 | 默认情况下，每个接口提供 5 QPS 并发能力。超出当前并发能力时，网关可能返回 429；如需更高吞吐，可按需购买额外 QPS 扩展包 |
| 503 | APPKEY 权限超限或订单到期 | 请前往开发者中心检查 APPKEY 状态与订单有效期 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确 |
| 505 | 请求次数超出接口限制 | 请检查接口剩余请求次数与配额限制 |
| 900 | 接口内部响应错误 | 接口服务暂时不可用，请稍后重试 |

## 6. 适用场景

- 适合用于考研择校产品，快速按学校、专业、院系、研究方向和考试科目组织招生目录。
- 适合用于教育数据平台和高校信息库，将研究生招生目录与高校基础信息、地区、省份和学校特征字段关联展示。
- 适合用于招生简章聚合、专业库检索、考试科目对比、全日制/非全日制筛选和自主划线高校筛选。
- 适合用于数据看板和内部运营工具，按年份、省份、学校类型、专业名称和学位类型统计招生方向分布。
- 适合用于和研究生招生国家分数线组合，构建从“招生目录查询”到“国家线参考”的完整考研信息链路。

## 7. 相关接口

- 可搭配使用：[研究生招生国家分数线](https://www.gugudata.com/api/details/postgraduatenationalscoreline)，适合补充国家线、A/B 区、总分和单科分数要求。
- 可搭配使用：[全国大学高校基础信息](https://www.gugudata.com/api/details/college)，适合补充学校基本信息、所在地、办学层次和高校特征。
- 可搭配使用：[学科专业目录](https://www.gugudata.com/api/details/ceemajor)，适合补充专业门类、专业名称和专业代码基础字段。
- 可搭配使用：[基于模型的高校录取概率预测](https://www.gugudata.com/api/details/admission-predict)，适合在教育产品中扩展高考录取概率预测能力。
- 可搭配使用：[高考志愿填报 AI 顾问](https://www.gugudata.com/api/details/gaokao-chat)，适合为教育类应用补充问答式咨询能力。
