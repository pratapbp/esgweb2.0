"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, TrendingUp, Shield, Clock, FileText, ArrowRight, Brain, Zap } from "lucide-react"

const challengeSolutions = [
  {
    challenge: "Legacy system fragmentation",
    solution: "SAP Fioneer + BTP Integration Suite",
    icon: AlertTriangle,
    solutionIcon: CheckCircle,
    beforeKPI: "15+ disconnected systems",
    afterKPI: "Unified platform",
    improvement: "90% faster data flow",
    sapModule: "SAP BTP, SAP Fioneer",
    rpaFlow: "Automated data sync across 15 legacy systems",
    color: "blue",
  },
  {
    challenge: "Fraudulent transactions",
    solution: "GenAI pattern detection + anomaly scoring",
    icon: Shield,
    solutionIcon: Brain,
    beforeKPI: "2.3% fraud rate",
    afterKPI: "0.1% fraud rate",
    improvement: "98.9% detection accuracy",
    sapModule: "SAP Fraud Management",
    rpaFlow: "Real-time ML scoring with auto-blocking",
    color: "red",
  },
  {
    challenge: "Slow credit risk assessments",
    solution: "LLM-based customer scoring models",
    icon: Clock,
    solutionIcon: TrendingUp,
    beforeKPI: "7-14 days approval",
    afterKPI: "< 1 hour approval",
    improvement: "95% faster decisions",
    sapModule: "SAP Credit Management",
    rpaFlow: "AI-driven credit scoring with bias mitigation",
    color: "green",
  },
  {
    challenge: "Regulatory pressure",
    solution: "ESGit compliance Copilot + Blockchain Audit Trail",
    icon: FileText,
    solutionIcon: Zap,
    beforeKPI: "40 hours audit prep",
    afterKPI: "12 hours audit prep",
    improvement: "70% time reduction",
    sapModule: "SAP GRC, SAP Audit Management",
    rpaFlow: "Automated compliance reporting with blockchain verification",
    color: "purple",
  },
  {
    challenge: "Inefficient claims & underwriting",
    solution: "AI triage + workflow automation (for insurance)",
    icon: AlertTriangle,
    solutionIcon: CheckCircle,
    beforeKPI: "21 days claim processing",
    afterKPI: "3 days claim processing",
    improvement: "85% faster processing",
    sapModule: "SAP Insurance, SAP Workflow",
    rpaFlow: "Computer vision + NLP for automated claim assessment",
    color: "orange",
  },
]

export function ChallengesSolutions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
          BFSI Challenges + ESGit AI Solutions
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Transform Financial Services with AI-Powered Solutions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Overcome traditional BFSI challenges with our comprehensive AI and SAP integration platform
        </p>
      </motion.div>

      <div className="space-y-6">
        {challengeSolutions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  {/* Challenge Side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-red-100 dark:bg-red-900/30`}>
                        <item.icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Challenge</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.challenge}</p>
                      </div>
                    </div>

                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4"
                      >
                        <div className="text-sm text-red-700 dark:text-red-300">
                          <strong>Before:</strong> {item.beforeKPI}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center lg:justify-start">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>

                  {/* Solution Side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-green-100 dark:bg-green-900/30`}>
                        <item.solutionIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">AI Solution</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.solution}</p>
                      </div>
                    </div>

                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 space-y-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-green-700 dark:text-green-300">After:</strong>
                            <div className="text-green-600 dark:text-green-400">{item.afterKPI}</div>
                          </div>
                          <div>
                            <strong className="text-blue-700 dark:text-blue-300">Improvement:</strong>
                            <div className="text-blue-600 dark:text-blue-400">{item.improvement}</div>
                          </div>
                        </div>

                        <div className="border-t pt-3 space-y-2">
                          <div className="text-sm">
                            <strong className="text-purple-700 dark:text-purple-300">SAP Modules:</strong>
                            <div className="text-purple-600 dark:text-purple-400">{item.sapModule}</div>
                          </div>
                          <div className="text-sm">
                            <strong className="text-orange-700 dark:text-orange-300">RPA Flow:</strong>
                            <div className="text-orange-600 dark:text-orange-400">{item.rpaFlow}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Brain className="w-5 h-5 mr-2" />
          Explore All BFSI Solutions
        </Button>
      </motion.div>
    </section>
  )
}
