<template>
  <div class="style-minimal">
    <Navbar />
    <main class="hero" id="home">
      <div class="wide"><img :src="cover" alt="cover"></div>
      <div class="intro">
        <p class="eyebrow">THE WEDDING OF</p>
        <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
        <p class="date">{{ w.dateText }}</p>
        <a class="link" target="_blank" :href="w.calendarUrl">Simpan Waktu →</a>
      </div>
    </main>

    <DividerMinimal />

    <section class="surface block" id="mempelai">
      <h2>Assalamualaikum</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
      <div class="couple">
        <figure data-aos="fade-up">
          <div class="square"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">{{ g.parents }}</p>
        </figure>
        <figure data-aos="fade-up">
          <div class="square"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerMinimal />
    <QuoteLine />
    <DividerMinimal />

    <section class="surface block" id="tanggal">
      <h2>WAKTU MENUJU ACARA</h2>
      <div class="countdown">
        <div><b>{{ hari }}</b><small>HARI</small></div>
        <div><b>{{ jam }}</b><small>JAM</small></div>
        <div><b>{{ menit }}</b><small>MENIT</small></div>
        <div><b>{{ detik }}</b><small>DETIK</small></div>
      </div>
      <div class="events">
        <div><h4>AKAD</h4><p>{{ w.akad }}</p></div>
        <div><h4>RESEPSI</h4><p>{{ w.resepsi }}</p></div>
      </div>
      <a :href="w.mapsUrl" target="_blank" class="link">Lihat Google Maps →</a>
      <p class="addr">{{ w.address }}</p>
    </section>

    <DividerMinimal />

    <section class="block" id="gift">
      <h2>LOVE GIFT</h2>
      <div class="gifts">
        <div v-for="gift in w.gifts" :key="gift.bank" class="gift" data-aos="fade-up">
          <img :src="gift.logo" :alt="gift.bank">
          <p>No. Rekening {{ gift.norek }}</p><p>{{ gift.nama }}</p>
          <button class="copy" :data-nomer="gift.norek" @click="salin($event, gift.norek)">Salin</button>
        </div>
      </div>
    </section>

    <Ucapan :wedding="w" id="ucapan" />
    <DividerMinimal />
    <Closing />
    <MusicButton v-if="!open" />
    <OpeningModal v-model="open" :wedding="w" @open="onBuka" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Ucapan from '~/components/Ucapan.vue'
import Closing from '~/components/Closing.vue'
import MusicButton from '~/components/MusicButton.vue'
import OpeningModal from '~/components/OpeningModal.vue'
import DividerMinimal from '~/components/dividers/DividerMinimal.vue'
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
.style-minimal .hero { padding: 0; }
.style-minimal .wide { width: 100%; height: 60vh; overflow: hidden; }
.style-minimal .wide img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(.15); }
.style-minimal .intro { text-align: center; padding: 8vh 1rem; }
.style-minimal .eyebrow { letter-spacing: .5em; font-size: .7rem; opacity: .6; }
.style-minimal .title { font-size: clamp(2rem, 6vw, 3.6rem); font-weight: 700; letter-spacing: -.03em; margin: 1rem 0; }
.style-minimal .amp { color: var(--c-accent); }
.style-minimal .date { opacity: .7; }
.style-minimal .link { color: var(--c-primary); text-decoration: none; font-weight: 600; }
.style-minimal .block { padding: 6vh 1rem; max-width: 44rem; margin: 0 auto; text-align: center; }
.style-minimal h2 { font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 700; letter-spacing: -.02em; margin-bottom: 1.2rem; }
.style-minimal .lede { max-width: 32rem; margin: 0 auto 1.5rem; opacity: .85; }
.style-minimal .couple { display: flex; flex-direction: column; gap: 2rem; }
.style-minimal .couple figure { margin: 0; }
.style-minimal .square { width: 100%; max-width: 20rem; aspect-ratio: 1; margin: 0 auto 1rem; overflow: hidden; border-radius: 0; }
.style-minimal .square img { width: 100%; height: 100%; object-fit: cover; }
.style-minimal .role { font-size: .85rem; opacity: .7; }
.style-minimal .countdown { display: flex; justify-content: center; gap: 2.5rem; margin: 1.5rem 0; }
.style-minimal .countdown b { font-size: 2.4rem; font-weight: 700; display: block; }
.style-minimal .countdown small { opacity: .5; letter-spacing: .15em; }
.style-minimal .events { display: flex; flex-direction: column; gap: .25rem; margin: 1rem auto; max-width: 24rem; }
.style-minimal .events h4 { font-weight: 700; letter-spacing: .1em; margin: 0; }
.style-minimal .addr { font-size: .85rem; opacity: .75; margin-top: 1rem; }
.style-minimal .gifts { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.style-minimal .gift { background: var(--c-surface); padding: 1.5rem; width: 16rem; }
.style-minimal .gift img { max-width: 130px; }
.style-minimal .copy { margin-top: .5rem; padding: .4rem 1rem; border: 1px solid var(--c-text); background: transparent; color: var(--c-text); cursor: pointer; }
@media (min-width: 768px) { .style-minimal .couple { flex-direction: row; justify-content: center; gap: 4rem; } }
</style>
