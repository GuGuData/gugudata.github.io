---
title: "全国三甲医院主体信息 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/hospital-3a"
section: "gugudata"
slug: "location-hospital-3a"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-04-24T22:34:50.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/hospital-3a"
cover: "https://static.gugudata.com/api-cover-hospital-3a-v2.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/hospital-3a](https://www.gugudata.com/api/details/hospital-3a)

全国三甲医院主体信息 API 全国三甲医院名录与区域格式化检索，医疗数据、医院名录等关键词场景常会用到，适合用于区域编码与地理信息处理、地图、本地生活与物流系统与地址标准化与空间数据转换等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api-cover-hospital-3a-v2.jpg)

## 1. 产品功能

- 支持按医院关键词、省、市、区县组合筛选全国三甲医院；
- 每月定期更新，保持数据新鲜度；
- 返回总数、分页信息和医院主体字段，便于直接构建列表页；
- 适合医疗服务目录、医院检索、地址补全和区域医疗资源分析等场景；
- 分页参数 pageIndex 与 pageSize 用于控制返回范围；
- 围绕“全国三甲医院主体信息”提供标准化能力，便于快速接入现有业务；
- 适合将“全国三甲医院主体信息”结果接入业务系统、后台工具和自动化流程；
- 适合地址解析、区域筛选、机构网点管理和地图类产品接入；

## 2. API 文档

**接口地址:** https://api.gugudata.com/location/hospital-3a

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/location/hospital-3a?appkey=REDACTED&keyword=YOUR_VALUE&province=YOUR_VALUE&city=YOUR_VALUE&district=YOUR_VALUE&pageIndex=1&pageSize=20

**数据预览:** [https://www.gugudata.com/preview/hospital-3a](https://www.gugudata.com/preview/hospital-3a)

**接口测试:** [https://api.gugudata.com/location/hospital-3a/demo](https://api.gugudata.com/location/hospital-3a/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY。 |
| keyword | string | 否 | YOUR_VALUE | 医院名称或别名关键词，支持模糊搜索。 |
| province | string | 否 | YOUR_VALUE | 省份名称，例如 北京、广东。 |
| city | string | 否 | YOUR_VALUE | 城市名称，例如 北京市、广州市。 |
| district | string | 否 | YOUR_VALUE | 区县名称，例如 海淀区、天河区。 |
| pageIndex | int | 否 | 1 | 分页页码，从 1 开始。 |
| pageSize | int | 否 | 20 | 每页数量。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求的参数摘要字符串。 |
| DataStatus.StatusCode | int | 接口返回状态码。 |
| DataStatus.Status | string | 接口返回状态，例如 SUCCESS 或 ERROR。 |
| DataStatus.StatusDescription | string | 接口返回状态说明。 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间。 |
| DataStatus.DataTotalCount | int | 此条件下的数据总量；对象型结果通常为 1，列表型结果为列表数量或分页总数。 |
| Data.TotalCount | int | 符合条件的医院总数。 |
| Data.PageIndex | int | 当前页码。 |
| Data.PageSize | int | 每页数量。 |
| Data.Items.Name | string | 医院名称。 |
| Data.Items.Alias | string | 医院别名。 |
| Data.Items.Province | string | 所在省份。 |
| Data.Items.City | string | 所在城市。 |
| Data.Items.District | string | 所在区县。 |
| Data.Items.Address | string | 医院地址。 |
| Data.Items.Telephone | string | 联系电话。 |

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

- 适合用于区域编码与地理信息处理，快速补齐产品侧需要的 全国三甲医院主体信息 数据能力。
- 适合用于地图、本地生活与物流系统，减少手工整理、清洗与重复开发成本。
- 适合用于地址标准化与空间数据转换，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[全国省市区街道村信息](https://www.gugudata.com/api/details/chinaregions)，适合补充同类场景的接口能力。
- 可搭配使用：[地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter)，适合补充同类场景的接口能力。
- 可搭配使用：[国内 IP 地址定位](https://www.gugudata.com/api/details/iplocation)，适合补充同类场景的接口能力。
