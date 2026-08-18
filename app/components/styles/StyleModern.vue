<template>
  <div class="style-modern deck" ref="root">
    <canvas ref="bg" class="bg3d"></canvas>
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
    <OpeningModal v-if="w && open" @buka="onBuka" :wedding="w" :guest="guest" />
    <DeckNav :idx="deck.idx.value" :count="deck.count.value" @go="deck.go" @next="deck.next" @prev="deck.prev" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import Hero from '~/components/styles/modern/Hero.vue'
import Couple from '~/components/styles/modern/Couple.vue'
import Schedule from '~/components/styles/modern/Schedule.vue'
import Gift from '~/components/styles/modern/Gift.vue'
import Closing from '~/components/styles/modern/Closing.vue'
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
const bg = ref<HTMLCanvasElement | null>(null)
const root = ref<HTMLElement | null>(null)
const onBuka = () => { open.value = false; markOpened(); useAudio(w.music)?.play().catch(() => {}) }
const deck = useDeck(() => root.value)

type C = { x: number; y: number; vx: number; vy: number; r: number }
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let parts: C[] = []
let W = 0, H = 0
const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--c-accent').trim() || '#22d3ee'

onMounted(() => {
  if (!bg.value) return
  const canvas = bg.value
  ctx = canvas.getContext('2d')
  const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
  resize()
  parts = Array.from({ length: 60 }, () => ({
    x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 3 + 1
  }))
  const draw = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)
    const col = accent()
    parts.forEach((p) => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
      ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx!.fillStyle = col; ctx!.globalAlpha = 0.5; ctx!.fill()
    })
    for (let a = 0; a < parts.length; a++) for (let b2 = a + 1; b2 < parts.length; b2++) {
      const dx = parts[a].x - parts[b2].x, dy = parts[a].y - parts[b2].y
      if (Math.hypot(dx, dy) < 120) { ctx!.beginPath(); ctx!.moveTo(parts[a].x, parts[a].y); ctx!.lineTo(parts[b2].x, parts[b2].y); ctx!.strokeStyle = col; ctx!.globalAlpha = 0.12; ctx!.stroke() }
    }
    raf = requestAnimationFrame(draw)
  }
  draw()
  window.addEventListener('resize', resize)
  gsap.from('.style-modern .text > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' })
  useReveal(() => root.value)
  const onMove = (e: MouseEvent) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2
    root.value?.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
      const d = parseFloat(el.dataset.depth || '0.1')
      gsap.to(el, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 0.6, ease: 'power2.out' })
    })
  }
  window.addEventListener('mousemove', onMove)
  onUnmounted(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove) })
})
</script>

<style scoped>
.style-modern { font-family: 'Space Grotesk', sans-serif; background: var(--c-bg); color: var(--c-text); overflow: hidden; position: relative; }
.bg3d { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 5; pointer-events: none; opacity: 0.4; }
</style>
