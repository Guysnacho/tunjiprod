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
        icon: 'pi pi-sign-in'
    },
]
</script>

<template>
    <footer class="mt-32 py-5 bg-[#452e1f] text-white text-center h-48 border-t-yellow-500 border-t-2">
        <div class="m-auto space-y-5">
            <p>Let's Chat!</p>
            <div class="flex justify-around space-x-10 mx-auto">
                <a v-for="item in footerLinks" v-ripple :href="item.route" target="_blank" class="px-2">
                    <span :class="item.icon" />
                </a>
            </div>
            <p>Made with ❤ by Tunji Productions LLC.</p>
            <p class="text-sm">&copy; by Tunji Productions LLC. All Rights Reserved.</p>
        </div>
    </footer>
</template>