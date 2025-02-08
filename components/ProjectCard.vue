<template>
    <Panel toggleable class="h-fit" :key="props.repo.id">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="pi pi-github my-auto" rounded text></i>
                <span class="font-bold">{{ props.repo.name }}</span>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <div v-if="props.repo.visibility === 'public'" class="flex my-auto gap-3">
                        <i class="pi pi-globe my-auto" rounded text></i>
                        <p>Public</p>
                    </div>
                    <div v-else class="flex my-auto gap-3">
                        <i class="pi pi-lock my-auto" rounded text></i>
                        <p>Private</p>
                    </div>
                </div>
                <span class="text-surface-500 dark:text-surface-400">{{ format(new Date(props.repo.pushed_at),
                    'Pp') }}</span>
            </div>
        </template>
        <template #icons>
            <Button v-if="items.length" icon="pi pi-cog" severity="secondary" rounded text @click="toggle" />
            <Menu ref="menu" :id="`config_menu${idx}`" :model="items" popup>
                <template #item="{ item, props }">
                    <a v-if="item.route" v-ripple :href="item.route" v-bind="props.action" custom>
                            <span :class="item.icon"></span>
                            <span>{{ item.label }}</span>
                    </a>
                    <div v-else class="justify-around content-around">
                        <a v-ripple class="flex items-center gap-3">
                            <i :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                        </a>
                    </div>
                </template>
            </Menu>
        </template>
        <p class="m-0">
            {{ props.repo.description }}
        </p>
    </Panel>
</template>

<script lang="ts" setup>
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { format } from "date-fns";

type ProjectList = RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]

const props = defineProps<{ repo: ProjectList['data'][number], idx: number }>()

const items: any[] = []
console.log(props.repo)

if (props.repo.homepage) {
    items.push({
        label: 'Check it Out',
        icon: 'pi pi-link',
        route: props.repo.homepage
    },
        {
            separator: true
        })
}

if (props.repo.html_url && props.repo.visibility === 'public') {
    items.push({
        label: 'Repo Link',
        icon: 'pi pi-github',
        route: props.repo.html_url
    },
        {
            separator: true
        })
}

if (props.repo.watchers_count) {
    items.push({
        label: props.repo.watchers_count + ' Watchers',
        icon: 'pi pi-users'
    })
} else if (props.repo.stargazers_count) {
    items.push({
        label: props.repo.stargazers_count + ' Stars',
        icon: 'pi pi-star'
    })
}

const menu = ref(null);

const toggle = (event: any) => {
    menu.value.toggle(event);
};
</script>