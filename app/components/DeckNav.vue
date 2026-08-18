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
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
}
.deck-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid var(--c-primary, #d4af37);
  background: color-mix(in srgb, var(--c-surface, #000) 55%, transparent);
  color: var(--c-primary, #d4af37);
  cursor: pointer;
  padding: 7px 14px;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  backdrop-filter: blur(4px);
  transition: opacity 0.25s, transform 0.25s;
}
.deck-btn:disabled { opacity: 0.28; cursor: default; }
.deck-btn:not(:disabled):hover { transform: scale(1.06); }
.deck-page {
  min-width: 46px;
  text-align: center;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: var(--c-primary, #d4af37);
  opacity: 0.9;
  font-variant-numeric: tabular-nums;
}
@media (max-width: 600px) {
  .deck-nav { bottom: 10px; gap: 10px; }
  .deck-btn { padding: 6px 11px; font-size: 0.76rem; }
  .deck-page { min-width: 40px; font-size: 0.76rem; }
}
</style>
