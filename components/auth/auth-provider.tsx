"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createSupabaseClient } from "@/lib/supabase"
import { authService } from "@/lib/auth-service"
import { authUtils } from "@/lib/auth-utils"
import type { Profile } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error?: any }>
  signUp: (userData: any) => Promise<{ error?: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: any }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: any }>
  refreshProfile: () => Promise<void>
  hasPermission: (permission: string) => boolean
  isAdmin: boolean
  isHRManager: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        }
      } catch (error) {
        console.error("Error getting initial session:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id)

      if (session?.user) {
        setUser(session.user)
        await loadUserProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
      }

      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const loadUserProfile = async (userId: string) => {
    try {
      const userProfile = await authService.getUserProfile(userId)
      setProfile(userProfile)
    } catch (error) {
      console.error("Error loading user profile:", error)
      setProfile(null)
    }
  }

  const signIn = async (email: string, password: string, rememberMe = false) => {
    try {
      setLoading(true)
      const deviceInfo = authUtils.getDeviceInfo()

      const result = await authService.loginUser({ email, password, rememberMe }, deviceInfo)

      if (result.success && result.user && result.profile) {
        setUser(result.user)
        setProfile(result.profile)
        return { error: null }
      } else {
        return { error: { message: result.error } }
      }
    } catch (error: any) {
      console.error("Sign in error:", error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData: any) => {
    try {
      setLoading(true)
      const result = await authService.registerUser(userData)

      if (result.success) {
        return { error: null }
      } else {
        return { error: { message: result.error } }
      }
    } catch (error: any) {
      console.error("Sign up error:", error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await authService.logoutUser(user?.id)
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const result = await authService.initiatePasswordReset(email)

      if (result.success) {
        return { error: null }
      } else {
        return { error: { message: result.error } }
      }
    } catch (error: any) {
      console.error("Password reset error:", error)
      return { error }
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) {
        return { error: { message: "No user logged in" } }
      }

      const result = await authService.updateProfile(user.id, updates)

      if (result.success && result.profile) {
        setProfile(result.profile)
        return { error: null }
      } else {
        return { error: { message: result.error } }
      }
    } catch (error: any) {
      console.error("Profile update error:", error)
      return { error }
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!profile) return false
    return authService.hasPermission(profile.id, permission)
  }

  const isAdmin = profile?.role === "admin"
  const isHRManager = profile?.role === "hr_manager" || isAdmin

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
    hasPermission,
    isAdmin,
    isHRManager,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
