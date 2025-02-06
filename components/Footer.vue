<script lang="ts" setup>
const footerLinks = [
    {
        route: 'https://www.youtube.com/@tunjiproductions',
        icon: 'pi pi-youtube',
    },
    {
        route: 'https://www.instagram.com/itsadetunji',
        icon: 'pi pi-instagram'
    },
    {
        route: 'https://www.linkedin.com/in/sadetunji',
        icon: 'pi pi-linkedin'
    },
    {
        route: '/login',
        icon: 'pi pi-dooropen'
    },
]
</script>

<template>
    <footer class="mt-32 bg-[#452e1f] text-white text-center h-36">
        <div class="m-auto space-y-5">
            <p class="my-auto">Let's Chat!</p>
            <p class="my-auto">Made with ❤ by Tunji Productions LLC</p>
            <div class="flex space-x-10" v-for="item in footerLinks">
                <a v-ripple :href="item.route" target="_blank">
                    <span :class="item.icon" />
                </a>
            </div>
        </div>
    </footer>
</template>