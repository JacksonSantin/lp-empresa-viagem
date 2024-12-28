<template>
  <Home />
</template>

<script setup lang="ts">
const title = 'Netur Viagens e Turismo'
const description =
  'Netur Viagens e Turismo Viagens nacionais e internacionais, nordeste, fortaleza, salvador, chile, argentina. Fone:(54)3342-6222 Rua Irineu Ferlin 246, Centro, Marau - RS Desenvolvido por JDS'
const keywords =
  'netur, viagens, turismo, turismo em marau, agência de turismo, agência de marau, pacotes de viagem, passagens aéreas, viagem, viagem para o nordeste, viagem para o chile, viagem de férias'
const image = '/_nuxt/assets/images/logo_netur.png'

useSeoMeta(
  {
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: 'summary_large_image',
  },
  { tagPriority: 10 }
)

useHead({
  title,
  htmlAttrs: {
    lang: 'pt-BR',
  },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

// definePageMeta({
//   middleware: ['auth'],
// })
</script>
