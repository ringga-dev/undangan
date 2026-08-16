<template>
  <div>
    <ThemeSwitcher />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
import { useActiveTheme } from '~/composables/useActiveTheme'
import { useThemeEngine } from '~/composables/useThemeEngine'

const active = useActiveTheme()
const { apply } = useThemeEngine()

const sync = () => apply(active.styleId.value, active.themeId.value)
onMounted(sync)
watch(() => [active.styleId.value, active.themeId.value], sync)
</script>
