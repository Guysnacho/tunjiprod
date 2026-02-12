'use client'

import Link from 'next/link'
import { BookOpen, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Database } from '@/types/database.types'

interface Conference {
  role: Database['public']['Enums']['user_role']
  attended: number[]
  org_id: string
  organization: {
    name: string
    short_name: string | null
    base_url: string
  }
}

interface DashboardClientProps {
  conferences: Conference[]
  totalCount: number
}

export function DashboardClient({ conferences, totalCount }: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-24 pb-12 relative overflow-hidden">
      {/* Vine decorations */}
      <svg
        className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-64 h-64 opacity-10 dark:opacity-5 pointer-events-none text-emerald-900 dark:text-emerald-400"
        viewBox="0 0 200 200"
      >
        <path
          d="M10,190 Q50,150 20,100 T80,50 T150,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M20,100 L30,90 Q35,95 30,105 Z" fill="currentColor" />
        <path d="M80,50 L95,45 Q100,50 95,60 Z" fill="currentColor" />
        <path d="M50,130 L65,125 Q70,130 65,140 Z" fill="currentColor" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 rotate-180 w-64 h-64 opacity-10 dark:opacity-5 pointer-events-none text-emerald-900 dark:text-emerald-400"
        viewBox="0 0 200 200"
      >
        <path
          d="M10,190 Q50,150 20,100 T80,50 T150,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M20,100 L30,90 Q35,95 30,105 Z" fill="currentColor" />
        <path d="M80,50 L95,45 Q100,50 95,60 Z" fill="currentColor" />
        <path d="M50,130 L65,125 Q70,130 65,140 Z" fill="currentColor" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <Button
              asChild
              variant="ghost"
              className="mb-4 text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Landing
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50">
              Member Dashboard
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-2">
              Welcome back to the Conference Suite. Your academic journey, organized.
            </p>
          </div>

          <Card className="ring-1 ring-stone-200 dark:ring-stone-700 rounded-xl shadow-sm">
            <CardContent className="px-6 py-3">
              <p className="text-xs text-stone-400 dark:text-stone-500 uppercase font-bold tracking-wider mb-1">
                Total Registrations
              </p>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-400">
                {totalCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Conferences Table */}
        <Card className="ring-1 ring-stone-200 dark:ring-stone-700 rounded-3xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-8 border-b border-stone-100 dark:border-stone-800 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
              Your Registered Conferences
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-stone-50 dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-900">
                  <TableHead className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                    Conference Name
                  </TableHead>
                  <TableHead className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                    Attended
                  </TableHead>
                  <TableHead className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                    Role
                  </TableHead>
                  <TableHead className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conferences.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-stone-500 dark:text-stone-400">
                      No conferences registered yet
                    </TableCell>
                  </TableRow>
                ) : (
                  conferences.map((conference, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-900 dark:text-stone-50">
                            {conference.organization.name}
                          </span>
                          {conference.organization.short_name && (
                            <Badge variant="secondary" className="mt-1 w-fit bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                              {conference.organization.short_name}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-stone-600 dark:text-stone-300">
                        {conference.attended.length > 0 ? conference.attended.join(', ') : 'None'}
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="secondary" className="text-xs">
                          {conference.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-center">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-stone-400 dark:text-stone-500 hover:text-emerald-800 dark:hover:text-emerald-400"
                        >
                          <Link
                            href={conference.organization.base_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="p-8 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex justify-center">
            <Button variant="link" className="text-emerald-800 dark:text-emerald-400 font-bold">
              View All Past Conferences
            </Button>
          </div>
        </Card>

        {/* Bottom decorative text */}
        <div className="mt-12 text-center flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-stone-200 dark:bg-stone-700" />
          <p className="text-stone-400 dark:text-stone-500 text-sm italic">
            Designed for Intellectual Pursuit
          </p>
          <span className="w-8 h-px bg-stone-200 dark:bg-stone-700" />
        </div>
      </div>
    </div>
  )
}
