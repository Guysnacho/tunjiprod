<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const toast = useToast()
const loading = ref(false)
const mode = ref<'password' | 'otp'>('password')
const otpSent = ref(false)

const passwordState = reactive({
  email: undefined as string | undefined,
  password: undefined as string | undefined
})

const otpState = reactive({
  email: undefined as string | undefined
})

const passwordSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

const otpSchema = z.object({
  email: z.string().email('Invalid email address')
})

type PasswordSchema = z.output<typeof passwordSchema>
type OtpSchema = z.output<typeof otpSchema>

async function onPasswordSubmit(event: FormSubmitEvent<PasswordSchema>) {
  loading.value = true

  const isAdmin = await checkAdmin(event.data.email)
  if (!isAdmin) {
    loading.value = false
    toast.add({ title: 'Access denied', description: 'Access restricted to administrators', color: 'error' })
    return
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: event.data.email,
    password: event.data.password
  })
  loading.value = false

  if (error) {
    toast.add({ title: 'Sign in failed', description: error.message, color: 'error' })
  } else {
    navigateTo('/')
  }
}

async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>) {
  loading.value = true

  const isAdmin = await checkAdmin(event.data.email)
  if (!isAdmin) {
    loading.value = false
    toast.add({ title: 'Access denied', description: 'Access restricted to administrators', color: 'error' })
    return
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: event.data.email,
    options: { shouldCreateUser: false }
  })
  loading.value = false

  if (error) {
    toast.add({ title: 'Error', description: error.message, color: 'error' })
  } else {
    otpSent.value = true
    toast.add({ title: 'Check your inbox', description: 'A magic link has been sent to your email.', color: 'success' })
  }
}

function switchMode(newMode: 'password' | 'otp') {
  mode.value = newMode
  otpSent.value = false
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
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-lock" class="w-7 h-7 text-emerald-800 dark:text-emerald-400" />
          </div>
          <h1 class="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Welcome back
          </h1>
          <p class="text-stone-600 dark:text-stone-400 mt-1">
            Sign in to your account
          </p>
        </div>

        <!-- Mode Tabs -->
        <div class="flex rounded-lg bg-stone-100 dark:bg-stone-800 p-1 mb-6">
          <button
            class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200"
            :class="mode === 'password'
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'"
            @click="switchMode('password')"
          >
            Email & Password
          </button>
          <button
            class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200"
            :class="mode === 'otp'
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'"
            @click="switchMode('otp')"
          >
            Magic Link
          </button>
        </div>

        <!-- Password Form -->
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
                label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
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
              required
              :ui="{
                label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                container: 'space-y-0'
              }"
            >
              <template #label>
                <div class="flex items-center justify-between w-full">
                  <span class="text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 uppercase">Password</span>
                  <NuxtLink
                    to="/forgot-password"
                    class="text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
                  >
                    Forgot password?
                  </NuxtLink>
                </div>
              </template>
              <UInput
                v-model="passwordState.password"
                type="password"
                placeholder="Enter your password"
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
                Sign In
              </UButton>
            </div>
          </div>
        </UForm>

        <!-- OTP / Magic Link Form -->
        <div v-else>
          <!-- Success state after OTP sent -->
          <div v-if="otpSent" class="text-center py-6">
            <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-mail-check" class="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
            </div>
            <h3 class="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
              Check your email
            </h3>
            <p class="text-stone-600 dark:text-stone-400 text-sm mb-6">
              We sent a magic link to <span class="font-medium text-stone-900 dark:text-stone-50">{{ otpState.email }}</span>. Click the link to sign in.
            </p>
            <UButton
              color="neutral"
              variant="ghost"
              size="md"
              class="text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              @click="otpSent = false"
            >
              Try a different email
            </UButton>
          </div>

          <!-- OTP email input -->
          <UForm
            v-else
            :schema="otpSchema"
            :state="otpState"
            @submit="onOtpSubmit"
          >
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
        </div>

        <!-- Footer -->
        <div class="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700 text-center">
          <p class="text-sm text-stone-500 dark:text-stone-400">
            Don't have an account?
            <NuxtLink
              to="/register"
              class="font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
            >
              Sign up
            </NuxtLink>
          </p>
        </div>
      </UCard>

      <p class="text-center text-stone-400 dark:text-stone-500 text-[10px] mt-6 font-bold uppercase tracking-[0.25em]">
        Built for academic excellence
      </p>
    </div>
  </div>
</template>
