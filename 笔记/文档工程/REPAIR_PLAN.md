# 项目修复计划

## 概述

本项目是一个基于 VitePress + Nolebase 插件的静态文档/博客网站模板。

### 项目运作原理

1. **内容来源**：使用 Markdown 文件作为内容，位于 `笔记/` 和 `生活/` 目录
2. **渲染引擎**：VitePress 将 Markdown 渲染为静态 HTML
3. **增强功能**：通过 Nolebase 系列插件提供：
   - 内链预览（鼠标悬停显示链接内容）
   - 增强的可读性（高亮当前段落）
   - Git 变更日志（显示页面贡献者）
   - 页面属性（标签、进度、字数统计）
   - 懒加载图片
   - OG 图像生成
4. **评论系统**：通过 giscus 集成 GitHub Discussions 评论
5. **搜索**：本地搜索（VitePress 内置）
6. **自动构建**：每次 `pnpm run dev` 时自动运行 `scripts/update.ts` 扫描所有 Markdown 文件生成侧边栏和标签数据

---

## 目录结构详解

| 目录/文件 | 作用说明 |
|-----------|----------|
| **笔记/** | 📝 **主要内容目录**，你的 Markdown 笔记存放位置 |
| **生活/** | 📝 可选的生活类笔记目录（需要已在 `metadata/index.ts` 中配置） |
| **视图/** | 🔍 **Obsidian 视图目录**，存放 Dataview 查询页面，用于展示数据统计 |
| **.vitepress/** | ⚙️ VitePress 配置目录，包含主题、构建配置等 |
| **metadata/** | 📋 网站元数据配置（名称、描述、域名等） |
| **scripts/** | 🔧 自动化脚本目录 |
| **public/** | 🖼️ 静态资源目录（图片、favicon、字体等） |
| **node_modules/** | 📦 npm 依赖包目录 |
| **.github/** | 🐙 GitHub 配置（Actions 工作流、FUNDING 等） |

### 各目录详细内容

#### 📝 笔记/（主要内容目录）
存放你的 Markdown 笔记文件。子目录会自动生成为侧边栏分组。
```
笔记/
├── ✍️ 文档工程/      # 示例子目录
├── 演示目录1/        # 示例子目录
├── AI_Agent折腾/     # 示例子目录
├── 欢迎使用obsidian.md
└── index.md
```

#### 🔍 视图/（数据视图目录）
**这是 Obsidian + Dataview 特有的功能**，用于生成数据统计页面。

两个内置视图：
| 文件 | 作用 |
|------|------|
| `未添加标签的页面.md` | 查询所有**没有添加标签**的笔记，方便批量补完标签 |
| `尚未编写完成的页面.md` | 查询所有 `status = "尚未完成"` 的笔记，方便追踪写作进度 |

> **注意**：这些文件使用了 `dataview` 语法查询数据，但在 VitePress 构建的网站中**不会自动执行 Dataview 查询**。如果需要在网站上展示，需要额外配置或使用 VitePress 插件。

#### ⚙️ .vitepress/
```
.vitepress/
├── config.ts           # VitePress 主配置文件
├── creators.ts         # 贡献者信息配置
├── docsMetadata.json   # ⚡ 自动生成！侧边栏结构和标签数据
├── docsTagsAlias.json  # 标签别名配置
├── styles/             # 主题样式
│   ├── main.css
│   ├── vars.css
│   └── kbd.css
└── theme/              # 主题扩展
    ├── index.ts        # 主题入口（giscus 配置在此）
    └── components/     # 自定义 Vue 组件
```

#### 📋 metadata/
```
metadata/
└── index.ts   # 网站元数据：名称、描述、域名、仓库链接
```

#### 🔧 scripts/
```
scripts/
├── update.ts        # ⚡ 自动构建脚本，扫描 Markdown 生成侧边栏
└── types/           # TypeScript 类型定义
```

#### 🖼️ public/
静态资源目录，包含：
- `og.png` - 社交媒体分享预览图
- `logo.svg` - 网站 Logo
- `favicon.*` - 网站图标
- 字体文件等

#### 📄 根目录文件
| 文件 | 作用 |
|------|------|
| `index.md` | 网站首页（重定向到 `/笔记/`） |
| `toc.md` | 最近更新页面 |
| `🔌 知识库插件列表.md` | Obsidian 推荐插件列表 |
| `uno.config.ts` | UnoCSS 配置 |
| `vite.config.ts` | Vite 配置 |
| `package.json` | 项目依赖配置 |
| `REPAIR_PLAN.md` | 本修复计划文档 |

---

## 问题清单与修复方案

### 问题 1：metadata 配置未修改

**文件**: `metadata/index.ts`

**当前问题**:
- 站点名称仍为 `Nólëbase`
- 描述仍为原项目内容
- GitHub 仓库链接指向 `nolebase/nolebase`
- 域名仍为 `nolebase.ayaka.io`

**修复方案**:
```typescript
export const siteName = '你的站点名称'
export const siteShortName = '你的站点简称'
export const siteDescription = '你的站点描述'

export const include = ['笔记', '生活']  // 或你想使用的目录

export const githubRepoLink = 'https://github.com/你的用户名/你的仓库名'

export const plainTargetDomain = 'your-domain.com'
export const targetDomain = `https://${plainTargetDomain}`
```

**影响范围**: 网站标题、描述、SEO、搜索功能、OG 图像

---

### 问题 2：creators 配置未修改

**文件**: `.vitepress/creators.ts`

**当前问题**:
- 贡献者信息仍显示原项目作者（絢香猫、絢香音）
- 页面底部的"贡献者"区域无法链接到你的 GitHub

**修复方案**:
```typescript
export const creators: Creator[] = [
  {
    name: '你的名字',
    avatar: '',
    username: '你的GitHub用户名',
    title: '站点作者',
    desc: '你的简介',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/你的用户名' },
    ],
    nameAliases: ['你的名字', '你的用户名'],
    emailAliases: ['your@email.com'],
  },
]
```

**影响范围**: 页面底部的贡献者信息、Git 变更日志

---

### 问题 3：Plausible 分析脚本未移除

**文件**: `.vitepress/config.ts`

**当前问题**:
- 第 118 行包含指向 `nolebase.ayaka.io` 的 Plausible 分析脚本
- 会导致数据发送到错误的项目

**修复方案**:
移除以下代码：
```typescript
// 删除这行
['script', { 'defer': 'true', 'data-domain': 'nolebase.ayaka.io', 'data-api': '/api/v1/page-external-data/submit', 'src': '/assets/page-external-data/js/script.js' }],
```

或者如果你想保留分析功能，修改为你的域名：
```typescript
['script', { 'defer': 'true', 'data-domain': '你的域名', 'data-api': '/api/v1/page-external-data/submit', 'src': '/assets/page-external-data/js/script.js' }],
```

**影响范围**: 网站分析数据统计

---

### 问题 4：index.md 首页内容

**文件**: `index.md`

**当前问题**:
- 可能仍显示原项目的首页内容

**修复方案**:
根据需要修改首页的 frontmatter 和内容，包括：
- title（标题）
- description（描述）
- hero（首页大图区域配置）

---

## 修复优先级

| 优先级 | 问题 | 修复难度 |
|--------|------|----------|
| 高 | metadata 配置 | 低 |
| 高 | creators 配置 | 低 |
| 中 | Plausible 脚本 | 低 |
| 低 | 首页内容 | 中（取决于需求） |

---

## 修复后验证

修复完成后，建议执行以下验证：

1. **启动开发服务器**: `pnpm run dev`
2. **检查网站标题**: 浏览器标签页应显示正确的站点名称
3. **检查贡献者**: 页面底部应显示你的 GitHub 信息
4. **检查搜索**: 搜索功能应正常工作
5. **检查 OG 图像**: 社交媒体分享时显示正确的预览图

---

## 待确认事项

在开始修复前，请确认以下信息：

1. **站点名称**: aichen
2. **站点描述**: 小陈的折腾笔记
3. **GitHub 仓库**: https://github.com/yancy1997/nolebase-template
4. **域名**: blog.050388.xyz
5. **贡献者信息**: https://github.com/yancy1997
6. **文档目录**: 先不更新

---

## 总结

本修复计划涉及 4 个主要问题的修复，其中：

- **问题 1、2、3** 为配置修改，只需提供你的信息即可快速完成
- **问题 4** 需要你确认首页的具体需求

请查阅上述内容，告诉我：
1. 你对修复方案是否有疑问？ 没有疑问
2. 提供上述"待确认事项"中的信息
3. 确认是否需要修改首页内容，如需要，请说明你的需求，首页就是我觉得没有用改了的