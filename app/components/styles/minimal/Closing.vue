<template>
  <section class="surface block reveal closing" data-slide>
    <p class="closing-text">{{ w.closing || 'Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada hari bahagia kami.' }}</p>
    <p class="sign">— {{ g.name }} &amp; {{ b.name }} —</p>
    <p class="made">Made with <span class="heart">♥</span> by <a href="https://github.com/ringga-dev/undangan" target="_blank">Ringga</a></p>
  </section>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const g = w.groom; const b = w.bride
</script>

<style scoped>
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; }
.closing { text-align: center; }
.closing-text { font-size: 1.15rem; line-height: 1.9; max-width: 640px; margin: 0 auto 1.5rem; }
.sign { letter-spacing: 0.2em; }
.made { opacity: 0.5; font-size: 0.8rem; margin-top: 1rem; }
.heart { color: #e25555; }
</style>
