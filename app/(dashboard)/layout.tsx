import type React from "react"
import DashboardHeader from "@/components/layout/dashboard-header"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex pt-16">
        <DashboardSidebar />
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  )
}
