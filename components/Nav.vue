<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem';

const items: MenuItem[] = [
    {
        label: "Home",
        icon: 'pi pi-home',
        route: "/",
    },
    {
        label: "Portfolio",
        icon: 'pi pi-briefcase',
        route: "/portfolio"
    },
    {
        label: "Manifesto",
        icon: 'pi pi-building-columns',
        route: "/manifesto"
    },
    {
        label: "Blog",
        icon: 'pi pi-book',
        route: "/blog"
    }
]
</script>

<template>
    <Menubar :model="items" is="nav" class="justify-center">
        <template #start>
            <NuxtImg src="/img/logo_clear.png" sizes="100px md:100px lg:100px" />
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <NuxtLink v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                </NuxtLink>
            </router-link>
            <NuxtLink v-else v-ripple class="flex items-center" v-bind="props.action">
                <span>{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                        item.shortcut }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
            </NuxtLink>
        </template>
        <!-- <template #end>
            <div class="flex items-center gap-2">
                <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                <NuxtLinkvatar image="https://ui-avatars.com/api/?name=John+Doe" shape="circle" />
            </div>
        </template> -->
    </Menubar>
</template>