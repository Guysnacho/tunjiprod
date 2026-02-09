<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const toast = useToast()
const loading = ref(false)
const emailSent = ref(false)

const state = reactive({
  email: undefined as string | undefined
})

const schema = z.object({
  email: z.string().email('Invalid email address')
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await supabase.auth.resetPasswordForEmail(event.data.email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  loading.value = false

  if (error) {
    toast.add({ title: 'Error', description: error.message, color: 'error' })
  } else {
    emailSent.value = true
  }
}

function resetForm() {
  emailSent.value = false
  state.email = undefined
}
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
        <!-- Success State -->
        <div v-if="emailSent" class="text-center py-6">
          <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <UIcon name="i-lucide-mail-check" class="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
          </div>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
            Check your email
          </h3>
          <p class="text-stone-600 dark:text-stone-400 text-sm mb-2">
            We sent a password reset link to
          </p>
          <p class="font-medium text-stone-900 dark:text-stone-50 text-sm mb-6">
            {{ state.email }}
          </p>
          <p class="text-xs text-stone-500 dark:text-stone-400 mb-6">
            The link will expire in 24 hours. If you don't see the email, check your spam folder.
          </p>
          <div class="space-y-3">
            <UButton
              block
              color="neutral"
              variant="outline"
              size="lg"
              class="rounded-lg"
              @click="resetForm"
            >
              Try a different email
            </UButton>
            <NuxtLink
              to="/login"
              class="block text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 text-center"
            >
              Back to sign in
            </NuxtLink>
          </div>
        </div>

        <!-- Form State -->
        <template v-else>
          <div class="text-center mb-8">
            <div class="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-key-round" class="w-7 h-7 text-amber-700 dark:text-amber-400" />
            </div>
            <h1 class="text-2xl font-bold text-stone-900 dark:text-stone-50">
              Reset your password
            </h1>
            <p class="text-stone-600 dark:text-stone-400 mt-1 text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          <UForm :schema="schema" :state="state" @submit="onSubmit">
            <div class="space-y-5">
              <UFormField
                name="email"
                label="EMAIL"
                required
                :ui="{
                  label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="jane@university.edu"
                  size="lg"
                  icon="i-lucide-mail"
                  :ui="{
                    base: 'bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg'
                  }"
                />
              </UFormField>

              <div class="pt-2">
                <UButton
                  type="submit"
                  block
                  size="xl"
                  color="success"
                  variant="solid"
                  :loading="loading"
                  trailing-icon="i-lucide-send"
                  class="bg-emerald-900 hover:bg-emerald-950 shadow-lg transition-all duration-200 rounded-lg h-12"
                >
                  Send Reset Link
                </UButton>
              </div>
            </div>
          </UForm>

          <div class="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700 text-center">
            <NuxtLink
              to="/login"
              class="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
            >
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
              Back to sign in
            </NuxtLink>
          </div>
        </template>
      </UCard>

      <p class="text-center text-stone-400 dark:text-stone-500 text-[10px] mt-6 font-bold uppercase tracking-[0.25em]">
        Built for academic excellence
      </p>
    </div>
  </div>
</template>
