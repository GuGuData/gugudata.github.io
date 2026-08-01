---
title: "基于模型的高校录取概率预测 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/admission-predict"
section: "gugudata"
slug: "metadata-admission-predict"
lang: "zh-CN"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/admission-predict"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/6c0d0ce775c3155646b1d7900d165e9f.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/admission-predict](https://www.gugudata.com/api/details/admission-predict)

基于模型的高校录取概率预测 API 高校录取概率预测，AI、高考、高考录取、高等教育等关键词场景常会用到，适合用于字典与基础库查询、教育与行业数据整合与筛选条件补全与业务检索等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/6c0d0ce775c3155646b1d7900d165e9f.png)

## 1. 产品功能

- 基于 LightGBM 梯度提升框架，融合院校分数线、高校与专业录取分数线、分段位次等多源异构数据；
- 采用概率校准机制，对模型输出进行稳定化处理，提升录取概率结果的一致性与可解释性；
- 返回录取概率摘要标签，并提供分差、梯度与统计指标，辅助进行志愿分层判断；
- 支持自定义概率区间分层与每档数量，一次返回保、稳、冲等多档志愿结果；
- 支持按需返回 SHAP 因子解释，辅助理解当前预测结果的主要驱动因素；
- 支持省份过滤、白名单院校、Top-N 控制等高级筛选能力；
- 支持专业级预测；当专业样本不足时，系统会自动切换到可用的预测路径；
- 支持 Query 与 JSON 组合入参，便于脚本与后端系统同时调用；
- 预测结果会结合当前可用的最新招生年份数据与历史样本进行计算；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/admission/predict?appkey=REDACTED

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/admission/predict?appkey=REDACTED&province=YOUR_VALUE&subject_type=YOUR_VALUE&score=YOUR_VALUE&rank=YOUR_VALUE&batch=YOUR_VALUE&top_n=50&probability_tiers=YOUR_VALUE&tier_sort=probability&include_explanation=false&prefer_local=false&college_provinces=YOUR_VALUE&target_colleges=YOUR_VALUE&uuid=YOUR_VALUE&target_college_uuids=YOUR_VALUE&year=2026&major_name=YOUR_VALUE&local_batch_name=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/admission-predict](https://www.gugudata.com/preview/admission-predict)

**接口测试:** [https://api.gugudata.com/ai/admission/predict/demo](https://api.gugudata.com/ai/admission/predict/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，可通过 Query (?appkey=) 提供 |
| province | string | 是 | YOUR_VALUE | 考生所在省份，与历年分数线数据保持一致 |
| subject_type | string | 是 | YOUR_VALUE | 科类/选科：理科、文科、物理类、历史类、综合等 |
| score | number | 是 | YOUR_VALUE | 考生裸分（0-750） |
| rank | int | 否 | YOUR_VALUE | 考生全省位次，可为空（为空时结合分段位次推断） |
| batch | string | 否 | YOUR_VALUE | 报考批次，目前支持普通本科批次 |
| top_n | int | 否 | 50 | 返回院校数量上限，范围 1-200；传入 probability_tiers 时按各档位数量返回 |
| probability_tiers | array(object) | 否 | YOUR_VALUE | 概率分层配置，仅支持 JSON Body 传入。示例：[{"name":"safe","label":"保","min_probability":0.98,"limit":3},{"name":"stable","label":"稳","min_probability":0.8,"limit":3},{"name":"reach","label":"冲","min_probability":0.75,"limit":3}]。每项包含 name、label、min_probability、limit；min_probability 必须严格递减，相邻档位自动形成概率区间；可配合 tier_sort 控制每档内部取数顺序，用于一次返回保、稳、冲等多档志愿结果；不传时继续按 top_n 返回。 |
| tier_sort | string | 否 | probability | 概率分层每档内部排序策略，仅在 probability_tiers 生效时使用；可选 probability、college_rank、balanced。probability 按录取概率排序，college_rank 按院校排名优先，balanced 综合院校层次、排名和概率。 |
| include_explanation | boolean | 否 | false | 是否返回 SHAP 补充解释，默认关闭以控制响应时延，开启后仅对部分结果返回解释信息 |
| prefer_local | boolean | 否 | false | 是否在排序时优先本省院校 |
| college_provinces | array(string) | 否 | YOUR_VALUE | 按院校所在省份过滤，留空则不过滤；Query 方式可多次传值，格式 ["江苏", "上海"] |
| target_colleges | array(string) | 否 | YOUR_VALUE | 指定院校名单，仅对名单内院校预测 |
| uuid | string | 否 | YOUR_VALUE | 指定一个院校唯一 ID，仅对该院校预测；可使用全国大学高校基础信息接口返回的 SchoolUUID |
| target_college_uuids | array(string) | 否 | YOUR_VALUE | 指定院校唯一 ID 列表，仅对名单内院校预测；多个值可使用数组或逗号分隔字符串 |
| year | int | 否 | 2025 | 预测年份，用于匹配最新控制线与分数线 |
| major_name | string | 否 | YOUR_VALUE | 专业名称（用于专业级预测），命中专业样本时优先返回该专业结果；若样本不足，系统可能切换到院校层或其他兼容预测路径 |
| local_batch_name | string | 否 | YOUR_VALUE | 本地批次名称（用于过滤），不提供时默认使用 batch 参数的值 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口状态码，100 表示成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 返回时间 |
| DataStatus.DataTotalCount | int | 本次返回院校数量 |
| Data.predictions | array | 预测结果列表 |
| Data.predictions[].college_name | string | 院校名称 |
| Data.predictions[].admission_probability | float | 录取概率 (0-1) |
| Data.predictions[].recommendation | string | 结果摘要标签：录取概率高 / 需要注意梯度，但成功率较高 / 录取概率低，用于快速概览当前结果 |
| Data.predictions[].long_recommendation | string | 面向用户的长句原因解释，结合近年录取线、分差、院校层次、专业匹配情况与补充策略生成 |
| Data.predictions[].evidence | object | 关键证据信息对象，可能包含近三年最低线、加权基线分差、省控线差、院校层次、院校排名、招生计划覆盖率、聚合模式等字段 |
| Data.predictions[].shap_explanation | object | SHAP 解释信息，含 base_probability、predicted_probability、top_features，仅在 include_explanation=true 时返回 |
| Data.predictions[].major_name | string | 命中专业级预测时返回对应专业名称；若结果回退到院校层，则该字段可能为空 |
| Data.predictions[].tier_name | string | 命中的概率档位标识，仅在请求 probability_tiers 时返回 |
| Data.predictions[].tier_label | string | 命中的概率档位展示名称，仅在请求 probability_tiers 时返回 |
| Data.predictions[].tier_min_probability | float | 命中档位的录取概率下限，仅在请求 probability_tiers 时返回；下一档会自动以上一档下限作为概率上界 |
| Data.meta.total_colleges | int | 返回院校数量 |
| Data.meta.student_score | float | 考生分数 |
| Data.meta.student_province | string | 考生省份 |
| Data.meta.local_colleges | int | 结果中同省院校数量，无 is_local 字段时为 null |
| Data.meta.score_diff_min | float | 分差绝对值最小值 |
| Data.meta.score_diff_median | float | 分差绝对值中位数，用于梯度判断 |
| Data.meta.prefer_local | boolean | 是否启用本省优先排序 |
| Data.meta.college_provinces | array(string) | 请求中用于过滤院校省份的列表 |
| Data.meta.model_version | string | 模型版本号 |
| Data.meta.probability_tiers | array(object) | 概率分层返回统计，仅在请求 probability_tiers 时返回；每项包含 name、label、min_probability、limit、returned_count，下一档会自动以上一档下限作为概率上界 |
| Data.meta.tier_sort | string | 本次概率分层每档内部排序策略，仅在请求 probability_tiers 时返回 |
| Data.meta.fallback.applied | boolean | 是否启用了 fallback 或补充预测策略 |
| Data.meta.fallback.strategy | string | fallback 策略标识，用于说明当前结果采用的兼容预测路径 |
| Data.meta.fallback.requested_year | int | 请求中传入的目标预测年份 |
| Data.meta.fallback.effective_year | int | 实际用于匹配分数线或历史样本的有效年份 |
| Data.meta.fallback.requested_major_name | string | 请求中传入的专业名称 |
| Data.meta.fallback.effective_major_name | string | 实际命中的参考专业名称；若未命中稳定专业样本则为空 |
| Data.disclaimer | string | 免责声明 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 501 | 参数错误 | 缺少 province、subject_type、score 或 appkey 等必填参数 |
| 502 | 请求频率受限 | 请降低请求频率 |
| 503 | APPKEY 过期或订单失效 | 请前往开发者中心确认订单有效期 |
| 504 | APPKEY 错误 | 请检查传递的 APPKEY 是否正确 |
| 505 | 超出调用次数 | 当前 APPKEY 已达到订单调用上限 |
| -9 | 预测失败或服务处理异常 | 模型服务异常、数据源异常或内部处理失败时返回 |

## 6. 适用场景

- 适合用于字典与基础库查询，快速补齐产品侧需要的 基于模型的高校录取概率预测 数据能力。
- 适合用于教育与行业数据整合，减少手工整理、清洗与重复开发成本。
- 适合用于筛选条件补全与业务检索，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 相关接口：[专业录取线按录取概率排序](https://api.gugudata.com/ai/admission/major-line-rank?appkey=REDACTED)（POST），先查询历年高考专业录取分数线候选集，再结合录取概率预测结果排序返回，适合按省份、科类和分数筛选专业线后做志愿梯度参考。
