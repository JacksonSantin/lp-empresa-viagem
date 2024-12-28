<template>
  <section class="container mx-auto px-4 py-16 space-y-16">
    <div class="text-center mb-8 mt-10">
      <h1 class="text-4xl font-bold mb-4">Viagens Internacionais</h1>
      <p class="text-lg">Descubra destinos incríveis fora do Brasil !</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="destino in destinos"
        :key="destino.name"
        class="text-center border p-4 rounded-lg shadow-md"
      >
        <a :href="destino.link">
          <img
            :src="destino.image"
            :alt="destino.name"
            class="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <h2 class="text-2xl font-semibold">{{ destino.name }}</h2>
        </a>
      </div>
    </div>

    <div
      class="flex justify-center items-center border-t border-gray-200 px-4 py-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
        <div class="flex justify-center items-center flex-col">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">
            Consulte Outros Roteiros
          </h2>

          <div class="w-full h-64 mb-6 block md:hidden">
            <LMap
              ref="map"
              :zoom="zoom"
              :center="center"
              :use-global-leaflet="false"
              class="w-full h-full rounded-lg shadow-md"
            >
              <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
              />
              <LMarker :lat-lng="markerPosition">
                <LPopup>
                  <span class="font-bold"> Netur Viagens e Turismo </span>
                  <br />
                  <span class="font-semibold">Endereço:</span>
                  <span>
                    Rua Irineu Ferlin, 246 - Centro, Marau - RS, 99150-000
                  </span>
                </LPopup>
              </LMarker>
            </LMap>
          </div>

          <div class="w-full max-w-md space-y-8">
            <form
              ref="form"
              @submit.prevent="sendEmail"
              method="POST"
              class="space-y-6"
            >
              <div>
                <label
                  for="nome"
                  class="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  id="name"
                  placeholder="Jhon Doe"
                  name="Nome"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  oninvalid="this.setCustomValidity('Por favor, preencha o nome')"
                  oninput="this.setCustomValidity('')"
                  required
                />
              </div>

              <div>
                <label
                  for="telefone"
                  class="block text-sm font-medium text-gray-700"
                >
                  Telefone
                </label>
                <input
                  id="phone"
                  placeholder="(54) 9 9999-9999"
                  name="Telefone"
                  type="tel"
                  data-maska="['(##) ####-####', '(##) # ####-####']"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  v-maska
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="[removido]"
                  name="E-mail"
                  type="email"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  oninvalid="this.setCustomValidity('Por favor, insira um endereço de email válido')"
                  oninput="this.setCustomValidity('')"
                  required
                />
              </div>

              <div>
                <label
                  for="Para Onde?"
                  class="block text-sm font-medium text-gray-700"
                >
                  Para Onde?
                </label>
                <input
                  id="where"
                  placeholder="Natal"
                  name="Para Onde?"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  oninvalid="this.setCustomValidity('Por favor, preencha o destino')"
                  oninput="this.setCustomValidity('')"
                  required
                />
              </div>

              <div>
                <label
                  for="Quantas Pessoas?"
                  class="block text-sm font-medium text-gray-700"
                >
                  Quantas Pessoas?
                </label>
                <input
                  id="people"
                  placeholder="10"
                  name="Quantas Pessoas?"
                  type="number"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  oninvalid="this.setCustomValidity('Por favor, preencha o número de pessoas')"
                  oninput="this.setCustomValidity('')"
                  required
                />
              </div>

              <div>
                <label
                  for="Quando?"
                  class="block text-sm font-medium text-gray-700"
                >
                  Quando?
                </label>
                <input
                  id="when"
                  placeholder="01/01/2025"
                  name="Quando?"
                  type="text"
                  data-maska="##/##/####"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  oninvalid="this.setCustomValidity('Por favor, preencha o dia')"
                  oninput="this.setCustomValidity('')"
                  required
                  v-maska
                />
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full py-2 px-4 bg-sky-900 text-white font-semibold rounded-md hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 sm:text-lg"
                  disabled
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="z-10 flex justify-center items-center hidden md:block">
          <LMap
            ref="map"
            :zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
            class="w-full h-full rounded-lg shadow-md"
          >
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
            />
            <LMarker :lat-lng="markerPosition">
              <LPopup>
                <span class="font-bold"> Netur Viagens e Turismo </span>
                <br />
                <span class="font-semibold">Endereço:</span>
                <span>
                  Rua Irineu Ferlin, 246 - Centro, Marau - RS, 99150-000
                </span>
              </LPopup>
            </LMarker>
          </LMap>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vMaska } from 'maska/vue'
import { internationalDestination } from '~/core/const/internationalDestination'
import Swal from 'sweetalert2'

const zoom = ref(16)
const center = ref([-28.449004189088306, -52.199062626517886])
const markerPosition = ref([-28.449004189088306, -52.199062626517886])

const destinos = ref(internationalDestination)

definePageMeta({
  layout: 'default',
})
// definePageMeta({
//   middleware: ['auth'],
// })
</script>

<script>
import emailjs from '@emailjs/browser'

export default {
  methods: {
    sendEmail() {
      const formElement = this.$refs.form
      emailjs
        .sendForm(
          'gmailMessage',
          'template_rdu5oja',
          formElement,
          'user_0VFYQ4JjMn4RkCcdx9GRB'
        )
        .then(
          async () => {
            await Swal.fire({
              title: 'Obrigado :)',
              text: 'Mensagem enviada com sucesso!',
              icon: 'success',
            })
            window.location.reload()
          },
          () => {
            Swal.fire({
              title: 'Oops :(',
              text: 'Mensagem não enviada, tente novamente!',
              icon: 'error',
            })
          }
        )
    },
  },
}
</script>
