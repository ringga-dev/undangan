<template>
  <div class="style-floral">
    <Navbar />
    <main class="hero" id="home">
      <span class="leaf leaf-1">❧</span><span class="leaf leaf-2">✿</span><span class="leaf leaf-3">❀</span>
      <div class="card">
        <div class="cropper"><img :src="cover" alt="cover"></div>
        <p class="eyebrow">The Wedding Of</p>
        <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
        <p class="date">{{ w.dateText }}</p>
        <a class="btn-save" target="_blank" :href="w.calendarUrl">
          <i class="fa-solid fa-calendar-check"></i> Simpan Waktu
        </a>
      </div>
    </main>

    <DividerFloral />

    <section class="surface block" id="mempelai">
      <h2 class="heading">Assalamualaikum</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
      <div class="couple">
        <figure data-aos="zoom-in">
          <div class="cropper"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <span class="amp-mark">&amp;</span>
        <figure data-aos="zoom-in">
          <div class="cropper"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerFloral />
    <QuoteLine />
    <DividerFloral />

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
        <div class="pill"><h4>Akad</h4><p>{{ w.akad }}</p></div>
        <div class="pill"><h4>Resepsi</h4><p>{{ w.resepsi }}</p></div>
      </div>
      <a :href="w.mapsUrl" target="_blank" class="btn-save"><i class="fa-solid fa-map-location-dot"></i> Lihat Google Maps</a>
      <p class="addr">{{ w.address }}</p>
    </section>

    <DividerFloral />

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
    <DividerFloral />
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
import DividerFloral from '~/components/dividers/DividerFloral.vue'
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
.style-floral .hero { min-height: 100vh; display: grid; place-items: center; padding: 6vh 1rem; position: relative; overflow: hidden; }
.style-floral .card { background: var(--c-surface); border-radius: 2.5rem; padding: 3rem 2rem; text-align: center; max-width: 34rem; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,.12); border: 2px solid var(--c-accent); }
.style-floral .leaf { position: absolute; font-size: 3rem; color: var(--c-accent); opacity: .5; }
.style-floral .leaf-1 { top: 4%; left: 6%; }
.style-floral .leaf-2 { bottom: 6%; right: 8%; transform: rotate(40deg); }
.style-floral .leaf-3 { top: 12%; right: 14%; font-size: 2rem; }
.style-floral .cropper { width: 15rem; height: 15rem; margin: 0 auto 1.2rem; border-radius: 46% 54% 52% 48% / 50% 46% 54% 50%; overflow: hidden; border: 4px solid var(--c-primary); }
.style-floral .cropper img { width: 100%; height: 100%; object-fit: cover; }
.style-floral .eyebrow { letter-spacing: .3em; text-transform: uppercase; font-size: .75rem; opacity: .7; }
.style-floral .title { font-family: var(--font-heading), serif; font-size: clamp(2.2rem, 6vw, 3.4rem); margin: .4rem 0; }
.style-floral .amp { color: var(--c-accent); }
.style-floral .date { opacity: .8; }
.style-floral .btn-save { display: inline-block; margin-top: 1rem; padding: .6rem 1.4rem; border-radius: 999px; background: var(--c-primary); color: #fff; text-decoration: none; }
.style-floral .block { padding: 5vh 1rem; max-width: 46rem; margin: 0 auto; text-align: center; }
.style-floral .heading { font-family: var(--font-heading), serif; font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1.2rem; }
.style-floral .lede { max-width: 32rem; margin: 0 auto 1.5rem; opacity: .9; }
.style-floral .couple { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.style-floral .couple figure { margin: 0; background: var(--c-bg); border-radius: 2rem; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,.08); }
.style-floral .couple .cropper { width: 11rem; height: 11rem; }
.style-floral .role { text-transform: uppercase; letter-spacing: .2em; font-size: .7rem; opacity: .7; }
.style-floral .amp-mark { font-family: var(--font-heading), serif; font-size: 2.2rem; color: var(--c-accent); }
.style-floral .countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.style-floral .countdown b { font-family: var(--font-heading), serif; font-size: 2.4rem; display: block; }
.style-floral .events { display: flex; flex-direction: column; gap: .75rem; margin: 1rem auto; max-width: 22rem; }
.style-floral .pill { border: 2px solid var(--c-accent); border-radius: 2rem; padding: .75rem; }
.style-floral .pill h4 { font-family: var(--font-heading), serif; margin: 0; font-size: 1.4rem; }
.style-floral .addr { font-size: .85rem; opacity: .8; margin-top: 1rem; }
.style-floral .gifts { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.style-floral .gift { background: var(--c-surface); border-radius: 2rem; padding: 1.5rem; width: 16rem; }
.style-floral .gift img { max-width: 130px; }
.style-floral .copy { margin-top: .5rem; padding: .4rem 1rem; border: none; border-radius: 999px; background: var(--c-primary); color: #fff; cursor: pointer; }
@media (min-width: 768px) { .style-floral .couple { flex-direction: row; justify-content: center; gap: 2.5rem; } }
</style>
