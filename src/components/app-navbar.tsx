'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, LogOut, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useUser } from '@/context/user-context'
import { createClient } from '@/lib/supabase/client'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Case Studies', href: '/#case-studies' },
]

export function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user } = useUser()
  const router = useRouter()
  const supabase = createClient()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-900 to-amber-800 bg-clip-text text-transparent">
              <Link href="/">Conference Suite</Link>
            </span>
            <Badge variant="secondary" className="hidden md:block ml-2">
              by Tunji Productions
            </Badge>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Auth Buttons */}
            {!user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="bg-emerald-900 hover:bg-emerald-950 text-amber-50">
                  <Link href="/#contact">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-all duration-200">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-stone-600 dark:text-stone-300 font-medium py-2"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {!user ? (
              <div className="flex gap-3 mt-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/login" onClick={closeMenu}>
                    Log In
                  </Link>
                </Button>
                <Button asChild className="flex-1 bg-emerald-900 hover:bg-emerald-950">
                  <Link href="/#contact" onClick={closeMenu}>
                    Get Started
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <Separator />
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard" onClick={closeMenu}>
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSignOut()
                    closeMenu()
                  }}
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
