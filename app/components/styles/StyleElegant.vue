<template>
  <div class="style-elegant deck" ref="root">
    <div class="deck-track">
      <Hero :wedding="w" />
      <Couple :wedding="w" />
      <Story :wedding="w" />
      <Gallery :wedding="w" />
      <Schedule :wedding="w" />
      <Gift :wedding="w" />
      <UcapanSection :wedding="w" />
      <Closing :wedding="w" />
    </div>

    <MusicButton :src="w.music" />
    <OpeningModal :open="open" :wedding="w" :guest="guest" @buka="onBuka" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Hero from '~/components/styles/elegant/Hero.vue'
import Couple from '~/components/styles/elegant/Couple.vue'
import Story from '~/components/styles/elegant/Story.vue'
import Gallery from '~/components/styles/elegant/Gallery.vue'
import Schedule from '~/components/styles/elegant/Schedule.vue'
import Gift from '~/components/styles/elegant/Gift.vue'
import UcapanSection from '~/components/styles/elegant/UcapanSection.vue'
import Closing from '~/components/styles/elegant/Closing.vue'
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

import { onMounted } from 'vue'
onMounted(() => { useReveal(() => root.value) })
</script>

<style scoped>
.style-elegant {
  --gold: #d4af37;
  font-family: 'Cormorant Garamond', Georgia, serif;
  background: radial-gradient(circle at 50% 0%, #14271f, var(--c-bg));
  color: var(--c-text);
  overflow-x: hidden;
  position: relative;
}
</style>
