// Ucapan & Doa — backend-ready with localStorage fallback.
//
// Storage backends (in priority order):
//   1. Supabase  — if runtime config public.supabaseUrl + anonKey are set,
//                  messages are stored in a table `ucapan` (columns: slug,
//                  nama, hadir, komentar, created_at). Insert is public
//                  (anon role INSERT policy), select is public (SELECT policy).
//   2. localStorage — used when Supabase is not configured. Messages are
//                  scoped per wedding slug and persist in the visitor's browser.
//
// To enable real shared storage, create a Supabase project and add to
// nuxt.config.ts > runtimeConfig.public:
//   supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
//   supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
import { ref } from 'vue'

export interface Ucapan {
  id?: string
  slug: string
  nama: string
  hadir: string
  komentar: string
  created_at?: string
}

const LS_KEY = (slug: string) => `ucapan:${slug}`

const cfg = () => {
  try {
    // @ts-expect-error runtimeConfig is injected by Nuxt
    const rc = (globalThis.$nuxt ? globalThis.$nuxt.$config : null) || {}
    return {
      url: (rc.public && rc.public.supabaseUrl) || '',
      key: (rc.public && rc.public.supabaseAnonKey) || ''
    }
  } catch {
    return { url: '', key: '' }
  }
}

export const useUcapan = (slug: string) => {
  const list = ref<Ucapan[]>([])
  const loading = ref(false)

  const load = async () => {
    loading.value = true
    const { url, key } = cfg()
    try {
      if (url && key) {
        const res = await fetch(
          `${url}/rest/v1/ucapan?slug=eq.${encodeURIComponent(slug)}&order=created_at.desc`,
          { headers: { apikey: key, Authorization: `Bearer ${key}` } }
        )
        if (res.ok) {
          list.value = (await res.json()) as Ucapan[]
          return
        }
      }
    } catch (e) {
      console.warn('Supabase load failed, falling back to localStorage', e)
    }
    // fallback: localStorage
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY(slug)) : null
      list.value = raw ? (JSON.parse(raw) as Ucapan[]) : []
    } catch {
      list.value = []
    } finally {
      loading.value = false
    }
  }

  const kirim = async (msg: Omit<Ucapan, 'id' | 'created_at'>) => {
    const { url, key } = cfg()
    const full: Ucapan = { ...msg, created_at: new Date().toISOString() }
    if (url && key) {
      try {
        const res = await fetch(`${url}/rest/v1/ucapan`, {
          method: 'POST',
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ slug: full.slug, nama: full.nama, hadir: full.hadir, komentar: full.komentar })
        })
        if (res.ok) {
          await load()
          return { ok: true }
        }
      } catch (e) {
        console.warn('Supabase insert failed, falling back to localStorage', e)
      }
    }
    // fallback: localStorage
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY(slug)) : null
    const arr = raw ? (JSON.parse(raw) as Ucapan[]) : []
    arr.unshift(full)
    if (typeof window !== 'undefined') localStorage.setItem(LS_KEY(slug), JSON.stringify(arr))
    list.value = arr
    return { ok: true }
  }

  return { list, loading, load, kirim }
}
