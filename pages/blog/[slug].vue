<template>
    <!-- Render the blog post as Prose & Vue components -->
    <Panel class="w-5/6 mx-auto my-20">
        <template #header>
            <h2 class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                {{ data.title }}
            </h2>
        </template>
        <div class="m-0">
            <ContentRenderer v-if="data" :value="data"  />
        </div>
    </Panel>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData(`blog-${route.params.slug}`, () => {
    return queryCollection('content').path(route.path).first()
})

useSeoMeta({
    title: data.value.title,
    ogTitle: data.value.title,
    twitterTitle: data.value.title,
    ogImage: '/img/logo_bg.jpg',
    ogUrl: 'https://tunjiproductions.com/blog',
    twitterImage: '/img/logo_bg.jpg',
    twitterCard: 'summary',
    description: data.value.description,
    ogDescription: data.value.description,
    twitterDescription: data.value.description,
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