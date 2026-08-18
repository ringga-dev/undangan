<template>
  <div>
    <!-- Love Story -->
    <section class="block surface reveal" id="story" v-if="w.story && w.story.length">
      <h2 class="rheading">{{ storyTitle }}</h2>
      <p class="rlede">Perjalanan kami menuju hari bahagia.</p>
      <div class="timeline">
        <div class="tl-item tilt" data-depth="0.1" v-for="(s, i) in w.story" :key="i">
          <span class="tl-year">{{ s.date }}</span>
          <h3 class="tl-title">{{ s.title }}</h3>
          <p class="tl-text">{{ s.text }}</p>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="block surface reveal" id="gallery" v-if="w.gallery && w.gallery.length">
      <h2 class="rheading">{{ galleryTitle }}</h2>
      <div class="gallery">
        <div class="g-item tilt" data-depth="0.12" v-for="(p, i) in w.gallery" :key="i">
          <img :src="useAsset(p)" :alt="''">
        </div>
      </div>
    </section>

    <!-- Closing -->
    <section class="block surface reveal closing" v-if="w.closing">
      <p class="closing-text">{{ w.closing }}</p>
      <p class="sign">— {{ w.groom.name }} &amp; {{ w.bride.name }} —</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAsset } from '~/composables/useAsset'
import type { WeddingProfile } from '~/composables/useWeddings'

const props = defineProps<{
  wedding: WeddingProfile
  storyTitle?: string
  galleryTitle?: string
}>()
const w = props.wedding
const storyTitle = props.storyTitle || 'Our Love Story'
const galleryTitle = props.galleryTitle || 'Galeri'
</script>

<style scoped>
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.rheading { font-family: var(--font-heading), serif; font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; color: var(--c-primary); }
.rlede { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; opacity: 0.85; line-height: 1.7; }
.timeline { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
.tl-item { padding: 1.6rem; border-radius: 18px; border: 1px solid color-mix(in srgb, var(--c-primary) 28%, transparent); background: color-mix(in srgb, var(--c-surface) 40%, transparent); text-align: center; }
.tl-year { display: inline-block; color: var(--c-accent); font-weight: 700; letter-spacing: 0.15em; margin-bottom: 0.5rem; }
.tl-title { font-size: 1.2rem; margin: 0.3rem 0; }
.tl-text { opacity: 0.8; font-size: 0.9rem; line-height: 1.7; }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; }
.g-item { border-radius: 16px; overflow: hidden; border: 1px solid color-mix(in srgb, var(--c-primary) 28%, transparent); aspect-ratio: 1; }
.g-item img { width: 100%; height: 100%; object-fit: cover; }
.closing { text-align: center; }
.closing-text { font-size: 1.1rem; line-height: 1.9; max-width: 640px; margin: 0 auto 1.5rem; opacity: 0.9; }
.sign { color: var(--c-primary); letter-spacing: 0.2em; }
</style>
