import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Mock tenants data - replace with actual database queries
    const tenants = [
      {
        id: "1",
        name: "Acme Corporation",
        domain: "acme.com",
        status: "active",
        plan: "enterprise",
        users: 150,
        storage: "2.4TB",
        lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
        settings: {
          aiEnabled: true,
          analyticsEnabled: true,
          backupEnabled: true,
        },
      },
      {
        id: "2",
        name: "TechStart Inc",
        domain: "techstart.io",
        status: "pending",
        plan: "professional",
        users: 25,
        storage: "500GB",
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
        settings: {
          aiEnabled: false,
          analyticsEnabled: true,
          backupEnabled: true,
        },
      },
      {
        id: "3",
        name: "Global Enterprises",
        domain: "globalent.com",
        status: "active",
        plan: "enterprise",
        users: 500,
        storage: "10TB",
        lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), // 90 days ago
        settings: {
          aiEnabled: true,
          analyticsEnabled: true,
          backupEnabled: true,
        },
      },
    ]

    return NextResponse.json({ success: true, data: tenants })
  } catch (error) {
    console.error("Error fetching tenants:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch tenants" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    // Mock creating a new tenant
    const newTenant = {
      id: Date.now().toString(),
      name: body.name,
      domain: body.domain,
      status: "pending",
      plan: body.plan || "professional",
      users: 0,
      storage: "0GB",
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      settings: {
        aiEnabled: false,
        analyticsEnabled: true,
        backupEnabled: true,
      },
    }

    return NextResponse.json({ success: true, data: newTenant })
  } catch (error) {
    console.error("Error creating tenant:", error)
    return NextResponse.json({ success: false, error: "Failed to create tenant" }, { status: 500 })
  }
}
