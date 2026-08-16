// Generates app/config/themes.json
// 5 visually DISTINCT templates, each with 5 DRAMATIC color themes.
// Each theme = [bg, surface, primary, accent, text] + mode (dark|light).
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'app', 'config', 'themes.json')

// helper: hex -> {r,g,b}
const hx = (h) => {
  const n = h.replace('#', '')
  return { r: parseInt(n.slice(0, 2), 16), g: parseInt(n.slice(2, 4), 16), b: parseInt(n.slice(4, 6), 16) }
}
const rgb = (o) => `rgb(${o.r},${o.g},${o.b})`
const lighten = (h, p) => {
  const { r, g, b } = hx(h)
  const m = (c) => Math.round(c + (255 - c) * p)
  return rgb({ r: m(r), g: m(g), b: m(b) })
}
const darken = (h, p) => {
  const { r, g, b } = hx(h)
  const m = (c) => Math.round(c * (1 - p))
  return rgb({ r: m(r), g: m(g), b: m(b) })
}

// Each style defines its own font + radius personality + 5 bold palettes.
const styles = [
  {
    id: 'elegant',
    name: 'Elegant',
    mode: 'dark',
    radius: '0.4rem',
    divider: 'line',
    font: { heading: 'Cormorant Garamond', body: 'Jost' },
    themes: [
      { id: 'emerald', name: 'Emerald Night', mode: 'dark', base: '#0b1f17', primary: '#1f7a52', accent: '#7CFFB2', text: '#EAF7F0' },
      { id: 'royal', name: 'Royal Plum', mode: 'dark', base: '#1a0b24', primary: '#7b2cbf', accent: '#E08BFF', text: '#F6ECFB' },
      { id: 'navy', name: 'Navy Gold', mode: 'dark', base: '#0b1320', primary: '#214e8c', accent: '#FFD166', text: '#ECF2FB' },
      { id: 'burgundy', name: 'Burgundy', mode: 'dark', base: '#1f0b10', primary: '#9e1b3a', accent: '#FF7A9C', text: '#FBECF0' },
      { id: 'bronze', name: 'Bronze', mode: 'dark', base: '#1c1407', primary: '#a3681f', accent: '#FFC36B', text: '#FBF3E7' }
    ]
  },
  {
    id: 'floral',
    name: 'Floral',
    mode: 'light',
    radius: '2rem',
    divider: 'leaf',
    font: { heading: 'Playfair Display', body: 'Poppins' },
    themes: [
      { id: 'rose', name: 'Rose Garden', mode: 'light', base: '#FFF1F4', primary: '#E21B5A', accent: '#FF8FA3', text: '#3A0E1C' },
      { id: 'blush', name: 'Blush Peony', mode: 'light', base: '#FDEEF6', primary: '#C2187A', accent: '#FF8FC8', text: '#3A0E2A' },
      { id: 'lilac', name: 'Lilac Dream', mode: 'light', base: '#F3EEFB', primary: '#7B2CAF', accent: '#C77DFF', text: '#26103A' },
      { id: 'sage', name: 'Sage Meadow', mode: 'light', base: '#EEF7EE', primary: '#2E9E5B', accent: '#8FE3A8', text: '#0E2A18' },
      { id: 'sky', name: 'Sky Bloom', mode: 'light', base: '#EAF6FB', primary: '#1C8FC2', accent: '#7AD4FF', text: '#0E2630' }
    ]
  },
  {
    id: 'minimal',
    name: 'Minimal',
    mode: 'mono',
    radius: '0rem',
    divider: 'hairline',
    font: { heading: 'Inter', body: 'Inter' },
    themes: [
      { id: 'noir', name: 'Noir', mode: 'dark', base: '#000000', primary: '#FFFFFF', accent: '#9A9A9A', text: '#FFFFFF' },
      { id: 'paper', name: 'Paper', mode: 'light', base: '#FFFFFF', primary: '#111111', accent: '#888888', text: '#111111' },
      { id: 'graphite', name: 'Graphite', mode: 'dark', base: '#1A1A1A', primary: '#E0E0E0', accent: '#7A7A7A', text: '#E8E8E8' },
      { id: 'ivory', name: 'Ivory', mode: 'light', base: '#F7F5F0', primary: '#2B2B2B', accent: '#A89A7B', text: '#2B2B2B' },
      { id: 'steel', name: 'Steel', mode: 'dark', base: '#0F1418', primary: '#C7D0D8', accent: '#5A8AA0', text: '#E2E8EE' }
    ]
  },
  {
    id: 'rustic',
    name: 'Rustic',
    mode: 'light',
    radius: '0.9rem',
    divider: 'rough',
    font: { heading: 'Lora', body: 'Nunito' },
    themes: [
      { id: 'terracotta', name: 'Terracotta', mode: 'light', base: '#FBEBE2', primary: '#B5491F', accent: '#E08A3C', text: '#3A1E10' },
      { id: 'olive', name: 'Olive Grove', mode: 'light', base: '#F0F3E6', primary: '#5E7A2E', accent: '#A7C24B', text: '#232B12' },
      { id: 'clay', name: 'Clay', mode: 'light', base: '#F7EFE2', primary: '#A8692E', accent: '#D6A24B', text: '#332011' },
      { id: 'forest', name: 'Forest', mode: 'light', base: '#E7F1E9', primary: '#2E7A4F', accent: '#5FB87A', text: '#102A1A' },
      { id: 'wheat', name: 'Wheat Field', mode: 'light', base: '#F8F3E2', primary: '#B5922E', accent: '#D9C24B', text: '#33290F' }
    ]
  },
  {
    id: 'modern',
    name: 'Modern',
    mode: 'dark',
    radius: '0rem',
    divider: 'diagonal',
    font: { heading: 'Space Grotesk', body: 'DM Sans' },
    themes: [
      { id: 'cyan', name: 'Cyan Pulse', mode: 'dark', base: '#03141A', primary: '#00BCD4', accent: '#18FFFF', text: '#E0F7FA' },
      { id: 'violet', name: 'Violet Neon', mode: 'dark', base: '#0E0A1F', primary: '#7C4DFF', accent: '#B388FF', text: '#EDE7FF' },
      { id: 'lime', name: 'Lime Grid', mode: 'dark', base: '#0E1603', primary: '#A4E50C', accent: '#D4FF4F', text: '#F0F7E0' },
      { id: 'coral', name: 'Coral Edge', mode: 'dark', base: '#1A0705', primary: '#FF5252', accent: '#FF8A65', text: '#FBECEA' },
      { id: 'magenta', name: 'Magenta Drive', mode: 'dark', base: '#160311', primary: '#E91E8C', accent: '#FF6EC7', text: '#FBE7F3' }
    ]
  }
]

const build = styles.map((s) => ({
  id: s.id,
  name: s.name,
  mode: s.mode,
  radius: s.radius,
  divider: s.divider,
  font: s.font,
  themes: s.themes.map((t) => ({
    id: t.id,
    name: t.name,
    mode: t.mode,
    colors: [
      t.base,
      t.mode === 'light' ? lighten(t.base, 0.04) : darken(t.base, 0.35),
      t.primary,
      t.accent,
      t.text
    ]
  }))
}))

writeFileSync(out, JSON.stringify({ styles: build }, null, 2) + '\n')
console.log(`Generated ${styles.length} styles, ${styles.reduce((a, s) => a + s.themes.length, 0)} themes.`)
