export type UserRole = "admin" | "hr_manager" | "user" | "viewer"

export interface Permission {
  name: string
  description: string
  category: string
}

export interface RoleDefinition {
  name: UserRole
  displayName: string
  description: string
  permissions: string[]
  inherits?: UserRole[]
}

export class RoleService {
  private permissions: Permission[] = [
    // User Management
    { name: "users.view", description: "View user profiles", category: "users" },
    { name: "users.create", description: "Create new users", category: "users" },
    { name: "users.edit", description: "Edit user profiles", category: "users" },
    { name: "users.delete", description: "Delete users", category: "users" },
    { name: "users.manage_roles", description: "Manage user roles", category: "users" },

    // LCA Management
    { name: "lca.view", description: "View LCA postings", category: "lca" },
    { name: "lca.create", description: "Create LCA postings", category: "lca" },
    { name: "lca.edit", description: "Edit LCA postings", category: "lca" },
    { name: "lca.delete", description: "Delete LCA postings", category: "lca" },
    { name: "lca.approve", description: "Approve LCA postings", category: "lca" },
    { name: "lca.publish", description: "Publish LCA postings", category: "lca" },

    // Analytics & Reporting
    { name: "analytics.view", description: "View analytics dashboard", category: "analytics" },
    { name: "analytics.export", description: "Export analytics data", category: "analytics" },
    { name: "reports.generate", description: "Generate reports", category: "reports" },
    { name: "reports.schedule", description: "Schedule automated reports", category: "reports" },

    // System Administration
    { name: "system.settings", description: "Manage system settings", category: "system" },
    { name: "system.audit", description: "View audit logs", category: "system" },
    { name: "system.backup", description: "Manage system backups", category: "system" },
    { name: "system.maintenance", description: "Perform system maintenance", category: "system" },

    // Security
    { name: "security.view_logs", description: "View security logs", category: "security" },
    { name: "security.manage_sessions", description: "Manage user sessions", category: "security" },
    { name: "security.unlock_accounts", description: "Unlock user accounts", category: "security" },

    // Profile Management
    { name: "profile.view_own", description: "View own profile", category: "profile" },
    { name: "profile.edit_own", description: "Edit own profile", category: "profile" },
    { name: "profile.view_others", description: "View other profiles", category: "profile" },
    { name: "profile.edit_others", description: "Edit other profiles", category: "profile" },

    // Dashboard
    { name: "dashboard.view", description: "Access dashboard", category: "dashboard" },
    { name: "dashboard.customize", description: "Customize dashboard", category: "dashboard" },
  ]

  private roles: RoleDefinition[] = [
    {
      name: "viewer",
      displayName: "Viewer",
      description: "Read-only access to basic information",
      permissions: ["profile.view_own", "dashboard.view", "lca.view"],
    },
    {
      name: "user",
      displayName: "User",
      description: "Standard user with basic functionality",
      permissions: [
        "profile.view_own",
        "profile.edit_own",
        "dashboard.view",
        "dashboard.customize",
        "lca.view",
        "analytics.view",
      ],
      inherits: ["viewer"],
    },
    {
      name: "hr_manager",
      displayName: "HR Manager",
      description: "HR staff with user and LCA management capabilities",
      permissions: [
        "users.view",
        "users.create",
        "users.edit",
        "profile.view_others",
        "profile.edit_others",
        "lca.create",
        "lca.edit",
        "lca.approve",
        "lca.publish",
        "analytics.export",
        "reports.generate",
      ],
      inherits: ["user"],
    },
    {
      name: "admin",
      displayName: "Administrator",
      description: "Full system access and administrative capabilities",
      permissions: [
        "users.delete",
        "users.manage_roles",
        "lca.delete",
        "system.settings",
        "system.audit",
        "system.backup",
        "system.maintenance",
        "security.view_logs",
        "security.manage_sessions",
        "security.unlock_accounts",
        "reports.schedule",
      ],
      inherits: ["hr_manager"],
    },
  ]

  /**
   * Get all available permissions
   */
  getAllPermissions(): Permission[] {
    return this.permissions
  }

  /**
   * Get permissions by category
   */
  getPermissionsByCategory(category: string): Permission[] {
    return this.permissions.filter((p) => p.category === category)
  }

  /**
   * Get all available roles
   */
  getAllRoles(): RoleDefinition[] {
    return this.roles
  }

  /**
   * Get role definition by name
   */
  getRole(roleName: UserRole): RoleDefinition | null {
    return this.roles.find((role) => role.name === roleName) || null
  }

  /**
   * Get all permissions for a role (including inherited)
   */
  getRolePermissions(roleName: UserRole): string[] {
    const role = this.getRole(roleName)
    if (!role) return []

    let permissions = [...role.permissions]

    // Add inherited permissions
    if (role.inherits) {
      for (const inheritedRole of role.inherits) {
        const inheritedPermissions = this.getRolePermissions(inheritedRole)
        permissions = [...permissions, ...inheritedPermissions]
      }
    }

    // Remove duplicates
    return [...new Set(permissions)]
  }

  /**
   * Check if a role has a specific permission
   */
  hasPermission(roleName: UserRole, permission: string): boolean {
    const rolePermissions = this.getRolePermissions(roleName)
    return rolePermissions.includes(permission)
  }

  /**
   * Check if a role has any of the specified permissions
   */
  hasAnyPermission(roleName: UserRole, permissions: string[]): boolean {
    return permissions.some((permission) => this.hasPermission(roleName, permission))
  }

  /**
   * Check if a role has all of the specified permissions
   */
  hasAllPermissions(roleName: UserRole, permissions: string[]): boolean {
    return permissions.every((permission) => this.hasPermission(roleName, permission))
  }

  /**
   * Get role hierarchy level (higher number = more permissions)
   */
  getRoleLevel(roleName: UserRole): number {
    const levels = {
      viewer: 1,
      user: 2,
      hr_manager: 3,
      admin: 4,
    }
    return levels[roleName] || 0
  }

  /**
   * Check if one role is higher than another
   */
  isRoleHigher(role1: UserRole, role2: UserRole): boolean {
    return this.getRoleLevel(role1) > this.getRoleLevel(role2)
  }

  /**
   * Get roles that a user can assign (same level or lower)
   */
  getAssignableRoles(currentUserRole: UserRole): UserRole[] {
    const currentLevel = this.getRoleLevel(currentUserRole)
    return this.roles.filter((role) => this.getRoleLevel(role.name) <= currentLevel).map((role) => role.name)
  }

  /**
   * Validate role assignment
   */
  canAssignRole(assignerRole: UserRole, targetRole: UserRole): boolean {
    // Admins can assign any role
    if (assignerRole === "admin") return true

    // HR managers can assign user and viewer roles
    if (assignerRole === "hr_manager") {
      return ["user", "viewer"].includes(targetRole)
    }

    // Users and viewers cannot assign roles
    return false
  }

  /**
   * Get permission categories
   */
  getPermissionCategories(): string[] {
    const categories = new Set(this.permissions.map((p) => p.category))
    return Array.from(categories).sort()
  }

  /**
   * Get role display information
   */
  getRoleDisplayInfo(
    roleName: UserRole,
  ): { name: string; displayName: string; description: string; level: number } | null {
    const role = this.getRole(roleName)
    if (!role) return null

    return {
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      level: this.getRoleLevel(roleName),
    }
  }

  /**
   * Check if user can access a specific route based on role
   */
  canAccessRoute(roleName: UserRole, route: string): boolean {
    const routePermissions: Record<string, string[]> = {
      "/admin": ["system.settings"],
      "/admin/users": ["users.view"],
      "/admin/lca-postings": ["lca.view", "lca.edit"],
      "/admin/analytics": ["analytics.view"],
      "/admin/audit": ["system.audit"],
      "/dashboard": ["dashboard.view"],
      "/dashboard/analytics": ["analytics.view"],
      "/lca-postings": ["lca.view"],
      "/profile": ["profile.view_own"],
    }

    const requiredPermissions = routePermissions[route]
    if (!requiredPermissions) return true // No specific permissions required

    return this.hasAnyPermission(roleName, requiredPermissions)
  }

  /**
   * Get menu items based on role permissions
   */
  getAuthorizedMenuItems(roleName: UserRole): any[] {
    const allMenuItems = [
      {
        name: "Dashboard",
        path: "/dashboard",
        permission: "dashboard.view",
        icon: "BarChart3",
      },
      {
        name: "LCA Postings",
        path: "/lca-postings",
        permission: "lca.view",
        icon: "FileText",
      },
      {
        name: "Analytics",
        path: "/dashboard/analytics",
        permission: "analytics.view",
        icon: "TrendingUp",
      },
      {
        name: "User Management",
        path: "/admin/users",
        permission: "users.view",
        icon: "Users",
      },
      {
        name: "System Settings",
        path: "/admin/settings",
        permission: "system.settings",
        icon: "Settings",
      },
      {
        name: "Audit Logs",
        path: "/admin/audit",
        permission: "system.audit",
        icon: "Shield",
      },
    ]

    return allMenuItems.filter((item) => this.hasPermission(roleName, item.permission))
  }
}

// Export singleton instance
export const roleService = new RoleService()
