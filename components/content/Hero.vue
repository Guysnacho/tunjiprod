<template>
    <div class="space-y-5">
        <NuxtImg :src="props.src" class="w-full h-[15rem] md:h-[30rem] overflow-hidden object-cover object-top" />
        <p class="text-gray-600 text-center">Photo by <a :href="props.url" target="_blank">{{ props.artist }}</a></p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{ src: string, artist: string, url: string }>()
</script>