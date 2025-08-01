import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = ["organizationName", "contactName", "email", "hospitalSize"]
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Insert into database
    const { data, error } = await supabase
      .from("healthcare_blueprints")
      .insert([
        {
          organization_name: formData.organizationName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          hospital_size: formData.hospitalSize,
          claim_volume: formData.claimVolume,
          existing_systems: formData.existingSystems,
          languages_served: formData.languagesServed,
          pain_points: formData.selectedPainPoints,
          additional_requirements: formData.additionalRequirements,
          budget_range: formData.budget,
          implementation_timeline: formData.timeline,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save blueprint request" }, { status: 500 })
    }

    // Generate personalized recommendations based on form data
    const recommendations = generateRecommendations(formData)

    return NextResponse.json({
      success: true,
      message: "Healthcare blueprint request submitted successfully",
      blueprintId: data[0].id,
      recommendations,
      estimatedDelivery: "24-48 hours",
    })
  } catch (error) {
    console.error("Healthcare blueprint error:", error)
    return NextResponse.json({ error: "Failed to process blueprint request" }, { status: 500 })
  }
}

function generateRecommendations(formData: any) {
  const recommendations = {
    priority: [] as string[],
    sapModules: [] as string[],
    aiSolutions: [] as string[],
    complianceItems: [] as string[],
    estimatedROI: "",
    implementationPhases: [] as string[],
  }

  // Priority recommendations based on pain points
  if (formData.selectedPainPoints.includes("wait-times")) {
    recommendations.priority.push("AI-powered patient scheduling and triage system")
    recommendations.aiSolutions.push("Intelligent queue management")
  }

  if (formData.selectedPainPoints.includes("claim-rejections")) {
    recommendations.priority.push("GenAI claim validation and processing")
    recommendations.sapModules.push("SAP Revenue Cloud")
  }

  if (formData.selectedPainPoints.includes("compliance")) {
    recommendations.priority.push("Blockchain audit trail implementation")
    recommendations.complianceItems.push("HIPAA compliance automation")
  }

  // SAP modules based on hospital size
  switch (formData.hospitalSize) {
    case "small":
      recommendations.sapModules.push("SAP Health Cloud", "SAP Concur")
      recommendations.estimatedROI = "15-25% operational cost reduction"
      break
    case "medium":
      recommendations.sapModules.push("SAP Health Cloud", "SAP S/4HANA", "SAP Ariba")
      recommendations.estimatedROI = "20-35% operational cost reduction"
      break
    case "large":
    case "enterprise":
      recommendations.sapModules.push("SAP S/4HANA", "SAP Health Cloud", "SAP BTP", "SAP Ariba")
      recommendations.estimatedROI = "25-45% operational cost reduction"
      break
  }

  // Implementation phases
  recommendations.implementationPhases = [
    "Phase 1: Assessment and Planning (4-6 weeks)",
    "Phase 2: Core System Integration (8-12 weeks)",
    "Phase 3: AI Solution Deployment (6-8 weeks)",
    "Phase 4: Training and Go-Live (4-6 weeks)",
    "Phase 5: Optimization and Scaling (Ongoing)",
  ]

  return recommendations
}
