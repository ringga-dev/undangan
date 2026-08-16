<template>
  <div class="style-modern">
    <Navbar />
    <main class="hero" id="home">
      <div class="split">
        <div class="photo"><img :src="cover" alt="cover"></div>
        <div class="text">
          <span class="bar"></span>
          <p class="eyebrow">THE WEDDING OF</p>
          <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <p class="date">{{ w.dateText }}</p>
          <a class="btn-save" target="_blank" :href="w.calendarUrl">SIMPAN WAKTU</a>
        </div>
      </div>
    </main>

    <DividerModern />

    <section class="surface block" id="mempelai">
      <h2 class="heading">ASSALAMUALAIKUM</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
      <div class="couple">
        <figure data-aos="fade-up">
          <div class="photo sm"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">PUTRA</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <figure data-aos="fade-up">
          <div class="photo sm"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">PUTRI</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerModern />
    <QuoteLine />
    <DividerModern />

    <section class="surface block" id="tanggal">
      <h2 class="heading">WAKTU MENUJU ACARA</h2>
      <div class="countdown">
        <div><b>{{ hari }}</b><small>HARI</small></div>
        <div><b>{{ jam }}</b><small>JAM</small></div>
        <div><b>{{ menit }}</b><small>MENIT</small></div>
        <div><b>{{ detik }}</b><small>DETIK</small></div>
      </div>
      <div class="events">
        <div class="box"><h4>AKAD</h4><p>{{ w.akad }}</p></div>
        <div class="box"><h4>RESEPSI</h4><p>{{ w.resepsi }}</p></div>
      </div>
      <a :href="w.mapsUrl" target="_blank" class="btn-save">LIHAT GOOGLE MAPS</a>
      <p class="addr">{{ w.address }}</p>
    </section>

    <DividerModern />

    <section class="block" id="gift">
      <h2 class="heading">LOVE GIFT</h2>
      <div class="gifts">
        <div v-for="gift in w.gifts" :key="gift.bank" class="gift" data-aos="fade-up">
          <img :src="gift.logo" :alt="gift.bank">
          <p>No. Rekening {{ gift.norek }}</p><p>{{ gift.nama }}</p>
          <button class="copy" :data-nomer="gift.norek" @click="salin($event, gift.norek)">SALIN</button>
        </div>
      </div>
    </section>

    <Ucapan :wedding="w" id="ucapan" />
    <DividerModern />
    <Closing />
    <MusicButton v-if="!open" />
    <OpeningModal v-model="open" :wedding="w" @open="onBuka" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead, useRoute } from '#imports'
import Navbar from '~/components/Navbar.vue'
import Ucapan from '~/components/Ucapan.vue'
import Closing from '~/components/Closing.vue'
import MusicButton from '~/components/MusicButton.vue'
import OpeningModal from '~/components/OpeningModal.vue'
import DividerModern from '~/components/dividers/DividerModern.vue'
import QuoteLine from '~/components/QuoteLine.vue'
import { useAsset } from '~/composables/useAsset'
import { useAudio } from '~/composables/useAudio'
import { useCountdown } from '~/composables/useCountdown'
import type { WeddingProfile } from '~/composables/useWeddings'

const props = defineProps<{ wedding: WeddingProfile; couple?: string; styleId?: string }>()
const w = props.wedding
const g = w.groom; const b = w.bride
const cover = useAsset(w.cover); const gP = useAsset(g.photo); const bP = useAsset(b.photo)
const open = ref(true)
const { hari, jam, menit, detik } = useCountdown(w.countdown)
const { cssVars } = useThemeEngine()
const route = useRoute()
useHead({ style: [{ innerHTML: cssVars((route.params.style as string) || 'modern', 'cyan') }] })
onMounted(() => initAOS())
const onBuka = () => { open.value = false; useAudio(w.music)?.play().catch(() => {}) }
const salin = async (e: Event, n: string) => {
  const btn = e.currentTarget as HTMLButtonElement
  try { await navigator.clipboard.writeText(n) } catch {}
  const old = btn.innerHTML; btn.innerHTML = 'Tersalin'; btn.disabled = true
  setTimeout(() => { btn.innerHTML = old; btn.disabled = false }, 1500)
}
function initAOS() { /* @ts-expect-error */ if (typeof window !== 'undefined' && window.AOS) window.AOS.init(); else document.documentElement.classList.add('aos-fallback') }
</script>

<style scoped>
.style-modern .hero { padding: 0; }
.style-modern .split { display: grid; grid-template-columns: 1fr; min-height: 100vh; }
.style-modern .photo { width: 100%; height: 45vh; overflow: hidden; }
.style-modern .photo img { width: 100%; height: 100%; object-fit: cover; }
.style-modern .text { padding: 6vh 1.5rem; display: flex; flex-direction: column; justify-content: center; position: relative; }
.style-modern .bar { width: 60px; height: 6px; background: var(--c-accent); margin-bottom: 1.5rem; }
.style-modern .eyebrow { letter-spacing: .4em; font-size: .7rem; opacity: .7; }
.style-modern .title { font-family: var(--font-heading), sans-serif; font-size: clamp(2.2rem, 7vw, 3.6rem); font-weight: 700; text-transform: uppercase; letter-spacing: -.02em; line-height: 1; margin: .5rem 0; }
.style-modern .amp { color: var(--c-accent); }
.style-modern .date { opacity: .8; letter-spacing: .05em; }
.style-modern .btn-save { display: inline-block; margin-top: 1.2rem; padding: .7rem 1.6rem; background: var(--c-primary); color: #fff; text-decoration: none; font-weight: 700; letter-spacing: .1em; width: fit-content; }
.style-modern .block { padding: 6vh 1rem; max-width: 46rem; margin: 0 auto; text-align: center; }
.style-modern .heading { font-family: var(--font-heading), sans-serif; font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 700; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 1.2rem; }
.style-modern .lede { max-width: 32rem; margin: 0 auto 1.5rem; opacity: .9; }
.style-modern .couple { display: flex; flex-direction: column; gap: 2rem; }
.style-modern .couple figure { margin: 0; border-left: 4px solid var(--c-accent); padding-left: 1.2rem; text-align: left; }
.style-modern .photo.sm { width: 11rem; aspect-ratio: 1; border-radius: 0; border: none; }
.style-modern .photo.sm img { border-radius: 0; }
.style-modern .role { letter-spacing: .2em; font-size: .7rem; opacity: .75; }
.style-modern .parents { font-size: .9rem; opacity: .85; }
.style-modern .countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.style-modern .countdown b { font-family: var(--font-heading), sans-serif; font-size: 2.6rem; font-weight: 700; display: block; }
.style-modern .countdown small { opacity: .5; letter-spacing: .1em; }
.style-modern .events { display: flex; flex-direction: column; gap: .75rem; margin: 1rem auto; max-width: 24rem; }
.style-modern .box { border: 1px solid var(--c-accent); padding: .75rem; }
.style-modern .box h4 { font-weight: 700; letter-spacing: .08em; margin: 0; }
.style-modern .addr { font-size: .85rem; opacity: .8; margin-top: 1rem; }
.style-modern .gifts { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.style-modern .gift { background: var(--c-surface); padding: 1.5rem; width: 16rem; border-radius: 0; }
.style-modern .gift img { max-width: 130px; }
.style-modern .copy { margin-top: .5rem; padding: .4rem 1rem; border: none; background: var(--c-primary); color: #fff; cursor: pointer; font-weight: 700; letter-spacing: .1em; }
@media (min-width: 768px) { .style-modern .split { grid-template-columns: 1fr 1fr; } .style-modern .photo { height: 100vh; } .style-modern .couple { flex-direction: row; justify-content: center; gap: 3rem; } }
</style>
