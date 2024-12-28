<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-80">
      <img
        src="../../assets/images/logo_dm.png"
        alt="Logo"
        class="mx-auto mb-4"
      />

      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">
            Usuário
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Usuário"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Senha"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-red-500 text-white py-2 rounded-md"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const config = useRuntimeConfig()
const tokenCookie = useCookie('token')
const username = ref('')
const password = ref('')
const correctUsername = config.public.user
const correctPassword = config.public.pass

const login = () => {
  if (
    username.value === correctUsername &&
    password.value === correctPassword
  ) {
    tokenCookie.value = window.crypto.randomUUID()
    localStorage.setItem('loggedIn', 'true')
    navigateTo('/')
  } else {
    Swal.fire({
      title: 'Oops :(',
      text: 'Usuário ou senha incorretos, tente novamente!',
      icon: 'error',
    })
  }
}
</script>
