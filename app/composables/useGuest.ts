// Guest name from the URL, e.g.  /ringga-delvy/?to=any&yanto
// Parsed from the RAW href so a literal "&" inside the name is kept:
//   ?to=any&yanto  ->  "any&yanto"   (yanto has no "=", so it stays part of `to`)
//
// NOTE: on GitHub Pages (SPA / 404 fallback) the query is not present in
// window.location during setup or onMounted — the router settles it a tick
// later. So we parse from href and retry shortly after mount.
import { ref, onMounted } from 'vue'

export const useGuest = () => {
  const guest = ref('')
  const parse = () => {
    if (typeof window === 'undefined') return
    const raw = window.location.href
    const m = raw.match(/[?&]to=(.*?)(?=&[a-zA-Z0-9_]+=|$)/)
    if (m) guest.value = decodeURIComponent(m[1]).replace(/\+/g, ' ')
  }
  onMounted(() => {
    parse()
    setTimeout(parse, 120)
    setTimeout(parse, 600)
  })
  return guest
}
