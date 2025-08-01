import { type NextRequest, NextResponse } from "next/server"

// Comprehensive industry knowledge base
const industryKnowledge = {
  manufacturing: {
    aiUseCases: [
      "Predictive maintenance using IoT sensors and ML algorithms",
      "Quality control automation with computer vision",
      "Supply chain optimization with demand forecasting",
      "Energy consumption optimization through AI analytics",
      "Production planning with reinforcement learning",
      "Digital twin implementation for process optimization",
    ],
    sapModules: ["SAP PP", "SAP QM", "SAP PM", "SAP MM", "SAP WM", "SAP MES"],
    keyMetrics: [
      "OEE (Overall Equipment Effectiveness)",
      "MTBF (Mean Time Between Failures)",
      "First Pass Yield",
      "Inventory Turnover",
    ],
    challenges: ["Equipment downtime", "Quality consistency", "Supply chain disruptions", "Energy costs"],
    solutions: ["Predictive analytics", "Real-time monitoring", "Automated quality control", "Smart scheduling"],
    successStories: [
      "Reduced downtime by 35% through predictive maintenance",
      "Improved quality scores by 28% with AI-powered inspection",
      "Decreased energy costs by 22% through optimization algorithms",
    ],
  },
  healthcare: {
    aiUseCases: [
      "Patient diagnosis assistance with medical imaging AI",
      "Drug discovery acceleration through molecular modeling",
      "Electronic health record optimization and analysis",
      "Personalized treatment recommendations",
      "Hospital resource allocation optimization",
      "Clinical trial patient matching and recruitment",
    ],
    sapModules: ["SAP IS-H", "SAP ERP", "SAP Analytics Cloud", "SAP SuccessFactors", "SAP Ariba"],
    keyMetrics: ["Patient satisfaction scores", "Readmission rates", "Treatment efficacy", "Cost per patient"],
    challenges: ["Data privacy compliance", "Interoperability", "Cost management", "Regulatory requirements"],
    solutions: ["HIPAA-compliant AI systems", "Blockchain for data integrity", "Automated compliance monitoring"],
    successStories: [
      "Reduced diagnostic errors by 40% with AI assistance",
      "Improved patient outcomes by 25% through personalized medicine",
      "Decreased administrative costs by 30% with automation",
    ],
  },
  bfsi: {
    aiUseCases: [
      "Fraud detection and prevention with real-time analytics",
      "Credit risk assessment using alternative data sources",
      "Algorithmic trading and portfolio optimization",
      "Customer service automation with intelligent chatbots",
      "Regulatory compliance monitoring and reporting",
      "Personalized financial product recommendations",
    ],
    sapModules: ["SAP Banking", "SAP Insurance", "SAP Risk Management", "SAP GRC", "SAP Analytics Cloud"],
    keyMetrics: ["Net Promoter Score", "Cost-to-Income Ratio", "Return on Assets", "Fraud Detection Rate"],
    challenges: ["Regulatory compliance", "Cybersecurity threats", "Digital transformation", "Customer expectations"],
    solutions: ["AI-powered risk management", "Blockchain for security", "Real-time fraud detection"],
    successStories: [
      "Reduced fraud losses by 60% with ML algorithms",
      "Improved loan approval speed by 80% through automation",
      "Enhanced customer satisfaction by 45% with personalized services",
    ],
  },
  retail: {
    aiUseCases: [
      "Dynamic pricing optimization based on market conditions",
      "Inventory management with demand forecasting",
      "Personalized product recommendations for customers",
      "Supply chain visibility and optimization",
      "Customer sentiment analysis from social media",
      "Store layout optimization using foot traffic analytics",
    ],
    sapModules: ["SAP Retail", "SAP CAR", "SAP Customer Experience", "SAP Integrated Business Planning"],
    keyMetrics: ["Same-store sales growth", "Inventory turnover", "Customer lifetime value", "Conversion rates"],
    challenges: ["Omnichannel integration", "Inventory optimization", "Customer retention", "Price competition"],
    solutions: ["Unified commerce platforms", "AI-driven personalization", "Real-time inventory tracking"],
    successStories: [
      "Increased sales by 32% through personalized recommendations",
      "Reduced inventory costs by 25% with demand forecasting",
      "Improved customer retention by 40% with targeted campaigns",
    ],
  },
  logistics: {
    aiUseCases: [
      "Route optimization for delivery vehicles",
      "Warehouse automation with robotics and AI",
      "Predictive maintenance for fleet management",
      "Demand forecasting for capacity planning",
      "Real-time shipment tracking and visibility",
      "Automated sorting and packaging systems",
    ],
    sapModules: ["SAP TM", "SAP EWM", "SAP IBP", "SAP Asset Intelligence Network"],
    keyMetrics: ["On-time delivery rate", "Cost per shipment", "Fleet utilization", "Warehouse efficiency"],
    challenges: ["Last-mile delivery costs", "Capacity constraints", "Fuel costs", "Driver shortages"],
    solutions: ["Autonomous vehicles", "Drone delivery", "AI-powered route planning", "Predictive analytics"],
    successStories: [
      "Reduced delivery costs by 28% through route optimization",
      "Improved on-time delivery by 35% with predictive analytics",
      "Decreased warehouse labor costs by 22% with automation",
    ],
  },
  pharma: {
    aiUseCases: [
      "Drug discovery and development acceleration",
      "Clinical trial optimization and patient recruitment",
      "Supply chain traceability and cold chain monitoring",
      "Regulatory compliance automation",
      "Pharmacovigilance and adverse event detection",
      "Personalized medicine and treatment protocols",
    ],
    sapModules: ["SAP S/4HANA", "SAP MES", "SAP GTS", "SAP EHS", "SAP Analytics Cloud"],
    keyMetrics: ["Time to market", "R&D efficiency", "Regulatory compliance rate", "Product quality"],
    challenges: ["Regulatory complexity", "R&D costs", "Supply chain integrity", "Patent cliffs"],
    solutions: ["AI-accelerated drug discovery", "Blockchain for traceability", "Automated compliance"],
    successStories: [
      "Accelerated drug discovery by 40% with AI models",
      "Reduced clinical trial costs by 30% through optimization",
      "Improved supply chain visibility by 50% with IoT tracking",
    ],
  },
  telecom: {
    aiUseCases: [
      "Network optimization and predictive maintenance",
      "Customer churn prediction and retention",
      "Fraud detection in billing and usage patterns",
      "5G network planning and deployment optimization",
      "Customer service automation with AI chatbots",
      "Revenue assurance and billing optimization",
    ],
    sapModules: ["SAP BRIM", "SAP CX", "SAP Analytics Cloud", "SAP Asset Intelligence Network"],
    keyMetrics: ["Network uptime", "Customer satisfaction", "ARPU (Average Revenue Per User)", "Churn rate"],
    challenges: ["5G deployment costs", "Network complexity", "Customer expectations", "Regulatory changes"],
    solutions: ["AI-powered network management", "Predictive maintenance", "Automated customer service"],
    successStories: [
      "Reduced network downtime by 45% with predictive maintenance",
      "Decreased customer churn by 30% through targeted retention",
      "Improved network efficiency by 35% with AI optimization",
    ],
  },
  energy: {
    aiUseCases: [
      "Smart grid optimization and demand response",
      "Renewable energy forecasting and integration",
      "Predictive maintenance for power generation equipment",
      "Energy trading and market optimization",
      "Carbon footprint tracking and reduction",
      "Customer energy usage analytics and recommendations",
    ],
    sapModules: ["SAP IS-U", "SAP EAM", "SAP IBP", "SAP Analytics Cloud", "SAP Sustainability"],
    keyMetrics: ["Grid reliability", "Energy efficiency", "Carbon emissions", "Customer satisfaction"],
    challenges: ["Grid modernization", "Renewable integration", "Regulatory compliance", "Cybersecurity"],
    solutions: ["Smart grid technologies", "AI-powered forecasting", "Automated demand response"],
    successStories: [
      "Improved grid efficiency by 25% with smart technologies",
      "Reduced carbon emissions by 40% through optimization",
      "Enhanced renewable integration by 50% with AI forecasting",
    ],
  },
}

export async function POST(request: NextRequest) {
  try {
    const { query, industry } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Determine which industry to focus on based on query or explicit industry parameter
    let targetIndustry = industry

    if (!targetIndustry) {
      // Try to infer industry from query
      const queryLower = query.toLowerCase()
      for (const [industryKey, _] of Object.entries(industryKnowledge)) {
        if (queryLower.includes(industryKey)) {
          targetIndustry = industryKey
          break
        }
      }
    }

    // Generate response based on query content
    let response = ""
    let knowledgeData = null

    if (targetIndustry && industryKnowledge[targetIndustry as keyof typeof industryKnowledge]) {
      knowledgeData = industryKnowledge[targetIndustry as keyof typeof industryKnowledge]

      if (query.toLowerCase().includes("ai") || query.toLowerCase().includes("artificial intelligence")) {
        response = `Here are the key AI use cases for ${targetIndustry}:\n\n${knowledgeData.aiUseCases.map((useCase, index) => `${index + 1}. ${useCase}`).join("\n")}\n\nThese AI solutions can be integrated with SAP modules like ${knowledgeData.sapModules.slice(0, 3).join(", ")} to maximize business value.`
      } else if (query.toLowerCase().includes("sap")) {
        response = `For ${targetIndustry}, we recommend these SAP modules:\n\n${knowledgeData.sapModules.map((module, index) => `${index + 1}. ${module}`).join("\n")}\n\nThese modules can be enhanced with AI capabilities to drive digital transformation.`
      } else if (query.toLowerCase().includes("challenge") || query.toLowerCase().includes("problem")) {
        response = `Common challenges in ${targetIndustry} include:\n\n${knowledgeData.challenges.map((challenge, index) => `${index + 1}. ${challenge}`).join("\n")}\n\nOur solutions address these through: ${knowledgeData.solutions.join(", ")}.`
      } else if (query.toLowerCase().includes("success") || query.toLowerCase().includes("result")) {
        response = `Here are some success stories from our ${targetIndustry} clients:\n\n${knowledgeData.successStories.map((story, index) => `${index + 1}. ${story}`).join("\n")}`
      } else {
        response = `I can help you with ${targetIndustry} solutions. We offer AI-powered SAP implementations, digital transformation services, and industry-specific solutions. What specific aspect would you like to know more about?`
      }
    } else {
      // General response when no specific industry is identified
      response = `I can help you with industry-specific solutions across manufacturing, healthcare, financial services, retail, logistics, pharmaceuticals, telecommunications, and energy sectors. Each industry has unique AI use cases and SAP module requirements. Which industry are you interested in?`
    }

    return NextResponse.json({
      response,
      industry: targetIndustry,
      knowledge: knowledgeData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Industry query error:", error)
    return NextResponse.json({ error: "Failed to process industry query" }, { status: 500 })
  }
}
