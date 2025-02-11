<template>

    <h2></h2>
    <p :v-if="value" :v-for="article in value">article</p>

</template>

<script setup>
const { data: { value } } = await useAsyncData(`blog`, () => {
    return queryCollection('content').all()
})

useSeoMeta({
    title: 'Notebook | Tunji Productions',
    ogTitle: 'Notebook | Tunji Productions',
    twitterTitle: 'Notebook | Tunji Productions',
    ogImage: '/img/logo_bg.jpg',
    ogUrl: 'https://tunjiproductions.com/blog',
    twitterImage: '/img/logo_bg.jpg',
    twitterCard: 'summary',
    description: 'A blog of work done, discoveries, and more.',
    ogDescription: 'A blog of work done, discoveries, and more.',
    twitterDescription: 'A blog of work done, discoveries, and more.',
})

useHead({
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.ico'
        }
    ]
})
</script>