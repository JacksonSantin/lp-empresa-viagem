// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-27',
  devtools: { enabled: false },
  css: ['~/assets/css/global.css'],
  runtimeConfig: {
    public: {
      user: process.env.LOGIN_USERNAME,
      pass: process.env.LOGIN_PASSWORD,
    },
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap',
        },
      ],
      script: [
        {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=G-QRKG21WZT4`,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QRKG21WZT4');
          `,
        },
      ],
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/leaflet'],
})
