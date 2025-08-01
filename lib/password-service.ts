export interface PasswordValidation {
  isValid: boolean
  error?: string
  strength: "weak" | "fair" | "good" | "strong"
  score: number
  feedback: string[]
}

export class PasswordService {
  private readonly MIN_LENGTH = 8
  private readonly MAX_LENGTH = 128

  /**
   * Validate password strength and requirements
   */
  validatePassword(password: string): PasswordValidation {
    const feedback: string[] = []
    let score = 0

    // Check length
    if (password.length < this.MIN_LENGTH) {
      feedback.push(`Password must be at least ${this.MIN_LENGTH} characters long`)
      return {
        isValid: false,
        error: feedback[0],
        strength: "weak",
        score: 0,
        feedback,
      }
    }

    if (password.length > this.MAX_LENGTH) {
      feedback.push(`Password must be no more than ${this.MAX_LENGTH} characters long`)
      return {
        isValid: false,
        error: feedback[0],
        strength: "weak",
        score: 0,
        feedback,
      }
    }

    // Check for lowercase letters
    if (!/[a-z]/.test(password)) {
      feedback.push("Add lowercase letters")
    } else {
      score += 1
    }

    // Check for uppercase letters
    if (!/[A-Z]/.test(password)) {
      feedback.push("Add uppercase letters")
    } else {
      score += 1
    }

    // Check for numbers
    if (!/\d/.test(password)) {
      feedback.push("Add numbers")
    } else {
      score += 1
    }

    // Check for special characters
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      feedback.push("Add special characters")
    } else {
      score += 1
    }

    // Check for length bonus
    if (password.length >= 12) {
      score += 1
    }

    // Check for common patterns (reduce score)
    if (this.hasCommonPatterns(password)) {
      feedback.push("Avoid common patterns and dictionary words")
      score = Math.max(0, score - 2)
    }

    // Check for repeated characters
    if (this.hasRepeatedCharacters(password)) {
      feedback.push("Avoid repeated characters")
      score = Math.max(0, score - 1)
    }

    // Check for sequential characters
    if (this.hasSequentialCharacters(password)) {
      feedback.push("Avoid sequential characters")
      score = Math.max(0, score - 1)
    }

    // Determine strength
    let strength: "weak" | "fair" | "good" | "strong"
    if (score >= 4) {
      strength = "strong"
    } else if (score >= 3) {
      strength = "good"
    } else if (score >= 2) {
      strength = "fair"
    } else {
      strength = "weak"
    }

    // Check minimum requirements
    const hasMinRequirements =
      password.length >= this.MIN_LENGTH &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

    if (!hasMinRequirements) {
      return {
        isValid: false,
        error: "Password must contain uppercase, lowercase, numbers, and special characters",
        strength,
        score,
        feedback,
      }
    }

    if (feedback.length === 0) {
      feedback.push("Strong password!")
    }

    return {
      isValid: true,
      strength,
      score,
      feedback,
    }
  }

  /**
   * Generate secure random password (client-side safe)
   */
  generateSecurePassword(length = 16): string {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    const allChars = lowercase + uppercase + numbers + symbols
    let password = ""

    // Ensure at least one character from each category
    password += this.getRandomChar(lowercase)
    password += this.getRandomChar(uppercase)
    password += this.getRandomChar(numbers)
    password += this.getRandomChar(symbols)

    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += this.getRandomChar(allChars)
    }

    // Shuffle the password using array sort with random comparison
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
  }

  /**
   * Check if password has been compromised (basic check)
   */
  async isPasswordCompromised(password: string): Promise<boolean> {
    // In a real implementation, you would check against a database of compromised passwords
    // For now, we'll just check against common passwords
    const commonPasswords = [
      "password",
      "123456",
      "password123",
      "admin",
      "qwerty",
      "letmein",
      "welcome",
      "monkey",
      "1234567890",
      "abc123",
    ]

    return commonPasswords.includes(password.toLowerCase())
  }

  // Private helper methods

  private getRandomChar(chars: string): string {
    // Use Math.random for browser-safe random generation
    return chars.charAt(Math.floor(Math.random() * chars.length))
  }

  private hasCommonPatterns(password: string): boolean {
    const commonPatterns = [
      /password/i,
      /admin/i,
      /user/i,
      /login/i,
      /welcome/i,
      /123456/,
      /qwerty/i,
      /abc123/i,
      /letmein/i,
      /monkey/i,
      /dragon/i,
      /master/i,
      /shadow/i,
      /superman/i,
      /batman/i,
    ]

    return commonPatterns.some((pattern) => pattern.test(password))
  }

  private hasRepeatedCharacters(password: string): boolean {
    // Check for 3 or more repeated characters
    return /(.)\1{2,}/.test(password)
  }

  private hasSequentialCharacters(password: string): boolean {
    // Check for sequential characters like "123", "abc", "qwe"
    const sequences = ["123456789", "abcdefghijklmnopqrstuvwxyz", "qwertyuiop", "asdfghjkl", "zxcvbnm"]

    for (const sequence of sequences) {
      for (let i = 0; i <= sequence.length - 3; i++) {
        const subseq = sequence.substring(i, i + 3)
        if (password.toLowerCase().includes(subseq)) {
          return true
        }
      }
    }

    return false
  }
}
