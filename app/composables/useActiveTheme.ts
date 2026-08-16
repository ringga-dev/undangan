// Shared active style/theme state (survives across components & route changes).
import { useState } from '#imports'

export const useActiveTheme = () => {
  const styleId = useState<string>('styleId', () => 'elegant')
  const themeId = useState<string>('themeId', () => 'emerald')
  return { styleId, themeId }
}
