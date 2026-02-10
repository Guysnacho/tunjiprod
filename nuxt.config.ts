// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/a11y',
    '@nuxt/content',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@oro.ad/nuxt-claude-devtools',
    '@pinia/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-02-08',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en'
  },

  supabase: {
    redirect: false
  },

  image: {
    domains: ['images.unsplash.com']
  }
})