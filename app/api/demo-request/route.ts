import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, role, industry, interests, preferredDate, preferredTime } = body

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json({ error: "Name, email, and company are required" }, { status: 400 })
    }

    // Insert demo request into database
    const { data, error } = await supabase
      .from("demo_requests")
      .insert([
        {
          name,
          email,
          company,
          role,
          industry,
          interests: interests || [],
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          submitted_at: new Date().toISOString(),
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save demo request" }, { status: 500 })
    }

    return NextResponse.json({ message: "Demo request submitted successfully", data }, { status: 200 })
  } catch (error) {
    console.error("Demo request API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
