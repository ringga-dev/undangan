<template>
  <div class="text-center py-5">
    <p>Mengalihkan ke undangan...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeddings } from '~/composables/useWeddings'

// Client-only redirect "/" -> default couple + elegant style
const { defaultProfile } = useWeddings()
onMounted(() => {
  const p = defaultProfile()
  const slug = `${encodeURIComponent(p.groom.name)} dan ${encodeURIComponent(p.bride.name)}`
  window.location.href = `/${slug}/elegant`
})
</script>
