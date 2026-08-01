---
title: "全国大学高校基础信息 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/college"
section: "gugudata"
slug: "metadata-college"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/college"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/0f735f57b6796d3ce3766b332df9107f.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/college](https://www.gugudata.com/api/details/college)

全国大学高校基础信息 API 全国高校基础信息查询，基础数据、高校高考等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/0f735f57b6796d3ce3766b332df9107f.jpg)

## 1. 产品功能

- 2026 年数据已更新；
- 提供最新全国高校学院基本信息；
- 总计近 4000 条全国高校精准数据；
- 每周一次数据自动更新校正；
- 包含高校各类属性、地理坐标、校徽图片、简称、旧称等信息；
- 包含高校开设专业列表；
- 毫秒级响应性能；
- 支持按全国排名升序或降序返回；

## 2. API 文档

**接口地址:** https://api.gugudata.com/location/college

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/location/college?appkey=REDACTED&keywords=KEYWORDS&uuid=YOUR_VALUE&pagesize=10&pageindex=1&keywordstrict=false&collegecategory=YOUR_VALUE&collegetype=YOUR_VALUE&is985=YOUR_VALUE&is211=YOUR_VALUE&isdualclass=YOUR_VALUE&edulevel=YOUR_VALUE&collegeproperty=YOUR_VALUE&sort=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/college](https://www.gugudata.com/preview/college)

**接口测试:** [https://api.gugudata.com/location/college/demo](https://api.gugudata.com/location/college/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| keywords | string | 是 | KEYWORDS | 搜索关键字，模糊匹配高校名称、省市区、高校旧称、地址字段，参数值为空则返回所有数据 |
| uuid | string | 否 | YOUR_VALUE | 咕咕数据平台高校唯一 ID，可按响应字段 SchoolUUID 精确查询高校基础信息 |
| pagesize | int | 否 | 10 | 每页数据量，参数最大值为 20，用于控制分页 |
| pageindex | int | 否 | 1 | 页码，第几页数据，用于控制分页 |
| keywordstrict | boolean | 否 | false | 控制 keyword 参数在查询时是否进行模糊查询，true 为精确匹配高校名称，默认值为 false 进行模糊查询，可模糊匹配高校名称、省市区、高校旧称、地址字段。参数值为空则返回所有数据 |
| collegecategory | string | 否 | YOUR_VALUE | 学院类别，参数默认值为空，不进行筛选。参数可选枚举值：理工类\|综合类\|师范类\|财经类\|医药类\|艺术类\|农林类\|军事类\|政法类\|语言类\|体育类\|民族类\|其它 |
| collegetype | string | 否 | YOUR_VALUE | 学院性质，参数默认值为空，不进行筛选。参数可选枚举值: 普通本科\|远程教育学院\|中外合作办学\|\|独立学院\|高职高专\|HND项目\|其它\|成人教育\|专科（高职） |
| is985 | boolean | 否 | YOUR_VALUE | 是否为 985 院校，需要参与查询则传参为：true |
| is211 | boolean | 否 | YOUR_VALUE | 是否为 211 院校，需要参与查询则传参为：true |
| isdualclass | boolean | 否 | YOUR_VALUE | 是否为双一流院校，需要参与查询则传参为：true |
| edulevel | string | 否 | YOUR_VALUE | 查询学院学制，参数默认值为空，不进行筛选。参数可选枚举值: 普通本科\|本科\|专科（高职）\|专科\|其它 |
| collegeproperty | string | 否 | YOUR_VALUE | 查询学院资质，参数默认值为空，不进行筛选。参数可选枚举值: 公办\|民办\|中外合作办学 |
| sort | string | 否 | YOUR_VALUE | 返回数据排序方式，可选值：ranking\|asc、ranking\|desc；默认按全国排名升序。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.DataId | string | 数据全局唯一 ID，仅用于标识数据的唯一 |
| Data.SchoolUUID | string | 咕咕数据平台高校唯一 ID，此唯一 ID 可与 [历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)、[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline) 接口中的 SchoolUUID 进行唯一匹配 |
| Data.CollegeName | string | 学院名称 |
| Data.Province | string | 学院所在省份 |
| Data.City | string | 学院所在城市 |
| Data.District | string | 学院所在区县 |
| Data.Coordinate | string | 学院地理坐标经纬度，格式为 [经度,纬度]，地理坐标系为 GCJ-02。需要转换坐标系请调用 [地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter) 接口 |
| Data.CollegeType | string | 学院性质，值的枚举: 普通本科\|独立学院\|专科（高职）\|高职高专\|中外合作办学\|成人教育\|HND项目\|远程教育学院\|其它 |
| Data.Is985 | boolean | 是否为 985 院校 |
| Data.Is211 | boolean | 是否为 211 院校 |
| Data.IsDualClass | boolean | 是否为双一流院校 |
| Data.CollegeCategory | string | 学院类别，值的枚举: 综合类\|理工类\|师范类\|财经类\|医药类\|艺术类\|农林类\|军事类\|政法类\|语言类\|体育类\|民族类\|其它 |
| Data.CollegeTags | string[] | 学院标签 |
| Data.EduLevel | string | 学院学制，值的枚举: 普通本科\|本科\|专科（高职）\|专科\|其它 |
| Data.CollegeProperty | string | 学院资质，值的枚举: 公办\|民办\|中外合作办学 |
| Data.CollegeCode | string | 学院编号 |
| Data.Ranking | int | 全国排名，接口返回的数据结果默认按照此数值进行升序排列 |
| Data.RankingInCategory | string | 学院所在类别下排名 |
| Data.WebSite | string | 学院官网 |
| Data.CallNumber | string | 学院招生电话 |
| Data.Email | string | 学院招生邮箱 |
| Data.Address | string | 学院地址 |
| Data.BranchList | string[] | 主/分校区名称和地址 |
| Data.CoverImage | string | 学院校徽 |
| Data.Intro | string | 学院简介 |
| Data.Expenses | string | 学院收费（仅供参考） |
| Data.OldName | string | 学院旧称 |
| Data.ShortName | string | 学院简称 |
| Data.MajorList.MajorTitle | string | 开设专业大类 |
| Data.MajorList.Majors | string[] | 此大类下开设的专业 |
| Data.AffiliatedTo | string | 隶属于 |
| Data.IsMinistryOfEducationDirectlyAffiliated | boolean | 是否直属教育部 |
| Data.NumMaster | int | 硕士点数量 |
| Data.NumDoctor | int | 博士点数量 |
| Data.GraduateRecommendationQualificationLevel | int | 研究生推免资格等级 |
| Data.IsDeleted | boolean | 废弃数据标识 |

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

- 适合用于字典与基础库查询，快速补齐产品侧需要的 全国大学高校基础信息 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[历年高考高校录取分数线](https://www.gugudata.com/api/details/ceecollegeline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考专业录取分数线](https://www.gugudata.com/api/details/ceemajorline)，适合补充同类场景的接口能力。
- 可搭配使用：[历年高考省录取分数线](https://www.gugudata.com/api/details/ceeprovince)，适合补充同类场景的接口能力。
