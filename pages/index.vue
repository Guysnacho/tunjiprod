<script setup lang="ts">
import Project from '~/components/Project.vue';

const ting = [{}, {}, {}]
</script>

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
            <Carousel circular :value="ting">
                <template #empty>
                    <h3>Highlights coming soon!</h3>
                </template>

                <template #item="{ data, index }">
                    <Project />
                </template>
            </Carousel>
        </div>
    </div>
</template>

<!-- <style lang="scss">
#hero {}
</style> -->