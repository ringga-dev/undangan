<template>
  <div class="style-minimal deck" ref="root">
    <div class="deck-track">
      <Hero :wedding="w" />
      <Couple :wedding="w" />
      <div data-slide>
        <RichSections :wedding="w" story-title="Our Love Story" gallery-title="Galeri" />
      </div>
      <Schedule :wedding="w" />
      <Gift :wedding="w" />
      <div data-slide><Ucapan :wedding="w" /></div>
      <Closing :wedding="w" />
    </div>

    <MusicButton :src="w.music" />
    <OpeningModal :open="open" :wedding="w" :guest="guest" @buka="onBuka" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import Hero from '~/components/styles/minimal/Hero.vue'
import Couple from '~/components/styles/minimal/Couple.vue'
import Schedule from '~/components/styles/minimal/Schedule.vue'
import Gift from '~/components/styles/minimal/Gift.vue'
import Closing from '~/components/styles/minimal/Closing.vue'
import RichSections from '~/components/RichSections.vue'
import Ucapan from '~/components/Ucapan.vue'
import MusicButton from '~/components/MusicButton.vue'
import OpeningModal from '~/components/OpeningModal.vue'
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
const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }
const deck = useDeck(() => root.value)

const magnetic = (e: MouseEvent) => { const t = e.currentTarget as HTMLElement; const r = t.getBoundingClientRect(); gsap.to(t, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 }) }
const magneticOut = (e: MouseEvent) => gsap.to(e.currentTarget as HTMLElement, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' })

onMounted(() => {
  root.value?.querySelectorAll<HTMLElement>('.magnetic').forEach(el => { el.addEventListener('mousemove', magnetic); el.addEventListener('mouseleave', magneticOut) })
  useReveal(() => root.value)
})
onUnmounted(() => {
  root.value?.querySelectorAll<HTMLElement>('.magnetic').forEach(el => { el.removeEventListener('mousemove', magnetic); el.removeEventListener('mouseleave', magneticOut) })
})
</script>

<style scoped>
.style-minimal { font-family: 'Inter', system-ui, sans-serif; background: var(--c-bg); color: var(--c-text); overflow: hidden; }
</style>
