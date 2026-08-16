<template>
  <div class="style-elegant">
    <Navbar />
    <main class="hero" id="home">
      <div class="frame">
        <div class="cropper"><img :src="cover" alt="cover"></div>
        <p class="eyebrow">The Wedding Of</p>
        <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
        <p class="date">{{ w.dateText }}</p>
        <a class="btn-save" target="_blank" :href="w.calendarUrl">
          <i class="fa-solid fa-calendar-check"></i> Simpan Waktu
        </a>
      </div>
    </main>

    <DividerElegant />

    <section class="surface block" id="mempelai">
      <h2 class="heading">Assalamualaikum</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
      <div class="couple">
        <figure data-aos="fade-up">
          <div class="cropper"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <span class="amp-mark">&amp;</span>
        <figure data-aos="fade-up">
          <div class="cropper"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerElegant />
    <QuoteLine />
    <DividerElegant />

    <section class="surface block" id="tanggal">
      <h2 class="heading">Waktu Menuju Acara</h2>
      <div class="countdown">
        <div><b>{{ hari }}</b><small>Hari</small></div>
        <div><b>{{ jam }}</b><small>Jam</small></div>
        <div><b>{{ menit }}</b><small>Menit</small></div>
        <div><b>{{ detik }}</b><small>Detik</small></div>
      </div>
      <p class="lede">Dengan memohon rahmat Allah, kami selenggarakan:</p>
      <div class="events">
        <div><h4>Akad</h4><p>{{ w.akad }}</p></div>
        <div><h4>Resepsi</h4><p>{{ w.resepsi }}</p></div>
      </div>
      <a :href="w.mapsUrl" target="_blank" class="btn-save"><i class="fa-solid fa-map-location-dot"></i> Lihat Google Maps</a>
      <p class="addr">{{ w.address }}</p>
    </section>

    <DividerElegant />

    <section class="block" id="gift">
      <h2 class="heading">Love Gift</h2>
      <p class="lede">Tanda kasih dapat melalui:</p>
      <div class="gifts">
        <div v-for="gift in w.gifts" :key="gift.bank" class="gift" data-aos="fade-up">
          <img :src="gift.logo" :alt="gift.bank">
          <p>No. Rekening {{ gift.norek }}</p><p>{{ gift.nama }}</p>
          <button class="copy" :data-nomer="gift.norek" @click="salin($event, gift.norek)">Salin</button>
        </div>
      </div>
    </section>

    <Ucapan :wedding="w" id="ucapan" />
    <DividerElegant />
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
import DividerElegant from '~/components/dividers/DividerElegant.vue'
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
.style-elegant .hero { min-height: 100vh; display: grid; place-items: center; padding: 6vh 1rem 4vh; }
.style-elegant .frame { text-align: center; max-width: 40rem; }
.style-elegant .cropper { width: 16rem; height: 16rem; margin: 0 auto 1.5rem; border-radius: 50%; overflow: hidden; border: 3px solid var(--c-text); box-shadow: 0 0 0 8px rgba(255,255,255,.05); }
.style-elegant .cropper img { width: 100%; height: 100%; object-fit: cover; }
.style-elegant .eyebrow { letter-spacing: .4em; text-transform: uppercase; font-size: .75rem; opacity: .75; }
.style-elegant .title { font-family: var(--font-heading), serif; font-size: clamp(2.4rem, 7vw, 4rem); font-weight: 600; line-height: 1.05; margin: .5rem 0; }
.style-elegant .amp { color: var(--c-accent); }
.style-elegant .date { font-size: 1rem; opacity: .85; letter-spacing: .04em; }
.style-elegant .btn-save { display: inline-block; margin-top: 1.2rem; padding: .6rem 1.4rem; border: 1px solid var(--c-text); border-radius: 999px; color: var(--c-text); text-decoration: none; }
.style-elegant .btn-save:hover { background: var(--c-text); color: var(--c-bg); }
.style-elegant .block { padding: 5vh 1rem; max-width: 46rem; margin: 0 auto; text-align: center; }
.style-elegant .heading { font-family: var(--font-heading), serif; font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1.5rem; }
.style-elegant .lede { max-width: 34rem; margin: 0 auto 1.5rem; opacity: .9; }
.style-elegant .couple { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.style-elegant .couple figure { margin: 0; }
.style-elegant .couple .cropper { width: 12rem; height: 12rem; }
.style-elegant .role { text-transform: uppercase; letter-spacing: .2em; font-size: .75rem; opacity: .7; }
.style-elegant .parents { opacity: .85; font-size: .9rem; }
.style-elegant .amp-mark { font-family: var(--font-heading), serif; font-size: 2.5rem; color: var(--c-accent); }
.style-elegant .countdown { display: flex; justify-content: center; gap: 2rem; margin: 1.5rem 0; }
.style-elegant .countdown b { font-family: var(--font-heading), serif; font-size: 2.6rem; display: block; }
.style-elegant .countdown small { opacity: .6; }
.style-elegant .events { display: flex; flex-direction: column; gap: .5rem; margin: 1rem auto; max-width: 24rem; }
.style-elegant .events h4 { font-family: var(--font-heading), serif; font-size: 1.5rem; margin: 0; }
.style-elegant .addr { font-size: .85rem; opacity: .8; margin-top: 1rem; }
.style-elegant .gifts { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.style-elegant .gift { background: var(--c-surface); border-radius: var(--radius); padding: 1.5rem; width: 16rem; }
.style-elegant .gift img { max-width: 130px; }
.style-elegant .copy { margin-top: .5rem; padding: .4rem 1rem; border: 1px solid var(--c-text); background: transparent; color: var(--c-text); border-radius: 999px; cursor: pointer; }
@media (min-width: 768px) { .style-elegant .couple { flex-direction: row; justify-content: center; gap: 3rem; } }
</style>
