import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Named export for client components
export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Default export for backward compatibility
export default createSupabaseClient()

// Database types
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: "admin" | "hr_manager" | "user" | "viewer"
  department?: string
  job_title?: string
  phone_number?: string
  is_active: boolean
  email_verified: boolean
  email_verified_at?: string
  failed_login_attempts: number
  account_locked_until?: string
  last_login_at?: string
  login_count: number
  password_changed_at: string
  created_at: string
  updated_at: string
  created_by?: string
  updated_by?: string
}

export interface UserSecuritySettings {
  id: string
  user_id: string
  mfa_enabled: boolean
  mfa_secret?: string
  backup_codes?: string[]
  max_concurrent_sessions: number
  session_timeout_minutes: number
  require_password_change: boolean
  password_expires_at?: string
  login_notifications: boolean
  suspicious_activity_alerts: boolean
  allowed_ip_addresses?: string[]
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

export interface UserLoginHistory {
  id: string
  user_id: string
  login_at: string
  logout_at?: string
  success: boolean
  failure_reason?: string
  ip_address?: string
  user_agent?: string
  device_type?: string
  browser?: string
  os?: string
  country?: string
  city?: string
  session_id?: string
  duration_minutes?: number
  created_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  created_at: string
  expires_at: string
  last_activity_at: string
  ip_address?: string
  user_agent?: string
  device_type?: string
  is_active: boolean
  revoked_at?: string
  revoked_by?: string
}

export interface PasswordResetToken {
  id: string
  user_id: string
  token: string
  created_at: string
  expires_at: string
  used_at?: string
  ip_address?: string
  user_agent?: string
}

export interface EmailVerificationToken {
  id: string
  user_id: string
  email: string
  token: string
  created_at: string
  expires_at: string
  verified_at?: string
  ip_address?: string
}

export interface AuditLog {
  id: string
  event_type: string
  event_description: string
  severity: "low" | "medium" | "high" | "critical"
  user_id?: string
  affected_user_id?: string
  ip_address?: string
  user_agent?: string
  request_path?: string
  request_method?: string
  metadata: any
  created_at: string
}

export interface Database {
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
      user_login_history: {
        Row: UserLoginHistory
        Insert: Omit<UserLoginHistory, "id" | "created_at">
        Update: Partial<Omit<UserLoginHistory, "id" | "created_at">>
      }
      user_sessions: {
        Row: UserSession
        Insert: Omit<UserSession, "id" | "created_at">
        Update: Partial<Omit<UserSession, "id" | "created_at">>
      }
      password_reset_tokens: {
        Row: PasswordResetToken
        Insert: Omit<PasswordResetToken, "id" | "created_at">
        Update: Partial<Omit<PasswordResetToken, "id" | "created_at">>
      }
      email_verification_tokens: {
        Row: EmailVerificationToken
        Insert: Omit<EmailVerificationToken, "id" | "created_at">
        Update: Partial<Omit<EmailVerificationToken, "id" | "created_at">>
      }
      audit_logs: {
        Row: AuditLog
        Insert: Omit<AuditLog, "id" | "created_at">
        Update: Partial<Omit<AuditLog, "id" | "created_at">>
      }
    }
  }
}
