---
title: Computer Use
created: 2026-05-01
updated: 2026-05-01
type: concept
tags:
  - AI
  - Claude
  - Computer Use
  - GUI自动化
  - Agent
  - Anthropic
sources:
  - - 00_收件箱/Introducing_Computer_Use_Anthropic_中文.md
area: "[[AI产品经理技能]]"
---
# Computer Use
Anthropic 首次公开测试的通用 GUI 操作能力：通过 API 指导 Claude 像人一样使用计算机——查看屏幕、移动光标、点击按钮、输入文本。标志着 AI Agent 进入"操作电脑"的新时代。

## 核心能力
- 通过截图理解屏幕内容（多模态输入）
- 发出虚拟鼠标点击和键盘敲击
- 执行需要数十甚至数百步才能完成的任务
- 2024-10-22 随 Claude 3.5 Sonnet 升级版首次发布（公开测试）

## 早期采用者
- **Replit**：利用 Computer Use 在应用构建过程中实时评估应用
- **Asana、Canva、DoorDash**：探索多步骤任务自动化
- **The Browser Company**：浏览器内的 Agent 操作

## 局限性
- 仍处于实验阶段，繁琐且容易出错
- 需要沙盒环境运行以确保安全
- 延迟较高（需要截图 → 理解 → 操作的循环）

## 与其他 Agent 能力的关系
Computer Use 是 Agent 工具箱中的"万能后备"：当没有专用 API 或 MCP 工具时，可以通过 GUI 操作完成任务。但专用工具（API/MCP）在速度、可靠性和成本上都优于 GUI 操作。

## 相关概念
- [[构建高效AI Agent]] — Computer Use 是 Agent 工具能力的一种
- [[扩展思考与测试时计算]] — 扩展思考提升了 Computer Use 的多步任务能力
