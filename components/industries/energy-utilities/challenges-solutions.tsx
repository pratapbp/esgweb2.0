"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Zap,
  Leaf,
  TrendingUp,
  FileText,
  Settings,
  ChevronDown,
  ChevronUp,
  Activity,
  Database,
  Brain,
  Shield,
} from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  icon: any
  color: string
  solution: {
    title: string
    description: string
    systems: string[]
    kpis: { metric: string; improvement: string }[]
    workflow: string[]
  }
}

const challenges: Challenge[] = [
  {
    id: "outage-response",
    title: "Outage Response Delays",
    description: "Traditional reactive maintenance leads to extended downtime and customer dissatisfaction",
    icon: AlertTriangle,
    color: "text-red-400",
    solution: {
      title: "AI Outage Prediction + RPA Auto-Routing",
      description:
        "Predictive analytics identify potential failures before they occur, with automated dispatch and resource allocation",
      systems: ["SAP PM", "SAP IS-U", "GenAI Analytics", "RPA Bots"],
      kpis: [
        { metric: "Outage Response Time", improvement: "-70%" },
        { metric: "Preventive Maintenance", improvement: "+85%" },
        { metric: "Customer Satisfaction", improvement: "+45%" },
      ],
      workflow: [
        "IoT sensors detect anomalies",
        "AI predicts failure probability",
        "RPA auto-creates work orders",
        "Optimal crew dispatch via GPS",
        "Real-time status updates",
      ],
    },
  },
  {
    id: "emission-tracking",
    title: "Emission Tracking Complexity",
    description: "Manual carbon accounting across distributed assets creates compliance risks and reporting delays",
    icon: Leaf,
    color: "text-green-400",
    solution: {
      title: "SAP ESG + Blockchain Audit Trail",
      description: "Automated carbon tracking with immutable blockchain records for transparent ESG reporting",
      systems: ["SAP ESG", "Blockchain", "IoT Sensors", "GenAI Reports"],
      kpis: [
        { metric: "Reporting Accuracy", improvement: "+99%" },
        { metric: "Audit Preparation Time", improvement: "-80%" },
        { metric: "Compliance Score", improvement: "+95%" },
      ],
      workflow: [
        "Real-time emission monitoring",
        "Automated data validation",
        "Blockchain record creation",
        "AI-generated compliance reports",
        "Stakeholder dashboard updates",
      ],
    },
  },
  {
    id: "load-balancing",
    title: "Peak Demand/Load Balancing",
    description: "Unpredictable energy demand patterns strain grid infrastructure and increase operational costs",
    icon: TrendingUp,
    color: "text-blue-400",
    solution: {
      title: "GenAI-Based Forecasting + Real-Time Control",
      description: "Machine learning models predict demand patterns and automatically optimize grid distribution",
      systems: ["SAP Analytics Cloud", "GenAI Models", "Smart Grid Controls", "IoT Integration"],
      kpis: [
        { metric: "Load Prediction Accuracy", improvement: "+92%" },
        { metric: "Peak Demand Reduction", improvement: "-35%" },
        { metric: "Grid Efficiency", improvement: "+28%" },
      ],
      workflow: [
        "Historical data analysis",
        "Weather pattern integration",
        "AI demand forecasting",
        "Automated load distribution",
        "Dynamic pricing optimization",
      ],
    },
  },
  {
    id: "compliance-reporting",
    title: "Compliance + Reporting Overload",
    description: "Complex regulatory requirements demand extensive manual documentation and reporting processes",
    icon: FileText,
    color: "text-purple-400",
    solution: {
      title: "ESG Copilot + LLM Auto-Report Generation",
      description: "AI-powered compliance assistant generates regulatory reports and maintains audit readiness",
      systems: ["ESG Copilot", "LLM Engine", "SAP GRC", "Document AI"],
      kpis: [
        { metric: "Report Generation Time", improvement: "-90%" },
        { metric: "Compliance Accuracy", improvement: "+98%" },
        { metric: "Audit Preparation", improvement: "-75%" },
      ],
      workflow: [
        "Regulatory requirement mapping",
        "Automated data collection",
        "LLM report generation",
        "Compliance validation",
        "Stakeholder distribution",
      ],
    },
  },
  {
    id: "asset-management",
    title: "Distributed Energy Asset Management",
    description: "Managing diverse renewable assets across multiple locations creates operational complexity",
    icon: Settings,
    color: "text-orange-400",
    solution: {
      title: "IoT Integration + SAP Asset Management + Digital Twin AI",
      description: "Unified asset visibility with digital twin modeling for predictive maintenance and optimization",
      systems: ["SAP EAM", "Digital Twin", "IoT Platform", "AI Analytics"],
      kpis: [
        { metric: "Asset Utilization", improvement: "+40%" },
        { metric: "Maintenance Costs", improvement: "-50%" },
        { metric: "Asset Lifespan", improvement: "+25%" },
      ],
      workflow: [
        "IoT sensor deployment",
        "Digital twin creation",
        "Predictive analytics",
        "Automated maintenance scheduling",
        "Performance optimization",
      ],
    },
  },
]

export default function ChallengesSolutions() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
            <Brain className="h-4 w-4 mr-2" />
            AI-Powered Solutions
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Transform Energy Challenges with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              ESGit Intelligence
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our GenAI + SAP platform addresses the most critical utility challenges with intelligent automation and
            predictive insights
          </p>
        </motion.div>

        <div className="grid gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gray-800 ${challenge.color}`}>
                        <challenge.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{challenge.title}</CardTitle>
                        <p className="text-gray-400 mt-1">{challenge.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCard(challenge.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      {expandedCard === challenge.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedCard === challenge.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <div className="border-t border-gray-700 pt-6">
                          <div className="grid lg:grid-cols-2 gap-8">
                            {/* Solution Overview */}
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                                  <Zap className="h-5 w-5 text-blue-400 mr-2" />
                                  {challenge.solution.title}
                                </h4>
                                <p className="text-gray-300">{challenge.solution.description}</p>
                              </div>

                              {/* Systems Used */}
                              <div>
                                <h5 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                                  <Database className="h-4 w-4 mr-2" />
                                  Systems & Technologies
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {challenge.solution.systems.map((system, idx) => (
                                    <Badge key={idx} variant="outline" className="border-blue-500/30 text-blue-300">
                                      {system}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Workflow */}
                              <div>
                                <h5 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                                  <Activity className="h-4 w-4 mr-2" />
                                  Implementation Workflow
                                </h5>
                                <div className="space-y-2">
                                  {challenge.solution.workflow.map((step, idx) => (
                                    <div key={idx} className="flex items-center space-x-3">
                                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs flex items-center justify-center font-medium">
                                        {idx + 1}
                                      </div>
                                      <span className="text-gray-300 text-sm">{step}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* KPIs & Results */}
                            <div className="space-y-6">
                              <div>
                                <h5 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                                  <Shield className="h-4 w-4 mr-2" />
                                  Performance Improvements
                                </h5>
                                <div className="space-y-4">
                                  {challenge.solution.kpis.map((kpi, idx) => (
                                    <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300 text-sm">{kpi.metric}</span>
                                        <span className="text-green-400 font-semibold">{kpi.improvement}</span>
                                      </div>
                                      <div className="w-full bg-gray-700 rounded-full h-2">
                                        <motion.div
                                          className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                                          initial={{ width: 0 }}
                                          animate={{ width: "85%" }}
                                          transition={{ duration: 1, delay: idx * 0.2 }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Visual Flow Diagram */}
                              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                                <h5 className="text-sm font-medium text-gray-400 mb-4">Solution Architecture</h5>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-400 rounded-full" />
                                    <span className="text-xs text-gray-300">Data Collection Layer</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-purple-400 rounded-full" />
                                    <span className="text-xs text-gray-300">AI Processing Engine</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                                    <span className="text-xs text-gray-300">Automated Response System</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-orange-400 rounded-full" />
                                    <span className="text-xs text-gray-300">Reporting & Analytics</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
