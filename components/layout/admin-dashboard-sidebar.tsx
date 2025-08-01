"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Settings,
  BarChart3,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Building,
  Globe,
  Database,
  Mail,
  Calendar,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Download,
  Eye,
  Plus,
  Filter,
  RefreshCw,
  Activity,
  Server,
  Lock,
  Key,
  Zap,
  TrendingUp,
  PieChart,
  BarChart,
  LineChart,
} from "lucide-react"

interface NavigationItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavigationItem[]
  isExpanded?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: "Live",
  },
  {
    title: "Jobs Management",
    icon: FileText,
    badge: 24,
    children: [
      {
        title: "All Jobs",
        href: "/dashboard/jobs",
        icon: FileText,
        badge: 24,
      },
      {
        title: "Create Job",
        href: "/dashboard/jobs/create",
        icon: Plus,
      },
      {
        title: "Job Categories",
        href: "/dashboard/jobs/categories",
        icon: Filter,
      },
      {
        title: "Archived Jobs",
        href: "/dashboard/jobs/archived",
        icon: Database,
        badge: 12,
      },
    ],
  },
  {
    title: "Applications",
    icon: Users,
    badge: 156,
    children: [
      {
        title: "All Applications",
        href: "/dashboard/applications",
        icon: Users,
        badge: 156,
      },
      {
        title: "New Applications",
        href: "/dashboard/applications/new",
        icon: Bell,
        badge: 12,
      },
      {
        title: "In Review",
        href: "/dashboard/applications/review",
        icon: Eye,
        badge: 23,
      },
      {
        title: "Interviews",
        href: "/dashboard/applications/interviews",
        icon: Calendar,
        badge: 8,
      },
      {
        title: "Approved",
        href: "/dashboard/applications/approved",
        icon: CheckCircle,
        badge: 45,
      },
      {
        title: "Rejected",
        href: "/dashboard/applications/rejected",
        icon: AlertTriangle,
        badge: 68,
      },
    ],
  },
  {
    title: "LCA Postings",
    icon: Shield,
    badge: 8,
    children: [
      {
        title: "All LCA Postings",
        href: "/dashboard/lca-postings",
        icon: Shield,
        badge: 8,
      },
      {
        title: "Upload LCA",
        href: "/dashboard/lca-postings/upload",
        icon: Upload,
      },
      {
        title: "Certified LCAs",
        href: "/dashboard/lca-postings/certified",
        icon: CheckCircle,
        badge: 6,
      },
      {
        title: "Pending LCAs",
        href: "/dashboard/lca-postings/pending",
        icon: Clock,
        badge: 2,
      },
      {
        title: "DOL Compliance",
        href: "/dashboard/lca-postings/compliance",
        icon: Lock,
        badge: "100%",
      },
      {
        title: "Audit Trail",
        href: "/dashboard/lca-postings/audit",
        icon: Activity,
      },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: BarChart3,
    children: [
      {
        title: "Overview",
        href: "/dashboard/analytics",
        icon: TrendingUp,
      },
      {
        title: "Job Performance",
        href: "/dashboard/analytics/jobs",
        icon: BarChart,
      },
      {
        title: "Application Metrics",
        href: "/dashboard/analytics/applications",
        icon: PieChart,
      },
      {
        title: "LCA Reports",
        href: "/dashboard/analytics/lca",
        icon: LineChart,
      },
      {
        title: "Export Data",
        href: "/dashboard/analytics/export",
        icon: Download,
      },
    ],
  },
  {
    title: "User Management",
    icon: UserCheck,
    badge: 45,
    children: [
      {
        title: "All Users",
        href: "/dashboard/users",
        icon: Users,
        badge: 45,
      },
      {
        title: "Administrators",
        href: "/dashboard/users/admins",
        icon: Key,
        badge: 3,
      },
      {
        title: "HR Staff",
        href: "/dashboard/users/hr",
        icon: Building,
        badge: 8,
      },
      {
        title: "Candidates",
        href: "/dashboard/users/candidates",
        icon: Globe,
        badge: 34,
      },
      {
        title: "Permissions",
        href: "/dashboard/users/permissions",
        icon: Lock,
      },
    ],
  },
  {
    title: "Communications",
    icon: Mail,
    badge: 23,
    children: [
      {
        title: "Email Templates",
        href: "/dashboard/communications/templates",
        icon: Mail,
      },
      {
        title: "Notifications",
        href: "/dashboard/communications/notifications",
        icon: Bell,
        badge: 23,
      },
      {
        title: "Bulk Messages",
        href: "/dashboard/communications/bulk",
        icon: Zap,
      },
      {
        title: "Message History",
        href: "/dashboard/communications/history",
        icon: Database,
      },
    ],
  },
  {
    title: "System",
    icon: Server,
    children: [
      {
        title: "System Health",
        href: "/dashboard/system/health",
        icon: Activity,
        badge: "98%",
      },
      {
        title: "Backup & Recovery",
        href: "/dashboard/system/backup",
        icon: Database,
      },
      {
        title: "API Logs",
        href: "/dashboard/system/logs",
        icon: FileText,
      },
      {
        title: "Security Audit",
        href: "/dashboard/system/security",
        icon: Lock,
      },
      {
        title: "Performance",
        href: "/dashboard/system/performance",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      {
        title: "General Settings",
        href: "/dashboard/settings/general",
        icon: Settings,
      },
      {
        title: "Email Configuration",
        href: "/dashboard/settings/email",
        icon: Mail,
      },
      {
        title: "Integration Settings",
        href: "/dashboard/settings/integrations",
        icon: Zap,
      },
      {
        title: "Backup Settings",
        href: "/dashboard/settings/backup",
        icon: RefreshCw,
      },
    ],
  },
]

export function AdminDashboardSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>(["Jobs Management", "Applications", "LCA Postings"])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const filteredItems = navigationItems.filter((item) => {
    if (!searchQuery) return true

    const matchesTitle = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChildren = item.children?.some((child) =>
      child.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return matchesTitle || matchesChildren
  })

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0
    const isActive = pathname === item.href
    const isParentActive = item.children?.some((child) => pathname === child.href)

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isExpanded} onOpenChange={() => toggleExpanded(item.title)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-left font-normal h-10",
                level > 0 && "ml-4 w-[calc(100%-1rem)]",
                (isActive || isParentActive) && "bg-gray-800 text-white",
                "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                  {item.badge}
                </Badge>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map((child) => renderNavigationItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Button
        key={item.title}
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 text-left font-normal h-10",
          level > 0 && "ml-4 w-[calc(100%-1rem)]",
          isActive && "bg-gray-800 text-white",
          "text-gray-300 hover:bg-gray-800 hover:text-white",
        )}
        asChild
      >
        <Link href={item.href || "#"}>
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 truncate">{item.title}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
              {item.badge}
            </Badge>
          )}
        </Link>
      </Button>
    )
  }

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-gray-800 bg-gray-950">
      <div className="flex h-full flex-col">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1 py-4">{filteredItems.map((item) => renderNavigationItem(item))}</div>
        </ScrollArea>

        <Separator className="bg-gray-800" />

        {/* System Status */}
        <div className="p-4 space-y-3">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">System Status</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Database</span>
              <Badge variant="outline" className="border-green-600/30 text-green-400 text-xs">
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">API</span>
              <Badge variant="outline" className="border-green-600/30 text-green-400 text-xs">
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Storage</span>
              <Badge variant="outline" className="border-yellow-600/30 text-yellow-400 text-xs">
                85% Full
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
