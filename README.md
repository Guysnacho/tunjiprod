# Conference Suite - Next.js

Professional conference management platform built for academic and recurring events. Migrated from Nuxt.js to Next.js 15 with full TypeScript support.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Shadcn/ui
- **Database & Auth**: Supabase
- **Forms**: React Hook Form + Zod
- **State Management**: React Context
- **Theme**: next-themes

## 📦 Features

- ✅ **Authentication**
  - Email/Password and Magic Link (OTP) support
  - Admin-only access control
  - Protected routes with middleware
  - Password reset flow
  - Email confirmation

- ✅ **Dashboard**
  - Member conference management
  - Attendance tracking
  - Role-based permissions

- ✅ **Modern UX**
  - Dark mode support
  - Responsive design
  - Accessible components
  - Toast notifications

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nextjs-suite/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth pages)/        # Login, Register, etc.
│   │   ├── dashboard/           # Protected dashboard
│   │   ├── api/                 # API routes
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn/ui components
│   │   ├── app-navbar.tsx
│   │   ├── app-footer.tsx
│   │   └── ...
│   ├── lib/                     # Utilities
│   │   ├── supabase/            # Supabase clients
│   │   ├── utils.ts
│   │   └── auth.ts
│   ├── context/                 # React Context providers
│   ├── types/                   # TypeScript types
│   └── middleware.ts            # Next.js middleware
├── public/                      # Static assets
└── ...config files
```

## 🔐 Authentication Flow

1. **Admin Check**: All login/register attempts verify admin status via `/api/check-admin`
2. **Middleware**: Protected routes redirect unauthenticated users to `/login`
3. **Session Management**: Supabase SSR handles session refresh automatically
4. **User Context**: React Context provides user state across the app

## 🎨 Theming

The app uses a custom earth-tone color palette:
- **Primary**: Emerald greens (`emerald-900`, `emerald-800`, etc.)
- **Accent**: Amber tones
- **Neutral**: Stone grays
- **Font**: Public Sans

Dark mode is managed by `next-themes` and persists across sessions.

## 📝 Database Schema

Required Supabase tables:
- `member` - User memberships with roles
- `organization` - Conference organizations
- Additional tables as defined in `database.types.ts`

To regenerate types:
```bash
npx supabase gen types --lang=typescript --project-id YOUR_PROJECT_ID --schema public > src/types/database.types.ts
```

## 🧪 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

## 📚 Key Differences from Nuxt

| Nuxt | Next.js |
|------|---------|
| `useSupabaseUser()` | `useUser()` from context |
| `navigateTo()` | `router.push()` / `redirect()` |
| `useAsyncData()` | Server Components + `fetch` |
| `definePageMeta()` | Metadata exports |
| Auto-imports | Explicit imports |
| Nuxt UI | Shadcn/ui |
| Pinia | React Context |

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Credits

Built with ❤️ by [Tunji Productions](https://tunjiproductions.com)

Powered by:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
