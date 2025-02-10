<template>
    <div class="space-y-20">
        <Toast />
        <Card class="w-4/5 md:w-2/3 lg:w-[40vw] mx-auto my-20">
            <template #header>
                <h3 class="mt-3 text-center text-3xl">Projects</h3>
            </template>
            <template #content>
                <div class="space-y-5">
                    <p class="m-0">Below you'll find a living document of my projects, both private and public. It occured
                    to me that sending people to my GitHub wasn't super helpful since most of my work is privately done
                    (TwoTone/De Prestige).
                </p>
                <p class="m-0">Solution! - Let me share what I can and hide the rest! Shout out to <a
                        href="https://github.com/octokit/octokit.js?tab=readme-ov-file#octokitjs"
                        class="underline hover:no-underline" target="_blank">Octokit</a>.</p>
                </div>
            </template>
        </Card>

        <!-- <ProgressSpinner :v-show="status === 'pending'" /> -->

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-10">
            <ProjectCard v-for="(repo, idx) in data" :key="repo.id" :repo :idx />
        </div>
    </div>
</template>


<script setup>
const { data, error, status } = useFetch('/api/project')

useSeoMeta({
    title: 'Projects | Tunji Productions',
    ogTitle: 'Projects | Tunji Productions',
    twitterTitle: 'Projects | Tunji Productions',
    ogImage: '/img/logo_bg.jpg',
    ogUrl: 'https://tunjiproductions.com/projects',
    twitterImage: '/img/logo_bg.jpg',
    twitterCard: 'summary',
    description: "Tunji Productions portfolio. A living document of our projects.",
    ogDescription: "Tunji Productions portfolio. A living document of our projects.",
    twitterDescription: "Tunji Productions portfolio. A living document of our projects.",
})

useHead({
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }
    ]
})
</script>