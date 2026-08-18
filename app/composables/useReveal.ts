// Safe scroll-reveal: animates .reveal elements in when scrolled into view.
// Falls back to showing everything after a short delay so content is NEVER stuck invisible.
import { onMounted, onUnmounted } from 'vue'

export const useReveal = (rootRef: Ref<HTMLElement | null> | (() => HTMLElement | null)) => {
  let io: IntersectionObserver | null = null
  let fallback: number | undefined

  onMounted(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return
    const getEl = () => (typeof rootRef === 'function' ? rootRef() : rootRef.value)
    const el = getEl()
    if (!el) return

    const targets = Array.from(el.querySelectorAll<HTMLElement>('.reveal'))
    if (!targets.length) return

    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const t = en.target as HTMLElement
          t.style.opacity = '1'
          t.style.transform = 'none'
          io?.unobserve(t)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    targets.forEach((t) => {
      t.style.opacity = '0'
      t.style.transform = 'translateY(48px)'
      t.style.transition = 'opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1)'
      io.observe(t)
    })

    // Safety net: if IO never fires (e.g. element above the fold or observer issue), show all.
    fallback = window.setTimeout(() => {
      targets.forEach((t) => { t.style.opacity = '1'; t.style.transform = 'none' })
    }, 1400)
  })

  onUnmounted(() => {
    io?.disconnect()
    if (fallback) clearTimeout(fallback)
  })
}
