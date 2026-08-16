// Reactive countdown to an ISO-ish datetime string.
import { ref, onMounted, onUnmounted } from 'vue'

export const useCountdown = (target: string) => {
  const hari = ref(0), jam = ref(0), menit = ref(0), detik = ref(0)
  let timer: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    const end = new Date(target).getTime()
    timer = setInterval(() => {
      const d = end - new Date().getTime()
      if (d < 0) { if (timer) clearInterval(timer); return }
      hari.value = Math.floor(d / 86400000)
      jam.value = Math.floor((d % 86400000) / 3600000)
      menit.value = Math.floor((d % 3600000) / 60000)
      detik.value = Math.floor((d % 60000) / 1000)
    }, 1000)
  })
  onUnmounted(() => { if (timer) clearInterval(timer) })
  return { hari, jam, menit, detik }
}
