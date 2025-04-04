<template>
  <!-- Render the blog post as Prose & Vue components -->
  <Panel v-if="data" class="w-5/6 mx-auto my-20">
    <template #header v-if="data && data.title">
      <h2
        class="pt-5 md:px-10 text-3xl mx-auto font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl md:text-5xl">
        {{ data!.title }}
      </h2>
    </template>
    <div class="m-0 pb-5 md:p-10 w-11/12 mx-auto">
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
const { data, error, status } = await useAsyncData(
  `blog-${route.params.slug}`,
  () => {
    return queryCollection("content").path(route.path).first();
  },
  {
    server: false,
  }
);

useSeoMeta({
  title: (data.value && data.value.title) || "Tunji Productions - Notebook",
  ogTitle: (data.value && data.value.title) || "Tunji Productions - Notebook",
  twitterTitle: (data.value && data.value.title) || "Tunji Productions - Notebook",
  ogImage: "/img/logo_bg.jpg",
  ogUrl: "https://tunjiproductions.com/blog",
  twitterImage: "/img/logo_bg.jpg",
  twitterCard: "summary",
  description:
    (data.value && data.value.description) || "A blog of work done, discoveries, and more.",
  ogDescription:
    (data.value && data.value.description) || "A blog of work done, discoveries, and more.",
  twitterDescription:
    (data.value && data.value.description) || "A blog of work done, discoveries, and more.",
});

useHead({
  meta: [
    { name: (data.value && data.value.title) || "Tunji Productions - Notebook", content: (data.value && data.value.description) || 'A blog of work done, discoveries, and more.' }
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

<style>
h2 {
  font-weight: 500;
  font-size: 1.4rem
    /* 20px */
  ;
  line-height: 1.75rem
    /* 28px */
  ;
}

h3 {
  font-weight: 600;
  font-size: 1.25rem
    /* 20px */
  ;
  line-height: 1.75rem
    /* 28px */
  ;
}
</style>
