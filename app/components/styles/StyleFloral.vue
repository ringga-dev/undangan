<template>
  <div class="style-floral deck" ref="root">
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
import Hero from '~/components/styles/floral/Hero.vue'
import Couple from '~/components/styles/floral/Couple.vue'
import Schedule from '~/components/styles/floral/Schedule.vue'
import Gift from '~/components/styles/floral/Gift.vue'
import Closing from '~/components/styles/floral/Closing.vue'
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

const onMove = (e: MouseEvent) => {
  if (!root.value) return
  const rx = (e.clientY / innerHeight - 0.5) * -8, ry = (e.clientX / innerWidth - 0.5) * 8
  root.value.querySelectorAll<HTMLElement>('.tilt').forEach(el =>
    gsap.to(el, { rotateX: rx * parseFloat(el.dataset.depth || '0.2'), rotateY: ry * parseFloat(el.dataset.depth || '0.2'), duration: 0.6 }))
}

onMounted(() => { addEventListener('mousemove', onMove); useReveal(() => root.value) })
onUnmounted(() => removeEventListener('mousemove', onMove))
</script>

<style scoped>
.style-floral { font-family: 'Playfair Display', Georgia, serif; background: var(--c-bg); color: var(--c-text); overflow: hidden; position: relative; }
</style>
