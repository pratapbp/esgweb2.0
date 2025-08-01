"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart3, FileText, Calendar, Settings, User, Bell, Bookmark, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "My Applications",
    href: "/dashboard/applications",
    icon: FileText,
    badge: "3",
  },
  {
    title: "Saved Jobs",
    href: "/dashboard/saved-jobs",
    icon: Bookmark,
  },
  {
    title: "Interviews",
    href: "/dashboard/interviews",
    icon: Calendar,
    badge: "1",
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: Download,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: "2",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-background border-r border-border/50 overflow-y-auto">
      <div className="p-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.title}
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start h-10", isActive && "bg-primary/10 text-primary")}
                asChild
              >
                <Link href={item.href} className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            )
          })}
        </div>

        <Separator className="my-6" />

        <div className="space-y-2">
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
          </div>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/careers">
              <FileText className="h-4 w-4 mr-3" />
              Browse Jobs
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/lca-postings">
              <FileText className="h-4 w-4 mr-3" />
              LCA Postings
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}
