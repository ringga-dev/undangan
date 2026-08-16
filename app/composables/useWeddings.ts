import data from '~/config/weddings.json'

export interface WeddingProfile {
  style?: string
  theme?: string
  groom: { name: string; parents: string; photo: string }
  bride: { name: string; parents: string; photo: string }
  cover: string
  dateText: string
  countdown: string
  calendarUrl: string
  akad: string
  resepsi: string
  mapsUrl: string
  address: string
  music: string
  gifts: { bank: string; logo: string; norek: string; nama: string }[]
  emailjs: { serviceId: string; templateId: string; fromEmail: string }
}

export const useWeddings = () => {
  const d = data as { default: string; profiles: Record<string, WeddingProfile> }
  const profiles = d.profiles

  const defaultProfile = (): WeddingProfile => profiles[d.default]
  const defaultStyle = (): string => defaultProfile().style || 'elegant'
  const defaultTheme = (): string => defaultProfile().theme || 'emerald'

  const findByCouple = (groom: string, bride: string): WeddingProfile => {
    if (!groom || !bride) return defaultProfile()
    const g = groom.trim().toLowerCase()
    const b = bride.trim().toLowerCase()
    const found = Object.values(profiles).find(
      (p) => p.groom.name.toLowerCase() === g && p.bride.name.toLowerCase() === b
    )
    return found || defaultProfile()
  }

  return { profiles, defaultProfile, defaultStyle, defaultTheme, findByCouple }
}
