<script setup lang="ts">
import { computed } from 'vue'
import { displayTopic, getArticles, topicMap } from '../article-data'

const articles = getArticles()
const groups = computed(() => {
  const map = new Map<string, typeof articles>()
  for (const article of articles) {
    const label = displayTopic(article.category)
    if (!map.has(label))
      map.set(label, [])
    map.get(label)!.push(article)
  }

  return [...map.entries()].map(([label, items]) => {
    const source = Object.values(topicMap).find(topic => topic.label === label)
    return {
      label,
      eyebrow: source?.eyebrow || 'TOPIC',
      description: source?.description || '',
      items,
    }
  })
})
</script>

<template>
  <section class="collection-shell topic-directory">
    <div class="collection-intro">
      <p class="design-kicker">
        RESEARCH TOPICS
      </p>
      <h1>四条持续生长的主线</h1>
      <p>目录不再按文件怎么存，而是按读者想解决什么问题来组织。</p>
    </div>

    <div class="topic-directory-grid">
      <article v-for="(group, index) in groups" :key="group.label" class="topic-panel">
        <div class="topic-number">
          0{{ index + 1 }}
        </div>
        <p class="design-kicker">
          {{ group.eyebrow }}
        </p>
        <h2>{{ group.label }}</h2>
        <p>{{ group.description }}</p>
        <div class="topic-links">
          <a v-for="article in group.items.slice(0, 4)" :key="article.link" :href="article.link">
            <span>{{ article.text }}</span>
            <b>↗</b>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
