---
title: "ETF 盘中看板如何处理分钟行情：时间窗口、新鲜度与缺口标记"
description: "ETF 盘中看板如何处理分钟行情，关键不是完成一次调用，而是让输入口径、处理状态和结果证据可以复核。本文围绕“如何读取 ETF 分钟行情，统一时间序列并在研究看板中标记新鲜度和数据缺口”给出一套面向真实业务流程的实现方式。"
section: "gugudata"
slug: "fundhistoryminute-fundopenetfrealtime"
lang: "zh-CN"
status: "published"
tags: ["GuGuData", "AI Agent", "工作流"]
publishedAt: "2026-09-01T12:37:25.000Z"
updatedAt: "2026-09-01T12:37:25.000Z"
author: "GuGuData"
---
ETF 盘中看板如何处理分钟行情，关键不是完成一次调用，而是让输入口径、处理状态和结果证据可以复核。本文围绕“如何读取 ETF 分钟行情，统一时间序列并在研究看板中标记新鲜度和数据缺口”给出一套面向真实业务流程的实现方式。

## 问题与结果

分钟行情按基金代码、周期和窗口版本化，停牌、闭市、无数据与请求失败不会被显示成价格零。

![ETF 盘中看板如何处理分钟行情工作流架构图](https://assets.devopen.club/uPic/202608/fundhistoryminute-workflow.png?v=ad543fd6fe6d)

## 适用场景

- ETF 盘中研究看板
- 量价变化观察
- 分钟级行情质量监控

## 实现前先确定边界

1. 先确认交易状态，再判断分钟数据是否缺失
2. 不同周期的数据不能直接拼接
3. 指标计算必须保存输入窗口和最后更新时间

## 看板需要解决什么问题

盘中研究看板通常需要同时回答三个问题：价格在所选区间如何变化、成交活跃度是否同步变化、不同基金能否在相同时间尺度下比较。接入时应先固定基金代码、交易区间和周期，再绘制价格与成交图表，避免把不同粒度的数据放在同一条时间轴上。

## 选择合适的分钟周期

- 1 分钟适合查看近期盘中细节，仅支持不复权；
- 5 分钟适合常规分时图和盘中回溯；
- 15、30 分钟适合观察半日节奏和量价变化；
- 60 分钟适合降低短期波动对趋势阅读的干扰。

[基金分钟行情](https://www.gugudata.com/api/details/fundhistoryminute)记录使用周期结束时间。上午和下午交易时段分别对齐，午间休市不会与前后记录合并。合法非交易时段或停牌区间可能返回空数组。

## 发起安全请求

建议通过请求头传递 AppKey，避免凭证出现在共享链接和访问日志中。

```bash
curl --get 'https://api.gugudata.com/fund/historyminute' \
  --header 'X-GUGUDATA-APPKEY: YOUR_APPKEY' \
  --data-urlencode 'symbol=513500' \
  --data-urlencode 'beginDate=20260828 09:30:00' \
  --data-urlencode 'endDate=20260828 15:00:00' \
  --data-urlencode 'period=5' \
  --data-urlencode 'adjust='
```

`symbol` 支持六位基金代码，也兼容 `sh`、`sz` 前缀。接口统一返回标准六位代码。查询时间必须使用 `yyyyMMdd HH:mm:ss`，开始时间不得晚于结束时间，最长跨度为 366 个自然日。

## 绘制 K 线和成交量

`Data` 是按时间升序返回的行情数组。每条记录包含：

- `Open`、`Close`、`High`、`Low`：绘制 K 线；
- `Latest`：周期结束价格，与 `Close` 一致；
- `TradingVolume`：绘制成交量柱；
- `TradingAmount`：观察成交金额变化；
- `DateTime`：作为图表时间轴。

接入程序应确认 `DataStatus.StatusCode=100`，并校验 `DataStatus.DataTotalCount` 与数组长度一致。空数组是合法业务结果，应显示明确的空状态。

```javascript
function normalizeBars(response) {
  if (response.DataStatus.StatusCode !== 100) {
    throw new Error(response.DataStatus.StatusDescription);
  }

  if (response.DataStatus.DataTotalCount !== response.Data.length) {
    throw new Error('Unexpected bar count');
  }

  return response.Data.map((bar) => ({
    time: bar.DateTime,
    open: bar.Open,
    close: bar.Close,
    high: bar.High,
    low: bar.Low,
    volume: bar.TradingVolume,
    amount: bar.TradingAmount,
  }));
}
```

## 观察量价变化

价格上涨且成交量同步放大，可以作为进一步研究的线索；价格变化而成交量较低，则需要结合更长周期和其他基金进行对照。接口提供的是历史行情数据，不构成交易信号或投资建议。

比较多个 ETF 时，应为每只基金使用相同的开始时间、结束时间、分钟周期和复权方式；需要补充盘中快照时，可单独读取 [场内 ETF 实时行情](https://www.gugudata.com/api/details/fundopenetfrealtime)，并区分实时采样时间与历史分钟窗口。若某只基金在部分区间没有记录，不应填充虚构行情；图表可保留缺口或按业务需要标识暂无成交。

## 处理空结果和错误

| 业务码 | 处理建议 |
| --- | --- |
| 100 | 正常展示；`Data=[]` 时显示所选区间暂无行情 |
| 501 | 检查基金代码、日期格式、周期、复权方式和 1 分钟可用范围 |
| 502 | 降低请求频率后重试 |
| 503 | 检查接口订单状态 |
| 504 | 检查 AppKey 及传递位置 |
| 505 | 检查剩余调用额度 |
| 900 | 稍后重试并保留请求标识用于排查 |
| 901 | 行情服务暂不可用，稍后重试 |

客户端不要把 501 自动改写为其他周期或日期范围，否则页面展示的数据会与用户选择不一致。

## 行情验收细则

- 五种分钟周期均按对应间隔绘制；
- `Latest` 与 `Close` 一致；
- 所有记录均位于请求区间内并按时间升序排列；
- 上午、下午交易时段没有跨午间合并；
- 空结果、参数错误和服务暂不可用具有不同提示；
- AppKey 不写入前端日志、分析事件或分享链接；
- 页面明确说明结果基于历史行情，不构成投资建议。

## 数据契约与留痕

| 字段 | 作用 |
|---|---|
| `fund_code` | 业务数据字段，保存来源、口径和缺失状态 |
| `interval` | 业务数据字段，保存来源、口径和缺失状态 |
| `window_start` | 业务数据字段，保存来源、口径和缺失状态 |
| `window_end` | 业务数据字段，保存来源、口径和缺失状态 |
| `quote_time` | 带时区的采样或生成时间 |
| `bars` | 业务数据字段，保存来源、口径和缺失状态 |
| `freshness_status` | 显式状态或原因，禁止以空值代替失败 |
| `data_gap_reason` | 显式状态或原因，禁止以空值代替失败 |

重试应新增尝试记录，不覆盖最后一次失败。派生结果必须关联输入版本、生成时间和业务状态。

## 验收清单

- [ ] K 线时间顺序和周期连续性可校验
- [ ] 空结果、闭市和接口失败有不同状态
- [ ] 研究指标能回到原始分钟数据

## 能力边界

盘中行情和技术指标仅供信息研究，不构成交易信号、收益承诺或投资建议。

示例中的 `YOUR_APPKEY` 仅为占位符。真实密钥只能放在服务端环境变量或密钥管理系统中。
