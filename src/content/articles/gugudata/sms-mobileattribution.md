---
title: "手机归属地查询 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/mobileattribution"
section: "gugudata"
slug: "sms-mobileattribution"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/mobileattribution"
cover: "https://static.gugudata.com/api_logo_phonelocation.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/mobileattribution](https://www.gugudata.com/api/details/mobileattribution)

手机归属地查询 API 精确查询手机号码的归属地，基础数据、网络工具等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_logo_phonelocation.jpg)

## 1. 产品功能

- 提供精确、高效的手机归属地查询，支持用户标记的返回；
- 每周定时更新全网最全的数据集；
- 超高查询性能，毫秒级返回；
- 围绕“手机归属地查询”提供标准化能力，便于快速接入现有业务；
- 适合将“手机归属地查询”结果接入业务系统、后台工具和自动化流程；
- 适合注册登录、客户资料清洗和号码质量校验场景；
- 可与手机号归属地和国际号码校验接口组合使用；
- 支持对用户输入号码进行格式检查和地域补全；

## 2. API 文档

**接口地址:** https://api.gugudata.com/sms/mobileattribution

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/sms/mobileattribution?appkey=REDACTED&mobile=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/mobileattribution](https://www.gugudata.com/preview/mobileattribution)

**接口测试:** [https://api.gugudata.com/sms/mobileattribution/demo](https://api.gugudata.com/sms/mobileattribution/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| mobile | string | 是 | YOUR_VALUE | 查询的手机号码 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.MobileNumber | string | 查询的手机号码 |
| Data.Province | string | 手机号码所在的省份 |
| Data.City | string | 手机号码所在的市 |
| Data.Operator | string | 手机运营商 |
| Data.AreaCode | string | 手机所在地区号 |
| Data.ZipCode | string | 手机所在地邮编 |
| Data.UserTag | string | 用户对此电话号码的标记，仅供参考 |

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

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 手机归属地查询 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[国际手机号码检查纠正](https://www.gugudata.com/api/details/internationalphone)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
- 可搭配使用：[域名 Whois 查询](https://www.gugudata.com/api/details/whois)，适合补充同类场景的接口能力。
