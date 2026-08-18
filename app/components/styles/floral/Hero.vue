<template>
  <main class="hero" id="home" ref="hero" data-slide>
    <p class="guest" v-if="guest">Untuk {{ guest }}</p>
    <div class="blob"></div>
    <canvas ref="petals" class="petals"></canvas>
    <div class="photo-full">
      <img class="illu float-a" :src="illu" alt="" />
      <div class="card tilt" data-depth="0.3">
        <p class="eyebrow">The Wedding Of</p>
        <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
        <div class="cropper"><img :src="cover" alt="cover" /></div>
        <p class="date">{{ w.dateText }}</p>
        <a class="btn-save" target="_blank" :href="w.calendarUrl"><i class="fa-solid fa-calendar-check"></i> Simpan Waktu</a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import type { WeddingProfile } from '~/composables/useWeddings'
import { useAsset } from '~/composables/useAsset'
import { useGuest } from '~/composables/useGuest'

const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover)
const illu = useAsset('images/illu/floral.png')
const guest = useGuest()

const petals = ref<HTMLCanvasElement | null>(null)
let raf = 0, ctx: CanvasRenderingContext2D | null = null, parts: any[] = []
const initPetals = () => {
  if (!petals.value) return
  ctx = petals.value.getContext('2d')
  const cv = petals.value
  const resize = () => { cv.width = innerWidth; cv.height = innerHeight }
  resize(); addEventListener('resize', resize)
  parts = Array.from({ length: 40 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 10 + 5, s: Math.random() * 0.6 + 0.2, rot: Math.random() * 6, rs: Math.random() * 0.02 + 0.005,
    hue: Math.random() > 0.5 ? 'rgba(255,183,197,0.7)' : 'rgba(255,140,160,0.6)'
  }))
  const loop = () => {
    if (!ctx || !cv) return
    ctx.clearRect(0, 0, cv.width, cv.height)
    parts.forEach(p => {
      p.y += p.s; p.x += Math.sin(p.y * 0.01) * 0.5; p.rot += p.rs; if (p.y > cv.height) { p.y = -20; p.x = Math.random() * cv.width }
      ctx!.save(); ctx!.translate(p.x, p.y); ctx!.rotate(p.rot); ctx!.fillStyle = p.hue
      ctx!.beginPath(); ctx!.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, 7); ctx!.fill(); ctx!.restore()
    })
    raf = requestAnimationFrame(loop)
  }
  loop()
}
onMounted(() => { initPetals(); gsap.from('.card', { scale: 0.85, opacity: 0, y: 40, duration: 1.3, ease: 'power4.out' }) })
onUnmounted(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.hero { min-height: 100vh; display: grid; place-items: center; perspective: 1200px; position: relative; z-index: 2; }
.petals { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
.blob { position: absolute; width: 60vw; height: 60vw; background: radial-gradient(circle, var(--c-accent), transparent 65%); filter: blur(60px); opacity: 0.5; animation: float 8s ease-in-out infinite; }
@keyframes float { 50% { transform: translateY(-30px) scale(1.1); } }
@media (max-width: 520px) { .blob { width: 42vw; height: 42vw; opacity: 0.32; } .illu.float-a { width: 90px; } }
.card { position: relative; width: min(90vw, 480px); padding: 2.5rem; border-radius: 36px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,150,170,0.4); box-shadow: 0 30px 70px rgba(0,0,0,0.3); backdrop-filter: blur(10px); text-align: center; transform-style: preserve-3d; }
.eyebrow { letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.7rem; opacity: 0.7; }
.title { font-size: clamp(2rem, 7vw, 3.2rem); margin: 0.4rem 0 1rem; }
.amp { color: var(--c-accent); font-style: italic; }
.cropper { border-radius: 24px; overflow: hidden; margin: 1rem 0; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.cropper img { width: 100%; display: block; object-fit: cover; aspect-ratio: 4/3; }
.date { opacity: 0.85; }
.btn-save { display: inline-block; margin-top: 1rem; padding: 0.7rem 1.6rem; border-radius: 999px; background: var(--c-accent); color: #fff; text-decoration: none; transition: 0.3s; }
.btn-save:hover { box-shadow: 0 0 30px var(--c-accent); transform: translateY(-2px); }
.illu { position: absolute; width: 180px; pointer-events: none; z-index: 1; opacity: 0.85; }
.illu.float-a { top: 6%; right: 4%; animation: floaty 6s ease-in-out infinite; }
@keyframes floaty { 50% { transform: translateY(-18px) rotate(4deg); } }
@media (max-width: 520px) { .illu { width: 110px; } }
</style>
