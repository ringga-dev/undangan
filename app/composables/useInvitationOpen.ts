// Tracks whether the invitation overlay has been opened at least once
// (so swapping styles doesn't re-show the opening screen).
import { useState } from '#imports'

export const useInvitationOpen = () => {
  const opened = useState<boolean>('invOpened', () => false)
  const markOpened = () => { opened.value = true }
  return { opened, markOpened }
}
