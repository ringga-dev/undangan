<template>
  <button type="button" id="tombol-musik" class="btn btn-light btn-sm rounded-circle btn-music" @click="play">
    <i :class="isPlay ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play'"></i>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAudio } from '~/composables/useAudio'

const isPlay = ref(true)

function play() {
  const a = useAudio()
  if (isPlay.value) {
    a.pause()
    isPlay.value = false
  } else {
    a.play().catch(() => {})
    isPlay.value = true
  }
}
</script>
