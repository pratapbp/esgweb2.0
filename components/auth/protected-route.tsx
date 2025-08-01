"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { roleService } from "@/lib/role-service"
import { Loader2, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "hr_manager" | "user" | "viewer"
  requiredPermission?: string
  fallbackPath?: string
  showUnauthorized?: boolean
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = "/auth/login",
  showUnauthorized = true,
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user || !profile) {
        // Redirect to login with return URL
        const currentPath = window.location.pathname
        router.push(`${fallbackPath}?redirect=${encodeURIComponent(currentPath)}`)
        return
      }

      // Check if account is active
      if (!profile.is_active) {
        router.push("/auth/account-deactivated")
        return
      }

      // Check if email is verified
      if (!profile.email_verified) {
        router.push("/auth/verify-email")
        return
      }

      // Check role requirement
      if (requiredRole) {
        const userRoleLevel = roleService.getRoleLevel(profile.role)
        const requiredRoleLevel = roleService.getRoleLevel(requiredRole)

        if (userRoleLevel < requiredRoleLevel) {
          if (showUnauthorized) {
            // Don't redirect, show unauthorized message
            return
          } else {
            router.push("/unauthorized")
            return
          }
        }
      }

      // Check permission requirement
      if (requiredPermission) {
        const hasPermission = roleService.hasPermission(profile.role, requiredPermission)

        if (!hasPermission) {
          if (showUnauthorized) {
            // Don't redirect, show unauthorized message
            return
          } else {
            router.push("/unauthorized")
            return
          }
        }
      }
    }
  }, [user, profile, loading, requiredRole, requiredPermission, router, fallbackPath, showUnauthorized])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  // Check if user is not authenticated
  if (!user || !profile) {
    return null // Will redirect in useEffect
  }

  // Check if account is not active
  if (!profile.is_active) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Account Deactivated</CardTitle>
            <CardDescription className="text-slate-300">
              Your account has been deactivated. Please contact support for assistance.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="w-full">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if email is not verified
  if (!profile.email_verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Email Verification Required</CardTitle>
            <CardDescription className="text-slate-300">
              Please verify your email address to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/verify-email">Verify Email</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/auth/resend-verification">Resend Verification</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check role authorization
  if (requiredRole) {
    const userRoleLevel = roleService.getRoleLevel(profile.role)
    const requiredRoleLevel = roleService.getRoleLevel(requiredRole)

    if (userRoleLevel < requiredRoleLevel && showUnauthorized) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-8">
          <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Access Denied</CardTitle>
              <CardDescription className="text-slate-300">
                You don't have the required permissions to access this page.
                {requiredRole && (
                  <span className="block mt-2">
                    Required role:{" "}
                    <span className="font-semibold text-white">
                      {roleService.getRoleDisplayInfo(requiredRole)?.displayName}
                    </span>
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/contact">Request Access</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }
  }

  // Check permission authorization
  if (requiredPermission) {
    const hasPermission = roleService.hasPermission(profile.role, requiredPermission)

    if (!hasPermission && showUnauthorized) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-8">
          <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Access Denied</CardTitle>
              <CardDescription className="text-slate-300">
                You don't have the required permissions to access this page.
                {requiredPermission && (
                  <span className="block mt-2">
                    Required permission: <span className="font-semibold text-white">{requiredPermission}</span>
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/contact">Request Access</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }
  }

  // User is authorized, render children
  return <>{children}</>
}
