<template>
  <div class="space-y-10">
    <NuxtImg src="/img/logo_clear.png" sizes="175px md:350px" class="mx-auto" />

    <Card class="w-4/5 md:w-2/3 lg:w-[40vw] mx-auto my-6">
      <template #header>
        <h3 class="mt-3 my-auto text-center text-3xl">Inspiration</h3>
      </template>
      <template #content>
        <p class="m-0">
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
      <h3 class="text-2xl mt-7">Recent Highlights</h3>
      <Carousel circular :value="highlights" :numVisible="1" class="mx-auto my-10 w-11/12 md:w-2/3"
        :autoplayInterval="3500">
        <template #empty>
          <h3>Highlights coming soon!</h3>
        </template>

        <template #item="{ data, index }" class="flex justify-center align-middle">
          <Card class="w-fit sm:w-[25rem] self-center mx-auto my-10">
            <template #content>
              <div class="md:flex">
                <!-- Optional image -->
                <div class="flex justify-center">
                  <Image v-if="data.header" :src="data.header" width="250"
                    class="rounded-lg self-center justify-center place-items-center align-middle items-center"
                    :alt="data.label" />
                </div>
                <!-- Card info -->
                <div class="space-y-4">
                  <h3 class="font-semibold">{{ data.label }}</h3>
                  <p>{{ data.blurb }}</p>
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

const autoplayInterval = 3000;

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
    { name: 'Tunji Productions', content: 'Tunji Productions - A launchpad to everything about me. My projects, my blog, music reviews, etc.' }
  ],
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

<!-- <style lang="scss">
#hero {}
</style> -->
