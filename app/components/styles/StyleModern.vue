<template>
  <div class="style-modern">
    <Navbar />
    <main class="scrollspy-example" data-bs-spy="scroll" data-bs-target="#navbar-example2"
      data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabindex="0">
      <section class="container" id="home">
        <div class="modern-hero py-6">
          <div class="grid-bg"></div>
          <p class="eyebrow">THE WEDDING OF</p>
          <div class="cropper mx-auto my-4"><img :src="cover" alt="cover"></div>
          <h1 class="display">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <h4 class="date">{{ w.dateText }}</h4>
          <a class="btn btn-brand btn-sm rounded-0 px-3 my-2" target="_blank" :href="w.calendarUrl">
            <i class="fa-solid fa-calendar-check me-2"></i>Simpan Waktu
          </a>
        </div>
      </section>

      <DividerModern />

      <section class="surface" id="mempelai">
        <div class="text-center py-6 px-3">
          <h2 class="section-title">ASSALAMUALAIKUM</h2>
          <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
          <div class="couple">
            <div class="person" data-aos="fade-right">
              <div class="cropper mx-auto"><img :src="gP" alt="groom"></div>
              <h3>{{ g.name }}</h3>
              <p class="role">PUTRA</p><p class="parents">{{ g.parents }}</p>
            </div>
            <div class="amp-big">&amp;</div>
            <div class="person" data-aos="fade-left">
              <div class="cropper mx-auto"><img :src="bP" alt="bride"></div>
              <h3>{{ b.name }}</h3>
              <p class="role">PUTRI</p><p class="parents">{{ b.parents }}</p>
            </div>
          </div>
        </div>
      </section>

      <DividerModern />
      <QuoteLine />
      <DividerModern />

      <section class="surface" id="tanggal">
        <div class="container text-center py-6">
          <h2 class="section-title">WAKTU MENUJU ACARA</h2>
          <div class="countdown">
            <div><b>{{ hari }}</b><small>HARI</small></div>
            <div><b>{{ jam }}</b><small>JAM</small></div>
            <div><b>{{ menit }}</b><small>MENIT</small></div>
            <div><b>{{ detik }}</b><small>DETIK</small></div>
          </div>
          <p class="lede mt-4">Dengan memohon rahmat Allah, kami selenggarakan:</p>
          <div class="events">
            <div data-aos="fade-up"><h4>AKAD</h4><p>{{ w.akad }}</p></div>
            <div data-aos="fade-up"><h4>RESEPSI</h4><p>{{ w.resepsi }}</p></div>
          </div>
          <a :href="w.mapsUrl" target="_blank" class="btn btn-brand btn-sm rounded-0 px-3 m-2">
            <i class="fa-solid fa-map-location-dot me-2"></i>Lihat Google Maps
          </a>
          <p class="addr">{{ w.address }}</p>
        </div>
      </section>

      <DividerModern />

      <section class="container py-6">
        <h2 class="section-title text-center">LOVE GIFT</h2>
        <p class="lede text-center">Tanda kasih dapat melalui:</p>
        <div class="row justify-content-center">
          <div v-for="gift in w.gifts" :key="gift.bank" class="col-12 col-md-5 card-body surface m-3 p-3 rounded-0" data-aos="fade-up">
            <img :src="gift.logo" class="img-fluid" width="150" :alt="gift.bank">
            <p class="mt-3 mb-0">No. Rekening {{ gift.norek }}</p>
            <p>{{ gift.nama }}</p>
            <button class="btn btn-brand btn-sm rounded-0" :data-nomer="gift.norek" @click="salin($event, gift.norek)">Salin</button>
          </div>
        </div>
      </section>

      <Ucapan :wedding="w" id="ucapan" />
      <DividerModern />
      <Closing />
    </main>
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
import DividerModern from '~/components/dividers/DividerModern.vue'
import QuoteLine from '~/components/QuoteLine.vue'
import { useAsset } from '~/composables/useAsset'
import { useAudio } from '~/composables/useAudio'
import { useCountdown } from '~/composables/useCountdown'
import type { WeddingProfile } from '~/composables/useWeddings'

const props = defineProps<{ wedding: WeddingProfile }>()
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
.style-modern .py-6 { padding-top: 5rem; padding-bottom: 5rem; }
.style-modern .modern-hero { position: relative; overflow: hidden; }
.style-modern .grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--c-accent) 1px, transparent 1px), linear-gradient(90deg, var(--c-accent) 1px, transparent 1px); background-size: 40px 40px; opacity: .08; z-index: 0; }
.style-modern .modern-hero > * { position: relative; z-index: 1; }
.style-modern .eyebrow { letter-spacing: .35em; font-size: .75rem; opacity: .8; text-transform: uppercase; }
.style-modern .display { font-size: 2.6rem; font-weight: 700; letter-spacing: -.03em; text-transform: uppercase; }
.style-modern .amp { color: var(--c-accent); }
.style-modern .date { opacity: .8; letter-spacing: .05em; }
.style-modern .section-title { font-size: 1.8rem; font-weight: 700; letter-spacing: .1em; margin-bottom: 1.2rem; text-transform: uppercase; }
.style-modern .lede { max-width: 34rem; margin: 0 auto; opacity: .9; }
.style-modern .couple { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
.style-modern .person { border-left: 3px solid var(--c-accent); padding-left: 1rem; text-align: left; }
.style-modern .role { letter-spacing: .2em; font-size: .75rem; opacity: .8; }
.style-modern .amp-big { font-size: 2.5rem; color: var(--c-accent); }
.style-modern .countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.style-modern .countdown b { font-size: 2.2rem; font-weight: 700; }
.style-modern .countdown small { opacity: .6; letter-spacing: .1em; }
.style-modern .events { display: flex; flex-direction: column; gap: .75rem; margin: 1rem 0; }
.style-modern .events h4 { font-weight: 700; letter-spacing: .05em; }
.style-modern .addr { font-size: .9rem; opacity: .85; }
@media (min-width: 768px) { .style-modern .couple { flex-direction: row; justify-content: center; gap: 4rem; } }
</style>
