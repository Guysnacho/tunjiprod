'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { KeyRound, Mail, Send, MailCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setLoading(false)

    if (error) {
      toast.error('Error', {
        description: error.message,
      })
    } else {
      setEmailSent(true)
    }
  }

  const resetForm = () => {
    setEmailSent(false)
    form.reset()
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 mt-16">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl relative overflow-hidden ring-1 ring-stone-200 dark:ring-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-900">
          <CardContent className="p-8 sm:p-10">
            {emailSent ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MailCheck className="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
                  Check your email
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
                  We sent a password reset link to
                </p>
                <p className="font-medium text-stone-900 dark:text-stone-50 text-sm mb-6">
                  {form.getValues('email')}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                  The link will expire in 24 hours. If you don't see the email, check your spam folder.
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
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-7 h-7 text-amber-700 dark:text-amber-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
                    Reset your password
                  </h1>
                  <p className="text-stone-600 dark:text-stone-400 mt-1 text-sm">
                    Enter your email and we'll send you a link to reset your password.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
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

                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full bg-emerald-900 hover:bg-emerald-950 h-12 text-base"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                        {!loading && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>

                <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to sign in
                  </Link>
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
