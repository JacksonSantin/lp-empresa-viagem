<template>
  <section class="container mx-auto px-4 py-16 space-y-16 printable">
    <div
      class="flex flex-col md:flex-row md:justify-between items-center mb-4 mt-10"
    >
      <h1 class="text-4xl font-bold mb-3 mt-10 md:mt-0">França</h1>
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
      Um dos grandes destaques turísticos da França é Paris, que encanta pela
      beleza e ousadia de sua arquitetura. A Avenida Champs Élysées, famosa
      pelas lojas, restaurantes e hotéis de luxo, se estende por 1,88 km desde o
      Arco do Triunfo até a Praça da Concórdia. A Torre Eiffel, hoje símbolo de
      Paris, é uma estrutura revolucionária construída por Gustave Eiffel para a
      Exibição Universal de 1889. O Palácio de Versalhes representa o grande
      poder econômico e político da realeza francesa dos séculos XVII e XVIII,
      hoje é considerado um dos maiores palácios do mundo. O Louvre é um dos
      maiores e mais famosos museus do mundo que abriga, entre muitas outras
      obras de arte, a Mona Lisa de Leonardo da Vinci. A Notre-Dame é uma das
      mais antigas catedrais francesas em estilo gótico. Iniciada sua construção
      no ano de 1163, é dedicada a Maria, Mãe de Jesus Cristo (daí o nome
      Notre-Dame – Nossa Senhora). Outra bela visão da cidade está nos parques,
      como o Jardins des Tuileries, primeiro jardim público de Paris e nos
      passeios as margens do Rio Sena.
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
import { franca } from '~/core/const/internacionais/franca'
import { PrinterIcon, DocumentIcon, ShareIcon } from '@heroicons/vue/20/solid'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const destinos = ref(franca)

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
    pdf.save('franca.pdf')
    buttons.forEach(button => (button.style.display = 'block'))
  })
}
const compartilharPagina = () => {
  if (navigator.share) {
    navigator
      .share({
        title: 'França',
        text: 'Conheça mais sobre França.',
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
