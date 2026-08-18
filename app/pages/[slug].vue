<template>
  <div v-if="w">
    <StyleElegant v-if="activeStyle === 'elegant'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleFloral v-else-if="activeStyle === 'floral'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleMinimal v-else-if="activeStyle === 'minimal'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleRustic v-else-if="activeStyle === 'rustic'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleModern v-else :key="activeStyle" :wedding="w" @ready="onReady" />
  </div>
  <div v-else class="text-center py-5">
    <p class="mb-3">Undangan tidak ditemukan.</p>
    <NuxtLink to="/" class="btn btn-brand">Kembali ke beranda</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#imports'
import StyleElegant from '~/components/styles/StyleElegant.vue'
import StyleFloral from '~/components/styles/StyleFloral.vue'
import StyleMinimal from '~/components/styles/StyleMinimal.vue'
import StyleRustic from '~/components/styles/StyleRustic.vue'
import StyleModern from '~/components/styles/StyleModern.vue'
import { useWeddings, type WeddingProfile } from '~/composables/useWeddings'
import { useActiveTheme } from '~/composables/useActiveTheme'
import { useThemeEngine } from '~/composables/useThemeEngine'

const route = useRoute()
const router = useRouter()
const { profiles } = useWeddings()
const active = useActiveTheme()
const { apply } = useThemeEngine()

const slug = (route.params.slug || '').toString()

const getPreviewStyleTheme = () => {
  const raw = typeof window !== 'undefined' ? window.location.href : ''
  const s = raw.match(/[?&]style=([a-z]+)/)
  const t = raw.match(/[?&]theme=([a-z]+)/)
  return { style: s ? s[1] : '', theme: t ? t[1] : '' }
}

const prof = profiles[slug] as WeddingProfile | undefined

if (!prof) {
  // unknown couple -> back to landing
  if (process.client) router.replace('/')
}

const w = ref<WeddingProfile | null>(prof || null)
const activeStyle = ref(prof?.style || 'elegant')

const applyFromProf = () => {
  if (!prof) return
  const pv = getPreviewStyleTheme()
  const style = pv.style || prof.style || 'elegant'
  const theme = pv.theme || (prof as any).color || prof.theme || 'emerald'
  active.styleId.value = style
  active.themeId.value = theme
  activeStyle.value = style
  apply(style, theme)
}

if (prof) {
  applyFromProf()
  onMounted(applyFromProf)
  // GH Pages SPA: query settles a tick after router init — retry
  setTimeout(applyFromProf, 600)
}

function onReady() {}
</script>
