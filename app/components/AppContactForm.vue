<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(2, 'Organization name is required'),
  message: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  organization: undefined,
  message: undefined
})

const submitted = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Handle form submission here
  console.log('Form submitted:', event.data)
  submitted.value = true
}

function resetForm() {
  submitted.value = false
  state.name = undefined
  state.email = undefined
  state.organization = undefined
  state.message = undefined
}
</script>

<template>
  <UPageSection id="contact" class="bg-white dark:bg-stone-950 relative overflow-hidden">
    <div
      class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-stone-50 dark:bg-stone-900 rounded-full blur-3xl -z-10"
    />

    <UContainer>
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 mb-6">
            Ready to Elevate Your Conference?
          </h2>
          <p class="text-lg text-stone-600 dark:text-stone-400">
            Partner with Tunji Productions and leverage the power of the Conference Suite for your
            next event.
          </p>
        </div>

        <UCard
          class="shadow-2xl relative overflow-hidden"
          :ui="{
            root: 'ring-1 ring-stone-200 dark:ring-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-900',
            body: 'p-12 md:p-16 lg:p-20'
          }"
        >
          <div
            class="absolute top-1/2 right-4 -translate-y-1/2 text-stone-200/30 dark:text-stone-700/30 font-bold text-[140px] leading-none select-none pointer-events-none z-0"
          >
            Contact
          </div>

          <!-- Success State -->
          <div v-if="submitted" class="text-center py-12 relative z-10">
            <div
              class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-800"
            >
              <UIcon name="i-lucide-check-circle-2" class="w-10 h-10" />
            </div>
            <h3 class="text-3xl font-bold text-stone-900 dark:text-stone-50 mb-4">Message Sent</h3>
            <p class="text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-8">
              Your inquiry has been received. Tunji Productions will review your request and reach
              out within 24 hours.
            </p>
            <UButton
              color="neutral"
              variant="ghost"
              size="lg"
              class="text-emerald-800 hover:text-emerald-900 hover:bg-emerald-50"
              @click="resetForm"
            >
              Return to Form
            </UButton>
          </div>

          <!-- Form State -->
          <UForm v-else :schema="schema" :state="state" class="relative z-10" @submit="onSubmit">
            <div class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <UFormField
                  name="name"
                  label="FULL NAME"
                  required
                  :ui="{
                    label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2 uppercase',
                    container: 'space-y-0'
                  }"
                >
                  <UInput
                    v-model="state.name"
                    placeholder="Jane Doe"
                    size="lg"
                    :ui="{
                      base: 'bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg'
                    }"
                  />
                </UFormField>

                <UFormField
                  name="email"
                  label="WORK EMAIL"
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
                    :ui="{
                      base: 'bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg'
                    }"
                  />
                </UFormField>
              </div>

              <UFormField
                name="organization"
                label="ORGANIZATION"
                required
                :ui="{
                  label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UInput
                  v-model="state.organization"
                  placeholder="Bioinformatics Society of America"
                  size="lg"
                  :ui="{
                    base: 'bg-white border border-stone-300 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg'
                  }"
                />
              </UFormField>

              <UFormField
                name="message"
                label="MESSAGE"
                :ui="{
                  label: 'text-[10px] font-bold tracking-[0.15em] text-stone-700 mb-2 uppercase',
                  container: 'space-y-0'
                }"
              >
                <UTextarea
                  v-model="state.message"
                  :rows="5"
                  placeholder="Briefly describe your conference goals..."
                  size="lg"
                  :ui="{
                    base: 'bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 rounded-lg resize-none'
                  }"
                />
              </UFormField>

              <div class="pt-3">
                <UButton
                  type="submit"
                  block
                  size="xl"
                  color="success"
                  variant="solid"
                  trailing-icon="i-lucide-send"
                  class="bg-emerald-900 hover:bg-emerald-950 shadow-lg transition-all duration-200 rounded-lg h-14"
                >
                  Send Inquiry
                </UButton>
              </div>

              <p
                class="text-center text-stone-400 dark:text-stone-500 text-[10px] mt-8 font-bold uppercase tracking-[0.25em]"
              >
                Built for academic excellence
              </p>
            </div>
          </UForm>
        </UCard>
      </div>
    </UContainer>
  </UPageSection>
</template>
