<template>
  <section class="surface block reveal" :id="'story-' + part" v-if="items.length" data-slide>
    <h2 class="heading gold">Our Love Story{{ total > 1 ? ' ' + part : '' }}</h2>
    <p class="lede" v-if="part === 1">Perjalanan kami menuju hari bahagia.</p>
    <div class="timeline">
      <div class="tl-item tilt" data-depth="0.1" v-for="(s, i) in items" :key="i">
        <span class="tl-year">{{ s.date }}</span>
        <h3 class="tl-title">{{ s.title }}</h3>
        <p class="tl-text">{{ s.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { WeddingProfile } from '~/composables/useWeddings'
const props = defineProps<{ wedding: WeddingProfile; part: number }>()
const w = props.wedding
const all = computed(() => w.story || [])
const total = computed(() => (all.value.length > 2 ? 2 : 1))
const items = computed(() => {
  const s = all.value
  if (s.length <= 2) return s
  const mid = Math.ceil(s.length / 2)
  return props.part === 1 ? s.slice(0, mid) : s.slice(mid)
})
</script>

<style scoped>
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; }
.gold { color: var(--gold); text-shadow: 0 2px 20px rgba(212,175,55,0.3); }
.lede { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; opacity: 0.85; line-height: 1.7; }
.timeline { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 1rem; }
.tl-item { padding: 1.6rem; border-radius: 18px; border: 1px solid rgba(212,175,55,0.25); background: rgba(255,255,255,0.03); text-align: center; }
.tl-year { display: inline-block; color: var(--gold); font-weight: 700; letter-spacing: 0.15em; margin-bottom: 0.5rem; }
.tl-title { font-size: 1.2rem; margin: 0.3rem 0; }
.tl-text { opacity: 0.8; font-size: 0.9rem; line-height: 1.7; }
</style>
