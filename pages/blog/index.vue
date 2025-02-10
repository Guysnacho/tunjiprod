<template>
    <p :v-if="value" :v-for="article in value">article</p>

</template>

<script setup>
const { data: { value } } = await useAsyncData(`blog`, () => {
    return queryCollection('content').all()
})
</script>