'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { useUser } from '@/context/user-context'
import Link from 'next/link'

function ConfirmContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()

  useEffect(() => {
    const confirmEmail = async () => {
      const type = searchParams.get('type')

      if (type === 'recovery') {
        router.push('/reset-password')
        return
      }

      // Wait for user authentication to complete
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (user) {
        setStatus('success')
        const msg =
          type === 'signup'
            ? 'Your email has been confirmed.'
            : 'You have been signed in.'
        setMessage(msg)
        toast.success('Welcome', {
          description: msg,
        })
        setTimeout(() => router.push('/dashboard'), 2000)
      } else {
        setStatus('error')
        setMessage('This link may have expired or already been used.')
      }
    }

    confirmEmail()
  }, [user, searchParams, router])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 mt-16">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl relative overflow-hidden ring-1 ring-stone-200 dark:ring-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-900">
          <CardContent className="p-8 sm:p-10">
            {/* Loading */}
            {status === 'loading' && (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-8 h-8 text-emerald-800 dark:text-emerald-400 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
                  Confirming...
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  Please wait while we verify your link.
                </p>
              </div>
            )}

            {/* Success */}
            {status === 'success' && (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
                  {message}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-6">
                  Redirecting you now...
                </p>
                <Button
                  asChild
                  className="bg-emerald-900 hover:bg-emerald-950 rounded-lg"
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            )}

            {/* Error */}
            {status === 'error' && (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-8 h-8 text-red-700 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
                  Confirmation failed
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-6">{message}</p>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-emerald-900 hover:bg-emerald-950 rounded-lg"
                  >
                    <Link href="/login">Back to Sign In</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-stone-400 dark:text-stone-500 text-[10px] mt-6 font-bold uppercase tracking-[0.25em]">
          Built for academic excellence
        </p>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 mt-16">
        <Card className="shadow-2xl relative overflow-hidden ring-1 ring-stone-200 dark:ring-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-900 w-full max-w-md">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-emerald-800 dark:text-emerald-400 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
                Loading...
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  )
}
