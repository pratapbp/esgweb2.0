import { type NextRequest, NextResponse } from "next/server"

// Mock knowledge base for supply chain queries
const knowledgeBase = {
  "ariba guided buying": {
    title: "SAP Ariba Guided Buying",
    description: "Self-service procurement solution that guides employees through compliant purchasing processes",
    features: [
      "Intuitive catalog browsing with smart search",
      "Automated approval workflows",
      "Budget validation and spend controls",
      "Integration with preferred suppliers",
      "Mobile-first user experience",
      "Real-time spend analytics",
    ],
    benefits: [
      "85% reduction in maverick spending",
      "60% faster requisition processing",
      "95% policy compliance",
      "40% reduction in procurement cycle time",
    ],
    useCases: [
      "Employee self-service purchasing",
      "Catalog management",
      "Approval workflow automation",
      "Spend policy enforcement",
    ],
  },
  "ibp vs apo": {
    title: "SAP IBP vs APO vs S&OP Comparison",
    comparison: {
      "SAP IBP": {
        type: "Cloud-native integrated planning",
        features: ["Real-time collaboration", "AI/ML enabled", "Unified planning", "Mobile access"],
        advantages: [
          "50% faster planning cycles",
          "Real-time data",
          "Predictive analytics",
          "Seamless S/4HANA integration",
        ],
      },
      "SAP APO": {
        type: "On-premise legacy system",
        features: ["Separate modules", "Batch processing", "Limited real-time", "Desktop-based"],
        limitations: ["Slower planning cycles", "Data latency", "Limited analytics", "Complex integration"],
      },
      "S&OP": {
        type: "Process methodology",
        features: ["Cross-functional planning", "Executive alignment", "Demand-supply balancing"],
        note: "S&OP is a process that can be enabled by either IBP or APO technology",
      },
    },
  },
  "procurement optimization": {
    title: "Global Procurement Optimization Strategies",
    strategies: [
      {
        area: "Spend Analytics",
        description: "AI-powered spend analysis to identify 15-20% cost savings opportunities",
        tactics: ["Category spend analysis", "Supplier consolidation", "Contract optimization", "Price benchmarking"],
      },
      {
        area: "Supplier Performance",
        description: "Real-time supplier scorecards and performance monitoring",
        tactics: ["KPI dashboards", "Risk assessment", "Quality metrics", "Delivery performance"],
      },
      {
        area: "Predictive Analytics",
        description: "30% improvement in demand forecasting accuracy",
        tactics: ["Demand sensing", "Market intelligence", "Risk prediction", "Price forecasting"],
      },
      {
        area: "Process Automation",
        description: "Automate routine procurement tasks and approvals",
        tactics: ["Workflow automation", "Contract lifecycle management", "Invoice processing", "Supplier onboarding"],
      },
    ],
  },
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ success: false, error: "Query is required" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let response = ""
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("ariba guided buying")) {
      const kb = knowledgeBase["ariba guided buying"]
      response = `${kb.description}

Key Features:
${kb.features.map((f) => `• ${f}`).join("\n")}

Benefits:
${kb.benefits.map((b) => `• ${b}`).join("\n")}

Common Use Cases:
${kb.useCases.map((u) => `• ${u}`).join("\n")}`
    } else if (lowerQuery.includes("compare ibp") || lowerQuery.includes("ibp vs apo")) {
      const kb = knowledgeBase["ibp vs apo"]
      response = `${kb.title}

SAP IBP (Integrated Business Planning):
• Type: ${kb.comparison["SAP IBP"].type}
• Key Features: ${kb.comparison["SAP IBP"].features.join(", ")}
• Advantages: ${kb.comparison["SAP IBP"].advantages.join(", ")}

SAP APO (Advanced Planning & Optimization):
• Type: ${kb.comparison["SAP APO"].type}
• Features: ${kb.comparison["SAP APO"].features.join(", ")}
• Limitations: ${kb.comparison["SAP APO"].limitations.join(", ")}

S&OP (Sales & Operations Planning):
• Type: ${kb.comparison["S&OP"].type}
• Features: ${kb.comparison["S&OP"].features.join(", ")}
• Note: ${kb.comparison["S&OP"].note}

Recommendation: For modern enterprises, SAP IBP offers significant advantages with cloud-native architecture, real-time capabilities, and AI/ML integration.`
    } else if (lowerQuery.includes("optimization") || lowerQuery.includes("procurement manager")) {
      const kb = knowledgeBase["procurement optimization"]
      response = `${kb.title}

${kb.strategies
  .map(
    (strategy) => `
${strategy.area}:
${strategy.description}
Tactics: ${strategy.tactics.join(", ")}`,
  )
  .join("\n")}

Additional Recommendations:
• Implement supplier diversity programs to reduce risk
• Use blockchain for supply chain transparency
• Deploy IoT sensors for real-time inventory tracking
• Establish center of excellence for procurement best practices`
    } else if (lowerQuery.includes("ariba success manufacturing")) {
      response = `Manufacturing Success with SAP Ariba:

Real Client Example - Global Automotive Manufacturer:
• $12M annual savings through strategic sourcing
• 65% reduction in supplier onboarding time (from 3 weeks to 3 days)
• 40% improvement in contract compliance
• 99.5% supplier performance visibility
• 30% faster RFQ processing

Key Success Factors:
• Multi-tier supplier management with real-time visibility
• Quality scorecards integrated with production systems
• Risk monitoring with predictive analytics
• Supplier collaboration portal for seamless communication
• Mobile access for field procurement teams

Manufacturing-Specific Features:
• Bill of Materials (BOM) integration
• Quality management workflows
• Supplier audit management
• Compliance tracking for industry standards
• Integration with MES and ERP systems`
    } else if (lowerQuery.includes("sourcing dashboard retail")) {
      response = `Retail Sourcing Dashboard Components:

1. Spend Analytics Module:
• Category breakdown with trend analysis
• Savings tracking vs. targets
• Maverick spend identification
• Seasonal spending patterns

2. Supplier Performance Metrics:
• On-time delivery rates
• Quality scores and defect rates
• Price competitiveness index
• Risk indicators (financial, operational, ESG)

3. Contract Management:
• Contract expiration alerts
• Compliance status monitoring
• Renewal pipeline management
• Terms and conditions tracking

4. Market Intelligence:
• Price benchmarking against market rates
• Commodity price trends
• Supplier news and updates
• Market disruption alerts

5. KPI Monitoring:
• Cost savings achieved
• Procurement cycle times
• Supplier diversity metrics
• Purchase order accuracy

Real-time Features:
• Mobile dashboard access
• Executive summary views
• Automated alerts and notifications
• Integration with retail POS systems for demand-driven sourcing`
    } else {
      response = `I can help you with SAP supply chain and procurement questions. Here are some topics I can assist with:

• SAP Ariba (Sourcing, Procurement, Supplier Management)
• SAP IBP (Integrated Business Planning, Demand Forecasting)
• SAP Fieldglass (Contingent Workforce Management)
• Procurement optimization strategies
• Supply chain analytics and KPIs
• Implementation best practices
• Industry-specific use cases

Try asking about specific modules, comparisons, or optimization strategies for your industry.`
    }

    return NextResponse.json({
      success: true,
      query,
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing copilot query:", error)
    return NextResponse.json({ success: false, error: "Failed to process query" }, { status: 500 })
  }
}
