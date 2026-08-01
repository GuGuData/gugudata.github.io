---
title: "汽车车型库数据 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/vehicle-catalog"
section: "gugudata"
slug: "metadata-vehicle-catalog"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2026-04-24T22:34:50.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/vehicle-catalog"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/1606d2a51217e6b80ab3c4546f51c992.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/vehicle-catalog](https://www.gugudata.com/api/details/vehicle-catalog)

汽车车型库数据 API 提供多维度汽车车型库查询能力，基础数据、汽车数据等关键词场景常会用到，适合用于资讯抓取与内容聚合、舆情监控与内容分析与搜索索引与知识库构建等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/1606d2a51217e6b80ab3c4546f51c992.jpg)

## 1. 产品功能

- 提供品牌、车系、车型三级车型库数据查询能力；
- 支持品牌、车系、车型、年款、销售状态、车型级别和价格条件组合查询；
- 支持品牌到车系、车系到车型的稳定关联查询；
- 每周人工同步复核更新车型库数据，适合业务系统实时获取最新数据；
- 围绕“汽车车型库数据”提供标准化能力，便于快速接入现有业务；
- 适合将“汽车车型库数据”结果接入业务系统、后台工具和自动化流程；
- 适合车型库、选车工具和汽车内容产品接入；
- 支持按品牌、车系、车型等维度组织车辆资料；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v1/vehicleBrands

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v1/vehicleBrands?appkey=REDACTED&keyword=YOUR_VALUE&pageIndex=1&pageSize=50

**数据预览:** [https://www.gugudata.com/preview/vehicle-catalog](https://www.gugudata.com/preview/vehicle-catalog)

**接口测试:** [https://api.gugudata.com/v1/vehicleBrands/demo?pageIndex=1&pageSize=10](https://api.gugudata.com/v1/vehicleBrands/demo?pageIndex=1&pageSize=10)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| keyword | string | 否 | YOUR_VALUE | 品牌关键词，支持品牌名称或拼音首字母模糊查询 |
| pageIndex | int | 否 | 1 | 页码，从 1 开始 |
| pageSize | int | 否 | 50 | 每页返回数量，默认 50，最大 100 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码，100 为成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 当前品牌查询条件下的总数量 |
| Data.Items | array | 品牌列表 |
| Data.Items[].BrandId | string | 品牌公开唯一 ID，可用于查询车系和车型 |
| Data.Items[].BrandName | string | 品牌名称 |
| Data.PageIndex | int | 当前页码 |
| Data.PageSize | int | 当前每页返回数量 |
| Data.TotalSize | int | 当前品牌查询条件下的总数量 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 501 | 参数错误 | 请检查品牌 ID、子品牌 ID、车系 ID、年款、价格区间、销售状态和分页参数是否正确 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确 |
| 900 | 服务器内部错误 | 请联系技术支持 |

## 6. 适用场景

- 适合用于资讯抓取与内容聚合，快速补齐产品侧需要的 汽车车型库数据 数据能力。
- 适合用于舆情监控与内容分析，减少手工整理、清洗与重复开发成本。
- 适合用于搜索索引与知识库构建，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[获取品牌下车系列表](https://api.gugudata.com/v1/vehicleSeries)（GET），根据品牌查询车系列表，可按子品牌、车型级别、销售状态和价格区间筛选。
- 相关接口：[获取车系详情](https://api.gugudata.com/v1/vehicleSeries/{seriesId})（GET），根据车系公开唯一 ID 获取单个车系详情。
- 相关接口：[获取车型列表](https://api.gugudata.com/v1/vehicleTrims)（GET），查询车型列表，可按品牌、子品牌、车系、年款、销售状态和价格区间筛选。
