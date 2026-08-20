<template>
  <div class="deck-nav">
    <button class="deck-btn" :disabled="idx <= 0" aria-label="Back" @click="$emit('prev')">
      <i class="fa-solid fa-chevron-left"></i>
      <span>Back</span>
    </button>
    <span class="deck-page" aria-live="polite">{{ idx + 1 }} / {{ count }}</span>
    <button class="deck-btn" :disabled="idx >= count - 1" aria-label="Next" @click="$emit('next')">
      <span>Next</span>
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ idx: number; count: number }>()
defineEmits<{ (e: 'go', i: number): void; (e: 'next'): void; (e: 'prev'): void }>()
</script>

<style scoped>
.deck-nav {
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--c-primary, #d4af37) 35%, transparent);
  background: color-mix(in srgb, var(--c-surface, #000) 45%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 34px rgba(0, 0, 0, 0.35);
}
.deck-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--c-primary, #d4af37);
  cursor: pointer;
  padding: 7px 14px;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  transition: background 0.25s, transform 0.25s, opacity 0.25s;
}
.deck-btn:disabled { opacity: 0.28; cursor: default; }
.deck-btn:not(:disabled):hover { background: color-mix(in srgb, var(--c-primary, #d4af37) 18%, transparent); transform: scale(1.05); }
.deck-page {
  min-width: 48px;
  text-align: center;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  color: var(--c-text, #fff);
  opacity: 0.92;
  font-variant-numeric: tabular-nums;
  padding: 0 4px;
}
@media (max-width: 600px) {
  .deck-nav { bottom: 14px; padding: 6px 8px; gap: 4px; }
  .deck-btn { padding: 6px 12px; font-size: 0.78rem; }
  .deck-page { min-width: 42px; font-size: 0.78rem; }
}
</style>
