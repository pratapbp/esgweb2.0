import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Store the form submission in the database
    const { data, error } = await supabase
      .from("retail_blueprints")
      .insert([
        {
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          retail_category: formData.retailCategory,
          transaction_volume: formData.transactionVolume,
          existing_sap_systems: formData.existingSapSystems,
          personalization_goals: formData.personalizationGoals,
          current_challenges: formData.currentChallenges,
          timeframe: formData.timeframe,
          budget: formData.budget,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save blueprint request" }, { status: 500 })
    }

    // In a real implementation, you would:
    // 1. Generate a personalized blueprint using AI
    // 2. Send confirmation email
    // 3. Notify sales team
    // 4. Schedule follow-up

    // Mock blueprint generation
    const blueprint = {
      id: data[0].id,
      recommendations: generateRecommendations(formData),
      timeline: generateTimeline(formData),
      roi_projection: generateROIProjection(formData),
    }

    return NextResponse.json({
      success: true,
      blueprint,
      message: "Blueprint request submitted successfully",
    })
  } catch (error) {
    console.error("Error processing blueprint request:", error)
    return NextResponse.json({ error: "Failed to process blueprint request" }, { status: 500 })
  }
}

function generateRecommendations(formData: any) {
  const recommendations = []

  // AI-powered recommendations based on form data
  if (formData.personalizationGoals.includes("Product recommendations")) {
    recommendations.push({
      category: "Personalization",
      title: "AI Recommendation Engine",
      description: "Implement ML-powered product recommendations",
      priority: "High",
      technologies: ["SAP Commerce Cloud", "Machine Learning", "Customer Analytics"],
    })
  }

  if (formData.personalizationGoals.includes("Dynamic pricing")) {
    recommendations.push({
      category: "Pricing",
      title: "Dynamic Pricing Engine",
      description: "Real-time price optimization based on demand and competition",
      priority: "High",
      technologies: ["SAP S/4HANA", "Pricing AI", "Market Intelligence"],
    })
  }

  if (formData.personalizationGoals.includes("Fraud prevention")) {
    recommendations.push({
      category: "Security",
      title: "AI Fraud Detection",
      description: "Advanced fraud prevention with computer vision and ML",
      priority: "Medium",
      technologies: ["Computer Vision", "ML Fraud Detection", "SAP Fraud Management"],
    })
  }

  return recommendations
}

function generateTimeline(formData: any) {
  const baseTimeline = {
    immediate: "3-6 months",
    short: "6-9 months",
    medium: "9-15 months",
    long: "15-24 months",
    exploring: "6-12 months",
  }

  return {
    estimated_duration: baseTimeline[formData.timeframe as keyof typeof baseTimeline] || "6-12 months",
    phases: [
      { phase: "Assessment & Planning", duration: "2-4 weeks" },
      { phase: "Core Implementation", duration: "8-16 weeks" },
      { phase: "Testing & Optimization", duration: "4-8 weeks" },
      { phase: "Deployment & Training", duration: "2-4 weeks" },
    ],
  }
}

function generateROIProjection(formData: any) {
  // Simple ROI calculation based on transaction volume
  const volumeMultipliers = {
    "Under $1M annually": 1,
    "$1M - $10M annually": 2,
    "$10M - $50M annually": 5,
    "$50M - $100M annually": 8,
    "$100M - $500M annually": 15,
    "$500M+ annually": 25,
  }

  const multiplier = volumeMultipliers[formData.transactionVolume as keyof typeof volumeMultipliers] || 1

  return {
    year_1: `${Math.round(180 * multiplier)}% ROI`,
    year_2: `${Math.round(320 * multiplier)}% ROI`,
    year_3: `${Math.round(450 * multiplier)}% ROI`,
    key_benefits: [
      "Increased conversion rates",
      "Reduced operational costs",
      "Improved customer satisfaction",
      "Enhanced fraud prevention",
    ],
  }
}
