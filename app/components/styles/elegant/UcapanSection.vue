<template>
  <div data-slide>
    <Ucapan :wedding="w" />
  </div>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
import Ucapan from '~/components/Ucapan.vue'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
</script>
