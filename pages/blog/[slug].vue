<template>
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer v-if="post" :value="post" />
</template>

<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
    return queryCollection('blog').path(slug).first()
})

console.log(slug)
console.log(error)
</script>