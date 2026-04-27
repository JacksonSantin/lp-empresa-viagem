<template>
  <section class="container mx-auto px-4 py-16 space-y-16 printable">
    <div
      class="flex flex-col md:flex-row md:justify-between items-center mb-4 mt-10"
    >
      <h1 class="text-4xl font-bold mb-3 mt-10 md:mt-0">Natal</h1>
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
      Com ou sem emoção? É a pergunta mais freqüente dos motoristas aos turistas
      durante os passeios de buggy. Esses passeios são muito comuns em Natal,
      capital do Rio Grande do Norte e nas cidades próximas marcadas por dunas,
      como Genipabu. As dunas são tão comuns em Natal, que uma delas é símbolo
      da cidade: o Morro do Careca, na Praia de Ponta Negra. O centro urbano não
      é só formado por casas, prédios e lojas, lá está uma reserva de 1.172
      hectares de Mata Atlântica, perdendo em tamanho apenas para a Floresta da
      Tijuca, no Rio de Janeiro. Há outros locais que o turista também não pode
      deixar de conhecer: Forte dos Reis Magos, o Centro de Turismo, a Catedral
      Nova, o maior cajueiro do mundo, o Museu da Câmara Cascudo e o Farol da
      Mãe Luiza onde se pode ter uma vista panorâmica da cidade. Não muito longe
      de Natal esta a Praia de Pipa, moradia de tartarugas marinhas, golfinhos e
      que atrai turistas também pelos esportes ali praticados: mergulho, surfe e
      cavalgadas.
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
import { natal } from '~/core/const/nacionais/natal'
import { PrinterIcon, DocumentIcon, ShareIcon } from '@heroicons/vue/20/solid'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const destinos = ref(natal)

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
    pdf.save('natal.pdf')
    buttons.forEach(button => (button.style.display = 'block'))
  })
}
const compartilharPagina = () => {
  if (navigator.share) {
    navigator
      .share({
        title: 'Natal',
        text: 'Conheça mais sobre Natal.',
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
