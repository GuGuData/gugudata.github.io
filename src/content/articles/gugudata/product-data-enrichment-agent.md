---
title: "用条码、ISBN 和网页抽取接口构建商品信息补全 Agent"
description: "摘要:商品和图书数据经常来自零散输入:条码、ISBN、官网链接、说明页或人工备注。本文演示如何用条码生成、ISBN 查询、网页可读内容抽取和文章正文获取接口,搭建一个商品信息补全 Agent。"
section: "gugudata"
slug: "product-data-enrichment-agent"
lang: "zh-CN"
status: "published"
tags: ["GuGuData"]
cover: "https://assets.devopen.club/uPic/202605/008_product_data_enrichment_agent.png"
author: "GuGuData"
---
摘要：商品和图书数据经常来自零散输入：条码、ISBN、官网链接、说明页或人工备注。本文演示如何用条码生成、ISBN 查询、网页可读内容抽取和文章正文获取接口，搭建一个商品信息补全 Agent。

关键词：商品数据补全 Agent、ISBN API、条形码 API、网页可读内容抽取 API、商品信息结构化

## 问题背景

电商后台、库存系统和内容管理系统经常需要把一个不完整记录补全成可用资料。例如只有 ISBN，需要补齐书名和基础信息；只有官网链接，需要提取正文简介；只有商品编码，需要生成条形码图片用于标签。

Agent 可以根据已有字段决定下一步，而不是让运营人员逐个页面查资料。

## Agent 工作流

![Agent 工作流示意图](https://assets.devopen.club/uPic/202605/008_product_data_enrichment_agent.png)

## 接口编排

| 数据来源 | 接口 | 请求方式 | 用途 |
| --- | --- | --- | --- |
| 商品编码 | [通用条形码生成](https://www.gugudata.com/api/details/barcode) | GET | 生成商品标签或后台展示条码 |
| 图书 ISBN | [国际标准书号 ISBN](https://www.gugudata.com/api/details/isbn) | GET | 查询图书基础信息 |
| 网页正文 | [网页可读内容抽取](https://www.gugudata.com/api/details/readability) | POST | 从产品页或文章页抽取主体内容 |
| 文章正文 | [获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent) | POST | 获取网页正文内容，补充资料来源 |

## 调用示例

```bash
curl -G "https://api.gugudata.com/text/isbn" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "isbn=9787111128069"
```

```bash
curl -G "https://api.gugudata.com/barcode/barcode" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "type=EAN13" \
  --data-urlencode "content=6901234567890" \
  --data-urlencode "width=360" \
  --data-urlencode "height=120" \
  --data-urlencode "showLabel=true"
```

```bash
curl -X POST "https://api.gugudata.com/websitetools/readability?appkey=REDACTED&url=https%3A%2F%2Fexample.com%2Fproduct-page"
```

应用侧可以按输入类型选择工具：

```python
def classify_input(value: str) -> str:
    """Classify product enrichment input."""
    digits = "".join(ch for ch in value if ch.isdigit())
    if len(digits) in {10, 13}:
        return "isbn"
    if value.startswith(("http://", "https://")):
        return "url"
    return "barcode"
```

## 数据补全输出

| 字段 | 说明 |
| --- | --- |
| title | 商品或图书标题 |
| identifier | ISBN、条码或来源 URL |
| description | 从网页或图书信息生成的简介 |
| source | 数据来源接口和原始输入 |
| barcode_image | 如有需要，保存条形码生成结果 |
| review_status | 是否已人工审核 |

## 错误处理

ISBN 不存在、网页不可访问或页面正文为空时，Agent 应给出“无法补全”的明确状态，并保留原始输入。不要为了填满字段而编造商品描述。对于重复条码或重复 ISBN，应优先合并到已有记录。

## 工程注意点

- 入库前需要人工审核，尤其是从外部网页抽取的文本。
- 对商品描述做长度限制和敏感词检查。
- 保留来源 URL，方便后续内容更新或版权复核。
- 条形码生成适合展示和标签，不应替代业务系统里的唯一约束。

## 标准架构拆解

商品信息补全 Agent 可以按“识别、补全、审核、入库”拆成四个阶段：

| 阶段 | 责任 |
| --- | --- |
| 输入识别 | 判断输入是 ISBN、条码、URL 还是人工文本 |
| 数据补全 | 调用 ISBN、条码、网页正文抽取等接口 |
| 结构化合并 | 把不同来源字段合并成统一商品资料 |
| 审核入库 | 人工确认后写入商品库或内容系统 |

这种架构的关键是保留字段来源。商品标题可能来自 ISBN，描述可能来自网页，条码图片可能来自条码接口。每个字段都应知道自己的来源和更新时间。

## 数据流与接口边界

推荐流程：

1. 用户提交 ISBN、条码或产品页 URL。
2. 输入识别模块判断调用路径。
3. 对 ISBN 调用图书基础信息查询。
4. 对商品编码生成条形码图片。
5. 对网页 URL 抽取正文或文章内容。
6. 合并字段并生成待审核商品资料。
7. 审核通过后写入正式商品库。

接口边界上，ISBN 查询适合返回事实字段，网页抽取适合补充描述和上下文，条码生成适合生成展示资产。不要把网页抽取内容直接覆盖 ISBN 或业务主数据。

## 可靠性与观测

建议关注：

| 指标 | 用途 |
| --- | --- |
| input_type_distribution | 不同输入类型占比 |
| enrichment_success_rate | 补全成功率 |
| field_conflict_count | 不同来源字段冲突数量 |
| manual_approval_rate | 人工审核通过率 |
| duplicate_identifier_count | 重复 ISBN 或条码数量 |

字段冲突是商品补全里最需要处理的问题。例如 ISBN 标题和网页标题不一致时，应进入审核，而不是自动选择其中一个。

## 落地清单

- 商品资料保存字段级来源，例如 `title_source`、`description_source`。
- 对 ISBN、条码和 URL 做唯一性约束或重复检测。
- 外部网页抽取内容默认进入待审核状态。
- 条码图片作为派生资产，可按需重新生成。
- 入库后保留补全任务记录，方便追溯。

## 可扩展方向

后续可以接入 URL 转 JSON 接口，让 Agent 从产品页直接抽取价格、规格和品牌字段；也可以接入图片 OCR，把包装图里的关键信息转成可检索文本。

## 相关接口

- [通用条形码生成](https://www.gugudata.com/api/details/barcode)
- [国际标准书号 ISBN](https://www.gugudata.com/api/details/isbn)
- [网页可读内容抽取](https://www.gugudata.com/api/details/readability)
- [获取任意链接文章正文](https://www.gugudata.com/api/details/fetchcontent)
