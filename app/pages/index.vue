<template>
  <div class="landing">
    <section class="hero">
      <div class="hero-inner">
        <p class="eyebrow">UNDANGAN DIGITAL · GRATIS & OPEN SOURCE</p>
        <h1>Templates Undangan Pernikahan <span class="grad">Elegan</span></h1>
        <p class="lede">
          Satu aplikasi, lima gaya visual mewah — Elegant, Floral, Minimal, Rustic, Modern.
          Navigasi per-section yang halus, animasi 3D, dan ilustrasi custom.
          Atur semuanya lewat satu file JSON.
        </p>
        <div class="cta">
          <NuxtLink to="/ringga-delvy/" class="btn-primary">Lihat Contoh Undangan</NuxtLink>
          <a href="https://github.com/ringga-dev/undangan" target="_blank" class="btn-ghost">Kode Sumber</a>
        </div>
      </div>
    </section>

    <section class="styles">
      <h2>5 Gaya Visual</h2>
      <p class="sub">Setiap gaya punya palet warna, tipografi, dan dekorasi yang sama sekali berbeda.</p>
      <div class="grid">
        <NuxtLink v-for="s in styles" :key="s.slug" :to="'/' + s.slug + '/'" class="card" :style="s.style">
          <div class="swatch" :style="{ background: s.bg }"></div>
          <div class="meta">
            <h3>{{ s.name }}</h3>
            <p>{{ s.desc }}</p>
            <span class="pill" :style="{ background: s.accent, color: s.textOn }">{{ s.theme }}</span>
          </div>
          <span class="open">Buka →</span>
        </NuxtLink>
      </div>
    </section>

    <section class="features">
      <h2>Fitur</h2>
      <div class="feat-grid">
        <div class="feat"><i class="fa-solid fa-wand-magic-sparkles"></i><h4>Gaya Massif</h4><p>5 style dengan layout, font, dan dekor berbeda total.</p></div>
        <div class="feat"><i class="fa-solid fa-photo-film"></i><h4>Rich Content</h4><p>Cover, mempelai, cerita cinta, galeri, waktu &amp; tempat, hadiah, ucapan.</p></div>
        <div class="feat"><i class="fa-solid fa-hand-point-up"></i><h4>Navigasi Step</h4><p>Scroll/swipe/panah per section — elegan, tidak bertele-tele.</p></div>
        <div class="feat"><i class="fa-solid fa-palette"></i><h4>Warna dari JSON</h4><p>Atur style &amp; palet tiap pasangan cukup di weddings.json.</p></div>
        <div class="feat"><i class="fa-solid fa-mobile-screen"></i><h4>Mobile First</h4><p>Responsif penuh, ringan, siap dibagikan via link.</p></div>
        <div class="feat"><i class="fa-solid fa-code"></i><h4>Open Source</h4><p>Nuxt 4 + GitHub Pages. Fork &amp; kustomisasi bebas.</p></div>
      </div>
    </section>

    <section class="docs" id="dokumentasi">
      <h2>Dokumentasi Lengkap</h2>
      <p class="sub">Cara setup, mengubah data, dan memublikasikan undangan kamu secara online — lengkap &amp; step-by-step.</p>

      <div class="tabs">
        <button :class="{ active: tab === 'setup' }" @click="tab = 'setup'">1 · Bikin Undangan</button>
        <button :class="{ active: tab === 'data' }" @click="tab = 'data'">2 · Edit Data JSON</button>
        <button :class="{ active: tab === 'deploy' }" @click="tab = 'deploy'">3 · Publikasi Online</button>
      </div>

      <!-- ============ TAB 1: AWAM-FIRST ============ -->
      <div v-show="tab === 'setup'" class="panel">
        <div class="note">🎉 <b>Untuk pemula:</b> Kamu TIDAK perlu install apa-apa. Cukup punya akun GitHub (gratis) dan edit lewat browser. Ikuti 5 langkah berikut.</div>

        <h3>Langkah 1 — Buat Akun GitHub</h3>
        <p>Daftar gratis di <a href="https://github.com/signup" target="_blank">github.com/signup</a>. Cukup pakai email &amp; password.</p>

        <h3>Langkah 2 — Fork (Salin) Project Ini</h3>
        <ol>
          <li>Buka <a href="https://github.com/ringga-dev/undangan" target="_blank">github.com/ringga-dev/undangan</a>.</li>
          <li>Klik tombol <b>Fork</b> (pojok kanan atas) → klik <b>Create fork</b>.</li>
          <li>Sekarang kamu punya salinan di <code>github.com/NAMAKAMU/undangan</code>. Semua edit dilakukan di sini.</li>
        </ol>

        <h3>Langkah 3 — Edit Data Undangan</h3>
        <ol>
          <li>Di repo hasil fork, buka folder <code>app/config/</code> lalu klik file <code>weddings.json</code>.</li>
          <li>Klik ikon pensil ✏️ (<b>Edit this file</b>) di kanan atas.</li>
          <li>Ubah nama, tanggal, alamat, dll sesuai undanganmu (panduan lengkap di tab <b>Edit Data JSON</b>).</li>
          <li>Scroll ke bawah → klik <b>Commit changes</b> (tombol hijau).</li>
        </ol>
        <p>📌 Jangan ubah tanda kutip <code>"</code> dan kurung kurawal <code>{ }</code>. Cukup ganti teks di dalamnya.</p>

        <h3>Langkah 4 — Tunggu Undangan Jadi (Otomatis)</h3>
        <p>Setelah klik <b>Commit changes</b>, GitHub akan membuat undanganmu sendiri (proses ±1–2 menit). Pantau di tab <b>Actions</b> (ikon checklist di repo).</p>

        <h3>Langkah 5 — Lihat &amp; Bagikan</h3>
        <ol>
          <li>Buka <b>Settings → Pages</b> di repo kamu, pastikan <i>Source = GitHub Actions</i>.</li>
          <li>URL undangan: <code>https://NAMAKAMU.github.io/undangan/</code></li>
          <li>Copy link tersebut, kirim ke tamu lewat WhatsApp/Instagram.</li>
        </ol>

        <h3>🛠 Mode Developer (Opsional)</h3>
        <p>Jika kamu nyaman dengan terminal, bisa edit secara lokal lalu push:</p>
        <pre><code>git clone https://github.com/NAMAKAMU/undangan.git
cd undangan
npm install
npm run dev        # preview lokal di http://localhost:3000
npm run generate  # build hasil ke .output/public</code></pre>
        <div class="note">💡 <b>Tips RAM rendah:</b> jika <code>npm run generate</code> berhenti, jalankan <code>NODE_OPTIONS="--max-old-space-size=768" npm run generate</code>.</div>
      </div>

      <!-- ============ TAB 2: UBAH DATA ============ -->
      <div v-show="tab === 'data'" class="panel">
        <p>Semua isi undangan diatur dari <b>satu file</b>: <code>app/config/weddings.json</code>. Edit lewat GitHub (tombol ✏️) — tidak perlu software apa pun.</p>
        <p>Struktur file: ada <code>"default"</code> (slug undangan utama) dan <code>"profiles"</code> (kumpulan undangan). Setiap undangan punya isi seperti di bawah.</p>

        <h3>Penjelasan Tiap Bagian (Field)</h3>
        <div class="table-wrap">
        <table class="doc-table">
          <thead><tr><th>Field</th><th>Isi / Contoh</th><th>Keterangan</th></tr></thead>
          <tbody>
            <tr><td><code>"slug"</code></td><td><code>"ringga-delvy"</code></td><td>Nama unik di URL. Contoh link: <code>/ringga-delvy/</code>. Pakai huruf kecil &amp; strip.</td></tr>
            <tr><td><code>"style"</code></td><td><code>"elegant"</code></td><td>Gaya tampilan. Pilih: <b>elegant, floral, minimal, rustic, modern</b>.</td></tr>
            <tr><td><code>"theme"</code></td><td><code>"emerald"</code></td><td>Warna/corak dalam gaya. Lihat daftar di bawah.</td></tr>
            <tr><td><code>groom.name</code></td><td><code>"Ringga Septia"</code></td><td>Nama mempelai pria.</td></tr>
            <tr><td><code>groom.parents</code></td><td><code>"Anak Bpk. A &amp; Ibuk B"</code></td><td>Nama orang tua pria.</td></tr>
            <tr><td><code>groom.photo</code></td><td><code>"images/cowo.png"</code></td><td>Foto/avatar pria (file di <code>public/images/</code>).</td></tr>
            <tr><td><code>bride.name</code></td><td><code>"Delvy Lim"</code></td><td>Nama mempelai wanita.</td></tr>
            <tr><td><code>bride.parents</code></td><td><code>"Anak Bpk. C &amp; Ibuk D"</code></td><td>Nama orang tua wanita.</td></tr>
            <tr><td><code>bride.photo</code></td><td><code>"images/cewe.png"</code></td><td>Foto/avatar wanita.</td></tr>
            <tr><td><code>"cover"</code></td><td><code>"images/bg.jpeg"</code></td><td>Foto utama di halaman depan (hero).</td></tr>
            <tr><td><code>"greeting"</code></td><td><code>"Assalamu'alaikum..."</code></td><td>Salam pembuka.</td></tr>
            <tr><td><code>"quote"</code></td><td><code>"Dan di antara tanda-tanda..."</code></td><td>Ayat / kutipan hikmah.</td></tr>
            <tr><td><code>"dateText"</code></td><td><code>"Senin, 21 Sept 2026"</code></td><td>Tanggal akad (tampilan bebas).</td></tr>
            <tr><td><code>"countdown"</code></td><td><code>"2026-09-21 07:00:00"</code></td><td>Format <b>YYYY-MM-DD HH:mm:ss</b> (pakai angka, bukan teks). Ini yang dihitung timer.</td></tr>
            <tr><td><code>"calendarUrl"</code></td><td><code>"https://calendar.google.com/..."</code></td><td>Link "Simpan Waktu" ke Google Calendar.</td></tr>
            <tr><td><code>"akad"</code></td><td><code>"Pukul 07.00 - Selesai"</code></td><td>Waktu akad.</td></tr>
            <tr><td><code>"resepsi"</code></td><td><code>"Pukul 09.00 - Selesai"</code></td><td>Waktu resepsi.</td></tr>
            <tr><td><code>"mapsUrl"</code></td><td><code>"https://goo.gl/..."</code></td><td>Link Google Maps lokasi.</td></tr>
            <tr><td><code>"address"</code></td><td><code>"RT 10 RW 02, ..."</code></td><td>Alamat lengkap acara.</td></tr>
            <tr><td><code>"music"</code></td><td><code>"music/lagu.mp3"</code></td><td>Lagu latar (file di <code>public/music/</code>). Kosongkan <code>""</code> jika tak mau musik.</td></tr>
            <tr><td><code>"story"</code></td><td><code>[ {"date":"2019","title":"...","text":"..."} ]</code></td><td>Cerita cinta. Bisa lebih dari 1 (tambah <code>{...}</code> dipisah koma).</td></tr>
            <tr><td><code>"gallery"</code></td><td><code>["images/cowo.png", ...]</code></td><td>Daftar foto galeri (array/path).</td></tr>
            <tr><td><code>"closing"</code></td><td><code>"Merupakan suatu kehormatan..."</code></td><td>Kalimat penutup undangan.</td></tr>
            <tr><td><code>"gifts"</code></td><td><code>[ {"bank":"BNI","norek":"...","nama":"..."} ]</code></td><td>Rekening hadiah. Bisa &gt;1. <code>logo</code> opsional (URL gambar).</td></tr>
            <tr><td><code>"emailjs"</code></td><td><code>{"serviceId":"...","templateId":"...","fromEmail":"..."}</code></td><td>Agar ucapan tamu tersimpan. Daftar gratis di emailjs.com. Kosongkan <code>{}</code> jika tak perlu.</td></tr>
          </tbody>
        </table>
        </div>

        <h3>Contoh Satu Pasangan Lengkap</h3>
        <pre><code>{
  "style": "elegant",
  "theme": "emerald",
  "groom":  { "name": "Ringga Septia", "parents": "Anak Bpk. A & Ibuk B", "photo": "images/cowo.png" },
  "bride":  { "name": "Delvy Lim", "parents": "Anak Bpk. C & Ibuk D", "photo": "images/cewe.png" },
  "cover": "images/bg.jpeg",
  "greeting": "Assalamu'alaikum Warahmatullahi Wabarakatuh",
  "quote": "Dan di antara tanda-tanda-Nya... (QS. Ar-Rum: 21)",
  "dateText": "Senin, 21 September 2026",
  "countdown": "2026-09-21 07:00:00",
  "calendarUrl": "https://calendar.google.com/...",
  "akad": "Pukul 07.00 WIB - Selesai",
  "resepsi": "Pukul 09.00 WIB - Selesai",
  "mapsUrl": "https://goo.gl/...",
  "address": "RT 10 RW 02, Desa Pajerukan",
  "music": "music/lagu.mp3",
  "story": [ { "date":"2019", "title":"Berkenalan", "text":"Kami bertemu..." } ],
  "gallery": ["images/cowo.png", "images/cewe.png", "images/bg.jpeg"],
  "closing": "Kehadiran Anda adalah kehormatan...",
  "gifts": [ { "bank":"BNI", "logo":"https://...", "norek":"1234567890", "nama":"Ringga" } ],
  "emailjs": { "serviceId":"service_xxx", "templateId":"template_xxx", "fromEmail":"a@b.com" }
}</code></pre>

        <h3>Daftar Style &amp; Theme (Pilih Kombinasi)</h3>
        <div class="table-wrap">
        <table class="doc-table">
          <thead><tr><th>Gaya (style)</th><th>Theme yang tersedia</th><th>Kesan / Cocok untuk</th></tr></thead>
          <tbody>
            <tr><td><b>elegant</b></td><td>emerald · royal · navy · burgundy · bronze</td><td>Mewah, emas, kartu 3D. Cocok akad adat / formal.</td></tr>
            <tr><td><b>floral</b></td><td>rose · blush · lilac · sage · sky</td><td>Romantis, kelopak berterbangan, pastel. Cocok garden/outdoor.</td></tr>
            <tr><td><b>minimal</b></td><td>noir · paper · graphite · ivory · steel</td><td>Bersih, hitam-putih, tipografi kuat. Cocok modern-simple.</td></tr>
            <tr><td><b>rustic</b></td><td>terracotta · olive · clay · forest · wheat</td><td>Hangat, natural, pampas grass. Cocok outdoor/rustic.</td></tr>
            <tr><td><b>modern</b></td><td>cyan · violet · lime · coral · magenta</td><td>Futuristik, particle, neon. Cocok gen-Z/urban.</td></tr>
          </tbody>
        </table>
        </div>
        <p>Cara coba kombinasi langsung: buka <code>/&lt;slug&gt;/?style=modern&amp;theme=cyan</code> (ganti <code>style</code> &amp; <code>theme</code> sesuai tabel).</p>

        <h3>Mengganti Foto</h3>
        <ul>
          <li><b>Avatar pasangan:</b> ganti <code>public/images/cowo.png</code> &amp; <code>cewe.png</code> (transparan PNG).</li>
          <li><b>Cover hero:</b> ganti <code>public/images/bg.jpeg</code>.</li>
          <li><b>Galeri:</b> upload ke <code>public/images/</code> lalu ubah path di <code>"gallery"</code>.</li>
          <li><b>Ilustrasi dekor:</b> <code>public/images/illu/*.png</code> (sudah transparan).</li>
        </ul>
        <p>📌 Cara upload di GitHub: buka folder <code>public/images/</code> → <b>Add file → Upload files</b>. Pastikan nama file sama dengan yang ditulis di JSON.</p>

        <h3>Menambah Pasangan Baru</h3>
        <ol>
          <li>Copy satu blok pasangan di dalam <code>"profiles"</code>, beri slug baru (misal <code>"andi-rina"</code>).</li>
          <li>Tambahkan slug ke <code>nitro.prerender.routes</code> di <code>nuxt.config.ts</code> agar halaman di-generate.</li>
        </ol>

        <div class="note">✅ Selesai edit? Klik <b>Commit changes</b> → undangan otomatis dibuat ulang (lihat tab Publikasi).</div>
      </div>

      <!-- ============ TAB 3: PUBLISH ============ -->
      <div v-show="tab === 'deploy'" class="panel">
        <p>Project ini sudah siap deploy ke <b>GitHub Pages gratis</b> lewat GitHub Actions. Tidak perlu server sendiri.</p>

        <h3>Opsi A — Pakai Repo Ini (Fork)</h3>
        <ol>
          <li>Klik <b>Fork</b> di <a href="https://github.com/ringga-dev/undangan" target="_blank">github.com/ringga-dev/undangan</a> → masuk ke akun kamu.</li>
          <li>Edit <code>weddings.json</code> langsung di GitHub (tombol ✏️) atau lewat clone lokal.</li>
          <li>Push ke branch <code>master</code>. Workflow <code>.github/workflows/deploy.yml</code> otomatis build &amp; deploy.</li>
          <li>Di <b>Settings → Pages</b>, pastikan Source = <i>GitHub Actions</i>. URL live: <code>https://&lt;username&gt;.github.io/undangan/</code>.</li>
        </ol>

        <h3>Opsi B — Repo Sendiri (Own)</h3>
        <ol>
          <li>Buat repo baru (misal <code>undangan</code>), lalu <code>git push</code> isi project ke sana.</li>
          <li>Pastikan file <code>deploy.yml</code> ada di <code>.github/workflows/</code>.</li>
          <li>Settings → Pages → Source: <b>GitHub Actions</b>.</li>
          <li>Setiap push ke <code>master</code> = deploy baru (biasanya &lt; 2 menit).</li>
        </ol>

        <h3>Custom Domain (Opsional)</h3>
        <ol>
          <li>Beli domain (Namecheap, Niagahoster, dll).</li>
          <li>Di Settings → Pages → Custom domain, isi domain (misal <code>undangan.kamu.id</code>).</li>
          <li>Tambahkan record <b>CNAME</b> di DNS provider: <code>undangan → &lt;username&gt;.github.io</code>.</li>
          <li>Tunggu propagasi DNS (menit–jam). SSL otomatis aktif.</li>
        </ol>

        <h3>Membagikan ke Tamu</h3>
        <p>Link undangan bisa langsung diberi nama tamu lewat query <code>?to=</code>:</p>
        <pre><code>https://&lt;username&gt;.github.io/undangan/ringga-delvy/?to=Any&amp;Yanto</code></pre>
        <p>Nama tamu akan muncul di hero ("Untuk Any &amp; Yanto"). Bisa digenerate massal untuk broadcast WA.</p>

        <div class="note">🔒 <b>Privasi:</b> Undangan di GitHub Pages bersifat publik. Jangan masukkan data sensitif (PIN, password) ke <code>weddings.json</code>.</div>
      </div>
    </section>

    <footer class="foot">
      <p>Dibuat dengan ❤ oleh <a href="https://github.com/ringga-dev" target="_blank">ringga-dev</a></p>
      <p class="small">Cara pakai: <code>/&lt;slug&gt;/?to=Nama+Tamu</code> — contoh <code>/ringga-delvy/?to=Any&amp;Yanto</code></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWeddings } from '~/composables/useWeddings'

const { profiles } = useWeddings()
const tab = ref<'setup' | 'data' | 'deploy'>('setup')

const meta: Record<string, { name: string; desc: string; bg: string; accent: string; textOn: string; theme: string }> = {
  'ringga-delvy': { name: 'Elegant', desc: 'Emerald & emas, 3D card, sangat mewah.', bg: '#0b1f17', accent: '#d4af37', textOn: '#0b1f17', theme: 'emerald' },
  'budi-siti': { name: 'Floral', desc: 'Pastel pink, kelopak berterbangan, romantis.', bg: '#fff1f4', accent: '#e58aa0', textOn: '#fff', theme: 'rose' },
  'demo-minimal': { name: 'Minimal', desc: 'Hitam-putih bersih, tipografi kuat.', bg: '#0a0a0a', accent: '#ffffff', textOn: '#0a0a0a', theme: 'mono' },
  'demo-rustic': { name: 'Rustic', desc: 'Beige hangat, pampas grass, natural.', bg: '#fbebe2', accent: '#a9774f', textOn: '#fff', theme: 'terracotta' },
  'demo-modern': { name: 'Modern', desc: 'Cyan gelap, particle, futuristik.', bg: '#03141a', accent: '#22d3ee', textOn: '#03141a', theme: 'cyan' }
}

const styles = Object.entries(profiles).map(([slug, p]) => {
  const m = meta[slug] || { name: slug, desc: '', bg: '#222', accent: '#888', textOn: '#fff', theme: (p as any).theme || '' }
  return { slug, name: m.name, desc: m.desc, bg: m.bg, accent: m.accent, textOn: m.textOn, theme: m.theme, style: { background: m.bg, borderColor: m.accent } }
})
</script>

<style scoped>
.landing { font-family: 'Inter', system-ui, sans-serif; color: #1a1a1a; background: #fff; }
.hero { padding: 12vh 1.5rem 8vh; text-align: center; background: radial-gradient(1200px 500px at 50% -10%, #eef2ff, #fff); }
.hero-inner { max-width: 760px; margin: 0 auto; }
.eyebrow { letter-spacing: .25em; font-size: .7rem; color: #6366f1; font-weight: 700; }
.hero h1 { font-size: clamp(2rem, 6vw, 3.4rem); margin: 1rem 0; line-height: 1.1; }
.grad { background: linear-gradient(90deg,#6366f1,#ec4899); -webkit-background-clip: text; background-clip: text; color: transparent; }
.lede { font-size: 1.05rem; color: #555; line-height: 1.7; max-width: 620px; margin: 0 auto; }
.cta { margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn-primary { background: #111; color: #fff; padding: .8rem 1.6rem; border-radius: 999px; text-decoration: none; font-weight: 600; }
.btn-primary:hover { background: #000; }
.btn-ghost { border: 1px solid #111; color: #111; padding: .8rem 1.6rem; border-radius: 999px; text-decoration: none; font-weight: 600; }
.styles { padding: 6vh 1.5rem; max-width: 1100px; margin: 0 auto; }
.styles h2, .features h2 { text-align: center; font-size: 2rem; margin-bottom: .4rem; }
.sub { text-align: center; color: #666; margin-bottom: 2.5rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem; }
.card { display: block; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; text-decoration: none; color: inherit; transition: transform .25s, box-shadow .25s; position: relative; }
.card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,.12); }
.swatch { height: 120px; }
.meta { padding: 1rem 1.2rem 2.6rem; }
.meta h3 { margin: 0 0 .3rem; }
.meta p { margin: 0; color: #666; font-size: .9rem; }
.pill { display: inline-block; margin-top: .6rem; padding: .2rem .7rem; border-radius: 999px; font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }
.open { position: absolute; right: 1.2rem; bottom: 1.2rem; font-weight: 700; font-size: .85rem; color: #111; }
.features { padding: 6vh 1.5rem; background: #f8fafc; }
.feat-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1.5rem; }
.feat { text-align: center; padding: 1.5rem; }
.feat i { font-size: 1.8rem; color: #6366f1; }
.feat h4 { margin: .6rem 0 .3rem; }
.feat p { color: #666; font-size: .9rem; }
.foot { text-align: center; padding: 5vh 1.5rem; color: #666; }
.foot a { color: #111; }
.small { font-size: .8rem; }
code { background: #f1f1f4; padding: .15rem .4rem; border-radius: 6px; }
/* ===== Docs section ===== */
.docs { padding: 8vh 1.5rem; max-width: 900px; margin: 0 auto; }
.docs h2 { text-align: center; font-size: 2rem; margin-bottom: .4rem; }
.docs .sub { text-align: center; color: #666; margin-bottom: 2rem; }
.tabs { display: flex; gap: .5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
.tabs button { border: 1px solid #d1d5db; background: #fff; color: #374151; padding: .7rem 1.2rem; border-radius: 999px; font-weight: 600; cursor: pointer; transition: all .2s; font-size: .9rem; }
.tabs button:hover { border-color: #111; }
.tabs button.active { background: #111; color: #fff; border-color: #111; }
.panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 18px; padding: 2rem 2.2rem; box-shadow: 0 10px 30px rgba(0,0,0,.05); }
.panel h3 { margin: 1.8rem 0 .6rem; font-size: 1.15rem; }
.panel h3:first-child { margin-top: 0; }
.panel p { color: #444; line-height: 1.7; margin: .5rem 0; }
.panel ul, .panel ol { color: #444; line-height: 1.8; padding-left: 1.4rem; margin: .5rem 0; }
.panel li { margin: .3rem 0; }
.panel a { color: #6366f1; text-decoration: none; font-weight: 600; }
.panel a:hover { text-decoration: underline; }
.panel pre { background: #0f172a; color: #e2e8f0; padding: 1rem 1.2rem; border-radius: 12px; overflow-x: auto; margin: .8rem 0; font-size: .85rem; line-height: 1.5; }
.panel pre code { background: transparent; color: inherit; padding: 0; border-radius: 0; font-family: 'Fira Code', ui-monospace, monospace; }
.panel code { background: #f1f1f4; padding: .15rem .4rem; border-radius: 6px; color: #be185d; font-size: .85rem; }
.panel .note { background: #eef2ff; border-left: 4px solid #6366f1; padding: .9rem 1.1rem; border-radius: 0 10px 10px 0; color: #3730a3; font-size: .9rem; line-height: 1.6; margin: 1.2rem 0; }
.table-wrap { overflow-x: auto; margin: 1rem 0; border-radius: 12px; border: 1px solid #e5e7eb; }
.doc-table { width: 100%; border-collapse: collapse; font-size: .85rem; min-width: 520px; }
.doc-table th { background: #111; color: #fff; text-align: left; padding: .6rem .8rem; font-weight: 600; }
.doc-table td { padding: .55rem .8rem; border-top: 1px solid #eef0f3; vertical-align: top; color: #374151; line-height: 1.5; }
.doc-table tr:nth-child(even) td { background: #f9fafb; }
.doc-table code { background: #f1f1f4; padding: .1rem .35rem; border-radius: 5px; color: #be185d; font-size: .8rem; }
@media (max-width: 520px) {
  .panel { padding: 1.4rem 1.1rem; }
  .tabs button { padding: .6rem .9rem; font-size: .82rem; }
}
</style>
