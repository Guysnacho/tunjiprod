<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 justify-between mx-auto">
        <slot mdc-unwrap="div" />
        <Spotty v-if="song || playlist" :song="song" :playlist="playlist" />
        <Image v-if="img" :src="img" width="350"
            class="rounded-lg mx-auto"
            :alt="img.substring(img.lastIndexOf('/'))" />
    </div>
</template>
<script setup lang="ts">
import Image from "primevue/image";

const { song, playlist, img } = defineProps<{ song?: string, playlist?: string, img?: string }>()
</script>