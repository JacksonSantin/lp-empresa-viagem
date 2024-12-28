<template>
  <ClientOnly>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-full opacity-0"
    >
      <div
        v-if="isVisible"
        class="fixed bottom-4 left-4 right-4 max-w-full md:mx-auto md:w-1/2 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200"
      >
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div class="flex-1">
            <h2
              class="flex items-center space-x-2 text-lg font-semibold text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Sua privacidade</span>
            </h2>
            <p class="text-gray-600">
              Usamos cookies para personalizar e melhorar a sua experiência. Ao
              navegar neste site, você concorda com a nossa
              <NuxtLink
                to="/politica-de-privacidade"
                class="text-sky-800 hover:text-sky-900 underline"
              >
                Política de Privacidade
              </NuxtLink>
              .
            </p>
          </div>
          <div class="flex-shrink-0">
            <button
              @click="handleConsent"
              class="w-full md:w-auto bg-sky-800 text-white px-6 py-2 rounded hover:bg-sky-900 transition-colors"
            >
              Ok, entendi
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup>
const isVisible = ref(true)

onMounted(() => {
  const hasConsented = localStorage.getItem('cookieConsent')
  if (hasConsented) {
    isVisible.value = false
  }
})

const handleConsent = () => {
  localStorage.setItem('cookieConsent', 'true')
  isVisible.value = false
}
</script>
