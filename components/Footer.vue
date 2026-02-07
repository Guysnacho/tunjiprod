<script lang="ts" setup>
import { Button } from 'primevue';
import Divider from 'primevue/divider';

const socialLinks = [
    {
        route: 'https://github.com/Guysnacho',
        icon: 'pi pi-github',
        label: 'GitHub'
    },
    {
        route: 'https://www.linkedin.com/in/sadetunji',
        icon: 'pi pi-linkedin',
        label: 'LinkedIn'
    },
    {
        route: 'https://www.youtube.com/@tunjiproductions',
        icon: 'pi pi-youtube',
        label: 'YouTube'
    },
    {
        route: 'https://www.instagram.com/twotone.mobile',
        icon: 'pi pi-instagram',
        label: 'Instagram'
    },
];

const projectLinks = [
    {
        route: 'https://twotone.app',
        label: 'TwoTone Music',
        icon: 'pi pi-headphones'
    },
    {
        route: 'https://mcbios.com',
        label: 'MCBIOS Conference',
        icon: 'pi pi-calendar'
    },
];
</script>

<template>
    <footer class="mt-32 py-10 bg-[#452e1f] text-white border-t-yellow-500 border-t-2">
        <div class="max-w-6xl mx-auto px-6">
            <!-- Main Footer Content -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <!-- About Section -->
                <div class="space-y-3">
                    <h3 class="text-lg font-semibold text-yellow-400">Tunji Productions</h3>
                    <p class="text-sm text-gray-300">
                        Creating impactful digital experiences and innovative solutions.
                    </p>
                </div>

                <!-- Projects Section -->
                <div class="space-y-3">
                    <h3 class="text-lg font-semibold text-yellow-400">Featured Projects</h3>
                    <div class="flex flex-col space-y-2">
                        <a v-for="project in projectLinks" :key="project.route" :href="project.route" target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-300 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 justify-center md:justify-start">
                            <i :class="project.icon"></i>
                            {{ project.label }}
                        </a>
                    </div>
                </div>

                <!-- Connect Section -->
                <div class="space-y-3">
                    <h3 class="text-lg font-semibold text-yellow-400">Let's Connect</h3>
                    <div class="flex gap-3 justify-center md:justify-start flex-wrap">
                        <Button v-for="social in socialLinks" :key="social.route" :icon="social.icon"
                            :aria-label="social.label" as="a" :href="social.route" target="_blank"
                            rel="noopener noreferrer" text rounded severity="secondary"
                            class="!text-gray-300 hover:!text-yellow-400 hover:!bg-yellow-400/10" />
                    </div>
                </div>
            </div>

            <Divider class="!border-gray-600 my-6" />

            <!-- Bottom Bar -->
            <div class="text-center space-y-2">
                <p class="text-sm text-gray-300">Made with ❤️ by Tunji Productions LLC.</p>
                <p class="text-xs text-gray-400">&copy; {{ new Date().getFullYear() }} Tunji Productions LLC. All Rights
                    Reserved.</p>
            </div>
        </div>
    </footer>
</template>