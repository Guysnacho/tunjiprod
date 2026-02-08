<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const toast = useToast()
const loading = ref(false)
const updated = ref(false)

const state = reactive({
  password: undefined as string | undefined,
  confirmPassword: undefined as string | undefined
})

const schema = z.object({
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Must be at least 8 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await supabase.auth.updateUser({
    password: event.data.password
  })
  loading.value = false

  if (error) {
    toast.add({ title: 'Error', description: error.message, color: 'error' })
  } else {
    updated.value = true
  }
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
        <div v-if="updated" class="text-center py-6">
          <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <UIcon name="i-lucide-check-circle-2" class="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
          </div>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
            Password updated
          </h3>
          <p class="text-stone-600 dark:text-stone-400 text-sm mb-6">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <UButton
            to="/login"
            block
            size="xl"
            color="success"
            variant="solid"
            trailing-icon="i-lucide-arrow-right"
            class="bg-emerald-900 hover:bg-emerald-950 shadow-lg transition-all duration-200 rounded-lg h-12"
          >
            Sign In
          </UButton>
        </div>

        <!-- Form State -->
        <template v-else>
          <div class="text-center mb-8">
            <div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-shield-check" class="w-7 h-7 text-emerald-800 dark:text-emerald-400" />
            </div>
            <h1 class="text-2xl font-bold text-stone-900 dark:text-stone-50">
              Set new password
            </h1>
            <p class="text-stone-600 dark:text-stone-400 mt-1 text-sm">
              Choose a strong password for your account.
            </p>
          </div>

          <UForm :schema="schema" :state="state" @submit="onSubmit">
            <div class="space-y-5">
              <UFormField
                name="password"
                label="NEW PASSWORD"
                required
                :ui="{
                  label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="state.password"
                  type="password"
                  placeholder="At least 8 characters"
                  size="lg"
                  icon="i-lucide-key-round"
                  :ui="{
                    base: 'bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg'
                  }"
                />
              </UFormField>

              <UFormField
                name="confirmPassword"
                label="CONFIRM PASSWORD"
                required
                :ui="{
                  label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="state.confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  size="lg"
                  icon="i-lucide-key-round"
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
                  trailing-icon="i-lucide-check"
                  class="bg-emerald-900 hover:bg-emerald-950 shadow-lg transition-all duration-200 rounded-lg h-12"
                >
                  Update Password
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
