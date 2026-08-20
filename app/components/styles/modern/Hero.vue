<template>
  <main class="hero" id="home" ref="hero" data-slide>
    <p class="guest" v-if="guest">Untuk {{ guest }}</p>
    <div class="split">
      <div class="photo"><img :src="cover" alt="cover" /></div>
      <div class="text">
        <div class="bar"></div>
        <p class="eyebrow">THE WEDDING OF</p>
        <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
        <p class="date">{{ w.date }}</p>
        <a class="btn-save" target="_blank" :href="w.calendar">SAVE THE DATE</a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
import { useAsset } from '~/composables/useAsset'
import { useGuest } from '~/composables/useGuest'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover)
const guest = useGuest()
</script>

<style scoped>
.hero { position: relative; z-index: 1; background: radial-gradient(circle at 70% 20%, color-mix(in srgb, var(--c-accent) 16%, transparent), transparent 55%); }
.split { grid-template-columns: 1fr; height: 100vh; overflow: hidden; display: grid; }
.photo { width: 100%; height: 45vh; overflow: hidden; margin: 0; }
.photo img { width: 100%; height: 100%; object-fit: cover; }
.text { display: flex; flex-direction: column; justify-content: center; height: 100vh; box-sizing: border-box; overflow: hidden; padding: 3vh 1.5rem; position: relative; }
.bar { background: var(--c-accent); width: 60px; height: 6px; margin-bottom: 1.5rem; }
.eyebrow { letter-spacing: 0.4em; opacity: 0.9; font-size: 0.7rem; }
.title { font-family: var(--font-heading), sans-serif; text-transform: uppercase; letter-spacing: -0.02em; margin: 0.5rem 0; font-size: clamp(2.2rem,7vw,3.6rem); font-weight: 700; line-height: 1; }
.amp { color: var(--c-accent); }
.date { opacity: 0.8; letter-spacing: 0.05em; }
.btn-save { background: var(--c-primary); color: #fff; letter-spacing: 0.1em; width: fit-content; margin-top: 1.2rem; padding: 0.7rem 1.6rem; font-weight: 700; text-decoration: none; display: inline-block; }
@media (min-width: 768px) { .split { grid-template-columns: 1fr 1fr; } .photo { height: 100vh; } }
@media (max-width: 600px) {
  .split { height: 100vh !important; min-height: auto !important; overflow: hidden !important; }
  .photo { height: 20vh !important; }
  .text { height: auto !important; padding: 1.8vh 1.2rem !important; }
  .title { font-size: clamp(1.6rem, 6vw, 2.1rem) !important; }
  .btn-save { margin-top: 0.6rem !important; padding: 0.55rem 1.3rem !important; }
}
</style>
