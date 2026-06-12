'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Terminal, Loader2, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!formData.name.trim())               e.name     = 'Name is required'
    if (!formData.username.trim())           e.username = 'Username is required'
    else if (formData.username.length < 3)   e.username = 'Username must be at least 3 characters'
    else if (!/^[a-z0-9_]+$/.test(formData.username)) e.username = 'Only lowercase letters, numbers, underscores'
    if (!formData.email.trim())              e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.password)                  e.password = 'Password is required'
    else if (formData.password.length < 8)   e.password = 'Password must be at least 8 characters'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
  e.preventDefault()
  const validationErrors = validate()
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }
  setIsLoading(true)

  try {
    // Register user
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!data.success) {
      setErrors({ general: data.error.message })
      setIsLoading(false)
      return
    }

    // Auto sign in after register
    const { signIn } = await import('next-auth/react')
    const result = await signIn('credentials', {
      email:    formData.email,
      password: formData.password,
      redirect: false,
    })

    if (result?.error) {
      setErrors({ general: result.error })
      setIsLoading(false)
      return
    }

    window.location.href = '/dashboard'

  } catch (err) {
    setErrors({ general: 'Something went wrong. Please try again.' })
    setIsLoading(false)
  }
}

  const getPasswordStrength = () => {
    const p = formData.password
    if (!p) return null
    if (p.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' }
    if (p.length < 8) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/4' }
    if (p.length < 12 || !/[!@#$%^&*]/.test(p)) return { label: 'Good', color: 'bg-blue-500', width: 'w-3/4' }
    return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' }
  }

  const strength = getPasswordStrength()

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Start coding in seconds. Free forever.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
{errors.general && (
  <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
    {errors.general}
  </div>
)}
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Alex Chen"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              <Input
                id="username"
                name="username"
                placeholder="alexchen"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className={`pl-7 ${errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
            </div>
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`pr-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password strength bar */}
            {formData.password && strength && (
              <div className="space-y-1">
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Strength: <span className="text-foreground">{strength.label}</span>
                </p>
              </div>
            )}
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading
              ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...</>
              : 'Create Account'
            }
          </Button>

        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-3 text-xs text-muted-foreground">or</span>
          </div>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-foreground font-medium hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>

      </div>

      {/* Terms */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        By creating an account, you agree to our{' '}
        <span className="underline cursor-pointer">Terms of Service</span>
        {' '}and{' '}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  )
}