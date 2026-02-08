<script setup lang="ts">
const highlights = [
  'Year-over-year platform improvements',
  'Secure membership authentication',
  'Scalable video streaming libraries'
]
</script>

<template>
  <UPageSection id="case-studies" class="bg-stone-50 dark:bg-stone-950">
    <UContainer>
      <UCard
        class="overflow-hidden shadow-xl"
        :ui="{
          root: 'ring-1 ring-stone-200 dark:ring-stone-700 rounded-3xl dark:bg-stone-900',
          body: 'p-0'
        }"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Content Column -->
          <div class="p-8 lg:p-16 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-6">
              <div class="flex">
                <UIcon
                  v-for="i in 5"
                  :key="i"
                  name="i-lucide-star"
                  class="w-4 h-4 fill-amber-600 text-amber-600"
                />
              </div>
              <span class="text-sm font-bold text-stone-500 dark:text-stone-400 ml-2 italic">4+ Year Partnership</span>
            </div>

            <h3 class="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-6">
              MCBIOS: Powering MidSouth Bioinformatics
            </h3>

            <p class="text-stone-600 dark:text-stone-400 text-lg mb-8 leading-relaxed">
              Since 2020, we have provided MCBIOS with a custom-designed conference experience,
              secure payment processing, and a massive video archive for member-exclusive
              educational content.
            </p>

            <div class="space-y-4 mb-10">
              <div
                v-for="highlight in highlights"
                :key="highlight"
                class="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-medium"
              >
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                {{ highlight }}
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <UButton
                to="https://mcbios.com"
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
                variant="solid"
                size="lg"
                trailing-icon="i-lucide-external-link"
                class="bg-stone-900 hover:bg-emerald-950 shadow-lg shadow-stone-900/10"
              >
                View Live Site
              </UButton>
            </div>
          </div>

          <!-- Image Column -->
          <div class="relative h-[400px] lg:h-auto overflow-hidden bg-stone-100 dark:bg-stone-800">
            <NuxtImg
              src="https://images.unsplash.com/photo-1765371512992-843e6a92d7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
              alt="Warm Interior Meeting Space"
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-stone-900/20" />

            <!-- Testimonial Card -->
            <div class="absolute bottom-8 left-8 right-8">
              <UCard
                class="bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm shadow-lg border-white/50 dark:border-stone-700/50"
                :ui="{
                  root: 'ring-1 ring-white/50 dark:ring-stone-700/50',
                  body: 'p-6'
                }"
              >
                <UIcon name="i-lucide-quote" class="text-emerald-800 dark:text-emerald-400 w-8 h-8 mb-4" />
                <p class="text-stone-800 dark:text-stone-200 font-medium italic mb-4">
                  "The Conference Suite has transformed how we manage our annual symposium,
                  providing a seamless experience for both our organizers and attendees."
                </p>
                <div class="flex items-center gap-3">
                  <UAvatar text="M" size="md" class="bg-emerald-100 text-emerald-900 font-bold" />
                  <div>
                    <p class="font-bold text-stone-900 dark:text-stone-100 text-sm">MCBIOS Leadership</p>
                    <p class="text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wider">
                      Bioinformatics Society
                    </p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </UCard>
    </UContainer>
  </UPageSection>
</template>
