<template>
  <div v-if="wedding">
    <ThemeSwitcher />
    <component
      :is="styleComponent"
      :wedding="wedding"
      :couple="couple"
      :style-id="styleId"
      @ready="onReady"
    />
  </div>
  <div v-else class="text-center py-5">
    <p>Undangan tidak ditemukan.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
import StyleElegant from '~/components/styles/StyleElegant.vue'
import StyleFloral from '~/components/styles/StyleFloral.vue'
import StyleMinimal from '~/components/styles/StyleMinimal.vue'
import StyleRustic from '~/components/styles/StyleRustic.vue'
import StyleModern from '~/components/styles/StyleModern.vue'
import { useWeddings, type WeddingProfile } from '~/composables/useWeddings'
import { useActiveTheme } from '~/composables/useActiveTheme'
import { useThemeEngine } from '~/composables/useThemeEngine'

const props = defineProps<{ couple: string; style: string }>()
const { findByCouple } = useWeddings()
const active = useActiveTheme()
const { apply } = useThemeEngine()

const raw = props.couple ? decodeURIComponent(props.couple) : ''
const parts = raw.split('&').map((s) => s.trim())
const groom = parts[0] || ''
const bride = parts[1] || ''
const wedding = ref<WeddingProfile | null>(findByCouple(groom, bride))
const styleId = ref(props.style)

const styleMap: Record<string, any> = {
  elegant: StyleElegant,
  floral: StyleFloral,
  minimal: StyleMinimal,
  rustic: StyleRustic,
  modern: StyleModern
}
const styleComponent = computed(() => styleMap[styleId.value] || StyleElegant)

watch(styleId, (v) => { active.styleId.value = v; apply(v, active.themeId.value) })
onMounted(() => { active.styleId.value = styleId.value; apply(styleId.value, active.themeId.value) })

function onReady() {}
</script>
