<template>
  <section class="surface block reveal" id="mempelai" data-slide>
    <p class="greeting">{{ w.greeting || "Assalamu'alaikum Warahmatullahi Wabarakatuh" }}</p>
    <h2 class="heading">Mempelai</h2>
    <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
    <blockquote class="quote" v-if="w.quote">{{ w.quote }}</blockquote>
    <div class="couple">
      <figure class="person tilt" data-depth="0.15">
        <div class="cropper"><img :src="gP" alt="groom" /></div>
        <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
      </figure>
      <figure class="person tilt" data-depth="0.15">
        <div class="cropper"><img :src="bP" alt="bride" /></div>
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
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; font-weight: 700; letter-spacing: -0.02em; }
.greeting { text-align: center; font-size: 1rem; letter-spacing: 0.08em; max-width: 560px; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--c-primary); }
.quote { max-width: 620px; margin: 0 auto 2.5rem; padding: 1.4rem 1.8rem; border-left: 3px solid var(--c-accent); border-radius: 0 14px 14px 0; background: color-mix(in srgb, var(--c-primary) 6%, transparent); font-style: italic; font-size: 0.95rem; line-height: 1.8; opacity: 0.9; }
.lede { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; opacity: 0.7; line-height: 1.7; }
.couple { display: flex; align-items: center; justify-content: center; gap: 3rem; flex-wrap: wrap; }
.person { text-align: center; }
.cropper { border-radius: 4px; overflow: hidden; width: 200px; aspect-ratio: 3/4; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.cropper img { width: 100%; height: 100%; object-fit: cover; }
.person h3 { margin: 1rem 0 0.2rem; font-size: 1.3rem; font-weight: 700; }
.role { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.5; }
.parents { opacity: 0.6; font-size: 0.85rem; margin-top: 0.4rem; }
</style>
