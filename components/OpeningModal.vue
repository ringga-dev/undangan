<template>
  <div v-if="modelValue" class="opening-screen">
    <div class="text-center px-3">
      <div class="cropper border border-3 border-light shadow mb-4 mx-auto">
        <img :src="cover" alt="bg">
      </div>
      <h2 class="font-estetik mt-4 text-light">The Wedding Of</h2>
      <h1 class="font-estetik mt-3 mb-4 text-light" style="font-size: 3rem;">
        {{ config.groom.name }} &amp; {{ config.bride.name }}
      </h1>
      <button type="button" class="btn btn-light shadow rounded-3 mt-4" @click="buka">
        <i class="fa-solid fa-envelope-open me-2"></i>Buka Undangan
      </button>
    </div>
  </div>
  <div v-else class="opening-hidden" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { useAsset } from '~/composables/useAsset'
const config = useAppConfig().undangan
const cover = useAsset(config.cover)

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'open'): void }>()

function buka() {
  emit('update:modelValue', false)
  emit('open')
}
</script>
