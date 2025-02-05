<script lang="ts">
import { NuxtImg } from "#components";

const items = [{
    label: "Home",
    badge: 2,
    shortcut: "S",
}, {
    label: "MUAHAHAHA",
    badge: 2,
    shortcut: "S",
}]
</script>

<template>
    <Menubar :model="items">
        <template #start>
            <NuxtImg src="/img/Logo_clear.png"  width="150px" />
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex items-center" v-bind="props.action">
                <span>{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                        item.shortcut }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
            </a>
        </template>
        <template #end>
            <div class="flex items-center gap-2">
                <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                <Avatar image="https://ui-avatars.com/api/?name=John+Doe" shape="circle" />
            </div>
        </template>
    </Menubar>
</template>