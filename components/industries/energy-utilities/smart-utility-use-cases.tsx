"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Flame,
  Droplets,
  Sun,
  Brain,
  MessageSquare,
  Calculator,
  Wind,
  Battery,
  BarChart3,
  Shield,
  Leaf,
} from "lucide-react"

interface UseCase {
  title: string
  description: string
  features: string[]
  impact: string
  icon: any
}

interface Sector {
  id: string
  name: string
  icon: any
  color: string
  useCases: UseCase[]
}

const sectors: Sector[] = [
  {
    id: "electricity",
    name: "Electricity",
    icon: Zap,
    color: "text-yellow-400",
    useCases: [
      {
        title: "Digital Twin + AI-Powered Load Balancer",
        description: "Real-time grid optimization using digital twin technology and predictive AI algorithms",
        features: [
          "Real-time load forecasting with 95% accuracy",
          "Automated demand response management",
          "Dynamic pricing optimization",
          "Grid stability monitoring and alerts",
        ],
        impact: "35% reduction in peak demand costs",
        icon: Brain,
      },
      {
        title: "Multilingual GenAI Chatbot for Billing/Support",
        description: "AI-powered customer service with natural language processing for billing inquiries",
        features: [
          "24/7 multilingual customer support",
          "Automated billing dispute resolution",
          "Usage pattern analysis and recommendations",
          "Proactive outage notifications",
        ],
        impact: "60% reduction in call center volume",
        icon: MessageSquare,
      },
      {
        title: "RPA for Smart Meter Data → SAP IS-U",
        description: "Automated meter reading and billing integration with SAP utilities management",
        features: [
          "Automated meter data collection",
          "Real-time billing calculation",
          "Exception handling and validation",
          "Seamless SAP IS-U integration",
        ],
        impact: "80% faster billing cycle processing",
        icon: Calculator,
      },
    ],
  },
  {
    id: "gas",
    name: "Gas",
    icon: Flame,
    color: "text-orange-400",
    useCases: [
      {
        title: "Pipeline Integrity AI Monitoring",
        description: "Predictive maintenance and safety monitoring for gas pipeline infrastructure",
        features: [
          "Leak detection with IoT sensors",
          "Pressure anomaly prediction",
          "Automated safety shutoff systems",
          "Compliance reporting automation",
        ],
        impact: "90% reduction in safety incidents",
        icon: Shield,
      },
      {
        title: "Demand Forecasting & Supply Optimization",
        description: "AI-driven gas demand prediction and supply chain optimization",
        features: [
          "Weather-based demand modeling",
          "Supply chain optimization",
          "Storage management automation",
          "Price volatility prediction",
        ],
        impact: "25% improvement in supply efficiency",
        icon: BarChart3,
      },
      {
        title: "Emergency Response Automation",
        description: "Automated emergency response and incident management system",
        features: [
          "Real-time incident detection",
          "Automated crew dispatch",
          "Customer notification systems",
          "Regulatory reporting automation",
        ],
        impact: "50% faster emergency response time",
        icon: Zap,
      },
    ],
  },
  {
    id: "water",
    name: "Water",
    icon: Droplets,
    color: "text-blue-400",
    useCases: [
      {
        title: "Water Quality AI Monitoring",
        description: "Continuous water quality monitoring with predictive contamination detection",
        features: [
          "Real-time quality parameter tracking",
          "Contamination prediction algorithms",
          "Automated treatment adjustments",
          "Regulatory compliance monitoring",
        ],
        impact: "99.9% water quality compliance",
        icon: Shield,
      },
      {
        title: "Smart Distribution Network",
        description: "Intelligent water distribution with leak detection and pressure optimization",
        features: [
          "Leak detection and localization",
          "Pressure optimization algorithms",
          "Flow pattern analysis",
          "Infrastructure health monitoring",
        ],
        impact: "40% reduction in water loss",
        icon: Brain,
      },
      {
        title: "Customer Usage Analytics",
        description: "Advanced analytics for water usage patterns and conservation recommendations",
        features: [
          "Usage pattern analysis",
          "Conservation recommendations",
          "Billing optimization",
          "Drought response planning",
        ],
        impact: "30% improvement in conservation efforts",
        icon: BarChart3,
      },
    ],
  },
  {
    id: "renewables",
    name: "Renewables",
    icon: Sun,
    color: "text-green-400",
    useCases: [
      {
        title: "AI-Powered Solar/Wind Asset Orchestration",
        description: "Intelligent renewable energy asset management and optimization",
        features: [
          "Weather-based generation forecasting",
          "Asset performance optimization",
          "Grid integration management",
          "Maintenance scheduling automation",
        ],
        impact: "45% increase in renewable efficiency",
        icon: Wind,
      },
      {
        title: "Energy Storage Optimization",
        description: "Smart battery management and energy storage optimization",
        features: [
          "Battery health monitoring",
          "Charge/discharge optimization",
          "Grid stabilization services",
          "Revenue optimization strategies",
        ],
        impact: "60% improvement in storage ROI",
        icon: Battery,
      },
      {
        title: "Carbon Credit Automation",
        description: "Automated carbon credit calculation and trading platform",
        features: [
          "Real-time carbon offset calculation",
          "Automated credit generation",
          "Trading platform integration",
          "Verification and reporting",
        ],
        impact: "100% automated carbon credit processing",
        icon: Leaf,
      },
    ],
  },
]

export default function SmartUtilityUseCases() {
  const [activeSector, setActiveSector] = useState("electricity")

  const currentSector = sectors.find((s) => s.id === activeSector) || sectors[0]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4">
            <Brain className="h-4 w-4 mr-2" />
            Smart Utility Solutions
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Intelligent Use Cases Across{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Energy Sectors
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how ESGit's AI-powered solutions transform operations across electricity, gas, water, and renewable
            energy sectors
          </p>
        </motion.div>

        {/* Sector Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sectors.map((sector) => (
            <Button
              key={sector.id}
              variant={activeSector === sector.id ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveSector(sector.id)}
              className={`${
                activeSector === sector.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              } px-6 py-3`}
            >
              <sector.icon className={`h-5 w-5 mr-2 ${sector.color}`} />
              {sector.name}
            </Button>
          ))}
        </div>

        {/* Use Cases Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {currentSector.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gray-800 ${currentSector.color}`}>
                        <useCase.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white leading-tight">{useCase.title}</CardTitle>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{useCase.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {useCase.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Business Impact</span>
                      </div>
                      <p className="text-white font-semibold">{useCase.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Sector Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-4 rounded-xl bg-gray-800 ${currentSector.color}`}>
              <currentSector.icon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{currentSector.name} Sector Overview</h3>
              <p className="text-gray-400">
                Comprehensive AI solutions for modern {currentSector.name.toLowerCase()} utilities
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{currentSector.useCases.length}</div>
              <div className="text-gray-400 text-sm">AI Use Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-gray-400 text-sm">Automation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Monitoring</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
