import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Store the blueprint request in the database
    const { data, error } = await supabase
      .from("manufacturing_blueprints")
      .insert([
        {
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          sub_industry: formData.subIndustry,
          business_size: formData.businessSize,
          pain_points: formData.painPoints,
          ai_maturity: formData.aiMaturity,
          current_systems: formData.currentSystems,
          timeline: formData.timeline,
          budget: formData.budget,
          additional_info: formData.additionalInfo,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Error storing blueprint request:", error)
      return NextResponse.json({ error: "Failed to store blueprint request" }, { status: 500 })
    }

    // Here you would typically trigger:
    // 1. AI analysis of the requirements
    // 2. Email notifications to the team
    // 3. Blueprint generation process

    return NextResponse.json({
      success: true,
      message: "Blueprint request submitted successfully",
      requestId: data[0].id,
    })
  } catch (error) {
    console.error("Error processing blueprint request:", error)
    return NextResponse.json({ error: "Failed to process blueprint request" }, { status: 500 })
  }
}
