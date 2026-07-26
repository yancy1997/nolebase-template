import type { ArticleTree } from '../../scripts/types/metadata'
import { sidebar } from '../docsMetadata.json'

export interface PublicArticle extends ArticleTree {
  category: string
}

export const topicMap: Record<string, { label: string, eyebrow: string, description: string }> = {
  教程: {
    label: 'AI 工作流',
    eyebrow: 'WORKFLOWS',
    description: '把 Skills、知识管理和 AI 编程接进日常工作的可复用方法。',
  },
  工具: {
    label: 'Agent 工程',
    eyebrow: 'AGENT ENGINEERING',
    description: '理解 Agent、MCP 与工具调用背后的设计原则和工程边界。',
  },
  研究: {
    label: 'Agent 工程',
    eyebrow: 'AGENT ENGINEERING',
    description: '关于 Agent 架构、协作约束和可靠交付的持续研究。',
  },
  行业观察: {
    label: '前沿观察',
    eyebrow: 'FIELD NOTES',
    description: '筛选值得长期关注的人、产品、论文和行业变化。',
  },
  AI_Agent折腾: {
    label: '实践手记',
    eyebrow: 'BUILD LOGS',
    description: '把 AI 接进本地设备与真实流程的实验、踩坑和复盘。',
  },
}

export function getArticles(): PublicArticle[] {
  const result: PublicArticle[] = []

  const walk = (items: ArticleTree[], category: string) => {
    for (const item of items) {
      if (item.link)
        result.push({ ...item, category })
      if (item.items)
        walk(item.items, category)
    }
  }

  for (const group of sidebar)
    walk(group.items || [], group.text)

  return result.sort((a, b) => articleDateValue(b) - articleDateValue(a))
}

function articleDateValue(article: PublicArticle) {
  if (article.publishedAt) {
    const publishedAt = new Date(article.publishedAt).getTime()
    if (!Number.isNaN(publishedAt))
      return publishedAt
  }

  return article.lastUpdated || 0
}

export function displayTopic(category: string) {
  return topicMap[category]?.label || category
}

export function formatDate(value?: number | string) {
  if (!value)
    return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
