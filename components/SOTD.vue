<template>
    <div>
        <p>{{ props.sotd.created_at?.split("T")[0] }}</p>
    </div>
    <div v-ripple class="flex flex-row py-10" v-styleclass="{
        selector: `.${contentId}`,
        enterFromClass: 'hidden', enterActiveClass: 'animate-fadeinleft', enterToClass: 'visible',
        leaveFromClass: 'visible', leaveActiveClass: 'animate-fadeoutleft', leaveToClass: 'hidden'
    }">
        <div class="w-[160px] h-[160px] md:w-[224px] md:h-[224px]">
            <NuxtImg :alt="props.sotd.name" :src="props.sotd.album_art.url"
                class="rounded-md w-[160px] h-[160px] md:w-[224px] md:h-[224px] z-50 shadow-lg" />
        </div>
        <Fieldset :class="contentStyle">
            <div class="space-y-1">
                <h4 class="text-lg font-semibold">{{ props.sotd.name }}</h4>
                <p>{{ props.sotd.artists.join(" ") }}</p>
                <p>{{ props.sotd.album }}</p>
            </div>
            <p class="my-3">{{ props.sotd.description }}</p>
        </Fieldset>
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
const active = false

const props = defineProps<{ sotd: Sotd }>()
const contentId = `content${props.sotd.id}`
const contentStyle = `${contentId} ${active ? 'visibile' : 'hidden'} animate-duration-500 overflow-visible w-[160px] h-[160px] md:w-[224px] md:h-[224px] overflow-y-auto relative shadow-lg`
// console.log(contentStyle)
</script>