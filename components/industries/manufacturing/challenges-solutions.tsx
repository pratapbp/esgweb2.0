"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Brain, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ManufacturingChallenges() {
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null)

  const challenges = [
    {
      problem: "High unplanned downtime",
      solution: "Predictive Maintenance AI + RPA",
      icon: <Zap className="h-8 w-8 text-red-400" />,
      kpi: "Downtime reduced 38%",
      architecture: {
        title: "AI-Powered Predictive Maintenance Architecture",
        components: [
          "IoT Sensors → Real-time Equipment Data",
          "SAP Asset Intelligence Network → Asset Management",
          "Machine Learning Models → Failure Prediction",
          "RPA Bots → Automated Work Orders",
          "SAP PM → Maintenance Scheduling",
        ],
      },
      copilotComment:
        "Our AI analyzes 50+ equipment parameters in real-time, predicting failures 2-4 weeks in advance with 94% accuracy.",
      details:
        "ESGit's predictive maintenance solution combines IoT sensors, machine learning, and SAP Asset Intelligence to predict equipment failures before they occur. Our RPA bots automatically generate work orders and schedule maintenance, reducing unplanned downtime by up to 38%.",
    },
    {
      problem: "Inventory & demand fluctuations",
      solution: "GenAI Supply Forecasting Model",
      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      kpi: "Inventory costs reduced 25%",
      architecture: {
        title: "AI-Driven Supply Chain Optimization",
        components: [
          "Market Data Ingestion → External APIs",
          "SAP IBP → Integrated Business Planning",
          "GenAI Models → Demand Forecasting",
          "SAP S/4HANA → Inventory Management",
          "Automated Procurement → Supplier Integration",
        ],
      },
      copilotComment:
        "GenAI processes 1000+ market signals daily, improving demand forecast accuracy by 67% compared to traditional methods.",
      details:
        "Our GenAI-powered supply forecasting model analyzes market trends, seasonal patterns, and external factors to optimize inventory levels. Integration with SAP IBP ensures seamless planning and execution across the entire supply chain.",
    },
    {
      problem: "Complex vendor management",
      solution: "SAP Ariba + Blockchain Ledger",
      icon: <Shield className="h-8 w-8 text-green-400" />,
      kpi: "Procurement efficiency up 45%",
      architecture: {
        title: "Blockchain-Enhanced Vendor Management",
        components: [
          "Vendor Onboarding → KYC Automation",
          "SAP Ariba → Procurement Platform",
          "Blockchain Ledger → Contract Verification",
          "AI Scoring → Vendor Performance",
          "Smart Contracts → Automated Payments",
        ],
      },
      copilotComment:
        "Blockchain ensures 100% contract transparency while AI scores vendor performance across 20+ metrics in real-time.",
      details:
        "ESGit combines SAP Ariba's procurement capabilities with blockchain technology for transparent, secure vendor management. AI-powered vendor scoring and smart contracts automate the entire procurement lifecycle.",
    },
    {
      problem: "Safety & compliance inefficiencies",
      solution: "Vision AI + Real-time Alerts",
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      kpi: "Safety incidents down 52%",
      architecture: {
        title: "AI-Powered Safety Monitoring System",
        components: [
          "Computer Vision → Safety Monitoring",
          "IoT Wearables → Worker Health Data",
          "SAP EHS → Environmental Health & Safety",
          "Real-time Alerts → Instant Notifications",
          "Compliance Dashboard → Regulatory Reporting",
        ],
      },
      copilotComment:
        "Computer vision monitors 24/7 for safety violations, while wearable devices track worker vitals and environmental conditions.",
      details:
        "Our Vision AI system continuously monitors manufacturing floors for safety violations, PPE compliance, and hazardous conditions. Integration with SAP EHS ensures comprehensive safety management and regulatory compliance.",
    },
    {
      problem: "Lack of real-time operational data",
      solution: "SAP Digital Manufacturing + IoT",
      icon: <BarChart3 className="h-8 w-8 text-cyan-400" />,
      kpi: "Operational visibility up 85%",
      architecture: {
        title: "Real-time Manufacturing Intelligence",
        components: [
          "IoT Sensors → Production Data",
          "SAP Digital Manufacturing Cloud → Data Integration",
          "Real-time Analytics → Performance Insights",
          "SAP Fiori → Executive Dashboards",
          "Mobile Apps → Shop Floor Visibility",
        ],
      },
      copilotComment:
        "Real-time data from 500+ sensors provides complete visibility into production performance, quality metrics, and resource utilization.",
      details:
        "ESGit's digital manufacturing platform integrates IoT sensors with SAP Digital Manufacturing Cloud to provide real-time visibility into all manufacturing operations. Custom dashboards and mobile apps ensure stakeholders have access to critical data anywhere, anytime.",
    },
  ]

  const toggleExpanded = (index: number) => {
    setExpandedChallenge(expandedChallenge === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-4">
            <Brain className="mr-2 h-4 w-4" />
            AI-First Solutions
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Manufacturing Challenges Meet <span className="gradient-text">AI Innovation</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your manufacturing operations with ESGit's AI-powered solutions that address the industry's most
            pressing challenges.
          </p>
        </div>

        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gray-800">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div>
                            <h3 className="text-lg font-bold text-red-400 mb-1">Problem</h3>
                            <p className="text-gray-300">{challenge.problem}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-blue-400 mb-1">ESGit AI-First Solution</h3>
                            <p className="text-gray-300">{challenge.solution}</p>
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 border border-green-700/50 text-green-400 text-sm font-medium">
                              {challenge.kpi}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {expandedChallenge === index ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedChallenge === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-800"
                    >
                      <div className="p-6 bg-gray-800/30">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-xl font-bold mb-4">{challenge.architecture.title}</h4>
                            <div className="space-y-3">
                              {challenge.architecture.components.map((component, compIndex) => (
                                <div key={compIndex} className="flex items-center">
                                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                                  <span className="text-gray-300">{component}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                              <div className="flex items-start">
                                <Brain className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h5 className="font-bold text-blue-400 mb-2">AI Copilot Insight</h5>
                                  <p className="text-gray-300 text-sm">{challenge.copilotComment}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-bold mb-2">Solution Details</h5>
                              <p className="text-gray-300 text-sm leading-relaxed">{challenge.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
