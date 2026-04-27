<template>
  <section class="container mx-auto px-4 py-16 space-y-16 printable">
    <div
      class="flex flex-col md:flex-row md:justify-between items-center mb-4 mt-10"
    >
      <h1 class="text-4xl font-bold mb-3 mt-10 md:mt-0">Porto Seguro</h1>
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
      Porto Seguro, localizado no sul da Bahia é considerado patrimônio
      histórico nacional. Atrai turistas que buscam conhecimento sobre o
      "nascimento" do Brasil, pois divide com Santa Cruz da Cabrália os marcos
      que relembram a chegada dos portugueses. Encanta com as belezas naturais
      dos seus 90 km de litoral, e ainda é reconhecido pela animação,
      principalmente na Praia de Taperapuã, a mais movimentada, por concentrar
      as barracas de praia. Há opções também para aqueles que buscam paz e
      tranqüilidade, como a charmosa vila de Trancoso e o Arraial d´Ajuda Eco
      Parque. Outro local a ser visitado é Recife de Fora, onde pode-se fazer um
      passeio de escuna e ver nas piscinas naturais peixes coloridos. No centro
      da cidade, está a Passarela do Álcool que abriga em seu casario colonial
      diversos restaurantes e lojas de artesanato. À noite, são montadas as
      barracas das famosas "batidas" de Porto Seguro, incluindo o "Capeta", uma
      bebida típica.
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
import { portoSeguro } from '~/core/const/nacionais/porto_seguro'
import { PrinterIcon, DocumentIcon, ShareIcon } from '@heroicons/vue/20/solid'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const destinos = ref(portoSeguro)

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
    pdf.save('porto_seguro.pdf')
    buttons.forEach(button => (button.style.display = 'block'))
  })
}
const compartilharPagina = () => {
  if (navigator.share) {
    navigator
      .share({
        title: 'Porto Seguro',
        text: 'Conheça mais sobre Porto Seguro.',
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
