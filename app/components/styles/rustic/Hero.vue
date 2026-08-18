<template>
  <main class="hero" id="home" ref="hero" data-slide>
    <p class="guest" v-if="guest">Untuk {{ guest }}</p>
    <div class="grid2 reveal">
      <figure class="photo" data-depth="0.15">
        <img :src="cover" alt="cover" />
      </figure>
      <div class="text">
        <p class="eyebrow">The Wedding Of</p>
        <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
        <p class="date">{{ w.date }}</p>
        <a class="btn-save" target="_blank" :href="w.calendar">Simpan Waktu</a>
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
.hero { padding: 8vh 1rem; position: relative; z-index: 1; }
.grid2 { border: 6px double var(--c-accent); border-radius: var(--radius); grid-template-columns: 1fr; gap: 1.5rem; max-width: 50rem; margin: 0 auto; padding: 1.5rem; display: grid; background: var(--c-surface); }
.photo { aspect-ratio: 4/5; border: 3px solid var(--c-primary); border-radius: var(--radius); width: 100%; overflow: hidden; margin: 0; }
.photo img { width: 100%; height: 100%; object-fit: cover; }
.text { text-align: center; display: flex; flex-direction: column; justify-content: center; }
.eyebrow { letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.75; font-size: 0.8rem; }
.title { font-family: var(--font-heading), serif; margin: 0.5rem 0; font-size: clamp(2rem,6vw,3rem); }
.amp { color: var(--c-accent); }
.date { opacity: 0.8; }
.btn-save { background: var(--c-primary); color: #fff; border-radius: var(--radius); margin-top: 1rem; padding: 0.6rem 1.4rem; text-decoration: none; display: inline-block; }
@media (min-width: 768px) { .grid2 { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) {
  .hero { padding: 3vh 0.75rem !important; }
  .grid2 { padding: 1rem !important; gap: 1rem !important; border-width: 4px !important; }
  .photo { aspect-ratio: 3/4 !important; }
  .title { font-size: clamp(1.7rem, 7vw, 2.4rem) !important; }
}
</style>
