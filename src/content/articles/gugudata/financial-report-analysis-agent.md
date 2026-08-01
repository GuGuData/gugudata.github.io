---
title: "用股票基础数据和财报接口构建投研分析 Agent"
description: "摘要:投研分析助手不能只生成观点,还需要把公司基础信息、财务报表、业绩数据、资金流和 AI 财报解读组合起来。本文演示一个面向 A 股公开信息整理的 Agent 工作流。"
section: "gugudata"
slug: "financial-report-analysis-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/005_financial_report_analysis_agent.png"
author: "GuGuData"
---
摘要：投研分析助手不能只生成观点，还需要把公司基础信息、财务报表、业绩数据、资金流和 AI 财报解读组合起来。本文演示一个面向 A 股公开信息整理的 Agent 工作流。

关键词：投研分析 Agent、A 股财报 API、股票基础信息 API、资金流 API、财报智能解读

## 问题背景

很多投研任务从一个股票代码开始，但分析过程会跨多个数据源：公司名称、行业、历史财务数据、最新业绩、资金流变化和财报摘要。手工整理很耗时，直接让模型回答又容易缺少可追溯数据。

Agent 的职责是把查询步骤排好顺序，把数据交给模型总结，而不是凭空生成结论。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/005_financial_report_analysis_agent.png)

## 接口编排

| 数据层 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 公司基础信息 | [A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo) | GET | 获取公司基础资料和证券信息 |
| 财务报表 | [A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport) | GET | 获取资产负债、利润、现金流等历史数据 |
| 业绩数据 | [A 股业绩报表数据](https://www.gugudata.com/api/details/performance-statement) | GET | 获取业绩披露数据 |
| 资金流 | [A 股个股资金流](https://www.gugudata.com/api/details/stockcncashflow) | GET | 观察市场资金变化 |
| 智能解读 | [A 股财报 AI 智能解读](https://www.gugudata.com/api/details/stock-financial-report-analysis) | POST | 生成财报解读文本 |

## 调用示例

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

## 错误处理

股票代码不存在、接口无数据或财报期数不完整时，Agent 应返回“数据不足”，而不是补写不存在的趋势。资金流数据也不应被单独解释为投资建议，它只适合作为观察指标之一。

## 工程注意点

- 文章和产品输出都要避免写成投资承诺，重点是公开数据整理和辅助分析。
- 每个结论都保留来源接口和查询参数，方便复核。
- 财报类接口适合异步任务，避免用户等待过久。
- 对异常波动设置人工复核流程，不让 Agent 自动发布高风险结论。

## 标准架构拆解

投研分析 Agent 建议按“数据层、分析层、表达层”拆分：

| 层级 | 责任 |
| --- | --- |
| 数据层 | 查询公司基础信息、财务报表、业绩数据和资金流 |
| 指标层 | 计算增长、盈利、现金流和偿债能力等指标 |
| 解读层 | 调用财报智能解读接口，生成结构化分析 |
| 表达层 | 输出摘要、风险提示和数据来源 |
| 审核层 | 对异常结论或高风险内容进行人工复核 |

这种拆法能避免模型直接生成投资观点。Agent 的输出应像研究助理整理材料，而不是替用户做交易决策。

## 数据流与接口边界

推荐数据流：

1. 用户输入股票代码和分析周期。
2. 查询公司基础信息，确认代码、名称和行业。
3. 查询财务报表和业绩数据，形成指标上下文。
4. 查询资金流，作为市场行为参考。
5. 调用财报 AI 智能解读生成摘要。
6. 输出时附上数据来源、时间范围和风险提示。

资金流、财报和新闻证据的解释边界要清晰。资金流只能说明阶段性交易行为，财务报表反映公司经营结果，AI 解读负责把这些数据组织成可读文本。

## 可靠性与观测

建议记录这些指标：

| 指标 | 用途 |
| --- | --- |
| symbol_lookup_success_rate | 股票代码查询成功率 |
| financial_data_coverage | 财务数据覆盖年份 |
| analysis_latency_ms | 智能解读耗时 |
| missing_metric_count | 缺失关键指标数量 |
| manual_review_rate | 需要人工复核的比例 |

当数据覆盖不足时，Agent 应明确输出“数据不足以形成完整分析”。这比输出一篇流畅但依据不足的文章更可靠。

## 落地清单

- 所有结论都保留股票代码、查询日期和数据周期。
- 分析结果中区分事实数据、计算指标和 AI 解读。
- 财务异常项进入人工复核队列。
- 不把输出写成投资建议或收益承诺。
- 定时任务可以先生成摘要草稿，再由分析师审核发布。

## 可扩展方向

可以把投研摘要写入知识库，再接入问答机器人；也可以定时跑一批自选股，生成“今日需要人工关注”的列表，而不是让用户逐个查询。

## 相关接口

- [A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)
- [A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)
- [A 股业绩报表数据](https://www.gugudata.com/api/details/performance-statement)
- [A 股个股资金流](https://www.gugudata.com/api/details/stockcncashflow)
- [A 股财报 AI 智能解读](https://www.gugudata.com/api/details/stock-financial-report-analysis)
