<script setup lang="ts">
import { computed } from 'vue'
import { sidebar } from '../../docsMetadata.json'

interface SidebarItem {
  text: string
  link: string
  lastUpdated?: number
  index?: string
}
interface SidebarGroup {
  text: string
  items: SidebarItem[]
  index?: string
  collapsed?: boolean
}

const ICON_MAP: Record<string, string> = {
  AI_Agent折腾: 'i-ic:outline-smart-toy',
  工具: 'i-ic:outline-build',
  教程: 'i-ic:outline-menu-book',
  行业观察: 'i-ic:outline-trending-up',
  研究: 'i-ic:outline-science',
  概念: 'i-ic:outline-bubble-chart',
  资源: 'i-ic:outline-bookmark',
}

const DESC_MAP: Record<string, string> = {
  AI_Agent折腾: 'AI Agent 本地化部署与实验记录',
  工具: '日常工具评测与上手指南',
  教程: '动手实践教程与避坑笔记',
  行业观察: 'AI 行业动态与趋势分析',
  研究: '深度研究与思考',
  概念: '核心概念与理论梳理',
  资源: '精选资源推荐',
}

// span 规则：>= 4 篇 占大格（lg:col-span-2），其余正常
const groups = computed(() => {
  return (sidebar as SidebarGroup[])
    .filter(g => Array.isArray(g.items) && g.items.length > 0)
    .map((g) => {
      const items = [...g.items].sort((a, b) => (b.lastUpdated ?? 0) - (a.lastUpdated ?? 0))
      const latest = items[0]
      return {
        text: g.text,
        count: items.length,
        latest,
        icon: ICON_MAP[g.text] ?? 'i-ic:outline-folder',
        desc: DESC_MAP[g.text] ?? '',
        wide: items.length >= 4,
      }
    })
})

function formatDate(ts?: number) {
  if (!ts)
    return ''
  const d = new Date(ts)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="notes-grid">
    <a
      v-for="g in groups"
      :key="g.text"
      :href="g.latest?.link"
      class="note-card"
      :class="{ 'note-card--wide': g.wide }"
    >
      <div class="note-card__header">
        <span :class="g.icon" class="note-card__icon" />
        <div class="note-card__title-group">
          <h3 class="note-card__title">{{ g.text }}</h3>
          <span class="note-card__count">{{ g.count }} 篇</span>
        </div>
      </div>
      <p v-if="g.desc" class="note-card__desc">{{ g.desc }}</p>
      <div v-if="g.latest" class="note-card__latest">
        <span class="note-card__latest-label">最新</span>
        <span class="note-card__latest-text">{{ g.latest.text }}</span>
        <span v-if="g.latest.lastUpdated" class="note-card__latest-date">
          {{ formatDate(g.latest.lastUpdated) }}
        </span>
      </div>
      <span class="note-card__arrow i-ic:outline-arrow-forward" />
    </a>
  </div>
</template>

<style scoped>
.notes-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;
  margin: 32px 0;
}

@media (min-width: 640px) {
  .notes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .notes-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .note-card--wide {
    grid-column: span 2;
  }
}

.note-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 20px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  color: inherit;
  transition:
    transform 200ms ease-out,
    box-shadow 200ms ease-out,
    border-color 200ms ease-out;
  overflow: hidden;
  isolation: isolate;
}

.note-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(141, 111, 199, 0.08), rgba(79, 196, 216, 0.08));
  opacity: 0;
  transition: opacity 240ms ease-out;
  z-index: -1;
}

.note-card:hover {
  transform: translateY(-2px);
  border-color: transparent;
  box-shadow: 0 10px 28px -8px rgba(141, 111, 199, 0.25);
}

.note-card:hover::before {
  opacity: 1;
}

.note-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.note-card__header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.note-card__icon {
  width: 28px;
  height: 28px;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.note-card__title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.note-card__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.note-card__count {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.note-card__desc {
  font-size: 13px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
}

.note-card__latest {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 12px;
  min-width: 0;
}

.note-card__latest-label {
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 500;
}

.note-card__latest-text {
  flex: 1;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-card__latest-date {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.note-card__arrow {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 18px;
  height: 18px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 200ms ease-out,
    transform 200ms ease-out,
    color 200ms ease-out;
}

.note-card:hover .note-card__arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--vp-c-brand-1);
}

@media (prefers-reduced-motion: reduce) {
  .note-card,
  .note-card::before,
  .note-card__arrow {
    transition: none;
  }
  .note-card:hover {
    transform: none;
  }
}
</style>
