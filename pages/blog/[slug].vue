<template>
  <!-- Render the blog post as Prose & Vue components -->
  <Panel v-if="data" class="w-5/6 mx-auto my-20">
    <template #header v-if="data && data.title">
      <h2
        class="text-3xl my-5 font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl"
      >
        {{ data!.title }}
      </h2>
    </template>
    <div class="m-0 pb-5">
      <ContentRenderer v-if="data" :value="data" class="space-y-10 md:space-y-6" />
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
const route = useRoute();
const { data, error, status } = await useAsyncData(`blog-${route.params.slug}`, () => {
  return queryCollection("content").path(route.path).first();
}, {
  server: false
});

useSeoMeta({
  title: data.value && data.value.title || "Tunji Productions",
  ogTitle: data.value && data.value.title || "Tunji Productions",
  twitterTitle: data.value && data.value.title || "Tunji Productions",
  ogImage: "/img/logo_bg.jpg",
  ogUrl: "https://tunjiproductions.com/blog",
  twitterImage: "/img/logo_bg.jpg",
  twitterCard: "summary",
  description: data.value && data.value.description || "Tunji Productions Notbook",
  ogDescription: data.value && data.value.description || "Tunji Productions Notbook",
  twitterDescription: data.value && data.value.description || "Tunji Productions Notbook",
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

<style>
h3 {
  font-weight: 600;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
}
</style>
