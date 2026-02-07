<template>

  <head>
    <title>Tunji Productions</title>
  </head>

  <!-- Body -->

  <div class="space-y-10">
    <NuxtImg src="/img/logo_clear.png" sizes="175px md:350px" class="mx-auto" />

    <Card class="w-4/5 md:w-2/3 lg:w-[40vw] mx-auto my-6">
      <template #header>
        <h3 class="mt-3 my-auto text-center text-3xl text-gray-900">Inspiration</h3>
      </template>
      <template #content>
        <p class="m-0 text-gray-800">
          I wanted to make a portfolio site. It'd be kinda boring if I only put
          coding projects though so I'll be using this as a base of operations
          for everything me from personal projects to requests to music to
          articles. I try put a lil smidgin of my soul in all my projects and
          now that I'm confident as a developer, I might as well showcase the
          work.
        </p>
      </template>
    </Card>

    <!-- SOTD Hero -->
    <div class="text-center space-y-10">
      <h3 class="text-2xl">Songs of the Day</h3>
      <MusicHero />
    </div>

    <p class="text-center pt-10">
      To share your own,
      <a href="http://twotone.app" target="_blank" class="underline hover:no-underline">download TwoTone today</a>
      😌
    </p>

    <div class="text-center">
      <h3 class="text-2xl mt-7 text-gray-800">Recent Highlights</h3>
      <Carousel circular :value="highlights" :numVisible="1" :showNavigators="false"
        class="mx-auto my-10 w-11/12 md:w-3/4 lg:w-2/3" :autoplayInterval="3500">
        <template #empty>
          <h3>Highlights coming soon!</h3>
        </template>

        <template #item="{ data }" class="flex justify-center align-middle">
          <Card class="w-full max-w-2xl self-center mx-auto my-10">
            <template #content>
              <div class="flex flex-col md:flex-row gap-5">
                <!-- Optional image -->
                <Image v-if="data.header" :src="data.header" width="150" class="rounded-lg self-center"
                  :alt="data.label" />

                <!-- Card info -->
                <div class="space-y-4 flex-1">
                  <h3 class="font-semibold text-gray-900">{{ data.label }}</h3>
                  <p class="text-gray-900">{{ data.blurb }}</p>
                  <Divider v-if="data.url" />
                  <Button v-if="data.url" as="a" target="_blank" rel="noopener" label="Learn More" :href="data.url" />
                </div>
              </div>
            </template>
          </Card>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, Card, Divider } from "primevue";
import Image from "primevue/image";
import { highlights } from "~/assets/constants";

useSeoMeta({
  title: "Tunji Productions",
  ogTitle: "Tunji Productions",
  twitterTitle: "Tunji Productions",
  ogImage: "/img/logo_bg.jpg",
  ogUrl: "https://tunjiproductions.com",
  twitterImage: "/img/logo_bg.jpg",
  twitterCard: "summary",
  description:
    "Home of Tunji Productions. Learn more about active and archived projects along with our mission.",
  ogDescription:
    "Home of Tunji Productions. Learn more about active and archived projects along with our mission.",
  twitterDescription:
    "Home of Tunji Productions. Learn more about active and archived projects along with our mission.",
});

useHead({
  meta: [
    { name: 'description', content: 'Tunji Productions - A launchpad to everything about me. My projects, my blog, music reviews, etc.' }
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});
</script>
