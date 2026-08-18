<template>
  <section class="surface block reveal" id="gallery" v-if="w.gallery && w.gallery.length" data-slide>
    <h2 class="heading gold">Galeri</h2>
    <div class="gallery">
      <div class="g-item tilt" data-depth="0.12" v-for="(p, i) in w.gallery" :key="i">
        <img :src="useAsset(p)" :alt="''" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
import { useAsset } from '~/composables/useAsset'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
</script>

<style scoped>
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; }
.gold { color: var(--gold); text-shadow: 0 2px 20px rgba(212,175,55,0.3); }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
.g-item { border-radius: 16px; overflow: hidden; border: 1px solid rgba(212,175,55,0.25); aspect-ratio: 1; }
.g-item img { width: 100%; height: 100%; object-fit: cover; }
</style>
