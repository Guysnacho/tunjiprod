<template>

    <div class="w-5/6 md:w-2/3 mx-auto">
        <div class="h-40 flex select-none">
        </div>
        <div class="space-y-5 w-11/12 md:w-7/12 mx-auto md:mx-0">
            <h2 class="text-3xl my-auto select-none">Tunji's Notebook</h2>
            <p class="text-xl/7">
                Welcome to the Notebook. This one will contain highlights of work done, blog posts and write-ups about
                anything from silence to my love/hate relationship with SpringBoot, to my thoughts on Doechii winning a
                grammy and everything in between.
            </p>
            <p class="text-xl my-auto text-gray-800">Take your time.</p>
        </div>
        <p :v-if="value" :v-for="article in value">article</p>
    </div>

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