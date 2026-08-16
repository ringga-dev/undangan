<template>
  <div v-if="w">
    <component :is="styleComponent" :wedding="w" @ready="onReady" />
  </div>
  <div v-else class="text-center py-5"><p>Memuat undangan...</p></div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
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

const styleMap: Record<string, any> = {
  elegant: StyleElegant,
  floral: StyleFloral,
  minimal: StyleMinimal,
  rustic: StyleRustic,
  modern: StyleModern
}

const w = ref<WeddingProfile | null>(null)
const activeStyle = ref(active.styleId.value)
const styleComponent = computed(() => styleMap[activeStyle.value] || StyleElegant)

onMounted(() => {
  // Pick profile from ?to=slug (safe query, no '&' in path)
  const q = (route.query.to as string) || ''
  const prof = profiles[q] ? profiles[q] : defaultProfile()
  weddingState.setSlug(profiles[q] ? q : '')
  w.value = prof
  // Sync style/theme from the chosen profile
  active.styleId.value = prof.style || 'elegant'
  active.themeId.value = prof.theme || 'emerald'
  activeStyle.value = active.styleId.value
  apply(active.styleId.value, active.themeId.value)
})

// When user switches style via switcher -> swap component live
watch(() => active.styleId.value, (s) => { activeStyle.value = s; apply(s, active.themeId.value) })
// When user switches color -> recolor
watch(() => active.themeId.value, (t) => apply(activeStyle.value, t))

function onReady() {}
</script>
