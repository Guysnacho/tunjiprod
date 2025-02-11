<template>
    <!-- Render the blog post as Prose & Vue components -->
    <Panel v-if="data" class="w-5/6 mx-auto my-20">
        <template #header>
            <h2 :v-if="data && data.title"
                class="text-3xl my-5 font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                {{ data!.title }}
            </h2>
        </template>
        <div class="m-0">
            <ContentRenderer v-if="data" :value="data" />
        </div>
    </Panel>
    <Panel v-else-if="error" class="w-5/6 mx-auto my-20">
        <div class="m-0">
            <p>We ran into an issue pulling this particular post. Try again later.</p>
            <p>{{ error.message }}</p>
        </div>
    </Panel>
    <Panel v-else class="w-5/6 mx-auto my-20 flex justify-center">
        <ProgressSpinner class="m-auto self-center" />
    </Panel>
</template>

<script setup lang="ts">
const route = useRoute()
const { data, error } = await useAsyncData(`blog-${route.params.slug}`, () => {
    return queryCollection('content').path(route.path).first()
})

useSeoMeta({
    title: data.value!.title,
    ogTitle: data.value!.title,
    twitterTitle: data.value!.title,
    ogImage: '/img/logo_bg.jpg',
    ogUrl: 'https://tunjiproductions.com/blog',
    twitterImage: '/img/logo_bg.jpg',
    twitterCard: 'summary',
    description: data.value!.description,
    ogDescription: data.value!.description,
    twitterDescription: data.value!.description,
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