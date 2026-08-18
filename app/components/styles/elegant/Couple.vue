<template>
  <section class="surface block reveal" id="mempelai" data-slide>
    <p class="greeting gold">{{ w.greeting || "Assalamu'alaikum Warahmatullahi Wabarakatuh" }}</p>
    <h2 class="heading gold">Mempelai</h2>
    <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
    <blockquote class="quote" v-if="w.quote">{{ w.quote }}</blockquote>
    <div class="couple">
      <figure class="person">
        <div class="cropper ring"><img :src="gP" alt="groom" /></div>
        <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
      </figure>
      <span class="amp-mark shimmer">&amp;</span>
      <figure class="person">
        <div class="cropper ring"><img :src="bP" alt="bride" /></div>
        <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
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
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; }
.gold { color: var(--gold); text-shadow: 0 2px 20px rgba(212,175,55,0.3); }
.lede { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; opacity: 0.85; line-height: 1.7; }
.couple { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.person { text-align: center; }
.cropper.ring { border: 3px solid var(--gold); border-radius: 50%; width: 180px; aspect-ratio: 1; overflow: hidden; }
.cropper.ring img { width: 100%; aspect-ratio: 1; object-fit: cover; }
.person h3 { margin: 1rem 0 0.2rem; font-size: 1.4rem; }
.role { color: var(--gold); font-style: italic; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.7rem; }
.parents { opacity: 0.7; font-size: 0.85rem; margin-top: 0.4rem; }
.amp-mark { font-size: 2.5rem; color: var(--gold); }
.greeting { text-align: center; font-size: 1rem; letter-spacing: 0.08em; max-width: 560px; margin: 0 auto 1.5rem; line-height: 1.7; }
.quote { position: relative; z-index: 3; max-width: 620px; margin: 0 auto 2.5rem; padding: 1.4rem 1.8rem; border-left: 3px solid var(--gold); border-radius: 0 14px 14px 0; background: rgba(11,31,23,0.6); font-style: italic; font-size: 0.95rem; line-height: 1.8; opacity: 0.95; }
</style>
