<template>
    <div class="space-y-4">
        <NuxtImg src="/img/logo_clear.png" sizes="175px md:350px" class="mx-auto" />

        <Card class="w-4/5 md:w-[25vw] mx-auto my-6">
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

        <p class="my-10 text-center">To share your own, <a href="http://twotone.app" class="underline">download TwoTone
                today</a> 😌</p>

        <h3>Projects</h3>
    </div>
</template>

<!-- <style lang="scss">
#hero {}
</style> -->