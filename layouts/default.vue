<template>
  <div class="flex flex-col min-h-screen bg-white">
    <Header />

    <div class="flex-grow">
      <slot />
      <CookieConsent />
    </div>

    <Footer />

    <a
      href="https://wa.me/5554999999999"
      target="_blank"
      class="fixed bottom-5 right-5 bg-[#25D366] w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 md:w-16 md:h-16"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path :d="mdiWhatsapp" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { mdiWhatsapp } from '@mdi/js'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import CookieConsent from '~/components/CookieConsent.vue'
</script>
