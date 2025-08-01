import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const { name, email, company } = data
    if (!name || !email || !company) {
      return NextResponse.json({ error: "Name, email, and company are required" }, { status: 400 })
    }

    // Generate AI recommendations based on input
    const aiRecommendations = generateAIRecommendations(data)

    // Insert into Supabase
    const { data: session, error } = await supabase
      .from("ai_discovery_sessions")
      .insert([
        {
          name,
          email,
          company,
          phone: data.phone || null,
          industry: data.industry || null,
          pain_points: data.painPoints || null,
          ai_maturity: data.aiMaturity || null,
          requested_demos: data.requestedDemo || [],
          ai_recommendations: aiRecommendations,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save discovery session request" }, { status: 500 })
    }

    // TODO: Send notification email to AI team
    // TODO: Create CRM contact if integration is configured
    // TODO: Send confirmation email with AI recommendations

    return NextResponse.json({
      success: true,
      message: "AI Discovery session request submitted successfully",
      id: session.id,
      recommendations: aiRecommendations,
    })
  } catch (error) {
    console.error("Error processing AI discovery session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateAIRecommendations(data: any) {
  const recommendations = []

  // Industry-specific recommendations
  if (data.industry === "healthcare") {
    recommendations.push({
      title: "Medical Document AI",
      description: "Automate clinical note processing and patient data extraction",
      priority: "High",
      timeline: "6-8 weeks",
    })
  } else if (data.industry === "manufacturing") {
    recommendations.push({
      title: "Predictive Maintenance AI",
      description: "Prevent equipment failures with AI-powered monitoring",
      priority: "High",
      timeline: "8-12 weeks",
    })
  } else if (data.industry === "bfsi") {
    recommendations.push({
      title: "Fraud Detection System",
      description: "Real-time transaction monitoring with ML algorithms",
      priority: "Critical",
      timeline: "10-14 weeks",
    })
  }

  // Pain point-based recommendations
  if (data.painPoints?.toLowerCase().includes("manual")) {
    recommendations.push({
      title: "Intelligent Process Automation",
      description: "Automate repetitive tasks with RPA and AI",
      priority: "High",
      timeline: "4-6 weeks",
    })
  }

  if (data.painPoints?.toLowerCase().includes("document")) {
    recommendations.push({
      title: "Document AI Solution",
      description: "Extract and process data from documents automatically",
      priority: "Medium",
      timeline: "6-8 weeks",
    })
  }

  // AI maturity-based recommendations
  if (data.aiMaturity === "beginner") {
    recommendations.push({
      title: "AI Readiness Assessment",
      description: "Evaluate your data and infrastructure for AI implementation",
      priority: "Foundation",
      timeline: "2-3 weeks",
    })
  }

  // Demo-based recommendations
  if (data.requestedDemo?.includes("Bot")) {
    recommendations.push({
      title: "Conversational AI Pilot",
      description: "Deploy a chatbot for customer service or internal support",
      priority: "Quick Win",
      timeline: "3-4 weeks",
    })
  }

  // Default recommendation if none match
  if (recommendations.length === 0) {
    recommendations.push({
      title: "AI Strategy Workshop",
      description: "Identify the best AI opportunities for your business",
      priority: "Foundation",
      timeline: "1-2 weeks",
    })
  }

  return recommendations
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const industry = searchParams.get("industry")

    let query = supabase.from("ai_discovery_sessions").select("*").order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    if (industry) {
      query = query.eq("industry", industry)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch discovery sessions" }, { status: 500 })
    }

    return NextResponse.json({ sessions: data })
  } catch (error) {
    console.error("Error fetching AI discovery sessions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
