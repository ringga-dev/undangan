<template>
  <div>
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
    <OpeningModal v-model="open" @open="onBuka" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudio } from '~/composables/useAudio'

const config = useAppConfig().undangan
const open = ref(true)

function onBuka() {
  open.value = false
  // Start background music on user gesture (single shared instance)
  useAudio().play().catch(() => {})
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
