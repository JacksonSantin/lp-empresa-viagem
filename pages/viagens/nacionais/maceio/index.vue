<template>
  <section class="container mx-auto px-4 py-16 space-y-16 printable">
    <div
      class="flex flex-col md:flex-row md:justify-between items-center mb-4 mt-10"
    >
      <h1 class="text-4xl font-bold mb-3 mt-10 md:mt-0">Maceió</h1>
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
      A capital de Alagoas, Maceió tem as mais belas praias urbanas do Brasil. A
      sugestão é iniciar o passeio pela Avenida Beira Mar onde se encontram
      muitos quiosques, bares, restaurantes e praias perfeitas. Entre elas, não
      deixe de passar por Jatiúca, Ponta Verde e Sete Coqueiros. O encanto da
      Praia de Pajuçara é um capítulo a parte, nas piscinas naturais há cardumes
      coloridos que comem na mão dos banhistas. Em todas as praias de Maceió, a
      característica marcante é o mar multicolor, que vai do verde-esmeralda até
      águas cristalinas. Além das praias urbanas, quem vai a Maceió tem a
      oportunidade de conhecer também a Praia do Gunga, Praia de Paripueira e a
      Praia do Frances. Um pouco mais distante está Maragogi e a Foz do Rio São
      Francisco. Maragogi fica entre Recife e Maceió, porém pertence a Alagoas.
      Uma cidade pequena e aconchegante com um litoral divido e, na Foz do Rio
      São Francisco acontece o encontro das águas do Velho Chico com o mar.
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
import { maceio } from '~/core/const/nacionais/maceio'
import { PrinterIcon, DocumentIcon, ShareIcon } from '@heroicons/vue/20/solid'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const destinos = ref(maceio)

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
    pdf.save('maceio.pdf')
    buttons.forEach(button => (button.style.display = 'block'))
  })
}
const compartilharPagina = () => {
  if (navigator.share) {
    navigator
      .share({
        title: 'Maceió',
        text: 'Conheça mais sobre Maceió.',
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
