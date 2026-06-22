'use client'

import { useState, useEffect, useMemo } from 'react' // Added useMemo
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card'
import { useAuth } from '@/lib/auth-context'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
})

type LoginFormData = z.infer<typeof loginSchema> // Type definition for login form data

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, login, error: authError } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const { // Destructure form methods and state
    register, // Function to register inputs
    handleSubmit, // Function to handle form submission
    formState: { errors, isValid }, // Object containing form state, including errors and validity
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setLoginError(null)

    try {
      await login(data.email, data.password)
      // Redirect happens via useEffect when isAuthenticated changes
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setLoginError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const testCredentials = useMemo(() => [ // Memoized test credentials
    { email: 'admin@mwala.com', password: 'password123', name: 'Admin' },
    { email: 'test@mwala.com', password: 'password123', name: 'Test User' },
  ], []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-none shadow-2xl ring-1 ring-slate-200">
          <CardHeader className="border-b-0">
            <div className="mb-6 text-center">
              <h1 className="text-4xl font-black tracking-tighter text-[#0F172A]">MWALA<span className="text-[#D4A017]">.</span></h1>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Institutional Infrastructure</p>
            </div>
            <CardTitle className="text-center text-[#0F172A]">Sign in to your account</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Error Alert */}
            {(loginError || authError) && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{loginError || authError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1"
                  {...register('password')}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-input"
                  {...register('rememberMe')}
                  disabled={isSubmitting}
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              {/* Submit button */}
              <Button
                variant="default"
                type="submit"
                className="w-full"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Demo mode - Use test credentials below
            </p>
          </CardContent>
        </Card>

        {/* Test Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testCredentials.map((cred) => (
              <div key={cred.email} className="space-y-1">
                <p className="text-sm font-medium text-foreground">{cred.name}</p>
                <p className="text-xs text-muted-foreground">
                  Email: <span className="font-mono text-foreground">{cred.email}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Password: <span className="font-mono text-foreground">{cred.password}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
