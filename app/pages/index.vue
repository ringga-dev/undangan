<template>
  <div v-if="w">
    <StyleElegant v-if="activeStyle === 'elegant'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleFloral v-else-if="activeStyle === 'floral'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleMinimal v-else-if="activeStyle === 'minimal'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleRustic v-else-if="activeStyle === 'rustic'" :key="activeStyle" :wedding="w" @ready="onReady" />
    <StyleModern v-else :key="activeStyle" :wedding="w" @ready="onReady" />
  </div>
  <div v-else class="text-center py-5"><p>Memuat undangan...</p></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from '#imports'
import StyleElegant from '~/components/styles/StyleElegant.vue'
import StyleFloral from '~/components/styles/StyleFloral.vue'
import StyleMinimal from '~/components/styles/StyleMinimal.vue'
import StyleRustic from '~/components/styles/StyleRustic.vue'
import StyleModern from '~/components/styles/StyleModern.vue'
import { useWeddings, type WeddingProfile } from '~/composables/useWeddings'
import { useActiveTheme } from '~/composables/useActiveTheme'
import { useActiveWedding } from '~/composables/useActiveWedding'
import { useThemeEngine } from '~/composables/useThemeEngine'

const route = useRoute()
const { profiles, defaultProfile } = useWeddings()
const active = useActiveTheme()
const weddingState = useActiveWedding()
const { apply } = useThemeEngine()

const w = ref<WeddingProfile | null>(null)
const activeStyle = ref(active.styleId.value)

const applyProfile = (to?: string) => {
  const slug = (to || '').toString()
  const prof = profiles[slug] ? profiles[slug] : defaultProfile()
  weddingState.setSlug(profiles[slug] ? slug : '')
  w.value = prof
  active.styleId.value = prof.style || 'elegant'
  active.themeId.value = prof.theme || 'emerald'
  activeStyle.value = active.styleId.value
  apply(active.styleId.value, active.themeId.value)
}

// React to ?to= (works on first client load and on client-side nav)
watch(() => route.query.to, (to) => applyProfile(to as string), { immediate: true })

// When user switches style via switcher -> swap component live
watch(() => active.styleId.value, (s) => { activeStyle.value = s; apply(s, active.themeId.value) })
// When user switches color -> recolor
watch(() => active.themeId.value, (t) => apply(activeStyle.value, t))

function onReady() {}
</script>
