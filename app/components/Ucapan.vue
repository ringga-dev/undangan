<template>
  <section class="m-0 p-0" id="ucapan">
    <div class="container">
      <div class="border rounded-3 p-3 surface">
        <h2 class="font-estetik text-center mb-3" style="font-size:2.4rem;">Ucapan &amp; Doa</h2>
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input type="text" class="form-control shadow-sm" v-model="nama" placeholder="Isikan Nama Anda">
        </div>
        <div class="mb-3">
          <label class="form-label">Kehadiran</label>
          <select class="form-select shadow-sm" v-model="hadir">
            <option value="0" selected>Konfirmasi Kehadiran</option>
            <option value="1">Hadir</option>
            <option value="2">Berhalangan</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Ucapan &amp; Doa</label>
          <textarea class="form-control shadow-sm" rows="4" v-model="komentar" placeholder="Tulis Ucapan & Doa"></textarea>
        </div>
        <div class="d-grid mb-2">
          <button class="btn btn-brand btn-sm rounded" @click="kirim" id="kirim">
            Kirim<i class="fa-solid fa-paper-plane ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { WeddingProfile } from '~/composables/useWeddings'

const props = defineProps<{ wedding: WeddingProfile }>()
const nama = ref(''); const hadir = ref('0'); const komentar = ref('')
const hadirText = (v: string) => (v === '1' ? 'Hadir' : v === '2' ? 'Berhalangan' : 'Tanpa konfirmasi')

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
  finally { btn.disabled = false; btn.innerHTML = `Kirim<i class="fa-solid fa-paper-plane ms-1"></i>` }
}
</script>
