import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

/**
 * Full-screen step navigation (deck). Each [data-slide] becomes a 100vh slide.
 * Navigation: wheel, touch swipe, arrow/space keys, click left/right, dots.
 * No free scrolling — one section per step (elegant presentation mode).
 */
export function useDeck(rootRef: () => HTMLElement | null) {
  const idx = ref(0)
  const count = ref(0)
  let slides: HTMLElement[] = []
  let lock = false
  let wheelT = 0

  const place = (i: number) => {
    const track = rootRef()?.querySelector('.deck-track') as HTMLElement | null
    if (track) gsap.set(track, { xPercent: -(i * 100) })
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i))
  }
  const go = (i: number) => {
    const t = Math.max(0, Math.min(count.value - 1, i))
    if (t === idx.value || lock) return
    lock = true
    setTimeout(() => (lock = false), 760)
    idx.value = t
    place(t)
    slides.forEach((s) => s.classList.toggle('is-active', s === slides[t]))
  }
  const next = () => go(idx.value + 1)
  const prev = () => go(idx.value - 1)

  let onWheel: (e: WheelEvent) => void
  let onKey: (e: KeyboardEvent) => void
  let ts: { x: number; y: number; t: number } | null = null
  let onTouchStart: (e: TouchEvent) => void
  let onTouchEnd: (e: TouchEvent) => void
  let onClick: (e: MouseEvent) => void

  onMounted(() => {
    const root = rootRef()
    if (!root) return
    slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'))
    count.value = slides.length
    if (!slides.length) return
    slides.forEach((s, k) => {
      s.classList.add('deck-slide')
      s.classList.toggle('is-active', k === 0)
    })
    place(0)

    onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - wheelT < 700 || lock) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // trackpad horizontal
        if (Math.abs(e.deltaX) < 12) return
        wheelT = now
        e.deltaX > 0 ? next() : prev()
      } else {
        if (Math.abs(e.deltaY) < 12) return
        wheelT = now
        e.deltaY > 0 ? next() : prev()
      }
    }
    onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next() }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev() }
    }
    onTouchStart = (e: TouchEvent) => { const t = e.changedTouches[0]; ts = { x: t.clientX, y: t.clientY, t: Date.now() } }
    onTouchEnd = (e: TouchEvent) => {
      if (!ts) return
      const t = e.changedTouches[0]
      const dx = t.clientX - ts.x, dy = t.clientY - ts.y
      if (Date.now() - ts.t < 800 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev() }
      ts = null
    }
    onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a,button,.deck-nav,.deck-dots,input,textarea')) return
      const a = el.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (a) {
        const id = a.getAttribute('href')!.slice(1)
        const si = slides.findIndex((s) => s.id === id)
        if (si >= 0) { e.preventDefault(); go(si); return }
      }
      const w = window.innerWidth
      e.clientX > w * 0.62 ? next() : e.clientX < w * 0.38 ? prev() : null
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchend', onTouchEnd, { passive: true })
    root.addEventListener('click', onClick)
  })

  onUnmounted(() => {
    const root = rootRef()
    if (!root) return
    root.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
    root.removeEventListener('touchstart', onTouchStart)
    root.removeEventListener('touchend', onTouchEnd)
    root.removeEventListener('click', onClick)
  })

  return { idx, count, go, next, prev }
}
