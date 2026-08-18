<template>
  <section id="ucapan" data-slide>
    <div class="uc-wrap surface">
      <h2 class="uc-title">Ucapan &amp; Doa</h2>
      <p class="uc-lede">Berikan doa restu dan ucapan untuk kedua mempelai.</p>

      <div class="uc-field">
        <input type="text" v-model="nama" maxlength="35" placeholder="Nama Anda" />
      </div>
      <div class="uc-field">
        <select v-model="hadir">
          <option value="0" selected>Konfirmasi Kehadiran</option>
          <option value="1">Hadir</option>
          <option value="2">Berhalangan Hadir</option>
        </select>
      </div>
      <div class="uc-field">
        <textarea rows="4" v-model="komentar" placeholder="Tulis ucapan & doa untuk kami..."></textarea>
      </div>
      <button class="uc-btn" @click="kirimUcapan" id="kirim" :disabled="busy">
        <span v-if="busy">Mengirim...</span>
        <span v-else>Kirim <i class="fa-solid fa-paper-plane"></i></span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { WeddingProfile } from '~/composables/useWeddings'
import { useUcapan } from '~/composables/useUcapan'

const props = defineProps<{ wedding: WeddingProfile }>()
const slug = props.wedding ? (props.wedding as any).slug : ''
const { kirim } = useUcapan(slug)

const nama = ref(''); const hadir = ref('0'); const komentar = ref(''); const busy = ref(false)
const hadirText = (v: string) => (v === '1' ? 'Hadir' : v === '2' ? 'Berhalangan Hadir' : 'Tanpa konfirmasi')

const kirimUcapan = async () => {
  if (!nama.value) { alert('nama tidak boleh kosong'); return }
  if (nama.value.length >= 35) { alert('panjang nama maksimal 35'); return }
  if (hadir.value === '0') { alert('silahkan pilih kehadiran'); return }
  if (!komentar.value) { alert('pesan tidak boleh kosong'); return }
  busy.value = true
  try {
    await kirim({ slug, nama: nama.value, hadir: hadir.value, komentar: komentar.value })
    alert('Pesan berhasil terkirim!')
    nama.value = ''; hadir.value = '0'; komentar.value = ''
  } catch (e) {
    console.error(e); alert('Gagal mengirim, coba lagi.')
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
#ucapan { max-width: 880px; margin: 0 auto; padding: 5rem 1.5rem; position: relative; z-index: 2; }
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
.uc-field { margin-bottom: 1.1rem; }
.uc-field input, .uc-field select, .uc-field textarea {
  width: 100%;
  padding: 0.95rem 1.2rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--c-primary) 25%, transparent);
  background: color-mix(in srgb, var(--c-bg) 40%, transparent);
  color: var(--c-text);
  font-size: 1rem;
  font-family: inherit;
  transition: 0.25s;
  box-sizing: border-box;
}
.uc-field textarea { resize: vertical; }
.uc-field input::placeholder, .uc-field textarea::placeholder { color: color-mix(in srgb, var(--c-text) 55%, transparent); }
.uc-field input:focus, .uc-field select:focus, .uc-field textarea:focus {
  outline: none;
  border-color: var(--c-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-accent) 25%, transparent);
}
.uc-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--c-primary), var(--c-accent));
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: 0.3s;
  font-family: inherit;
}
.uc-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px color-mix(in srgb, var(--c-accent) 45%, transparent); }
.uc-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.uc-list { margin-top: 2rem; display: grid; gap: 0.9rem; }
.uc-item { padding: 1rem 1.2rem; border-radius: 14px; background: color-mix(in srgb, var(--c-bg) 45%, transparent); border: 1px solid color-mix(in srgb, var(--c-primary) 18%, transparent); }
.uc-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
.uc-name { font-weight: 700; color: var(--c-primary); }
.uc-badge { font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: color-mix(in srgb, var(--c-accent) 25%, transparent); color: var(--c-text); }
.uc-badge.h1 { background: color-mix(in srgb, #2ecc71 30%, transparent); }
.uc-badge.h2 { background: color-mix(in srgb, #e74c3c 30%, transparent); }
.uc-text { font-size: 0.92rem; opacity: 0.9; line-height: 1.5; margin: 0; }
.uc-empty { text-align: center; opacity: 0.6; margin-top: 2rem; font-size: 0.9rem; }
</style>
