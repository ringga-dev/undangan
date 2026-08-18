<template>
  <section class="block surface reveal" :id="side === 'groom' ? 'mempelai-pria' : 'mempelai-wanita'" data-slide>
    <p class="greeting" v-if="side === 'groom'">{{ w.greeting || "Assalamu'alaikum Warahmatullahi Wabarakatuh" }}</p>
    <h2 class="heading">{{ side === 'groom' ? 'Mempelai Pria' : 'Mempelai Wanita' }}</h2>
    <p class="lede" v-if="side === 'groom'">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
    <figure class="tilt" data-depth="0.2">
      <div class="photo sm"><img :src="pP" :alt="side" /></div>
      <h3>{{ p.name }}</h3>
      <p class="role">{{ p.role }}</p>
      <p class="parents">{{ p.parents }}</p>
    </figure>
    <blockquote class="quote" v-if="side === 'bride' && w.quote">{{ w.quote }}</blockquote>
  </section>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
import { useAsset } from '~/composables/useAsset'
const props = defineProps<{ wedding: WeddingProfile; side: 'groom' | 'bride' }>()
const w = props.wedding
const p = props.side === 'groom' ? w.groom : w.bride
const pP = useAsset(p.photo)
</script>

<style scoped>
.block { text-align: center; max-width: 46rem; margin: 0 auto; padding: 6vh 1rem; position: relative; z-index: 1; }
.heading { font-family: var(--font-heading), sans-serif; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.2rem; font-size: clamp(1.6rem,4vw,2.4rem); font-weight: 700; }
.greeting { font-size: 1rem; letter-spacing: 0.08em; max-width: 32rem; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--c-primary); }
.quote { max-width: 34rem; margin: 2rem auto 0; padding: 1.4rem 1.8rem; border-left: 3px solid var(--c-accent); border-radius: 0 14px 14px 0; background: color-mix(in srgb, var(--c-primary) 6%, transparent); font-style: italic; font-size: 0.95rem; line-height: 1.8; opacity: 0.9; }
.lede { opacity: 0.9; max-width: 32rem; margin: 0 auto 1.5rem; }
.sm { aspect-ratio: 1; width: 11rem; overflow: hidden; margin: 0 auto; }
.sm img { width: 100%; height: 100%; object-fit: cover; }
.role { letter-spacing: 0.2em; opacity: 0.75; font-size: 0.7rem; }
.parents { opacity: 0.85; font-size: 0.9rem; }
</style>
