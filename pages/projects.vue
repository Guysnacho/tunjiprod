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
            <ProjectCard v-for="(repo, idx) in data" :key="repo.id" :repo :idx />
        </div>
    </div>
</template>


<script setup>
const { data, error, status } = useFetch('/api/project')
</script>