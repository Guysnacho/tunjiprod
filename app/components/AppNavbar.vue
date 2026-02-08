<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
})

const isOpen = ref(false)

const navLinks = [
  { label: 'Features', to: '#features' },
  { label: 'Architecture', to: '/#architecture' },
  { label: 'Case Studies', to: '/#case-studies' }
]

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800"
  >
    <UContainer>
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span
            class="text-xl font-bold bg-gradient-to-r from-emerald-900 to-amber-800 bg-clip-text text-transparent"
          >
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
            class="text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            {{ link.label }}
          </ULink>
          <UButton
            :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
            color="neutral"
            variant="ghost"
            aria-label="Toggle dark mode"
            @click="isDark = !isDark"
          />
          <UButton
            to="/login"
            color="neutral"
            variant="ghost"
            class="text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400"
          >
            Log In
          </UButton>
          <UButton
            to="/register"
            color="primary"
            variant="solid"
            class="bg-emerald-900 hover:bg-emerald-950"
            trailing-icon="i-lucide-chevron-right"
          >
            Register
          </UButton>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center gap-1">
          <UButton
            :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
            color="neutral"
            variant="ghost"
            aria-label="Toggle dark mode"
            @click="isDark = !isDark"
          />
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
      <div v-if="isOpen" class="md:hidden bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
        <UContainer class="py-4 space-y-2">
          <ULink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="block text-stone-600 dark:text-stone-300 font-medium py-2"
            @click="closeMenu"
          >
            {{ link.label }}
          </ULink>
          <div class="flex gap-3 mt-4">
            <UButton
              to="/login"
              block
              color="neutral"
              variant="outline"
              class="flex-1"
              @click="closeMenu"
            >
              Log In
            </UButton>
            <UButton
              to="/register"
              block
              color="primary"
              variant="solid"
              class="flex-1 bg-emerald-900 hover:bg-emerald-950"
              @click="closeMenu"
            >
              Register
            </UButton>
          </div>
        </UContainer>
      </div>
    </Transition>
  </nav>
</template>
