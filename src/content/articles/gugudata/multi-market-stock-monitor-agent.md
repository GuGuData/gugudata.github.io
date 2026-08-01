---
title: "用 A 股、港股、美股和汇率接口构建多市场行情监控 Agent"
description: "摘要:很多投研和资产看板需要同时跟踪 A 股、港股、美股和汇率。本文演示如何把股票代码、交易日历、实时行情、分时数据、资金流和汇率接口组合起来,构建一个只做信息监控和风险提醒的多市场 Agent。"
section: "gugudata"
slug: "multi-market-stock-monitor-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/015_multi_market_stock_monitor_agent.png"
author: "GuGuData"
---
摘要：很多投研和资产看板需要同时跟踪 A 股、港股、美股和汇率。本文演示如何把股票代码、交易日历、实时行情、分时数据、资金流和汇率接口组合起来，构建一个只做信息监控和风险提醒的多市场 Agent。

关键词：多市场行情 Agent、A 股实时行情 API、港股实时行情 API、美股实时行情 API、汇率 API、股票监控

## 问题背景

跨市场持仓或观察列表会遇到几个工程问题：市场交易时间不同、代码格式不同、币种不同、实时行情字段不同，用户却希望在一个看板里看到统一的涨跌、成交、估值和风险提醒。如果直接把多个接口返回结果拼在一起，页面很快会变得混乱。

Agent 的职责不是替用户做投资决策，而是把多市场数据查询、时间判断、币种换算和异常提醒组织起来。它可以回答“今天哪些自选股波动较大”“港股是否已经开盘”“美股持仓折算成人民币是多少”等信息型问题。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/015_multi_market_stock_monitor_agent.png)

## 接口编排

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 股票代码 | [A 股股票代码](https://www.gugudata.com/api/details/stocksymbols) | GET | 维护 A 股代码基础列表 |
| 交易日历 | [A 股交易日历](https://www.gugudata.com/api/details/stockcntradecalendar) | GET | 判断 A 股是否为交易日 |
| A 股行情 | [A 股实时行情数据](https://www.gugudata.com/api/details/stockcnrealtime) | GET | 查询 A 股实时行情 |
| 港股行情 | [港股实时行情数据](https://www.gugudata.com/api/details/stockhkrealtime) | GET | 查询港股实时行情 |
| 美股行情 | [美股实时行情数据](https://www.gugudata.com/api/details/stockusrealtime) | GET | 查询美股实时行情 |
| 汇率换算 | [国际货币汇率](https://www.gugudata.com/api/details/currencyexchange) | GET | 将不同市场价格折算到统一币种 |
| 资金流 | [A 股个股资金流](https://www.gugudata.com/api/details/stockcncashflow) | GET | 为 A 股监控补充资金流参考 |

## 调用示例

查询 A 股实时行情：

```bash
curl -G "https://api.gugudata.com/stock/cn/realtime" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "symbol=600000"
```

查询港股实时行情：

```bash
curl -G "https://api.gugudata.com/stock/hk/realtime" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "symbol=00700"
```

查询美股实时行情：

```bash
curl -G "https://api.gugudata.com/stock/us/realtime" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "symbol=AAPL"
```

查询汇率用于统一展示：

```bash
curl -G "https://api.gugudata.com/v2/finance/currency-exchange" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "from=USD" \
  --data-urlencode "to=CNY"
```

Agent 可以用统一结构保存行情：

```python
def normalize_quote(market: str, symbol: str, payload: dict) -> dict:
    """Normalize quote payload for a multi-market watchlist."""
    return {
        "market": market,
        "symbol": symbol,
        "raw": payload,
        "quote_time": payload.get("DataStatus", {}).get("ResponseDateTime"),
    }
```

## 看板输出怎么组织

多市场行情看板建议按“市场 + 币种 + 风险”组织：

| 区块 | 内容 |
| --- | --- |
| 市场状态 | A 股、港股、美股当前交易状态或最近更新时间 |
| 行情列表 | 股票名称、代码、最新价、涨跌幅、成交信息 |
| 币种折算 | 原币种价格、目标币种价格、使用的汇率时间 |
| 风险提醒 | 大幅波动、资金流异常、行情延迟或缺失 |

所有提醒都应写成信息提示，而不是买卖建议。例如“该股票今日波动高于观察阈值”，不要写成“应该买入”或“应该卖出”。

## 标准架构拆解

多市场行情 Agent 可以拆成以下模块：

| 模块 | 责任 |
| --- | --- |
| 自选股管理 | 保存市场、代码、名称、币种和用户分组 |
| 市场日历 | 判断交易日、交易时段和数据刷新频率 |
| 行情查询 | 调用 A 股、港股、美股实时或分时接口 |
| 币种换算 | 用汇率接口统一展示市值和盈亏 |
| 风险提醒 | 基于阈值生成波动、延迟、缺失提醒 |

这里不需要让模型参与行情计算。模型更适合把结构化监控结果转换成日报、周报或客服问答，而不是直接解释价格走势。

## 数据流与接口边界

推荐流程如下：

1. 用户维护自选股列表，记录市场和代码。
2. Agent 根据市场判断需要调用的行情接口。
3. 交易日历用于决定 A 股刷新策略。
4. 实时行情写入统一 quote 结构。
5. 汇率接口用于跨币种折算。
6. 风险规则生成提醒。
7. 模型把提醒整理成自然语言摘要。

接口边界上，行情数据是事实数据，汇率是折算依据，风险提醒是系统规则输出。文章和产品页面都应避免把这些结果包装成投资建议。

## 错误处理

如果某个市场休市，Agent 应显示最近更新时间，而不是把数据缺失当成异常。如果某个股票代码无法识别，应提示用户检查市场和代码格式。汇率接口失败时，可以展示原币种数据，并标记折算暂不可用。

对于实时行情，缓存策略要谨慎。不同市场刷新频率不同，缓存时间应按市场和交易状态配置。

## 可靠性与观测

建议记录这些指标：

| 指标 | 用途 |
| --- | --- |
| quote_fetch_success_rate | 行情接口成功率 |
| stale_quote_count | 行情过期数量 |
| market_closed_skip_count | 休市跳过次数 |
| fx_fetch_latency_ms | 汇率接口耗时 |
| alert_trigger_count | 风险提醒触发次数 |

当 stale quote 增加时，要先检查市场是否休市，再检查接口请求状态。不要只根据“没有新价格”就判断接口异常。

## 落地清单

- 自选股必须记录市场，不能只记录代码。
- 不同市场使用不同刷新策略。
- 汇率折算要保存汇率时间。
- 风险提醒只做信息提示，不输出交易建议。
- 看板展示原始数据时间，避免用户误解为实时推送。

## 可扩展方向

这个 Agent 可以继续接入 A 股分笔实时交易数据、买卖盘口数据和期权实时行情数据，形成更细粒度的市场监控；也可以接入文本摘要接口，把每天的波动和提醒生成日报。

## 相关接口

- [A 股股票代码](https://www.gugudata.com/api/details/stocksymbols)
- [A 股交易日历](https://www.gugudata.com/api/details/stockcntradecalendar)
- [A 股实时行情数据](https://www.gugudata.com/api/details/stockcnrealtime)
- [港股实时行情数据](https://www.gugudata.com/api/details/stockhkrealtime)
- [美股实时行情数据](https://www.gugudata.com/api/details/stockusrealtime)
- [国际货币汇率](https://www.gugudata.com/api/details/currencyexchange)
- [A 股个股资金流](https://www.gugudata.com/api/details/stockcncashflow)
