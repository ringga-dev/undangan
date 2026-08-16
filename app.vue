<template>
  <div>
    <OpeningModal v-model="open" @open="onBuka" />
    <Navbar />
    <main
      class="scrollspy-example text-light"
      data-bs-spy="scroll"
      data-bs-target="#navbar-example2"
      data-bs-root-margin="0px 0px -40%"
      data-bs-smooth-scroll="true"
      tabindex="0"
    >
      <Home />
      <Mempelai />
      <Tanggal />
      <LoveGift />
      <Ucapan />
      <Closing />
    </main>
    <MusicButton v-if="!open" />
    <div v-show="open" id="loading" class="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAsset } from '~/composables/useAsset'

const config = useAppConfig().undangan
const open = ref(true)
let audio: HTMLAudioElement | null = null

function onBuka() {
  open.value = false
  // Start background music on user gesture
  if (!audio) audio = new Audio(useAsset(config.music))
  audio.play().catch(() => {})
}

onMounted(() => {
  // Initialise AOS (scroll animations). If the CDN failed, reveal content.
  // @ts-expect-error global from CDN
  if (typeof window !== 'undefined' && window.AOS) {
    // @ts-expect-error global from CDN
    window.AOS.init()
  } else {
    document.documentElement.classList.add('aos-fallback')
  }
})
</script>
