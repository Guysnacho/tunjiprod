# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**The Soapbox** — a sci-fi themed Music & Art Conference site by Tunji Productions. Built with Next.js 16, featuring conference registration, membership management, Stripe payments, and an admin dashboard. Deployed on Netlify.

The conference explores 4D artforms (time-based installations, interactive sculptures) and 5D film (sensory-immersive cinema).

## Commands

- **Dev server:** `yarn dev` (runs on http://localhost:3000)
- **Build:** `yarn build`
- **Lint:** `yarn lint`
- **Generate Supabase types:** `yarn generate` (outputs to `lib/supabase/types.ts`)
- **Package manager:** Yarn 4 (Berry) — do not use npm

## Architecture

### Stack
- **Framework:** Next.js 16 (App Router, `--webpack` flag used for dev/build)
- **UI:** Chakra UI v3 + Tailwind CSS, lucide-react and react-icons for icons
- **Auth & DB:** Supabase (@supabase/ssr for SSR cookie-based auth)
- **Payments:** Stripe (dynamic product/price fetching — no hardcoded price IDs)
- **State:** Zustand (persisted user store) + SWR for data fetching
- **Rich text:** TipTap editor
- **Validation:** Zod

### Design System
- **Color palette:** Cyan / violet / dark — sci-fi minimalist aesthetic
- **Dark mode:** Supported via Chakra UI `_dark` prop pattern (e.g., `color={{ base: "gray.800", _dark: "gray.100" }}`)
- **Membership tiers:** Observer (student), Creator (postdoc), Visionary (professional)

### Stripe Integration
Stripe products are fetched dynamically at runtime via `lib/stripe.ts` — no price IDs are stored in env vars. Products use metadata fields:
- `tier`: `student` | `postdoctorial` | `professional`
- `type`: `conference` | `membership`

Key helpers in `lib/stripe.ts`:
- `getActiveProducts()` — all active products with prices
- `getActiveProductIds()` — product IDs for coupon scoping
- `findPriceByTier(tier, memberOnly)` — locate a price by tier and type

### Supabase Client Pattern
Three separate Supabase client factories in `lib/supabase/`:
- `client.ts` — browser client (client components)
- `server.ts` — server client using cookies (server components/actions)
- `service.ts` — service role client with elevated permissions (API routes only, never client-side)

Supabase auth session is refreshed via middleware (`lib/supabase/middleware.ts`). Unauthenticated users accessing `/dashboard` are redirected to `/`.

### Database Types
Auto-generated from Supabase schema into `lib/supabase/types.ts`. Regenerate with `yarn generate` after schema changes.

### Key Routes
- `app/page.tsx` — Home (sci-fi landing page)
- `app/events/page.tsx` — Events (installations, screenings, workshops)
- `app/dashboard/page.tsx` — Member dashboard (auth-protected)
- `app/checkout/route.ts` — Stripe checkout API route (dynamic price lookup)
- `app/admin/route.ts` — Admin API route (coupon management)
- `app/products/route.ts` — Public API for active Stripe products
- `app/payment/[id]/` — Payment confirmation with dynamic route
- `app/membership/` — Membership plans and signup (has nested `reset/` route)

### State Management
Zustand store in `lib/store/userStore.ts` tracks user id and role (`admin | student | postdoctorial | professional`), persisted to localStorage.

### Path Aliases
`@/*` maps to the project root (configured in tsconfig.json).

### Environment Variables
Copy `.env.template` to `.env.local`. Key vars: Supabase credentials, Stripe keys (secret + publishable), ORG_ID, APP_URL, LATE_REGISTRATION flag. All env vars are typed in `environment.d.ts`. No Stripe price/product IDs are needed — they are fetched dynamically.
