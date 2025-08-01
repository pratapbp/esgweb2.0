export interface UserSession {
  id: string
  userId: string
  deviceInfo: any
  ipAddress: string
  userAgent: string
  createdAt: string
  lastAccessedAt: string
  expiresAt: string
  isActive: boolean
}

export class SessionService {
  private readonly MAX_SESSIONS_PER_USER = 5
  private readonly SESSION_TIMEOUT_MINUTES = 30

  /**
   * Create a new user session
   */
  async createSession(userId: string, deviceInfo: any, ipAddress: string, userAgent: string): Promise<string> {
    try {
      // Generate session ID using browser-safe method
      const sessionId = this.generateSessionId()

      const now = new Date()
      const expiresAt = new Date(now.getTime() + this.SESSION_TIMEOUT_MINUTES * 60 * 1000)

      // In a real implementation, you would store this in the database
      const session: UserSession = {
        id: sessionId,
        userId,
        deviceInfo,
        ipAddress,
        userAgent,
        createdAt: now.toISOString(),
        lastAccessedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        isActive: true,
      }

      // Store session (mock implementation)
      if (typeof window !== "undefined") {
        localStorage.setItem(`session_${sessionId}`, JSON.stringify(session))
      }

      return sessionId
    } catch (error) {
      console.error("Error creating session:", error)
      throw new Error("Failed to create session")
    }
  }

  /**
   * Validate and refresh session
   */
  async validateSession(sessionId: string): Promise<UserSession | null> {
    try {
      // In a real implementation, you would fetch from database
      if (typeof window !== "undefined") {
        const sessionData = localStorage.getItem(`session_${sessionId}`)
        if (!sessionData) return null

        const session: UserSession = JSON.parse(sessionData)

        // Check if session is expired
        if (new Date() > new Date(session.expiresAt)) {
          await this.destroySession(sessionId)
          return null
        }

        // Update last accessed time
        session.lastAccessedAt = new Date().toISOString()
        localStorage.setItem(`session_${sessionId}`, JSON.stringify(session))

        return session
      }

      return null
    } catch (error) {
      console.error("Error validating session:", error)
      return null
    }
  }

  /**
   * Destroy a session
   */
  async destroySession(sessionId: string): Promise<boolean> {
    try {
      // In a real implementation, you would update the database
      if (typeof window !== "undefined") {
        localStorage.removeItem(`session_${sessionId}`)
      }

      return true
    } catch (error) {
      console.error("Error destroying session:", error)
      return false
    }
  }

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId: string): Promise<UserSession[]> {
    try {
      // In a real implementation, you would fetch from database
      const sessions: UserSession[] = []

      if (typeof window !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && key.startsWith("session_")) {
            const sessionData = localStorage.getItem(key)
            if (sessionData) {
              const session: UserSession = JSON.parse(sessionData)
              if (session.userId === userId && session.isActive) {
                sessions.push(session)
              }
            }
          }
        }
      }

      return sessions
    } catch (error) {
      console.error("Error fetching user sessions:", error)
      return []
    }
  }

  /**
   * Cleanup expired sessions
   */
  async cleanupExpiredSessions(): Promise<number> {
    try {
      let cleanedCount = 0
      const now = new Date()

      if (typeof window !== "undefined") {
        const keysToRemove: string[] = []

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && key.startsWith("session_")) {
            const sessionData = localStorage.getItem(key)
            if (sessionData) {
              const session: UserSession = JSON.parse(sessionData)
              if (now > new Date(session.expiresAt)) {
                keysToRemove.push(key)
              }
            }
          }
        }

        keysToRemove.forEach((key) => {
          localStorage.removeItem(key)
          cleanedCount++
        })
      }

      return cleanedCount
    } catch (error) {
      console.error("Error cleaning up expired sessions:", error)
      return 0
    }
  }

  /**
   * Enforce session limits per user
   */
  async enforceSessionLimits(userId: string): Promise<void> {
    try {
      const sessions = await this.getUserSessions(userId)

      if (sessions.length > this.MAX_SESSIONS_PER_USER) {
        // Sort by last accessed time and remove oldest sessions
        sessions.sort((a, b) => new Date(a.lastAccessedAt).getTime() - new Date(b.lastAccessedAt).getTime())

        const sessionsToRemove = sessions.slice(0, sessions.length - this.MAX_SESSIONS_PER_USER)

        for (const session of sessionsToRemove) {
          await this.destroySession(session.id)
        }
      }
    } catch (error) {
      console.error("Error enforcing session limits:", error)
    }
  }

  // Private helper methods

  private generateSessionId(): string {
    // Use browser-safe random generation
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(32)
      window.crypto.getRandomValues(array)
      return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
    }

    // Fallback to Math.random (less secure but works everywhere)
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}
