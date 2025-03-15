<template>
    <div class="grid grid-cols-1 md:grid-cols-2 space-x-10 mx-auto">
        <slot mdc-unwrap="div" />
        <Spotty v-if="src" :src="src" />
    </div>
</template>
<script setup lang="ts">
const { src } = defineProps<{ src: string }>()
</script>