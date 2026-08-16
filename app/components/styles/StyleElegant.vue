<template>
  <div class="style-elegant">
    <Navbar />
    <main class="scrollspy-example" data-bs-spy="scroll" data-bs-target="#navbar-example2"
      data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabindex="0">
      <section class="container" id="home">
        <div class="text-center py-5">
          <p class="eyebrow">The Wedding Of</p>
          <div class="cropper mx-auto my-4"><img :src="cover" alt="cover"></div>
          <h1 class="font-estetik display">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <h4 class="date">{{ w.dateText }}</h4>
          <a class="btn btn-outline-brand btn-sm rounded-pill px-3 my-2" target="_blank" :href="w.calendarUrl">
            <i class="fa-solid fa-calendar-check me-2"></i>Simpan Waktu
          </a>
        </div>
      </section>

      <DividerElegant />

      <section class="surface" id="mempelai">
        <div class="text-center py-5">
          <h2 class="font-estetik section-title">Assalamualaikum</h2>
          <p class="lede px-3">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
          <div class="couple">
            <div data-aos="fade-right">
              <div class="cropper mx-auto"><img :src="gP" alt="groom"></div>
              <h3 class="font-estetik">{{ g.name }}</h3>
              <p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
            </div>
            <div class="amp-big font-estetik">&amp;</div>
            <div data-aos="fade-left">
              <div class="cropper mx-auto"><img :src="bP" alt="bride"></div>
              <h3 class="font-estetik">{{ b.name }}</h3>
              <p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
            </div>
          </div>
        </div>
      </section>

      <DividerElegant />
      <QuoteLine />
      <DividerElegant />

      <section class="surface" id="tanggal">
        <div class="container text-center py-5">
          <h2 class="font-estetik section-title">Waktu Menuju Acara</h2>
          <div class="countdown">
            <div><b>{{ hari }}</b><small>Hari</small></div>
            <div><b>{{ jam }}</b><small>Jam</small></div>
            <div><b>{{ menit }}</b><small>Menit</small></div>
            <div><b>{{ detik }}</b><small>Detik</small></div>
          </div>
          <p class="lede mt-4">Dengan memohon rahmat Allah, kami selenggarakan:</p>
          <div class="events">
            <div data-aos="fade-left"><h4 class="font-estetik">Akad</h4><p>{{ w.akad }}</p></div>
            <div data-aos="fade-right"><h4 class="font-estetik">Resepsi</h4><p>{{ w.resepsi }}</p></div>
          </div>
          <div data-aos="fade-up">
            <a :href="w.mapsUrl" target="_blank" class="btn btn-outline-brand btn-sm rounded-pill px-3 m-2">
              <i class="fa-solid fa-map-location-dot me-2"></i>Lihat Google Maps
            </a>
            <p class="addr">{{ w.address }}</p>
          </div>
        </div>
      </section>

      <DividerElegant />

      <section class="container py-5">
        <h2 class="font-estetik section-title text-center">Love Gift</h2>
        <p class="lede text-center">Tanda kasih dapat melalui:</p>
        <div class="row justify-content-center">
          <div v-for="gift in w.gifts" :key="gift.bank" class="col-12 col-md-5 card-body surface m-3 p-3" data-aos="fade-up">
            <img :src="gift.logo" class="img-fluid" width="150" :alt="gift.bank">
            <p class="mt-3 mb-0">No. Rekening {{ gift.norek }}</p>
            <p>{{ gift.nama }}</p>
            <button class="btn btn-light btn-sm" :data-nomer="gift.norek" @click="salin($event, gift.norek)">Salin</button>
          </div>
        </div>
      </section>

      <Ucapan :wedding="w" id="ucapan" />
      <DividerElegant />
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
import DividerElegant from '~/components/dividers/DividerElegant.vue'
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
function initAOS() {
  // @ts-expect-error
  if (typeof window !== 'undefined' && window.AOS) window.AOS.init()
  else document.documentElement.classList.add('aos-fallback')
}
defineExpose({})
</script>

<style scoped>
.style-elegant .eyebrow { letter-spacing:.3em; text-transform:uppercase; font-size:.8rem; opacity:.8; }
.style-elegant .display { font-size:3rem; line-height:1.1; }
.style-elegant .date { font-weight:300; letter-spacing:.05em; }
.style-elegant .amp { color:var(--c-accent); }
.style-elegant .section-title { font-size:2.4rem; margin-bottom:1.5rem; }
.style-elegant .lede { max-width:36rem; margin:0 auto; opacity:.9; }
.style-elegant .couple { display:flex; flex-direction:column; align-items:center; gap:1.5rem; }
.style-elegant .role { margin:.5rem 0 0; letter-spacing:.2em; text-transform:uppercase; font-size:.8rem; opacity:.8; }
.style-elegant .parents { opacity:.85; }
.style-elegant .amp-big { font-size:3.5rem; color:var(--c-accent); }
.style-elegant .countdown { display:flex; justify-content:center; gap:1.5rem; margin:1.5rem 0; }
.style-elegant .countdown b { font-size:2.2rem; font-family:var(--font-heading),serif; }
.style-elegant .countdown small { opacity:.7; }
.style-elegant .events { display:flex; flex-direction:column; gap:1rem; margin:1rem 0; }
.style-elegant .events h4 { font-size:1.8rem; }
.style-elegant .addr { font-size:.9rem; opacity:.85; }
@media (min-width:768px){ .style-elegant .couple{ flex-direction:row; justify-content:center; gap:3rem; } }
</style>
