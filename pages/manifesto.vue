<template>

    <head>
        <title>Tunji Manifesto</title>
    </head>

    <!-- Body -->

    <div class="relative py-16 md:py-24">
        <!-- Decorative background -->
        <div class="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 opacity-20"></div>

        <div class="relative">
            <h1
                class="text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent mb-4">
                Tunji Manifesto
            </h1>
            <div class="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
        </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 space-y-16 pb-20">
        <blockquote class="relative py-12">
            <svg class="absolute left-1/2 -translate-x-1/2 -top-8 size-20 text-amber-200 dark:text-amber-900/30"
                width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"></path>
            </svg>

            <div
                class="relative z-10 text-center bg-white/50 backdrop-blur-sm rounded-2xl py-8 px-6 shadow-sm border border-gray-100">
                <p class="text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed font-medium"><em>
                        I want anything we build and any project we work on to
                    </em></p>
            </div>
        </blockquote>

        <div
            class="bg-gradient-to-br from-white to-amber-50/30 rounded-3xl shadow-xl p-8 md:p-12 border border-amber-100">
            <ul class="space-y-6">
                <li class="flex items-start gap-4 group">
                    <span
                        class="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 shadow-lg shadow-orange-600/30 group-hover:scale-125 transition-transform"></span>
                    <span
                        class="text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">Support
                        my growing family</span>
                </li>
                <li class="flex items-start gap-4 group">
                    <span
                        class="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-green-700 to-emerald-800 shadow-lg shadow-green-700/30 group-hover:scale-125 transition-transform"></span>
                    <span
                        class="text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">Elevate
                        Nigeria</span>
                </li>
                <li class="flex items-start gap-4 group">
                    <span
                        class="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-amber-600 to-yellow-700 shadow-lg shadow-amber-600/30 group-hover:scale-125 transition-transform"></span>
                    <span
                        class="text-lg md:text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">Exemplify
                        high quality products</span>
                </li>
                <li class="flex items-start gap-4 group">
                    <span
                        class="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-red-700 to-orange-800 shadow-lg shadow-red-700/30 group-hover:scale-125 transition-transform"></span>
                    <span
                        class="text-lg md:text-xl font-bold text-gray-900 group-hover:text-red-800 transition-colors">Leave
                        clients with a smile (or at the bare minimum satisfied)</span>
                </li>
            </ul>
        </div>
        <div class="space-y-6">
            <Accordion value="0">
                <AccordionPanel value="0"
                    class="bg-white rounded-2xl shadow-lg border border-amber-200/50 overflow-hidden hover:shadow-xl transition-shadow">
                    <AccordionHeader
                        class="p-6 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-colors">
                        <h2
                            class="text-2xl md:text-3xl font-bold text-center text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-700 hover:to-orange-600 transition-all">
                            The Focus</h2>
                    </AccordionHeader>
                    <AccordionContent class="p-6 pt-2 bg-gradient-to-br from-amber-50/30 to-white">
                        <p class="text-gray-700 text-lg leading-relaxed">
                            There's a growing number of people that need Software Engineering services, from hotels that
                            handle their booking by hand to student led orgs that don't have the skills (yet), to
                            Nations
                            caught
                            unaware or lacking because they have other pressing issues like infrastructure. Infra like
                            roads, not
                            like terraform.
                        </p>
                        <br />
                        <p class="text-gray-900 text-lg font-semibold">My goal is to bridge the gap.</p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel value="1"
                    class="bg-white rounded-2xl shadow-lg border border-amber-200/50 overflow-hidden hover:shadow-xl transition-shadow">
                    <AccordionHeader
                        class="p-6 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-colors">
                        <h2
                            class="text-2xl md:text-3xl font-bold text-center text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-700 hover:to-emerald-700 transition-all">
                            Academia</h2>
                    </AccordionHeader>
                    <AccordionContent class="p-6 pt-2 bg-gradient-to-br from-green-50/30 to-white">
                        <p class="text-gray-700 text-lg leading-relaxed">
                            Working with MCBIOS has taught me that smart people do cool things. Whether that's
                            understanding how medicine interacts with cells or publishing their findings, a lot
                            of this work is waaaayyy out of my scope (currently) but that doesn't mean there
                            isn't a place for change.
                        </p>
                        <br />
                        <p class="text-gray-700 text-lg leading-relaxed">
                            Letting smart people focus on doing smart things is the goal, I'm glad to scaffold tooling
                            that makes that job easier. For me, that's the MCBIOS website collection. - <a
                                target="_blank" rel="noopener" href="https://mcbios.com"
                                class="text-green-700 hover:text-green-800 underline hover:no-underline font-medium transition-colors">https://mcbios.com</a>
                        </p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel value="2"
                    class="bg-white rounded-2xl shadow-lg border border-amber-200/50 overflow-hidden hover:shadow-xl transition-shadow">
                    <AccordionHeader
                        class="p-6 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-colors">
                        <h2
                            class="text-2xl md:text-3xl font-bold text-center text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-700 hover:to-amber-700 transition-all">
                            Family</h2>
                    </AccordionHeader>
                    <AccordionContent class="p-6 pt-2 bg-gradient-to-br from-orange-50/30 to-white">
                        <p class="text-gray-700 text-lg leading-relaxed">
                            If I'm up, then we're all up. I live by this with the work I do on the job and I try to
                            embody this when family comes through with an app request.
                        </p>

                        <br />

                        <p class="text-gray-700 text-lg leading-relaxed">
                            Shockingly, we don't have access to engineers to build every app our heart wishes for. We're
                            not trust-funders and nepotism hasn't blessed us. Most of us are 1st generation immigrants
                            that
                            are trying to survive. I want to bridge this gap.
                        </p>

                        <br />

                        <p class="text-gray-700 text-lg leading-relaxed">
                            We can't give handouts but we can enable greatness. For me that's my mom's site
                            <a target="_blank" rel="noopener" href="https://bosedeadetunji.com"
                                class="text-orange-700 hover:text-orange-800 underline hover:no-underline font-medium transition-colors">https://bosedeadetunji.com</a>
                            and my uncle's <span class="line-through">upcoming</span> chauffeuring app <a target="_blank"
                                rel="noopener" href="http://deprestigechauffeur.netlify.app"
                                class="text-orange-700 hover:text-orange-800 underline hover:no-underline font-medium transition-colors">De
                                Prestige Chauffeur</a>. They don't
                            have the time to run up Wix and make something barely cool so I want to bridge the gap.
                        </p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel value="3"
                    class="bg-white rounded-2xl shadow-lg border border-amber-200/50 overflow-hidden hover:shadow-xl transition-shadow">
                    <AccordionHeader
                        class="p-6 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-colors">
                        <h2
                            class="text-2xl md:text-3xl font-bold text-center text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-800 hover:to-orange-700 transition-all">
                            Service and Cool Factor 🫀</h2>
                    </AccordionHeader>
                    <AccordionContent class="p-6 pt-2 bg-gradient-to-br from-red-50/30 to-white">
                        <p class="text-gray-900 text-lg font-semibold mb-4">Everything else falls into service.</p>
                        <ul class="space-y-3 ml-1">
                            <li class="flex items-start gap-3 text-gray-700 text-lg">
                                <span
                                    class="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-red-700 to-orange-700"></span>
                                <span>Revamping how people find music</span>
                            </li>
                            <li class="flex items-start gap-3 text-gray-700 text-lg">
                                <span
                                    class="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-amber-700 to-yellow-700"></span>
                                <span>Consulting Nigerian organizations on software that <strong
                                        class="italic">helps</strong></span>
                            </li>
                            <li class="flex items-start gap-3 text-gray-700 text-lg">
                                <span
                                    class="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-green-700 to-emerald-700"></span>
                                <span>Building and sharing courses</span> - <a
                                    href="https://blackbelt-init.notion.site/"
                                    class="underline hover:no-underline">BlackBelt Init - An AWS+Terraform Course</a>
                            </li>
                            <li class="flex items-start gap-3 text-gray-700 text-lg">
                                <span
                                    class="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-orange-700 to-amber-700"></span>
                                <span>Advising masters students on the architecture applications responsible for
                                    measuring laser fluctuations. <span class="opacity-40">(Or at least that's how he
                                        explained it, I helped with the parsing and storage of the huge datasets that
                                        came from it.)</span></span>
                            </li>
                            <li class="flex items-start gap-3 text-gray-700 text-lg">
                                <span
                                    class="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-red-800 to-orange-800"></span>
                                <span>and anything in betwixt</span>
                            </li>
                        </ul>
                        <p class="text-gray-700 text-lg leading-relaxed mt-4">If I think its cool. It will be done. Or
                            at least attempted, and that applies to all of the
                            above.</p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>

        <Divider class="my-12" />

        <div class="relative py-12">
            <div
                class="absolute inset-0 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 opacity-20 rounded-3xl">
            </div>
            <p
                class="relative text-2xl md:text-4xl lg:text-5xl text-center font-bold text-gray-900 leading-relaxed px-6">
                <em>Make more cool shit. Carry on.</em>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Manifesto | Tunji Productions',
    ogTitle: 'Manifesto | Tunji Productions',
    twitterTitle: 'Manifesto | Tunji Productions',
    ogImage: '/img/logo_bg.jpg',
    ogUrl: 'https://tunjiproductions.com/manifesto',
    twitterImage: '/img/logo_bg.jpg',
    twitterCard: 'summary',
    description: "Mission of Tunji Productions. The goals of this organization can be found here. Let's keep things transparent. :)",
    ogDescription: "Mission of Tunji Productions. The goals of this organization can be found here. Let's keep things transparent. :)",
    twitterDescription: "Mission of Tunji Productions. The goals of this organization can be found here. Let's keep things transparent. :)",
})

useHead({
    meta: [
        { name: 'description', content: "Mission of Tunji Productions. The goals of this organization can be found here. Let's keep things transparent. :)" }
    ],
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }
    ]
})
</script>

<style scoped>
li {
    font-weight: 700;
}
</style>