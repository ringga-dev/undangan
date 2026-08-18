<template>
  <div class="style-elegant deck" ref="root">
    <canvas class="dust"></canvas>

    <main class="hero" id="home" data-slide>
      <p class="guest">[GUEST:{{ guest }}]</p>
      <div class="stage">
        <div class="card3d">
          <img class="illu corner tl" :src="illu('elegant')" alt="">
          <img class="illu corner br" :src="illu('elegant')" alt="">
          <div class="card-face">
            <div class="cropper"><img :src="cover" alt="cover"><div class="veil"></div></div>
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

    <DividerElegant />

    <section class="surface block reveal" id="mempelai" data-slide>
      <p class="greeting gold">{{ w.greeting || 'Assalamu\'alaikum Warahmatullahi Wabarakatuh' }}</p>
      <h2 class="heading gold">Mempelai</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
      <blockquote class="quote" v-if="w.quote">{{ w.quote }}</blockquote>
      <div class="couple">
        <figure class="person">
          <div class="cropper ring"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <span class="amp-mark shimmer">&amp;</span>
        <figure class="person">
          <div class="cropper ring"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerElegant />

    <!-- Love Story -->
    <section class="surface block reveal" id="story" v-if="w.story && w.story.length" data-slide>
      <h2 class="heading gold">Our Love Story</h2>
      <p class="lede">Perjalanan kami menuju hari bahagia.</p>
      <div class="timeline">
        <div class="tl-item tilt" data-depth="0.1" v-for="(s, i) in w.story" :key="i">
          <span class="tl-year">{{ s.date }}</span>
          <h3 class="tl-title">{{ s.title }}</h3>
          <p class="tl-text">{{ s.text }}</p>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="surface block reveal" id="gallery" v-if="w.gallery && w.gallery.length" data-slide>
      <h2 class="heading gold">Galeri</h2>
      <div class="gallery">
        <div class="g-item tilt" data-depth="0.12" v-for="(p, i) in w.gallery" :key="i">
          <img :src="useAsset(p)" :alt="''">
        </div>
      </div>
    </section>

    <DividerElegant />

    <section class="surface block reveal" id="waktu" data-slide>
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

    <section class="surface block reveal" id="hadiah" data-slide>
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

    <div data-slide>
      <Ucapan :wedding="w" />
    </div>

    <section class="surface block reveal closing" data-slide>
      <p class="closing-text gold">{{ w.closing || 'Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada hari bahagia kami.' }}</p>
      <p class="sign">— {{ g.name }} &amp; {{ b.name }} —</p>
      <p class="made">Made with <span class="heart">♥</span> by <a href="https://github.com/ringga-dev/undangan" target="_blank">Ringga</a></p>
    </section>

    <MusicButton :src="w.music" />
    <OpeningModal :open="open" :wedding="w" :guest="guest" @buka="onBuka" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from '#imports'
import DividerElegant from '~/components/dividers/DividerElegant.vue'
import Ucapan from '~/components/Ucapan.vue'
import MusicButton from '~/components/MusicButton.vue'
import OpeningModal from '~/components/OpeningModal.vue'
import { useAsset } from '~/composables/useAsset'
import { useAudio } from '~/composables/useAudio'
import { useCountdown } from '~/composables/useCountdown'
import { useThemeEngine } from '~/composables/useThemeEngine'
import { useReveal } from '~/composables/useReveal'
import { useDeck } from '~/composables/useDeck'
import DeckNav from '~/components/DeckNav.vue'

const props = defineProps<{ wedding: any }>()
const guest = ref('')
{
  const _s = typeof window !== 'undefined' ? window.location.search : ''
  const _m = _s.match(/[?&]to=(.*?)(?=&[a-zA-Z0-9_]+=|$)/)
  if (_m) guest.value = decodeURIComponent(_m[1]).replace(/\+/g, ' ')
  if (typeof document !== 'undefined') document.documentElement.setAttribute('data-guestdbg', JSON.stringify({ s: _s, m: _m ? _m[1] : null, val: guest.value }))
}
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
  const cardEl = document.querySelector('.card3d') as HTMLElement | null
  if (!cardEl) return
  const rx = (e.clientY / window.innerHeight - 0.5) * -12
  const ry = (e.clientX / window.innerWidth - 0.5) * 12
  gsap.to(cardEl, { rotateX: rx, rotateY: ry, duration: 0.6, ease: 'power2.out' })
}
// no scroll-parallax: deck navigation handles section movement

const deck = useDeck(() => root.value)

onMounted(() => {
  initDust()
  window.addEventListener('mousemove', onMove)
  // entrance
  gsap.from('.card3d', { scale: 0.8, opacity: 0, rotateY: 40, duration: 1.4, ease: 'power4.out' })
  gsap.from('.title', { y: 30, opacity: 0, duration: 1, delay: 0.5 })
  // scroll reveal (safe: never stuck invisible)
  useReveal(() => root.value)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
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
.closing-text { font-size: 1.15rem; line-height: 1.9; max-width: 640px; margin: 0 auto 1.5rem; }
.sign { color: var(--gold); letter-spacing: 0.2em; }
.made { opacity: 0.6; font-size: 0.8rem; margin-top: 1rem; }
.greeting { text-align: center; font-size: 1rem; letter-spacing: 0.08em; max-width: 560px; margin: 0 auto 1.5rem; line-height: 1.7; }
.quote { position: relative; z-index: 3; max-width: 620px; margin: 0 auto 2.5rem; padding: 1.4rem 1.8rem; border-left: 3px solid var(--gold); border-radius: 0 14px 14px 0; background: rgba(11,31,23,0.6); font-style: italic; font-size: 0.95rem; line-height: 1.8; opacity: 0.95; }
.timeline { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 1rem; }
.tl-item { padding: 1.6rem; border-radius: 18px; border: 1px solid rgba(212,175,55,0.25); background: rgba(255,255,255,0.03); text-align: center; }
.tl-year { display: inline-block; color: var(--gold); font-weight: 700; letter-spacing: 0.15em; margin-bottom: 0.5rem; }
.tl-title { font-size: 1.2rem; margin: 0.3rem 0; }
.tl-text { opacity: 0.8; font-size: 0.9rem; line-height: 1.7; }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
.g-item { border-radius: 16px; overflow: hidden; border: 1px solid rgba(212,175,55,0.25); aspect-ratio: 1; }
.g-item img { width: 100%; height: 100%; object-fit: cover; }
.dust { pointer-events: none; position: fixed; inset: 0; z-index: 5; opacity: 0.7; }
.illu { position: absolute; width: 120px; pointer-events: none; z-index: 1; opacity: 0.85; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
.illu.corner.tl { top: -10px; left: -10px; }
.illu.corner.br { bottom: -10px; right: -10px; transform: rotate(180deg); }
@media (max-width: 520px) { .illu { width: 70px; } }
</style>
