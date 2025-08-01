import { createSupabaseClient } from "./supabase"
import { AuthUtils } from "./auth-utils"
import { EmailService } from "./email-service"
import { PasswordService } from "./password-service"
import { SessionService } from "./session-service"
import { RoleService } from "./role-service"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "./supabase"

export interface RegisterUserData {
  email: string
  password: string
  fullName: string
  company?: string
  department?: string
  jobTitle?: string
  phoneNumber?: string
  role?: "user" | "hr_manager" | "admin" | "viewer"
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResult {
  success: boolean
  user?: User
  profile?: Profile
  error?: string
  requiresMFA?: boolean
  accountLocked?: boolean
  emailNotVerified?: boolean
}

export interface PasswordResetData {
  email: string
  newPassword: string
  token: string
}

export class AuthService {
  private supabase = createSupabaseClient()
  private authUtils = new AuthUtils()
  private emailService = new EmailService()
  private passwordService = new PasswordService()
  private sessionService = new SessionService()
  private roleService = new RoleService()

  /**
   * Register a new user with comprehensive validation and setup
   */
  async registerUser(userData: RegisterUserData): Promise<LoginResult> {
    try {
      // Validate input data
      const validation = this.validateRegistrationData(userData)
      if (!validation.isValid) {
        return { success: false, error: validation.error }
      }

      // Check if user already exists
      const existingUser = await this.checkUserExists(userData.email)
      if (existingUser) {
        return { success: false, error: "An account with this email already exists" }
      }

      // Validate password strength
      const passwordValidation = this.passwordService.validatePassword(userData.password)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error }
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email: userData.email.toLowerCase().trim(),
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName.trim(),
            company: userData.company?.trim(),
            department: userData.department?.trim(),
            job_title: userData.jobTitle?.trim(),
            phone_number: userData.phoneNumber?.trim(),
            role: userData.role || "user",
          },
          emailRedirectTo: `${window.location.origin}/auth/verify-email`,
        },
      })

      if (authError) {
        await this.authUtils.logSecurityEvent(
          "registration_failed",
          `User registration failed: ${authError.message}`,
          undefined,
          "medium",
          { email: userData.email, error: authError.message },
        )
        return { success: false, error: authError.message }
      }

      if (authData.user) {
        // Send welcome email
        await this.emailService.sendWelcomeEmail(userData.email, userData.fullName)

        // Log successful registration
        await this.authUtils.logSecurityEvent(
          "user_registered",
          "New user account created successfully",
          authData.user.id,
          "low",
          { email: userData.email, role: userData.role || "user" },
        )

        return {
          success: true,
          user: authData.user,
          emailNotVerified: true,
        }
      }

      return { success: false, error: "Failed to create user account" }
    } catch (error: any) {
      console.error("Registration error:", error)
      return { success: false, error: "An unexpected error occurred during registration" }
    }
  }

  /**
   * Authenticate user with comprehensive security checks
   */
  async loginUser(credentials: LoginCredentials, deviceInfo?: any): Promise<LoginResult> {
    try {
      const { email, password, rememberMe } = credentials

      // Validate input
      if (!email || !password) {
        return { success: false, error: "Email and password are required" }
      }

      // Check if account is locked
      const isLocked = await this.authUtils.isAccountLocked(email)
      if (isLocked) {
        await this.authUtils.trackLoginAttempt({
          success: false,
          email,
          failureReason: "Account locked",
          ipAddress: deviceInfo?.ipAddress,
          userAgent: deviceInfo?.userAgent,
        })
        return {
          success: false,
          error: "Account is temporarily locked due to multiple failed login attempts",
          accountLocked: true,
        }
      }

      // Attempt authentication
      const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      })

      if (authError) {
        // Track failed login attempt
        await this.authUtils.trackLoginAttempt({
          success: false,
          email,
          failureReason: authError.message,
          ipAddress: deviceInfo?.ipAddress,
          userAgent: deviceInfo?.userAgent,
        })

        // Check for specific error types
        if (authError.message === "Email not confirmed") {
          return { success: false, error: "Please verify your email address before signing in", emailNotVerified: true }
        }

        if (authError.message === "Invalid login credentials") {
          return { success: false, error: "Invalid email or password" }
        }

        return { success: false, error: authError.message }
      }

      if (authData.user) {
        // Get user profile
        const { data: profile, error: profileError } = await this.supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single()

        if (profileError || !profile) {
          return { success: false, error: "Failed to load user profile" }
        }

        // Check if account is active
        if (!profile.is_active) {
          await this.supabase.auth.signOut()
          return { success: false, error: "Your account has been deactivated. Please contact support." }
        }

        // Check if email is verified
        if (!profile.email_verified) {
          await this.supabase.auth.signOut()
          return { success: false, error: "Please verify your email address before signing in", emailNotVerified: true }
        }

        // Check for MFA requirement
        const securitySettings = await this.authUtils.getUserSecuritySettings(authData.user.id)
        if (securitySettings?.mfaEnabled) {
          // Store temporary session for MFA verification
          await this.sessionService.createTemporarySession(authData.user.id, deviceInfo)
          return { success: false, requiresMFA: true, user: authData.user, profile }
        }

        // Track successful login
        await this.authUtils.trackLoginAttempt({
          success: true,
          userId: authData.user.id,
          email,
          ipAddress: deviceInfo?.ipAddress,
          userAgent: deviceInfo?.userAgent,
        })

        // Create user session
        const sessionToken = await this.sessionService.createSession(
          authData.user.id,
          deviceInfo,
          rememberMe ? 30 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000, // 30 days or 8 hours
        )

        // Check for suspicious activity
        await this.authUtils.checkSuspiciousActivity(authData.user.id)

        // Send login notification if enabled
        if (securitySettings?.loginNotifications) {
          await this.emailService.sendLoginNotification(profile.email, profile.full_name || "User", deviceInfo)
        }

        return {
          success: true,
          user: authData.user,
          profile,
        }
      }

      return { success: false, error: "Authentication failed" }
    } catch (error: any) {
      console.error("Login error:", error)
      return { success: false, error: "An unexpected error occurred during login" }
    }
  }

  /**
   * Verify MFA token and complete login
   */
  async verifyMFA(userId: string, token: string, deviceInfo?: any): Promise<LoginResult> {
    try {
      // Verify MFA token
      const isValidToken = await this.authUtils.verifyMFAToken(userId, token)
      if (!isValidToken) {
        await this.authUtils.logSecurityEvent("mfa_failed", "Invalid MFA token provided", userId, "high", {
          token_length: token.length,
        })
        return { success: false, error: "Invalid MFA token" }
      }

      // Get user profile
      const { data: profile, error: profileError } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (profileError || !profile) {
        return { success: false, error: "Failed to load user profile" }
      }

      // Complete login process
      await this.authUtils.trackLoginAttempt({
        success: true,
        userId,
        email: profile.email,
        ipAddress: deviceInfo?.ipAddress,
        userAgent: deviceInfo?.userAgent,
      })

      // Create session
      const sessionToken = await this.sessionService.createSession(userId, deviceInfo)

      // Log MFA success
      await this.authUtils.logSecurityEvent("mfa_success", "MFA verification successful", userId, "low")

      return {
        success: true,
        profile,
      }
    } catch (error: any) {
      console.error("MFA verification error:", error)
      return { success: false, error: "MFA verification failed" }
    }
  }

  /**
   * Initiate password reset process
   */
  async initiatePasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if user exists
      const { data: profile } = await this.supabase
        .from("profiles")
        .select("id, email, full_name")
        .eq("email", email.toLowerCase().trim())
        .single()

      if (!profile) {
        // Don't reveal if email exists or not for security
        return { success: true }
      }

      // Generate reset token
      const resetToken = await this.passwordService.generateResetToken()
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

      // Store reset token
      const { error: tokenError } = await this.supabase.from("password_reset_tokens").insert({
        user_id: profile.id,
        token: resetToken,
        expires_at: expiresAt.toISOString(),
      })

      if (tokenError) {
        console.error("Error storing reset token:", tokenError)
        return { success: false, error: "Failed to initiate password reset" }
      }

      // Send reset email
      await this.emailService.sendPasswordResetEmail(profile.email, profile.full_name || "User", resetToken)

      // Log password reset request
      await this.authUtils.logSecurityEvent(
        "password_reset_requested",
        "Password reset requested",
        profile.id,
        "medium",
        { email: profile.email },
      )

      return { success: true }
    } catch (error: any) {
      console.error("Password reset initiation error:", error)
      return { success: false, error: "Failed to initiate password reset" }
    }
  }

  /**
   * Complete password reset with token
   */
  async resetPassword(resetData: PasswordResetData): Promise<{ success: boolean; error?: string }> {
    try {
      const { email, newPassword, token } = resetData

      // Validate password
      const passwordValidation = this.passwordService.validatePassword(newPassword)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error }
      }

      // Verify reset token
      const { data: resetToken, error: tokenError } = await this.supabase
        .from("password_reset_tokens")
        .select("*")
        .eq("token", token)
        .eq("used_at", null)
        .gt("expires_at", new Date().toISOString())
        .single()

      if (tokenError || !resetToken) {
        return { success: false, error: "Invalid or expired reset token" }
      }

      // Get user profile
      const { data: profile } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", resetToken.user_id)
        .eq("email", email.toLowerCase().trim())
        .single()

      if (!profile) {
        return { success: false, error: "Invalid reset request" }
      }

      // Update password in Supabase Auth
      const { error: updateError } = await this.supabase.auth.admin.updateUserById(profile.id, {
        password: newPassword,
      })

      if (updateError) {
        return { success: false, error: "Failed to update password" }
      }

      // Mark token as used
      await this.supabase
        .from("password_reset_tokens")
        .update({ used_at: new Date().toISOString() })
        .eq("id", resetToken.id)

      // Update profile
      await this.supabase
        .from("profiles")
        .update({
          password_changed_at: new Date().toISOString(),
          failed_login_attempts: 0,
          account_locked_until: null,
        })
        .eq("id", profile.id)

      // Revoke all existing sessions
      await this.sessionService.revokeAllUserSessions(profile.id)

      // Send confirmation email
      await this.emailService.sendPasswordChangeConfirmation(profile.email, profile.full_name || "User")

      // Log password reset completion
      await this.authUtils.logSecurityEvent(
        "password_reset_completed",
        "Password successfully reset",
        profile.id,
        "medium",
        { email: profile.email },
      )

      return { success: true }
    } catch (error: any) {
      console.error("Password reset error:", error)
      return { success: false, error: "Failed to reset password" }
    }
  }

  /**
   * Verify email address
   */
  async verifyEmail(token: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Find verification token
      const { data: verificationToken, error: tokenError } = await this.supabase
        .from("email_verification_tokens")
        .select("*")
        .eq("token", token)
        .eq("verified_at", null)
        .gt("expires_at", new Date().toISOString())
        .single()

      if (tokenError || !verificationToken) {
        return { success: false, error: "Invalid or expired verification token" }
      }

      // Update profile as verified
      const { error: profileError } = await this.supabase
        .from("profiles")
        .update({
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        })
        .eq("id", verificationToken.user_id)

      if (profileError) {
        return { success: false, error: "Failed to verify email" }
      }

      // Mark token as used
      await this.supabase
        .from("email_verification_tokens")
        .update({ verified_at: new Date().toISOString() })
        .eq("id", verificationToken.id)

      // Log email verification
      await this.authUtils.logSecurityEvent(
        "email_verified",
        "Email address successfully verified",
        verificationToken.user_id,
        "low",
        { email: verificationToken.email },
      )

      return { success: true }
    } catch (error: any) {
      console.error("Email verification error:", error)
      return { success: false, error: "Failed to verify email" }
    }
  }

  /**
   * Logout user and cleanup sessions
   */
  async logoutUser(userId?: string, sessionToken?: string): Promise<void> {
    try {
      // Sign out from Supabase
      await this.supabase.auth.signOut()

      if (userId) {
        // Revoke specific session or all sessions
        if (sessionToken) {
          await this.sessionService.revokeSession(sessionToken)
        } else {
          await this.sessionService.revokeAllUserSessions(userId)
        }

        // Log logout
        await this.authUtils.logSecurityEvent("user_logout", "User logged out", userId, "low")
      }
    } catch (error: any) {
      console.error("Logout error:", error)
    }
  }

  /**
   * Change user password (authenticated)
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate new password
      const passwordValidation = this.passwordService.validatePassword(newPassword)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error }
      }

      // Verify current password by attempting to sign in
      const { data: profile } = await this.supabase.from("profiles").select("email").eq("id", userId).single()

      if (!profile) {
        return { success: false, error: "User not found" }
      }

      const { error: verifyError } = await this.supabase.auth.signInWithPassword({
        email: profile.email,
        password: currentPassword,
      })

      if (verifyError) {
        return { success: false, error: "Current password is incorrect" }
      }

      // Update password
      const { error: updateError } = await this.supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        return { success: false, error: "Failed to update password" }
      }

      // Update profile
      await this.supabase.from("profiles").update({ password_changed_at: new Date().toISOString() }).eq("id", userId)

      // Log password change
      await this.authUtils.logSecurityEvent("password_changed", "User changed their password", userId, "medium")

      return { success: true }
    } catch (error: any) {
      console.error("Password change error:", error)
      return { success: false, error: "Failed to change password" }
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: Partial<Profile>,
  ): Promise<{ success: boolean; error?: string; profile?: Profile }> {
    try {
      // Remove fields that shouldn't be updated directly
      const allowedUpdates = {
        full_name: updates.full_name,
        avatar_url: updates.avatar_url,
        department: updates.department,
        job_title: updates.job_title,
        phone_number: updates.phone_number,
      }

      // Update profile
      const { data: profile, error: updateError } = await this.supabase
        .from("profiles")
        .update({
          ...allowedUpdates,
          updated_at: new Date().toISOString(),
          updated_by: userId,
        })
        .eq("id", userId)
        .select()
        .single()

      if (updateError) {
        return { success: false, error: "Failed to update profile" }
      }

      // Log profile update
      await this.authUtils.logSecurityEvent("profile_updated", "User profile updated", userId, "low", {
        updated_fields: Object.keys(allowedUpdates),
      })

      return { success: true, profile }
    } catch (error: any) {
      console.error("Profile update error:", error)
      return { success: false, error: "Failed to update profile" }
    }
  }

  /**
   * Get user profile with security info
   */
  async getUserProfile(userId: string): Promise<Profile | null> {
    try {
      const { data: profile, error } = await this.supabase.from("profiles").select("*").eq("id", userId).single()

      if (error || !profile) {
        return null
      }

      return profile
    } catch (error: any) {
      console.error("Get profile error:", error)
      return null
    }
  }

  /**
   * Check if user has required role/permission
   */
  async hasPermission(userId: string, permission: string): Promise<boolean> {
    try {
      const profile = await this.getUserProfile(userId)
      if (!profile) return false

      return this.roleService.hasPermission(profile.role, permission)
    } catch (error: any) {
      console.error("Permission check error:", error)
      return false
    }
  }

  /**
   * Get user's active sessions
   */
  async getUserSessions(userId: string): Promise<any[]> {
    try {
      return await this.sessionService.getActiveSessions(userId)
    } catch (error: any) {
      console.error("Get sessions error:", error)
      return []
    }
  }

  // Private helper methods

  private validateRegistrationData(data: RegisterUserData): { isValid: boolean; error?: string } {
    if (!data.email || !data.password || !data.fullName) {
      return { isValid: false, error: "Email, password, and full name are required" }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { isValid: false, error: "Please enter a valid email address" }
    }

    if (data.fullName.trim().length < 2) {
      return { isValid: false, error: "Full name must be at least 2 characters long" }
    }

    return { isValid: true }
  }

  private async checkUserExists(email: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .single()

      return !error && !!data
    } catch {
      return false
    }
  }
}

// Export singleton instance
export const authService = new AuthService()
