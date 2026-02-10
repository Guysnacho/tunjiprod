<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

interface Conference {
  id: number
  name: string
  date: string
  location: string
  status: 'Confirmed' | 'In Progress'
  role: string
}

const user = useSupabaseUser()
const store = useUserStore()

// if (!user.value) {
//   navigateTo('/login')
// }

const conferences: Conference[] = [
  {
    id: 1,
    name: 'MCBIOS 2026 Symposium',
    date: 'March 15-18, 2026',
    location: 'Little Rock, AR',
    status: 'Confirmed',
    role: 'Presenter'
  },
  {
    id: 2,
    name: 'Global Bioinformatics Summit',
    date: 'June 22-25, 2026',
    location: 'Online / Hybrid',
    status: 'In Progress',
    role: 'Attendee'
  },
  {
    id: 3,
    name: 'Tunji Tech & Design Expo',
    date: 'September 10, 2026',
    location: 'Lagos, Nigeria',
    status: 'Confirmed',
    role: 'VIP'
  }
]

const columns: TableColumn<Conference>[] = [
  {
    accessorKey: 'name',
    header: 'Conference Name'
  },
  {
    accessorKey: 'date',
    header: 'Date & Time'
  },
  {
    accessorKey: 'location',
    header: 'Location'
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const UBadge = resolveComponent('UBadge')
      return h(UBadge, { color: 'neutral', variant: 'subtle', size: 'sm' }, () => row.getValue('role'))
    }
  },
  {
    accessorKey: 'id',
    header: () => h('span', { class: 'text-right block' }, 'Action')
  }
]
</script>

<template>
  <div class="min-h-screen bg-stone-50 dark:bg-stone-950 pt-24 pb-12 relative overflow-hidden">
    <!-- Vine decorations -->
    <svg class="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-64 h-64 opacity-10 dark:opacity-5 pointer-events-none text-emerald-900 dark:text-emerald-400" viewBox="0 0 200 200">
      <path d="M10,190 Q50,150 20,100 T80,50 T150,20" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M20,100 L30,90 Q35,95 30,105 Z" fill="currentColor" />
      <path d="M80,50 L95,45 Q100,50 95,60 Z" fill="currentColor" />
      <path d="M50,130 L65,125 Q70,130 65,140 Z" fill="currentColor" />
    </svg>
    <svg class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 rotate-180 w-64 h-64 opacity-10 dark:opacity-5 pointer-events-none text-emerald-900 dark:text-emerald-400" viewBox="0 0 200 200">
      <path d="M10,190 Q50,150 20,100 T80,50 T150,20" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M20,100 L30,90 Q35,95 30,105 Z" fill="currentColor" />
      <path d="M80,50 L95,45 Q100,50 95,60 Z" fill="currentColor" />
      <path d="M50,130 L65,125 Q70,130 65,140 Z" fill="currentColor" />
    </svg>

    <UContainer class="relative z-10">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <UButton
            to="/"
            variant="ghost"
            color="neutral"
            icon="i-lucide-arrow-left"
            class="mb-4 text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400"
          >
            Back to Landing
          </UButton>
          <h1 class="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Member Dashboard
          </h1>
          <p class="text-stone-600 dark:text-stone-400 mt-2">
            Welcome back to the Conference Suite. Your academic journey, organized.
          </p>
        </div>

        <UCard
          :ui="{
            root: 'ring-1 ring-stone-200 dark:ring-stone-700 rounded-xl shadow-sm',
            body: 'px-6 py-3'
          }"
        >
          <p class="text-xs text-stone-400 dark:text-stone-500 uppercase font-bold tracking-wider mb-1">
            Total Registrations
          </p>
          <p class="text-2xl font-bold text-emerald-900 dark:text-emerald-400">
            {{ conferences.length }}
          </p>
        </UCard>
      </div>

      <!-- Conferences Table -->
      <UCard
        :ui="{
          root: 'ring-1 ring-stone-200 dark:ring-stone-700 rounded-3xl shadow-xl overflow-hidden',
          body: 'p-0'
        }"
      >
        <!-- Table Header -->
        <div class="p-8 border-b border-stone-100 dark:border-stone-800 flex items-center gap-3">
          <UIcon name="i-lucide-book-open" class="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
          <h2 class="text-xl font-bold text-stone-800 dark:text-stone-100">
            Your Registered Conferences
          </h2>
        </div>

        <UTable
          :data="conferences"
          :columns="columns"
          :ui="{
            th: 'px-8 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest bg-stone-50 dark:bg-stone-900',
            td: 'px-8 py-6 text-stone-600 dark:text-stone-300'
          }"
        >
          <template #name-cell="{ row }">
            <div class="flex flex-col">
              <span class="font-bold text-stone-900 dark:text-stone-50">
                {{ row.original.name }}
              </span>
              <UBadge
                :color="row.original.status === 'Confirmed' ? 'success' : 'warning'"
                variant="subtle"
                size="xs"
                class="mt-1 w-fit"
              >
                {{ row.original.status }}
              </UBadge>
            </div>
          </template>

          <template #date-cell="{ row }">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
              {{ row.original.date }}
            </div>
          </template>

          <template #location-cell="{ row }">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
              {{ row.original.location }}
            </div>
          </template>

          <template #id-cell>
            <div class="text-right">
              <UButton
                icon="i-lucide-external-link"
                color="neutral"
                variant="ghost"
                size="sm"
                class="text-stone-400 dark:text-stone-500 hover:text-emerald-800 dark:hover:text-emerald-400"
              />
            </div>
          </template>
        </UTable>

        <!-- Footer -->
        <div class="p-8 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex justify-center">
          <UButton variant="link" color="primary" class="text-emerald-800 dark:text-emerald-400 font-bold">
            View All Past Conferences
          </UButton>
        </div>
      </UCard>

      <!-- Bottom decorative text -->
      <div class="mt-12 text-center flex items-center justify-center gap-3">
        <span class="w-8 h-px bg-stone-200 dark:bg-stone-700" />
        <p class="text-stone-400 dark:text-stone-500 text-sm italic">
          Designed for Intellectual Pursuit
        </p>
        <span class="w-8 h-px bg-stone-200 dark:bg-stone-700" />
      </div>
    </UContainer>
  </div>
</template>
