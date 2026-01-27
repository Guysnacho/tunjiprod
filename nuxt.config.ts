import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Tunji Productions",
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          type: "image/x-icon",
          rel: "icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  // @ts-expect-error dw bout it?
  studio: {
    repository: {
      provider: "github",
      owner: "Guysnacho",
      repo: "tunjiprod",
      branch: "main",
    },
  },
  nitro: {
    prerender: {
      // Pre-render the homepage
      routes: ["/", "/blog"],
      // Then crawl all the links on the page
      crawlLinks: true,
    },
  },
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/content",
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
  compatibilityDate: "2026-01-27",
});
