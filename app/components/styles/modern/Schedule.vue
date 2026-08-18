<template>
  <section class="block surface reveal" id="waktu" data-slide>
    <h2 class="heading">Waktu &amp; Tempat</h2>
    <div class="countdown">
      <div class="cd-box"><b>{{ hari }}</b><small>hari</small></div>
      <div class="cd-box"><b>{{ jam }}</b><small>jam</small></div>
      <div class="cd-box"><b>{{ menit }}</b><small>menit</small></div>
      <div class="cd-box"><b>{{ detik }}</b><small>detik</small></div>
    </div>
    <div class="events">
      <div class="box" v-for="e in w.events" :key="e.name"><h4>{{ e.name }}</h4><p>{{ e.time }}</p></div>
    </div>
    <p class="addr">{{ w.address }}</p>
    <a class="map-link" target="_blank" :href="w.maps">BUKA MAP</a>
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
.heading { font-family: var(--font-heading), sans-serif; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.2rem; font-size: clamp(1.6rem,4vw,2.4rem); font-weight: 700; }
.countdown { display: flex; justify-content: center; gap: 1.5rem; margin: 1.5rem 0; }
.countdown b { font-family: var(--font-heading), sans-serif; font-size: 2.6rem; font-weight: 700; display: block; }
.countdown small { opacity: 0.5; letter-spacing: 0.1em; }
.events { display: flex; flex-direction: column; gap: 0.75rem; max-width: 24rem; margin: 1rem auto; }
.box { border: 1px solid var(--c-accent); padding: 0.75rem; }
.box h4 { letter-spacing: 0.08em; margin: 0; font-weight: 700; }
.addr { opacity: 0.8; margin-top: 1rem; font-size: 0.85rem; }
.map-link { color: var(--c-accent); font-size: 0.85rem; }
</style>
