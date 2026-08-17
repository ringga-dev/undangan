<template>
  <div class="style-elegant" ref="root">
    <Navbar />
    <!-- Gold dust canvas -->
    <canvas class="dust"></canvas>

    <main class="hero" id="home">
      <div class="stage">
        <img class="illu corner tl" :src="illu('elegant')" alt="">
        <img class="illu corner br" :src="illu('elegant')" alt="">
        <div class="card3d">
          <div class="card-face">
            <div class="cropper"><img :src="cover" alt="cover"></div>
            <div class="veil"></div>
            <p class="eyebrow">The Wedding Of</p>
            <h1 class="title shimmer">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
            <p class="date">{{ w.dateText }}</p>
            <a class="btn-save" target="_blank" :href="w.calendarUrl">
              <i class="fa-solid fa-calendar-check"></i> Simpan Waktu
            </a>
          </div>
        </div>
        <div class="glow"></div>
      </div>
    </main>

    <DividerElegant />

    <section class="surface block reveal" id="mempelai">
      <h2 class="heading gold">Assalamualaikum</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
      <div class="couple">
        <figure class="person tilt" data-depth="0.2">
          <div class="cropper ring"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <span class="amp-mark shimmer">&amp;</span>
        <figure class="person tilt" data-depth="0.2">
          <div class="cropper ring"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerElegant />

    <section class="surface block reveal" id="waktu">
      <h2 class="heading gold">Waktu & Tempat</h2>
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

    <DividerElegant />

    <section class="surface block reveal" id="hadiah">
      <h2 class="heading gold">Love & Gift</h2>
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

    <DividerElegant />

    <Ucapan :wedding="w" />

    <section class="surface block reveal closing">
      <p class="gold big">Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
      <p class="sign">— {{ g.name }} &amp; {{ b.name }} —</p>
      <p class="made">Made with <span class="heart">♥</span> by <a href="https://github.com/ringga-dev/undangan" target="_blank">Ringga</a></p>
    </section>

    <MusicButton :src="w.music" />
    <OpeningModal :open="open" :wedding="w" @buka="onBuka" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from '#imports'
import Navbar from '~/components/Navbar.vue'
import DividerElegant from '~/components/dividers/DividerElegant.vue'
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
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let particles: any[] = []

const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }
const salin = async (e: Event, n: string) => {
  const btn = e.currentTarget as HTMLButtonElement
  try { await navigator.clipboard.writeText(n) } catch {}
  btn.textContent = 'Tersalin!'
  setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Salin' }, 1500)
}

const initDust = () => {
  const cv = document.querySelector('.dust') as HTMLCanvasElement | null
  if (!cv) return
  ctx = cv.getContext('2d')
  const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight }
  resize(); window.addEventListener('resize', resize)
  const c = cv
  particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.4 + 0.1, o: Math.random() * 0.5 + 0.2
  }))
  const loop = () => {
    if (!ctx || !c) return
    ctx.clearRect(0, 0, c.width, c.height)
    particles.forEach(p => {
      p.y -= p.s; if (p.y < 0) p.y = c.height
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7)
      ctx.fillStyle = `rgba(212,175,55,${p.o})`; ctx.fill()
    })
    raf = requestAnimationFrame(loop)
  }
  loop()
}

const onMove = (e: MouseEvent) => {
  if (!card.value || !stage.value) return
  const rx = (e.clientY / window.innerHeight - 0.5) * -12
  const ry = (e.clientX / window.innerWidth - 0.5) * 12
  gsap.to(card.value, { rotateX: rx, rotateY: ry, duration: 0.6, ease: 'power2.out' })
}
const onScroll = () => {
  const y = window.scrollY
  if (card.value) gsap.to(card.value, { y: y * 0.15, rotateX: -y * 0.01, duration: 0.4 })
  // parallax tilt figures
  root.value?.querySelectorAll<HTMLElement>('.tilt').forEach(el => {
    const d = parseFloat(el.dataset.depth || '0.1')
    gsap.to(el, { y: -window.scrollY * d, duration: 0.3 })
  })
}

const revealAll = () => {
  root.value?.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, delay: i * 0.05, ease: 'power3.out',
      scrollTrigger: undefined
    })
  })
}

onMounted(() => {
  initDust()
  window.addEventListener('mousemove', onMove)
  window.addEventListener('scroll', onScroll, { passive: true })
  // entrance
  gsap.from(card.value, { scale: 0.8, opacity: 0, rotateY: 40, duration: 1.4, ease: 'power4.out' })
  gsap.from('.title', { y: 30, opacity: 0, duration: 1, delay: 0.5 })
  // simple reveal via IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { gsap.to(en.target, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }); io.unobserve(en.target) } })
  }, { threshold: 0.15 })
  root.value?.querySelectorAll('.reveal').forEach(el => { (el as HTMLElement).style.opacity = '0'; (el as HTMLElement).style.transform = 'translateY(60px)'; io.observe(el) })
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.style-elegant {
  --gold: #d4af37;
  font-family: 'Cormorant Garamond', Georgia, serif;
  background: radial-gradient(circle at 50% 0%, #14271f, var(--c-bg));
  color: var(--c-text);
  overflow-x: hidden;
  position: relative;
}
.dust { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.6; }
.hero { min-height: 100vh; display: grid; place-items: center; perspective: 1400px; position: relative; z-index: 2; }
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
.card-face { transform: translateZ(40px); }
.cropper { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
.cropper img { width: 100%; display: block; object-fit: cover; aspect-ratio: 4/5; }
.veil { position: absolute; inset: 0; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.3)); border-radius: 28px; }
.eyebrow { letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.75rem; color: var(--gold); margin-top: 1.2rem; }
.title { font-size: clamp(2.2rem, 7vw, 3.6rem); font-weight: 700; margin: 0.4rem 0; line-height: 1.05; }
.amp { color: var(--gold); font-style: italic; }
.date { opacity: 0.85; letter-spacing: 0.1em; }
.btn-save { display: inline-block; margin-top: 1.2rem; padding: 0.7rem 1.6rem; border-radius: 999px; border: 1px solid var(--gold); color: var(--gold); text-decoration: none; transition: 0.3s; }
.btn-save:hover { background: var(--gold); color: #111; box-shadow: 0 0 30px rgba(212,175,55,0.5); }
.glow { position: absolute; inset: -20%; background: radial-gradient(circle, rgba(212,175,55,0.18), transparent 60%); filter: blur(40px); z-index: -1; }
.shimmer {
  background: linear-gradient(90deg, #b8860b, #ffe9a8, #d4af37, #ffe9a8, #b8860b);
  background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: shimmer 4s linear infinite;
}
@keyframes shimmer { to { background-position: 200% center; } }
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; }
.gold { color: var(--gold); text-shadow: 0 2px 20px rgba(212,175,55,0.3); }
.lede { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; opacity: 0.85; line-height: 1.7; }
.couple { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.person { text-align: center; }
.cropper.ring { border: 3px solid var(--gold); border-radius: 50%; width: 180px; aspect-ratio: 1; }
.cropper.ring img { aspect-ratio: 1; }
.person h3 { margin: 1rem 0 0.2rem; font-size: 1.4rem; }
.role { color: var(--gold); font-style: italic; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.7rem; }
.parents { opacity: 0.7; font-size: 0.85rem; margin-top: 0.4rem; }
.amp-mark { font-size: 2.5rem; color: var(--gold); }
.grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
.info { padding: 1.8rem; border-radius: 20px; border: 1px solid rgba(212,175,55,0.25); background: rgba(255,255,255,0.03); text-align: center; }
.ico { font-size: 1.8rem; color: var(--gold); margin-bottom: 0.6rem; }
.info h3 { margin: 0.4rem 0; }
.addr { opacity: 0.75; font-size: 0.85rem; }
.map-link { color: var(--gold); font-size: 0.85rem; }
.countdown { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
.cd-box { background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 1rem 1.4rem; text-align: center; min-width: 80px; }
.cd-box b { display: block; font-size: 1.8rem; color: var(--gold); }
.cd-box span { font-size: 0.7rem; opacity: 0.7; letter-spacing: 0.2em; text-transform: uppercase; }
.gifts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
.gift { padding: 1.6rem; border-radius: 18px; border: 1px solid rgba(212,175,55,0.25); background: rgba(255,255,255,0.03); text-align: center; }
.bank { height: 36px; margin-bottom: 0.8rem; }
.norek { font-family: monospace; letter-spacing: 0.1em; color: var(--gold); }
.copy { margin-top: 0.8rem; padding: 0.4rem 1rem; border-radius: 999px; border: 1px solid var(--gold); background: transparent; color: var(--gold); cursor: pointer; }
.closing { text-align: center; }
.big { font-size: 1.3rem; line-height: 1.8; max-width: 620px; margin: 0 auto 1.5rem; }
.sign { color: var(--gold); letter-spacing: 0.2em; }
.made { opacity: 0.6; font-size: 0.8rem; margin-top: 1rem; }
.dust { pointer-events: none; position: fixed; inset: 0; z-index: 5; opacity: 0.7; }
.illu { position: absolute; width: 120px; pointer-events: none; z-index: 4; opacity: 0.9; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
.illu.corner.tl { top: 8px; left: 8px; }
.illu.corner.br { bottom: 8px; right: 8px; transform: rotate(180deg); }
@media (max-width: 520px) { .illu { width: 80px; } }
</style>
