---
title: "研究生招生国家分数线 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/postgraduatenationalscoreline"
section: "gugudata"
slug: "metadata-postgraduatenationalscoreline"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
canonicalUrl: "https://www.gugudata.com/api/details/postgraduatenationalscoreline"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/fe20b724622e043c69c6f88cfc23acdd.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/postgraduatenationalscoreline](https://www.gugudata.com/api/details/postgraduatenationalscoreline)

研究生招生国家分数线 API 支持查询研究生招生考试国家线数据，覆盖考试年份、学科门类或专项名称、国家线类型、学位类型、考生区域等筛选条件，返回 A 区 / B 区总分要求和单科分数要求。基础数据、考研国家线、研究生招生、考研分数线等关键词场景常会用到，适合用于考研信息查询、院校专业分析、分数线展示、招生数据看板和业务检索等场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/fe20b724622e043c69c6f88cfc23acdd.jpg)

## 1. 产品功能

- 支持查询 2001-2026 年研究生招生考试国家线，覆盖学科门类、专项计划、照顾政策、学术学位和专业学位等场景；
- 支持按考试年份查询国家线，便于构建历年国家线检索、趋势展示和对比分析；
- 支持按学科门类或专项名称关键词筛选，例如哲学、经济学、法学、教育学、少数民族照顾政策等；
- 支持国家线类型筛选，可区分按学科门类统一划线、单独划线学科专业、专项计划和照顾政策等类型；
- 支持按学位类型筛选，可用于区分学术学位和专业学位国家线；
- 支持按考生区域筛选，兼容 A、A区、一区、B、B区、二区以及历史年份的 C 区和考生分类等常见传值；
- 返回总分要求、满分等于 100 分的单科要求、满分大于 100 分的单科要求；
- 支持分页查询，适合批量同步、表格展示和检索结果页接入；
- 明确仅包含国家线，不包含学校复试线或院系学科线，便于业务侧准确标注数据范围；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡；

## 2. API 文档

**接口地址:** https://api.gugudata.com/metadata/postgraduate-national-score-line

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/metadata/postgraduate-national-score-line?appkey=REDACTED&year=2026&disciplineCategoryName=哲学&lineScope=national_unified&degreeType=academic&candidateRegion=A区&pageindex=1&pagesize=10

**数据预览:** [https://www.gugudata.com/preview/postgraduatenationalscoreline](https://www.gugudata.com/preview/postgraduatenationalscoreline)

**接口测试:** [https://api.gugudata.com/metadata/postgraduate-national-score-line/demo](https://api.gugudata.com/metadata/postgraduate-national-score-line/demo)

**OpenAPI:** [https://www.gugudata.com/openapi/gugudata.openapi.3.1.json](https://www.gugudata.com/openapi/gugudata.openapi.3.1.json)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| year | int | 否 | 2026 | 考试年份，如 2024、2025、2026。不传时默认查询当前可用考试年份 |
| disciplineCategoryName | string | 否 | 哲学 | 学科门类或专项名称关键词，如哲学、经济学、管理学、专项计划等 |
| lineScope | string | 否 | national_unified | 国家线类型，支持 national_unified、national_separate、national_special、national_academic、national_professional，也支持对应中文名称 |
| degreeType | string | 否 | academic | 学位类型，支持 academic、professional、学术学位、专业学位 |
| candidateRegion | string | 否 | A区 | 考生区域，支持 A、A区、一区、B、B区、二区 |
| pageindex | int | 否 | 1 | 分页参数，第几页，从 1 开始 |
| pagesize | int | 否 | 10 | 分页参数，每页条数，取值范围 1 ~ 20 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.Year | int | 考试年份 |
| Data.LineScope | string | 国家线类型中文名称 |
| Data.DisciplineCategoryName | string | 学科门类或专项名称 |
| Data.CandidateRegion | string | 考生区域，如 A区、B区 |
| Data.TotalScore | int | 总分要求 |
| Data.SingleSubject100Text | string | 满分等于 100 分的单科分数要求 |
| Data.SingleSubjectOver100Text | string | 满分大于 100 分的单科分数要求 |

## 5. lineScope 常用取值

| 取值 | 中文含义 | 适用说明 |
| --- | --- | --- |
| national_unified | 国家线-按学科门类统一划线 | 常规学科门类国家线查询 |
| national_separate | 国家线-单独划线学科专业 | 单独划线学科专业查询 |
| national_special | 国家线-专项计划和照顾政策 | 专项计划、照顾政策等国家线查询 |
| national_academic | 国家线-学术学位 | 学术学位国家线查询 |
| national_professional | 国家线-专业学位 | 专业学位国家线查询 |

## 6. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 可通过判断此状态码断言接口正常返回 |
| 501 | 参数错误 | 请检查传递的参数个数、取值范围和参数类型是否匹配 |
| 502 | 请求频率受限 | 默认情况下，每个接口提供 10 QPS 并发能力，可满足大多数业务场景。超出当前并发能力时，网关可能返回 429 请求频率受限；如需更高吞吐，可按需购买额外 QPS 扩展包，高频调用场景支持白名单接入与独立流控策略 |
| 503 | APPKEY 权限超限或订单到期 | 请前往开发者中心检查 APPKEY 状态与订单有效期 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确 |
| 505 | 请求次数超出接口限制 | 请检查接口剩余请求次数与配额限制 |
| 900 | 接口内部响应错误 | 接口服务暂时不可用，请稍后重试 |

## 7. 适用场景

- 适合用于考研信息产品，快速展示不同年份、不同学科门类、A 区 / B 区的国家线要求。
- 适合用于研究生招生数据看板，按年份、学科门类、区域和学位类型统计国家线变化。
- 适合用于院校专业库详情页，为专业方向、考试科目和招生目录提供国家线参考。
- 适合用于考研择校工具，将国家线作为筛选、排序、提醒和对比分析的基础字段。
- 适合用于内容生成、咨询问答和运营专题页，快速调用结构化国家线数据，减少人工整理分数线表格的成本。

## 8. 相关接口

- 可搭配使用：[研究生招生专业目录](https://www.gugudata.com/api/details/postgraduateprogram)，适合补充招生单位、院系、专业、研究方向、考试科目和拟招生人数。
- 可搭配使用：[全国大学高校基础信息](https://www.gugudata.com/api/details/college)，适合补充学校基础资料、地区、办学层次和高校特征。
- 可搭配使用：[学科专业目录](https://www.gugudata.com/api/details/ceemajor)，适合补充专业门类、专业名称和专业代码基础字段。
- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合扩展高考招生分数线场景。
- 可搭配使用：[高考志愿填报 AI 顾问](https://www.gugudata.com/api/details/gaokao-chat)，适合为教育类应用补充问答式咨询能力。
