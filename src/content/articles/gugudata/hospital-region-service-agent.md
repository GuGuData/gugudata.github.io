---
title: "用地区、定位、天气和三甲医院接口构建本地服务查询 Agent"
description: "摘要:本地服务查询并不只是关键词搜索。本文演示如何把省市区数据、坐标转换、IP 定位、三甲医院主体信息、天气和空气质量接口组合起来,构建一个面向本地服务问答和就医信息查询的 Agent。"
section: "gugudata"
slug: "hospital-region-service-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/014_hospital_region_service_agent.png"
author: "GuGuData"
---
摘要：本地服务查询并不只是关键词搜索。本文演示如何把省市区数据、坐标转换、IP 定位、三甲医院主体信息、天气和空气质量接口组合起来，构建一个面向本地服务问答和就医信息查询的 Agent。

关键词：三甲医院 API、本地服务 Agent、省市区 API、天气 API、空气质量 API、位置查询

## 问题背景

用户问“附近有哪些三甲医院”“某个城市有哪些医院”“今天适不适合出门就医”时，系统需要理解地区、城市、距离、天气和空气质量等上下文。单纯让模型回答，容易出现地点不准、名称过时或建议过度的问题。

更稳妥的做法是让 Agent 先确认位置和行政区，再查询医院主体信息，并把天气和空气质量作为辅助信息展示。模型负责组织语言和提醒边界，不提供诊断结论。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/014_hospital_region_service_agent.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 行政区查询 | [全国省市区街道村信息](https://www.gugudata.com/api/details/chinaregions) | GET | 规范化省、市、区等地区字段 |
| IP 定位 | [国内 IP 地址定位](https://www.gugudata.com/api/details/iplocation) | GET | 在用户未输入城市时提供粗定位参考 |
| 坐标转换 | [地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter) | GET | 对接地图或定位系统时统一坐标 |
| 医院查询 | [全国三甲医院主体信息](https://www.gugudata.com/api/details/hospital-3a) | GET | 按省、市、区或关键词查询医院 |
| 天气信息 | [全国天气预报信息](https://www.gugudata.com/api/details/weatherinfo) | GET | 展示出行相关天气 |
| 空气质量 | [全国实时空气质量指数](https://www.gugudata.com/api/details/airquality) | GET | 补充空气质量参考 |

## 调用示例

按城市查询三甲医院：

```bash
curl -G "https://api.gugudata.com/location/hospital-3a" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "province=江苏省" \
  --data-urlencode "city=南京市" \
  --data-urlencode "pageIndex=1" \
  --data-urlencode "pageSize=20"
```

查询行政区信息：

```bash
curl -G "https://api.gugudata.com/location/chinaregions" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "regioncode=320100" \
  --data-urlencode "version=3"
```

查询天气预报：

```bash
curl -G "https://api.gugudata.com/weather/weatherinfo" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "city=南京"
```

Agent 可以先把位置字段规范化：

```python
def normalize_location(input_text: str, fallback_city: str | None = None) -> dict:
    """Build a location query object for local service search."""
    return {
        "keyword": input_text.strip(),
        "city": fallback_city,
        "needs_region_lookup": bool(input_text and not fallback_city),
    }
```

## 输出怎么组织

本地服务类结果建议拆成三部分：

| 区块 | 内容 |
| --- | --- |
| 查询条件 | 用户输入、省市区、是否使用定位辅助 |
| 医院列表 | 医院名称、所在地区、主体信息、匹配原因 |
| 出行参考 | 天气、空气质量、数据更新时间 |

如果用于医疗服务入口，页面文案应保持谨慎。系统可以帮助用户查找医院主体信息，但不应替代医生诊断，也不应根据症状直接给治疗方案。

## 标准架构拆解

本地服务 Agent 可以拆成以下模块：

| 模块 | 责任 |
| --- | --- |
| 位置解析 | 处理用户输入、IP 定位、地图坐标和行政区字段 |
| 服务检索 | 查询医院主体信息或其他本地服务数据 |
| 环境补充 | 获取天气、空气质量等出行参考 |
| 结果排序 | 按地区匹配、关键词匹配和用户偏好排序 |
| 问答输出 | 生成清晰、克制、可复核的查询结果 |

位置解析应尽量结构化。比如“南京鼓楼附近”需要拆成城市、区县和关键词；如果用户只说“附近”，则需要明确是否允许使用 IP 或定位信息。

## 数据流与接口边界

推荐流程如下：

1. 用户输入位置和服务需求。
2. Agent 判断是否需要补充城市或行政区。
3. 使用省市区接口规范化地区字段。
4. 根据城市、区县或关键词查询三甲医院。
5. 根据城市补充天气和空气质量。
6. 输出医院列表，并标明查询条件和数据来源。
7. 如果结果为空，提示用户放宽地区或关键词。

接口边界上，医院接口返回的是主体信息；天气和空气质量只是出行参考。Agent 不应把天气或空气质量解释成医学建议。

## 错误处理

如果用户拒绝提供位置，Agent 应允许按城市或关键词检索。若 IP 定位和用户输入城市不一致，应优先使用用户明确输入，并在结果中说明查询条件。

如果医院查询无结果，可以尝试扩大到市级或省级范围。不要为了给出结果而返回无关城市的医院。

## 可靠性与观测

建议记录以下指标：

| 指标 | 用途 |
| --- | --- |
| location_parse_success_rate | 位置解析成功率 |
| hospital_result_count | 医院查询结果数量 |
| fallback_to_city_count | 区县无结果后回退市级的次数 |
| weather_fetch_success_rate | 天气接口成功率 |
| user_refine_query_count | 用户二次调整查询的次数 |

当回退次数过多时，说明用户输入和行政区字段匹配存在问题，需要优化位置解析和同义词处理。

## 落地清单

- 查询前明确位置来源，区分用户输入和定位推断。
- 医院结果展示查询条件，不隐藏筛选依据。
- 医疗相关文案保持中性，不输出诊断或处方建议。
- 天气和空气质量作为出行参考，不作为医疗判断依据。
- 对用户位置和查询历史设置必要的隐私保护。

## 可扩展方向

这个 Agent 可以继续接入国际 IP 地址定位和国家地区基础信息接口，支持跨境访问场景；也可以接入二维码生成接口，为线下服务入口生成医院信息卡或预约入口二维码。

## 相关接口

- [全国省市区街道村信息](https://www.gugudata.com/api/details/chinaregions)
- [国内 IP 地址定位](https://www.gugudata.com/api/details/iplocation)
- [地理坐标系转换](https://www.gugudata.com/api/details/coordinateconverter)
- [全国三甲医院主体信息](https://www.gugudata.com/api/details/hospital-3a)
- [全国天气预报信息](https://www.gugudata.com/api/details/weatherinfo)
- [全国实时空气质量指数](https://www.gugudata.com/api/details/airquality)
