<script setup lang="ts">
const features = [
  {
    icon: 'i-lucide-calendar',
    title: 'Recurring Events',
    description: 'Bridge the gap between event years.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Secure Access',
    description: 'Unified member authentication.'
  },
  {
    icon: 'i-lucide-users',
    title: 'Member Portal',
    description: 'Exclusive video content archives.'
  }
]
</script>

<template>
  <section class="relative pt-32 pb-20 overflow-hidden">
    <!-- Background decoration with earth tones -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/50 via-stone-50 to-stone-50 opacity-60" />

    <UContainer>
      <div class="text-center">
        <div class="animate-fade-in">
          <UBadge
            color="emerald"
            variant="subtle"
            size="lg"
            class="mb-6 inline-flex items-center gap-2"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-700"></span>
            </span>
            Trusted Academic Partner Since 2020
          </UBadge>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
            Elevate Your Conference <br class="hidden md:block" />
            <span class="text-emerald-900">With Natural Excellence</span>
          </h1>

          <p class="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
            A comprehensive management platform built for academic longevity.
            Seamless integration, persistent data, and professional delivery for every event.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <UButton
              to="#contact"
              size="xl"
              color="emerald"
              variant="solid"
              class="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-950 shadow-lg shadow-emerald-900/20"
            >
              Get Started
            </UButton>
            <UButton
              to="#features"
              size="xl"
              color="neutral"
              variant="outline"
              class="w-full sm:w-auto"
            >
              Explore Features
            </UButton>
          </div>
        </div>

        <div class="relative max-w-5xl mx-auto rounded-2xl border border-stone-200 shadow-2xl overflow-hidden bg-stone-100 animate-scale-in">
          <NuxtImg
            src="https://images.unsplash.com/photo-1726384780582-40353de8d036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b29kZW4lMjBhcmNoaXRlY3R1cmUlMjBjb25mZXJlbmNlJTIwaGFsbHxlbnwxfHx8fDE3NzA1NjYxMzl8MA"
            alt="Modern Wooden Conference Hall"
            class="w-full aspect-[16/9] object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
              <div
                v-for="feature in features"
                :key="feature.title"
                class="flex gap-4 items-start text-white"
              >
                <div class="p-2 bg-emerald-600/30 backdrop-blur-md rounded-lg">
                  <UIcon :name="feature.icon" class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="font-bold">{{ feature.title }}</h4>
                  <p class="text-sm text-stone-200">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.8s ease-out 0.2s both;
}
</style>
