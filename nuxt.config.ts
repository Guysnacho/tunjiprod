import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-02-08",
  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          as: "image",
          type: "image/x-icon",
          rel: "icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxthq/studio",
  ],
  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "light",
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  css: ["~/assets/css/main.scss", "~/assets/css/tailwind.css"],
  tailwindcss: { exposeConfig: true },
  runtimeConfig: {
    githubToken: "",
  },
});