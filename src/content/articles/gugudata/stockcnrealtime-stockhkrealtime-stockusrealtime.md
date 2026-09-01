---
title: "多市场行情如何统一时间与币种：A 股、港股、美股监控数据契约"
description: "多市场行情如何统一时间与币种，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何统一 A 股、港股、美股和汇率数据的代码、时区、币种与交易状态”给出一套可以直接落到任务状态和数据契约上的实现方式。"
section: "gugudata"
slug: "stockcnrealtime-stockhkrealtime-stockusrealtime"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:14.000Z"
updatedAt: "2026-09-01T12:37:14.000Z"
author: "GuGuData"
---
多市场行情如何统一时间与币种，真正困难的通常不是完成一次 API 调用，而是让结果可以校验、失败可以定位、后续能够回到原始证据。本文围绕“如何统一 A 股、港股、美股和汇率数据的代码、时区、币种与交易状态”给出一套可以直接落到任务状态和数据契约上的实现方式。

## 问题与结果

行情值在进入看板前完成市场、时间、币种和新鲜度标准化，跨市场比较不会混用口径。

最终交付不是一段不可追溯的模型回答，而是一组带来源、版本、状态和失败记录的数据。这样既方便接入后续系统，也能在接口、页面或模型输出变化时定位问题。

## 适用场景

- 多市场自选股看板
- 资产价格提醒
- 跨币种行情监控

## 实现前先确定边界

1. 证券代码必须携带市场标识
2. 时间统一保存 UTC 并保留市场本地时间
3. 停牌、闭市和接口失败不能显示为价格零

## 可验证工作流

![多市场行情如何统一时间与币种工作流架构图](https://assets.devopen.club/uPic/202608/stockcnrealtime-workflow.png?v=edc8be1edc4a)

## API 编排与职责

| 步骤 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 股票代码 | [A 股股票代码](https://www.gugudata.com/api/details/stocksymbols) | GET | 维护 A 股代码基础列表 |
| 交易日历 | [A 股交易日历](https://www.gugudata.com/api/details/stockcntradecalendar) | GET | 判断 A 股是否为交易日 |
| A 股行情 | [A 股实时行情数据](https://www.gugudata.com/api/details/stockcnrealtime) | GET | 查询 A 股实时行情 |
| 港股行情 | [港股实时行情数据](https://www.gugudata.com/api/details/stockhkrealtime) | GET | 查询港股实时行情 |
| 美股行情 | [美股实时行情数据](https://www.gugudata.com/api/details/stockusrealtime) | GET | 查询美股实时行情 |
| 汇率换算 | [国际货币汇率](https://www.gugudata.com/api/details/currencyexchange) | GET | 将不同市场价格折算到统一币种 |
| 资金流 | [A 股个股资金流](https://www.gugudata.com/api/details/stockcncashflow) | GET | 为 A 股监控补充资金流参考 |

## 最小可运行实现

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

## 失败分类与降级

如果某个市场休市，Agent 应显示最近更新时间，而不是把数据缺失当成异常。如果某个股票代码无法识别，应提示用户检查市场和代码格式。汇率接口失败时，可以展示原币种数据，并标记折算暂不可用。

对于实时行情，缓存策略要谨慎。不同市场刷新频率不同，缓存时间应按市场和交易状态配置。

## 数据契约与留痕

建议至少保存以下字段；真实项目可以继续拆分，但不要删除来源、版本和状态信息。

| 字段 | 作用 |
|---|---|
| `instrument_id` | 稳定业务标识，用于关联记录并避免名称冲突 |
| `market` | 分类或口径字段，用于路由和一致性检查 |
| `currency` | 分类或口径字段，用于路由和一致性检查 |
| `quote_time_utc` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `market_time` | 带时区的采样或生成时间，判断数据新鲜度 |
| `price` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `freshness` | 业务数据字段，保存时记录来源、口径和缺失状态 |
| `market_status` | 显式状态或结果，禁止用空值代替失败 |

所有派生结果都应带生成时间和输入版本。发生重试时新增尝试记录，不要覆盖最后一次失败，以免排查时只剩“最终成功”而看不到中间问题。

## 验收清单

- [ ] 跨市场代码不会冲突
- [ ] 汇率转换注明汇率时间
- [ ] 延迟或缺失行情有明确状态

## 能力边界

该流程仅用于信息监控，不提供交易执行或投资建议；实时性和授权范围以实际接口为准。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中，不应进入前端、文章、日志或版本库。
