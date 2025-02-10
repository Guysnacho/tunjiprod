<template>
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer v-if="post" :value="post" />
</template>

<script setup>
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () => {
    return queryCollection('content').path(route.path).first()
})
</script>