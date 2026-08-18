<template>
  <section class="surface block reveal" id="waktu" data-slide>
    <h2 class="heading">Waktu &amp; Tempat</h2>
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
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
import { useCountdown } from '~/composables/useCountdown'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const { hari, jam, menit, detik } = useCountdown(w.countdown)
</script>

<style scoped>
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; font-weight: 700; letter-spacing: -0.02em; }
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
</style>
