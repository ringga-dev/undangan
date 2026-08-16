export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  // Static generation for GitHub Pages
  ssr: true,
  css: ['~/assets/css/main.css'],
  app: {
    // baseURL is injected at build time for the GitHub Pages project path (/undangan/)
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Undangan Pernikahan Ringga & Delvy',
      htmlAttrs: { lang: 'en', 'data-bs-theme': 'dark' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#212529' },
        { name: 'color-scheme', content: 'dark' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/all.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Sacramento&display=swap' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js', tagPosition: 'bodyClose' },
        { src: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js', tagPosition: 'bodyClose' },
        { src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js', tagPosition: 'bodyClose' }
      ]
    }
  }
})
