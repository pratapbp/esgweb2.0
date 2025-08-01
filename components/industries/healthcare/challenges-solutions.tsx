"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Calendar,
  Shield,
  Users,
  Brain,
  Database,
  Bot,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const challenges = [
  {
    id: "emr",
    challenge: "EMR complexity & siloed systems",
    solution: "SAP Health + AI data harmonization",
    icon: Database,
    color: "blue",
    kpi: "40% faster data access",
    sapSystem: "SAP Health",
    workflow: [
      "Data ingestion from multiple EMR systems",
      "AI-powered data standardization",
      "Real-time synchronization with SAP Health",
      "Unified patient view across departments",
    ],
    benefits: ["Reduced data silos", "Improved care coordination", "Enhanced decision making"],
  },
  {
    id: "claims",
    challenge: "High claim rejection rates",
    solution: "LLM for intelligent claim processing",
    icon: DollarSign,
    color: "green",
    kpi: "97% claim acceptance rate",
    sapSystem: "SAP Revenue Cloud",
    workflow: [
      "AI pre-validation of claim data",
      "Intelligent coding suggestions",
      "Real-time payer rule checking",
      "Automated resubmission handling",
    ],
    benefits: ["Faster reimbursements", "Reduced administrative costs", "Improved cash flow"],
  },
  {
    id: "scheduling",
    challenge: "Manual scheduling & operations",
    solution: "RPA bots for appointment + resource mgmt",
    icon: Calendar,
    color: "purple",
    kpi: "35% reduction in wait times",
    sapSystem: "SAP Concur",
    workflow: [
      "Intelligent appointment scheduling",
      "Resource optimization algorithms",
      "Automated patient notifications",
      "Dynamic capacity management",
    ],
    benefits: ["Better patient experience", "Optimized resource utilization", "Reduced no-shows"],
  },
  {
    id: "compliance",
    challenge: "Compliance risks (HIPAA, GDPR)",
    solution: "Blockchain audit trail + auto risk scoring",
    icon: Shield,
    color: "red",
    kpi: "100% audit compliance",
    sapSystem: "SAP GRC",
    workflow: [
      "Immutable audit logging",
      "Automated compliance monitoring",
      "Risk assessment algorithms",
      "Real-time violation alerts",
    ],
    benefits: ["Reduced compliance risks", "Automated reporting", "Enhanced security"],
  },
  {
    id: "patient",
    challenge: "Patient experience gaps",
    solution: "AI chatbots, smart kiosks, real-time NLP support",
    icon: Users,
    color: "orange",
    kpi: "90% patient satisfaction",
    sapSystem: "SAP CX",
    workflow: [
      "Multilingual AI chatbot support",
      "Smart kiosk check-in process",
      "Real-time sentiment analysis",
      "Personalized care recommendations",
    ],
    benefits: ["Improved satisfaction", "Reduced staff workload", "Better engagement"],
  },
]

export function ChallengesSolutions() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800">Healthcare Transformation</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Key Challenges & AI-Driven Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform healthcare operations with intelligent automation, compliance management, and patient-centric AI
            solutions.
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-6xl mx-auto">
          {challenges.map((item, index) => {
            const IconComponent = item.icon
            const isExpanded = expandedCard === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-r ${getColorClasses(item.color)} text-white p-6 cursor-pointer`}
                      onClick={() => toggleCard(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white/20 p-3 rounded-lg">
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-1">{item.challenge}</h3>
                            <p className="text-white/90">{item.solution}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-white/20 text-white border-white/30">{item.kpi}</Badge>
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white"
                        >
                          <div className="p-6 space-y-6">
                            {/* SAP System */}
                            <div className="flex items-center space-x-2">
                              <Database size={16} className="text-blue-600" />
                              <span className="font-semibold text-gray-700">SAP System:</span>
                              <Badge variant="outline" className="border-blue-200 text-blue-700">
                                {item.sapSystem}
                              </Badge>
                            </div>

                            {/* Workflow */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                <Bot size={16} className="mr-2 text-purple-600" />
                                AI Workflow
                              </h4>
                              <div className="space-y-2">
                                {item.workflow.map((step, stepIndex) => (
                                  <div key={stepIndex} className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                      {stepIndex + 1}
                                    </div>
                                    <span className="text-gray-700">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Benefits */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                <TrendingUp size={16} className="mr-2 text-green-600" />
                                Key Benefits
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {item.benefits.map((benefit, benefitIndex) => (
                                  <div key={benefitIndex} className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span className="text-gray-700 text-sm">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <Button className={`w-full bg-gradient-to-r ${getColorClasses(item.color)} text-white`}>
                              <Brain className="mr-2 h-4 w-4" />
                              Explore {item.solution} Architecture
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
