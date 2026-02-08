<script setup lang="ts">
const isOpen = ref(false)

const navLinks = [
  { label: 'Features', to: '#features' },
  { label: 'Architecture', to: '#architecture' },
  { label: 'Case Studies', to: '#case-studies' }
]

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
    <UContainer>
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-xl font-bold bg-gradient-to-r from-emerald-900 to-amber-800 bg-clip-text text-transparent">
            Conference Suite
          </span>
          <UBadge color="neutral" variant="subtle" class="hidden sm:block ml-2">
            by Tunji Productions
          </UBadge>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <ULink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="text-stone-600 hover:text-emerald-800 transition-colors font-medium"
          >
            {{ link.label }}
          </ULink>
          <UButton
            to="#contact"
            color="emerald"
            variant="solid"
            class="bg-emerald-900 hover:bg-emerald-950"
            trailing-icon="i-lucide-chevron-right"
          >
            Get Started
          </UButton>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <UButton
            :icon="isOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            color="neutral"
            variant="ghost"
            @click="isOpen = !isOpen"
          />
        </div>
      </div>
    </UContainer>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="md:hidden bg-stone-50 border-b border-stone-200">
        <UContainer class="py-4 space-y-2">
          <ULink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="block text-stone-600 font-medium py-2"
            @click="closeMenu"
          >
            {{ link.label }}
          </ULink>
          <UButton
            to="#contact"
            block
            color="emerald"
            variant="solid"
            class="bg-emerald-900 hover:bg-emerald-950 mt-4"
            @click="closeMenu"
          >
            Get Started
          </UButton>
        </UContainer>
      </div>
    </Transition>
  </nav>
</template>
