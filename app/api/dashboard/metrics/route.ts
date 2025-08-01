import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Mock metrics data - replace with actual database queries
    const metrics = {
      totalUsers: 1247,
      activeProjects: 89,
      completedTasks: 456,
      systemUptime: 99.8,
      dataProcessed: "2.4TB",
      aiInsights: 127,
      securityAlerts: 3,
      performanceScore: 94,
    }

    return NextResponse.json({ success: true, data: metrics })
  } catch (error) {
    console.error("Error fetching metrics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch metrics" }, { status: 500 })
  }
}
