import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const { id } = params

    // Mock approving a tenant - replace with actual database update
    console.log(`Approving tenant ${id}`)

    return NextResponse.json({
      success: true,
      message: "Tenant approved successfully",
    })
  } catch (error) {
    console.error("Error approving tenant:", error)
    return NextResponse.json({ success: false, error: "Failed to approve tenant" }, { status: 500 })
  }
}
