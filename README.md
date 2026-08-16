# Undangan Pernikahan (Nuxt 4)

Undangan pernikahan digital — rebuild dari template statis ke **Nuxt 4** (SSG) dengan tampilan 1:1 dipertahankan. Auto-deploy ke GitHub Pages via GitHub Actions.

## Fitur
- Tampilan dark elegant (Bootstrap 5 + FontAwesome + AOS + font Sacramento/Josefin Sans)
- Modal pembuka + musik latar
- Countdown otomatis ke hari H
- Love Gift (copy nomor rekening)
- Form ucapan & doa (EmailJS)
- Auto-release ke GitHub Pages setiap push ke `master`

## Cara edit konten
Semua teks (nama, tanggal, rekening, alamat, musik) ada di `app.config.ts` — tidak perlu ubah component.

## Develop lokal
```bash
npm install
npm run dev
```

## Build & deploy
Push ke branch `master` → GitHub Actions otomatis build (`nuxt generate`) dan deploy ke Pages.
Base path untuk GitHub Pages di-set otomatis lewat `NUXT_APP_BASE_URL` di workflow.

> URL live: https://ringga-dev.github.io/undangan/
