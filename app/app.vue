<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Conference Suite by Tunji Productions'
const description =
  'A comprehensive management platform built for academic longevity. Seamless integration, persistent data, and professional delivery for every event.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage:
    'https://images.unsplash.com/photo-1726384780582-40353de8d036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
  twitterImage:
    'https://images.unsplash.com/photo-1726384780582-40353de8d036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp
    class="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900"
  >
    <AppNavbar />

    <NuxtPage />

    <AppFooter />
  </UApp>
</template>
