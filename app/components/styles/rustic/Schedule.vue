<template>
  <section class="block surface reveal" id="waktu" data-slide>
    <h2 class="heading">Waktu &amp; Tempat</h2>
    <div class="countdown">
      <div class="cd-box"><b>{{ hari }}</b><span>hari</span></div>
      <div class="cd-box"><b>{{ jam }}</b><span>jam</span></div>
      <div class="cd-box"><b>{{ menit }}</b><span>menit</span></div>
      <div class="cd-box"><b>{{ detik }}</b><span>detik</span></div>
    </div>
    <div class="events">
      <div class="ticket" v-for="e in w.events" :key="e.name"><h4>{{ e.name }}</h4><p>{{ e.time }}</p></div>
    </div>
    <p class="addr">{{ w.address }}</p>
    <a class="map-link" target="_blank" :href="w.maps">Buka Map</a>
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
.block { text-align: center; max-width: 46rem; margin: 0 auto; padding: 6vh 1rem; position: relative; z-index: 1; }
.heading { font-family: var(--font-heading), serif; text-decoration: underline wavy var(--c-accent); text-underline-offset: 6px; margin-bottom: 1.2rem; font-size: clamp(2rem,5vw,3rem); }
.countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.countdown b { font-family: var(--font-heading), serif; font-size: 2.2rem; display: block; }
.countdown span { font-size: 0.7rem; opacity: 0.6; letter-spacing: 0.15em; text-transform: uppercase; }
.events { display: flex; flex-direction: column; gap: 0.75rem; max-width: 22rem; margin: 1rem auto; }
.ticket { border: 2px dashed var(--c-accent); border-radius: var(--radius); padding: 0.75rem; }
.ticket h4 { font-family: var(--font-heading), serif; margin: 0; }
.addr { opacity: 0.8; margin-top: 1rem; font-size: 0.85rem; }
.map-link { color: var(--c-accent); font-size: 0.85rem; }
</style>
