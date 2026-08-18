<template>
  <div class="style-minimal deck" ref="root">
    <main class="hero" id="home" ref="hero" data-slide>
      <p class="guest" v-if="guest">Untuk {{ guest }}</p>
      <div class="photo-full" ref="photo">
        <img :src="cover" alt="cover">
        <div class="overlay"></div>
      <img class="illu" :src="illu('minimal')" alt="">
      </div>
      <div class="hero-text">
        <p class="eyebrow kinetic" ref="eyebrow">THE WEDDING OF</p>
        <h1 class="title" ref="title">{{ g.name }}<br><span class="amp">&amp;</span> {{ b.name }}</h1>
        <p class="date">{{ w.dateText }}</p>
        <a class="btn-save magnetic" target="_blank" :href="w.calendarUrl"><i class="fa-solid fa-calendar-check"></i> Simpan Waktu</a>
      </div>
    </main>

    <section class="surface block reveal" id="mempelai" data-slide>
      <p class="greeting">{{ w.greeting || 'Assalamu\'alaikum Warahmatullahi Wabarakatuh' }}</p>
      <h2 class="heading">Mempelai</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
      <blockquote class="quote" v-if="w.quote">{{ w.quote }}</blockquote>
      <div class="couple">
        <figure class="person tilt" data-depth="0.15">
          <div class="cropper"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <figure class="person tilt" data-depth="0.15">
          <div class="cropper"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <div data-slide>
      <RichSections :wedding="w" story-title="Our Love Story" gallery-title="Galeri" />
    </div>

    <section class="surface block reveal" id="waktu" data-slide>
      <h2 class="heading">Waktu & Tempat</h2>
      <div class="grid2">
        <div class="info tilt" data-depth="0.1"><i class="fa-regular fa-clock ico"></i><h3>Akad & Resepsi</h3><p>{{ w.akad }}</p><p>{{ w.resepsi }}</p></div>
        <div class="info tilt" data-depth="0.1"><i class="fa-solid fa-location-dot ico"></i><h3>Lokasi</h3><p class="addr">{{ w.address }}</p><a class="map-link" target="_blank" :href="w.mapsUrl">Buka Map</a></div>
      </div>
      <div class="countdown">
        <div class="cd-box"><b>{{ hari }}</b><span>hari</span></div>
        <div class="cd-box"><b>{{ jam }}</b><span>jam</span></div>
        <div class="cd-box"><b>{{ menit }}</b><span>menit</span></div>
        <div class="cd-box"><b>{{ detik }}</b><span>detik</span></div>
      </div>
    </section>

    <section class="surface block reveal" id="hadiah" data-slide>
      <h2 class="heading">Love & Gift</h2>
      <p class="lede">Doa restu Anda adalah hadiah terindah.</p>
      <div class="gifts">
        <div v-for="(gft, i) in w.gifts" :key="i" class="gift tilt" data-depth="0.12">
          <img class="bank" :src="gft.logo" :alt="gft.bank"><p><b>{{ gft.bank }}</b> · {{ gft.nama }}</p><p class="norek">{{ gft.norek }}</p>
          <button class="copy magnetic" @click="salin($event, gft.norek)"><i class="fa-regular fa-copy"></i> Salin</button>
        </div>
      </div>
    </section>

    <div data-slide>
      <Ucapan :wedding="w" />
    </div>

    <MusicButton :src="w.music" />
    <OpeningModal :open="open" :wedding="w" :guest="guest" @buka="onBuka" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from '#imports'
import RichSections from '~/components/RichSections.vue'
import { useGuest } from '~/composables/useGuest'
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
const guest = useGuest()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover); const gP = useAsset(g.photo); const bP = useAsset(b.photo)
const illu = (n: string) => useAsset(`images/illu/${n}.png`)
const { hari, jam, menit, detik } = useCountdown(w.countdown)
const { opened, markOpened } = useInvitationOpen()
const open = ref(opened.value === false)
const route = useRoute()
const root = ref<HTMLElement | null>(null)
const photo = ref<HTMLElement | null>(null)
const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }
const salin = async (e: Event, n: string) => { const btn = e.currentTarget as HTMLButtonElement; try { await navigator.clipboard.writeText(n) } catch {}; btn.textContent = 'Tersalin!'; setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Salin' }, 1500) }

const onScroll = () => { /* deck navigation handles movement */ }
const deck = useDeck(() => root.value)
const magnetic = (e: MouseEvent) => { const t = e.currentTarget as HTMLElement; const r = t.getBoundingClientRect(); gsap.to(t, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 }) }
const magneticOut = (e: MouseEvent) => gsap.to(e.currentTarget as HTMLElement, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' })

onMounted(() => {
  gsap.from('.hero-text > *', { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
  gsap.to('.kinetic', { letterSpacing: '0.6em', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  root.value?.querySelectorAll<HTMLElement>('.magnetic').forEach(el => { el.addEventListener('mousemove', magnetic); el.addEventListener('mouseleave', magneticOut) })
  useReveal(() => root.value)
})
onUnmounted(() => { removeEventListener('scroll', onScroll) })
</script>

<style scoped>
.style-minimal { font-family: 'Inter', system-ui, sans-serif; background: var(--c-bg); color: var(--c-text); overflow: hidden; }
.hero { position: relative; min-height: 100vh; display: grid; place-items: center; overflow: hidden; }
.photo-full { position: absolute; inset: -10%; z-index: 0; }
.illu { position: absolute; width: 220px; right: 5%; bottom: 8%; opacity: 0.4; pointer-events: none; z-index: 2; }
@media (max-width: 520px) { .illu { width: 130px; } }
.overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7)); }
.hero-text { position: relative; z-index: 2; text-align: center; color: #fff; padding: 1rem; }
.eyebrow { letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.7rem; opacity: 0.8; }
.title { font-size: clamp(2.4rem, 9vw, 5rem); font-weight: 800; line-height: 1; margin: 0.6rem 0; letter-spacing: -0.02em; }
.amp { font-weight: 300; color: var(--c-accent); }
.date { opacity: 0.85; letter-spacing: 0.1em; }
.btn-save { display: inline-block; margin-top: 1.5rem; padding: 0.8rem 2rem; border-radius: 999px; background: #fff; color: #000; text-decoration: none; font-weight: 600; transition: 0.3s; }
.btn-save:hover { background: var(--c-accent); color: #fff; }
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
.grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
.info { padding: 1.8rem; border-radius: 4px; border: 1px solid rgba(128,128,128,0.25); text-align: center; }
.ico { font-size: 1.8rem; opacity: 0.6; margin-bottom: 0.6rem; }
.info h3 { margin: 0.4rem 0; }
.addr { opacity: 0.6; font-size: 0.85rem; }
.map-link { color: var(--c-accent); font-size: 0.85rem; }
.countdown { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
.cd-box { border: 1px solid rgba(128,128,128,0.3); border-radius: 4px; padding: 1rem 1.4rem; text-align: center; min-width: 80px; }
.cd-box b { display: block; font-size: 1.8rem; }
.cd-box span { font-size: 0.7rem; opacity: 0.5; letter-spacing: 0.2em; text-transform: uppercase; }
.gifts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
.gift { padding: 1.6rem; border-radius: 4px; border: 1px solid rgba(128,128,128,0.25); text-align: center; }
.bank { height: 36px; margin-bottom: 0.8rem; filter: grayscale(1); }
.norek { font-family: monospace; letter-spacing: 0.1em; }
.copy { margin-top: 0.8rem; padding: 0.4rem 1rem; border-radius: 999px; border: 1px solid var(--c-text); background: transparent; color: var(--c-text); cursor: pointer; }
.closing { text-align: center; }
.big { font-size: 1.3rem; line-height: 1.8; max-width: 620px; margin: 0 auto 1.5rem; }
.sign { letter-spacing: 0.2em; }
.made { opacity: 0.5; font-size: 0.8rem; margin-top: 1rem; }
.heart { color: #e25555; }
</style>
