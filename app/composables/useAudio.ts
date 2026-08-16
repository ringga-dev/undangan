// Shared singleton Audio instance (prevents stacked/overlapping playback).
// Must be called on the client (browser) with the music path.
import { useAsset } from './useAsset'

let instance: HTMLAudioElement | null = null
let boundPath: string | null = null

export const useAudio = (path?: string): HTMLAudioElement | null => {
  if (process.client === false) return null
  if (path && (!instance || boundPath !== path)) {
    instance = new Audio(useAsset(path))
    boundPath = path
  }
  return instance
}
