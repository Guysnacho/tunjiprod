<template>
    <NuxtImg :src="props.src" class="w-[30rem] h-[30rem] rounded-lg m-auto" />
</template>
<script setup lang="ts">
const props = defineProps<{ src: string }>()
</script>