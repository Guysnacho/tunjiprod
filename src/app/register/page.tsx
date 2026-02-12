'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserPlus, Mail, KeyRound, ArrowRight, Send, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { checkAdmin } from '@/lib/auth'
import Link from 'next/link'

const passwordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type PasswordFormData = z.infer<typeof passwordSchema>
type OtpFormData = z.infer<typeof otpSchema>

export default function RegisterPage() {
  const [mode, setMode] = useState<'password' | 'otp'>('password')
  const [submitted, setSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: '',
    },
  })

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setLoading(true)

    const isAdmin = await checkAdmin(data.email)
    if (!isAdmin) {
      setLoading(false)
      toast.error('Access denied', {
        description: 'Access restricted to administrators',
      })
      return
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    setLoading(false)

    if (error) {
      toast.error('Registration failed', {
        description: error.message,
      })
    } else {
      setSubmittedEmail(data.email)
      setSubmitted(true)
    }
  }

  const onOtpSubmit = async (data: OtpFormData) => {
    setLoading(true)

    const isAdmin = await checkAdmin(data.email)
    if (!isAdmin) {
      setLoading(false)
      toast.error('Access denied', {
        description: 'Access restricted to administrators',
      })
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: { shouldCreateUser: true },
    })

    setLoading(false)

    if (error) {
      toast.error('Error', {
        description: error.message,
      })
    } else {
      setSubmittedEmail(data.email)
      setSubmitted(true)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setSubmittedEmail('')
  }

  const switchMode = (newMode: 'password' | 'otp') => {
    setMode(newMode)
    setSubmitted(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 mt-16">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl relative overflow-hidden ring-1 ring-stone-200 dark:ring-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-900">
          <CardContent className="p-8 sm:p-10">
            {/* Success State */}
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MailCheck className="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
                  Check your email
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
                  We sent a confirmation link to
                </p>
                <p className="font-medium text-stone-900 dark:text-stone-50 text-sm mb-6">
                  {submittedEmail}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                  Click the link in your email to activate your account. If you don't see it, check
                  your spam folder.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full rounded-lg" onClick={resetForm}>
                    Try a different email
                  </Button>
                  <Link
                    href="/login"
                    className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 text-center"
                  >
                    Back to sign in
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-7 h-7 text-emerald-800 dark:text-emerald-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
                    Create an account
                  </h1>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Get started with Conference Suite
                  </p>
                </div>

                {/* Mode Tabs */}
                <div className="flex rounded-lg bg-stone-100 dark:bg-stone-800 p-1 mb-6">
                  <button
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      mode === 'password'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                    }`}
                    onClick={() => switchMode('password')}
                  >
                    Email & Password
                  </button>
                  <button
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      mode === 'otp'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                    }`}
                    onClick={() => switchMode('otp')}
                  >
                    Magic Link
                  </button>
                </div>

                {/* Password Registration Form */}
                {mode === 'password' && (
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                      className="space-y-5"
                    >
                      <FormField
                        control={passwordForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 uppercase">
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="jane@university.edu"
                                  className="pl-10 bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 h-11"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 uppercase">
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="At least 8 characters"
                                  className="pl-10 bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 h-11"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 uppercase">
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="Repeat your password"
                                  className="pl-10 bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 h-11"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-emerald-900 hover:bg-emerald-950 h-12 text-base"
                          disabled={loading}
                        >
                          {loading ? 'Creating account...' : 'Create Account'}
                          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {/* OTP / Magic Link Form */}
                {mode === 'otp' && (
                  <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-5">
                      <FormField
                        control={otpForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold tracking-[0.15em] text-stone-700 dark:text-stone-300 uppercase">
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="jane@university.edu"
                                  className="pl-10 bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 h-11"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        We'll send a magic link to your email. No password required.
                      </p>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-emerald-900 hover:bg-emerald-950 h-12 text-base"
                          disabled={loading}
                        >
                          {loading ? 'Sending...' : 'Send Magic Link'}
                          {!loading && <Send className="ml-2 h-4 w-4" />}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700 text-center">
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
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
