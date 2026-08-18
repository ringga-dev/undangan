// Guest name from the URL, e.g.  /ringga-delvy/?to=any&yanto
// Parsed from the RAW search string so a literal "&" inside the name is kept:
//   ?to=any&yanto  ->  "any&yanto"   (yanto has no "=", so it stays part of `to`)
import { ref, onMounted } from 'vue'

export const useGuest = () => {
  const guest = ref('')
  onMounted(() => {
    const s = window.location.search
    const m = s.match(/[?&]to=(.*?)(?=&[a-zA-Z0-9_]+=|$)/)
    if (m) guest.value = decodeURIComponent(m[1]).replace(/\+/g, ' ')
  })
  return guest
}
