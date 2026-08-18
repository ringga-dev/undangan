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

    <footer class="foot">
      <p>Dibuat dengan ❤ oleh <a href="https://github.com/ringga-dev" target="_blank">ringga-dev</a></p>
      <p class="small">Cara pakai: <code>/&lt;slug&gt;/?to=Nama+Tamu</code> — contoh <code>/ringga-delvy/?to=Any&amp;Yanto</code></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useWeddings } from '~/composables/useWeddings'

const { profiles } = useWeddings()

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
</style>
