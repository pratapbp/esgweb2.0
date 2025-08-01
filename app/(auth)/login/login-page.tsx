"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Eye,
  EyeOff,
  Shield,
  Lock,
  ArrowRight,
  Zap,
  Users,
  Brain,
  Mail,
  CheckCircle,
  AlertTriangle,
  KeyRound,
} from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isInitializing, setIsInitializing] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/admin/dashboard"
  const message = searchParams.get("message")
  const supabase = createSupabaseClient()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // Check if user profile exists and get role
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, email_verified, is_active")
            .eq("id", session.user.id)
            .single()

          if (profile) {
            if (!profile.is_active) {
              await supabase.auth.signOut()
              setError("Your account has been deactivated. Please contact support.")
              return
            }

            if (!profile.email_verified) {
              setError("Please verify your email address before signing in.")
              return
            }

            // Redirect based on role
            const redirectPath = profile.role === "admin" ? "/admin/dashboard" : "/dashboard"
            router.push(redirect || redirectPath)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsInitializing(false)
      }
    }

    checkAuth()
  }, [supabase, router, redirect])

  // Show message from URL params (e.g., from password reset)
  useEffect(() => {
    if (message) {
      if (message === "password-updated") {
        toast.success("Password updated successfully! Please sign in with your new password.")
      } else if (message === "email-verified") {
        toast.success("Email verified successfully! You can now sign in.")
      } else if (message === "signup-success") {
        toast.success("Account created successfully! Please check your email to verify your account.")
      }
    }
  }, [message])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate input
      if (!email || !password) {
        throw new Error("Please fill in all required fields")
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address")
      }

      // Sign in with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      })

      if (signInError) {
        if (signInError.message === "Invalid login credentials") {
          throw new Error("Invalid email or password. Please check your credentials and try again.")
        } else if (signInError.message === "Email not confirmed") {
          throw new Error(
            "Please verify your email address before signing in. Check your inbox for a verification link.",
          )
        } else if (signInError.message === "Too many requests") {
          throw new Error("Too many login attempts. Please wait a few minutes before trying again.")
        }
        throw signInError
      }

      if (data.user) {
        // Update last login timestamp
        await supabase
          .from("profiles")
          .update({
            last_login_at: new Date().toISOString(),
            login_count: supabase.raw("login_count + 1"),
          })
          .eq("id", data.user.id)

        // Get user profile to determine redirect
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, email_verified, is_active, full_name")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          console.error("Profile fetch error:", profileError)
          throw new Error("Failed to load user profile. Please try again.")
        }

        if (!profile.is_active) {
          await supabase.auth.signOut()
          throw new Error("Your account has been deactivated. Please contact support for assistance.")
        }

        if (!profile.email_verified) {
          await supabase.auth.signOut()
          throw new Error(
            "Please verify your email address before signing in. Check your inbox for a verification link.",
          )
        }

        // Set remember me preference
        if (rememberMe) {
          localStorage.setItem("remember_me", "true")
        } else {
          localStorage.removeItem("remember_me")
        }

        toast.success(`Welcome back, ${profile.full_name || "User"}!`)

        // Redirect based on role and original redirect parameter
        const defaultRedirect = profile.role === "admin" ? "/admin/dashboard" : "/dashboard"
        router.push(redirect || defaultRedirect)
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "An unexpected error occurred during sign in")
      toast.error(err.message || "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first")
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        throw error
      }

      toast.success("Password reset email sent! Check your inbox for instructions.")
    } catch (error: any) {
      console.error("Password reset error:", error)
      toast.error(error.message || "Failed to send password reset email")
    }
  }

  const isFormValid = email.length > 0 && password.length > 0

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <p className="text-slate-300">Initializing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Left Side - Welcome Content */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ESGit
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Access your AI-powered enterprise solutions dashboard and manage your digital transformation journey.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
                <p className="text-slate-300">Bank-grade security with multi-factor authentication and encryption</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Insights</h3>
                <p className="text-slate-300">Real-time analytics and intelligent recommendations for your business</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
                <p className="text-slate-300">Seamless workflow management and team coordination tools</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">New:</span>
              <span className="text-white font-medium">Enhanced LCA Management System</span>
            </div>
            <p className="text-slate-300 text-sm">
              Streamlined H1B visa processing with AI-powered compliance tracking and blockchain verification.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
            <CardDescription className="text-slate-300">
              Access your ESGit dashboard and manage your enterprise solutions
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-slate-400 text-sm mb-4">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                >
                  Create account
                </Link>
                {" or "}
                <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors hover:underline">
                  contact support
                </Link>
              </p>
            </div>

            {/* Security Badges */}
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-3">Secure Enterprise Access</p>
              <div className="flex justify-center space-x-4">
                <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  SSL Encrypted
                </Badge>
                <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                  <Shield className="w-3 h-3 mr-1" />
                  SOC 2 Compliant
                </Badge>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                  <KeyRound className="w-3 h-3 mr-1" />
                  MFA Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
