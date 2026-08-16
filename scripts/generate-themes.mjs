// Generates app/config/themes.json
// 5 visual styles, each with 5 selectable color themes (25 unique combos).
// Each theme = 5 colors [bg, surface, primary, accent, text].
// Re-run anytime to regenerate; users can also hand-edit the JSON afterwards.
import { writeFileSync, mkdirSync } from 'node:fs'

const hslToHex = (h, s, l) => {
  s /= 100; l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

// lightness/sat profiles per mode
const profile = (mode, role, h, sat) => {
  const dark = mode === 'dark'
  const map = {
    bg: dark ? [h, sat * 0.5, 7] : [h, sat * 0.4, 96],
    surface: dark ? [h, sat * 0.6, 13] : [h, sat * 0.5, 90],
    primary: dark ? [h, sat, 45] : [h, sat, 52],
    accent: dark ? [(h + 25) % 360, sat, 63] : [(h + 25) % 360, sat, 47],
    text: dark ? [h, sat * 0.3, 93] : [h, sat * 0.3, 17]
  }
  const [hh, ss, ll] = map[role]
  return hslToHex(hh, ss, ll)
}

const styles = [
  {
    id: 'elegant', name: 'Elegant', mode: 'dark', radius: '0.25rem', divider: 'line',
    font: { heading: 'Cormorant Garamond', body: 'Jost' }, sat: 45,
    themes: [
      { id: 'emerald', name: 'Emerald Night', h: 155 },
      { id: 'royal', name: 'Royal Plum', h: 280 },
      { id: 'navy', name: 'Navy Gold', h: 218 },
      { id: 'burgundy', name: 'Burgundy', h: 345 },
      { id: 'bronze', name: 'Bronze', h: 35 }
    ]
  },
  {
    id: 'floral', name: 'Floral', mode: 'light', radius: '1.5rem', divider: 'leaf',
    font: { heading: 'Playfair Display', body: 'Poppins' }, sat: 60,
    themes: [
      { id: 'rose', name: 'Rose', h: 345 },
      { id: 'blush', name: 'Blush', h: 330 },
      { id: 'lilac', name: 'Lilac', h: 270 },
      { id: 'sage', name: 'Sage', h: 140 },
      { id: 'sky', name: 'Sky', h: 200 }
    ]
  },
  {
    id: 'minimal', name: 'Minimal', mode: 'light', radius: '0.25rem', divider: 'hairline',
    font: { heading: 'Inter', body: 'Inter' }, sat: 25,
    themes: [
      { id: 'graphite', name: 'Graphite', h: 220 },
      { id: 'sand', name: 'Sand', h: 40 },
      { id: 'mist', name: 'Mist', h: 160 },
      { id: 'slate', name: 'Slate', h: 210 },
      { id: 'ink', name: 'Ink', h: 0 }
    ]
  },
  {
    id: 'rustic', name: 'Rustic', mode: 'light', radius: '0.75rem', divider: 'rough',
    font: { heading: 'Lora', body: 'Nunito' }, sat: 50,
    themes: [
      { id: 'terracotta', name: 'Terracotta', h: 18 },
      { id: 'olive', name: 'Olive', h: 80 },
      { id: 'clay', name: 'Clay', h: 30 },
      { id: 'forest', name: 'Forest', h: 140 },
      { id: 'wheat', name: 'Wheat', h: 45 }
    ]
  },
  {
    id: 'modern', name: 'Modern', mode: 'dark', radius: '0rem', divider: 'diagonal',
    font: { heading: 'Space Grotesk', body: 'DM Sans' }, sat: 70,
    themes: [
      { id: 'cyan', name: 'Cyan', h: 190 },
      { id: 'violet', name: 'Violet', h: 265 },
      { id: 'lime', name: 'Lime', h: 95 },
      { id: 'coral', name: 'Coral', h: 12 },
      { id: 'magenta', name: 'Magenta', h: 320 }
    ]
  }
]

const out = { styles: [] }
for (const st of styles) {
  const themes = st.themes.map((t) => ({
    id: t.id,
    name: t.name,
    mode: st.mode,
    colors: [
      profile(st.mode, 'bg', t.h, st.sat),
      profile(st.mode, 'surface', t.h, st.sat),
      profile(st.mode, 'primary', t.h, st.sat),
      profile(st.mode, 'accent', t.h, st.sat),
      profile(st.mode, 'text', t.h, st.sat)
    ]
  }))
  out.styles.push({
    id: st.id,
    name: st.name,
    mode: st.mode,
    radius: st.radius,
    divider: st.divider,
    font: st.font,
    themes
  })
}

mkdirSync('app/config', { recursive: true })
writeFileSync('app/config/themes.json', JSON.stringify(out, null, 2))
console.log(`Generated ${out.styles.length} styles, ${out.styles.reduce((a, s) => a + s.themes.length, 0)} themes.`)
