<template>
  <div class="modal fade" :class="{ show: modelValue }" tabindex="-1"
    :style="modelValue ? 'display: block;' : ''" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen m-0">
      <div class="modal-content">
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh !important;">
          <div class="text-center">
            <div class="cropper border border-3 border-light shadow mb-4 mx-auto">
              <img :src="cover" alt="bg">
            </div>
            <h2 class="font-estetik mt-4">The Wedding Of</h2>
            <h1 class="font-estetik mt-3 mb-4" style="font-size: 3rem;">
              {{ config.groom.name }} &amp; {{ config.bride.name }}
            </h1>
            <button type="button" class="btn btn-light shadow rounded-3 mt-4" @click="buka">
              <i class="fa-solid fa-envelope-open me-2"></i>Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
