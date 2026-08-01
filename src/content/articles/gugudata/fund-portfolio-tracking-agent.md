---
title: "用基金基础信息、排行和净值接口构建基金组合跟踪 Agent"
description: "摘要:基金组合跟踪不只是展示净值。本文演示如何把基金基础信息、基金排行、ETF 实时行情、开放式基金净值和历史净值接口组合起来,构建一个用于组合看板、定投复盘和基金池筛选的 Agent。"
section: "gugudata"
slug: "fund-portfolio-tracking-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/016_fund_portfolio_tracking_agent.png"
author: "GuGuData"
---
摘要：基金组合跟踪不只是展示净值。本文演示如何把基金基础信息、基金排行、ETF 实时行情、开放式基金净值和历史净值接口组合起来，构建一个用于组合看板、定投复盘和基金池筛选的 Agent。

关键词：基金组合 Agent、基金净值 API、ETF 实时行情 API、开放式基金排行 API、基金数据接口

## 问题背景

很多基金工具一开始只是记录用户持仓，但真正使用时会出现更多需求：基金基本资料是否完整、净值有没有更新、同类基金排名如何、ETF 是否需要实时行情、开放式基金是否需要净值估算、定投结果如何复盘。单个接口很难覆盖完整工作流。

Agent 可以把这些查询动作编排起来。它先维护基金池，再按基金类型选择对应数据接口，最后生成组合跟踪报告。模型只负责解释报告和整理观察点，不直接给投资建议。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/016_fund_portfolio_tracking_agent.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 基础资料 | [基金基本信息列表](https://www.gugudata.com/api/details/fundinfolist) | GET | 获取基金名称、代码、类型等基础信息 |
| 开放式排行 | [开放式基金实时排行](https://www.gugudata.com/api/details/fundopenrankinglist) | GET | 查看开放式基金排名和表现 |
| ETF 排行 | [开放式场内交易基金排行](https://www.gugudata.com/api/details/fundetfopenrankinglist) | GET | 查看场内基金排行 |
| 实时行情 | [场内交易基金实时数据](https://www.gugudata.com/api/details/fundopenetfrealtime) | GET | 查询 ETF 或场内基金实时行情 |
| 净值估算 | [开放式基金净值估算数据](https://www.gugudata.com/api/details/fundvalueestimation) | GET | 补充开放式基金估算净值 |
| 历史净值 | [开放式基金净值历史数据](https://www.gugudata.com/api/details/fundopennavhistory) | GET | 用于回测、复盘和趋势展示 |

## 调用示例

查询基金基本信息：

```bash
curl -G "https://api.gugudata.com/fund/basicinfo" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "pageIndex=1" \
  --data-urlencode "pageSize=20"
```

查询开放式基金实时排行：

```bash
curl -G "https://api.gugudata.com/fund/fund-open-ranking-list" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "pageIndex=1" \
  --data-urlencode "pageSize=20"
```

查询场内基金实时行情：

```bash
curl -G "https://api.gugudata.com/fund/open/etfrealtime" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "symbol=510300"
```

组合报告可以先归一化基金条目：

```python
def normalize_fund_item(symbol: str, fund_type: str, payload: dict) -> dict:
    """Normalize fund data for a portfolio report."""
    return {
        "symbol": symbol,
        "fund_type": fund_type,
        "data": payload.get("Data"),
        "response_time": payload.get("DataStatus", {}).get("ResponseDateTime"),
    }
```

## 组合报告怎么组织

基金组合跟踪建议拆成五个区块：

| 区块 | 内容 |
| --- | --- |
| 组合概览 | 持仓基金、基金类型、更新时间 |
| 净值表现 | 最新净值、估算净值、历史净值变化 |
| 同类对比 | 开放式排行、ETF 排行或同类基金对比 |
| 风险提示 | 数据缺失、净值延迟、过度集中等信息 |
| 复盘记录 | 定投计划、调仓记录、观察备注 |

报告应保持信息属性，不写成“买入某基金”或“赎回某基金”。如果要做策略建议，应由用户自己的投顾规则或人工顾问确认。

## 标准架构拆解

基金组合系统可以拆成以下模块：

| 模块 | 责任 |
| --- | --- |
| 基金池 | 保存基金代码、类型、持仓状态和用户分组 |
| 数据适配 | 根据基金类型调用开放式、ETF、净值或历史接口 |
| 组合计算 | 计算持仓占比、净值变化和估算结果 |
| 报告生成 | 生成日报、周报和定投复盘 |
| 风险提示 | 标记数据过期、集中度过高或波动异常 |

基金类型是关键字段。开放式基金和场内交易基金的数据刷新方式不同，不能使用同一套缓存和展示逻辑。

## 数据流与接口边界

推荐流程如下：

1. 用户添加基金代码和组合标签。
2. Agent 查询基金基础信息，确认基金类型。
3. 根据基金类型选择实时行情、净值估算或历史净值接口。
4. 对组合内基金做统一字段转换。
5. 生成组合概览和异常提醒。
6. 保存报告快照，方便周报和月报复盘。

接口边界上，基金数据是事实输入；组合计算是用户系统自己的业务逻辑；自然语言报告只是展示层。不要让模型直接改变持仓记录或覆盖历史净值。

## 错误处理

如果基金代码无法识别，Agent 应提示用户检查代码和基金类型。若净值估算暂不可用，应展示最近历史净值和更新时间。对于节假日或非交易时段，不要把没有更新误判成接口异常。

组合报告生成失败时，应保留结构化数据，允许稍后重新生成文本报告。

## 可靠性与观测

建议记录这些指标：

| 指标 | 用途 |
| --- | --- |
| fund_basic_match_rate | 基金代码匹配率 |
| nav_refresh_success_rate | 净值刷新成功率 |
| stale_nav_count | 过期净值数量 |
| report_generation_latency_ms | 报告生成耗时 |
| portfolio_alert_count | 组合提醒数量 |

当基金代码匹配率下降时，应检查用户输入格式和基金基础库更新状态。不要用模型猜测基金名称来写入持仓。

## 落地清单

- 每个基金保存代码、类型和加入组合时间。
- ETF 和开放式基金使用不同刷新策略。
- 组合报告保留数据时间，不只展示结论。
- 历史净值不被自然语言报告覆盖。
- 所有提醒保持信息提示，不输出投资指令。

## 可扩展方向

这个 Agent 可以继续接入指数型基金基本信息和 A 股指数行情接口，补充指数基金跟踪误差和指数环境说明；也可以接入文本摘要接口，把每日组合变化生成适合用户阅读的日报。

## 相关接口

- [基金基本信息列表](https://www.gugudata.com/api/details/fundinfolist)
- [开放式基金实时排行](https://www.gugudata.com/api/details/fundopenrankinglist)
- [开放式场内交易基金排行](https://www.gugudata.com/api/details/fundetfopenrankinglist)
- [场内交易基金实时数据](https://www.gugudata.com/api/details/fundopenetfrealtime)
- [开放式基金净值估算数据](https://www.gugudata.com/api/details/fundvalueestimation)
- [开放式基金净值历史数据](https://www.gugudata.com/api/details/fundopennavhistory)
