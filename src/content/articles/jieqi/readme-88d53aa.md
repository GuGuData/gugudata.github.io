---
title: "二十四节气 iOS 应用"
description: "一个优雅的 iOS 应用,用于展示和追踪中华传统二十四节气,包含桌面小组件功能。符合 Apple 设计指南,提供卓越的用户体验。"
section: "jieqi"
slug: "readme-88d53aa"
lang: "zh-CN"
status: "archived"
tags: ["节气"]
publishedAt: "2025-12-10T02:10:33.000Z"
updatedAt: "2025-12-10T02:10:33.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/section-jieqi-87bb275eeef9c9e9.webp"
author: "GuGuData"
---
一个优雅的 iOS 应用，用于展示和追踪中华传统二十四节气，包含桌面小组件功能。符合 Apple 设计指南，提供卓越的用户体验。

## 功能特点

### 🌸 主要功能

- **节气展示**: 实时显示当前节气信息，包含精美图片和详细介绍
- **即将到来**: 显示从今天开始的所有未来节气，时间线清晰明了
- **详情页面**: 点击任意节气查看详细信息，包含节气介绍、时间、季节等
- **桌面小组件**: 支持小尺寸小组件，自动更新当前节气，精美的图片背景
- **设置与信息**: 小组件添加指南、应用信息、开发者联系方式

### 📱 界面设计

- **Tab 1 - 节气**: 当前节气卡片 + 即将到来的节气列表 + 详情页面
- **Tab 2 - 小组件**: 小组件预览、添加说明、小贴士和应用信息

#### **设计特色**

- 🎨 **素雅配色**: 低饱和度色彩，符合现代审美
- 🔄 **流畅动画**: 精心设计的转场和交互动画
- 📐 **响应式布局**: 完美适配 iPhone 和 iPad，支持横竖屏
- 🌓 **深色模式**: 全面支持系统深色模式
- ♿ **无障碍访问**: 完整支持 VoiceOver 和辅助功能

### 🎯 技术特性

- **SwiftUI**: 使用最新的 SwiftUI 框架开发，代码现代化
- **WidgetKit**: 原生小组件支持，自动时间线更新
- **动画效果**: 丰富的转场、缩放和交互动画
- **响应式设计**: 自适应不同屏幕尺寸和方向
- **iOS 16+**: 支持 iOS 16 及以上版本，使用最新 API
- **震动反馈**: 轻微震动反馈提升交互体验
- **无障碍优化**: 完整的 VoiceOver 支持和辅助功能

### 🎨 视觉亮点

#### **季节色彩系统**

- 🌱 **春季**: 柔和绿色 `(0.4, 0.7, 0.4)` - 生机盎然
- ☀️ **夏季**: 热烈橙棕 `#BD5821` - 热情似火
- 🍂 **秋季**: 温暖橙色 `orange` - 收获金秋
- ❄️ **冬季**: 温暖棕色 `#9D7235` - 温润如玉

#### **交互设计**

- 轻触卡片有缩放反馈和震动
- 下拉刷新快速响应（0.5 秒）
- 按钮点击有视觉和触觉双重反馈
- 页面转场流畅自然

## 项目结构

```
SolarTerms/
├── SolarTermsApp.swift          # 应用入口
├── ContentView.swift            # 主界面 (TabView)
├── SolarTermModel.swift         # 数据模型和管理器
├── SolarTermsListView.swift     # 节气列表和详情视图
├── WidgetSettingsView.swift     # 小组件设置和应用信息
└── Assets.xcassets/             # 应用资源和24张节气图片

SolarTermsWidget/
├── SolarTermsWidget.swift       # 小组件实现
└── Info.plist                   # 小组件配置

images/                          # 节气图片资源
├── 1.png ~ 24.png              # 24个节气高质量图片
└── README_images/              # 文档图片
```

## 安装和运行

### 前置要求

- **macOS**: 14.0+
- **Xcode**: 15.0+
- **iOS**: 16.0+ 设备或模拟器
- **Apple Developer Account**: 用于设备部署（可选）

### 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd the-twenty-four-solar-terms
   ```

2. **打开项目**

   ```bash
   cd SolarTerms
   open SolarTerms.xcodeproj
   ```

3. **配置 Bundle ID**

   - 在项目设置中修改 Bundle Identifier 为你的唯一标识符
   - 设置开发团队（如需真机测试）

4. **编译运行**
   - 选择目标设备：iPhone 16 模拟器（推荐）
   - 按 `⌘ + R` 编译运行

### 小组件测试

#### 模拟器中测试

1. 运行应用后，长按桌面空白处
2. 点击左上角 "+" 添加小组件
3. 搜索 "二十四节气" 并添加

#### 真机测试

1. 确保正确配置开发者证书
2. 部署到真机后按相同步骤添加

## 使用说明

### 核心功能

#### 1. 🌿 浏览节气

- **当前节气**: 顶部大卡片展示当前节气，包含美观图片和基本信息
- **即将到来**: 按时间顺序显示未来所有节气，带季节标签
- **详情查看**: 点击任意节气卡片查看详细信息页面

#### 2. 📱 添加小组件

- 进入 "小组件" 标签页查看预览效果
- 按照详细说明将小组件添加到桌面
- 小组件会自动显示当前节气并定期更新

#### 3. ⚙️ 个性化设置

- 查看应用信息和开发者联系方式
- 了解应用特色功能和使用小贴士
- 获取技术支持和反馈渠道

### 高级特性

- **自动更新**: 小组件和应用都会在节气变化时自动更新
- **离线使用**: 所有节气数据内置，无需网络连接
- **多设备同步**: 在 iPhone 和 iPad 上提供一致体验
- **季节感知**: 界面颜色随季节自动调整

## 开发指南

### 核心架构

#### 1. **数据层 (SolarTermModel.swift)**

```swift
// 节气数据模型
struct SolarTerm: Identifiable, Codable {
    let id = UUID()
    let name: String
    let englishName: String
    let date: Date
    let season: Season
    let description: String
    // ...
}

// 节气管理器
class SolarTermsManager: ObservableObject {
    @Published var currentSolarTerm: SolarTerm?
    // 自动计算当前节气和即将到来的节气
}
```

#### 2. **界面层 (SwiftUI Views)**

- `ContentView`: 主 TabView 容器
- `SolarTermsListView`: 节气列表和详情
- `WidgetSettingsView`: 设置页面
- `SolarTermDetailView`: 节气详情页面

#### 3. **小组件 (SolarTermsWidget)**

- 支持小尺寸小组件
- 自动时间线更新机制
- 图片完全填充背景

### 自定义功能

#### 添加新节气

```swift
// 在 SolarTermModel.swift 中的 allSolarTerms 数组添加
SolarTerm(
    name: "新节气",
    englishName: "New Solar Term",
    date: dateFormatter.date(from: "2024-12-25")!,
    season: .winter,
    order: 25,
    imageName: "25",
    description: "节气描述..."
)
```

#### 修改界面主题

```swift
// 在相应的视图中调整颜色
private func seasonColor(_ season: SolarTerm.Season) -> Color {
    switch season {
    case .spring: return Color(red: 0.4, green: 0.7, blue: 0.4)
    // 自定义其他季节颜色...
    }
}
```

## 技术亮点

### 🚀 性能优化

- **LazyVStack**: 大列表性能优化
- **图片缓存**: 高效的图片加载和显示
- **内存管理**: 合理的视图生命周期管理

### 🎨 UI/UX 设计

- **Apple HIG 遵循**: 严格按照苹果人机界面指南
- **动画细节**: 精心调试的缩放、转场动画
- **反馈机制**: 视觉、触觉双重反馈

### ♿ 无障碍支持

- **VoiceOver**: 完整的屏幕阅读器支持
- **辅助标签**: 所有交互元素都有清晰描述
- **高对比度**: 支持系统辅助功能设置

## 版本历史

### v1.0 - 初始版本

- ✅ 基础节气展示功能
- ✅ 小组件支持
- ✅ 现代化 SwiftUI 界面

### v1.1 - 体验优化

- ✅ 详情页面重新设计
- ✅ 交互动画优化
- ✅ iPad 适配改进

### v1.2 - 设计升级

- ✅ 素雅配色方案
- ✅ 无障碍访问支持
- ✅ 震动反馈增强
- ✅ 符合 Apple 设计指南

## 许可证

本项目遵循 MIT 许可证。详见 [内容版权说明](/content-license/) 文件。

## 贡献指南

欢迎提交 Issue 和 Pull Request！请确保：

1. 遵循现有代码风格
2. 添加适当的注释
3. 测试新功能的兼容性
4. 更新相关文档

## 联系方式

- **开发者**: PENGYUAN QIU
- **邮箱**: [developer@example.com](mailto:developer@example.com)
- **GitHub**: [@parryqiu](https://github.com/parryqiu)
- **网站**: [jieqi.parryqiu.com](https://jieqi.parryqiu.com)

---

## 🎊 致谢

感谢所有为这个项目提供建议和支持的朋友们！

**享受探索中华传统文化的美好时光！** 🌺📱✨

## 截图预览

> 注：请在 `images/screenshots/` 目录中添加应用截图展示

- 🏠 主界面：当前节气 + 即将到来列表
- 📋 详情页面：节气详细信息展示
- ⚙️ 设置页面：小组件配置和应用信息
- 📱 小组件：桌面小组件效果展示
