---
title: "财报分析助手如何保留数据依据：A 股财务数据与解读结果分层"
description: "财报分析助手如何保留数据依据，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何把 A 股基础信息、财务报表、业绩和资金流组织成可复核的财报分析流程”给出一套可以直接落到任务状态和数据契约上的实现方式。"
section: "gugudata"
slug: "fundamentalinfo-cnannualreport-stock-financial-report-analysis"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:04.000Z"
updatedAt: "2026-09-01T12:37:04.000Z"
author: "GuGuData"
---
财报分析助手如何保留数据依据，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何把 A 股基础信息、财务报表、业绩和资金流组织成可复核的财报分析流程”给出一套可以直接落到任务状态和数据契约上的实现方式。

## 问题与结果

原始指标、计算口径和 AI 解读分别存储，报告观点能够回到具体报表期和数据字段。

最终交付不是一段不可追溯的模型回答，而是一组带来源、版本、状态和失败记录的数据。这样既方便接入后续系统，也能在接口、页面或模型输出变化时定位问题。

## 适用场景

- 财报季公司跟踪
- 投研资料初步整理
- 财务指标异常提醒

## 实现前先确定边界

1. 证券代码、报告期和公告日期必须同时记录
2. 原始报表与派生指标分层
3. 缺失值不得自动补零，AI 解读不得写成投资结论

## 可验证工作流

![财报分析助手如何保留数据依据工作流架构图](https://assets.devopen.club/uPic/202608/fundamentalinfo-workflow.png?v=eedda5bbc1f3)

## API 编排与职责

| 数据层 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 公司基础信息 | [A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo) | GET | 获取公司基础资料和证券信息 |
| 财务报表 | [A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport) | GET | 获取资产负债、利润、现金流等历史数据 |
| 业绩数据 | [A 股业绩报表数据](https://www.gugudata.com/api/details/performance-statement) | GET | 获取业绩披露数据 |
| 资金流 | [A 股个股资金流](https://www.gugudata.com/api/details/stockcncashflow) | GET | 观察市场资金变化 |
| 智能解读 | [A 股财报 AI 智能解读](https://www.gugudata.com/api/details/stock-financial-report-analysis) | POST | 生成财报解读文本 |

## 最小可运行实现

```bash
curl -G "https://api.gugudata.com/stock/cn/fundamentalinfo" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "symbol=600519"
```

```bash
curl -X POST "https://api.gugudata.com/ai/stock-financial-report-analysis" \
  -H "Content-Type: application/json" \
  -d '{
    "appkey": "YOUR_APPKEY",
    "symbol": "600519",
    "startYear": "2020",
    "includeNews": true,
    "includeFundFlow": true,
    "language": "zh-CN"
  }'
```

在服务端可以把多个接口结果合并成一个分析上下文：

```python
def build_research_context(profile: dict, finance: dict, cash_flow: dict) -> dict:
    """Build a compact context for a financial research agent."""
    return {
        "company": profile.get("companyName"),
        "industry": profile.get("industry"),
        "latestFinance": finance,
        "cashFlow": cash_flow,
    }
```

## 输出建议

一个可读的投研摘要可以分成四段：

| 段落 | 内容 |
| --- | --- |
| 公司画像 | 公司名称、行业、主营业务和证券信息 |
| 财务变化 | 收入、利润、现金流等关键变化 |
| 市场行为 | 资金流或行情相关观察 |
| 风险提示 | 数据更新时间、异常值、仍需人工判断的事项 |

## 失败分类与降级

股票代码不存在、接口无数据或财报期数不完整时，Agent 应返回“数据不足”，而不是补写不存在的趋势。资金流数据也不应被单独解释为投资建议，它只适合作为观察指标之一。

## 工程化注意事项

- 文章和产品输出都要避免写成投资承诺，重点是公开数据整理和辅助分析。
- 每个结论都保留来源接口和查询参数，方便复核。
- 财报类接口适合异步任务，避免用户等待过久。
- 对异常波动设置人工复核流程，不让 Agent 自动发布高风险结论。

## 数据契约与留痕

建议至少保存以下字段；真实项目可以继续拆分，但不要删除来源、版本和状态信息。

| 字段 | 作用 |
|---|---|
| `symbol` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `report_period` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `announcement_date` | 带时区的采样或生成时间，判断数据新鲜度 |
| `raw_statements` | 原始来源或原始响应，供后续复核 |
| `derived_metrics` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `cashflow` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `analysis_version` | 规则、输入或产物版本，变更时保留旧版本 |

所有派生结果都应带生成时间和输入版本。发生重试时新增尝试记录，不要覆盖最后一次失败，以免排查时只剩“最终成功”而看不到中间问题。

## 验收清单

- [ ] 同一指标能追溯到原报表字段
- [ ] 跨期比较使用一致口径
- [ ] 报告包含数据时间与风险声明

## 能力边界

内容仅用于公开数据整理和技术实现说明，不构成投资建议，也不保证数据实时性。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中，不应进入前端、文章、日志或版本库。
