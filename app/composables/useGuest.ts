// Guest name from the URL, e.g.  /ringga-delvy/?to=any&yanto
// Parsed from the RAW search string so a literal "&" inside the name is kept:
//   ?to=any&yanto  ->  "any&yanto"   (yanto has no "=", so it stays part of `to`)
import { ref, onMounted } from 'vue'

export const useGuest = () => {
  const guest = ref('')
  const parse = () => {
    const s = window.location.search
    const m = s.match(/[?&]to=(.*?)(?=&[a-zA-Z0-9_]+=|$)/)
    const val = m ? decodeURIComponent(m[1]).replace(/\+/g, ' ') : ''
    guest.value = val
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-guestdbg', JSON.stringify({ s, m: m ? m[1] : null, val }))
    }
  }
  if (typeof window !== 'undefined') parse()
  onMounted(parse)
  return guest
}
