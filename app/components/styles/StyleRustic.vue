<template>
  <div class="style-rustic">
    <Navbar />
    <main class="hero" id="home">
      <div class="grid2">
        <div class="photo"><img :src="cover" alt="cover"></div>
        <div class="text">
          <p class="eyebrow">The Wedding Of</p>
          <h1 class="title">{{ g.name }} <span class="amp">&amp;</span> {{ b.name }}</h1>
          <p class="date">{{ w.dateText }}</p>
          <a class="btn-save" target="_blank" :href="w.calendarUrl">
            <i class="fa-solid fa-calendar-check"></i> Simpan Waktu
          </a>
        </div>
      </div>
    </main>

    <DividerRustic />

    <section class="surface block" id="mempelai">
      <h2 class="heading">Assalamualaikum</h2>
      <p class="lede">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.</p>
      <div class="couple">
        <figure data-aos="fade-right">
          <div class="photo sm"><img :src="gP" alt="groom"></div>
          <h3>{{ g.name }}</h3><p class="role">Putra</p><p class="parents">{{ g.parents }}</p>
        </figure>
        <figure data-aos="fade-left">
          <div class="photo sm"><img :src="bP" alt="bride"></div>
          <h3>{{ b.name }}</h3><p class="role">Putri</p><p class="parents">{{ b.parents }}</p>
        </figure>
      </div>
    </section>

    <DividerRustic />
    <QuoteLine />
    <DividerRustic />

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
        <div class="ticket"><h4>Akad</h4><p>{{ w.akad }}</p></div>
        <div class="ticket"><h4>Resepsi</h4><p>{{ w.resepsi }}</p></div>
      </div>
      <a :href="w.mapsUrl" target="_blank" class="btn-save"><i class="fa-solid fa-map-location-dot"></i> Lihat Google Maps</a>
      <p class="addr">{{ w.address }}</p>
    </section>

    <DividerRustic />

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
    <DividerRustic />
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
import DividerRustic from '~/components/dividers/DividerRustic.vue'
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
.style-rustic { background-image: repeating-linear-gradient(45deg, rgba(0,0,0,.02) 0 10px, transparent 10px 20px); }
.style-rustic .hero { padding: 5vh 1rem; }
.style-rustic .grid2 { max-width: 50rem; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 1.5rem; border: 6px double var(--c-accent); border-radius: var(--radius); padding: 1.5rem; }
.style-rustic .photo { width: 100%; aspect-ratio: 4/5; overflow: hidden; border: 3px solid var(--c-primary); border-radius: var(--radius); }
.style-rustic .photo img { width: 100%; height: 100%; object-fit: cover; }
.style-rustic .text { text-align: center; display: flex; flex-direction: column; justify-content: center; }
.style-rustic .eyebrow { letter-spacing: .25em; text-transform: uppercase; font-size: .8rem; opacity: .75; }
.style-rustic .title { font-family: var(--font-heading), serif; font-size: clamp(2rem, 6vw, 3rem); margin: .5rem 0; }
.style-rustic .amp { color: var(--c-accent); }
.style-rustic .date { opacity: .8; }
.style-rustic .btn-save { display: inline-block; margin-top: 1rem; padding: .6rem 1.4rem; border-radius: var(--radius); background: var(--c-primary); color: #fff; text-decoration: none; }
.style-rustic .block { padding: 5vh 1rem; max-width: 46rem; margin: 0 auto; text-align: center; }
.style-rustic .heading { font-family: var(--font-heading), serif; font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1.2rem; text-decoration: underline wavy var(--c-accent); text-underline-offset: 6px; }
.style-rustic .lede { max-width: 32rem; margin: 0 auto 1.5rem; opacity: .9; }
.style-rustic .couple { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.style-rustic .couple figure { margin: 0; }
.style-rustic .photo.sm { width: 12rem; aspect-ratio: 1; }
.style-rustic .role { text-transform: uppercase; letter-spacing: .15em; font-size: .75rem; opacity: .75; }
.style-rustic .parents { font-size: .9rem; opacity: .85; }
.style-rustic .countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.style-rustic .countdown b { font-family: var(--font-heading), serif; font-size: 2.2rem; display: block; }
.style-rustic .events { display: flex; flex-direction: column; gap: .75rem; margin: 1rem auto; max-width: 22rem; }
.style-rustic .ticket { border: 2px dashed var(--c-accent); border-radius: var(--radius); padding: .75rem; }
.style-rustic .ticket h4 { font-family: var(--font-heading), serif; margin: 0; }
.style-rustic .addr { font-size: .85rem; opacity: .8; margin-top: 1rem; }
.style-rustic .gifts { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.style-rustic .gift { background: var(--c-surface); border-radius: var(--radius); padding: 1.5rem; width: 16rem; border: 3px solid var(--c-primary); }
.style-rustic .gift img { max-width: 130px; }
.style-rustic .copy { margin-top: .5rem; padding: .4rem 1rem; border: none; border-radius: var(--radius); background: var(--c-primary); color: #fff; cursor: pointer; }
@media (min-width: 768px) { .style-rustic .grid2 { grid-template-columns: 1fr 1fr; } .style-rustic .couple { flex-direction: row; justify-content: center; gap: 3rem; } }
</style>
