import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { query, responseType } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const systemPrompt = `You are a healthcare AI consultant specializing in SAP implementations, HIPAA compliance, and healthcare automation. 
    Provide expert guidance on healthcare technology solutions, focusing on practical implementations and measurable outcomes.
    
    Response format should be: ${responseType || "general"}
    
    For process models: Provide step-by-step implementation processes
    For security checklists: Focus on HIPAA, GDPR, and healthcare compliance requirements
    For KPI targets: Provide specific, measurable healthcare metrics
    For architecture: Detail technical system integrations and data flows
    
    Keep responses practical, actionable, and focused on healthcare industry needs.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: query,
    })

    // Structure the response based on type
    let structuredResponse
    switch (responseType) {
      case "process":
        structuredResponse = {
          type: "process",
          title: "Implementation Process",
          steps: text.split("\n").filter((line) => line.trim().length > 0),
          estimatedTime: "3-6 months",
          complexity: "Medium to High",
        }
        break
      case "security":
        structuredResponse = {
          type: "security",
          title: "Security & Compliance Checklist",
          items: text.split("\n").filter((line) => line.trim().length > 0),
          complianceStandards: ["HIPAA", "GDPR", "SOC 2"],
          riskLevel: "Low with proper implementation",
        }
        break
      case "kpi":
        structuredResponse = {
          type: "kpi",
          title: "Key Performance Indicators",
          metrics: text.split("\n").filter((line) => line.trim().length > 0),
          measurementFrequency: "Monthly",
          benchmarkSource: "Industry standards",
        }
        break
      case "architecture":
        structuredResponse = {
          type: "architecture",
          title: "System Architecture",
          components: text.split("\n").filter((line) => line.trim().length > 0),
          integrationComplexity: "Medium",
          scalability: "High",
        }
        break
      default:
        structuredResponse = {
          type: "general",
          title: "Healthcare AI Guidance",
          content: text,
          recommendations: text
            .split("\n")
            .slice(-3)
            .filter((line) => line.trim().length > 0),
        }
    }

    return NextResponse.json({
      success: true,
      response: structuredResponse,
      query,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Healthcare query error:", error)
    return NextResponse.json({ error: "Failed to process healthcare query" }, { status: 500 })
  }
}
