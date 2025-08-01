import { type NextRequest, NextResponse } from "next/server"

const aiKnowledgeBase = {
  "sap ariba": {
    useCases: [
      "Automated vendor onboarding with AI document processing",
      "Intelligent spend analysis and category optimization",
      "AI-powered contract risk assessment",
      "Predictive supplier performance scoring",
      "Automated invoice matching and exception handling",
    ],
    technologies: ["GenAI for document processing", "ML for spend analytics", "RPA for workflow automation"],
    benefits: "40% faster procurement cycles, 25% cost savings, 90% automation rate",
  },
  "procurement approval": {
    solution: "AI-Powered Procurement Bot",
    architecture: [
      "Request intake via conversational AI",
      "Document analysis using Computer Vision",
      "Policy validation with rule engine",
      "Automated routing and approvals",
      "Real-time status updates",
    ],
    features: ["Natural language processing", "Multi-level approval workflows", "Exception handling", "Audit trails"],
    roi: "60% faster approvals, 85% reduction in manual reviews",
  },
  "ocr vs cv": {
    comparison: {
      "OCR (Optical Character Recognition)": {
        strengths: ["Text extraction", "Structured documents", "High accuracy for clean text"],
        limitations: ["Limited to text", "Struggles with poor quality", "No context understanding"],
        bestFor: "Invoice processing, form digitization",
      },
      "Computer Vision": {
        strengths: ["Image understanding", "Object detection", "Context awareness", "Handles complex layouts"],
        limitations: ["More complex setup", "Higher computational needs"],
        bestFor: "Complex document analysis, quality control, medical imaging",
      },
    },
    recommendation: "Use OCR for simple text extraction, Computer Vision for intelligent document understanding",
  },
  "bfsi digital ai": {
    useCases: [
      "Fraud detection using ML algorithms",
      "Customer service chatbots with NLP",
      "Document AI for KYC compliance",
      "Credit risk assessment models",
      "Automated claims processing",
      "Regulatory compliance monitoring",
    ],
    technologies: ["Machine Learning", "Natural Language Processing", "Computer Vision", "RPA"],
    metrics: "75% fraud detection improvement, 60% faster KYC, 40% cost reduction",
  },
  "vendor risk genai": {
    solution: "GenAI Vendor Risk Assessment Platform",
    capabilities: [
      "Automated risk questionnaire generation",
      "Contract analysis and risk identification",
      "Real-time risk scoring updates",
      "Regulatory compliance checking",
      "Risk mitigation recommendations",
    ],
    workflow: [
      "Data collection from multiple sources",
      "AI-powered risk analysis",
      "Automated scoring and categorization",
      "Alert generation for high-risk vendors",
      "Continuous monitoring and updates",
    ],
    benefits: "70% faster risk assessments, 90% accuracy in risk identification",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const lowerQuery = query.toLowerCase()
    let response = ""

    // Check for specific topics in the knowledge base
    if (lowerQuery.includes("sap ariba") || lowerQuery.includes("ariba")) {
      const data = aiKnowledgeBase["sap ariba"]
      response = `**Top AI Use Cases for SAP Ariba:**

${data.useCases.map((useCase, index) => `${index + 1}. ${useCase}`).join("\n")}

**Key Technologies:**
${data.technologies.join(", ")}

**Expected Benefits:**
${data.benefits}

**Next Steps:**
- Schedule a technical deep-dive session
- Review your current Ariba setup
- Identify quick-win automation opportunities`
    } else if (lowerQuery.includes("procurement approval") || lowerQuery.includes("procurement bot")) {
      const data = aiKnowledgeBase["procurement approval"]
      response = `**${data.solution}**

**Architecture Overview:**
${data.architecture.map((step, index) => `${index + 1}. ${step}`).join("\n")}

**Key Features:**
${data.features.map((feature) => `• ${feature}`).join("\n")}

**ROI Impact:**
${data.roi}

**Implementation Timeline:** 6-8 weeks
**Integration:** SAP Ariba, Oracle Procurement, custom ERP systems`
    } else if (lowerQuery.includes("ocr") && lowerQuery.includes("cv")) {
      const data = aiKnowledgeBase["ocr vs cv"]
      response = `**OCR vs Computer Vision Comparison**

**OCR (Optical Character Recognition):**
Strengths: ${data.comparison["OCR (Optical Character Recognition)"].strengths.join(", ")}
Limitations: ${data.comparison["OCR (Optical Character Recognition)"].limitations.join(", ")}
Best For: ${data.comparison["OCR (Optical Character Recognition)"].bestFor}

**Computer Vision:**
Strengths: ${data.comparison["Computer Vision"].strengths.join(", ")}
Limitations: ${data.comparison["Computer Vision"].limitations.join(", ")}
Best For: ${data.comparison["Computer Vision"].bestFor}

**Recommendation:**
${data.recommendation}

**For Invoice Processing Specifically:**
- Use OCR for standard invoice formats
- Use Computer Vision for complex, varied layouts
- Combine both for maximum accuracy and flexibility`
    } else if (
      lowerQuery.includes("bfsi") ||
      lowerQuery.includes("banking") ||
      lowerQuery.includes("financial services")
    ) {
      const data = aiKnowledgeBase["bfsi digital ai"]
      response = `**Digital AI Use Cases for BFSI:**

${data.useCases.map((useCase, index) => `${index + 1}. ${useCase}`).join("\n")}

**Core Technologies:**
${data.technologies.join(", ")}

**Industry Metrics:**
${data.metrics}

**Regulatory Considerations:**
• GDPR compliance for data processing
• PCI DSS for payment data security
• SOX compliance for financial reporting
• Model explainability for regulatory approval

**Quick Wins:**
• Chatbot for customer service (2-4 weeks)
• Document AI for KYC (4-6 weeks)
• Fraud detection models (8-12 weeks)`
    } else if (lowerQuery.includes("vendor risk") || lowerQuery.includes("supplier risk")) {
      const data = aiKnowledgeBase["vendor risk genai"]
      response = `**${data.solution}**

**Core Capabilities:**
${data.capabilities.map((cap) => `• ${cap}`).join("\n")}

**Workflow Process:**
${data.workflow.map((step, index) => `${index + 1}. ${step}`).join("\n")}

**Key Benefits:**
${data.benefits}

**Data Sources Integrated:**
• Financial databases (D&B, Bloomberg)
• News and media monitoring
• Regulatory databases
• Internal transaction history
• Third-party risk feeds

**Compliance Features:**
• GDPR data handling
• SOX audit trails
• Industry-specific regulations`
    } else if (lowerQuery.includes("genai") || lowerQuery.includes("generative ai")) {
      response = `**Generative AI Solutions Overview:**

**Document Generation:**
• Automated proposal creation
• Contract drafting assistance
• Report summarization
• Email response generation

**Code & Development:**
• Code generation and review
• API documentation
• Test case creation
• Technical documentation

**Business Applications:**
• Sales enablement content
• Training material creation
• Process documentation
• Customer communication

**Implementation Approach:**
1. Use case identification (1-2 weeks)
2. Proof of concept development (2-4 weeks)
3. Model fine-tuning (2-3 weeks)
4. Production deployment (1-2 weeks)

**ROI Expectations:**
• 60-80% time savings in content creation
• 40-50% improvement in consistency
• 25-35% faster time-to-market`
    } else if (lowerQuery.includes("rpa") || lowerQuery.includes("automation")) {
      response = `**Intelligent Automation (RPA) Solutions:**

**Process Categories:**
• Finance: Invoice processing, reconciliation, reporting
• HR: Onboarding, payroll processing, compliance
• Operations: Data entry, system integration, monitoring
• Customer Service: Ticket routing, response automation

**Technology Stack:**
• UiPath, Blue Prism, or Automation Anywhere
• AI/ML integration for intelligent decision making
• OCR for document processing
• API integration for system connectivity

**Implementation Phases:**
1. Process discovery and mapping (2-3 weeks)
2. Bot development and testing (3-4 weeks)
3. User acceptance testing (1-2 weeks)
4. Production deployment (1 week)

**Expected ROI:**
• 70-90% reduction in manual effort
• 99%+ accuracy in automated processes
• 24/7 operation capability
• 6-12 month payback period`
    } else if (lowerQuery.includes("computer vision") || lowerQuery.includes("cv")) {
      response = `**Computer Vision Solutions:**

**Document Processing:**
• Intelligent document classification
• Data extraction from complex layouts
• Quality control and validation
• Multi-language support

**Industrial Applications:**
• Quality control and defect detection
• Safety compliance monitoring
• Inventory management
• Predictive maintenance

**Healthcare Applications:**
• Medical image analysis
• Diagnostic assistance
• Patient monitoring
• Compliance verification

**Technology Components:**
• Deep learning models (CNN, YOLO)
• Image preprocessing pipelines
• Real-time processing capabilities
• Cloud and edge deployment options

**Accuracy Metrics:**
• 95-99% accuracy in object detection
• Sub-second processing times
• 24/7 automated monitoring
• Scalable to millions of images`
    } else {
      // General AI consultation response
      response = `**AI Solution Consultation:**

Based on your query, here are some relevant AI solutions:

**Immediate Opportunities:**
• Process automation with RPA
• Document AI for data extraction
• Chatbots for customer service
• Predictive analytics for forecasting

**Assessment Questions:**
1. What's your primary business challenge?
2. What processes take the most manual effort?
3. What data sources are available?
4. What's your current technology stack?

**Next Steps:**
• Schedule a detailed discovery session
• Conduct a process assessment
• Develop a proof of concept
• Create an implementation roadmap

**Contact Options:**
• Book a 30-minute consultation
• Request a technical demo
• Get a custom solution proposal

Would you like me to elaborate on any specific area or help you with a more targeted question?`
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing AI query:", error)
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}
