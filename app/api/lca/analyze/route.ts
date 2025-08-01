import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simulate AI compliance analysis
    const mockAlerts = [
      {
        id: "1",
        type: "wage",
        severity: "high",
        title: "Wage Below Prevailing Rate",
        description:
          "2 LCA postings have actual wages below the prevailing wage rate for their location and occupation.",
        recommendation: "Review and update wage information to meet DOL requirements. Consider market rate analysis.",
        affectedLCAs: ["I-200-24001-123456", "I-200-24003-123458"],
        autoFixAvailable: false,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        type: "documentation",
        severity: "medium",
        title: "Missing Job Description Details",
        description: "3 LCA postings lack comprehensive job descriptions required for public disclosure.",
        recommendation:
          "Add detailed job duties, responsibilities, and required qualifications to meet compliance standards.",
        affectedLCAs: ["I-200-24002-123457", "I-200-24004-123459", "I-200-24005-123460"],
        autoFixAvailable: true,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        type: "dates",
        severity: "low",
        title: "Work Period Validation",
        description: "1 LCA posting has work end date that exceeds maximum allowed period for visa type.",
        recommendation: "Adjust work end date to comply with visa type limitations (H-1B: 3 years, E-3: 2 years).",
        affectedLCAs: ["I-200-24003-123458"],
        autoFixAvailable: true,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        type: "location",
        severity: "medium",
        title: "Worksite Address Incomplete",
        description: "2 LCA postings have incomplete or imprecise worksite addresses.",
        recommendation:
          "Provide complete street addresses including ZIP+4 codes for accurate prevailing wage determination.",
        affectedLCAs: ["I-200-24001-123456", "I-200-24004-123459"],
        autoFixAvailable: false,
        status: "active",
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({
      alerts: mockAlerts,
      complianceScore: 85,
      lastAnalyzed: new Date().toISOString(),
      totalIssues: mockAlerts.length,
      highPriorityIssues: mockAlerts.filter((a) => a.severity === "high").length,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
