<template>
  <button type="button" id="tombol-musik" class="btn btn-light btn-sm rounded-circle btn-music" @click="play">
    <i :class="isPlay ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play'"></i>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsset } from '~/composables/useAsset'
const config = useAppConfig().undangan

const isPlay = ref(true)
let audio: HTMLAudioElement | null = null

function ensureAudio() {
  if (!audio) audio = new Audio(useAsset(config.music))
  return audio
}

function play() {
  const a = ensureAudio()
  if (isPlay.value) {
    a.pause()
    isPlay.value = false
  } else {
    a.play().catch(() => {})
    isPlay.value = true
  }
}
</script>
