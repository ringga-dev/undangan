<template>
  <main class="hero" id="home" ref="hero" data-slide>
    <p class="guest" v-if="guest">Untuk {{ guest }}</p>
    <div class="photo-full">
      <img :src="cover" alt="cover" />
      <div class="overlay"></div>
      <img class="illu" :src="illu" alt="" />
    </div>
    <div class="hero-text">
      <p class="eyebrow kinetic">THE WEDDING OF</p>
      <h1 class="title">{{ g.name }}<br><span class="amp">&amp;</span> {{ b.name }}</h1>
      <p class="date">{{ w.dateText }}</p>
      <a class="btn-save magnetic" target="_blank" :href="w.calendarUrl"><i class="fa-solid fa-calendar-check"></i> Simpan Waktu</a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import type { WeddingProfile } from '~/composables/useWeddings'
import { useAsset } from '~/composables/useAsset'
import { useGuest } from '~/composables/useGuest'

const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover)
const illu = useAsset('images/illu/minimal.png')
const guest = useGuest()

onMounted(() => {
  gsap.from('.hero-text > *', { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
  gsap.to('.kinetic', { letterSpacing: '0.6em', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
})
</script>

<style scoped>
.hero { position: relative; min-height: 100vh; display: grid; place-items: center; overflow: hidden; }
.photo-full { position: absolute; inset: 0; z-index: 0; }
.illu { position: absolute; width: 180px; right: 5%; bottom: 8%; opacity: 0.35; pointer-events: none; z-index: 1; }
@media (max-width: 520px) { .illu { width: 110px; } }
.overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.78)); z-index: 1; }
.hero-text { position: relative; z-index: 2; text-align: center; color: #fff; padding: 1rem; width: 100%; }
.eyebrow { letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.7rem; opacity: 0.8; }
.title { font-size: clamp(2.4rem, 9vw, 5rem); font-weight: 800; line-height: 1; margin: 0.6rem 0; letter-spacing: -0.02em; }
.amp { font-weight: 300; color: var(--c-accent); }
.date { opacity: 0.85; letter-spacing: 0.1em; }
.btn-save { display: inline-block; margin-top: 1.5rem; padding: 0.8rem 2rem; border-radius: 999px; background: #fff; color: #000; text-decoration: none; font-weight: 600; transition: 0.3s; }
.btn-save:hover { background: var(--c-accent); color: #fff; }
@media (max-width: 520px) { .illu { width: 110px; } }
@media (max-width: 600px) {
  .title { font-size: clamp(1.9rem, 8vw, 3rem) !important; margin: 0.4rem 0 !important; }
  .hero-text { padding: 0.5rem !important; }
  .btn-save { margin-top: 1rem !important; padding: 0.7rem 1.6rem !important; }
}
</style>
