import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module", "@nuxtjs/tailwindcss", "@nuxt/image"],
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
    githubToken: '',
  },
});
