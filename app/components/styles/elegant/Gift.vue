<template>
  <section class="surface block reveal" id="hadiah" data-slide>
    <h2 class="heading gold">Love &amp; Gift</h2>
    <p class="lede">Doa restu Anda adalah hadiah terindah. Jika berkenan memberi tanda kasih:</p>
    <div class="gifts">
      <div v-for="(gft, i) in w.gifts" :key="i" class="gift tilt" data-depth="0.15">
        <img class="bank" :src="gft.logo" :alt="gft.bank" />
        <p><b>{{ gft.bank }}</b> · {{ gft.nama }}</p>
        <p class="norek">{{ gft.norek }}</p>
        <button class="copy" @click="salin($event, gft.norek)"><i class="fa-regular fa-copy"></i> Salin</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WeddingProfile } from '~/composables/useWeddings'
const props = defineProps<{ wedding: WeddingProfile }>()
const w = props.wedding
const salin = async (e: Event, n: string) => {
  const btn = e.currentTarget as HTMLButtonElement
  try { await navigator.clipboard.writeText(n) } catch {}
  btn.textContent = 'Tersalin!'
  setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Salin' }, 1500)
}
</script>

<style scoped>
.block { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.heading { font-size: clamp(1.8rem, 5vw, 2.6rem); text-align: center; margin-bottom: 1rem; }
.gold { color: var(--gold); text-shadow: 0 2px 20px rgba(212,175,55,0.3); }
.lede { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; opacity: 0.85; line-height: 1.7; }
.gifts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
.gift { padding: 1.6rem; border-radius: 18px; border: 1px solid rgba(212,175,55,0.25); background: rgba(255,255,255,0.03); text-align: center; }
.bank { height: 36px; margin-bottom: 0.8rem; }
.norek { font-family: monospace; letter-spacing: 0.1em; color: var(--gold); }
.copy { margin-top: 0.8rem; padding: 0.4rem 1rem; border-radius: 999px; border: 1px solid var(--gold); background: transparent; color: var(--gold); cursor: pointer; }
</style>
