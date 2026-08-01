---
title: "A 股财报 AI 智能解读 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/stock-financial-report-analysis"
section: "gugudata"
slug: "stock-stock-financial-report-analysis"
lang: "zh-CN"
status: "published"
tags: ["AI","API","GuGuData"]
publishedAt: "2026-05-23T08:00:41.000Z"
updatedAt: "2026-05-23T08:00:41.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/stock-financial-report-analysis"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/68b5ccd4acf0117c90fa0bacec4b5b60.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/stock-financial-report-analysis](https://www.gugudata.com/api/details/stock-financial-report-analysis)

A 股财报 AI 智能解读 API 面向 A 股报表指标、行情区间、资金流与新闻证据提供结构化 AI 分析，AI、财报、A 股、风险信号等关键词场景常会用到。接口适合用于证券行情与财报数据查询、投研分析与策略开发、监控告警和交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://assets.devopen.club/uPic/202608/gugudata-pages/68b5ccd4acf0117c90fa0bacec4b5b60.png)

## 1. 产品功能

- 支持 A 股代码输入，自动返回股票基础信息、行情区间、财务指标与财务报表摘要；
- AI 自动解读增长、盈利、现金流、偿债与资金流等结构化信号；
- 输出稳定结构化 JSON，便于业务系统、投研工具和报表页面直接接入；
- 支持近期新闻证据与资金流信息，辅助理解财务指标变化背景；
- 提供数据可用性提示，便于识别部分数据暂不可用时的分析边界；
- 仅作公开信息整理与风险提示，不提供买卖建议或收益承诺；
- 全接口支持 HTTPS（TLS v1.0 / v1.1 / v1.2 / v1.3）；
- 全面兼容 Apple ATS；
- 全国多节点 CDN 部署；
- 接口极速响应，多台服务器构建 API 接口负载均衡；

## 2. API 文档

**接口地址:** https://api.gugudata.com/ai/stock-financial-report-analysis

**返回格式:** application/json; charset=utf-8

**请求方式:** POST

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/ai/stock-financial-report-analysis?appkey=REDACTED

**请求头:** Content-Type: application/json

**请求体示例:**

```json
{
  "symbol": "600519",
  "startYear": "2020",
  "includeNews": true,
  "includeFundFlow": true,
  "language": "zh-CN"
}
```

**数据预览:** [https://www.gugudata.com/preview/stock-financial-report-analysis](https://www.gugudata.com/preview/stock-financial-report-analysis)

**接口测试:** [https://api.gugudata.com/ai/stock-financial-report-analysis/demo](https://api.gugudata.com/ai/stock-financial-report-analysis/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY，可通过 Query、请求头或 JSON Body 传递 |
| symbol | string | 是 | 600519 | 6 位 A 股股票代码，支持传入 600519、SH600519、SZ000001 等格式 |
| startYear | string | 否 | 2020 | 财务指标起始年份，4 位年份格式，默认 2020 |
| includeNews | boolean | 否 | true | 是否返回近期新闻证据，默认 true |
| includeFundFlow | boolean | 否 | true | 是否返回资金流相关指标，默认 true |
| language | string | 否 | zh-CN | AI 分析语言，默认 zh-CN |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| DataStatus.StatusCode | int | 接口返回状态码，100 为成功 |
| DataStatus.StatusDescription | string | 接口返回状态说明 |
| DataStatus.ResponseDateTime | string | 接口数据返回时间 |
| DataStatus.DataTotalCount | int | 正常返回时为 1 |
| Data.stockProfile | object | 股票基础信息，包含代码、名称、行业、上市日期、市值、流通市值等字段 |
| Data.marketSnapshot | object | 近期行情区间摘要，包含最新收盘价、区间涨跌幅、成交量、换手率等字段 |
| Data.financialMetrics | object | 财务指标摘要，包含 ROE、净利润增长率、资产负债率、每股经营性现金流等字段 |
| Data.financialStatements | object | 资产负债表、利润表、现金流量表关键字段摘要 |
| Data.fundFlow | object | 资金流摘要，包含近阶段主力资金净流入、资金流排名等字段 |
| Data.newsEvidence | object | 近期新闻证据列表，包含标题、发布时间与摘要 |
| Data.computedSignals | object | 规则计算出的增长、盈利、现金流、偿债、资金流与数据质量信号 |
| Data.aiAnalysis | object | AI 对结构化数据、异常指标、风险提示和数据局限性的解释 |
| Data.dataAvailability | object | 数据可用性提示，包含完整、部分可用或暂不可用等状态 |
| Data.complianceNotice | string | 合规提示，本接口仅作信息分析，不构成投资建议 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 100 | 正常返回 | - |
| 101 | 参数错误 | 请检查 symbol、startYear 等参数是否完整且格式正确 |
| 102 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 103 | 账号欠费 | - |
| 104 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 110 | 接口响应错误 | 处理异常，请稍后重试 |

## 6. 适用场景

- 适合用于股票数据终端、投研工具或内部研究看板，快速补齐 A 股财报 AI 解读与风险提示能力。
- 适合用于量化研究、财务分析和行业跟踪流程，减少手工整理报表、行情、资金流与新闻证据的成本。
- 适合用于监控告警和交易前筛选，将结构化分析结果接入后台系统、数据任务或内容生产流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
