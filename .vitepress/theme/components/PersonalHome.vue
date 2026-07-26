<script setup lang="ts">
import { displayTopic, formatDate, getArticles } from '../article-data'

const latest = getArticles().slice(0, 3)
</script>

<template>
  <div class="personal-home">
    <section class="personal-hero design-wrap">
      <div class="personal-hero-copy">
        <p class="design-kicker">
          陈瑜瑾 / DATA PRODUCT × AI
        </p>
        <h1>把业务问题，<br>做成每天有人用的<em>产品。</em></h1>
        <p>做数据产品，也把 <strong>Agent、Skills 和 AI 编程</strong>接进真实工作流。</p>
        <div class="design-actions">
          <a class="design-button primary" href="#projects">看代表项目</a>
          <a class="design-button secondary" href="/articles">读最新文章</a>
        </div>
      </div>
      <figure class="personal-hero-visual">
        <img
          src="/images/personal-hero-data-ai.jpg"
          alt="混乱的数据线索逐渐汇聚成清晰产品界面的抽象插画"
          width="1440"
          height="960"
          fetchpriority="high"
        >
        <figcaption>
          <span>从复杂到清晰</span>
          <strong>问题 → 数据 → 产品</strong>
        </figcaption>
      </figure>
    </section>

    <section class="personal-numbers">
      <div class="design-wrap">
        <div><strong>7年+</strong><span>数据与产品经验</span></div>
        <div><strong>600+</strong><span>业务指标线上化</span></div>
        <div><strong>60+</strong><span>持续维护的 Skills</span></div>
      </div>
    </section>

    <section class="personal-section design-wrap" id="method">
      <div class="personal-section-head">
        <span>01 / 工作方法</span>
        <div>
          <p class="design-kicker">
            HOW I WORK
          </p>
          <h2>我怎么做<br>数据产品。</h2>
        </div>
      </div>
      <div class="personal-flow" aria-label="数据产品工作流程">
        <div><b>01</b><span>业务问题</span></div>
        <i>→</i>
        <div><b>02</b><span>指标口径</span></div>
        <i>→</i>
        <div><b>03</b><span>数据链路</span></div>
        <i>→</i>
        <div><b>04</b><span>产品交付</span></div>
        <i>→</i>
        <div><b>05</b><span>上线运营</span></div>
      </div>
      <p class="personal-flow-note">把规则明确、结果可校验的重复步骤交给 AI，把业务判断留给人。</p>
    </section>

    <section class="personal-section personal-experience design-wrap" id="experience">
      <div class="personal-section-head">
        <span>02 / 经历</span>
        <div>
          <p class="design-kicker">
            EXPERIENCE
          </p>
          <h2>一路贴着<br>数据走。</h2>
        </div>
      </div>
      <div class="personal-timeline">
        <article><time>2025 — NOW</time><h3>营运域数据产品负责人</h3></article>
        <article><time>2022 — 2025</time><h3>经营与薪酬数据产品</h3></article>
        <article><time>2020 — 2022</time><h3>数据运营 / 营销数据平台</h3></article>
        <article><time>2019 — 2020</time><h3>BI 工程师</h3></article>
      </div>
      <a class="personal-text-link" href="/about">完整经历与工作方法 →</a>
    </section>

    <section class="personal-section design-wrap" id="projects">
      <div class="personal-section-head">
        <span>03 / 代表项目</span>
        <div>
          <p class="design-kicker">
            SELECTED WORK
          </p>
          <h2>把手工活，<br>做成工具。</h2>
        </div>
      </div>
      <div class="personal-project-grid">
        <article class="project-lead">
          <div class="project-image project-image-one">
            <img src="/images/personal-hero-data-ai.jpg" alt="" loading="lazy" width="1440" height="960">
          </div>
          <span>AI 编程 / 01</span>
          <h3>规则型数据处理工具</h3>
          <p>把解析、校验、映射和 SQL 生成做成一个工具。</p>
          <b>1—2 个工作日 → 约 5 分钟</b>
        </article>
        <article>
          <div class="project-image project-image-two">
            <img src="/images/personal-hero-data-ai.jpg" alt="" loading="lazy" width="1440" height="960">
          </div>
          <span>AI 产品 / 02</span>
          <h3>指标运营工作台</h3>
          <p>让同步、检查、释义与纠偏在一个工作台完成。</p>
          <b>5—10 分钟 → 约 30 秒</b>
        </article>
        <article>
          <div class="project-image project-image-three">
            <img src="/images/personal-hero-data-ai.jpg" alt="" loading="lazy" width="1440" height="960">
          </div>
          <span>Agent / Skills / 03</span>
          <h3>个人 AI 工作流</h3>
          <p>用 60 多个 Skills 连接发布、知识整理和本地设备。</p>
          <b>高频流程 → 对话触发</b>
        </article>
      </div>
    </section>

    <section class="personal-writing">
      <div class="design-wrap">
        <div class="personal-section-head">
          <span>04 / 写作</span>
          <div>
            <p class="design-kicker">
              LATEST WRITING
            </p>
            <h2>最近写下的<br>实践与复盘。</h2>
          </div>
        </div>
        <div class="personal-writing-grid">
          <a v-for="(article, index) in latest" :key="article.link" :href="article.link">
            <div class="writing-thumb" :class="`writing-thumb-${index + 1}`" aria-hidden="true">
              <i /><i /><i />
            </div>
            <span>{{ displayTopic(article.category) }}</span>
            <h3>{{ article.text }}</h3>
            <div><time>{{ formatDate(article.publishedAt || article.lastUpdated) }}</time><b>阅读 ↗</b></div>
          </a>
        </div>
        <div class="design-actions">
          <a class="design-button primary" href="/articles">查看全部文章</a>
        </div>
      </div>
    </section>

    <section class="personal-footer">
      <div class="design-wrap">
        <p class="design-kicker">
          陈瑜瑾 / DATA PRODUCT × AI
        </p>
        <h2>继续把复杂问题，<br>做成简单好用的产品。</h2>
        <div class="design-actions">
          <a class="design-button light" href="https://github.com/yancy1997">GitHub</a>
          <a class="design-button outline-light" href="/articles">阅读文章</a>
        </div>
      </div>
    </section>
  </div>
</template>
