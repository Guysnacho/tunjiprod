# Conference Suite

**Professional conference management platform built for academic and recurring events**

Conference Suite is a comprehensive multi-tenant platform that handles registration, content management, payment processing, and attendee engagement under a unified brand. Purpose-built for conferences that value continuity, member relationships, and professional content delivery.

---

## Overview

Conference Suite eliminates the complexity of managing multiple systems by providing an all-in-one solution for conference organizers. With features like cross-conference authentication, year-specific subdomain isolation, integrated video libraries, and sophisticated form builders, Conference Suite scales from single events to comprehensive conference series management.

**Powered by Tunji Productions** — Trusted by academic conferences since 2020.

---

## Key Features

### Core Platform

- **Multi-tenant architecture** with centralized management via Tunji Productions dashboard
- **Conference-level registration** with smooth login/signup experience
- **Subdomain-level authentication** with Supabase integration
- **Cross-conference authentication** maintaining persistent attendee profiles across years
- **Year-specific experiences** for both admins and members

### Content Management

- **Video package** with professional content hosting via Cloudflare R2
- **Multipart upload** for single conference bulk video management
- **Content management dashboard** for updating titles, deleting content, and organizing materials
- **Dynamic video center** with member-exclusive access

### Forms & Data Collection

- **Dynamic form builder** with customizable templates
- **Form persistence** for user submissions
- **On-site data collection** during live events
- **Template library** managed from Tunji Productions admin

### Scheduling & Calendar

- **Admin schedule builder** for conference programming
- **Member schedule builder** with personalized agendas
- **Schedule persistence** for both admin and attendee roles
- **Conference-level and individual-level saves**

### Payments & Notifications

- **Stripe integration** with webhook processing
- **Payment confirmation** and automated receipts
- **Email notification templates** with edge function triggers
- **Customizable notification system** for conference-specific communications

### Authentication & Security

- **Supabase-powered authentication** with cross-subdomain session management
- **Secure member data** handling with privacy-first architecture
- **Email verification** and account recovery flows
- **Role-based access control** for admins, members, and guests

---

## Technology Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions)
- **Storage:** Cloudflare R2 for video and media content
- **Payments:** Stripe with webhook integration
- **Email:** Resend for transactional notifications
- **Forms:** React Hook Form with dynamic schema generation
- **Hosting:** Vercel with multi-subdomain support

---

## Architecture

Conference Suite uses a multi-tenant architecture where:

- **Primary domain:** `tunjiproductions.com` — Central management dashboard
- **Conference Suite subdomain:** `suite.tunjiproductions.com` — Home of the Conference Suite
<!-- - **Conference subdomains:** `{conference}.tunjiproductions.com` — Individual conference sites
- **Year-specific routes:** `{conference}.tunjiproductions.com/{year}` — Year-isolated content -->
- **Unified auth:** Single authentication system across all subdomains with conference-specific permissions

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payment processing)
- Cloudflare R2 bucket (for video storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/Guysnacho/tunjiprod.git suite
cd suite
git switch suite

# Install dependencies
yarn install

# Set up environment variables
cp .env.template .env.local
# Edit .env.local with your credentials

# Run database migrations
yarn run db:migrate

# Start development server
yarn run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name

# Email
RESEND_API_KEY=your_resend_api_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Project Structure

```
conference-suite/
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin dashboard routes
│   ├── (conference)/      # Conference-facing routes
│   └── api/               # API routes and webhooks
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
│   ├── supabase/         # Supabase client and utilities
│   ├── stripe/           # Stripe integration
│   └── cloudflare/       # R2 storage utilities
├── supabase/             # Supabase migrations and functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

---

## Development Roadmap

### Phase 1: Core Features ✅

- [x] Multi-tenant content management
- [x] Conference registration system
- [x] Dynamic form builder
- [x] Tunji Productions admin dashboard

### Phase 2: Advanced Features (In Progress)

- [ ] Subdomain-level authentication
- [ ] Cross-conference auth experience
- [ ] Stripe webhook integration
- [ ] Email notification system
- [ ] Video package with hosting

### Phase 3: Premium Features (Planned)

- [ ] Conference schedule builder (admin + member)
- [ ] Advanced form template system
- [ ] Enhanced video package with analytics
- [ ] Photography gallery integration

---

## Contributing

This is a proprietary project built and maintained by Tunji Productions. For inquiries about contributing or partnership opportunities, please contact us.

---

## Case Studies

### MCBIOS (MidSouth Computational Biology and Bioinformatics Society)

**Partnership Duration:** 4+ years  
**Services Provided:** Custom conference platform, video center, membership management, payment processing

- Custom-designed conference experience
- Secure payment processing and membership authentication
- Video archive with member-exclusive access
- Year-over-year platform improvements

**See it live:**

- Current site: [mcbios.com](https://mcbios.com)
- Previous version: [old.mcbios.com](https://old.mcbios.com)

---

## License

Proprietary — © 2026 Tunji Productions. All rights reserved.

---

## Contact

**Tunji Productions**  
Building professional conference platforms for academic and recurring events.

- Website: [tunjiproductions.com](https://tunjiproductions.com)
- Email: contact@tunjiproductions.com
- LinkedIn: [Tunji Productions](https://linkedin.com/company/tunji-productions)

---

## Support

For technical support or inquiries about Conference Suite for your event:

- Email: support@tunjiproductions.com
- Documentation: [docs.tunjiproductions.com](https://docs.tunjiproductions.com)

---

**Built with care for conferences that matter.** 🎯
