import { createSupabaseClient } from "./supabase"

export interface EmailTemplate {
  subject: string
  htmlContent: string
  textContent: string
}

export class EmailService {
  private supabase = createSupabaseClient()
  private baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(email: string, fullName: string): Promise<void> {
    try {
      const template = this.getWelcomeEmailTemplate(fullName)
      await this.sendEmail(email, template.subject, template.htmlContent, template.textContent)
    } catch (error) {
      console.error("Error sending welcome email:", error)
    }
  }

  /**
   * Send email verification email
   */
  async sendEmailVerification(email: string, fullName: string, verificationToken: string): Promise<void> {
    try {
      const template = this.getEmailVerificationTemplate(fullName, verificationToken)
      await this.sendEmail(email, template.subject, template.htmlContent, template.textContent)
    } catch (error) {
      console.error("Error sending verification email:", error)
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, fullName: string, resetToken: string): Promise<void> {
    try {
      const template = this.getPasswordResetTemplate(fullName, resetToken)
      await this.sendEmail(email, template.subject, template.htmlContent, template.textContent)
    } catch (error) {
      console.error("Error sending password reset email:", error)
    }
  }

  /**
   * Send password change confirmation email
   */
  async sendPasswordChangeConfirmation(email: string, fullName: string): Promise<void> {
    try {
      const template = this.getPasswordChangeConfirmationTemplate(fullName)
      await this.sendEmail(email, template.subject, template.htmlContent, template.textContent)
    } catch (error) {
      console.error("Error sending password change confirmation:", error)
    }
  }

  /**
   * Send login notification email
   */
  async sendLoginNotification(email: string, fullName: string, deviceInfo?: any): Promise<void> {
    try {
      const template = this.getLoginNotificationTemplate(fullName, deviceInfo)
      await this.sendEmail(email, template.subject, template.htmlContent, template.textContent)
    } catch (error) {
      console.error("Error sending login notification:", error)
    }
  }

  /**
   * Send security alert email
   */
  async sendSecurityAlert(email: string, fullName: string, alertType: string, details: any): Promise<void> {
    try {
      const template = this.getSecurityAlertTemplate(fullName, alertType, details)
      await this.sendEmail(email, template.subject, template.htmlContent, template.textContent)
    } catch (error) {
      console.error("Error sending security alert:", error)
    }
  }

  /**
   * Send account locked notification
   */
  async sendAccountLockedNotification(email: string, fullName: string, lockReason: string): Promise<void> {
    try {
      const template = this.getAccountLockedTemplate(fullName, lockReason)
      await this.sendEmail(email, template.subject, template.htmlContent, template.textContent)
    } catch (error) {
      console.error("Error sending account locked notification:", error)
    }
  }

  // Private methods for sending emails

  private async sendEmail(to: string, subject: string, htmlContent: string, textContent: string): Promise<void> {
    // In a real implementation, you would integrate with an email service like:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Resend
    // - Postmark

    // For now, we'll log the email (in development) or use a mock service
    if (process.env.NODE_ENV === "development") {
      console.log("📧 Email would be sent:")
      console.log("To:", to)
      console.log("Subject:", subject)
      console.log("Content:", textContent)
      return
    }

    // For production, you would implement actual email sending
    // Example with a hypothetical email service:
    /*
    const emailService = new EmailServiceProvider({
      apiKey: process.env.EMAIL_API_KEY,
      from: process.env.FROM_EMAIL || "noreply@esgit.com"
    })

    await emailService.send({
      to,
      subject,
      html: htmlContent,
      text: textContent
    })
    */

    // Log email sending for audit purposes
    await this.supabase.from("audit_logs").insert({
      event_type: "email_sent",
      event_description: `Email sent: ${subject}`,
      severity: "low",
      metadata: { to, subject, type: "notification" },
    })
  }

  // Email template methods

  private getWelcomeEmailTemplate(fullName: string): EmailTemplate {
    const subject = "Welcome to ESGit - Your Account is Ready!"

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to ESGit</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ESGit!</h1>
              <p>Your AI-powered enterprise solutions platform</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>Welcome to ESGit! We're excited to have you join our platform for AI-powered enterprise solutions and digital transformation.</p>
              
              <p>Your account has been successfully created. Here's what you can do next:</p>
              <ul>
                <li>Complete your profile setup</li>
                <li>Explore our AI-powered dashboard</li>
                <li>Access LCA management tools</li>
                <li>Connect with your team</li>
              </ul>
              
              <a href="${this.baseUrl}/dashboard" class="button">Get Started</a>
              
              <p>If you have any questions or need assistance, our support team is here to help.</p>
              
              <p>Best regards,<br>The ESGit Team</p>
            </div>
            <div class="footer">
              <p>© 2024 ESGit. All rights reserved.</p>
              <p>This email was sent to ${fullName}. If you didn't create an account, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
      Welcome to ESGit!
      
      Hello ${fullName},
      
      Welcome to ESGit! We're excited to have you join our platform for AI-powered enterprise solutions and digital transformation.
      
      Your account has been successfully created. Here's what you can do next:
      - Complete your profile setup
      - Explore our AI-powered dashboard
      - Access LCA management tools
      - Connect with your team
      
      Get started: ${this.baseUrl}/dashboard
      
      If you have any questions or need assistance, our support team is here to help.
      
      Best regards,
      The ESGit Team
      
      © 2024 ESGit. All rights reserved.
      This email was sent to ${fullName}. If you didn't create an account, please ignore this email.
    `

    return { subject, htmlContent, textContent }
  }

  private getEmailVerificationTemplate(fullName: string, verificationToken: string): EmailTemplate {
    const subject = "Verify Your ESGit Email Address"
    const verificationUrl = `${this.baseUrl}/auth/verify-email?token=${verificationToken}`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Email</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Your Email</h1>
              <p>Complete your ESGit account setup</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>Thank you for creating an ESGit account! To complete your registration and secure your account, please verify your email address.</p>
              
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              
              <div class="warning">
                <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px;">${verificationUrl}</p>
              
              <p>If you didn't create an ESGit account, you can safely ignore this email.</p>
              
              <p>Best regards,<br>The ESGit Team</p>
            </div>
            <div class="footer">
              <p>© 2024 ESGit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
      Verify Your ESGit Email Address
      
      Hello ${fullName},
      
      Thank you for creating an ESGit account! To complete your registration and secure your account, please verify your email address.
      
      Click here to verify: ${verificationUrl}
      
      Important: This verification link will expire in 24 hours for security reasons.
      
      If you didn't create an ESGit account, you can safely ignore this email.
      
      Best regards,
      The ESGit Team
      
      © 2024 ESGit. All rights reserved.
    `

    return { subject, htmlContent, textContent }
  }

  private getPasswordResetTemplate(fullName: string, resetToken: string): EmailTemplate {
    const subject = "Reset Your ESGit Password"
    const resetUrl = `${this.baseUrl}/auth/reset-password?token=${resetToken}`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
              <p>Secure your ESGit account</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>We received a request to reset your ESGit account password. If you made this request, click the button below to create a new password.</p>
              
              <a href="${resetUrl}" class="button">Reset Password</a>
              
              <div class="warning">
                <strong>Security Notice:</strong> This reset link will expire in 1 hour for your security.
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px;">${resetUrl}</p>
              
              <p><strong>If you didn't request this password reset:</strong></p>
              <ul>
                <li>You can safely ignore this email</li>
                <li>Your password will remain unchanged</li>
                <li>Consider changing your password if you suspect unauthorized access</li>
              </ul>
              
              <p>Best regards,<br>The ESGit Security Team</p>
            </div>
            <div class="footer">
              <p>© 2024 ESGit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
      Password Reset Request
      
      Hello ${fullName},
      
      We received a request to reset your ESGit account password. If you made this request, click the link below to create a new password.
      
      Reset your password: ${resetUrl}
      
      Security Notice: This reset link will expire in 1 hour for your security.
      
      If you didn't request this password reset:
      - You can safely ignore this email
      - Your password will remain unchanged
      - Consider changing your password if you suspect unauthorized access
      
      Best regards,
      The ESGit Security Team
      
      © 2024 ESGit. All rights reserved.
    `

    return { subject, htmlContent, textContent }
  }

  private getPasswordChangeConfirmationTemplate(fullName: string): EmailTemplate {
    const subject = "Your ESGit Password Has Been Changed"

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Password Changed</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .alert { background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Changed Successfully</h1>
              <p>Your ESGit account is secure</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>This email confirms that your ESGit account password was successfully changed on ${new Date().toLocaleString()}.</p>
              
              <div class="alert">
                <strong>What this means:</strong>
                <ul>
                  <li>Your account is now secured with your new password</li>
                  <li>All existing sessions have been logged out for security</li>
                  <li>You'll need to sign in again with your new password</li>
                </ul>
              </div>
              
              <p><strong>If you didn't make this change:</strong></p>
              <ul>
                <li>Your account may have been compromised</li>
                <li>Contact our security team immediately</li>
                <li>We recommend changing your password again</li>
              </ul>
              
              <a href="${this.baseUrl}/contact" class="button">Contact Security Team</a>
              
              <p>For your security, we recommend:</p>
              <ul>
                <li>Using a unique, strong password</li>
                <li>Enabling two-factor authentication</li>
                <li>Regularly reviewing your account activity</li>
              </ul>
              
              <p>Best regards,<br>The ESGit Security Team</p>
            </div>
            <div class="footer">
              <p>© 2024 ESGit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
      Password Changed Successfully
      
      Hello ${fullName},
      
      This email confirms that your ESGit account password was successfully changed on ${new Date().toLocaleString()}.
      
      What this means:
      - Your account is now secured with your new password
      - All existing sessions have been logged out for security
      - You'll need to sign in again with your new password
      
      If you didn't make this change:
      - Your account may have been compromised
      - Contact our security team immediately: ${this.baseUrl}/contact
      - We recommend changing your password again
      
      For your security, we recommend:
      - Using a unique, strong password
      - Enabling two-factor authentication
      - Regularly reviewing your account activity
      
      Best regards,
      The ESGit Security Team
      
      © 2024 ESGit. All rights reserved.
    `

    return { subject, htmlContent, textContent }
  }

  private getLoginNotificationTemplate(fullName: string, deviceInfo?: any): EmailTemplate {
    const subject = "New Sign-in to Your ESGit Account"
    const timestamp = new Date().toLocaleString()
    const device = deviceInfo?.deviceType || "Unknown device"
    const browser = deviceInfo?.browser || "Unknown browser"
    const location = deviceInfo?.location || "Unknown location"

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Sign-in Alert</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .info-box { background: #e7f3ff; border: 1px solid #b8daff; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Sign-in Alert</h1>
              <p>Account security notification</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>We detected a new sign-in to your ESGit account. Here are the details:</p>
              
              <div class="info-box">
                <strong>Sign-in Details:</strong>
                <ul>
                  <li><strong>Time:</strong> ${timestamp}</li>
                  <li><strong>Device:</strong> ${device}</li>
                  <li><strong>Browser:</strong> ${browser}</li>
                  <li><strong>Location:</strong> ${location}</li>
                </ul>
              </div>
              
              <p><strong>If this was you:</strong></p>
              <ul>
                <li>No action is required</li>
                <li>You can safely ignore this email</li>
              </ul>
              
              <p><strong>If this wasn't you:</strong></p>
              <ul>
                <li>Change your password immediately</li>
                <li>Review your account activity</li>
                <li>Contact our security team</li>
              </ul>
              
              <a href="${this.baseUrl}/auth/change-password" class="button">Change Password</a>
              
              <p>You can manage your security settings and view all active sessions in your account dashboard.</p>
              
              <p>Best regards,<br>The ESGit Security Team</p>
            </div>
            <div class="footer">
              <p>© 2024 ESGit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
      New Sign-in Alert
      
      Hello ${fullName},
      
      We detected a new sign-in to your ESGit account. Here are the details:
      
      Sign-in Details:
      - Time: ${timestamp}
      - Device: ${device}
      - Browser: ${browser}
      - Location: ${location}
      
      If this was you:
      - No action is required
      - You can safely ignore this email
      
      If this wasn't you:
      - Change your password immediately: ${this.baseUrl}/auth/change-password
      - Review your account activity
      - Contact our security team: ${this.baseUrl}/contact
      
      You can manage your security settings and view all active sessions in your account dashboard.
      
      Best regards,
      The ESGit Security Team
      
      © 2024 ESGit. All rights reserved.
    `

    return { subject, htmlContent, textContent }
  }

  private getSecurityAlertTemplate(fullName: string, alertType: string, details: any): EmailTemplate {
    const subject = `Security Alert: ${alertType} - ESGit Account`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Security Alert</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .alert { background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 Security Alert</h1>
              <p>Immediate attention required</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>We detected suspicious activity on your ESGit account that requires your immediate attention.</p>
              
              <div class="alert">
                <strong>Alert Type:</strong> ${alertType}<br>
                <strong>Time:</strong> ${new Date().toLocaleString()}<br>
                <strong>Details:</strong> ${JSON.stringify(details, null, 2)}
              </div>
              
              <p><strong>Recommended Actions:</strong></p>
              <ul>
                <li>Change your password immediately</li>
                <li>Review your recent account activity</li>
                <li>Check your active sessions</li>
                <li>Enable two-factor authentication if not already enabled</li>
              </ul>
              
              <a href="${this.baseUrl}/dashboard/security" class="button">Review Security Settings</a>
              
              <p>If you need assistance, please contact our security team immediately.</p>
              
              <p>Best regards,<br>The ESGit Security Team</p>
            </div>
            <div class="footer">
              <p>© 2024 ESGit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
      🚨 Security Alert - Immediate Attention Required
      
      Hello ${fullName},
      
      We detected suspicious activity on your ESGit account that requires your immediate attention.
      
      Alert Type: ${alertType}
      Time: ${new Date().toLocaleString()}
      Details: ${JSON.stringify(details, null, 2)}
      
      Recommended Actions:
      - Change your password immediately
      - Review your recent account activity
      - Check your active sessions
      - Enable two-factor authentication if not already enabled
      
      Review Security Settings: ${this.baseUrl}/dashboard/security
      
      If you need assistance, please contact our security team immediately.
      
      Best regards,
      The ESGit Security Team
      
      © 2024 ESGit. All rights reserved.
    `

    return { subject, htmlContent, textContent }
  }

  private getAccountLockedTemplate(fullName: string, lockReason: string): EmailTemplate {
    const subject = "Your ESGit Account Has Been Locked"

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Account Locked</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Account Locked</h1>
              <p>Security protection activated</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>Your ESGit account has been temporarily locked for security reasons.</p>
              
              <div class="warning">
                <strong>Reason:</strong> ${lockReason}<br>
                <strong>Time:</strong> ${new Date().toLocaleString()}
              </div>
              
              <p><strong>What this means:</strong></p>
              <ul>
                <li>You cannot sign in to your account</li>
                <li>This is a temporary security measure</li>
                <li>Your account data remains safe and secure</li>
              </ul>
              
              <p><strong>How to regain access:</strong></p>
              <ul>
                <li>Wait 30 minutes for automatic unlock (for failed login attempts)</li>
                <li>Contact our support team for immediate assistance</li>
                <li>Verify your identity through our security process</li>
              </ul>
              
              <a href="${this.baseUrl}/contact" class="button">Contact Support</a>
              
              <p>We apologize for any inconvenience. This measure helps protect your account from unauthorized access.</p>
              
              <p>Best regards,<br>The ESGit Security Team</p>
            </div>
            <div class="footer">
              <p>© 2024 ESGit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
      Account Locked - Security Protection Activated
      
      Hello ${fullName},
      
      Your ESGit account has been temporarily locked for security reasons.
      
      Reason: ${lockReason}
      Time: ${new Date().toLocaleString()}
      
      What this means:
      - You cannot sign in to your account
      - This is a temporary security measure
      - Your account data remains safe and secure
      
      How to regain access:
      - Wait 30 minutes for automatic unlock (for failed login attempts)
      - Contact our support team for immediate assistance: ${this.baseUrl}/contact
      - Verify your identity through our security process
      
      We apologize for any inconvenience. This measure helps protect your account from unauthorized access.
      
      Best regards,
      The ESGit Security Team
      
      © 2024 ESGit. All rights reserved.
    `

    return { subject, htmlContent, textContent }
  }
}
