# Nuxt to Next.js Migration Plan - Conference Suite

## Executive Summary

This plan outlines the systematic migration of the Conference Suite from Nuxt 4 (Vue 3) to Next.js 15 (React, App Router). The migration maintains all functionality while leveraging Next.js best practices and modern React patterns.

---

## Technology Stack Decisions

### Framework & Core
- **Next.js 15** with App Router (TypeScript)
- **React 19** with Server Components
- **TypeScript** throughout (maintain strict typing)

### UI & Styling
- **Shadcn/ui** - Replaces Nuxt UI (recommended by Supabase docs, similar DX)
- **Tailwind CSS 4.x** - Keep existing configuration and custom theme
- **next-themes** - Replaces useColorMode() for dark mode
- **Lucide React** - Icons (compatible with existing i-lucide-* icons)

### Authentication & Database
- **@supabase/ssr** - Official Next.js integration
- **@supabase/supabase-js** - Client library
- Keep existing database types and schema

### State Management
- **React Context + Hooks** - For user state (replaces Pinia)
- **Zustand** (optional) - Only if complex state needs arise later

### Forms & Validation
- **Zod** - Keep existing schemas (portable)
- **React Hook Form** - Replaces Nuxt UI forms
- **@hookform/resolvers** - Zod integration

### Testing
- **Vitest** - Keep existing unit tests, adapt to React
- **Playwright** - Keep existing E2E config
- **@testing-library/react** - Component testing

### Development Tools
- **ESLint** - Adapt to Next.js + React rules
- **Prettier** - Keep existing config
- **TypeScript** - Maintain strict mode

---

## Project Structure

```
nextjs-conference-suite/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Landing page (/)
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── register/
│   │   │   └── page.tsx              # Register page
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard (protected)
│   │   ├── forgot-password/
│   │   │   └── page.tsx              # Password reset request
│   │   ├── reset-password/
│   │   │   └── page.tsx              # Password reset form
│   │   ├── confirm/
│   │   │   └── page.tsx              # Email confirmation
│   │   ├── api/
│   │   │   └── check-admin/
│   │   │       └── route.ts          # API route handler
│   │   └── globals.css               # Tailwind imports + custom theme
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # Shadcn/ui components
│   │   ├── app-navbar.tsx
│   │   ├── app-footer.tsx
│   │   ├── app-logo.tsx
│   │   ├── app-hero.tsx
│   │   ├── app-features.tsx
│   │   ├── app-architecture.tsx
│   │   ├── app-case-study.tsx
│   │   ├── app-contact-form.tsx
│   │   └── template-menu.tsx
│   │
│   ├── lib/                          # Utilities and helpers
│   │   ├── supabase/
│   │   │   ├── client.ts             # Client-side Supabase
│   │   │   ├── server.ts             # Server-side Supabase
│   │   │   └── middleware.ts         # Supabase middleware helper
│   │   ├── utils.ts                  # General utilities (cn, etc.)
│   │   └── auth.ts                   # Auth helpers (checkAdmin)
│   │
│   ├── types/
│   │   └── database.types.ts         # Supabase generated types (keep as-is)
│   │
│   ├── context/
│   │   └── user-context.tsx          # User state context (replaces Pinia)
│   │
│   └── middleware.ts                 # Next.js middleware (auth protection)
│
├── public/                           # Static assets
│   ├── favicon.ico
│   └── robots.txt
│
├── .env.local                        # Environment variables
├── .env.example                      # Template for env vars
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript config
├── components.json                   # Shadcn/ui config
└── package.json                      # Dependencies
```

---

## Migration Sequence

### Phase 1: Project Setup (Foundation)
**Goal**: Create new Next.js project with core dependencies

1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest nextjs-conference-suite --typescript --tailwind --app --src-dir
   ```

2. **Install core dependencies**
   ```bash
   npm install @supabase/ssr @supabase/supabase-js
   npm install zod react-hook-form @hookform/resolvers
   npm install next-themes
   npm install lucide-react
   npm install class-variance-authority clsx tailwind-merge
   ```

3. **Install Shadcn/ui**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button card input form badge table toast
   ```

4. **Install dev dependencies**
   ```bash
   npm install -D vitest @testing-library/react @playwright/test
   ```

5. **Setup environment variables**
   - Copy `.env` content
   - Rename variables to Next.js convention (NEXT_PUBLIC_ prefix)
   - Create `.env.local` and `.env.example`

6. **Configure Tailwind with custom theme**
   - Port custom colors (green, emerald, amber palettes)
   - Port font family (Public Sans)
   - Keep existing design tokens

---

### Phase 2: Supabase Integration
**Goal**: Setup authentication and database access

1. **Create Supabase utilities**
   - `src/lib/supabase/client.ts` - Browser client with SSR
   - `src/lib/supabase/server.ts` - Server-side client
   - `src/lib/supabase/middleware.ts` - Auth middleware helper

2. **Copy database types**
   - Copy `app/types/database.types.ts` → `src/types/database.types.ts`
   - No changes needed (portable)

3. **Setup Supabase middleware**
   - Create `src/middleware.ts`
   - Handle auth session refresh
   - Protect routes (/dashboard)
   - Redirect authenticated users from auth pages

4. **Create auth helpers**
   - Port `checkAdmin` function to `src/lib/auth.ts`
   - Adapt to use fetch instead of $fetch

---

### Phase 3: State Management & Context
**Goal**: Replace Pinia with React Context

1. **Create User Context**
   - `src/context/user-context.tsx`
   - Provide user state (ID, session)
   - Hooks: `useUser()`, `useSession()`

2. **Setup Providers**
   - Create `src/app/providers.tsx`
   - Wrap: UserProvider, ThemeProvider
   - Use in root layout

---

### Phase 4: UI Components (Shadcn/ui)
**Goal**: Setup component library and base components

1. **Install needed Shadcn components**
   - Button, Card, Input, Form, Badge, Table
   - Toast, Dropdown Menu, Separator
   - Icon component wrapper

2. **Create base layout components**
   - Port AppNavbar (Vue → React)
   - Port AppFooter (Vue → React)
   - Port AppLogo (Vue → React)

3. **Setup dark mode**
   - Configure next-themes
   - Add theme toggle to navbar
   - Test dark mode classes

---

### Phase 5: Page Migration
**Goal**: Convert all pages from Vue to React

**Order of migration:**

1. **Root Layout** (`src/app/layout.tsx`)
   - HTML structure
   - Font configuration (Public Sans)
   - Theme provider
   - User context provider
   - Toast provider

2. **Landing Page** (`src/app/page.tsx`)
   - Port index.vue structure
   - Convert all marketing components:
     - AppHero → app-hero.tsx
     - AppFeatures → app-features.tsx
     - AppArchitecture → app-architecture.tsx
     - AppCaseStudy → app-case-study.tsx
     - AppContactForm → app-contact-form.tsx
   - Test responsiveness and styling

3. **Login Page** (`src/app/login/page.tsx`)
   - Port dual auth modes (password/OTP)
   - Convert form validation (Zod schemas portable)
   - Implement React Hook Form
   - Wire up Supabase auth methods
   - Add admin check integration
   - Test both auth flows

4. **Register Page** (`src/app/register/page.tsx`)
   - Similar to login page
   - Port registration forms
   - Wire up Supabase signup

5. **Dashboard Page** (`src/app/dashboard/page.tsx`)
   - Make it a Server Component
   - Fetch data server-side (replace useAsyncData)
   - Create Client Component for table interactions
   - Port table columns and rendering
   - Test data fetching and auth protection

6. **Password Pages**
   - `src/app/forgot-password/page.tsx`
   - `src/app/reset-password/page.tsx`
   - Port forms and Supabase integration

7. **Confirm Page** (`src/app/confirm/page.tsx`)
   - Handle email confirmation callback
   - Use searchParams for token extraction

---

### Phase 6: API Routes
**Goal**: Migrate server endpoints

1. **Port check-admin endpoint**
   - Create `src/app/api/check-admin/route.ts`
   - Convert to Next.js Route Handler
   - Use server-side Supabase client
   - Maintain same logic and response format

2. **Test API endpoint**
   - Verify admin checking works
   - Test error handling

---

### Phase 7: Middleware & Auth Protection
**Goal**: Implement route protection

1. **Create auth middleware**
   - `src/middleware.ts`
   - Protect /dashboard routes
   - Redirect logic for auth pages
   - Session refresh

2. **Test protected routes**
   - Verify /dashboard requires auth
   - Verify redirects work correctly
   - Test logout flow

---

### Phase 8: Testing Migration
**Goal**: Adapt existing tests to React

1. **Setup Vitest for React**
   - Configure with @testing-library/react
   - Port unit tests from test/unit/
   - Adapt to test React components

2. **Update Playwright tests**
   - Keep existing E2E structure
   - Update selectors if needed
   - Test complete user flows

3. **Add component tests**
   - Test critical components
   - Test form validation
   - Test auth flows

---

### Phase 9: Polish & Optimization
**Goal**: Final touches and performance

1. **Image optimization**
   - Use next/image for all images
   - Configure domains in next.config.ts

2. **Metadata & SEO**
   - Add metadata to each page
   - Setup proper title/description
   - Add OG tags

3. **Performance optimization**
   - Enable static rendering where possible
   - Add loading states
   - Optimize bundle size

4. **Accessibility audit**
   - Test keyboard navigation
   - Verify ARIA labels
   - Color contrast check

---

## Critical Files to Create

### 1. Supabase Client Utilities

**`src/lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`src/lib/supabase/server.ts`**
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        }
      }
    }
  )
}
```

### 2. Middleware

**`src/middleware.ts`**
```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### 3. User Context

**`src/context/user-context.tsx`**
```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type UserContextType = {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
```

### 4. Root Layout

**`src/app/layout.tsx`**
```typescript
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { UserProvider } from '@/context/user-context'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const publicSans = Public_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Conference Suite',
  description: 'Academic conference management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={publicSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## Dependencies

### Production Dependencies
```json
{
  "@supabase/ssr": "latest",
  "@supabase/supabase-js": "latest",
  "@hookform/resolvers": "latest",
  "react-hook-form": "latest",
  "zod": "latest",
  "next-themes": "latest",
  "lucide-react": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

### Dev Dependencies
```json
{
  "@testing-library/react": "latest",
  "@playwright/test": "latest",
  "@types/node": "latest",
  "@types/react": "latest",
  "@types/react-dom": "latest",
  "vitest": "latest",
  "eslint": "latest",
  "prettier": "latest",
  "typescript": "latest",
  "tailwindcss": "latest",
  "postcss": "latest",
  "autoprefixer": "latest"
}
```

---

## Environment Variables

**`.env.local`**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Nuxt → Next.js Equivalents

| Nuxt Feature | Next.js Equivalent |
|--------------|-------------------|
| `definePageMeta()` | Page config via exports |
| `navigateTo()` | `router.push()` / `redirect()` |
| `useRoute()` | `useParams()` / `useSearchParams()` |
| `useRouter()` | `useRouter()` from next/navigation |
| `useAsyncData()` | Server Components + fetch |
| `useFetch()` | Server Components + fetch |
| `useState()` | `useState()` (same!) |
| `useSupabaseUser()` | `useUser()` from context |
| `useSupabaseClient()` | `createClient()` helper |
| `useColorMode()` | `useTheme()` from next-themes |
| `useToast()` | Shadcn toast hook |
| `$fetch()` | `fetch()` (native) |
| Auto-imports | Explicit imports |
| `<NuxtLink>` | `<Link>` from next/link |
| `<NuxtImg>` | `<Image>` from next/image |
| Server middleware | `middleware.ts` |
| `server/api/` | `app/api/*/route.ts` |
| `defineEventHandler()` | Route Handler functions |
| `readBody()` | `request.json()` |

---

## Vue → React Component Patterns

### Form Handling
**Nuxt (Vue)**
```vue
<UForm :schema="schema" :state="state" @submit="onSubmit">
  <UFormField name="email">
    <UInput v-model="state.email" />
  </UFormField>
</UForm>
```

**Next.js (React)**
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <Input {...field} />
        </FormItem>
      )}
    />
  </form>
</Form>
```

### Data Fetching
**Nuxt (Vue)**
```vue
<script setup>
const { data, status } = useAsyncData('conferences', async () => {
  return await client.from('member').select('*')
})
</script>
```

**Next.js (React Server Component)**
```tsx
async function Dashboard() {
  const supabase = await createClient()
  const { data } = await supabase.from('member').select('*')

  return <ConferencesTable data={data} />
}
```

---

## Testing Strategy

### Unit Tests
- Test utility functions (checkAdmin, etc.)
- Test React hooks
- Test form validation schemas

### Component Tests
- Test form submissions
- Test conditional rendering
- Test user interactions

### Integration Tests
- Test auth flows (login, logout, register)
- Test protected routes
- Test API endpoints

### E2E Tests (Playwright)
- Complete user journey
- Registration → Login → Dashboard
- Password reset flow
- Admin access control

---

## Migration Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Nuxt UI components heavily used | High | Use Shadcn/ui with similar patterns |
| Auto-import dependency | Medium | Add explicit imports incrementally |
| Supabase SSR complexity | High | Follow official @supabase/ssr docs |
| State management differences | Medium | Use React Context (simpler than Pinia) |
| Breaking UI during migration | High | Migrate page-by-page, test thoroughly |
| Dark mode implementation | Low | next-themes is well-documented |
| Form validation | Low | Zod schemas are portable |

---

## Timeline Estimate

- **Phase 1-2** (Setup + Supabase): 1 day
- **Phase 3-4** (Context + UI): 1-2 days
- **Phase 5** (Pages): 3-4 days
- **Phase 6-7** (API + Middleware): 1 day
- **Phase 8** (Testing): 1-2 days
- **Phase 9** (Polish): 1 day

**Total**: 8-11 days for complete migration

---

## Success Criteria

- ✅ All pages migrated and functional
- ✅ Authentication working (password + OTP)
- ✅ Protected routes enforcing auth
- ✅ Admin check API working
- ✅ Dashboard data loading from Supabase
- ✅ Dark mode toggle working
- ✅ Responsive design maintained
- ✅ All forms with validation working
- ✅ Tests passing (unit + E2E)
- ✅ No console errors
- ✅ TypeScript strict mode passing

---

## Post-Migration

### Cleanup
- Remove old Nuxt directory
- Update README with Next.js instructions
- Update deployment configuration
- Archive Nuxt codebase

### Documentation
- Document new project structure
- Update development setup guide
- Document Supabase integration
- Add deployment guide

### Future Enhancements
- Add i18n if needed (next-intl)
- Optimize images with next/image
- Add static generation for landing page
- Implement incremental static regeneration for dashboard
- Add error boundaries
- Implement analytics

---

## Notes

- Maintain git history - don't delete Nuxt code until Next.js is verified
- Test each phase before proceeding
- Keep environment variables consistent
- Preserve database schema and types
- Maintain design system (colors, fonts, spacing)
- Use TypeScript strictly
- Follow Next.js best practices (Server Components by default)
- Leverage React 19 features where beneficial
