<template>
  <div class="style-modern deck" ref="root">
    <canvas ref="bg" class="bg3d"></canvas>
    <main class="hero" id="home" ref="hero" data-slide>
      <div class="split">
        <div class="photo"><img :src="cover" alt="cover"></div>
        <div class="text">
          <div class="bar"></div>
          <p class="eyebrow">THE WEDDING OF</p>
          <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <p class="date">{{ w.date }}</p>
          <a class="btn-save" target="_blank" :href="w.calendar">SAVE THE DATE</a>
        </div>
      </div>
    </main>
    <svg class="divider" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="var(--c-surface)" d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z"/></svg>
    <section class="block surface reveal" id="mempelai" data-slide>
      <p class="greeting">{{ w.greeting || 'Assalamu\'alaikum Warahmatullahi Wabarakatuh' }}</p>
      <h2 class="heading">Mempelai</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
      <blockquote class="quote" v-if="w.quote">{{ w.quote }}</blockquote>
      <div class="couple">
        <figure class="tilt" data-depth="0.2">
          <div class="photo sm"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">{{ g.role }}</p>
          <p class="parents">{{ g.parents }}</p>
        </figure>
        <figure class="tilt" data-depth="0.2">
          <div class="photo sm"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">{{ b.role }}</p>
          <p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>
    <svg class="divider" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="var(--c-surface)" d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z"/></svg>
    <div data-slide>
      <RichSections :wedding="w" story-title="Our Love Story" gallery-title="Galeri" />
    </div>
    <svg class="divider" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="var(--c-surface)" d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z"/></svg>
    <section class="block surface reveal" id="waktu" data-slide>
      <h2 class="heading">Waktu &amp; Tempat</h2>
      <div class="countdown">
        <div class="cd-box"><b>{{ hari }}</b><small>hari</small></div>
        <div class="cd-box"><b>{{ jam }}</b><small>jam</small></div>
        <div class="cd-box"><b>{{ menit }}</b><small>menit</small></div>
        <div class="cd-box"><b>{{ detik }}</b><small>detik</small></div>
      </div>
      <div class="events">
        <div class="box" v-for="e in w.events"><h4>{{ e.name }}</h4><p>{{ e.time }}</p></div>
      </div>
      <p class="addr">{{ w.address }}</p>
      <a class="map-link" target="_blank" :href="w.maps">BUKA MAP</a>
    </section>
    <svg class="divider" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="var(--c-surface)" d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z"/></svg>
    <section class="block surface reveal" id="hadiah" data-slide>
      <h2 class="heading">Love &amp; Gift</h2>
      <p class="lede">{{ w.giftNote }}</p>
      <div class="gifts">
        <div class="gift tilt" data-depth="0.12" v-for="gift in w.gifts">
          <img :src="gift.logo" :alt="gift.bank">
          <p><b>{{ gift.bank }}</b> · {{ gift.name }}</p>
          <p class="norek">{{ gift.norek }}</p>
          <button class="copy" @click="copy(gift.norek)"><i class="fa-regular fa-copy"></i> SALIN</button>
        </div>
      </div>
    </section>
    <MusicButton :src="w.music" />
    <OpeningModal v-if="open" @buka="onBuka" :bride="b.name" :groom="g.name" :cover="cover" :guest="guest" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import Closing from '~/components/Closing.vue'
import RichSections from '~/components/RichSections.vue'
import MusicButton from '~/components/MusicButton.vue'
import OpeningModal from '~/components/OpeningModal.vue'
import { useAsset } from '~/composables/useAsset'
import { useThemeEngine } from '~/composables/useThemeEngine'
import { useReveal } from '~/composables/useReveal'
import { useDeck } from '~/composables/useDeck'
import DeckNav from '~/components/DeckNav.vue'

const props = defineProps<{ wedding: any; guest?: string }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover); const gP = useAsset(g.photo); const bP = useAsset(b.photo)
const { hari, jam, menit, detik } = useCountdown(w.countdown)
const { opened, markOpened } = useInvitationOpen()
const open = ref(opened.value === false)
const bg = ref<HTMLCanvasElement | null>(null)
const root = ref<HTMLElement | null>(null)
const deck = useDeck(() => root.value)
const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }
const copy = (t: string) => navigator.clipboard?.writeText(t)
const useAudio = (m: string) => { try { return new Audio(useAsset(m)) } catch { return null } }

type C = { i: number; x: number; y: number; z: number; vx: number; vy: number; r: number }
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let parts: C[] = []
let W = 0, H = 0

const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--c-accent').trim() || '#22d3ee'

onMounted(() => {
  if (typeof window === 'undefined' || !bg.value) return
  const canvas = bg.value
  ctx = canvas.getContext('2d')
  const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
  resize()
  const n = 60
  parts = Array.from({ length: n }, (_, i) => ({
    i, x: Math.random() * W, y: Math.random() * H, z: Math.random() * 6 + 2,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 3 + 1
  }))
  const draw = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)
    const col = accent()
    parts.forEach((p) => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
      ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx!.fillStyle = col; ctx!.globalAlpha = 0.5; ctx!.fill()
    })
    // connect near ones
    for (let a = 0; a < parts.length; a++) {
      for (let b2 = a + 1; b2 < parts.length; b2++) {
        const dx = parts[a].x - parts[b2].x, dy = parts[a].y - parts[b2].y
        const d = Math.hypot(dx, dy)
        if (d < 120) { ctx!.beginPath(); ctx!.moveTo(parts[a].x, parts[a].y); ctx!.lineTo(parts[b2].x, parts[b2].y); ctx!.strokeStyle = col; ctx!.globalAlpha = 0.12; ctx!.stroke() }
      }
    }
    raf = requestAnimationFrame(draw)
  }
  draw()
  window.addEventListener('resize', resize)
  // GSAP reveals + tilt
  gsap.from('.style-modern .text > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' })
  useReveal(() => root.value)
  const onMove = (e: MouseEvent) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2
    root.value?.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
      const d = parseFloat(el.dataset.depth || '0.1')
      gsap.to(el, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 0.6, ease: 'power2.out' })
    })
  }
  window.addEventListener('mousemove', onMove)
  onUnmounted(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove) })
})
</script>

<style scoped>
.style-modern { font-family: 'Space Grotesk', sans-serif; background: var(--c-bg); color: var(--c-text); overflow: hidden; position: relative; }
.bg3d { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 5; pointer-events: none; opacity: 0.4; }
.hero { position: relative; z-index: 1; }
.split { grid-template-columns: 1fr; min-height: 100vh; display: grid; }
.photo { width: 100%; height: 45vh; overflow: hidden; }
.photo img { width: 100%; height: 100%; object-fit: cover; }
.text { display: flex; flex-direction: column; justify-content: center; padding: 6vh 1.5rem; position: relative; }
.bar { background: var(--c-accent); width: 60px; height: 6px; margin-bottom: 1.5rem; }
.eyebrow { letter-spacing: 0.4em; opacity: 0.7; font-size: 0.7rem; }
.title { font-family: var(--font-heading), sans-serif; text-transform: uppercase; letter-spacing: -0.02em; margin: 0.5rem 0; font-size: clamp(2.2rem,7vw,3.6rem); font-weight: 700; line-height: 1; }
.amp { color: var(--c-accent); }
.date { opacity: 0.8; letter-spacing: 0.05em; }
.btn-save { background: var(--c-primary); color: #fff; letter-spacing: 0.1em; width: fit-content; margin-top: 1.2rem; padding: 0.7rem 1.6rem; font-weight: 700; text-decoration: none; display: inline-block; }
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
.countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.countdown b { font-family: var(--font-heading), sans-serif; font-size: 2.6rem; font-weight: 700; display: block; }
.countdown small { opacity: 0.5; letter-spacing: 0.1em; }
.events { display: flex; flex-direction: column; gap: 0.75rem; max-width: 24rem; margin: 1rem auto; }
.box { border: 1px solid var(--c-accent); padding: 0.75rem; }
.box h4 { letter-spacing: 0.08em; margin: 0; font-weight: 700; }
.addr { opacity: 0.8; margin-top: 1rem; font-size: 0.85rem; }
.gifts { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
.gift { background: var(--c-surface); width: 16rem; padding: 1.5rem; }
.gift img { height: auto; max-width: 130px; }
.copy { background: var(--c-primary); color: #fff; cursor: pointer; letter-spacing: 0.1em; border: none; margin-top: 0.5rem; padding: 0.4rem 1rem; font-weight: 700; }
@media (min-width: 768px) { .split { grid-template-columns: 1fr 1fr; } .photo { height: 100vh; } .couple { flex-direction: row; justify-content: center; gap: 3rem; } }
</style>
