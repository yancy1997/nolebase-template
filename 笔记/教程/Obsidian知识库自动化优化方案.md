---
title: Obsidian知识库自动化优化方案
created: 2026-04-26
updated: 2026-04-26
type: tutorial
tags:
  - obsidian
  - 知识库
  - 自动化
  - ark
  - cronjob
  - llm-wiki
  - ingest
sources: "[[99_系统/归档/收件箱/2026/04/20260424_Obsidian知识库自动化优化方案.md]]"
area: "[[知识管理]]"
---
# Obsidian知识库自动化优化方案

> 本方案旨在解决 OrbitOS 知识库"手动步骤太多、缺少反馈闭环"的问题。原文分为四部分（资源抓取、收件箱编译、项目回流、微信日报），实际执行时调整了优先级。

## 核心观点
- **编译层是基础设施**——没有自动提炼入库，Wiki 和日报都没有内容可展示，因此优先做收件箱编译
- **LLM 质量碾压规则引擎**——用 Ark.cn（kimi-k2.6）自动提炼原子笔记，分类准确性和核心观点深度远超基于关键词的 rules 引擎
- **复用现有配置优于新增配置**——脚本直接读取 Hermes 的 `config.yaml` 获取 Ark API Key，不另设环境变量
- **降级策略必须有**——单篇 timeout 60s，LLM 超时或 JSON 解析失败时自动 fallback 到规则引擎，避免阻塞整个 ingest 流程
- **日报是反馈闭环的最小可行单元**——一个 cronjob + 一个 Python 脚本，第二天就能收到第一条推送，验证"知识库在用"的感知价值

---

## 实施记录

### Phase 1：收件箱编译层（P2）——从堆积到自动归档

**前提**
- 脚本 `orbitos_knowledge_refinery.py` 已部署在 `~/.hermes/scripts/`，原生支持 `audit`、`migrate`、`ingest`、`reindex` 四个命令
- 知识库根目录：`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/obritos/`

**关键改造**
1. **接入 LLM**：`call_llm_for_classification()` 的 Provider 优先级从 Anthropic > OpenAI 改为 **Ark.cn > Anthropic > OpenAI > 规则引擎**。Ark 配置从 `/Users/yancy/.hermes/config.yaml` 动态读取（`provider: custom`、`base_url: https://ark.cn-beijing.volces.com/api/coding/v3`、model 实际映射到 `kimi-k2.6`）。
2. **规则引擎兜底优化**：即使 fallback，也对 `extract_structured_content()` 做了加固——修复段落合并逻辑、过滤超长/多句标题、加入语义密度检查（避免把"我是处女座"这类叙事闲话当核心观点）。
3. **ingest 流程打通**：`scan_ingest_sources()` 扫描 `00_收件箱/**` 中 `status: pending-refine` 的文件 → 读取全文传给 LLM → 返回 JSON（title、category、core_views、tags、related_notes）→ 生成原子笔记 → 写入 `40_知识库/{category}/` → 标记源文件为 `processed`。

**验证**
- 对比测试：叙事类文章（Agent 协作核心原则）和规划文档（Obsidian 自动化方案）。LLM 在分类准确性、核心观点提炼深度、标签精准度上全面优于规则引擎。
- 首次后台执行 `ingest --execute` 因超时无输出被 kill，改为 `PYTHONUNBUFFERED=1` + `--limit 1` 单篇测试通过后，手动分批补齐。

**结果**
- 共处理 **7 篇** pending-refine 文章，全部入库
- 其中 6 篇由 Ark LLM 提炼，1 篇（黑苹果 macOS14 升 15 指南）因 LLM 返回非标准 JSON 降级到规则引擎
- 生成的原子笔记分布：`tutorial/` 5 篇、`system/` 2 篇

---

### Phase 2：LLM Wiki 建设（B）——知识图谱索引

**执行**
- 运行 `python3 orbitos_knowledge_refinery.py reindex --execute`
- 遍历 `40_知识库/` 所有 `.md`，按 `WIKI_CATEGORIES`（entities、concepts、tutorial、comparisons、queries）分组
- 生成 `99_系统/LLM_WIKI_INDEX.md`，含每篇笔记的一行摘要和 wikilink

**结果**
- 首次收录 **18** 个原子笔记

**问题**
- 发现重复：`Agent协作核心原则` 同时存在于 `concepts/`（旧版手动整理，4832 bytes，内容完整）和 `tutorial/`（新版自动 ingest，1587 bytes，精简摘要）
- 处理方式：保留旧版，合并 frontmatter 元数据（补充 `ingest_confidence`、`ingest_method`），删除新版，reindex 后总数降至 **17**

---

### Phase 3：微信日报（C）——从被动仓库到主动汇报

**设计**
- 日报必须一屏看完，四个模块：今日总览（从日记提取）、收件箱处理（今日 ingest 数量与分类）、项目更新（今日有文件变动的项目）、知识库推荐（随机旧笔记）

**实现**
- 脚本：`~/.hermes/scripts/orbitos_daily_report.py`
- 定时任务：`orbitos-daily-report`（cronjob ID `6077bdf7e1ea`）
- 调度：`0 8 * * *`，每天早 8 点推送到微信

**交付状态**
- 已创建并测试，明天（4/27）早上 8 点发出第一条自动日报

---

## 待办 / 下一步

| 优先级 | 事项 | 状态 |
|--------|------|------|
| P3 | 项目素材回流（项目 `status: done` 时自动提取 analysis/source-article 到 40_知识库） | 未开始 |
| — | 资源抓取层（TLDR AI / The Rundown AI / Product Hunt / GitHub Trending 定时抓取） | 已由 `daily-ai-content` cronjob 覆盖 |
| — | 剩余重复笔记清理（OpenAI 数据智能体、html-ppt-skill、黑苹果 AMD 等 4 组新旧覆盖） | 待确认 |

---

## 关联笔记
- 99_系统/LLM_WIKI_INDEX.md（已清理）
- [[40_知识库/concepts/Agent协作核心原则-约束先行]]
- orbitos_knowledge_refinery.py（脚本位于 `~/.hermes/scripts/`）
- orbitos_daily_report.py（脚本位于 `~/.hermes/scripts/`）

---

## 状态
- [x] Phase 1 编译层完成
- [x] Phase 2 LLM Wiki 完成
- [x] Phase 3 微信日报完成
- [ ] Phase 4 项目素材回流（待定）
