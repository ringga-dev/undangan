<template>
  <section class="block surface reveal" id="hadiah" data-slide>
    <h2 class="heading">Love &amp; Gift</h2>
    <p class="lede">{{ w.giftNote }}</p>
    <div class="gifts">
      <div class="gift tilt" data-depth="0.12" v-for="gift in w.gifts" :key="gift.bank">
        <img :src="gift.logo" :alt="gift.bank" />
        <p><b>{{ gift.bank }}</b> · {{ gift.name }}</p>
        <p class="norek">{{ gift.norek }}</p>
        <button class="copy" @click="copy(gift.norek)"><i class="fa-regular fa-copy"></i> Salin</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const copy = (t: string) => navigator.clipboard?.writeText(t)
</script>

<style scoped>
.block { text-align: center; max-width: 46rem; margin: 0 auto; padding: 6vh 1rem; position: relative; z-index: 1; }
.heading { font-family: var(--font-heading), serif; text-decoration: underline wavy var(--c-accent); text-underline-offset: 6px; margin-bottom: 1.2rem; font-size: clamp(2rem,5vw,3rem); }
.lede { opacity: 0.9; max-width: 32rem; margin: 0 auto 1.5rem; }
.gifts { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
.gift { background: var(--c-surface); border-radius: var(--radius); border: 3px solid var(--c-primary); width: 16rem; padding: 1.5rem; }
.gift img { height: auto; max-width: 130px; }
.copy { background: var(--c-primary); color: #fff; cursor: pointer; border: none; border-radius: var(--radius); margin-top: 0.5rem; padding: 0.4rem 1rem; }
</style>
