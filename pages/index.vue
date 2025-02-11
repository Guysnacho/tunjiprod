<template>
    <div class="space-y-10">
        <NuxtImg src="/img/logo_clear.png" sizes="175px md:350px" class="mx-auto" />

        <Card class="w-4/5 md:w-2/3 lg:w-[40vw] mx-auto my-6">
            <template #header>
                <h3 class="mt-3 my-auto text-center text-3xl">Inspiration</h3>
            </template>
            <template #content>
                <p class="m-0">I wanted to make a portfolio site. It'd be kinda boring if I
                    only put coding projects though so I'll be using this as a base of operations for everything me from
                    personal projects to requests to music to articles. I try put a lil smidgin of my soul in all my
                    projects and now that I'm confident as a developer, I might as well showcase the work.
                </p>
            </template>
        </Card>

        <!-- SOTD Hero -->
        <div class="text-center space-y-10">
            <h3 class="text-2xl">Songs of the Day</h3>
            <MusicHero />
        </div>

        <p class="text-center pt-10">To share your own, <a href="http://twotone.app" target="_blank"
                class="underline hover:no-underline">download
                TwoTone
                today</a> 😌</p>

        <div class="text-center">
            <h3 class="text-2xl mt-7">Recent Highlights</h3>
            <Carousel circular :value="highlights" :numVisible="1" class="mx-auto my-10" :autoplayInterval="3500">
                <template #empty>
                    <h3>Highlights coming soon!</h3>
                </template>

                <template #item="{ data, index }" class="flex justify-center align-middle">
                    <Card class="w-fit sm:w-[25rem] self-center m-auto">
                        <template v-if="data.header" #header>
                            <div>
                                <Image :src="data.header" sizes="175px md:350px" class="mx-auto h-60 rounded-lg"
                                    :alt="data.label" />
                            </div>
                        </template>
                        <template #title>
                            <h3>{{ data.label }}</h3>
                        </template>
                        <template #content>
                            <p>{{ data.blurb }}</p>
                        </template>
                        <template #footer v-if="data.url">
                            <Divider />
                            <Button as="a" target="_blank" rel="noopener" label="Learn More" :href="data.url" />
                        </template>
                    </Card>
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button, Card, Divider } from 'primevue';

type Highlight = {
    label: string,
    blurb: string,
    url?: string,
    header?: string,
}
const highlights: Highlight[] = [{
    label: "TwoTone - Music",
    blurb: "TwoTone, a spot for music lovers to share the tracks that mean something to them.",
    header: "https://twotone.app/_app/immutable/assets/logo.D0G0UcNF.png",
    url: "https://twotone.app"
}, {
    label: "Tunji Productions x Nuxt",
    blurb: "Not my first rodeo with Vue but was a learning experience for sure. I think I was scared because at the time, I was a bad engineer. Fixed that.",
    header: "",
}, {
    label: "Kabu P.2 Electric Boogaloo",
    blurb: "After an eternity of waiting, sharpening my skills, honing my craft, I decided to pay a legacy project a visit.",
    header: "",
    url: "http://deprestigechauffeur.netlify.app/"
}]
const autoplayInterval = 3000

useSeoMeta({
    title: 'Tunji Productions',
    ogTitle: 'Tunji Productions',
    twitterTitle: 'Tunji Productions',
    ogImage: '/img/logo_bg.jpg',
    ogUrl: 'https://tunjiproductions.com',
    twitterImage: '/img/logo_bg.jpg',
    twitterCard: 'summary',
    description: 'Home of Tunji Productions. Learn more about active and archived projects along with our mission.',
    ogDescription: 'Home of Tunji Productions. Learn more about active and archived projects along with our mission.',
    twitterDescription: 'Home of Tunji Productions. Learn more about active and archived projects along with our mission.',
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

<!-- <style lang="scss">
#hero {}
</style> -->