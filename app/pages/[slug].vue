<template>
  <div v-if="w">
    <StyleElegant v-if="activeStyle === 'elegant'" :key="activeStyle" :wedding="w" :guest="guest" @ready="onReady" />
    <StyleFloral v-else-if="activeStyle === 'floral'" :key="activeStyle" :wedding="w" :guest="guest" @ready="onReady" />
    <StyleMinimal v-else-if="activeStyle === 'minimal'" :key="activeStyle" :wedding="w" :guest="guest" @ready="onReady" />
    <StyleRustic v-else-if="activeStyle === 'rustic'" :key="activeStyle" :wedding="w" :guest="guest" @ready="onReady" />
    <StyleModern v-else :key="activeStyle" :wedding="w" :guest="guest" @ready="onReady" />
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

// Guest name parsed on client (so literal "&" in the name is preserved).
// ?to=any&yanto  ->  "any&yanto"   (yanto has no "=", so it stays part of to)
const guest = ref('')
onMounted(() => {
  const s = window.location.search
  const m = s.match(/[?&]to=(.*?)(?=&[a-zA-Z0-9_]+=|$)/)
  if (m) guest.value = decodeURIComponent(m[1]).replace(/\+/g, ' ')
})

const prof = profiles[slug] as WeddingProfile | undefined

if (!prof) {
  // unknown couple -> back to landing
  if (process.client) router.replace('/')
}

const w = ref<WeddingProfile | null>(prof || null)
const activeStyle = ref(prof?.style || 'elegant')

if (prof) {
  active.styleId.value = prof.style || 'elegant'
  active.themeId.value = (prof as any).color || prof.theme || 'emerald'
  activeStyle.value = active.styleId.value
  apply(active.styleId.value, active.themeId.value)
}

function onReady() {}
</script>
