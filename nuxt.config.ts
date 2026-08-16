import weddings from './app/config/weddings.json'
import themes from './app/config/themes.json'

const styles = (themes as any).styles.map((s: any) => s.id)
const profiles = (weddings as any).profiles

// Build all prerender routes: /{groom} dan {bride}/{style}
// NOTE: '&' is illegal in a URL path segment (parsed as query separator),
// so we use ' dan ' (the word "and") as the couple separator.
const SEP = ' dan '
const routes = Object.values(profiles as Record<string, any>).flatMap((p: any) => {
  const slug = `${encodeURIComponent(p.groom.name)}${SEP}${encodeURIComponent(p.bride.name)}`
  return styles.map((st: string) => `/${slug}/${st}`)
})

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/themes.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Undangan Pernikahan',
      htmlAttrs: { lang: 'id' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'light dark' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/all.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js', tagPosition: 'bodyClose' },
        { src: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js', tagPosition: 'bodyClose' },
        { src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js', tagPosition: 'bodyClose' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/', ...routes],
      crawlLinks: false
    }
  }
})
