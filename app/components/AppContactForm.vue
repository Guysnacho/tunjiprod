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
  <UPageSection id="contact" class="bg-white relative overflow-hidden">
    <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-stone-50 rounded-full blur-3xl -z-10" />

    <UContainer>
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-stone-900 mb-6">
            Ready to Elevate Your Conference?
          </h2>
          <p class="text-lg text-stone-600">
            Partner with Tunji Productions and leverage the power of the Conference Suite for your next event.
          </p>
        </div>

        <UCard
          class="shadow-2xl relative"
          :ui="{
            body: { padding: 'p-8 md:p-12' },
            ring: 'ring-1 ring-stone-200',
            rounded: 'rounded-3xl',
            background: 'bg-stone-50'
          }"
        >
          <div class="absolute top-4 right-8 text-emerald-800/10 font-bold text-6xl select-none">
            Contact
          </div>

          <!-- Success State -->
          <div v-if="submitted" class="text-center py-12 relative z-10">
            <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-800">
              <UIcon name="i-lucide-check-circle-2" class="w-10 h-10" />
            </div>
            <h3 class="text-3xl font-bold text-stone-900 mb-4">Message Sent</h3>
            <p class="text-stone-600 max-w-md mx-auto mb-8">
              Your inquiry has been received. Tunji Productions will review your request and reach out within 24 hours.
            </p>
            <UButton
              color="emerald"
              variant="ghost"
              size="lg"
              @click="resetForm"
            >
              Return to Form
            </UButton>
          </div>

          <!-- Form State -->
          <UForm
            v-else
            :schema="schema"
            :state="state"
            class="relative z-10"
            @submit="onSubmit"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormField name="name" label="Full Name" required>
                <UInput
                  v-model="state.name"
                  placeholder="Jane Doe"
                  size="xl"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </UFormField>

              <UFormField name="email" label="Work Email" required>
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="jane@university.edu"
                  size="xl"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </UFormField>

              <UFormField name="organization" label="Organization" required class="md:col-span-2">
                <UInput
                  v-model="state.organization"
                  placeholder="Bioinformatics Society of America"
                  size="xl"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </UFormField>

              <UFormField name="message" label="Message" class="md:col-span-2">
                <UTextarea
                  v-model="state.message"
                  :rows="4"
                  placeholder="Briefly describe your conference goals..."
                  size="xl"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </UFormField>

              <div class="md:col-span-2 mt-4">
                <UButton
                  type="submit"
                  block
                  size="xl"
                  color="emerald"
                  variant="solid"
                  trailing-icon="i-lucide-send"
                  class="bg-emerald-900 hover:bg-emerald-950 shadow-lg shadow-emerald-900/10"
                >
                  Send Inquiry
                </UButton>
                <p class="text-center text-stone-400 text-xs mt-6 font-medium uppercase tracking-widest">
                  Built for academic excellence
                </p>
              </div>
            </div>
          </UForm>
        </UCard>
      </div>
    </UContainer>
  </UPageSection>
</template>
