<template>
  <section class="block surface reveal" id="mempelai" data-slide>
    <p class="greeting">{{ w.greeting || "Assalamu'alaikum Warahmatullahi Wabarakatuh" }}</p>
    <h2 class="heading">Mempelai</h2>
    <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
    <blockquote class="quote" v-if="w.quote">{{ w.quote }}</blockquote>
    <div class="couple">
      <figure class="tilt" data-depth="0.2">
        <div class="photo sm"><img :src="gP" alt="groom" /></div>
        <h3>{{ g.name }}</h3><p class="role">{{ g.role }}</p>
        <p class="parents">{{ g.parents }}</p>
      </figure>
      <figure class="tilt" data-depth="0.2">
        <div class="photo sm"><img :src="bP" alt="bride" /></div>
        <h3>{{ b.name }}</h3><p class="role">{{ b.role }}</p>
        <p class="parents">{{ b.parents }}</p>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
import { useAsset } from '~/composables/useAsset'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const gP = useAsset(g.photo); const bP = useAsset(b.photo)
</script>

<style scoped>
.block { text-align: center; max-width: 46rem; margin: 0 auto; padding: 6vh 1rem; position: relative; z-index: 1; }
.heading { font-family: var(--font-heading), sans-serif; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.2rem; font-size: clamp(1.6rem,4vw,2.4rem); font-weight: 700; }
.greeting { font-size: 1rem; letter-spacing: 0.08em; max-width: 32rem; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--c-primary); }
.quote { max-width: 34rem; margin: 0 auto 2rem; padding: 1.4rem 1.8rem; border-left: 3px solid var(--c-accent); border-radius: 0 14px 14px 0; background: color-mix(in srgb, var(--c-primary) 6%, transparent); font-style: italic; font-size: 0.95rem; line-height: 1.8; opacity: 0.9; }
.lede { opacity: 0.9; max-width: 32rem; margin: 0 auto 1.5rem; }
.couple { display: flex; flex-direction: column; gap: 2rem; }
.couple figure { border-left: 4px solid var(--c-accent); text-align: left; margin: 0; padding-left: 1.2rem; }
.sm { aspect-ratio: 1; width: 11rem; overflow: hidden; }
.sm img { width: 100%; height: 100%; object-fit: cover; }
.role { letter-spacing: 0.2em; opacity: 0.75; font-size: 0.7rem; }
.parents { opacity: 0.85; font-size: 0.9rem; }
@media (min-width: 768px) { .couple { flex-direction: row; justify-content: center; gap: 3rem; } }
</style>
