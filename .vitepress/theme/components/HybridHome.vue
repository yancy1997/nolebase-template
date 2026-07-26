<script setup lang="ts">
import { displayTopic, formatDate, getArticles } from '../article-data'

const articles = getArticles()
const featuredTitles = [
  'AI 工具越用越多，Skills 乱套了怎么办？',
  'MCP与Agent生产集成',
  'Obsidian知识库自动化优化方案',
]
const featured = featuredTitles
  .map(title => articles.find(article => article.text === title))
  .filter(Boolean)
const latest = articles.filter(article => !featured.includes(article)).slice(0, 5)
</script>

<template>
  <div class="hybrid-home">
    <section class="hybrid-hero design-wrap">
      <div class="hybrid-hero-copy">
        <p class="design-kicker">
          DATA PRODUCT × AI PRACTICE
        </p>
        <h1>把复杂业务问题，<br><em>做成真正有人用的产品。</em></h1>
        <p class="hybrid-lead">
          我是陈瑜瑾，一名数据产品经理。这里记录我如何把 Agent、Skills 和 AI 编程接进需求分析、指标治理与交付流程。
        </p>
        <div class="design-actions">
          <a class="design-button primary" href="/articles">浏览全部文章</a>
          <a class="design-button secondary" href="/about">了解我的工作</a>
        </div>
      </div>
      <div class="hybrid-signal" aria-label="当前研究主题">
        <div class="signal-orbit one" />
        <div class="signal-orbit two" />
        <div class="signal-core">
          <small>NOW EXPLORING</small>
          <strong>数据产品<br>＋ Agent</strong>
          <span>让重复步骤自动运行，让关键判断保留在人手里。</span>
        </div>
        <span class="signal-tag tag-one">需求 → 指标 → 产品</span>
        <span class="signal-tag tag-two">Skills · MCP · AI Coding</span>
      </div>
    </section>

    <section class="home-statement">
      <div class="design-wrap statement-grid">
        <p class="design-kicker">
          WHAT I WRITE
        </p>
        <p>不追逐泛泛的 AI 新闻。只记录那些经过真实场景、真实数据和真实交付检验的方法。</p>
      </div>
    </section>

    <section class="design-section design-wrap">
      <div class="design-section-head">
        <div>
          <p class="design-kicker">
            EDITOR'S PICKS
          </p>
          <h2>从这三篇开始</h2>
        </div>
        <a href="/articles">查看完整归档 ↗</a>
      </div>
      <div class="featured-grid">
        <a
          v-for="(article, index) in featured"
          :key="article!.link"
          :href="article!.link"
          class="featured-story"
          :class="{ lead: index === 0 }"
        >
          <span class="story-index">0{{ index + 1 }}</span>
          <div>
            <p class="design-kicker">{{ displayTopic(article!.category) }}</p>
            <h3>{{ article!.text }}</h3>
            <p>{{ article!.description }}</p>
          </div>
          <b>阅读全文 ↗</b>
        </a>
      </div>
    </section>

    <section class="design-section design-wrap">
      <div class="design-section-head">
        <div>
          <p class="design-kicker">
            RESEARCH MAP
          </p>
          <h2>四条内容主线</h2>
        </div>
        <a href="/topics">进入主题地图 ↗</a>
      </div>
      <div class="home-topic-grid">
        <a href="/topics#agent-工程"><span>01</span><h3>Agent 工程</h3><p>架构、工具、MCP 与可靠协作。</p></a>
        <a href="/topics#ai-工作流"><span>02</span><h3>AI 工作流</h3><p>Skills、知识管理与自动化方法。</p></a>
        <a href="/topics#实践手记"><span>03</span><h3>实践手记</h3><p>本地设备、博客和真实踩坑。</p></a>
        <a href="/topics#前沿观察"><span>04</span><h3>前沿观察</h3><p>值得长期关注的人与变化。</p></a>
      </div>
    </section>

    <section class="design-section design-wrap latest-section">
      <div class="design-section-head">
        <div>
          <p class="design-kicker">
            LATEST NOTES
          </p>
          <h2>最近更新</h2>
        </div>
      </div>
      <div class="latest-list">
        <a v-for="article in latest" :key="article.link" :href="article.link">
          <span>{{ displayTopic(article.category) }}</span>
          <h3>{{ article.text }}</h3>
          <time>{{ formatDate(article.publishedAt || article.lastUpdated) }}</time>
          <b>↗</b>
        </a>
      </div>
    </section>

    <section class="about-cta">
      <div class="design-wrap about-cta-grid">
        <div>
          <p class="design-kicker">
            ABOUT THE AUTHOR
          </p>
          <h2>从 BI 到数据产品，<br>一路贴着数据走。</h2>
        </div>
        <div>
          <p>过去 7 年，我做过 ETL、数仓、BI、数据运营和数据产品。现在负责一个业务域的数据产品，也在团队里推动 AI 方向。</p>
          <a class="design-button light" href="/about">查看经历与项目</a>
        </div>
      </div>
    </section>
  </div>
</template>
