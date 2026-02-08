<script setup lang="ts">
const platformLinks = [
  { label: 'Features', to: '#features' },
  { label: 'Architecture', to: '#architecture' },
  { label: 'Case Studies', to: '#case-studies' },
  { label: 'Documentation', to: 'https://docs.tunjiproductions.com', external: true }
]

const companyLinks = [
  { label: 'About Tunji Productions', to: 'https://tunjiproductions.com/manifesto', external: true },
  { label: 'Contact Support', to: '#contact' },
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' }
]

const socialLinks = [
  {
    icon: 'i-lucide-linkedin',
    to: 'https://www.linkedin.com/company/tunjiprod',
    label: 'LinkedIn'
  },
  {
    icon: 'i-lucide-globe',
    to: 'https://tunjiproductions.com',
    label: 'Website'
  },
  {
    icon: 'i-lucide-mail',
    to: 'mailto:contact@tunjiproductions.com',
    label: 'Email'
  }
]
</script>

<template>
  <UFooter class="bg-stone-100 border-t border-stone-200">
    <template #top>
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <!-- Brand Column -->
          <div class="md:col-span-2">
            <h3
              class="text-xl font-bold bg-gradient-to-r from-emerald-900 to-amber-800 bg-clip-text text-transparent mb-6"
            >
              Conference Suite
            </h3>
            <p class="text-stone-500 max-w-sm mb-8 leading-relaxed">
              Professional conference management platform built for academic and recurring events.
              Powered by Tunji Productions — trusted since 2020.
            </p>
            <div class="flex gap-4">
              <UButton
                v-for="social in socialLinks"
                :key="social.label"
                :to="social.to"
                target="_blank"
                :icon="social.icon"
                color="neutral"
                variant="outline"
                size="md"
                :aria-label="social.label"
                class="border-stone-200 hover:border-emerald-200 hover:text-emerald-800"
              />
            </div>
          </div>

          <!-- Platform Links -->
          <div>
            <h4 class="font-bold text-stone-900 mb-6">Platform</h4>
            <ul class="space-y-4">
              <li v-for="link in platformLinks" :key="link.label">
                <ULink
                  :to="link.to"
                  :target="link.external ? '_blank' : undefined"
                  class="text-stone-500 hover:text-emerald-800 transition-colors"
                >
                  {{ link.label }}
                </ULink>
              </li>
            </ul>
          </div>

          <!-- Company Links -->
          <div>
            <h4 class="font-bold text-stone-900 mb-6">Company</h4>
            <ul class="space-y-4">
              <li v-for="link in companyLinks" :key="link.label">
                <ULink
                  :to="link.to"
                  :target="link.external ? '_blank' : undefined"
                  class="text-stone-500 hover:text-emerald-800 transition-colors"
                >
                  {{ link.label }}
                </ULink>
              </li>
            </ul>
          </div>
        </div>
      </UContainer>
    </template>

    <template #bottom>
      <UContainer>
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p class="text-stone-400 text-sm">
            © {{ new Date().getFullYear() }} Tunji Productions. All rights reserved. Built with care
            for conferences that matter.
          </p>
          <div class="flex gap-8 text-sm font-medium text-stone-400">
            <span>v2.4.0-stable</span>
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>
