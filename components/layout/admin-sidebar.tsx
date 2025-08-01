"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Upload,
  Eye,
  Settings,
  ChevronDown,
  ChevronRight,
  Building,
  Shield,
  BarChart3,
  MessageSquare,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Careers Management",
    icon: Briefcase,
    children: [
      {
        title: "Upload Job Posting",
        href: "/admin/jobs/upload",
        icon: Upload,
      },
      {
        title: "Upload LCA Posting",
        href: "/admin/lca-postings/upload",
        icon: FileText,
      },
      {
        title: "View All Jobs",
        href: "/admin/jobs",
        icon: Eye,
      },
      {
        title: "View All LCAs",
        href: "/admin/lca-postings",
        icon: Shield,
      },
      {
        title: "Applications",
        href: "/admin/applications",
        icon: Users,
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    children: [
      {
        title: "Job Performance",
        href: "/admin/analytics/jobs",
        icon: BarChart3,
      },
      {
        title: "Application Metrics",
        href: "/admin/analytics/applications",
        icon: Users,
      },
      {
        title: "Compliance Reports",
        href: "/admin/analytics/compliance",
        icon: Shield,
      },
    ],
  },
  {
    title: "Communications",
    icon: MessageSquare,
    children: [
      {
        title: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        title: "Messages",
        href: "/admin/messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export const AdminSidebar = () => {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Careers Management"])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (children: SidebarItem[]) => children.some((child) => child.href && pathname === child.href)

  const SidebarItemComponent = ({ item, level = 0 }: { item: SidebarItem; level?: number }) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const parentActive = hasChildren && isParentActive(item.children ?? [])

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              level === 0
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50",
              parentActive && "text-cyan-400 bg-cyan-500/10",
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn("w-4 h-4", level > 0 && "w-3 h-3")} />
              <span>{item.title}</span>
            </div>
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className={cn("space-y-1", level === 0 ? "ml-4" : "ml-6")}>
                  {item.children.map((child) => (
                    <SidebarItemComponent key={child.title} item={child} level={level + 1} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <Link
        href={item.href!}
        className={cn(
          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          level === 0
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50",
          isActive(item.href!) && "text-cyan-400 bg-cyan-500/10 border-r-2 border-cyan-400",
        )}
      >
        <item.icon className={cn("w-4 h-4", level > 0 && "w-3 h-3")} />
        <span>{item.title}</span>
      </Link>
    )
  }

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Building className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Admin Panel</h2>
            <p className="text-gray-400 text-xs">ESG Global</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItemComponent key={item.title} item={item} />
          ))}
        </nav>
      </div>
    </div>
  )
}
