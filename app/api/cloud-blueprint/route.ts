import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Generate AI-powered recommendations based on form data
    const recommendations = generateCloudRecommendations(formData)

    // Create blueprint object
    const blueprint = {
      architecture: recommendations.architecture,
      timeline: recommendations.timeline,
      costs: recommendations.costs,
      technologies: recommendations.technologies,
      phases: recommendations.phases,
    }

    // Save to database
    const { data, error } = await supabase
      .from("cloud_blueprints")
      .insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        cloud_providers: formData.cloudProviders,
        current_stack: formData.currentStack,
        ai_usage: formData.aiUsage,
        budget_tier: formData.budgetTier,
        requirements: formData.requirements,
        blueprint: blueprint,
        recommendations: recommendations.summary,
        status: "generated",
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save blueprint" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      blueprint: data,
      message: "Cloud blueprint generated successfully!",
    })
  } catch (error) {
    console.error("Blueprint generation error:", error)
    return NextResponse.json({ error: "Failed to generate blueprint" }, { status: 500 })
  }
}

function generateCloudRecommendations(formData: any) {
  const { cloudProviders, currentStack, aiUsage, budgetTier, requirements } = formData

  // AI-powered recommendation logic
  const architecture = []
  const timeline = []
  let costs = {}
  const technologies = []
  let phases = []
  let summary = []

  // Architecture recommendations based on cloud providers
  if (cloudProviders.includes("AWS")) {
    architecture.push({
      provider: "AWS",
      services: ["EC2", "RDS", "S3", "Lambda", "EKS"],
      use_case: "Primary compute and storage infrastructure",
    })
    technologies.push("AWS Well-Architected Framework", "AWS CloudFormation", "AWS Config")
  }

  if (cloudProviders.includes("Azure")) {
    architecture.push({
      provider: "Azure",
      services: ["Virtual Machines", "Azure SQL", "Blob Storage", "AKS", "Azure Functions"],
      use_case: "Enterprise applications and Microsoft ecosystem integration",
    })
    technologies.push("Azure Resource Manager", "Azure DevOps", "Azure Monitor")
  }

  if (cloudProviders.includes("GCP")) {
    architecture.push({
      provider: "GCP",
      services: ["Compute Engine", "Cloud SQL", "Cloud Storage", "GKE", "Cloud Functions"],
      use_case: "Data analytics and machine learning workloads",
    })
    technologies.push("Google Cloud Deployment Manager", "Stackdriver", "BigQuery")
  }

  if (cloudProviders.includes("SAP Cloud")) {
    architecture.push({
      provider: "SAP Cloud",
      services: ["SAP RISE", "SAP Analytics Cloud", "SAP Integration Suite"],
      use_case: "Core ERP and business process management",
    })
    technologies.push("SAP Cloud Platform", "SAP HANA Cloud", "SAP Business Technology Platform")
  }

  // Timeline based on complexity and budget
  const baseTimeline = budgetTier === "startup" ? 8 : budgetTier === "growth" ? 12 : 16

  phases = [
    {
      phase: "Assessment & Planning",
      duration: `${Math.ceil(baseTimeline * 0.2)} weeks`,
      activities: ["Cloud readiness assessment", "Architecture design", "Migration planning"],
    },
    {
      phase: "Infrastructure Setup",
      duration: `${Math.ceil(baseTimeline * 0.3)} weeks`,
      activities: ["Cloud environment provisioning", "Security configuration", "Network setup"],
    },
    {
      phase: "Migration & Integration",
      duration: `${Math.ceil(baseTimeline * 0.4)} weeks`,
      activities: ["Data migration", "Application deployment", "Integration testing"],
    },
    {
      phase: "Optimization & Go-Live",
      duration: `${Math.ceil(baseTimeline * 0.1)} weeks`,
      activities: ["Performance tuning", "User training", "Go-live support"],
    },
  ]

  // Cost estimates based on budget tier
  const costMultiplier = budgetTier === "startup" ? 1 : budgetTier === "growth" ? 3 : 8
  costs = {
    setup_cost: `$${(25000 * costMultiplier).toLocaleString()}`,
    monthly_operational: `$${(5000 * costMultiplier).toLocaleString()}`,
    annual_savings: `$${(50000 * costMultiplier).toLocaleString()}`,
    roi_timeline: "6-12 months",
  }

  // AI/ML specific recommendations
  if (aiUsage !== "none") {
    technologies.push("MLOps Pipeline", "GPU Auto-scaling", "Model Registry")
    summary.push("AI/ML workload optimization with 4x faster training")

    if (aiUsage === "advanced") {
      architecture.push({
        provider: "Multi-Cloud",
        services: ["GPU Clusters", "Model Serving", "Data Pipeline"],
        use_case: "Advanced MLOps and GenAI deployment",
      })
    }
  }

  // SAP-specific recommendations
  if (currentStack?.includes("sap")) {
    summary.push("SAP modernization with cloud-native architecture")
    technologies.push("SAP Cloud Connector", "SAP Data Intelligence", "SAP Analytics Cloud")

    if (currentStack === "sap-ecc") {
      summary.push("ECC to S/4HANA migration with 70% faster deployment")
      phases.unshift({
        phase: "SAP Assessment",
        duration: "2 weeks",
        activities: ["Custom code analysis", "Data quality assessment", "Business process review"],
      })
    }
  }

  // Security and compliance
  technologies.push("Zero-Trust Architecture", "Identity Management", "Compliance Automation")
  summary.push("Enterprise-grade security with 99.9% uptime SLA")

  // Final recommendations summary
  if (summary.length === 0) {
    summary = [
      "Multi-cloud strategy for vendor independence",
      "Cost optimization with 40% savings potential",
      "Automated DevOps with 85% faster deployments",
      "Enterprise security and compliance framework",
    ]
  }

  return {
    architecture,
    timeline: `${baseTimeline} weeks total implementation`,
    costs,
    technologies,
    phases,
    summary,
  }
}
