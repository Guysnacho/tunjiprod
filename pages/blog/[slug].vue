<template>
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer v-if="post" :value="post" />
</template>

<script setup>
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () => {
    return queryCollection('content').path(route.path).first()
})

useSeoMeta({
    title: post.value.title,
    ogTitle: post.value.title,
    twitterTitle: post.value.title,
    ogImage: '/img/logo_bg.jpg',
    ogUrl: 'https://tunjiproductions.com/blog',
    twitterImage: '/img/logo_bg.jpg',
    twitterCard: 'summary',
    description: post.value.description,
    ogDescription: post.value.description,
    twitterDescription: post.value.description,
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