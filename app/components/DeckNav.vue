<template>
  <div class="deck-nav">
    <button class="deck-arrow" :disabled="idx <= 0" aria-label="Sebelumnya" @click="$emit('prev')">
      <i class="fa-solid fa-chevron-up"></i>
    </button>
    <div class="deck-dots">
      <button
        v-for="n in count"
        :key="n"
        class="deck-dot"
        :class="{ on: n - 1 === idx }"
        :aria-label="'Ke bagian ' + n"
        @click="$emit('go', n - 1)"
      ></button>
    </div>
    <button class="deck-arrow" :disabled="idx >= count - 1" aria-label="Berikutnya" @click="$emit('next')">
      <i class="fa-solid fa-chevron-down"></i>
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
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.deck-arrow {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--c-primary, #d4af37);
  background: color-mix(in srgb, var(--c-surface, #000) 55%, transparent);
  color: var(--c-primary, #d4af37);
  cursor: pointer;
  display: grid;
  place-items: center;
  backdrop-filter: blur(4px);
  transition: opacity 0.25s, transform 0.25s;
}
.deck-arrow:disabled { opacity: 0.25; cursor: default; }
.deck-arrow:not(:disabled):hover { transform: scale(1.1); }
.deck-dots { display: flex; flex-direction: column; gap: 9px; align-items: center; }
.deck-dot {
  width: 9px; height: 9px; border-radius: 50%;
  border: none; padding: 0; cursor: pointer;
  background: color-mix(in srgb, var(--c-primary, #d4af37) 30%, transparent);
  transition: all 0.3s;
}
.deck-dot.on {
  background: var(--c-primary, #d4af37);
  height: 22px; border-radius: 5px;
  box-shadow: 0 0 8px color-mix(in srgb, var(--c-primary, #d4af37) 60%, transparent);
}
</style>
