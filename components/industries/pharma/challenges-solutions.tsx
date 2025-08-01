"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Clock, FileText, Thermometer, AlertTriangle, Globe } from "lucide-react"

const challenges = [
  {
    id: "clinical-trials",
    challenge: "Lengthy Clinical Trials",
    solution: "AI Trial Matching + Protocol Generator",
    description: "Reduce trial duration by 40% with intelligent patient matching and automated protocol generation",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
    sapModule: "SAP Clinical Trial Management",
    kpis: [
      { metric: "Trial Duration Reduction", value: "40%" },
      { metric: "Patient Matching Accuracy", value: "95%" },
      { metric: "Protocol Generation Speed", value: "10x faster" },
    ],
    features: [
      "AI-powered patient eligibility screening",
      "Automated protocol generation with GenAI",
      "Real-time trial monitoring and optimization",
      "Predictive enrollment forecasting",
      "Regulatory compliance automation",
    ],
    technologies: [
      "SAP Clinical Data Management",
      "GenAI Protocol Designer",
      "RPA Automation",
      "Blockchain Audit Trail",
    ],
  },
  {
    id: "regulatory-docs",
    challenge: "Regulatory Documentation",
    solution: "GenAI Document Automation + Version Control",
    description: "Streamline regulatory submissions with AI-powered document generation and compliance tracking",
    icon: FileText,
    color: "from-purple-500 to-blue-500",
    sapModule: "SAP Document Management",
    kpis: [
      { metric: "Documentation Time Reduction", value: "80%" },
      { metric: "Compliance Accuracy", value: "99.8%" },
      { metric: "Audit Preparation Time", value: "75% faster" },
    ],
    features: [
      "Automated regulatory document generation",
      "Multi-language compliance support",
      "Version control with blockchain audit",
      "Real-time regulatory updates integration",
      "AI-powered compliance checking",
    ],
    technologies: ["SAP GRC", "GenAI Document Engine", "Blockchain Ledger", "Multi-language NLP"],
  },
  {
    id: "cold-chain",
    challenge: "Cold Chain Visibility",
    solution: "SAP EWM + IoT Integration with Blockchain",
    description: "Ensure product integrity with real-time temperature monitoring and immutable tracking",
    icon: Thermometer,
    color: "from-green-500 to-emerald-500",
    sapModule: "SAP Extended Warehouse Management",
    kpis: [
      { metric: "Temperature Compliance", value: "99.9%" },
      { metric: "Product Loss Reduction", value: "85%" },
      { metric: "Audit Trail Completeness", value: "100%" },
    ],
    features: [
      "Real-time temperature and humidity monitoring",
      "Predictive maintenance for cold storage",
      "Automated alert systems for deviations",
      "Blockchain-based immutable tracking",
      "Integration with logistics partners",
    ],
    technologies: ["SAP EWM", "IoT Sensors", "Blockchain Network", "Predictive Analytics"],
  },
  {
    id: "supply-disruption",
    challenge: "Pharma Supply Disruption",
    solution: "Predictive Risk Scoring & AI-Driven Sourcing",
    description: "Mitigate supply chain risks with AI-powered demand forecasting and alternative sourcing",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
    sapModule: "SAP Integrated Business Planning",
    kpis: [
      { metric: "Supply Risk Reduction", value: "70%" },
      { metric: "Demand Forecast Accuracy", value: "92%" },
      { metric: "Alternative Sourcing Speed", value: "5x faster" },
    ],
    features: [
      "AI-powered demand forecasting",
      "Real-time supplier risk assessment",
      "Automated alternative sourcing",
      "Supply chain scenario modeling",
      "Regulatory compliance verification",
    ],
    technologies: ["SAP IBP", "AI Risk Engine", "Supplier Network", "Scenario Planning"],
  },
  {
    id: "labeling-compliance",
    challenge: "Labeling Compliance Issues",
    solution: "RPA + Multilingual GenAI Labeling Workflows",
    description: "Automate labeling processes with AI-powered multilingual support and compliance verification",
    icon: Globe,
    color: "from-indigo-500 to-purple-500",
    sapModule: "SAP Product Lifecycle Management",
    kpis: [
      { metric: "Labeling Error Reduction", value: "95%" },
      { metric: "Multi-country Compliance", value: "100%" },
      { metric: "Labeling Process Speed", value: "8x faster" },
    ],
    features: [
      "Automated multilingual label generation",
      "Real-time regulatory compliance checking",
      "Version control and change management",
      "Integration with packaging systems",
      "Audit trail for all label changes",
    ],
    technologies: ["SAP PLM", "GenAI Translation", "RPA Workflows", "Compliance Database"],
  },
]

export default function ChallengesSolutions() {
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null)

  const toggleExpansion = (challengeId: string) => {
    setExpandedChallenge(expandedChallenge === challengeId ? null : challengeId)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Pharma Challenges & Solutions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transforming Pharma{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Challenges
            </span>{" "}
            into Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how ESG's intelligent solutions address the most critical challenges in pharmaceutical development,
            manufacturing, and compliance.
          </p>
        </motion.div>

        {/* Challenges Grid */}
        <div className="space-y-6">
          {challenges.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  {/* Main Challenge Row */}
                  <div
                    className={`bg-gradient-to-r ${item.color} p-6 text-white cursor-pointer`}
                    onClick={() => toggleExpansion(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{item.challenge}</h3>
                          <p className="text-white/90 text-sm">{item.solution}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-white/20 text-white border-white/30">{item.sapModule}</Badge>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                          {expandedChallenge === item.id ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedChallenge === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Description & Features */}
                            <div className="lg:col-span-2">
                              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{item.description}</p>

                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                {item.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`} />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>

                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Technology Stack</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* KPIs */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Measurable Impact</h4>
                              <div className="space-y-4">
                                {item.kpis.map((kpi, idx) => (
                                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                                    <div className="text-sm text-gray-600">{kpi.metric}</div>
                                  </div>
                                ))}
                              </div>

                              <Button
                                className={`w-full mt-6 bg-gradient-to-r ${item.color} hover:opacity-90 text-white`}
                              >
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Pharma Operations?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Discover how our integrated SAP, AI, and blockchain solutions can address your specific challenges and
              accelerate your pharmaceutical innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                Schedule Assessment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold bg-transparent"
              >
                Download Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
