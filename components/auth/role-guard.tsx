"use client"

import type React from "react"
import { useAuth } from "./auth-provider"
import { roleService } from "@/lib/role-service"
import type { UserRole } from "@/lib/role-service"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requiredPermission?: string
  fallback?: React.ReactNode
  requireAll?: boolean // If true, user must have ALL permissions, if false, user needs ANY permission
}

export function RoleGuard({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null,
  requireAll = false,
}: RoleGuardProps) {
  const { profile } = useAuth()

  if (!profile) {
    return <>{fallback}</>
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.includes(profile.role)
    if (!hasAllowedRole) {
      return <>{fallback}</>
    }
  }

  // Check permission-based access
  if (requiredPermission) {
    const permissions = Array.isArray(requiredPermission) ? requiredPermission : [requiredPermission]

    const hasPermission = requireAll
      ? roleService.hasAllPermissions(profile.role, permissions)
      : roleService.hasAnyPermission(profile.role, permissions)

    if (!hasPermission) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}
