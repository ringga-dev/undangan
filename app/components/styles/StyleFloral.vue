<template>
  <div class="style-floral" ref="root">
    <Navbar />
    <canvas ref="petals" class="petals"></canvas>

    <main class="hero" id="home" ref="hero">
      <div class="blob"></div>
      <img class="illu float-a" :src="illu('floral')" alt="">
      <div class="card tilt" data-depth="0.3" ref="card">
        <p class="eyebrow">The Wedding Of</p>
        <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
        <div class="cropper"><img :src="cover" alt="cover"></div>
        <p class="date">{{ w.dateText }}</p>
        <a class="btn-save" target="_blank" :href="w.calendarUrl"><i class="fa-solid fa-calendar-check"></i> Simpan Waktu</a>
      </div>
    </main>

    <DividerFloral />

    <section class="surface block reveal" id="mempelai">
      <h2 class="heading">Assalamualaikum</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
      <div class="couple">
        <figure class="person tilt" data-depth="0.2">
          <div class="cropper leaf"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <span class="amp-mark">&amp;</span>
        <figure class="person tilt" data-depth="0.2">
          <div class="cropper leaf"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerFloral />

    <section class="surface block reveal" id="waktu">
      <h2 class="heading">Waktu & Tempat</h2>
      <div class="grid2">
        <div class="info tilt" data-depth="0.1">
          <i class="fa-regular fa-clock ico"></i>
          <h3>Akad & Resepsi</h3>
          <p>{{ w.akad }}</p><p>{{ w.resepsi }}</p>
        </div>
        <div class="info tilt" data-depth="0.1">
          <i class="fa-solid fa-location-dot ico"></i>
          <h3>Lokasi</h3>
          <p class="addr">{{ w.address }}</p>
          <a class="map-link" target="_blank" :href="w.mapsUrl">Buka Map</a>
        </div>
      </div>
      <div class="countdown">
        <div class="cd-box"><b>{{ hari }}</b><span>hari</span></div>
        <div class="cd-box"><b>{{ jam }}</b><span>jam</span></div>
        <div class="cd-box"><b>{{ menit }}</b><span>menit</span></div>
        <div class="cd-box"><b>{{ detik }}</b><span>detik</span></div>
      </div>
    </section>

    <DividerFloral />

    <section class="surface block reveal" id="hadiah">
      <h2 class="heading">Love & Gift</h2>
      <p class="lede">Doa restu Anda adalah hadiah terindah. Jika berkenan memberi tanda kasih:</p>
      <div class="gifts">
        <div v-for="(gft, i) in w.gifts" :key="i" class="gift tilt" data-depth="0.15">
          <img class="bank" :src="gft.logo" :alt="gft.bank">
          <p><b>{{ gft.bank }}</b> · {{ gft.nama }}</p>
          <p class="norek">{{ gft.norek }}</p>
          <button class="copy" @click="salin($event, gft.norek)"><i class="fa-regular fa-copy"></i> Salin</button>
        </div>
      </div>
    </section>

    <DividerFloral />

    <Ucapan :wedding="w" />

    <section class="surface block reveal closing">
      <p class="big">Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
      <p class="sign">— {{ g.name }} &amp; {{ b.name }} —</p>
      <p class="made">Made with <span class="heart">♥</span> by <a href="https://github.com/ringga-dev/undangan" target="_blank">Ringga</a></p>
    </section>

    <MusicButton :src="w.music" />
    <OpeningModal :open="open" :wedding="w" @buka="onBuka" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from '#imports'
import Navbar from '~/components/Navbar.vue'
import DividerFloral from '~/components/dividers/DividerFloral.vue'
import Ucapan from '~/components/Ucapan.vue'
import MusicButton from '~/components/MusicButton.vue'
import OpeningModal from '~/components/OpeningModal.vue'
import { useAsset } from '~/composables/useAsset'
import { useAudio } from '~/composables/useAudio'
import { useCountdown } from '~/composables/useCountdown'
import { useThemeEngine } from '~/composables/useThemeEngine'
import { useInvitationOpen } from '~/composables/useInvitationOpen'

const props = defineProps<{ wedding: any }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover); const gP = useAsset(g.photo); const bP = useAsset(b.photo)
const illu = (n: string) => useAsset(`images/illu/${n}.png`)
const { hari, jam, menit, detik } = useCountdown(w.countdown)
const { opened, markOpened } = useInvitationOpen()
const open = ref(opened.value === false)
const route = useRoute()

const root = ref<HTMLElement | null>(null)
const petals = ref<HTMLCanvasElement | null>(null)
let raf = 0, ctx: CanvasRenderingContext2D | null = null, parts: any[] = []
const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }
const salin = async (e: Event, n: string) => {
  const btn = e.currentTarget as HTMLButtonElement
  try { await navigator.clipboard.writeText(n) } catch {}
  btn.textContent = 'Tersalin!'; setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Salin' }, 1500)
}

const initPetals = () => {
  if (!petals.value) return
  ctx = petals.value.getContext('2d')
  const resize = () => { if (petals.value) { petals.value.width = innerWidth; petals.value.height = innerHeight } }
  resize(); addEventListener('resize', resize)
  parts = Array.from({ length: 40 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 10 + 5, s: Math.random() * 0.6 + 0.2, rot: Math.random() * 6, rs: Math.random() * 0.02 + 0.005,
    hue: Math.random() > 0.5 ? 'rgba(255,183,197,0.7)' : 'rgba(255,140,160,0.6)'
  }))
  const loop = () => {
    if (!ctx || !petals.value) return
    ctx.clearRect(0, 0, petals.value.width, petals.value.height)
    parts.forEach(p => {
      p.y += p.s; p.x += Math.sin(p.y * 0.01) * 0.5; p.rot += p.rs; if (p.y > petals.value.height) { p.y = -20; p.x = Math.random() * petals.value.width }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.hue
      ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, 7); ctx.fill(); ctx.restore()
    })
    raf = requestAnimationFrame(loop)
  }
  loop()
}
const onMove = (e: MouseEvent) => {
  if (!root.value) return
  const rx = (e.clientY / innerHeight - 0.5) * -8, ry = (e.clientX / innerWidth - 0.5) * 8
  root.value.querySelectorAll<HTMLElement>('.tilt').forEach(el => gsap.to(el, { rotateX: rx * parseFloat(el.dataset.depth || '0.2'), rotateY: ry * parseFloat(el.dataset.depth || '0.2'), duration: 0.6 }))
}
const onScroll = () => root.value?.querySelectorAll<HTMLElement>('.tilt').forEach(el => gsap.to(el, { y: -scrollY * parseFloat(el.dataset.depth || '0.1'), duration: 0.3 }))

onMounted(() => {
  initPetals(); addEventListener('mousemove', onMove); addEventListener('scroll', onScroll, { passive: true })
  gsap.from('.card', { scale: 0.85, opacity: 0, y: 40, duration: 1.3, ease: 'power4.out' })
  const io = new IntersectionObserver((es) => es.forEach(en => { if (en.isIntersecting) { gsap.to(en.target, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }); io.unobserve(en.target) } }), { threshold: 0.15 })
  root.value?.querySelectorAll('.reveal').forEach(el => { (el as HTMLElement).style.opacity = '0'; (el as HTMLElement).style.transform = 'translateY(60px)'; io.observe(el) })
})
onUnmounted(() => { cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); removeEventListener('scroll', onScroll) })
</script>

<style scoped>
.style-floral { font-family: 'Playfair Display', Georgia, serif; background: var(--c-bg); color: var(--c-text); overflow-x: hidden; position: relative; }
.petals { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
.hero { min-height: 100vh; display: grid; place-items: center; perspective: 1200px; position: relative; z-index: 2; }
.blob { position: absolute; width: 60vw; height: 60vw; background: radial-gradient(circle, var(--c-accent), transparent 65%); filter: blur(60px); opacity: 0.5; animation: float 8s ease-in-out infinite; }
@keyframes float { 50% { transform: translateY(-30px) scale(1.1); } }
.card { position: relative; width: min(90vw, 480px); padding: 2.5rem; border-radius: 36px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,150,170,0.4); box-shadow: 0 30px 70px rgba(0,0,0,0.3); backdrop-filter: blur(10px); text-align: center; transform-style: preserve-3d; }
.eyebrow { letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.7rem; opacity: 0.7; }
.title { font-size: clamp(2rem, 7vw, 3.2rem); margin: 0.4rem 0 1rem; }
.amp { color: var(--c-accent); font-style: italic; }
.cropper { border-radius: 24px; overflow: hidden; margin: 1rem 0; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.cropper img { width: 100%; display: block; object-fit: cover; aspect-ratio: 4/3; }
.date { opacity: 0.85; }
.btn-save { display: inline-block; margin-top: 1rem; padding: 0.7rem 1.6rem; border-radius: 999px; background: var(--c-accent); color: #fff; text-decoration: none; transition: 0.3s; }
.btn-save:hover { box-shadow: 0 0 30px var(--c-accent); transform: translateY(-2px); }
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; color: var(--c-accent); }
.lede { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; opacity: 0.85; line-height: 1.7; }
.couple { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.person { text-align: center; }
.cropper.leaf { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; border: 3px solid var(--c-accent); width: 180px; aspect-ratio: 1; }
.cropper.leaf img { aspect-ratio: 1; }
.person h3 { margin: 1rem 0 0.2rem; font-size: 1.4rem; }
.role { color: var(--c-accent); font-style: italic; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.7rem; }
.parents { opacity: 0.7; font-size: 0.85rem; }
.amp-mark { font-size: 2.5rem; color: var(--c-accent); }
.grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
.info { padding: 1.8rem; border-radius: 24px; border: 1px solid rgba(255,150,170,0.3); background: rgba(255,255,255,0.05); text-align: center; }
.ico { font-size: 1.8rem; color: var(--c-accent); margin-bottom: 0.6rem; }
.info h3 { margin: 0.4rem 0; }
.addr { opacity: 0.75; font-size: 0.85rem; }
.map-link { color: var(--c-accent); font-size: 0.85rem; }
.countdown { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
.cd-box { background: rgba(255,150,170,0.12); border: 1px solid rgba(255,150,170,0.3); border-radius: 16px; padding: 1rem 1.4rem; text-align: center; min-width: 80px; }
.cd-box b { display: block; font-size: 1.8rem; color: var(--c-accent); }
.cd-box span { font-size: 0.7rem; opacity: 0.7; letter-spacing: 0.2em; text-transform: uppercase; }
.gifts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
.gift { padding: 1.6rem; border-radius: 20px; border: 1px solid rgba(255,150,170,0.3); background: rgba(255,255,255,0.05); text-align: center; }
.bank { height: 36px; margin-bottom: 0.8rem; }
.norek { font-family: monospace; letter-spacing: 0.1em; color: var(--c-accent); }
.copy { margin-top: 0.8rem; padding: 0.4rem 1rem; border-radius: 999px; border: 1px solid var(--c-accent); background: transparent; color: var(--c-accent); cursor: pointer; }
.closing { text-align: center; }
.big { font-size: 1.3rem; line-height: 1.8; max-width: 620px; margin: 0 auto 1.5rem; }
.sign { color: var(--c-accent); letter-spacing: 0.2em; }
.made { opacity: 0.6; font-size: 0.8rem; margin-top: 1rem; }
.heart { color: #e25555; }
.illu { position: absolute; width: 180px; pointer-events: none; z-index: 1; opacity: 0.85; }
.illu.float-a { top: 6%; right: 4%; animation: floaty 6s ease-in-out infinite; }
@keyframes floaty { 50% { transform: translateY(-18px) rotate(4deg); } }
@media (max-width: 520px) { .illu { width: 110px; } }
</style>
