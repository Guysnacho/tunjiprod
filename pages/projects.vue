<template>
    <div class="card">
        <Toast />
        <Card class="w-4/5 md:w-2/3 lg:w-[40vw] mx-auto my-6">
            <template #title>
                <h3 class="mt-3 text-center text-3xl">Projects</h3>
            </template>
            <template #content>
                <p class="m-0">Below you'll find a living document of my projects, both private and public. Both since
                    most of my work is done in siloed repos.
                </p>
            </template>
        </Card>

        <!-- <ProgressSpinner :v-show="status === 'pending'" /> -->

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-10">
            <Panel :v-show="data" v-for="repo in data" :key="repo.id" toggleable class="h-fit">
                <template #header>
                    <div class="flex items-center gap-2">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                            shape="circle" />
                        <span class="font-bold">{{ repo.name }}</span>
                    </div>
                </template>
                <template #footer>
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-2">
                            <div v-if="repo.visibility === 'public'" class="flex my-auto gap-3">
                                <i class="pi pi-globe my-auto" rounded text></i>
                                <p>Public</p>
                            </div>
                            <div v-else class="flex my-auto gap-3">
                                <i class="pi pi-lock my-auto" rounded text></i>
                                <p>Private</p>
                            </div>
                        </div>
                        <span class="text-surface-500 dark:text-surface-400">{{ format(new Date(repo.pushed_at),
                            'Pp') }}</span>
                    </div>
                </template>
                <template #icons>
                    <Button icon="pi pi-cog" severity="secondary" rounded text @click="toggle" />
                    <Menu ref="menu" id="config_menu" :model="items" popup />
                </template>
                <p class="m-0">
                    {{ repo.description }}
                </p>
            </Panel>
        </div>
    </div>
</template>


<script setup>
import { format } from 'date-fns';
import Menu from 'primevue/menu';
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const menu = ref(null);
const toast = useToast();
const router = useRouter();

const items = ref([
    {
        label: 'Refresh',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Search',
        icon: 'pi pi-search'
    },
    {
        separator: true
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const save = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
};

const { data, error, status } = useFetch('/api/project')
</script>