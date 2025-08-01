import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const { name, email, company, workshopType } = data
    if (!name || !email || !company) {
      return NextResponse.json({ error: "Name, email, and company are required" }, { status: 400 })
    }

    // Insert into Supabase
    const { data: signup, error } = await supabase
      .from("workshop_signups")
      .insert([
        {
          name,
          email,
          company,
          phone: data.phone || null,
          workshop_type: workshopType || "general",
          billing_model: data.billingModel || null,
          monthly_transactions: data.monthlyTransactions || null,
          current_system: data.currentSystem || null,
          goals: data.goals || [],
          challenges: data.challenges || null,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
    }

    // TODO: Send notification email to sales team
    // TODO: Create CRM contact if integration is configured
    // TODO: Send confirmation email to customer

    return NextResponse.json({
      success: true,
      message: "Workshop signup successful",
      id: signup.id,
    })
  } catch (error) {
    console.error("Error processing workshop signup:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const workshopType = searchParams.get("type")

    let query = supabase.from("workshop_signups").select("*").order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    if (workshopType) {
      query = query.eq("workshop_type", workshopType)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch signups" }, { status: 500 })
    }

    return NextResponse.json({ signups: data })
  } catch (error) {
    console.error("Error fetching workshop signups:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
