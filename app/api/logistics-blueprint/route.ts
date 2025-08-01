import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Generate AI-powered logistics blueprint
    const blueprint = {
      id: `logistics_${Date.now()}`,
      companyName: formData.companyName,
      contactEmail: formData.contactEmail,
      assessment: {
        dailyShipments: formData.dailyShipments,
        regions: formData.regions,
        deliveryModes: formData.deliveryModes,
        existingSystems: formData.existingSystems,
        challenges: formData.challenges,
        goals: formData.goals,
      },
      recommendations: {
        primaryFocus: determinePrimaryFocus(formData),
        sapModules: recommendSAPModules(formData),
        aiCapabilities: recommendAICapabilities(formData),
        implementationPhases: generateImplementationPhases(formData),
      },
      roiForecast: calculateROI(formData),
      timeline: generateTimeline(formData),
      createdAt: new Date().toISOString(),
    }

    // Store in database
    const { error } = await supabase.from("logistics_blueprints").insert([blueprint])

    if (error) {
      console.error("Database error:", error)
    }

    return NextResponse.json({
      success: true,
      plan: blueprint,
      message: "Logistics AI blueprint generated successfully",
    })
  } catch (error) {
    console.error("Blueprint generation error:", error)
    return NextResponse.json({ error: "Failed to generate logistics blueprint" }, { status: 500 })
  }
}

function determinePrimaryFocus(formData: any): string {
  const challenges = formData.challenges?.toLowerCase() || ""
  const goals = formData.goals?.toLowerCase() || ""

  if (challenges.includes("route") || goals.includes("route")) {
    return "Route Optimization & Planning"
  } else if (challenges.includes("inventory") || goals.includes("inventory")) {
    return "Inventory Management & Visibility"
  } else if (challenges.includes("cost") || goals.includes("cost")) {
    return "Cost Optimization & Efficiency"
  } else {
    return "End-to-End Logistics Transformation"
  }
}

function recommendSAPModules(formData: any): string[] {
  const modules = ["SAP TM (Transportation Management)"]
  const existing = formData.existingSystems || []

  if (!existing.includes("SAP EWM")) {
    modules.push("SAP EWM (Extended Warehouse Management)")
  }
  if (!existing.includes("SAP S/4HANA")) {
    modules.push("SAP S/4HANA (Core ERP)")
  }
  if (formData.deliveryModes?.includes("air") || formData.deliveryModes?.includes("sea")) {
    modules.push("SAP GTS (Global Trade Services)")
  }

  return modules
}

function recommendAICapabilities(formData: any): string[] {
  const capabilities = ["Real-time Route Optimization", "Predictive Analytics Dashboard"]

  if (formData.deliveryModes?.length > 2) {
    capabilities.push("Multi-modal Transportation AI")
  }
  if (formData.challenges?.toLowerCase().includes("inventory")) {
    capabilities.push("AI-powered Inventory Management")
  }
  if (formData.goals?.toLowerCase().includes("customer")) {
    capabilities.push("Customer Experience AI")
  }

  return capabilities
}

function generateImplementationPhases(formData: any): Array<{ phase: string; duration: string; activities: string[] }> {
  return [
    {
      phase: "Phase 1: Foundation",
      duration: "2-3 months",
      activities: ["SAP TM Implementation", "Data Integration", "Basic AI Setup"],
    },
    {
      phase: "Phase 2: Intelligence",
      duration: "2-3 months",
      activities: ["AI Copilot Deployment", "Predictive Analytics", "IoT Integration"],
    },
    {
      phase: "Phase 3: Optimization",
      duration: "1-2 months",
      activities: ["Advanced AI Features", "Blockchain Integration", "Performance Tuning"],
    },
  ]
}

function calculateROI(formData: any): { costReduction: string; efficiencyGain: string; paybackPeriod: string } {
  // Simplified ROI calculation based on company size and current challenges
  const shipmentVolume = Number.parseInt(formData.dailyShipments?.split("-")[1] || "100")

  let costReduction = "25-30%"
  let efficiencyGain = "35-40%"
  let paybackPeriod = "12-18 months"

  if (shipmentVolume > 1000) {
    costReduction = "30-40%"
    efficiencyGain = "45-55%"
    paybackPeriod = "8-12 months"
  } else if (shipmentVolume > 500) {
    costReduction = "28-35%"
    efficiencyGain = "40-50%"
    paybackPeriod = "10-15 months"
  }

  return { costReduction, efficiencyGain, paybackPeriod }
}

function generateTimeline(formData: any): { totalDuration: string; milestones: string[] } {
  return {
    totalDuration: "6-8 months",
    milestones: [
      "Month 1: SAP TM Go-Live",
      "Month 3: AI Copilot Launch",
      "Month 5: IoT Integration Complete",
      "Month 6: Full Platform Optimization",
    ],
  }
}
