import type React from "react"
import type { Metadata } from "next"
import { AdminDashboardSidebar } from "@/components/layout/admin-dashboard-sidebar"
import { AdminHeader } from "@/components/layout/admin-header"

export const metadata: Metadata = {
  title: "Admin Dashboard - Executive Software Guild",
  description: "Administrative dashboard for managing careers, LCA postings, and system operations",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <AdminHeader />
      <div className="flex">
        <AdminDashboardSidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
