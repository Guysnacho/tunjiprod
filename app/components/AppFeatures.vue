<script setup lang="ts">
const features = [
  {
    title: "Multi-tenant Platform",
    description: "Centralized management dashboard for Tunji Productions admins to oversee all hosted conferences.",
    icon: "i-lucide-globe"
  },
  {
    title: "Video Package",
    description: "Professional content hosting via Cloudflare R2 with multipart uploads and member-exclusive access.",
    icon: "i-lucide-video"
  },
  {
    title: "Dynamic Form Builder",
    description: "Create customizable registration forms and data collection templates with easy persistence.",
    icon: "i-lucide-file-edit"
  },
  {
    title: "Personalized Scheduling",
    description: "Admin schedule builder for the event and individual agenda builders for attendees.",
    icon: "i-lucide-layout"
  },
  {
    title: "Integrated Payments",
    description: "Seamless Stripe integration for registration fees, member dues, and recurring sponsorships.",
    icon: "i-lucide-credit-card"
  },
  {
    title: "Universal Authentication",
    description: "Supabase-powered cross-subdomain session management maintaining profiles across event years.",
    icon: "i-lucide-lock"
  }
]
</script>

<template>
  <UPageSection id="features" class="bg-stone-50">
    <UContainer>
      <div class="text-center mb-20">
        <UBadge color="emerald" variant="subtle" size="md" class="mb-3">
          CORE PLATFORM
        </UBadge>
        <h3 class="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Built for Academic Continuity</h3>
        <p class="max-w-2xl mx-auto text-lg text-stone-600">
          A harmonious blend of advanced technology and intuitive design, tailored for professional event management.
        </p>
      </div>

      <UPageGrid>
        <UCard
          v-for="(feature, index) in features"
          :key="feature.title"
          class="hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
          :ui="{
            body: { padding: 'p-8' },
            ring: 'ring-1 ring-stone-200'
          }"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-stone-50 border border-stone-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
            <UIcon :name="feature.icon" class="text-emerald-800 w-6 h-6" />
          </div>
          <h4 class="text-xl font-bold text-stone-900 mb-3">{{ feature.title }}</h4>
          <p class="text-stone-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </UCard>
      </UPageGrid>
    </UContainer>
  </UPageSection>
</template>
