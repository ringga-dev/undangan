<template>
  <div class="style-minimal">
    <Navbar />
    <main class="scrollspy-example" data-bs-spy="scroll" data-bs-target="#navbar-example2"
      data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabindex="0">
      <section class="container" id="home">
        <div class="text-center py-6">
          <p class="eyebrow">THE WEDDING OF</p>
          <div class="cropper-min mx-auto my-5"><img :src="cover" alt="cover"></div>
          <h1 class="display">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <p class="date">{{ w.dateText }}</p>
          <a class="btn btn-outline-brand btn-sm rounded-0 px-3 my-2" target="_blank" :href="w.calendarUrl">
            <i class="fa-solid fa-calendar-check me-2"></i>Simpan Waktu
          </a>
        </div>
      </section>

      <DividerMinimal />

      <section class="surface" id="mempelai">
        <div class="text-center py-6 px-4">
          <h2 class="section-title">Assalamualaikum</h2>
          <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
          <div class="couple">
            <div class="person" data-aos="fade-up">
              <div class="cropper-min mx-auto"><img :src="gP" alt="groom"></div>
              <h3>{{ g.name }}</h3>
              <p class="role">Putra · {{ g.parents }}</p>
            </div>
            <div class="amp-big">&amp;</div>
            <div class="person" data-aos="fade-up">
              <div class="cropper-min mx-auto"><img :src="bP" alt="bride"></div>
              <h3>{{ b.name }}</h3>
              <p class="role">Putri · {{ b.parents }}</p>
            </div>
          </div>
        </div>
      </section>

      <DividerMinimal />
      <QuoteLine />
      <DividerMinimal />

      <section class="surface" id="tanggal">
        <div class="container text-center py-6">
          <h2 class="section-title">Waktu Menuju Acara</h2>
          <div class="countdown">
            <div><b>{{ hari }}</b><small>Hari</small></div>
            <div><b>{{ jam }}</b><small>Jam</small></div>
            <div><b>{{ menit }}</b><small>Menit</small></div>
            <div><b>{{ detik }}</b><small>Detik</small></div>
          </div>
          <p class="lede mt-4">Dengan memohon rahmat Allah, kami selenggarakan:</p>
          <div class="events">
            <div data-aos="fade-up"><h4>Akad</h4><p>{{ w.akad }}</p></div>
            <div data-aos="fade-up"><h4>Resepsi</h4><p>{{ w.resepsi }}</p></div>
          </div>
          <a :href="w.mapsUrl" target="_blank" class="btn btn-outline-brand btn-sm rounded-0 px-3 m-2">
            <i class="fa-solid fa-map-location-dot me-2"></i>Lihat Google Maps
          </a>
          <p class="addr">{{ w.address }}</p>
        </div>
      </section>

      <DividerMinimal />

      <section class="container py-6">
        <h2 class="section-title text-center">Love Gift</h2>
        <p class="lede text-center">Tanda kasih dapat melalui:</p>
        <div class="row justify-content-center">
          <div v-for="gift in w.gifts" :key="gift.bank" class="col-12 col-md-5 card-body surface m-3 p-3 rounded-0" data-aos="fade-up">
            <img :src="gift.logo" class="img-fluid" width="150" :alt="gift.bank">
            <p class="mt-3 mb-0">No. Rekening {{ gift.norek }}</p>
            <p>{{ gift.nama }}</p>
            <button class="btn btn-outline-brand btn-sm rounded-0" :data-nomer="gift.norek" @click="salin($event, gift.norek)">Salin</button>
          </div>
        </div>
      </section>

      <Ucapan :wedding="w" id="ucapan" />
      <DividerMinimal />
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
.style-minimal .py-6 { padding-top: 5rem; padding-bottom: 5rem; }
.style-minimal .eyebrow { letter-spacing: .4em; font-size: .7rem; opacity: .7; text-transform: uppercase; }
.style-minimal .cropper-min { width: 11rem; height: 11rem; border-radius: 50%; overflow: hidden; border: 1px solid var(--c-text); }
.style-minimal .cropper-min img { width: 100%; height: 100%; object-fit: cover; }
.style-minimal .display { font-size: 2.4rem; font-weight: 600; letter-spacing: -.02em; }
.style-minimal .amp { color: var(--c-accent); }
.style-minimal .date { opacity: .7; }
.style-minimal .section-title { font-size: 2rem; font-weight: 600; letter-spacing: -.02em; margin-bottom: 1.2rem; }
.style-minimal .lede { max-width: 32rem; margin: 0 auto; opacity: .85; }
.style-minimal .couple { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
.style-minimal .role { opacity: .7; font-size: .85rem; }
.style-minimal .amp-big { font-size: 2rem; color: var(--c-accent); }
.style-minimal .countdown { display: flex; justify-content: center; gap: 2rem; margin: 1.5rem 0; }
.style-minimal .countdown b { font-size: 2rem; font-weight: 600; }
.style-minimal .countdown small { opacity: .6; }
.style-minimal .events { display: flex; flex-direction: column; gap: .5rem; margin: 1rem 0; }
.style-minimal .events h4 { font-weight: 600; }
.style-minimal .addr { font-size: .9rem; opacity: .8; }
@media (min-width: 768px) { .style-minimal .couple { flex-direction: row; justify-content: center; gap: 5rem; } }
</style>
