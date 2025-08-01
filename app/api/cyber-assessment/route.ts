import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Simulate AI assessment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate assessment based on form data
    const assessment = generateSecurityAssessment(formData)

    // Store assessment in database
    const { data, error } = await supabase
      .from("cyber_assessments")
      .insert([
        {
          company_name: formData.companyName,
          industry: formData.industry,
          sap_landscape: formData.sapLandscape,
          cloud_environments: formData.cloudEnvironments,
          compliance_requirements: formData.complianceRequirements,
          assessment_results: assessment,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
    }

    return NextResponse.json(assessment)
  } catch (error) {
    console.error("Assessment generation error:", error)
    return NextResponse.json({ error: "Failed to generate security assessment" }, { status: 500 })
  }
}

function generateSecurityAssessment(formData: any) {
  // Calculate risk score based on various factors
  let riskScore = 30 // Base risk

  // Industry-specific risk adjustments
  const industryRisk = {
    healthcare: 25,
    financial: 30,
    manufacturing: 15,
    retail: 20,
    government: 35,
    other: 10,
  }
  riskScore += industryRisk[formData.industry as keyof typeof industryRisk] || 10

  // SAP landscape complexity
  riskScore += formData.sapLandscape.length * 5

  // Cloud environment complexity
  if (formData.cloudEnvironments.includes("Multi-Cloud")) riskScore += 15
  if (formData.cloudEnvironments.includes("Hybrid")) riskScore += 10

  // Compliance requirements
  riskScore += formData.complianceRequirements.length * 3

  // Generate gaps based on assessment
  const potentialGaps = [
    "Multi-factor authentication not enforced across all SAP systems",
    "Insufficient network segmentation between SAP and cloud environments",
    "Outdated encryption protocols in legacy SAP ECC systems",
    "Incomplete audit logging for privileged user activities",
    "Missing automated vulnerability scanning for ABAP custom code",
    "Inadequate backup encryption and offsite storage procedures",
    "Weak password policies for service accounts",
    "Insufficient monitoring of SAP transport management",
    "Missing data loss prevention controls for sensitive information",
    "Incomplete incident response procedures for SAP-specific threats",
  ]

  const gapsFound = Math.min(Math.floor(riskScore / 10), potentialGaps.length)
  const topGaps = potentialGaps.slice(0, gapsFound)

  // Generate recommendations
  const recommendations = [
    "Implement Zero Trust architecture across all SAP and cloud systems",
    "Deploy AI-powered threat detection and behavioral analytics",
    "Establish automated incident response workflows",
    "Conduct regular penetration testing of SAP applications",
    "Implement blockchain-based audit trails for critical transactions",
    "Deploy quantum-resistant encryption for future-proofing",
    "Establish continuous compliance monitoring and reporting",
    "Create comprehensive security awareness training program",
  ]

  // Calculate compliance score
  const complianceScore = Math.max(60, 100 - riskScore / 2)

  return {
    riskScore: Math.min(riskScore, 100),
    gapsFound,
    topGaps,
    recommendations: recommendations.slice(0, 5),
    complianceScore: Math.round(complianceScore),
    industryBenchmark: getIndustryBenchmark(formData.industry),
    priorityActions: getPriorityActions(formData),
    estimatedCost: calculateRemediationCost(gapsFound),
    timeline: calculateTimeline(gapsFound),
  }
}

function getIndustryBenchmark(industry: string) {
  const benchmarks = {
    healthcare: { avgRisk: 65, avgCompliance: 78 },
    financial: { avgRisk: 70, avgCompliance: 85 },
    manufacturing: { avgRisk: 55, avgCompliance: 72 },
    retail: { avgRisk: 60, avgCompliance: 75 },
    government: { avgRisk: 75, avgCompliance: 88 },
    other: { avgRisk: 50, avgCompliance: 70 },
  }
  return benchmarks[industry as keyof typeof benchmarks] || benchmarks.other
}

function getPriorityActions(formData: any) {
  const actions = []

  if (formData.sapLandscape.includes("S/4HANA")) {
    actions.push("Implement S/4HANA security baseline configuration")
  }

  if (formData.cloudEnvironments.includes("AWS") || formData.cloudEnvironments.includes("Azure")) {
    actions.push("Configure cloud security posture management (CSPM)")
  }

  if (formData.complianceRequirements.includes("GDPR")) {
    actions.push("Implement data residency controls and privacy by design")
  }

  return actions
}

function calculateRemediationCost(gapsFound: number) {
  const baseCost = 25000
  const costPerGap = 8000
  return baseCost + gapsFound * costPerGap
}

function calculateTimeline(gapsFound: number) {
  const baseWeeks = 4
  const weeksPerGap = 1.5
  return Math.ceil(baseWeeks + gapsFound * weeksPerGap)
}
