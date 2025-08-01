import { type NextRequest, NextResponse } from "next/server"

// Mock case studies data - in production, this would come from a database
const caseStudies = [
  {
    id: 1,
    category: "supply-chain",
    industry: "Retail",
    company: "Global Fashion Retailer",
    module: "SAP Ariba",
    challenge: "Fragmented supplier base with 40% maverick spending and poor visibility into procurement processes",
    solution:
      "Implemented SAP Ariba Sourcing and Procurement with AI-powered spend analytics and supplier performance monitoring",
    results: {
      costSaved: "$8.5M",
      deliveryImprovement: "52%",
      cycleReduction: "65%",
      complianceImprovement: "95%",
    },
    metrics: [
      { label: "Annual Cost Savings", value: "$8.5M", trend: "up" },
      { label: "Supplier Onboarding Time", value: "3 days", trend: "down", previous: "21 days" },
      { label: "Contract Compliance", value: "95%", trend: "up", previous: "60%" },
      { label: "Maverick Spending", value: "8%", trend: "down", previous: "40%" },
    ],
    quote:
      "ESGit's AI-enhanced Ariba implementation transformed our procurement from reactive to predictive. We now have complete visibility and control over our $2B annual spend.",
    clientName: "Sarah Johnson",
    clientTitle: "Chief Procurement Officer",
    duration: "8 months",
    region: "North America",
    tags: ["AI Analytics", "Supplier Management", "Cost Optimization"],
  },
  {
    id: 2,
    category: "supply-chain",
    industry: "Manufacturing",
    company: "Automotive Parts Manufacturer",
    module: "SAP IBP",
    challenge:
      "Inaccurate demand forecasting leading to 30% excess inventory and frequent stockouts of critical components",
    solution:
      "Deployed SAP IBP with machine learning algorithms for demand sensing and multi-tier supplier collaboration",
    results: {
      costSaved: "$12.3M",
      deliveryImprovement: "43%",
      cycleReduction: "38%",
      forecastAccuracy: "87%",
    },
    metrics: [
      { label: "Forecast Accuracy", value: "87%", trend: "up", previous: "62%" },
      { label: "Inventory Reduction", value: "30%", trend: "down" },
      { label: "Stockout Incidents", value: "2%", trend: "down", previous: "18%" },
      { label: "Planning Cycle Time", value: "2 days", trend: "down", previous: "14 days" },
    ],
    quote:
      "The AI-powered demand forecasting has revolutionized our production planning. We've eliminated stockouts while reducing inventory by 30%.",
    clientName: "Michael Chen",
    clientTitle: "VP of Supply Chain",
    duration: "6 months",
    region: "Asia Pacific",
    tags: ["Demand Planning", "Machine Learning", "Inventory Optimization"],
  },
  {
    id: 3,
    category: "supply-chain",
    industry: "Healthcare",
    company: "Regional Hospital Network",
    module: "SAP Fieldglass",
    challenge: "Managing 2,000+ contingent workers across 15 facilities with compliance and cost control issues",
    solution:
      "Implemented SAP Fieldglass with blockchain-based credential verification and AI-powered workforce optimization",
    results: {
      costSaved: "$4.7M",
      deliveryImprovement: "67%",
      cycleReduction: "58%",
      complianceImprovement: "99%",
    },
    metrics: [
      { label: "Contractor Onboarding", value: "4 hours", trend: "down", previous: "3 days" },
      { label: "Compliance Rate", value: "99%", trend: "up", previous: "78%" },
      { label: "Cost per Contractor", value: "$85/day", trend: "down", previous: "$120/day" },
      { label: "Administrative Time", value: "2 hours/week", trend: "down", previous: "15 hours/week" },
    ],
    quote:
      "Fieldglass with blockchain verification has given us complete confidence in our contingent workforce compliance while dramatically reducing administrative overhead.",
    clientName: "Dr. Patricia Williams",
    clientTitle: "Chief Operations Officer",
    duration: "4 months",
    region: "North America",
    tags: ["Workforce Management", "Blockchain", "Compliance"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const industry = searchParams.get("industry")
    const module = searchParams.get("module")

    let filteredStudies = caseStudies

    if (category) {
      filteredStudies = filteredStudies.filter((study) => study.category.toLowerCase() === category.toLowerCase())
    }

    if (industry) {
      filteredStudies = filteredStudies.filter((study) => study.industry.toLowerCase() === industry.toLowerCase())
    }

    if (module) {
      filteredStudies = filteredStudies.filter((study) => study.module.toLowerCase().includes(module.toLowerCase()))
    }

    return NextResponse.json({
      success: true,
      data: filteredStudies,
      total: filteredStudies.length,
    })
  } catch (error) {
    console.error("Error fetching case studies:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch case studies" }, { status: 500 })
  }
}
