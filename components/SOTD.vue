<template>
    <div>
        <p>{{ props.sotd.created_at?.split("T")[0] }}</p>
    </div>
    <div v-ripple class="w-[160px] h-[160px] md:w-[224px] md:h-[224px]"
        v-styleclass="{ selector: '.box2', enterFromClass: 'hidden', enterActiveClass: 'animate-slidedown' }">
        <NuxtImg :alt="props.sotd.name" :src="props.sotd.album_art.url" class="rounded-md" />
    </div>
    <div class="hidden animate-duration-500 box2 overflow-hidden">
        <p>{{ props.sotd.name }}</p>
        <p>{{ props.sotd.artists.join(" ") }}</p>
        <p>{{ props.sotd.album }}</p>
        <p>{{ props.sotd.description }}</p>
    </div>
</template>

<script setup lang="ts">
export interface Sotd {
    id: number;
    created_at: string;
    name: string;
    description: string;
    album: string;
    album_art: AlbumArt;
    preview_url: null | string;
    artists: string[];
}

export interface AlbumArt {
    url: string;
    width: number;
    height: number;
}

const props = defineProps<{ sotd: Sotd }>()
</script>