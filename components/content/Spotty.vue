<template>
    <iframe style="border-radius:12px" :src="src" height="352" frameBorder="0" class="mx-auto my-8 w-4/5 sm:w-10/12"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</template>
<script setup lang="ts">
const { src } = defineProps({ src: String })
</script>