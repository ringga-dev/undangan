<template>
  <section class="surface block reveal" :id="side === 'groom' ? 'mempelai-pria' : 'mempelai-wanita'" data-slide>
    <p class="greeting" v-if="side === 'groom'">{{ w.greeting || "Assalamu'alaikum Warahmatullahi Wabarakatuh" }}</p>
    <h2 class="heading">{{ side === 'groom' ? 'Mempelai Pria' : 'Mempelai Wanita' }}</h2>
    <p class="lede" v-if="side === 'groom'">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
    <blockquote class="quote" v-if="side === 'bride' && w.quote">{{ w.quote }}</blockquote>
    <figure class="person tilt" data-depth="0.15">
      <div class="cropper"><img :src="pP" :alt="side" /></div>
      <h3>{{ p.name }}</h3>
      <p class="role">{{ side === 'groom' ? 'Putra' : 'Putri' }}</p>
      <p class="parents">{{ p.parents }}</p>
    </figure>
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
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; font-weight: 700; letter-spacing: -0.02em; }
.greeting { text-align: center; font-size: 1rem; letter-spacing: 0.08em; max-width: 560px; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--c-primary); }
.quote { max-width: 620px; margin: 0 auto 2rem; padding: 1.4rem 1.8rem; border-left: 3px solid var(--c-accent); border-radius: 0 14px 14px 0; background: color-mix(in srgb, var(--c-primary) 6%, transparent); font-style: italic; font-size: 0.95rem; line-height: 1.8; opacity: 0.9; }
.lede { text-align: center; max-width: 560px; margin: 0 auto 2rem; opacity: 0.7; line-height: 1.7; }
.person { text-align: center; margin: 0; }
.cropper { border-radius: 4px; overflow: hidden; width: 200px; aspect-ratio: 3/4; box-shadow: 0 20px 50px rgba(0,0,0,0.3); margin: 0 auto; }
.cropper img { width: 100%; height: 100%; object-fit: cover; }
.person h3 { margin: 1.2rem 0 0.2rem; font-size: 1.4rem; font-weight: 700; }
.role { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.5; }
.parents { opacity: 0.6; font-size: 0.85rem; margin-top: 0.4rem; }
</style>
