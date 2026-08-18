<template>
  <section id="ucapan">
    <div class="uc-wrap surface">
      <h2 class="uc-title">Ucapan &amp; Doa</h2>
      <p class="uc-lede">Berikan doa restu dan ucapan untuk kedua mempelai.</p>
      <div class="uc-field">
        <input type="text" v-model="nama" placeholder="Nama Anda" />
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
      <button class="uc-btn" @click="kirim" id="kirim">
        Kirim <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { WeddingProfile } from '~/composables/useWeddings'

const props = defineProps<{ wedding: WeddingProfile }>()
const nama = ref(''); const hadir = ref('0'); const komentar = ref('')
const hadirText = (v: string) => (v === '1' ? 'Hadir' : v === '2' ? 'Berhalangan Hadir' : 'Tanpa konfirmasi')

onMounted(() => {
  // @ts-expect-error
  if (typeof window !== 'undefined' && window.emailjs) window.emailjs.init(props.wedding.emailjs.serviceId)
})

const kirim = async () => {
  if (!nama.value) { alert('nama tidak boleh kosong'); return }
  if (nama.value.length >= 35) { alert('panjang nama maksimal 35'); return }
  if (hadir.value === '0') { alert('silahkan pilih kehadiran'); return }
  if (!komentar.value) { alert('pesan tidak boleh kosong'); return }
  const btn = document.getElementById('kirim') as HTMLButtonElement
  btn.disabled = true
  btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Loading...`
  const params = { from_name: nama.value, from_email: props.wedding.emailjs.fromEmail, message: `nama : ${nama.value}\n${hadirText(hadir.value)}\n\n${komentar.value}` }
  try {
    // @ts-expect-error
    const emailjs = window.emailjs
    if (!emailjs) throw new Error('emailjs not loaded')
    await emailjs.send(props.wedding.emailjs.serviceId, props.wedding.emailjs.templateId, params)
    alert('Pesan berhasil terkirim!')
    nama.value = ''; hadir.value = '0'; komentar.value = ''
  } catch (e) { console.error(e); alert('Gagal mengirim, coba lagi.') }
  finally { btn.disabled = false; btn.innerHTML = `Kirim<i class="fa-solid fa-paper-plane"></i>` }
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
</style>
