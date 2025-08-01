import { createClient } from "@supabase/supabase-js"

// Fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Named export for client components
export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Default export for backward compatibility
export default supabase

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: "admin" | "hr_manager" | "user" | "viewer"
  department: string | null
  job_title: string | null
  phone_number: string | null
  is_active: boolean
  email_verified: boolean
  email_verified_at: string | null
  failed_login_attempts: number
  account_locked_until: string | null
  last_login_at: string | null
  login_count: number
  password_changed_at: string
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
}

export interface UserSecuritySettings {
  id: string
  user_id: string
  mfa_enabled: boolean
  mfa_secret: string | null
  backup_codes: string[] | null
  max_concurrent_sessions: number
  session_timeout_minutes: number
  require_password_change: boolean
  password_expires_at: string | null
  login_notifications: boolean
  suspicious_activity_alerts: boolean
  allowed_ip_addresses: string[] | null
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  theme: "light" | "dark" | "system"
  language: string
  timezone: string
  date_format: string
  email_notifications: boolean
  push_notifications: boolean
  marketing_emails: boolean
  dashboard_layout: any
  favorite_modules: string[]
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
      }
      user_security_settings: {
        Row: UserSecuritySettings
        Insert: Omit<UserSecuritySettings, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<UserSecuritySettings, "id" | "created_at" | "updated_at">>
      }
      user_preferences: {
        Row: UserPreferences
        Insert: Omit<UserPreferences, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<UserPreferences, "id" | "created_at" | "updated_at">>
      }
    }
  }
}
