// Active wedding profile (which couple is shown). Driven by ?to=slug query or switcher.
import { useState } from '#imports'
import { useWeddings } from './useWeddings'

export const useActiveWedding = () => {
  const { profiles, defaultProfile } = useWeddings()
  const slug = useState<string>('weddingSlug', () => '')
  const setSlug = (s: string) => { if (profiles[s]) slug.value = s }
  const profile = () => profiles[slug.value] || defaultProfile()
  return { slug, setSlug, profile, profiles }
}
