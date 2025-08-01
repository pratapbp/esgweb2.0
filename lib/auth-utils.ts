import { createSupabaseClient } from "./supabase"
import { SessionService } from "./session-service"

export interface LoginAttempt {
  success: boolean
  userId?: string
  email: string
  ipAddress?: string
  userAgent?: string
  failureReason?: string
}

export interface SecuritySettings {
  mfaEnabled: boolean
  mfaSecret?: string
  backupCodes?: string[]
  maxConcurrentSessions: number
  sessionTimeoutMinutes: number
  requirePasswordChange: boolean
  passwordExpiresAt?: string
  loginNotifications: boolean
  suspiciousActivityAlerts: boolean
  allowedIpAddresses?: string[]
}

export interface MFASetup {
  secret: string
  qrCodeUrl: string
  backupCodes: string[]
}

export class AuthUtils {
  private supabase = createSupabaseClient()
  private sessionService = new SessionService()

  /**
   * Track a login attempt (success or failure)
   */
  async trackLoginAttempt(attempt: LoginAttempt): Promise<void> {
    try {
      if (attempt.success && attempt.userId) {
        // Call the database function for successful login
        await this.supabase.rpc("handle_user_login", {
          p_user_id: attempt.userId,
          p_ip_address: attempt.ipAddress,
          p_user_agent: attempt.userAgent,
        })
      } else {
        // Call the database function for failed login
        await this.supabase.rpc("handle_failed_login", {
          p_email: attempt.email,
          p_ip_address: attempt.ipAddress,
          p_user_agent: attempt.userAgent,
          p_failure_reason: attempt.failureReason || "Invalid credentials",
        })
      }
    } catch (error) {
      console.error("Error tracking login attempt:", error)
    }
  }

  /**
   * Check if user account is locked
   */
  async isAccountLocked(email: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from("profiles")
        .select("account_locked_until, failed_login_attempts")
        .eq("email", email.toLowerCase().trim())
        .single()

      if (error || !data) return false

      if (data.account_locked_until) {
        const lockUntil = new Date(data.account_locked_until)
        const now = new Date()
        return lockUntil > now
      }

      return false
    } catch (error) {
      console.error("Error checking account lock status:", error)
      return false
    }
  }

  /**
   * Unlock user account (admin function)
   */
  async unlockAccount(userId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase.rpc("unlock_user_account", {
        p_user_id: userId,
      })

      return !error
    } catch (error) {
      console.error("Error unlocking account:", error)
      return false
    }
  }

  /**
   * Get user security settings
   */
  async getUserSecuritySettings(userId: string): Promise<SecuritySettings | null> {
    try {
      const { data, error } = await this.supabase
        .from("user_security_settings")
        .select("*")
        .eq("user_id", userId)
        .single()

      if (error || !data) return null

      return {
        mfaEnabled: data.mfa_enabled,
        mfaSecret: data.mfa_secret,
        backupCodes: data.backup_codes,
        maxConcurrentSessions: data.max_concurrent_sessions,
        sessionTimeoutMinutes: data.session_timeout_minutes,
        requirePasswordChange: data.require_password_change,
        passwordExpiresAt: data.password_expires_at,
        loginNotifications: data.login_notifications,
        suspiciousActivityAlerts: data.suspicious_activity_alerts,
        allowedIpAddresses: data.allowed_ip_addresses,
      }
    } catch (error) {
      console.error("Error fetching security settings:", error)
      return null
    }
  }

  /**
   * Update user security settings
   */
  async updateSecuritySettings(userId: string, settings: Partial<SecuritySettings>): Promise<boolean> {
    try {
      const updateData: any = {}

      if (settings.mfaEnabled !== undefined) updateData.mfa_enabled = settings.mfaEnabled
      if (settings.mfaSecret !== undefined) updateData.mfa_secret = settings.mfaSecret
      if (settings.backupCodes !== undefined) updateData.backup_codes = settings.backupCodes
      if (settings.maxConcurrentSessions !== undefined)
        updateData.max_concurrent_sessions = settings.maxConcurrentSessions
      if (settings.sessionTimeoutMinutes !== undefined)
        updateData.session_timeout_minutes = settings.sessionTimeoutMinutes
      if (settings.requirePasswordChange !== undefined)
        updateData.require_password_change = settings.requirePasswordChange
      if (settings.passwordExpiresAt !== undefined) updateData.password_expires_at = settings.passwordExpiresAt
      if (settings.loginNotifications !== undefined) updateData.login_notifications = settings.loginNotifications
      if (settings.suspiciousActivityAlerts !== undefined)
        updateData.suspicious_activity_alerts = settings.suspiciousActivityAlerts
      if (settings.allowedIpAddresses !== undefined) updateData.allowed_ip_addresses = settings.allowedIpAddresses

      const { error } = await this.supabase.from("user_security_settings").update(updateData).eq("user_id", userId)

      if (!error) {
        await this.logSecurityEvent("security_settings_updated", "User security settings updated", userId, "low", {
          updated_fields: Object.keys(updateData),
        })
      }

      return !error
    } catch (error) {
      console.error("Error updating security settings:", error)
      return false
    }
  }

  /**
   * Setup MFA for user (calls API endpoint)
   */
  async setupMFA(userId: string, serviceName = "ESGit"): Promise<MFASetup | null> {
    try {
      const response = await fetch("/api/auth/setup-mfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, serviceName }),
      })

      if (!response.ok) {
        throw new Error("Failed to setup MFA")
      }

      return await response.json()
    } catch (error) {
      console.error("Error setting up MFA:", error)
      return null
    }
  }

  /**
   * Verify MFA token and enable MFA
   */
  async verifyAndEnableMFA(userId: string, token: string): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/verify-mfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token, action: "enable" }),
      })

      if (!response.ok) {
        return false
      }

      const result = await response.json()
      return result.success
    } catch (error) {
      console.error("Error verifying and enabling MFA:", error)
      return false
    }
  }

  /**
   * Verify MFA token for login
   */
  async verifyMFAToken(userId: string, token: string): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/verify-mfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token, action: "verify" }),
      })

      if (!response.ok) {
        return false
      }

      const result = await response.json()
      return result.success
    } catch (error) {
      console.error("Error verifying MFA token:", error)
      return false
    }
  }

  /**
   * Disable MFA for user
   */
  async disableMFA(userId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from("user_security_settings")
        .update({
          mfa_enabled: false,
          mfa_secret: null,
          backup_codes: null,
        })
        .eq("user_id", userId)

      if (!error) {
        await this.logSecurityEvent("mfa_disabled", "Multi-factor authentication disabled", userId, "high")
      }

      return !error
    } catch (error) {
      console.error("Error disabling MFA:", error)
      return false
    }
  }

  /**
   * Generate new backup codes
   */
  async generateNewBackupCodes(userId: string): Promise<string[] | null> {
    try {
      const response = await fetch("/api/auth/generate-backup-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        return null
      }

      const result = await response.json()
      return result.backupCodes
    } catch (error) {
      console.error("Error generating backup codes:", error)
      return null
    }
  }

  /**
   * Check for suspicious login activity
   */
  async checkSuspiciousActivity(userId: string): Promise<boolean> {
    try {
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      // Check for multiple failed logins in the last hour
      const { data: recentFailures } = await this.supabase
        .from("user_login_history")
        .select("*")
        .eq("user_id", userId)
        .eq("success", false)
        .gte("login_at", oneHourAgo.toISOString())

      if (recentFailures && recentFailures.length >= 3) {
        await this.logSecurityEvent("suspicious_activity", "Multiple failed login attempts detected", userId, "high", {
          failed_attempts: recentFailures.length,
          timeframe: "1 hour",
        })
        return true
      }

      // Check for logins from multiple IPs in the last day
      const { data: recentLogins } = await this.supabase
        .from("user_login_history")
        .select("ip_address, country, city")
        .eq("user_id", userId)
        .eq("success", true)
        .gte("login_at", oneDayAgo.toISOString())

      if (recentLogins && recentLogins.length > 1) {
        const uniqueIPs = new Set(recentLogins.map((login) => login.ip_address))
        const uniqueCountries = new Set(recentLogins.map((login) => login.country).filter(Boolean))

        if (uniqueIPs.size > 2 || uniqueCountries.size > 1) {
          await this.logSecurityEvent(
            "suspicious_activity",
            "Logins from multiple locations detected",
            userId,
            "medium",
            {
              unique_ips: uniqueIPs.size,
              unique_countries: uniqueCountries.size,
              locations: Array.from(uniqueCountries),
            },
          )
          return true
        }
      }

      // Check for unusual login times (outside normal hours)
      const { data: todayLogins } = await this.supabase
        .from("user_login_history")
        .select("login_at")
        .eq("user_id", userId)
        .eq("success", true)
        .gte("login_at", new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString())

      if (todayLogins && todayLogins.length > 0) {
        const unusualHours = todayLogins.filter((login) => {
          const hour = new Date(login.login_at).getHours()
          return hour < 6 || hour > 22 // Outside 6 AM - 10 PM
        })

        if (unusualHours.length > 0) {
          await this.logSecurityEvent("unusual_activity", "Login during unusual hours detected", userId, "low", {
            unusual_login_count: unusualHours.length,
          })
        }
      }

      return false
    } catch (error) {
      console.error("Error checking suspicious activity:", error)
      return false
    }
  }

  /**
   * Log security event
   */
  async logSecurityEvent(
    eventType: string,
    description: string,
    userId?: string,
    severity: "low" | "medium" | "high" | "critical" = "low",
    metadata?: any,
  ): Promise<void> {
    try {
      await this.supabase.from("audit_logs").insert({
        event_type: eventType,
        event_description: description,
        user_id: userId,
        severity,
        metadata: metadata || {},
      })
    } catch (error) {
      console.error("Error logging security event:", error)
    }
  }

  /**
   * Get login history for a user
   */
  async getLoginHistory(userId: string, limit = 50): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from("user_login_history")
        .select("*")
        .eq("user_id", userId)
        .order("login_at", { ascending: false })
        .limit(limit)

      return data || []
    } catch (error) {
      console.error("Error fetching login history:", error)
      return []
    }
  }

  /**
   * Get security audit logs for a user
   */
  async getSecurityAuditLogs(userId: string, limit = 100): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from("audit_logs")
        .select("*")
        .eq("user_id", userId)
        .in("event_category", ["auth", "security"])
        .order("created_at", { ascending: false })
        .limit(limit)

      return data || []
    } catch (error) {
      console.error("Error fetching audit logs:", error)
      return []
    }
  }

  /**
   * Cleanup expired tokens and sessions
   */
  async cleanupExpiredTokens(): Promise<number> {
    try {
      const { data, error } = await this.supabase.rpc("cleanup_expired_tokens")

      if (error) {
        console.error("Error cleaning up expired tokens:", error)
        return 0
      }

      return data || 0
    } catch (error) {
      console.error("Error cleaning up expired tokens:", error)
      return 0
    }
  }

  /**
   * Get device information from user agent
   */
  getDeviceInfo(userAgent?: string, ipAddress?: string): any {
    if (typeof window === "undefined") {
      return {
        userAgent: userAgent || "Server",
        ipAddress: ipAddress || "127.0.0.1",
        deviceType: "server",
      }
    }

    const ua = userAgent || navigator.userAgent

    return {
      userAgent: ua,
      ipAddress: ipAddress || "0.0.0.0", // This would need to be obtained from the server
      deviceType: this.getDeviceType(ua),
      browser: this.getBrowser(ua),
      os: this.getOS(ua),
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
      },
    }
  }

  // Private helper methods

  private getDeviceType(userAgent: string): string {
    const ua = userAgent.toLowerCase()

    if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
      return "mobile"
    } else if (ua.includes("tablet") || ua.includes("ipad")) {
      return "tablet"
    } else {
      return "desktop"
    }
  }

  private getBrowser(userAgent: string): string {
    const ua = userAgent.toLowerCase()

    if (ua.includes("chrome")) return "Chrome"
    if (ua.includes("firefox")) return "Firefox"
    if (ua.includes("safari")) return "Safari"
    if (ua.includes("edge")) return "Edge"
    if (ua.includes("opera")) return "Opera"

    return "Unknown"
  }

  private getOS(userAgent: string): string {
    const ua = userAgent.toLowerCase()

    if (ua.includes("windows")) return "Windows"
    if (ua.includes("mac")) return "macOS"
    if (ua.includes("linux")) return "Linux"
    if (ua.includes("android")) return "Android"
    if (ua.includes("ios")) return "iOS"

    return "Unknown"
  }
}

// Export singleton instance
export const authUtils = new AuthUtils()
