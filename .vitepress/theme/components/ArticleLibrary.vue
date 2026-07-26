<script setup lang="ts">
import { computed, ref } from 'vue'
import { displayTopic, formatDate, getArticles } from '../article-data'

const articles = getArticles()
const query = ref('')
const selected = ref('全部')
const topics = ['全部', ...new Set(articles.map(article => displayTopic(article.category)))]

const filtered = computed(() => {
  const keyword = query.value.trim().toLocaleLowerCase()
  return articles.filter((article) => {
    const topic = displayTopic(article.category)
    const matchesTopic = selected.value === '全部' || topic === selected.value
    const haystack = [article.text, article.description, ...(article.tags || [])].join(' ').toLocaleLowerCase()
    return matchesTopic && (!keyword || haystack.includes(keyword))
  })
})
</script>

<template>
  <section class="collection-shell">
    <div class="collection-intro">
      <p class="design-kicker">
        WRITING ARCHIVE
      </p>
      <h1>所有文章</h1>
      <p>围绕数据产品、Agent 工程和 AI 工作流，记录真实问题如何被拆解、实现和长期维护。</p>
    </div>

    <div class="library-tools">
      <div class="topic-tabs" aria-label="按主题筛选文章">
        <button
          v-for="topic in topics"
          :key="topic"
          type="button"
          :class="{ active: selected === topic }"
          @click="selected = topic"
        >
          {{ topic }}
        </button>
      </div>
      <label class="library-search">
        <span>搜索文章</span>
        <input v-model="query" type="search" placeholder="输入标题、摘要或标签">
      </label>
    </div>

    <div class="article-grid">
      <a v-for="article in filtered" :key="article.link" class="article-card" :href="article.link">
        <div class="article-card-top">
          <span>{{ displayTopic(article.category) }}</span>
          <time>{{ formatDate(article.publishedAt || article.lastUpdated) }}</time>
        </div>
        <h2>{{ article.text }}</h2>
        <p>{{ article.description || '一篇持续更新中的实践笔记。' }}</p>
        <div class="article-card-bottom">
          <span v-for="tag in (article.tags || []).slice(0, 3)" :key="tag">#{{ tag }}</span>
          <b>阅读全文</b>
        </div>
      </a>
    </div>

    <p v-if="!filtered.length" class="empty-state">
      没有找到匹配的文章，换个关键词试试。
    </p>
  </section>
</template>
