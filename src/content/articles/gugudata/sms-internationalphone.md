---
title: "国际手机号码检查纠正 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/internationalphone"
section: "gugudata"
slug: "sms-internationalphone"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/internationalphone"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/05017ce9f054af5591411cddd0d07dcb.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/internationalphone](https://www.gugudata.com/api/details/internationalphone)

国际手机号码检查纠正 API 格式有效性检查及智能纠正，网络工具等关键词场景常会用到，适合用于站点内容抽取与网页分析、SEO 检查与页面结构处理与网页自动化采集与结构化输出等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/05017ce9f054af5591411cddd0d07dcb.jpg)

## 1. 产品功能

- 智能检测国际手机号码格式有效性；
- 可根据提供的国家编码参数，判断提供的手机号码是否为该国家有效手机号码；
- 智能纠正提供的手机号码格式为统一的国际编码格式，供后续如发送短信等场景统一使用；
- 毫秒级响应性能；
- 围绕“国际手机号码检查纠正”提供标准化能力，便于快速接入现有业务；
- 适合将“国际手机号码检查纠正”结果接入业务系统、后台工具和自动化流程；
- 适合注册登录、客户资料清洗和号码质量校验场景；
- 可与手机号归属地和国际号码校验接口组合使用；

## 2. API 文档

**接口地址:** https://api.gugudata.com/sms/internationalphone

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/sms/internationalphone?appkey=REDACTED&phone=PHONE&countrycode=COUNTRY_CODE

**数据预览:** [https://www.gugudata.com/preview/internationalphone](https://www.gugudata.com/preview/internationalphone)

**接口测试:** [https://api.gugudata.com/sms/internationalphone/demo](https://api.gugudata.com/sms/internationalphone/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| phone | string | 是 | PHONE | 查询的手机号码，如 +1(817) 569-8900 |
| countrycode | string | 否 | COUNTRY_CODE | ISO-3166 标准的两位或三位国家代码，用于校验号码在提供的归属国家是否为有效号码，如 US, USA，不传递则智能纠错 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| Data.IsValid | boolean | 手机号码是否有效，如提供了 countrycode 参数，此参数表示号码是否在指定国家有效 |
| Data.SourceMobileNumber | string | 请求的原始手机号码 |
| Data.CorrectedMobileNumber | string | 纠正后的手机号码 |
| Data.CountryCode | string | 国家电话前缀，如 +1 |
| Data.CountryCode2 | string | [ISO-3166](https://www.iso.org/iso-3166-country-codes.html) 标准两位国家代码 |
| Data.CountryCode3 | string | [ISO-3166](https://www.iso.org/iso-3166-country-codes.html) 标准三位国家代码 |

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

- 适合用于站点内容抽取与网页分析，快速补齐产品侧需要的 国际手机号码检查纠正 数据能力。
- 适合用于SEO 检查与页面结构处理，减少手工整理、清洗与重复开发成本。
- 适合用于网页自动化采集与结构化输出，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[手机归属地查询](https://www.gugudata.com/api/details/mobileattribution)，适合补充同类场景的接口能力。
- 可搭配使用：[获取任意站点标题与图标](https://www.gugudata.com/api/details/favicon)，适合补充同类场景的接口能力。
- 可搭配使用：[域名 Whois 查询](https://www.gugudata.com/api/details/whois)，适合补充同类场景的接口能力。
