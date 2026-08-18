<template>
  <div class="style-rustic deck" ref="root">
    <img class="illu grain" :src="illu('rustic')" alt="">
    <main class="hero" id="home" ref="hero" data-slide>
      <div class="grid2 reveal">
        <figure class="photo" data-depth="0.15">
          <img :src="cover" alt="cover">
        </figure>
        <div class="text">
          <p class="eyebrow">The Wedding Of</p>
          <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <p class="date">{{ w.date }}</p>
          <a class="btn-save" target="_blank" :href="w.calendar">Simpan Waktu</a>
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
        <figure class="person tilt" data-depth="0.2">
          <div class="photo sm"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">{{ g.role }}</p>
          <p class="parents">{{ g.parents }}</p>
        </figure>
        <span class="amp-mark">&amp;</span>
        <figure class="person tilt" data-depth="0.2">
          <div class="sm"><img :src="bP" alt="bride"></div>
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
        <div class="cd-box"><b>{{ hari }}</b><span>hari</span></div>
        <div class="cd-box"><b>{{ jam }}</b><span>jam</span></div>
        <div class="cd-box"><b>{{ menit }}</b><span>menit</span></div>
        <div class="cd-box"><b>{{ detik }}</b><span>detik</span></div>
      </div>
      <div class="events">
        <div class="ticket" v-for="e in w.events"><h4>{{ e.name }}</h4><p>{{ e.time }}</p></div>
      </div>
      <p class="addr">{{ w.address }}</p>
      <a class="map-link" target="_blank" :href="w.maps">Buka Map</a>
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
          <button class="copy" @click="copy(gift.norek)"><i class="fa-regular fa-copy"></i> Salin</button>
        </div>
      </div>
    </section>
    <MusicButton :src="w.music" />
    <OpeningModal v-if="w && open" @buka="onBuka" :wedding="w" :guest="guest" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
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
import { useWeddings } from '~/composables/useWeddings'

const props = defineProps<{ wedding: any; guest?: string }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset((w as any)?.cover || ''); const gP = useAsset((g as any)?.photo || ''); const bP = useAsset((b as any)?.photo || '')
const illu = (n: string) => useAsset(`images/illu/${n}.png`)
const { hari, jam, menit, detik } = useCountdown(w.countdown)
const { opened, markOpened } = useInvitationOpen()
const open = ref(opened.value === false)
const root = ref<HTMLElement | null>(null)
const deck = useDeck(() => root.value)
const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }

const copy = (t: string) => navigator.clipboard?.writeText(t)
const useAudio = (m: string) => { try { return new Audio(useAsset(m)) } catch { return null } }

let ro: ResizeObserver | null = null
onMounted(() => {
  if (typeof window !== 'undefined') {
    gsap.from('.style-rustic .hero .grid2', { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out' })
    // Parallax tilt on [data-depth]
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2
      root.value?.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
        const d = parseFloat(el.dataset.depth || '0.1')
        gsap.to(el, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 0.6, ease: 'power2.out' })
      })
    }
    window.addEventListener('mousemove', onMove)
    onUnmounted(() => window.removeEventListener('mousemove', onMove))
  }
  useReveal(() => root.value)
})
</script>

<style scoped>
.style-rustic { background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0 10px, transparent 10px 20px); font-family: 'Lora', Georgia, serif; color: var(--c-text); overflow: hidden; position: relative; }
.illu.grain { position: fixed; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.08; mix-blend-mode: multiply; pointer-events: none; z-index: 0; }
.hero { padding: 8vh 1rem; position: relative; z-index: 1; }
.grid2 { border: 6px double var(--c-accent); border-radius: var(--radius); grid-template-columns: 1fr; gap: 1.5rem; max-width: 50rem; margin: 0 auto; padding: 1.5rem; display: grid; background: var(--c-surface); }
.photo { aspect-ratio: 4/5; border: 3px solid var(--c-primary); border-radius: var(--radius); width: 100%; overflow: hidden; }
.photo img { width: 100%; height: 100%; object-fit: cover; }
.text { text-align: center; display: flex; flex-direction: column; justify-content: center; }
.eyebrow { letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.75; font-size: 0.8rem; }
.title { font-family: var(--font-heading), serif; margin: 0.5rem 0; font-size: clamp(2rem,6vw,3rem); }
.amp { color: var(--c-accent); }
.date { opacity: 0.8; }
.btn-save { background: var(--c-primary); color: #fff; border-radius: var(--radius); margin-top: 1rem; padding: 0.6rem 1.4rem; text-decoration: none; display: inline-block; }
.block { text-align: center; max-width: 46rem; margin: 0 auto; padding: 6vh 1rem; position: relative; z-index: 1; }
.heading { font-family: var(--font-heading), serif; text-decoration: underline wavy var(--c-accent); text-underline-offset: 6px; margin-bottom: 1.2rem; font-size: clamp(2rem,5vw,3rem); }
.greeting { font-size: 1rem; letter-spacing: 0.08em; max-width: 32rem; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--c-primary); }
.quote { max-width: 34rem; margin: 0 auto 2rem; padding: 1.4rem 1.8rem; border-left: 3px solid var(--c-accent); border-radius: 0 14px 14px 0; background: color-mix(in srgb, var(--c-primary) 6%, transparent); font-style: italic; font-size: 0.95rem; line-height: 1.8; opacity: 0.9; }
.lede { opacity: 0.9; max-width: 32rem; margin: 0 auto 1.5rem; }
.couple { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.couple figure { margin: 0; }
.sm { aspect-ratio: 1; border: 3px solid var(--c-primary); border-radius: var(--radius); width: 12rem; overflow: hidden; }
.sm img { width: 100%; height: 100%; object-fit: cover; }
.role { text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.75; font-size: 0.75rem; }
.parents { opacity: 0.85; font-size: 0.9rem; }
.amp-mark { color: var(--c-accent); font-size: 2.5rem; }
.countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.countdown b { font-family: var(--font-heading), serif; font-size: 2.2rem; display: block; }
.events { display: flex; flex-direction: column; gap: 0.75rem; max-width: 22rem; margin: 1rem auto; }
.ticket { border: 2px dashed var(--c-accent); border-radius: var(--radius); padding: 0.75rem; }
.ticket h4 { font-family: var(--font-heading), serif; margin: 0; }
.addr { opacity: 0.8; margin-top: 1rem; font-size: 0.85rem; }
.gifts { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
.gift { background: var(--c-surface); border-radius: var(--radius); border: 3px solid var(--c-primary); width: 16rem; padding: 1.5rem; }
.gift img { height: auto; max-width: 130px; }
.copy { background: var(--c-primary); color: #fff; cursor: pointer; border: none; border-radius: var(--radius); margin-top: 0.5rem; padding: 0.4rem 1rem; }
@media (min-width: 768px) { .grid2 { grid-template-columns: 1fr 1fr; } .couple { flex-direction: row; justify-content: center; gap: 3rem; } }
</style>
