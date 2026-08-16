<template>
  <div v-if="modelValue" class="opening-screen">
    <div class="text-center px-3">
      <div class="cropper border border-3 shadow mb-4 mx-auto">
        <img :src="cover" alt="cover">
      </div>
      <h2 class="font-estetik mt-4">The Wedding Of</h2>
      <h1 class="font-estetik mt-3 mb-4" style="font-size:3rem;">{{ g.name }} &amp; {{ b.name }}</h1>
      <button type="button" class="btn btn-light shadow rounded-3 mt-4" @click="buka">
        <i class="fa-solid fa-envelope-open me-2"></i>Buka Undangan
      </button>
    </div>
  </div>
  <div v-else class="opening-hidden" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { useAsset } from '~/composables/useAsset'
import type { WeddingProfile } from '~/composables/useWeddings'

const props = defineProps<{ modelValue: boolean; wedding: WeddingProfile }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'open'): void }>()
const cover = useAsset(props.wedding.cover)
const g = props.wedding.groom; const b = props.wedding.bride

function buka() { emit('update:modelValue', false); emit('open') }
</script>
