<template>
    <div class="mb-10">
        <NuxtImg :src="props.src" class="w-full h-[30rem] overflow-hidden object-cover object-top" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{ src: string }>()
</script>