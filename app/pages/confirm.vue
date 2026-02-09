<script setup lang="ts">
const route = useRoute()
const toast = useToast()
const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')

onMounted(async () => {
  const type = route.query.type as string | undefined

  if (type === 'recovery') {
    navigateTo('/reset-password')
    return
  }

  // For email confirmation and magic link callbacks, Supabase handles
  // the token exchange automatically via the @nuxtjs/supabase module.
  // We just need to check if the user is now authenticated.
  await new Promise(resolve => setTimeout(resolve, 1500))

  const user = useSupabaseUser()
  if (user.value) {
    status.value = 'success'
    message.value = type === 'signup'
      ? 'Your email has been confirmed.'
      : 'You have been signed in.'
    toast.add({ title: 'Welcome', description: message.value, color: 'success' })
    setTimeout(() => navigateTo('/'), 2000)
  } else {
    status.value = 'error'
    message.value = 'This link may have expired or already been used.'
  }
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
    <div class="w-full max-w-md">
      <UCard
        class="shadow-2xl relative overflow-hidden"
        :ui="{
          root: 'ring-1 ring-stone-200 dark:ring-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-900',
          body: 'p-8 sm:p-10'
        }"
      >
        <!-- Loading -->
        <div v-if="status === 'loading'" class="text-center py-10">
          <div class="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <UIcon name="i-lucide-loader-2" class="w-8 h-8 text-emerald-800 dark:text-emerald-400 animate-spin" />
          </div>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
            Confirming...
          </h3>
          <p class="text-stone-600 dark:text-stone-400 text-sm">
            Please wait while we verify your link.
          </p>
        </div>

        <!-- Success -->
        <div v-else-if="status === 'success'" class="text-center py-10">
          <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <UIcon name="i-lucide-check-circle-2" class="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
          </div>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
            {{ message }}
          </h3>
          <p class="text-stone-600 dark:text-stone-400 text-sm mb-6">
            Redirecting you now...
          </p>
          <UButton
            to="/"
            color="success"
            variant="solid"
            size="lg"
            class="bg-emerald-900 hover:bg-emerald-950 rounded-lg"
          >
            Go to Dashboard
          </UButton>
        </div>

        <!-- Error -->
        <div v-else class="text-center py-10">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <UIcon name="i-lucide-x-circle" class="w-8 h-8 text-red-700 dark:text-red-400" />
          </div>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
            Confirmation failed
          </h3>
          <p class="text-stone-600 dark:text-stone-400 text-sm mb-6">
            {{ message }}
          </p>
          <div class="space-y-3">
            <UButton
              to="/login"
              block
              size="lg"
              color="success"
              variant="solid"
              class="bg-emerald-900 hover:bg-emerald-950 rounded-lg"
            >
              Back to Sign In
            </UButton>
          </div>
        </div>
      </UCard>

      <p class="text-center text-stone-400 dark:text-stone-500 text-[10px] mt-6 font-bold uppercase tracking-[0.25em]">
        Built for academic excellence
      </p>
    </div>
  </div>
</template>
