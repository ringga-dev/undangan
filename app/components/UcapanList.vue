<template>
  <section id="ucapan-list" data-slide>
    <div class="uc-wrap surface">
      <h2 class="uc-title">Doa &amp; Ucapan</h2>
      <p class="uc-lede">Ucapan dari keluarga &amp; sahabat.</p>

      <div class="uc-list" v-if="list.length">
        <div class="uc-item" v-for="(u, i) in shown" :key="i">
          <div class="uc-meta">
            <span class="uc-name">{{ u.nama }}</span>
            <span class="uc-badge" :class="'h' + u.hadir">{{ hadirText(u.hadir) }}</span>
          </div>
          <p class="uc-text">{{ u.komentar }}</p>
        </div>
      </div>
      <p class="uc-empty" v-else-if="!loading">Belum ada ucapan. Jadilah yang pertama!</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '#imports'
import type { WeddingProfile } from '~/composables/useWeddings'
import { useUcapan } from '~/composables/useUcapan'

const props = defineProps<{ wedding: WeddingProfile }>()
const route = useRoute()
const slug = (route.params.slug || '').toString()
const { list, loading, load } = useUcapan(slug)

const hadirText = (v: string) => (v === '1' ? 'Hadir' : v === '2' ? 'Berhalangan Hadir' : 'Tanpa konfirmasi')
const shown = computed(() => list.value.slice(0, 4))

onMounted(load)
</script>

<style scoped>
#ucapan-list { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
.uc-wrap {
  padding: 2.5rem 2rem;
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--c-primary) 35%, transparent);
  background: color-mix(in srgb, var(--c-surface) 55%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.25);
}
.uc-title { font-family: var(--font-heading), serif; text-align: center; font-size: clamp(1.8rem,5vw,2.6rem); color: var(--c-primary); margin-bottom: 0.4rem; }
.uc-lede { text-align: center; opacity: 0.8; margin-bottom: 2rem; font-size: 0.95rem; }
.uc-list { display: grid; gap: 0.9rem; }
.uc-item { padding: 1rem 1.2rem; border-radius: 14px; background: color-mix(in srgb, var(--c-bg) 45%, transparent); border: 1px solid color-mix(in srgb, var(--c-primary) 18%, transparent); }
.uc-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
.uc-name { font-weight: 700; color: var(--c-primary); }
.uc-badge { font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: color-mix(in srgb, var(--c-accent) 25%, transparent); color: var(--c-text); }
.uc-badge.h1 { background: color-mix(in srgb, #2ecc71 30%, transparent); }
.uc-badge.h2 { background: color-mix(in srgb, #e74c3c 30%, transparent); }
.uc-text { font-size: 0.92rem; opacity: 0.9; line-height: 1.5; margin: 0; }
.uc-empty { text-align: center; opacity: 0.6; margin-top: 1rem; font-size: 0.9rem; }
</style>
