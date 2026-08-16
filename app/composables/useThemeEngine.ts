// Theme engine: applies the selected style + color theme as CSS variables.
import themes from '~/config/themes.json'

type ThemeDef = { id: string; name: string; mode: string; colors: string[] }
type StyleDef = {
  id: string
  name: string
  mode: string
  radius: string
  divider: string
  font: { heading: string; body: string }
  themes: ThemeDef[]
}

export const useThemeEngine = () => {
  const styles = (themes as { styles: StyleDef[] }).styles
  const getStyle = (id: string) => styles.find((s) => s.id === id) || styles[0]
  const getTheme = (style: StyleDef, themeId: string) =>
    style.themes.find((t) => t.id === themeId) || style.themes[0]

  // Returns a CSS string with :root variables for server or client injection.
  const cssVars = (styleId: string, themeId: string): string => {
    const style = getStyle(styleId)
    const theme = getTheme(style, themeId)
    const [bg, surface, primary, accent, text] = theme.colors
    return `
:root {
  --c-bg: ${bg};
  --c-surface: ${surface};
  --c-primary: ${primary};
  --c-accent: ${accent};
  --c-text: ${text};
  --radius: ${style.radius};
  --font-heading: '${style.font.heading}';
  --font-body: '${style.font.body}';
}
[data-bs-theme="${style.mode}"] { --c-bg: ${bg}; --c-surface: ${surface}; --c-primary: ${primary}; --c-accent: ${accent}; --c-text: ${text}; }
`
  }

  const apply = (styleId: string, themeId: string) => {
    if (process.client === false) return
    const style = getStyle(styleId)
    const theme = getTheme(style, themeId)
    const [bg, surface, primary, accent, text] = theme.colors
    const root = document.documentElement
    root.style.setProperty('--c-bg', bg)
    root.style.setProperty('--c-surface', surface)
    root.style.setProperty('--c-primary', primary)
    root.style.setProperty('--c-accent', accent)
    root.style.setProperty('--c-text', text)
    root.style.setProperty('--radius', style.radius)
    root.style.setProperty('--font-heading', `'${style.font.heading}'`)
    root.style.setProperty('--font-body', `'${style.font.body}'`)
    root.setAttribute('data-bs-theme', style.mode)
    root.setAttribute('data-style', style.id)
    root.setAttribute('data-theme', theme.id)

    const fam = `${style.font.heading.replace(/ /g, '+')}|${style.font.body.replace(/ /g, '+')}`
    const href = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`
    let link = document.getElementById('theme-fonts') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = 'theme-fonts'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = href
  }

  return { styles, getStyle, getTheme, apply, cssVars }
}
