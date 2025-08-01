import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, goal, timeline, budget } = body

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json({ error: "Name, email, and company are required" }, { status: 400 })
    }

    // Insert quick start assessment into database
    const { data, error } = await supabase
      .from("quick_start_assessments")
      .insert([
        {
          name,
          email,
          company,
          goal,
          timeline,
          budget,
          submitted_at: new Date().toISOString(),
          status: "new",
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save assessment" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Quick start assessment submitted successfully",
        id: data[0]?.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Quick start error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
