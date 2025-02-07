<template>
    <div class="space-y-10">
        <NuxtImg src="/img/logo_clear.png" sizes="175px md:350px" class="mx-auto" />

        <Card class="w-4/5 md:w-2/3 lg:w-[40vw] mx-auto my-6">
            <template #title>
                <h3 class="mt-3">Inspiration</h3>
            </template>
            <template #content>
                <p class="m-0">I kinda wanted to make a portfolio site. It'd be kinda boring if I
                    only put coding projects though so I'm prolly gonna add my personal
                    projects too. I put a lil smidgin of my soul in all my work but now
                    that I've kind of hit a developer groove, I might as well put it in
                    one place.
                </p>
            </template>
        </Card>

        <!-- SOTD Hero -->
        <div class="text-center space-y-10">
            <h3 class="text-2xl">Songs of the Day</h3>
            <h3>SOTDs here</h3>
        </div>

        <p class="text-center">To share your own, <a href="http://twotone.app"
                class="underline hover:no-underline">download
                TwoTone
                today</a> 😌</p>

        <div class="text-center">
            <h3 class="text-2xl mt-7">Recent Highlights</h3>
            <Carousel circular :value="ting" :numVisible="3" >
                <template #empty>
                    <h3>Highlights coming soon!</h3>
                </template>

                <template #item="{ data, index }">
                    <Card class="w-[32rem]">
                        <template v-if="data.header" #header>
                            <NuxtImg :src="data.header" sizes="175px md:350px" class="mx-auto" :alt="data.label" />
                        </template>
                        <template #title>
                            <h3>{{ data.label }}</h3>
                        </template>
                        <template #content>
                            <p>{{ data.blurb }}</p>
                        </template>
                    </Card>
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Card } from 'primevue';

type Highlight = {
    label: string,
    blurb: string,
    url?: string,
    header?: string,
}
const ting: Highlight[] = [{
    label: "Tunji Productions x Nuxt",
    blurb: "Not my first rodeo with Vue but was a learning experience for sure. I think I was scared because at the time, I was a bad engineer. Fixed that.",
    header: "",
    url: "/"
}, {
    label: "Kabu P.2 Electric Boogaloo",
    blurb: "After an eternity of waiting, sharpening my skills, honing my craft, I decided to pay a legacy project a visit.",
    header: "",
    url: "http://deprestigechauffeur.netlify.app/"
}]
</script>

<!-- <style lang="scss">
#hero {}
</style> -->