<template>
    <p :v-if="articles" :v-for="article in value">article</p>

</template>

<script setup>
const slug = useRoute().params.slug
const { data: { value } } = await useAsyncData(`blog`, () => {
    return queryCollection('blog').all()
})
console.log(value)
</script>