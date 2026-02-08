<script setup lang="ts">
const architectureFeatures = [
  {
    icon: 'i-lucide-layers',
    title: 'Subdomain Isolation',
    description: 'Isolated environments for each conference ensure data privacy and performance stability.',
    color: 'emerald'
  },
  {
    icon: 'i-lucide-fingerprint',
    title: 'Universal Auth',
    description: 'Single sign-on across all conference subdomains powered by Supabase Auth.',
    color: 'amber'
  },
  {
    icon: 'i-lucide-database',
    title: 'Scalable Storage',
    description: 'Video libraries hosted on Cloudflare R2 for global low-latency content delivery.',
    color: 'neutral'
  }
]

const stats = [
  { label: 'Performance', value: 'High', color: 'emerald' },
  { label: 'Latency', value: '<50ms', color: 'amber' }
]
</script>

<template>
  <UPageSection id="architecture" class="bg-stone-900 text-stone-50">
    <UContainer>
      <UPageColumns>
        <template #left>
          <div class="animate-fade-in-left">
            <UBadge color="amber" variant="subtle" size="md" class="mb-3">
              SYSTEM ARCHITECTURE
            </UBadge>
            <h3 class="text-3xl md:text-5xl font-bold mb-8 text-stone-100">Robust Multi-Tenant Backbone</h3>
            <p class="text-stone-400 text-lg mb-10 leading-relaxed">
              Our infrastructure is built for reliability and scale, using a sophisticated multi-domain architecture that keeps data secure while maintaining high availability.
            </p>

            <div class="space-y-6">
              <div
                v-for="feature in architectureFeatures"
                :key="feature.title"
                class="flex gap-5 items-start"
              >
                <div
                  class="mt-1 p-2 rounded-lg"
                  :class="[
                    feature.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : '',
                    feature.color === 'amber' ? 'bg-amber-500/10 text-amber-500' : '',
                    feature.color === 'neutral' ? 'bg-stone-500/10 text-stone-300' : ''
                  ]"
                >
                  <UIcon :name="feature.icon" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-1 text-stone-200">{{ feature.title }}</h4>
                  <p class="text-stone-400">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #right>
          <div class="relative animate-scale-in">
            <div class="absolute inset-0 bg-emerald-900/40 blur-[100px] -z-10" />
            <UCard
              class="border-stone-700 bg-stone-800/50 backdrop-blur-sm shadow-2xl"
              :ui="{
                body: { padding: 'p-4' },
                ring: 'ring-1 ring-stone-700'
              }"
            >
              <NuxtImg
                src="https://images.unsplash.com/photo-1762518859390-6d48c38a9afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbGFuZHNjYXBlJTIwZm9yZXN0JTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzA1NjYxMzl8MA"
                alt="Natural Landscape Architecture visualization"
                class="w-full rounded-xl opacity-80"
                loading="lazy"
              />
              <div class="mt-4 grid grid-cols-2 gap-4">
                <div
                  v-for="stat in stats"
                  :key="stat.label"
                  class="bg-stone-700/50 border border-stone-600 rounded-lg p-4 text-center"
                >
                  <p class="text-xs text-stone-400 uppercase mb-1 font-bold">{{ stat.label }}</p>
                  <p
                    class="text-2xl font-bold"
                    :class="stat.color === 'emerald' ? 'text-emerald-400' : 'text-amber-500'"
                  >
                    {{ stat.value }}
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </template>
      </UPageColumns>
    </UContainer>
  </UPageSection>
</template>

<style scoped>
@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-1.25rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-left {
  animation: fade-in-left 0.6s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.6s ease-out;
}
</style>
