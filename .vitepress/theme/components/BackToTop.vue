<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)
const THRESHOLD = 400

function onScroll() {
  visible.value = window.scrollY > THRESHOLD
}

function backToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <button
    type="button"
    class="back-to-top"
    :class="{ 'is-visible': visible }"
    aria-label="回到顶部"
    @click="backToTop"
  >
    <span class="i-ic:outline-keyboard-arrow-up" style="width: 22px; height: 22px;" />
  </button>
</template>
