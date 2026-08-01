---
title: "生肖周期内容运营台功能需求文档"
description: "所属分类:传统文化/内容运营\\ 产品案例页:https://engineering.gugudata.com/products/fortune/chinese-zodiac-content-operations/"
section: "gugudata"
slug: "sheng-xiao-zhou-qi-nei-rong-yun-ying-tai-gong-neng-xu-qiu-wen-dang"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
canonicalUrl: "https://engineering.gugudata.com/products/fortune/chinese-zodiac-content-operations/"
cover: "https://assets.devopen.club/uPic/202607/chinese-zodiac-content-operations-html-v2.png"
author: "GuGuData"
---
![生肖周期内容运营台界面截图](https://assets.devopen.club/uPic/202607/chinese-zodiac-content-operations-html-v2.png)

> 所属分类：传统文化/内容运营\
> 产品案例页：[https://engineering.gugudata.com/products/fortune/chinese-zodiac-content-operations/](https://engineering.gugudata.com/products/fortune/chinese-zodiac-content-operations/)

## 产品定位与截图范围

生肖周期内容运营台面向传统文化内容平台和多渠道运营团队，提供十二生肖筛选、周期选择、内容生成、人工审核、多语言版本、发布日历和任务状态管理。它把单次生肖周期接口封装为可批量编排的内容生产流程，适合准备今日、明日、本周、本月和本年主题内容。

截图覆盖生肖选择、周期范围、目标日期、内容卡片、十二生肖对照表、发布日历、质量检查、渠道预览和异步任务状态。页面必须明确：生肖基础归属与周期边界由规则计算，文化解读仅用于研究和娱乐参考。

## 目标用户与业务场景

主要用户包括内容运营人员、传统文化栏目编辑、多语言内容团队、社交媒体运营和会员订阅产品开发者。

典型场景包括：

- 为十二生肖生成当天内容，并按渠道审核后定时发布；
- 只选择某一生肖，查看今日、本周或本月的主题和提醒；
- 通过出生年份换算生肖，生成用户侧个性化内容；
- 预生成次日或下一周期内容，避免高峰期集中调用；
- 为简体中文、繁体中文和英文渠道维护独立审核状态。

## 截图可见信息组织

顶部导航包括内容看板、周期管理、生肖内容、发布计划和数据统计。左侧显示十二生肖、今日/明日/本周/本月/本年周期、目标日期、语言和响应模式。

中间顶部展示规范化生肖、周期起止范围和结果更新时间。周期主题、事业学习、关系沟通、生活提醒四张卡片构成主要内容。十二生肖表用于运营侧查看生成与审核状态，不应把不同生肖内容排列成现实优劣排名。

右侧包含草稿审核、质量检查、渠道预览、异步任务状态和发布清单。发布动作必须基于审核状态，接口生成成功不等于内容可以自动发布。

## 核心功能需求

1. 生肖选择：支持直接选择中文生肖，或通过出生年份换算生肖。
2. 输入互斥：`zodiac` 与 `birthYear` 必须且只能传一个。
3. 周期管理：支持今日、明日、本周、本月和本年，展示规范化起止范围。
4. 内容生成：按周期主题、事业学习、关系沟通和生活提醒组织结果。
5. 批量编排：十二生肖批量任务由产品后台逐项调用并分别保存状态。
6. 内容审核：支持草稿、待审核、已通过、需修改和已发布状态。
7. 多语言管理：不同语言版本独立生成、审核和记录更新时间。
8. 发布控制：渠道发布前检查内容完整性、免责声明和计划时间。

## 主要操作流程

1. 运营人员选择单个或多个生肖。
2. 选择周期、目标日期和输出语言。
3. 系统检查使用生肖名称还是出生年份，禁止两者同时提交。
4. 单个内容直接生成；批量内容创建多个独立任务。
5. 页面展示基础生肖、周期边界和四类内容。
6. 编辑人员完成事实一致性、格式和使用边界检查。
7. 内容进入渠道预览，审核通过后加入发布日历。
8. 发布结果与接口任务结果分别记录，避免状态混淆。

## 数据与结果展示

每条内容必须绑定生肖、周期、目标日期、语言、请求 ID 和生成时间。十二生肖表展示的是内容生产状态、审核状态和渠道状态，不把文化内容量化为现实能力或命运排序。

周期边界按北京时间计算。今日与明日显示具体日期，本周、本月和本年显示开始与结束日期。用户修改 `targetDate` 或 `period` 后，旧草稿保留为历史版本，当前预览立即失效。

质量检查至少覆盖必填内容、生肖一致性、周期一致性、语言完整性、敏感表达和免责声明。内容生成成功但质量检查失败时，状态保持“需修改”，不得自动进入发布队列。

## 接口调用蓝图

| 业务步骤 | 接口名称 | 接口文档 | 请求地址 | 关键入参 | 关键出参 | 传参关系 |
| --- | --- | --- | --- | --- | --- | --- |
| 生成生肖周期内容 | 生肖周期趋势解读 | [chinese-zodiac-period-insight](https://www.gugudata.com/api/details/chinese-zodiac-period-insight) | `POST https://api.gugudata.com/ai/chinese-zodiac-period-insight` | `zodiac` 或 `birthYear`、`period`、`targetDate`、`language`、`responseMode`、`streaming` | `Data.基础数据.生肖`、`Data.基础数据.周期标识`、`Data.文化解读` | 生肖名称与出生年份二选一；周期和日期共同决定结果范围。 |
| 查询异步任务 | 任务状态查询 | operation 查询接口 | `GET https://api.gugudata.com/ai/operations/{operation_id}` | `operation_id*`、`appkey*` | 任务状态、结果或失败原因 | 批量任务为每个生肖保存独立 `operationId`，不得共用状态。 |

## 参数流转说明

直接选择生肖时传 `zodiac`；通过年份换算时传 `birthYear`，范围为 1900–2100。两者同时为空或同时存在都应在前端阻止提交。`period` 支持 `today`、`tomorrow`、`week`、`month` 和 `year`，`targetDate` 为周期计算基准。

批量生成十二生肖内容时，产品层创建十二个独立请求，每条任务保留自己的输入、`operationId`、状态和结果。某一项失败不能覆盖其他已成功内容，重试时只重试失败项。

## 体验要求与验收标准

页面需要让运营人员快速判断当前正在处理哪个生肖、哪个周期、哪一天和哪种语言。批量表格必须支持筛选失败、待审核和待发布内容。移动端以单生肖内容预览为主，批量运营能力可进入独立页面。

验收时需要确认：生肖与出生年份二选一校验是否生效；五种周期边界是否正确；批量任务是否独立；内容审核与接口任务状态是否分开；多语言版本是否独立；渠道发布是否必须经过审核；免责声明是否进入最终渠道预览。

## 截图功能验收清单

- 十二生肖选择状态唯一且清晰；
- 周期与目标日期共同决定显示范围；
- 批量任务逐生肖记录进度和失败原因；
- 内容卡片与当前生肖、周期和语言一致；
- 质量检查不以生成成功代替审核通过；
- 发布日历展示计划、已发布和失败状态；
- 多语言版本有独立更新时间；
- 文化娱乐参考说明随内容一同发布。

---

## 关于 GuGuData Engineering 产品案例

更多产品案例请访问 [GuGuData Engineering 产品案例](https://engineering.gugudata.com/products/)。

GuGuData Engineering 产品案例页展示基于咕咕数据接口能力构建的数据接入、业务流程和产品原型，帮助团队从真实业务场景出发，快速评估接口组合、调用方式和落地价值。
