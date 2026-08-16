<template>
  <div class="theme-switcher">
    <button class="ts-toggle" @click="toggle" title="Ganti Tema">
      <i class="fa-solid fa-palette"></i>
    </button>
    <div v-if="open" class="ts-panel surface" ref="panel">
      <div class="ts-row" v-for="st in styles" :key="st.id">
        <div class="ts-style">{{ st.name }}</div>
        <div class="ts-themes">
          <button
            v-for="t in st.themes"
            :key="t.id"
            class="ts-dot"
            :style="{ background: t.colors[2] }"
            :class="{ active: st.id === activeStyleVal && t.id === activeThemeVal }"
            :title="t.name"
            @click.stop="select(st.id, t.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeEngine } from '~/composables/useThemeEngine'
import { useActiveTheme } from '~/composables/useActiveTheme'

const { styles, apply } = useThemeEngine()
const active = useActiveTheme()
const open = ref(false)
const panel = ref<HTMLElement | null>(null)

const activeStyleVal = computed(() => active.styleId.value)
const activeThemeVal = computed(() => active.themeId.value)

const toggle = (e: Event) => { e.stopPropagation(); open.value = !open.value }

const select = (styleId: string, themeId: string) => {
  if (styleId !== active.styleId.value) {
    // Template berubah -> route page akan navigate ke URL style baru
    active.styleId.value = styleId
    active.themeId.value = themeId
  } else {
    // Template sama -> recolor langsung
    active.themeId.value = themeId
    apply(styleId, themeId)
  }
  open.value = false
}

const onDoc = (e: Event) => {
  if (open.value && panel.value && !panel.value.contains(e.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onDoc))
onUnmounted(() => document.removeEventListener('click', onDoc))
</script>

<style scoped>
.theme-switcher { position: fixed; top: 2vh; right: 2vh; z-index: 1060; }
.ts-toggle { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--c-text); background: var(--c-surface); color: var(--c-text); cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.3); }
.ts-panel { margin-top: .5rem; padding: .75rem; border-radius: var(--radius); border: 1px solid rgba(128,128,128,.3); width: 220px; box-shadow: 0 10px 30px rgba(0,0,0,.35); }
.ts-row { display: flex; align-items: center; justify-content: space-between; margin: .35rem 0; }
.ts-style { font-size: .8rem; }
.ts-themes { display: flex; gap: .35rem; }
.ts-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; }
.ts-dot.active { border-color: var(--c-text); transform: scale(1.15); }
</style>
