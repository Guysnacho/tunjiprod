import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppNavbar } from '@/components/app-navbar'
import { AppFooter } from '@/components/app-footer'
import { ChevronRight, BookOpen, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <AppNavbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-950 dark:to-stone-900 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                Built for Academic Excellence
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-amber-800 dark:from-emerald-400 dark:via-emerald-500 dark:to-amber-500 bg-clip-text text-transparent">
                  Conference Suite
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Professional conference management platform built for academic and recurring events.
                Streamline registration, attendance tracking, and member management.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-emerald-900 hover:bg-emerald-950 text-amber-50 h-14 px-8 text-lg">
                  <Link href="/#contact">
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-stone-300 dark:border-stone-700">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>

              {/* Trust Badge */}
              <p className="mt-12 text-sm text-stone-500 dark:text-stone-500">
                Powered by{' '}
                <Link
                  href="https://tunjiproductions.com"
                  target="_blank"
                  className="font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
                >
                  Tunji Productions
                </Link>
                {' '}— Trusted since 2020
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-stone-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 mb-4">
                Everything you need for conference management
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-400">
                Built with modern technology and designed for academic institutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                  Member Management
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Track attendees, manage registrations, and maintain comprehensive member databases with ease.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                  Secure Authentication
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Role-based access control with admin verification ensures your conference data stays protected.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                  Modern Infrastructure
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Built on Next.js and Supabase for lightning-fast performance and real-time updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-stone-50 dark:bg-stone-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 mb-4">
                Ready to streamline your conferences?
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-400 mb-8">
                Get in touch with our team to learn how Conference Suite can transform your event management.
              </p>
              <Button asChild size="lg" className="bg-emerald-900 hover:bg-emerald-950 text-amber-50 h-14 px-8">
                <Link href="mailto:contact@tunjiproductions.com">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  )
}
