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
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Eye,
  EyeOff,
  Shield,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  KeyRound,
  ArrowLeft,
} from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase"
import { toast } from "sonner"

interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    color: "bg-red-500",
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createSupabaseClient()

  // Check for access token in URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get("access_token")
    const refreshToken = hashParams.get("refresh_token")
    const type = hashParams.get("type")

    if (type === "recovery" && accessToken && refreshToken) {
      // Set the session with the tokens
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
    } else if (!accessToken) {
      // No valid reset token, redirect to login
      toast.error("Invalid or expired password reset link")
      router.push("/auth/login")
    }
  }, [supabase, router])

  // Password strength checker
  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length === 0) {
      return { score: 0, feedback: ["Enter a password"], color: "bg-gray-300" }
    }

    if (password.length < 8) {
      feedback.push("At least 8 characters")
    } else {
      score += 1
    }

    if (!/[a-z]/.test(password)) {
      feedback.push("Add lowercase letters")
    } else {
      score += 1
    }

    if (!/[A-Z]/.test(password)) {
      feedback.push("Add uppercase letters")
    } else {
      score += 1
    }

    if (!/\d/.test(password)) {
      feedback.push("Add numbers")
    } else {
      score += 1
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      feedback.push("Add special characters")
    } else {
      score += 1
    }

    // Common password patterns
    if (/(.)\1{2,}/.test(password)) {
      feedback.push("Avoid repeated characters")
      score = Math.max(0, score - 1)
    }

    if (/123|abc|qwe|password|admin/i.test(password)) {
      feedback.push("Avoid common patterns")
      score = Math.max(0, score - 1)
    }

    let color = "bg-red-500"
    if (score >= 4) color = "bg-green-500"
    else if (score >= 3) color = "bg-yellow-500"
    else if (score >= 2) color = "bg-orange-500"

    if (feedback.length === 0) {
      feedback.push("Strong password!")
    }

    return { score, feedback, color }
  }

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password))
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate passwords
      if (!password || !confirmPassword) {
        throw new Error("Please fill in all required fields")
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (passwordStrength.score < 3) {
        throw new Error("Please choose a stronger password")
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        throw updateError
      }

      // Get current user to update profile
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Update password changed timestamp in profile
        await supabase.from("profiles").update({ password_changed_at: new Date().toISOString() }).eq("id", user.id)

        // Log audit event
        await supabase.from("audit_logs").insert({
          event_type: "password_reset",
          event_description: "User successfully reset their password",
          user_id: user.id,
          severity: "medium",
        })
      }

      setSuccess(true)
      toast.success("Password updated successfully!")

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/auth/login?message=password-updated")
      }, 2000)
    } catch (err: any) {
      console.error("Password reset error:", err)
      setError(err.message || "An error occurred while updating your password")
      toast.error(err.message || "Password update failed")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    password.length > 0 && confirmPassword.length > 0 && password === confirmPassword && passwordStrength.score >= 3

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Password Updated!</CardTitle>
            <CardDescription className="text-slate-300">
              Your password has been successfully updated. You will be redirected to the login page shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => router.push("/auth/login?message=password-updated")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-8">
      <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Reset Your Password</CardTitle>
          <CardDescription className="text-slate-300">
            Choose a strong password to secure your ESGit account
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
              <Label htmlFor="password" className="text-slate-200 font-medium">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  required
                  disabled={loading}
                  autoComplete="new-password"
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Password Strength</span>
                    <span className="text-xs text-slate-400">{Math.round((passwordStrength.score / 5) * 100)}%</span>
                  </div>
                  <Progress value={(passwordStrength.score / 5) * 100} className="h-2" />
                  <div className="text-xs text-slate-400">
                    {passwordStrength.feedback.map((feedback, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        {passwordStrength.score >= 4 ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-slate-500" />
                        )}
                        <span>{feedback}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200 font-medium">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="text-xs">
                  {password === confirmPassword ? (
                    <div className="flex items-center space-x-1 text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>Passwords match</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-red-400">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Passwords do not match</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating Password...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Update Password</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline inline-flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>

          {/* Security Information */}
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Password Requirements</h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Includes numbers and special characters</li>
              <li>• Avoid common patterns and repeated characters</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
