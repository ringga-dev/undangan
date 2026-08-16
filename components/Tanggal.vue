<template>
  <section style="background-color: #111111;" class="m-0 p-0" id="tanggal">
    <div class="container">
      <div class="text-center">
        <h1 class="font-estetik py-3" style="font-size: 2rem;">Waktu Menuju Acara</h1>
        <div class="border rounded-pill py-1 px-4">
          <div class="row justify-content-center">
            <div class="col-3 p-1">
              <h2 class="d-inline m-0 p-0">{{ hari }}</h2><small class="ms-1 me-0 my-0 p-0 d-inline">Hari</small>
            </div>
            <div class="col-3 p-1">
              <h2 class="d-inline m-0 p-0">{{ jam }}</h2><small class="ms-1 me-0 my-0 p-0 d-inline">Jam</small>
            </div>
            <div class="col-3 p-1">
              <h2 class="d-inline m-0 p-0">{{ menit }}</h2><small class="ms-1 me-0 my-0 p-0 d-inline">Menit</small>
            </div>
            <div class="col-3 p-1">
              <h2 class="d-inline m-0 p-0">{{ detik }}</h2><small class="ms-1 me-0 my-0 p-0 d-inline">Detik</small>
            </div>
          </div>
        </div>

        <p style="font-size: 0.9rem;" class="mt-4">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, insyaAllah kami akan menyelenggarakan
          acara :
        </p>

        <div class="overflow-x-hidden">
          <div data-aos="fade-left" data-aos-duration="1500">
            <h1 class="font-estetik" style="font-size: 2rem;">Akad</h1>
            <p>{{ config.akad }}</p>
          </div>

          <div data-aos="fade-right" data-aos-duration="1500">
            <h1 class="font-estetik" style="font-size: 2rem;">Resepsi</h1>
            <p>{{ config.resepsi }}</p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500">
          <a :href="config.mapsUrl" target="_blank"
            class="btn btn-outline-light btn-sm rounded-pill shadow m-2 px-3">
            <i class="fa-solid fa-map-location-dot me-2"></i>Lihat Google Maps
          </a>
          <p class="mb-0 mt-1" style="font-size: 0.9rem;">{{ config.address }}</p>
        </div>
      </div>
    </div>
  </section>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#111111" fill-opacity="1"
      d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z">
    </path>
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const config = useAppConfig().undangan

const hari = ref(0)
const jam = ref(0)
const menit = ref(0)
const detik = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const countDownDate = new Date(config.countdown).getTime()
  timer = setInterval(() => {
    const distance = countDownDate - new Date().getTime()
    if (distance < 0) {
      if (timer) clearInterval(timer)
      return
    }
    hari.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    jam.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    menit.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    detik.value = Math.floor((distance % (1000 * 60)) / 1000)
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
