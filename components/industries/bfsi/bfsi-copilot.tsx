"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Send, Loader2, CheckCircle, AlertTriangle, FileText, BarChart3, Shield, Zap } from "lucide-react"

const sampleQueries = [
  "Simulate SAP Fioneer integration for wealth management",
  "Give me 3 fraud scenarios for retail banking",
  "Show compliance checklist for PCI-DSS & ISO 27001",
  "Analyze credit risk for fintech lending platform",
  "Design AML workflow for cross-border payments",
]

const mockResponses = {
  simulate: {
    type: "architecture",
    title: "SAP Fioneer Wealth Management Integration",
    content: {
      dataFlow: [
        "Client Data Ingestion → SAP Fioneer Core",
        "Risk Assessment Engine → Portfolio Optimization",
        "Compliance Layer → Regulatory Reporting",
        "AI Analytics → Investment Recommendations",
      ],
      modules: ["SAP Fioneer Investment Management", "SAP Analytics Cloud", "SAP GRC"],
      auditChecks: ["Data Encryption", "Access Controls", "Transaction Logging"],
      recommendations: [
        "Implement real-time risk monitoring",
        "Enable automated rebalancing",
        "Set up ESG compliance tracking",
      ],
    },
  },
  fraud: {
    type: "scenarios",
    title: "Retail Banking Fraud Scenarios",
    content: {
      scenarios: [
        {
          name: "Account Takeover",
          description: "Unauthorized access using stolen credentials",
          indicators: ["Unusual login patterns", "Device fingerprint mismatch", "Geolocation anomalies"],
          mitigation: "Multi-factor authentication + behavioral biometrics",
        },
        {
          name: "Synthetic Identity Fraud",
          description: "Fake identities created using real and fabricated information",
          indicators: ["Inconsistent credit history", "Rapid account activity", "Unusual application patterns"],
          mitigation: "AI-powered identity verification + consortium data sharing",
        },
        {
          name: "Transaction Laundering",
          description: "Disguising illegal transactions as legitimate business",
          indicators: ["High-volume micro-transactions", "Unusual merchant categories", "Velocity anomalies"],
          mitigation: "Graph analytics + pattern recognition algorithms",
        },
      ],
    },
  },
  compliance: {
    type: "checklist",
    title: "PCI-DSS & ISO 27001 Compliance Checklist",
    content: {
      pciDss: [
        "Install and maintain firewall configuration",
        "Do not use vendor-supplied defaults for passwords",
        "Protect stored cardholder data",
        "Encrypt transmission of cardholder data",
        "Use and regularly update anti-virus software",
      ],
      iso27001: [
        "Information security policies",
        "Risk assessment and treatment",
        "Asset management",
        "Access control",
        "Incident management",
      ],
      automation: "ESGit Compliance Copilot can automate 85% of these checks",
    },
  },
}

export function BFSICopilot() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)

  const handleQuery = async (queryText: string) => {
    setIsLoading(true)
    setQuery(queryText)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock response based on query content
    let mockResponse = null
    if (queryText.toLowerCase().includes("simulate") || queryText.toLowerCase().includes("fioneer")) {
      mockResponse = mockResponses.simulate
    } else if (queryText.toLowerCase().includes("fraud")) {
      mockResponse = mockResponses.fraud
    } else if (queryText.toLowerCase().includes("compliance") || queryText.toLowerCase().includes("pci")) {
      mockResponse = mockResponses.compliance
    } else {
      mockResponse = {
        type: "general",
        title: "BFSI AI Analysis",
        content: {
          summary:
            "Based on your query, I've analyzed the relevant BFSI domain requirements and can provide specific recommendations for your use case.",
          recommendations: [
            "Implement AI-powered risk assessment",
            "Enable real-time fraud detection",
            "Automate compliance reporting",
            "Integrate with existing SAP systems",
          ],
        },
      }
    }

    setResponse(mockResponse)
    setIsLoading(false)
  }

  const renderResponse = () => {
    if (!response) return null

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">{response.title}</h3>
        </div>

        {response.type === "architecture" && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Data Flow Diagram
              </h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                {response.content.dataFlow.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                SAP/ESGit Modules Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {response.content.modules.map((module: string, idx: number) => (
                  <Badge key={idx} variant="secondary">
                    {module}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Real-time Audit Checks
              </h4>
              <div className="space-y-2">
                {response.content.auditChecks.map((check: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {response.type === "scenarios" && (
          <div className="space-y-4">
            {response.content.scenarios.map((scenario: any, idx: number) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    {scenario.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm mb-1">Indicators:</h5>
                    <div className="flex flex-wrap gap-1">
                      {scenario.indicators.map((indicator: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {indicator}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-1">Mitigation:</h5>
                    <p className="text-sm text-green-600 dark:text-green-400">{scenario.mitigation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {response.type === "checklist" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  PCI-DSS Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {response.content.pciDss.map((req: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  ISO 27001 Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {response.content.iso27001.map((control: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{control}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-4 px-4 py-2">
          <Brain className="w-4 h-4 mr-2" />
          BFSI Copilot Assistant
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-Powered BFSI Intelligence
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Get instant insights, architecture recommendations, and compliance guidance for your financial services
          transformation
        </p>
      </motion.div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Ask the BFSI Copilot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sample Queries */}
          <div>
            <h3 className="font-medium mb-3">Try these sample queries:</h3>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sampleQuery, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuery(sampleQuery)}
                  className="text-xs"
                  disabled={isLoading}
                >
                  {sampleQuery}
                </Button>
              ))}
            </div>
          </div>

          {/* Query Input */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask about SAP Fioneer integration, fraud scenarios, compliance requirements, or any BFSI challenge..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
              rows={3}
            />
            <Button onClick={() => handleQuery(query)} disabled={isLoading || !query.trim()} className="self-end">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-8"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-600 dark:text-gray-400">Analyzing your BFSI requirements...</span>
              </div>
            </motion.div>
          )}

          {/* Response */}
          {renderResponse()}
        </CardContent>
      </Card>
    </section>
  )
}
