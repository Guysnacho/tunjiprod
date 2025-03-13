<template>
    <div class="mx-auto w-5/6">
        <ul class="list-disc">
            <li v-for="item in items" :key="item.blurb" class="list-item">
                <p v-if="item.blurb">{{ item.blurb }}</p>
                <ul v-if="item.sublist" class="list-disc pl-5">
                    <li v-for="subItem in item.sublist" class="list-item">
                        <p class="list-item">{{ subItem }}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
type ListItem = {
    blurb: string
    sublist?: string[]
}
const { items } = defineProps<{ items: ListItem[] }>()
</script>