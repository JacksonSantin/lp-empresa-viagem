<template>
  <login />
</template>

<script setup lang="ts">
useHead({
  title: 'Login',
})

definePageMeta({
  layout: 'authentication',
  middleware: ['login'],
})
</script>
