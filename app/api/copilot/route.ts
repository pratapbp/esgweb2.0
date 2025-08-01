import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Enhanced response logic based on keywords and context
    let response = "I'm ESGit's AI Copilot, here to help with your SAP and business transformation needs!"

    const lowerPrompt = prompt.toLowerCase()

    // SAP-related queries
    if (lowerPrompt.includes("sap") && lowerPrompt.includes("supply chain")) {
      response =
        "For supply chain optimization, I recommend our **SAP Supply Chain & Procurement** service. It includes AI-driven demand forecasting, inventory optimization, and automated procurement workflows. We've helped clients reduce supply chain costs by 35% and improve delivery performance by 50%. Would you like to schedule a consultation?"
    } else if (
      lowerPrompt.includes("sap") &&
      (lowerPrompt.includes("implementation") || lowerPrompt.includes("s/4hana"))
    ) {
      response =
        "Our **SAP Enterprise Solutions** service specializes in S/4HANA implementations with AI-powered automation. We reduce implementation time by 40% using our proprietary methodology. The service includes business process optimization, data migration, custom development, and 24/7 support. Typical projects complete in 3-9 months."
    } else if (lowerPrompt.includes("sap") && lowerPrompt.includes("data")) {
      response =
        "Our **SAP Data & AI Analytics** service transforms your SAP data into actionable insights. We provide predictive analytics, real-time dashboards, machine learning models, and advanced reporting. Our AI algorithms achieve 95% accuracy in business forecasting. Perfect for data-driven decision making."
    } else if (lowerPrompt.includes("sap") && lowerPrompt.includes("brim")) {
      response =
        "**SAP BRIM** (Billing and Revenue Innovation Management) is perfect for subscription-based businesses. Our service includes automated revenue recognition, complex billing scenarios, contract management, and compliance reporting. We've helped SaaS companies reduce billing errors by 90% and accelerate revenue recognition."
    }

    // Industry-specific queries
    else if (lowerPrompt.includes("retail")) {
      response =
        "For retail industry, I recommend combining our **SAP Enterprise Solutions** with **Digital & AI Solutions**. This includes inventory optimization, customer analytics, omnichannel commerce, and AI-powered demand forecasting. We've helped retail clients increase sales by 25% and reduce inventory costs by 30%."
    } else if (lowerPrompt.includes("manufacturing")) {
      response =
        "Manufacturing clients benefit from our **SAP Supply Chain & Procurement** + **Digital & AI Solutions** bundle. This includes predictive maintenance, quality control automation, production optimization, and IoT integration. Our solutions reduce downtime by 40% and improve efficiency by 50%."
    } else if (lowerPrompt.includes("bfsi") || lowerPrompt.includes("banking") || lowerPrompt.includes("financial")) {
      response =
        "For BFSI digital transformation, I suggest our **SAP Enterprise Solutions** + **Cybersecurity Services** + **Digital & AI Solutions** bundle. This includes core banking modernization, regulatory compliance, fraud detection, and customer analytics. We ensure 99.9% uptime and regulatory compliance."
    }

    // Technology-specific queries
    else if (lowerPrompt.includes("ai") || lowerPrompt.includes("artificial intelligence")) {
      response =
        "Our **Digital & AI Solutions** service offers custom AI models, generative AI, intelligent RPA, and AI chatbots. We've deployed 340+ AI workflows with 98.7% accuracy. Services include machine learning, natural language processing, computer vision, and predictive analytics. Perfect for automation and intelligent decision-making."
    } else if (lowerPrompt.includes("cloud")) {
      response =
        "Our **Cloud Solutions** service covers SAP Cloud, AWS, Azure, and GCP migrations. We provide infrastructure as code, DevOps automation, multi-cloud management, and cost optimization. Our cloud migrations reduce infrastructure costs by 40% while improving scalability and security."
    } else if (lowerPrompt.includes("cybersecurity") || lowerPrompt.includes("security")) {
      response =
        "Our **Cybersecurity Services** include AI-based threat detection, Security Operations Center (SOC), identity & access management, and compliance management. We provide 24/7 monitoring with 99.9% threat detection accuracy and automated incident response."
    } else if (lowerPrompt.includes("staffing") || lowerPrompt.includes("h1b")) {
      response =
        "Our **Staffing Solutions** service specializes in H1B visa processing, W2 & C2C placements, and AI-enhanced talent matching. We've placed 1,250+ consultants with 95% success rate. Services include skills assessment, talent pipeline management, and managed services."
    }

    // Bundled offerings
    else if (lowerPrompt.includes("bundle") || lowerPrompt.includes("package")) {
      response =
        "We offer several bundled packages: \n\n**Enterprise Transformation Bundle**: SAP S/4HANA + AI Analytics + Cloud Migration \n**Digital Innovation Package**: AI Solutions + Cybersecurity + Staffing \n**Industry-Specific Bundles**: Customized for Manufacturing, Retail, BFSI, Healthcare \n\nBundles save 20-30% compared to individual services. Which industry interests you?"
    }

    // General service inquiries
    else if (lowerPrompt.includes("service") || lowerPrompt.includes("help")) {
      response =
        "ESGit offers 9 comprehensive services: \n\n1. **SAP Enterprise Solutions** - S/4HANA implementations \n2. **SAP Data & AI Analytics** - Predictive insights \n3. **SAP Supply Chain & Procurement** - Logistics optimization \n4. **SAP BRIM** - Billing & revenue management \n5. **SAP Technology & Innovation** - SAP BTP & RISE \n6. **Digital & AI Solutions** - Custom AI models \n7. **Cloud Solutions** - Multi-cloud management \n8. **Cybersecurity Services** - AI-powered security \n9. **Staffing Solutions** - H1B & talent placement \n\nWhich area interests you most?"
    }

    // Cost and pricing queries
    else if (lowerPrompt.includes("cost") || lowerPrompt.includes("price") || lowerPrompt.includes("budget")) {
      response =
        "Our pricing is competitive and ROI-focused: \n\n• **SAP Implementations**: $150K-$2M (6-12 month ROI) \n• **AI Solutions**: $50K-$500K (3-6 month ROI) \n• **Cloud Migration**: $75K-$750K (40% cost reduction) \n• **Staffing**: $80-$200/hour (95% placement success) \n\nWe offer fixed-price, time & materials, and managed service models. All projects include ROI guarantees. Would you like a customized quote?"
    }

    return NextResponse.json({
      output: response,
      timestamp: new Date().toISOString(),
      query: prompt,
    })
  } catch (error) {
    console.error("Copilot API error:", error)
    return NextResponse.json(
      {
        output:
          "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team directly.",
        error: "Failed to process request",
      },
      { status: 500 },
    )
  }
}
