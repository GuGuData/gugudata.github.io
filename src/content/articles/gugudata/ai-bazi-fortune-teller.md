---
title: "盲派八字推理 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/bazi-fortune-teller"
section: "gugudata"
slug: "ai-bazi-fortune-teller"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/bazi-fortune-teller"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/331dfa6abc23a1cb1916b816d3650e28.jpg"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/bazi-fortune-teller](https://www.gugudata.com/api/details/bazi-fortune-teller)

盲派八字推理 API 基于确定性历法排盘与自有模型解读的个人趋势参考，AI、八字命理、传统文化等关键词场景常会用到，适合用于传统文化内容与娱乐参考、个人周期趋势解读与文化类产品与内容服务接入等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/331dfa6abc23a1cb1916b816d3650e28.jpg)

## 1. 产品功能

- 支持结构化出生信息输入，并兼容现有 userinfo 自然语言调用；
- 先完成公历、农历与四柱排盘，再基于固定排盘基础生成文化解读；
- 明确返回标准化输入、历法换算、年柱、月柱、日柱和时柱，便于业务系统核对与展示；
- 支持同步、异步任务和 SSE 流式三种响应方式；
- 覆盖五行、大运、学业与事业、关系、财务和健康等文化解读维度；
- 结果用于传统文化研究与娱乐参考，不作为现实决策依据；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/bazi-fortune-teller?appkey=REDACTED&streaming={{streaming}}&responseMode={{responseMode}}

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/bazi-fortune-teller?appkey=REDACTED&streaming=false&responseMode=sync&userinfo=YOUR_VALUE&gender=YOUR_VALUE&calendarType=YOUR_VALUE&birthDate=YOUR_VALUE&birthTime=YOUR_VALUE&birthPlace=YOUR_VALUE&isLeapMonth=false

**数据预览:** [https://www.gugudata.com/preview/bazi-fortune-teller](https://www.gugudata.com/preview/bazi-fortune-teller)

**接口测试:** [https://api.gugudata.com/ai/bazi-fortune-teller/demo](https://api.gugudata.com/ai/bazi-fortune-teller/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 购买本接口后获得的 APPKEY。推荐通过 Query 参数 appkey、请求头 X-GUGUDATA-APPKEY 或 X-API-Key 提供；JSON Body 中的 appkey 仅用于兼容已有接入。 |
| userinfo | string | 否 | YOUR_VALUE | 旧版自然语言兼容参数。必须同时写明性别、历法、出生日期和出生时间，例如：我是男性，我的公历出生日期是2016年11月23日，出生时间是18:00。与结构化参数同时提供时，以 gender、calendarType、birthDate、birthTime 等结构化参数为准。 |
| gender | string | 否 | YOUR_VALUE | 结构化调用时必填。性别，支持：男、女、male、female。 |
| calendarType | string | 否 | YOUR_VALUE | 结构化调用时必填。birthDate 使用的历法，支持：公历、农历、solar、gregorian、lunar。 |
| birthDate | string | 否 | YOUR_VALUE | 结构化调用时必填。出生日期，严格使用 YYYY-MM-DD 格式，支持范围为 1901-01-01 至 2100-12-31；calendarType=农历时填写农历年月日。 |
| birthTime | string | 否 | YOUR_VALUE | 结构化调用时必填。出生时间，推荐使用 HH:mm 24 小时制，例如 18:00。支持丑时至亥时等传统时辰输入，并按该时辰的中间时刻标准化；子时跨越两个公历日期，必须改用 HH:mm 明确具体时间。 |
| birthPlace | string | 否 | YOUR_VALUE | 出生地点，用于文化解读背景。当前排盘统一按 Asia/Shanghai 时区和输入的北京时间计算，不根据经度进行真太阳时校正。 |
| isLeapMonth | boolean | 否 | false | 仅 calendarType=农历时有效。出生月份是否为闰月；公历输入必须为 false。 |
| streaming | boolean | 否 | false | 是否使用 SSE 流式响应。false 返回完整 JSON；true 先发送 type=content 的文本片段，最后发送 type=done，其中 result 为包含确定性排盘基础的完整结果。 |
| responseMode | string | 否 | sync | 响应模式，支持 sync、task。sync 在当前请求中返回结果；task 先返回 operationId，再调用任务状态查询接口轮询。responseMode=task 不能与 streaming=true 同时使用。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.RequestParameter | string | 本次请求采用的标准化参数摘要，不包含完整 APPKEY。 |
| DataStatus.StatusCode | int | 业务状态码。100 表示成功；101 表示参数错误；102 表示请求频率受限；104 表示 APPKEY 无效或未购买本接口。 |
| DataStatus.StatusDescription | string | 业务状态说明；参数错误时会指出缺少或格式不正确的字段。 |
| DataStatus.ResponseDateTime | string | 接口响应生成时间。 |
| DataStatus.DataTotalCount | int | 当前返回的业务结果数量；同步成功时通常为 1。 |
| Data.排盘基础 | object | 由历法组件计算并固定返回的排盘依据，包含标准化输入、历法换算、四柱和八字。文化解读以此字段为准。 |
| Data.排盘基础.输入信息 | object | 标准化后的性别、历法、出生日期、出生时间、出生地点、闰月标识及时间标准化说明。 |
| Data.排盘基础.历法换算.公历时间 | string | 排盘实际采用的公历时间，格式为 YYYY-MM-DD HH:mm:ss；农历输入会先换算为此时间。 |
| Data.排盘基础.历法换算.农历日期 | string | 排盘实际对应的农历日期。 |
| Data.排盘基础.历法换算.时区 | string | 排盘使用的时区，固定为 Asia/Shanghai。 |
| Data.排盘基础.历法换算.日界规则 | string | 日期换日规则。23:00 至 23:59 仍属于输入的公历日期，次日 00:00 后进入下一日。 |
| Data.排盘基础.四柱 | object | 确定性计算得到的年柱、月柱、日柱、时柱。 |
| Data.八字 | string | 按年柱、月柱、日柱、时柱顺序拼接的八字结果，与 Data.排盘基础.四柱保持一致。 |
| Data.五行 | object | 基于排盘基础生成的五行属性、强弱及喜忌文化解读，具体子字段可能随命盘内容变化。 |
| Data.命宫 | string | 命宫相关文化解读。 |
| Data.身宫 | string | 身宫相关文化解读。 |
| Data.大运 | array(object) | 分阶段的大运文化解读。每项通常包含起始年份、终止年份、干支或阶段主题，具体字段以实际返回为准。 |
| Data.运势分析 | object | 学业与事业、关系、财务、健康、体貌特征及关键阶段等维度的文化解读。 |
| Data.综合评价 | string | 基于排盘基础生成的综合文化解读。 |
| Data.免责声明 | string | 结果使用边界说明，仅供传统文化研究与娱乐参考。 |
| Data.operationId | string | 仅 responseMode=task 时返回，作为后续任务状态查询的唯一标识。 |
| Data.status | string | 仅任务模式返回，可能值为 PENDING、RUNNING、SUCCEEDED、FAILED、EXPIRED。 |
| Data.pollingUrl | string | 仅任务模式返回，用于轮询任务状态的相对路径。 |
| Data.expiresAt | string | 仅任务模式返回，任务结果的过期时间。 |
| Data.result | object | 任务状态为 SUCCEEDED 时返回的完整业务结果，字段结构与同步模式的 Data 相同。 |
| Data.error | object | 任务状态为 FAILED 时返回的业务侧失败信息。 |
| SSE.done.result | object | 仅 streaming=true 时，在最后一个 type=done 消息中返回的完整且已校验结果。 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | 请求成功。 |
| 101 | 参数错误 | 出生信息缺失、日期时间格式错误、历法值无效、农历闰月设置错误，或 task 与 streaming 参数冲突。 |
| 102 | 请求频率受限 | 当前请求频率超过 APPKEY 的 QPS 限制。 |
| 104 | APPKEY 错误 | APPKEY 无效、已过期或未购买本接口。 |

## 6. 适用场景

- 适合用于传统文化内容与娱乐参考，快速补齐产品侧需要的 盲派八字推理 数据能力。
- 适合用于个人周期趋势解读，减少手工整理、清洗与重复开发成本。
- 适合用于文化类产品与内容服务接入，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[任务状态查询](https://api.gugudata.com/ai/operations/{operation_id}?appkey=REDACTED)（GET），轮询异步任务状态，任务成功时在 Data.result 返回完整结果。
