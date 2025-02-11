<template>
    <div class="w-5/6 md:w-2/3 mx-auto space-y-12">
        <div class="h-10 flex select-none"></div>

        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:max-w-4xl">
                <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Tunji's Notebook
                </h2>
                <p class="mt-2 text-lg/8 text-gray-700">Welcome to the Notebook. This one will contain highlights of
                    work done,
                    blog posts and write-ups about anything from silence to my love/hate
                    relationship with SpringBoot, to my thoughts on Doechii winning a grammy
                    and everything in between.</p>
                <p class="mt-2 text-lg/8 text-gray-700">Take your time.</p>
                <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                    <!-- Notebook pages -->
                    <article v-if="data" v-for="post in data" :key="post.id"
                        class="relative isolate flex flex-col gap-8 lg:flex-row">
                        <div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                            <img v-if="post.thumb" :src="post.thumb" alt=""
                                class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover" />
                            <div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                        </div>
                        <div>
                            <div class="flex items-center gap-x-4 text-xs">
                                <p class="text-gray-500">{{ format(post.date, 'P') }}</p>
                                <NuxtLink :href="post.path"
                                    class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                    {{
                                        post.title }}</NuxtLink>
                            </div>
                            <div class="group relative max-w-xl">
                                <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                    <NuxtLink :href="post.path">
                                        <span class="absolute inset-0" />
                                        {{ post.title }}
                                    </NuxtLink>
                                </h3>
                                <p v-if="post && post.excerpt" class="mt-5 text-sm/6 text-gray-600">{{
                                    // @ts-expect-error asdf
                                    (post.excerpt.value as {}[]).map(item =>
                                        // @ts-expect-error asdf
                                        item[2]).join('.') }}</p>
                            </div>
                            <div class="mt-6 flex border-t border-gray-900/5 pt-6">
                                <div class="relative flex items-center gap-x-4">
                                    <img src="/img/Untitled_Artwork.png" alt="Portrait by Aint.Free"
                                        class="size-10 rounded-full bg-gray-50" />
                                    <div class="text-sm/6">
                                        <p class="font-semibold text-gray-900">
                                            <a href="https://linkedin.com/in/sadetunji" target="_blank">
                                                <span class="absolute inset-0" />
                                                Samuel A.
                                            </a>
                                        </p>
                                        <p class="text-gray-600">Software Extraordinaire</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <!-- If there's an error -->
                    <div v-else-if="error" class="mx-auto max-w-2xl lg:max-w-4xl">
                        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Had an
                            issue pulling notebook pages. Check back later.
                        </h2>
                        <p class="mt-2 text-lg/8 text-gray-700">{{ error.message }}</p>
                    </div>

                    <!-- If there's an error -->
                    <div v-else class="flex justify-center">
                        <ProgressSpinner class="m-auto self-center" />
                    </div>
                </div>
            </div>
        </div>
        <!-- <p :v-if="data" :v-for="article in data">article</p> -->
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';

const {
    data,
    error
} = await useAsyncData(`blog`, () => {
    return queryCollection("content").order("id", 'DESC').all();
});

useSeoMeta({
    title: "Notebook | Tunji Productions",
    ogTitle: "Notebook | Tunji Productions",
    twitterTitle: "Notebook | Tunji Productions",
    ogImage: "/img/logo_bg.jpg",
    ogUrl: "https://tunjiproductions.com/blog",
    twitterImage: "/img/logo_bg.jpg",
    twitterCard: "summary",
    description: "A blog of work done, discoveries, and more.",
    ogDescription: "A blog of work done, discoveries, and more.",
    twitterDescription: "A blog of work done, discoveries, and more.",
});

useHead({
    htmlAttrs: {
        lang: "en",
    },
    link: [
        {
            rel: "icon",
            type: "image/png",
            href: "/favicon.ico",
        },
    ],
});
</script>
