<template>
  <section class="container mx-auto px-4 py-16 space-y-16 printable">
    <div
      class="flex flex-col md:flex-row md:justify-between items-center mb-4 mt-10"
    >
      <h1 class="text-4xl font-bold mb-3 mt-10 md:mt-0">Fortaleza</h1>
      <div class="flex space-x-1 md:space-x-4 mt-3 md:mt-0">
        <PrinterIcon
          class="w-6 h-6 flex-none text-gray-900 cursor-pointer no-print hidden md:block"
          aria-hidden="true"
          @click="imprimirPagina"
        />
        <DocumentIcon
          class="w-6 h-6 flex-none text-gray-900 cursor-pointer no-print hidden md:block"
          aria-hidden="true"
          @click="gerarPdf"
        />
        <ShareIcon
          class="w-6 h-6 flex-none text-gray-900 cursor-pointer no-print"
          aria-hidden="true"
          @click="compartilharPagina"
        />
      </div>
    </div>
    <p class="text-justify mb-8">
      Fortaleza é uma das cidades mais agitadas do nordeste. Além do sol o ano
      inteiro, abriga quilômetros de belezas naturais, águas claras, cercadas de
      falésias e de barraquinhas que fazem a festa dos visitantes, com frutos do
      mar e bebidas típicas. Com o crescimento do turismo, modernizou-se
      oferecendo aos visitantes, belos hotéis, agradáveis restaurantes, lojas,
      artesanatos e diversos atrativos culturais. Além da incomparável diversão
      proporcionada pelo Beach Park, considerado o maior parque aquático da
      América do Sul, com atrações para toda a família.
    </p>
    <div class="p-4">
      <h2 class="text-2xl font-semibold mb-2">Suas principais praias são:</h2>
      <ul class="list-disc list-inside">
        <li>Praia de Iracema.</li>
        <li>Praia do Cumbuco.</li>
        <li>Praia das Fontes.</li>
        <li>Praia do Futuro.</li>
        <li>Praia da Canoa Quebrada.</li>
      </ul>
    </div>
    <p class="text-justify mb-8">
      O Ceará ficou conhecido em todo o Brasil pela boa safra de humoristas
      como: Chico Anysio, Renato Aragão, Tiririca, Falcão, Tom Cavalcante, além
      de outros tantos artistas locais. Quem visita o Ceará já sabe: diante de
      qualquer sinal de desânimo, lá estão especialistas de prontidão,
      receitando o melhor dos remédios: o riso.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="(destino, index) in destinos"
        :key="index"
        class="text-center border p-4 rounded-lg shadow-md"
      >
        <img
          :src="destino.image"
          class="w-full h-48 object-cover mb-4 rounded-lg"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { fortaleza } from '~/core/const/nacionais/fortaleza'
import { PrinterIcon, DocumentIcon, ShareIcon } from '@heroicons/vue/20/solid'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const destinos = ref(fortaleza)

const imprimirPagina = () => {
  const originalContent = document.body.innerHTML
  const printArea = document.querySelector('.printable').innerHTML
  document.body.innerHTML = printArea
  window.print()
  document.body.innerHTML = originalContent
  window.location.reload()
}
const gerarPdf = () => {
  const element = document.querySelector('.printable')
  const buttons = document.querySelectorAll('.no-print')
  buttons.forEach(button => (button.style.display = 'none'))
  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('fortaleza.pdf')
    buttons.forEach(button => (button.style.display = 'block'))
  })
}
const compartilharPagina = () => {
  if (navigator.share) {
    navigator
      .share({
        title: 'Fortaleza',
        text: 'Conheça mais sobre Fortaleza.',
        url: window.location.href,
      })
      .then(() => {
        console.log('Compartilhado com sucesso!')
      })
      .catch(error => {
        console.log('Erro ao compartilhar:', error)
      })
  } else {
    alert('Compartilhamento não suportado pelo navegador.')
  }
}

definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  .printable,
  .printable * {
    visibility: visible;
  }

  .printable {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
