<template>
  <div class="relative w-full gallery-container">
    <div
      class="flex transition-transform duration-500 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full flex-shrink-0 h-full flex items-center justify-center banner-slide relative"
      >
        <div
          class="absolute inset-0"
          :style="{
            backgroundImage: `url(${image.link})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }"
        ></div>
        <div class="caption-overlay">
          <div class="caption-container">
            <div class="caption-content">
              <h2 class="caption-title">{{ image.title }}</h2>
              <p class="caption-description">{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold text-center mb-8">A Empresa</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      <div class="flex flex-col justify-center text-justify">
        <p class="text-lg text-gray-600 mb-4">
          As viagens turísticas, agenciadas com operadoras de renome nacional e
          internacional, tem seus destinos voltados para todos os recantes do
          mundo. O conhecimento dos proprietários e funcionários, orienta e dá
          segurança a todos que buscam a realização de sonhos visitando Europa,
          Estados Unidos, Ásia ou Austrália, com destaque especial para viagens
          à Itália.
        </p>
        <p class="text-lg text-gray-600 mb-4">
          Viagens a negócio ou trabalho têm a mesma atenção e cuidado para que o
          cliente possa ter o maior rendimento de seu tempo e tranqüilidade para
          seus afazeres. A emissão de bilhetes aéreos nacionais e
          internacionais, atualmente todos eletrônicos, permite o atendimento de
          cliente em todo mundo.
        </p>
        <p class="text-lg text-gray-600">
          Toda ação da <b>TRAVEL DESTINATION</b> tem como finalidade alcançar a satisfação do
          cliente e realizar os sonhos que tem em mente.
          <b>"VOCÊ SONHA A TRAVEL DESTINATION CONCRETIZA"</b>. A <b>TRAVEL DESTINATION</b> providencia
          bilhetes aéreos, reservas de hotel, transfers de chegada e saída,
          city-tour, passeios nos locais de destino, enfim tudo para tornar
          inesquecíveis momentos de sonho.
        </p>
      </div>

      <div class="flex justify-center items-center">
        <div class="relative w-full gallery">
          <div class="overflow-hidden shadow-lg">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${currentServiceIndex * 100}%)`,
              }"
            >
              <div
                v-for="(service, index) in imagesGallery"
                :key="index"
                class="w-full flex-shrink-0 relative"
              >
                <div
                  class="relative w-full"
                  :style="{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    aspectRatio: '16 / 9',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-16">
    <div class="flex justify-center items-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
        <div class="flex justify-center items-center flex-col">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">
            Formulário de Contato
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
                  <span class="font-bold"> Travel Destination </span>
                  <br />
                  <span class="font-semibold">Endereço:</span>
                  <span>
                    Rua XYZ, 100 - Centro, Marau - RS, 99150-000
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
                  for="assunto"
                  class="block text-sm font-medium text-gray-700"
                >
                  Assunto
                </label>
                <input
                  id="title"
                  placeholder="Quero viajar"
                  name="Assunto"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  oninvalid="this.setCustomValidity('Por favor, preencha o assunto')"
                  oninput="this.setCustomValidity('')"
                  required
                />
              </div>

              <div>
                <label
                  for="mensagem"
                  class="block text-sm font-medium text-gray-700"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="Mensagem"
                  placeholder="Deixe sua mensagem aqui..."
                  rows="4"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm"
                  oninvalid="this.setCustomValidity('Por favor, preencha a mensagem')"
                  oninput="this.setCustomValidity('')"
                  required
                ></textarea>
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
                <span class="font-bold"> Travel Destination </span>
                <br />
                <span class="font-semibold">Endereço:</span>
                <span>
                  Rua XYZ, 100 - Centro, Marau - RS, 99150-000
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
import { ref, onMounted } from 'vue'
import { banner } from '~/core/const/banner'
import { gallery } from '~/core/const/gallery'
import { vMaska } from 'maska/vue'

const zoom = ref(16)
const center = ref([-28.449004189088306, -52.199062626517886])
const markerPosition = ref([-28.449004189088306, -52.199062626517886])
const images = ref(banner)
const imagesGallery = ref(gallery)
const currentIndex = ref(0)
const currentServiceIndex = ref(0)
const totalSlides = images.value.length

function nextServiceSlide() {
  currentServiceIndex.value =
    (currentServiceIndex.value + 1) % imagesGallery.value.length
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides
}

onMounted(() => {
  setInterval(() => {
    nextSlide()
    nextServiceSlide()
  }, 5000)
})
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}

.h-96 {
  height: 24rem;
}

.gallery-container {
  height: 100vh;
  background-color: black;
}

.gallery {
  background-color: black;
}

.gallery-slide {
  background-size: contain;
}

.caption-overlay {
  @apply absolute inset-0 flex items-center justify-center;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
}

.caption-container {
  @apply px-6 py-3 text-center max-w-2xl;
}

.caption-content {
  @apply backdrop-blur-sm bg-black/30 p-4 rounded-lg;
}

.caption-title {
  @apply text-2xl font-bold mb-2 text-white;
}

.caption-description {
  @apply text-base text-gray-100;
}

@media screen and (max-width: 768px) {
  .gallery-container {
    height: 300px;
    margin-top: 5rem;
    background-color: transparent;
  }

  .gallery-slide {
    height: 100%;
    background-size: cover;
  }

  .banner-container {
    width: 100%;
  }

  .caption-container {
    @apply px-4;
  }

  .caption-content {
    @apply p-3;
  }

  .caption-title {
    @apply text-xl;
  }

  .caption-description {
    @apply text-sm;
  }
}
</style>
