<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const supabase = useSupabaseClient()
const store = useUserStore()
const user = useSupabaseUser()
const toast = useToast()
const loading = ref(false)
const mode = ref<'password' | 'otp'>('password')
const submitted = ref(false)
const submittedEmail = ref('')

const passwordState = reactive({
  email: undefined as string | undefined,
  password: undefined as string | undefined,
  confirmPassword: undefined as string | undefined
})

const otpState = reactive({
  email: undefined as string | undefined
})

const passwordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Must be at least 8 characters')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

const otpSchema = z.object({
  email: z.string().email('Invalid email address')
})

type PasswordSchema = z.output<typeof passwordSchema>
type OtpSchema = z.output<typeof otpSchema>

// if (user) {
//   store.setId(user.value?.sub)
//   navigateTo('/dashboard')
// }

async function onPasswordSubmit(event: FormSubmitEvent<PasswordSchema>) {
  loading.value = true

  const isAdmin = await checkAdmin(event.data.email)
  if (!isAdmin) {
    loading.value = false
    toast.add({
      title: 'Access denied',
      description: 'Access restricted to administrators',
      color: 'error'
    })
    return
  }

  const { error } = await supabase.auth.signUp({
    email: event.data.email,
    password: event.data.password
  })
  loading.value = false

  if (error) {
    toast.add({ title: 'Registration failed', description: error.message, color: 'error' })
  } else {
    submittedEmail.value = event.data.email
    submitted.value = true
  }
}

async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>) {
  loading.value = true

  const isAdmin = await checkAdmin(event.data.email)
  if (!isAdmin) {
    loading.value = false
    toast.add({
      title: 'Access denied',
      description: 'Access restricted to administrators',
      color: 'error'
    })
    return
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: event.data.email,
    options: { shouldCreateUser: true }
  })
  loading.value = false

  if (error) {
    toast.add({ title: 'Error', description: error.message, color: 'error' })
  } else {
    submittedEmail.value = event.data.email
    submitted.value = true
  }
}

function resetForm() {
  submitted.value = false
  submittedEmail.value = ''
}

function switchMode(newMode: 'password' | 'otp') {
  mode.value = newMode
  submitted.value = false
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
        <div v-if="submitted" class="text-center py-6">
          <div
            class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <UIcon
              name="i-lucide-mail-check"
              class="w-8 h-8 text-emerald-800 dark:text-emerald-400"
            />
          </div>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">Check your email</h3>
          <p class="text-stone-600 dark:text-stone-400 text-sm mb-2">
            We sent a confirmation link to
          </p>
          <p class="font-medium text-stone-900 dark:text-stone-50 text-sm mb-6">
            {{ submittedEmail }}
          </p>
          <p class="text-xs text-stone-500 dark:text-stone-400 mb-6">
            Click the link in your email to activate your account. If you don't see it, check your
            spam folder.
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
          <!-- Header -->
          <div class="text-center mb-8">
            <div
              class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon
                name="i-lucide-user-plus"
                class="w-7 h-7 text-emerald-800 dark:text-emerald-400"
              />
            </div>
            <h1 class="text-2xl font-bold text-stone-900 dark:text-stone-50">Create an account</h1>
            <p class="text-amber-50 dark:text-stone-400 mt-1">Get started with Conference Suite</p>
          </div>

          <!-- Mode Tabs -->
          <div class="flex rounded-lg bg-stone-100 dark:bg-stone-800 p-1 mb-6">
            <button
              class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200"
              :class="
                mode === 'password'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              "
              @click="switchMode('password')"
            >
              Email & Password
            </button>
            <button
              class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200"
              :class="
                mode === 'otp'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              "
              @click="switchMode('otp')"
            >
              Magic Link
            </button>
          </div>

          <!-- Password Registration Form -->
          <UForm
            v-if="mode === 'password'"
            :schema="passwordSchema"
            :state="passwordState"
            @submit="onPasswordSubmit"
          >
            <div class="space-y-5">
              <UFormField
                name="email"
                label="EMAIL"
                required
                :ui="{
                  label:
                    'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="passwordState.email"
                  type="email"
                  placeholder="jane@university.edu"
                  size="lg"
                  icon="i-lucide-mail"
                  :ui="{
                    base: 'bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg'
                  }"
                />
              </UFormField>

              <UFormField
                name="password"
                label="PASSWORD"
                required
                :ui="{
                  label:
                    'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="passwordState.password"
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
                  label:
                    'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="passwordState.confirmPassword"
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
                  trailing-icon="i-lucide-arrow-right"
                  class="bg-emerald-900 hover:bg-emerald-950 shadow-lg transition-all duration-200 rounded-lg h-12"
                >
                  Create Account
                </UButton>
              </div>
            </div>
          </UForm>

          <!-- OTP / Magic Link Form -->
          <UForm v-else :schema="otpSchema" :state="otpState" @submit="onOtpSubmit">
            <div class="space-y-5">
              <UFormField
                name="email"
                label="EMAIL"
                required
                :ui="{
                  label:
                    'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="otpState.email"
                  type="email"
                  placeholder="jane@university.edu"
                  size="lg"
                  icon="i-lucide-mail"
                  :ui="{
                    base: 'bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg'
                  }"
                />
              </UFormField>

              <p class="text-xs text-stone-500 dark:text-stone-400">
                We'll send a magic link to your email. No password required.
              </p>

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
                  Send Magic Link
                </UButton>
              </div>
            </div>
          </UForm>

          <!-- Footer -->
          <div class="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700 text-center">
            <p class="text-sm text-stone-500 dark:text-stone-400">
              Already have an account?
              <NuxtLink
                to="/login"
                class="font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
              >
                Sign in
              </NuxtLink>
            </p>
          </div>
        </template>
      </UCard>

      <p
        class="text-center text-stone-400 dark:text-stone-500 text-[10px] mt-6 font-bold uppercase tracking-[0.25em]"
      >
        Built for academic excellence
      </p>
    </div>
  </div>
</template>
