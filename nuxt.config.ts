// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    NASA_API_KEY: process.env.NASA_API_KEY,
  },
  routeRules: {
    // NASA route cache for 12 hours
    '/api/apod':        { cache: { maxAge: 60 * (12 * 60) } },
  },
})