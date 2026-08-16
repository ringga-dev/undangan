<template>
  <section style="background-color: #111111;" class="m-0 p-0" id="mempelai">
    <div class="text-center">
      <h1 class="font-estetik py-4 px-2">Assalamualaikum Warahmatullahi Wabarakatuh</h1>

      <p class="pb-3 px-3">
        Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i serta kerabat
        sekalian untuk menghadiri acara pernikahan kami:
      </p>

      <div class="overflow-x-hidden">
        <div data-aos="fade-right" data-aos-duration="2000">
          <div class="cropper border border-3 border-light shadow my-4 mx-auto">
            <img :src="groomPhoto" alt="bg">
          </div>
          <h1 class="font-estetik" style="font-size: 3rem;">{{ config.groom.name }}</h1>
          <h5 class="mt-3 mb-0">Putra</h5>
          <p class="mb-0">{{ config.groom.parents }}</p>
        </div>

        <h1 class="font-estetik my-4" style="font-size: 4rem;">&amp;</h1>

        <div data-aos="fade-left" data-aos-duration="2000">
          <div class="cropper border border-3 border-light shadow my-4 mx-auto">
            <img :src="bridePhoto" alt="bg">
          </div>
          <h1 class="font-estetik" style="font-size: 3rem;">{{ config.bride.name }}</h1>
          <h5 class="mt-3 mb-0">Putri</h5>
          <p class="mb-0">{{ config.bride.parents }}</p>
        </div>
      </div>
    </div>
  </section>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#111111" fill-opacity="1"
      d="M0,192L40,181.3C80,171,160,149,240,149.3C320,149,400,171,480,165.3C560,160,640,128,720,128C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
    </path>
  </svg>

  <div class="container">
    <div class="text-center">
      <p style="font-size: 0.9rem;" class="px-2" data-aos="fade-up" data-aos-duration="1500">
        Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari
        jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu
        rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
        (kebesaran Allah) bagi kaum yang berpikir.
      </p>
      <span class="mb-0" data-aos="fade-up"><strong>QS. Ar-Rum Ayat 21</strong></span>
    </div>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#111111" fill-opacity="1"
      d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
    </path>
  </svg>
</template>

<script setup lang="ts">
import { useAsset } from '~/composables/useAsset'
const config = useAppConfig().undangan
const groomPhoto = useAsset(config.groom.photo)
const bridePhoto = useAsset(config.bride.photo)
</script>
