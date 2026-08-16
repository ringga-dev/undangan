<template>
  <div v-if="wedding">
    <component
      :is="styleComponent"
      :wedding="wedding"
      :couple="couple"
      :style-id="activeStyle"
      @ready="onReady"
    />
  </div>
  <div v-else class="text-center py-5">
    <p>Undangan tidak ditemukan.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
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
const props = defineProps<{ couple: string; style: string }>()
const { findByCouple } = useWeddings()
const active = useActiveTheme()
const { apply } = useThemeEngine()

const raw = props.couple ? decodeURIComponent(props.couple) : ''
const parts = raw.split('&').map((s) => s.trim())
const groom = parts[0] || ''
const bride = parts[1] || ''
const wedding = ref<WeddingProfile | null>(findByCouple(groom, bride))

const activeStyle = ref(props.style)
const styleMap: Record<string, any> = {
  elegant: StyleElegant,
  floral: StyleFloral,
  minimal: StyleMinimal,
  rustic: StyleRustic,
  modern: StyleModern
}
const styleComponent = computed(() => styleMap[activeStyle.value] || StyleElegant)

// When user picks a different TEMPLATE in the switcher, navigate to that URL
// so the correct template component is mounted (not just recolored).
watch(
  () => active.styleId.value,
  (next) => {
    if (next !== activeStyle.value) {
      const slug = `${encodeURIComponent(groom)}&${encodeURIComponent(bride)}`
      router.push(`/${slug}/${next}`)
    }
  }
)

onMounted(() => {
  active.styleId.value = props.style
  active.themeId.value = active.themeId.value || 'emerald'
  apply(activeStyle.value, active.themeId.value)
})

function onReady() {}
</script>
