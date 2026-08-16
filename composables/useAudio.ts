// Shared singleton Audio instance so the opening screen and the music button
// control the SAME playback (prevents stacked / overlapping audio).
import { useAsset } from './useAsset'

let instance: HTMLAudioElement | null = null

export const useAudio = (): HTMLAudioElement => {
  if (!instance) {
    const config = useAppConfig().undangan
    instance = new Audio(useAsset(config.music))
  }
  return instance
}
