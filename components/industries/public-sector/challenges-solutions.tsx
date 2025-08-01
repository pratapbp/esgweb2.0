"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Zap, Shield, FileText, Users, ArrowRight, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"

const challenges = [
  {
    id: 1,
    challenge: "Fragmented citizen data systems",
    solution: "SAP Public Sector Core + Data Lakehouse",
    icon: Database,
    color: "blue",
    beforeKPI: "15+ disconnected systems",
    afterKPI: "1 unified citizen view",
    improvement: "90% data accuracy",
    sapModule: "SAP S/4HANA Public Sector",
    rpaFlow: "Automated data migration & validation",
  },
  {
    id: 2,
    challenge: "Delayed welfare disbursement",
    solution: "RPA + Smart KYC Copilot",
    icon: Zap,
    color: "green",
    beforeKPI: "45 days average processing",
    afterKPI: "4 hours processing time",
    improvement: "97% faster delivery",
    sapModule: "SAP Ariba + SuccessFactors",
    rpaFlow: "End-to-end benefit automation",
  },
  {
    id: 3,
    challenge: "Lack of process transparency",
    solution: "Blockchain audit trail for all workflows",
    icon: Shield,
    color: "purple",
    beforeKPI: "Manual audit logs",
    afterKPI: "Immutable blockchain records",
    improvement: "100% transparency",
    sapModule: "SAP Process Mining",
    rpaFlow: "Real-time audit automation",
  },
  {
    id: 4,
    challenge: "Policy document overload",
    solution: "LLM summarization + AI Policy Simulator",
    icon: FileText,
    color: "orange",
    beforeKPI: "500+ page policy docs",
    afterKPI: "AI-generated summaries",
    improvement: "80% reading time saved",
    sapModule: "SAP Analytics Cloud",
    rpaFlow: "Document processing pipeline",
  },
  {
    id: 5,
    challenge: "Manual casework (benefits, licensing)",
    solution: "ESG Copilot forms + automation APIs",
    icon: Users,
    color: "indigo",
    beforeKPI: "Manual case handling",
    afterKPI: "AI-driven case routing",
    improvement: "75% efficiency gain",
    sapModule: "SAP Build Process Automation",
    rpaFlow: "Intelligent case management",
  },
]

export function ChallengesSolutions() {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            <Shield className="w-4 h-4 mr-2" />
            AI-Powered Solutions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Public Sector Pain Points & ESGit AI Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform government operations with intelligent automation, transparent processes, and citizen-centric
            services.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {challenges.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-l-4 ${
                  selectedChallenge === item.id
                    ? `border-l-${item.color}-500 bg-${item.color}-50/50`
                    : "border-l-gray-200 hover:border-l-blue-400"
                }`}
                onClick={() => setSelectedChallenge(selectedChallenge === item.id ? null : item.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                        <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-800">{item.challenge}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{item.solution}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${selectedChallenge === item.id ? "rotate-90" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                {selectedChallenge === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-0">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Before/After KPIs */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                            Performance Impact
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                              <span className="text-sm text-red-700">Before:</span>
                              <span className="text-sm font-medium text-red-800">{item.beforeKPI}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                              <span className="text-sm text-green-700">After:</span>
                              <span className="text-sm font-medium text-green-800">{item.afterKPI}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                              <span className="text-sm text-blue-700">Improvement:</span>
                              <span className="text-sm font-bold text-blue-800">{item.improvement}</span>
                            </div>
                          </div>
                        </div>

                        {/* SAP Module */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 flex items-center">
                            <Database className="w-4 h-4 mr-2 text-blue-600" />
                            SAP Module Used
                          </h4>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-800">{item.sapModule}</p>
                            <div className="mt-2 flex items-center text-xs text-blue-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Enterprise-grade integration
                            </div>
                          </div>
                        </div>

                        {/* RPA Flow */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-purple-600" />
                            RPA Automation
                          </h4>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm font-medium text-purple-800">{item.rpaFlow}</p>
                            <div className="mt-2 flex items-center text-xs text-purple-600">
                              <Clock className="w-3 h-3 mr-1" />
                              24/7 automated processing
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
