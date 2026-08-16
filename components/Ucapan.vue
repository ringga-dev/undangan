<template>
  <section class="m-0 p-0" id="ucapan">
    <div class="container">
      <div class="border rounded-3 p-3">
        <h1 class="font-estetik text-center mb-3" style="font-size: 3rem;">Ucapan &amp; Doa</h1>
        <div class="mb-3">
          <label for="formnama" class="form-label">Nama</label>
          <input type="text" class="form-control shadow-sm" id="formnama" v-model="nama" placeholder="Isikan Nama Anda">
        </div>
        <div class="mb-3">
          <label for="hadiran" class="form-label">Kehadiran</label>
          <select class="form-select shadow-sm" aria-label="Default select example" id="hadiran" v-model="hadir">
            <option value="0" selected>Konfirmasi Kehadiran</option>
            <option value="1">Hadir</option>
            <option value="2">Berhalangan</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="formpesan" class="form-label">Ucapan &amp; Doa</label>
          <textarea class="form-control shadow-sm" id="formpesan" rows="4" v-model="komentar"
            placeholder="Tulis Ucapan & Doa"></textarea>
        </div>
        <div class="d-grid mb-2">
          <button class="btn btn-primary btn-sm rounded" @click="kirim" id="kirim">
            Kirim<i class="fa-solid fa-paper-plane ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  </section>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#111111" fill-opacity="1"
      d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,411,234.7C480,224,549,224,617,213.3C685.7,203,754,181,823,197.3C891.4,213,960,267,1029,266.7C1097.1,267,1166,213,1234,192C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
    </path>
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const config = useAppConfig().undangan

const nama = ref('')
const hadir = ref('0')
const komentar = ref('')

const hadirText = (v: string) => (v === '1' ? 'Hadir' : v === '2' ? 'Berhalangan' : 'Tanpa konfirmasi')

onMounted(() => {
  // @ts-expect-error global from CDN
  if (typeof window !== 'undefined' && window.emailjs) {
    // @ts-expect-error global from CDN
    window.emailjs.init(config.emailjs.serviceId)
  }
})

const kirim = async () => {
  if (nama.value.length === 0) { alert('nama tidak boleh kosong'); return }
  if (nama.value.length >= 35) { alert('panjangan nama maksimal 35'); return }
  if (hadir.value === '0') { alert('silahkan pilih kehadiran'); return }
  if (komentar.value.length === 0) { alert('pesan tidak boleh kosong'); return }

  const btn = document.getElementById('kirim') as HTMLButtonElement
  btn.disabled = true
  btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Loading...`

  const templateParams = {
    from_name: nama.value,
    from_email: config.emailjs.fromEmail,
    message: `nama : ${nama.value}\n${hadirText(hadir.value)}\n\n${komentar.value}`
  }

  try {
    // @ts-expect-error global from CDN
    const emailjs = window.emailjs
    if (!emailjs) throw new Error('emailjs not loaded')
    await emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, templateParams)
    alert('Pesan berhasil terkirim!')
    nama.value = ''
    hadir.value = '0'
    komentar.value = ''
  } catch (err) {
    console.error('Error:', err)
    alert('Gagal mengirim pesan, silakan coba lagi.')
  } finally {
    btn.disabled = false
    btn.innerHTML = `Kirim<i class="fa-solid fa-paper-plane ms-1"></i>`
  }
}
</script>
