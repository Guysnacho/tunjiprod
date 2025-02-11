<template>
    <div class="grid grid-cols-2 space-x-10 justify-around mx-auto">
        <p class="m-auto">{{ blurb }}</p>
        <Img :src />
    </div>
</template>
<script setup lang="ts">
const { blurb, src } = defineProps<{ src: string, blurb: string }>()
</script>