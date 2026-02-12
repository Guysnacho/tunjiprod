import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Linkedin, Globe, Mail } from 'lucide-react'

const platformLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Documentation', href: 'https://docs.tunjiproductions.com', external: true },
]

const companyLinks = [
  {
    label: 'About Tunji Productions',
    href: 'https://tunjiproductions.com/manifesto',
    external: true,
  },
  { label: 'Contact Support', href: '/#contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/tunjiprod',
    label: 'LinkedIn',
  },
  {
    icon: Globe,
    href: 'https://tunjiproductions.com',
    label: 'Website',
  },
  {
    icon: Mail,
    href: 'mailto:contact@tunjiproductions.com',
    label: 'Email',
  },
]

export function AppFooter() {
  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-900 to-amber-800 bg-clip-text text-transparent mb-6">
              <Link href="/">Conference Suite</Link>
            </h3>
            <p className="text-stone-500 dark:text-stone-400 max-w-sm mb-8 leading-relaxed">
              Professional conference management platform built for academic and recurring events.
              Powered by Tunji Productions — trusted since 2020.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="outline"
                  size="icon"
                  className="border-stone-200 dark:border-stone-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:text-emerald-800 dark:hover:text-emerald-400"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-6">Platform</h4>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-6">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-stone-400 dark:text-stone-500 text-sm">
            © {new Date().getFullYear()} Tunji Productions. All rights reserved. Built with care
            for conferences that matter.
          </p>
          <div className="flex gap-8 text-sm font-medium text-stone-400">
            <span>v0.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
