---
title: Codex CLI使用指南
created: 2026-05-01
updated: 2026-05-01
type: tutorial
tags: [AI, Codex, 开发工具, Agent, OpenAI]
sources: [[00_收件箱/Codex CLI 使用指南.md]]
area: "[[工具教程]]"
---
# Codex CLI使用指南
OpenAI 的终端编码 Agent，可在 git 仓库中直接执行编码任务：读代码、改代码、跑命令，适合中小规模功能开发、重构、批量修复。

## 适用场景
- 需求明确，能写成一句 prompt
- 中小规模功能、重构、review、批量修 bug
- 想把实现工作委托出去，自己保留验收权

## 不适用场景
- 需求模糊、边界不清
- 高风险改动（生产部署、数据库迁移、密钥处理）
- 仓库很脏、未提交改动多
- 需要频繁中途决策的交互式任务

## 使用要点
- 必须在 git 仓库中运行
- 建议在干净的工作区（无未提交改动）启动
- 可通过 `AGENTS.md` / `CODEX.md` 提供项目上下文
- 支持 `--approval-policy` 控制自动化程度

## 相关概念
- [[Symphony编排框架]] — Codex 的上层编排框架
- [[构建高效AI Agent]] — 编码 Agent 是 Agent 最佳落地场景之一
