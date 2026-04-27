<template>
  <footer class="w-full">
    <div class="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 justify-items-center"
      >
        <div class="flex flex-col space-y-4 w-full max-w-xs">
          <div class="flex items-center">
            <img
              src="../assets/images/logo.png"
              alt="Logo"
              class="h-15 w-auto"
            />
          </div>
          <p class="text-justify text-gray-600">
            A <b>Travel Destination</b> está a 31 anos conectando você ao
            mundo!
          </p>
        </div>

        <div class="flex flex-col space-y-4 w-full max-w-xs">
          <h3 class="text-lg font-semibold text-gray-900">Endereço</h3>
          <address class="flex flex-col space-y-2 not-italic">
            <p class="text-sm text-gray-600">Rua XYZ, nº 100</p>
            <p class="text-sm text-gray-600">Centro</p>
            <p class="text-sm text-gray-600">Marau - RS</p>
            <p class="text-sm text-gray-600">CEP: 99150-000</p>
          </address>
          <div class="flex items-center justify-start gap-x-6">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=-28.438944412850333, -52.20849752947408"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Como chegar"
              class="rounded-md bg-sky-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
            >
              COMO CHEGAR
            </a>
          </div>
        </div>

        <div class="flex flex-col space-y-4 w-full max-w-xs">
          <h3 class="text-lg font-semibold text-gray-900">Contato</h3>
          <div class="flex flex-col space-y-2">
            <p class="text-sm text-gray-600">
              <span class="font-medium">WhatsApp:</span> (54) 9 9999-9999
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium">E-mail:</span>
              <a href="mailto:[removido]"> [removido] </a>
            </p>
            <div class="flex flex-col space-y-1">
              <span class="font-medium">Fones: </span>
              <p class="text-sm text-gray-600">(54) 3333-3333</p>
              <p class="text-sm text-gray-600">(54) 2222-2222</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-4 w-full max-w-xs">
          <h3 class="text-lg font-semibold text-gray-900">Redes Sociais</h3>
          <div class="flex space-x-6">
            <a
              href="https://wa.me/5554999999999"
              target="_blank"
              class="text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="mdiWhatsapp" />
              </svg>
            </a>
            <a
              href="[removido]"
              target="_blank"
              class="text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="mdiInstagram" />
              </svg>
            </a>
            <a
              href="[removido]"
              target="_blank"
              class="text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="mdiFacebook" />
              </svg>
            </a>
            <a
              href="https://open.spotify.com"
              target="_blank"
              class="text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="mdiSpotify" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 border-t border-gray-200 pt-8">
        <p class="text-center text-sm text-gray-600">
          &copy; {{ currentYear }} Travel Destination. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { mdiWhatsapp, mdiInstagram, mdiFacebook, mdiSpotify } from '@mdi/js'
import dayjs from 'dayjs'

const currentYear = dayjs().year()
</script>
