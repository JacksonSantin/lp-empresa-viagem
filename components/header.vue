<template>
  <header :class="['fixed inset-x-0 top-0 z-50', headerClass]">
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Netur Viagens e Turismo</span>
          <img
            class="h-8 w-auto"
            src="../assets/images/logo_netur.png"
            alt="Logo"
          />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon v-if="!mobileMenuOpen" class="size-6" aria-hidden="true" />
          <XMarkIcon v-else class="size-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12 lg:justify-end">
        <div v-for="item in navigation" :key="item.name">
          <Popover class="relative" v-if="item.children">
            <PopoverButton
              class="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 focus:outline-none"
            >
              {{ item.name }}
              <ChevronDownIcon
                class="size-5 flex-none text-gray-900"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute left-0 w-48 top-full z-10 mt-3 max-w-md overflow-hidden rounded bg-white bg-opacity-85 shadow-lg ring-1 ring-gray-900/5"
              >
                <div class="p-4">
                  <div
                    v-for="subItem in item.children"
                    :key="subItem.name"
                    class="group relative flex items-center gap-x-3 rounded p-4 text-sm/3"
                  >
                    <a
                      :href="subItem.href"
                      class="block font-semibold text-gray-900 hover:text-sky-900"
                    >
                      {{ subItem.name }}
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <a
            v-else
            :href="item.href"
            class="text-sm/6 font-semibold text-gray-900"
          >
            {{ item.name }}
          </a>
        </div>
      </PopoverGroup>
    </nav>
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Netur Viagens e Turismo</span>
            <img
              class="h-8 w-auto"
              src="../assets/images/logo_netur.png"
              alt="Logo"
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <Bars3Icon
              v-if="!mobileMenuOpen"
              class="size-6"
              aria-hidden="true"
            />
            <XMarkIcon v-else class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <div v-for="item in navigation" :key="item.name">
                <div v-if="item.children && item.children.length">
                  <Disclosure as="div" class="-mx-3">
                    <DisclosureButton
                      class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {{ item.name }}
                      <ChevronDownIcon
                        :class="[open ? 'rotate-180' : '', 'size-5 flex-none']"
                        aria-hidden="true"
                      />
                    </DisclosureButton>
                    <DisclosurePanel class="mt-2 space-y-2">
                      <DisclosureButton
                        v-for="subItem in item.children"
                        :key="subItem.name"
                        as="a"
                        :href="subItem.href"
                        class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {{ subItem.name }}
                      </DisclosureButton>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
                <div v-else>
                  <a
                    :href="item.href"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { header } from '~/core/const/header'

const navigation = ref(header)
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const headerClass = computed(() => {
  return {
    'bg-white bg-opacity-85 transform translate-y-0 opacity-100 transition-all duration-300':
      isScrolled.value,
    'bg-white bg-opacity-85 transform translate-y-0 transition-all duration-300':
      !isScrolled.value,
  }
})
</script>

<style scoped>
.header {
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease,
    transform 0.3s ease;
}
</style>
