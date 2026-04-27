<template>
  <Home />
</template>

<script setup lang="ts">
const title = 'Travel Destination'
const description =
  'Travel Destination Viagens nacionais e internacionais, nordeste, fortaleza, salvador, chile, argentina. Marau - RS Desenvolvido por Jackson Dhanyel Santin'
const keywords =
  'travel destination, viagens, turismo, turismo em marau, agência de turismo, agência de marau, pacotes de viagem, passagens aéreas, viagem, viagem para o nordeste, viagem para o chile, viagem de férias'
const image = '/_nuxt/assets/images/logo.png'

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
</script>
