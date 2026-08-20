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
        <button :class="{ active: tab === 'setup' }" @click="tab = 'setup'">1 · Setup Lokal</button>
        <button :class="{ active: tab === 'data' }" @click="tab = 'data'">2 · Ubah Data</button>
        <button :class="{ active: tab === 'deploy' }" @click="tab = 'deploy'">3 · Publikasi Online</button>
      </div>

      <!-- ============ TAB 1: SETUP ============ -->
      <div v-show="tab === 'setup'" class="panel">
        <h3>Prasyarat</h3>
        <ul>
          <li><b>Node.js 20+</b> (disarankan 22, sama dengan CI GitHub Pages). Unduh di <a href="https://nodejs.org" target="_blank">nodejs.org</a>.</li>
          <li><b>Git</b> — <a href="https://git-scm.com" target="_blank">git-scm.com</a>.</li>
          <li>Terminal (PowerShell / Bash / Terminal macOS).</li>
        </ul>

        <h3>Langkah 1 — Clone &amp; Install</h3>
        <pre><code>git clone https://github.com/ringga-dev/undangan.git
cd undangan
npm install</code></pre>

        <h3>Langkah 2 — Jalankan di Lokal (Development)</h3>
        <pre><code>npm run dev</code></pre>
        <p>Buka <code>http://localhost:3000/</code>. Tiap perubahan file otomatis reload — cocok untuk preview saat mengedit data.</p>

        <h3>Langkah 3 — Build Statis (SSG)</h3>
        <pre><code>npm run generate</code></pre>
        <p>Hasil ada di <code>.output/public/</code> — ini yang di-deploy ke GitHub Pages. Untuk preview hasil build:</p>
        <pre><code>npm run preview</code></pre>

        <div class="note">💡 <b>Tips RAM rendah:</b> jika <code>nuxt generate</code> berhenti (OOM), jalankan dengan <code>NODE_OPTIONS="--max-old-space-size=768" npm run generate</code>.</div>
      </div>

      <!-- ============ TAB 2: UBAH DATA ============ -->
      <div v-show="tab === 'data'" class="panel">
        <p>Semua konten undangan diatur dari <b>satu file</b>: <code>app/config/weddings.json</code>. Tidak perlu menyentuh kode Vue.</p>

        <h3>Struktur per Pasangan</h3>
        <pre><code>"nama-slug": {
  "style": "elegant",          // elegant | floral | minimal | rustic | modern
  "theme": "emerald",          // lihat daftar theme di bawah
  "groom":  { "name": "...", "parents": "...", "photo": "images/cowo.png" },
  "bride":  { "name": "...", "parents": "...", "photo": "images/cewe.png" },
  "cover": "images/bg.jpeg",   // foto utama hero
  "greeting": "Assalamu'alaikum...",
  "quote": "Ayat / kutipan...",
  "dateText": "Senin, 21 September 2026",
  "countdown": "2026-09-21 07:00:00",   // format YYYY-MM-DD HH:mm:ss
  "calendarUrl": "https://calendar.google.com/...",
  "akad": "Pukul 07.00 WIB - Selesai",
  "resepsi": "Pukul 09.00 WIB - Selesai",
  "mapsUrl": "https://goo.gl/...",
  "address": "Alamat lengkap...",
  "music": "music/nama-lagu.mp3",
  "story": [ { "date":"2019", "title":"...", "text":"..." } ],  // bisa &gt;1
  "gallery": ["images/cowo.png", "images/cewe.png", "images/bg.jpeg"],
  "closing": "Kalimat penutup...",
  "gifts": [ { "bank":"BNI", "logo":"https://...", "norek":"...", "nama":"..." } ],
  "emailjs": { "serviceId":"...", "templateId":"...", "fromEmail":"..." }
}</code></pre>

        <h3>Menambah Pasangan Baru</h3>
        <ol>
          <li>Tambahkan blok JSON baru di dalam <code>"profiles"</code> dengan slug unik (misal <code>"andi-rina"</code>).</li>
          <li>Tambahkan slug tersebut ke daftar <code>nitro.prerender.routes</code> di <code>nuxt.config.ts</code> agar halaman di-generate saat build.</li>
          <li>(Opsional) Tambahkan kartu preview di <code>app/pages/index.vue</code> — array <code>meta</code> — agar muncul di halaman utama.</li>
        </ol>

        <h3>Mengganti Foto</h3>
        <ul>
          <li><b>Pasangan (kartun/avatar):</b> ganti <code>public/images/cowo.png</code> &amp; <code>cewe.png</code> (transparan PNG, 500×500).</li>
          <li><b>Cover hero:</b> ganti <code>public/images/bg.jpeg</code>.</li>
          <li><b>Ilustrasi dekoratif:</b> <code>public/images/illu/elegant.png</code> … <code>modern.png</code> (sudah transparan, watercolor).</li>
          <li><b>Galeri:</b> ubah path di field <code>"gallery"</code> (letakkan file di <code>public/images/</code>).</li>
        </ul>

        <h3>Daftar Style &amp; Theme</h3>
        <ul>
          <li><b>elegant</b> → emerald · royal · navy · burgundy · bronze</li>
          <li><b>floral</b> → rose · blush · lilac · sage · sky</li>
          <li><b>minimal</b> → noir · paper · graphite · ivory · steel</li>
          <li><b>rustic</b> → terracotta · olive · clay · forest · wheat</li>
          <li><b>modern</b> → cyan · violet · lime · coral · magenta</li>
        </ul>
        <p>Contoh kombinasi: <code>"style":"modern", "theme":"cyan"</code>. Ingin lihat semua? buka <code>/&lt;slug&gt;/?style=modern&amp;theme=cyan</code>.</p>

        <h3>Ucapan Tamu (EmailJS)</h3>
        <p>Agar ucapan tersimpan, isi <code>emailjs</code> dengan akun gratis dari <a href="https://www.emailjs.com" target="_blank">emailjs.com</a> (serviceId, templateId, fromEmail). Tanpa ini, form tetap tampil tapi tidak mengirim.</p>

        <h3>Musik Latar</h3>
        <p>Letakkan file mp3 di <code>public/music/</code> lalu ubah field <code>"music"</code>. Tombol play/pause otomatis muncul.</p>

        <div class="note">✅ Setelah mengedit <code>weddings.json</code>, cukup <b>commit &amp; push</b> — GitHub Actions akan build &amp; publish otomatis (lihat tab Publikasi).</div>
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
@media (max-width: 520px) {
  .panel { padding: 1.4rem 1.1rem; }
  .tabs button { padding: .6rem .9rem; font-size: .82rem; }
}
</style>
