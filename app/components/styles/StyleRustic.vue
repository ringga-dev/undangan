<template>
  <div class="style-rustic deck" ref="root">
    <img class="illu grain" :src="illu" alt="" />
    <div class="deck-track">
      <Hero :wedding="w" />
      <Couple :wedding="w" side="groom" />
      <Couple :wedding="w" side="bride" />
      <div data-slide>
        <RichSections :wedding="w" story-title="Our Love Story" gallery-title="Galeri" />
      </div>
      <Schedule :wedding="w" />
      <Gift :wedding="w" />
      <div data-slide><Ucapan :wedding="w" /></div>
      <Closing :wedding="w" />
    </div>

    <MusicButton :src="w.music" />
    <OpeningModal v-if="w && open" @buka="onBuka" :wedding="w" :guest="guest" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import Hero from '~/components/styles/rustic/Hero.vue'
import Couple from '~/components/styles/rustic/Couple.vue'
import Schedule from '~/components/styles/rustic/Schedule.vue'
import Gift from '~/components/styles/rustic/Gift.vue'
import Closing from '~/components/styles/rustic/Closing.vue'
import RichSections from '~/components/RichSections.vue'
import Ucapan from '~/components/Ucapan.vue'
import MusicButton from '~/components/MusicButton.vue'
import OpeningModal from '~/components/OpeningModal.vue'
import { useAsset } from '~/composables/useAsset'
import { useGuest } from '~/composables/useGuest'
import { useDeck } from '~/composables/useDeck'
import { useInvitationOpen } from '~/composables/useInvitationOpen'
import { useReveal } from '~/composables/useReveal'
import { useAudio } from '~/composables/useAudio'

const props = defineProps<{ wedding: any }>()
const w = props.wedding
const guest = useGuest()
const { opened, markOpened } = useInvitationOpen()
const open = ref(opened.value === false)
const root = ref<HTMLElement | null>(null)
const illu = useAsset('images/illu/rustic.png')
const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }
const deck = useDeck(() => root.value)

const onMove = (e: MouseEvent) => {
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2
  root.value?.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
    const d = parseFloat(el.dataset.depth || '0.1')
    gsap.to(el, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 0.6, ease: 'power2.out' })
  })
}
onMounted(() => { gsap.from('.style-rustic .hero .grid2', { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out' }); window.addEventListener('mousemove', onMove); useReveal(() => root.value) })
onUnmounted(() => window.removeEventListener('mousemove', onMove))
</script>

<style scoped>
.style-rustic { background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0 10px, transparent 10px 20px); font-family: 'Lora', Georgia, serif; color: var(--c-text); overflow: hidden; position: relative; }
.illu.grain { position: fixed; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.08; mix-blend-mode: multiply; pointer-events: none; z-index: 0; }
</style>
