<template>
  <main class="hero" id="home" data-slide>
    <canvas class="dust"></canvas>
    <p class="guest" v-if="guest">Untuk {{ guest }}</p>
    <div class="stage">
      <div class="card3d">
        <img class="illu corner tl" :src="illu" alt="" />
        <img class="illu corner br" :src="illu" alt="" />
        <div class="card-face">
          <div class="cropper"><img :src="cover" alt="cover" /><div class="veil"></div></div>
          <p class="eyebrow">The Wedding Of</p>
          <h1 class="title shimmer">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <p class="date">{{ w.dateText }}</p>
          <a class="btn-save" target="_blank" :href="w.calendarUrl">
            <i class="fa-solid fa-calendar-check"></i> Simpan Waktu
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import type { WeddingProfile } from '~/composables/useWeddings'
import { useAsset } from '~/composables/useAsset'
import { useGuest } from '~/composables/useGuest'

const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover)
const illu = useAsset('images/illu/elegant.png')
const guest = useGuest()

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let particles: any[] = []
const onMove = (e: MouseEvent) => {
  const cardEl = document.querySelector('.card3d') as HTMLElement | null
  if (!cardEl) return
  const rx = (e.clientY / window.innerHeight - 0.5) * -12
  const ry = (e.clientX / window.innerWidth - 0.5) * 12
  gsap.to(cardEl, { rotateX: rx, rotateY: ry, duration: 0.6, ease: 'power2.out' })
}
const initDust = () => {
  const cv = document.querySelector('.dust') as HTMLCanvasElement | null
  if (!cv) return
  ctx = cv.getContext('2d')
  const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight }
  resize(); window.addEventListener('resize', resize)
  particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.4 + 0.1, o: Math.random() * 0.5 + 0.2
  }))
  const loop = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, cv.width, cv.height)
    particles.forEach(p => {
      p.y -= p.s; if (p.y < 0) p.y = cv.height
      ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, 7)
      ctx!.fillStyle = `rgba(212,175,55,${p.o})`; ctx!.fill()
    })
    raf = requestAnimationFrame(loop)
  }
  loop()
}
onMounted(() => {
  initDust()
  window.addEventListener('mousemove', onMove)
  gsap.from('.card3d', { scale: 0.8, opacity: 0, rotateY: 40, duration: 1.4, ease: 'power4.out' })
  gsap.from('.title', { y: 30, opacity: 0, duration: 1, delay: 0.5 })
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
})
</script>

<style scoped>
.hero { min-height: 100vh; display: grid; place-items: center; perspective: 1400px; position: relative; z-index: 2; }
.dust { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.6; }
.stage { transform-style: preserve-3d; }
.card3d {
  transform-style: preserve-3d;
  width: min(92vw, 520px);
  padding: 2.5rem 2rem;
  border-radius: 28px;
  background: linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  border: 1px solid rgba(212,175,55,0.4);
  box-shadow: 0 40px 90px rgba(0,0,0,0.5), inset 0 0 40px rgba(212,175,55,0.08);
  backdrop-filter: blur(8px);
  text-align: center;
  transform-style: preserve-3d;
}
.card-face { transform: translateZ(40px); position: relative; z-index: 2; }
.cropper { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.4); margin-bottom: 1.2rem; }
.cropper img { width: 100%; display: block; object-fit: cover; aspect-ratio: 4/5; }
.veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35)); border-radius: 20px; }
.eyebrow { position: relative; z-index: 2; letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.75rem; color: var(--gold); margin-top: 1.2rem; }
.title { position: relative; z-index: 2; font-size: clamp(2.2rem, 7vw, 3.6rem); font-weight: 700; margin: 0.4rem 0; line-height: 1.05; }
.amp { color: var(--gold); font-style: italic; }
.date { position: relative; z-index: 2; opacity: 0.85; letter-spacing: 0.1em; }
.btn-save { display: inline-block; margin-top: 1.2rem; padding: 0.7rem 1.6rem; border-radius: 999px; border: 1px solid var(--gold); color: var(--gold); text-decoration: none; transition: 0.3s; }
.btn-save:hover { background: var(--gold); color: #111; box-shadow: 0 0 30px rgba(212,175,55,0.5); }
.shimmer {
  background: linear-gradient(90deg, #b8860b, #ffe9a8, #d4af37, #ffe9a8, #b8860b);
  background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: shimmer 4s linear infinite;
}
@keyframes shimmer { to { background-position: 200% center; } }
.illu { position: absolute; width: 120px; pointer-events: none; z-index: 1; opacity: 0.85; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
.illu.corner.tl { top: -10px; left: -10px; }
.illu.corner.br { bottom: -10px; right: -10px; transform: rotate(180deg); }
@media (max-width: 520px) { .illu { width: 70px; } }
</style>
