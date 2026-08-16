<template>
  <div class="container">
    <div class="py-4">
      <div class="text-center">
        <h1 class="font-estetik mt-0 mb-3" style="font-size: 3rem;">Love Gift</h1>
        <p class="mb-1" style="font-size: 0.9rem;">
          Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih untuk kami,
          dapat melalui :
        </p>

        <div class="overflow-x-hidden">
          <div class="row justify-content-center">
            <div v-for="(g, i) in config.gifts" :key="g.bank"
              class="col-12 card-body border rounded-3 shadow p-3 m-3" style="max-width: 25rem;"
              data-aos="fade-down" data-aos-duration="1500">
              <img :src="g.logo" class="img-fluid rounded rounded-3" width="150" :alt="g.bank">
              <p class="card-text mt-3 mb-0" style="font-size: 0.9rem;">No. Rekening {{ g.norek }}</p>
              <p class="card-text" style="font-size: 0.9rem;">{{ g.nama }}</p>
              <button class="btn btn-light btn-sm" :data-nomer="g.norek" @click="salin($event, g.norek)">
                Salin No. Rekening
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useAppConfig().undangan

const salin = async (e: Event, nomer: string) => {
  const btn = e.currentTarget as HTMLButtonElement
  try {
    await navigator.clipboard.writeText(nomer)
  } catch {
    // ignore clipboard errors (e.g. non-secure context)
  }
  btn.innerHTML = 'Tersalin'
  btn.disabled = true
  setTimeout(() => {
    btn.innerHTML = 'Salin No. Rekening'
    btn.disabled = false
  }, 1500)
}
</script>
