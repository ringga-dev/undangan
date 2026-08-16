<template>
  <section class="container" id="home">
    <div class="text-center py-4">
      <h2 class="my-4">Undangan Pernikahan</h2>
      <div class="py-4">
        <div class="cropper border border-3 border-light shadow mx-auto">
          <img :src="cover" alt="bg">
        </div>
      </div>
      <h1 class="font-estetik my-4" style="font-size: 3rem;">{{ config.groom.name }} &amp; {{ config.bride.name }}</h1>
      <h4>{{ config.dateText }}</h4>
      <a class="btn btn-outline-light btn-sm shadow rounded-pill px-3 my-1" target="_blank" :href="config.calendarUrl">
        <i class="fa-solid fa-calendar-check me-2"></i>Simpan Waktu
      </a>
    </div>
  </section>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#111111" fill-opacity="1"
      d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
    </path>
  </svg>
</template>

<script setup lang="ts">
import { useAsset } from '~/composables/useAsset'
const config = useAppConfig().undangan
const cover = useAsset(config.cover)
</script>
