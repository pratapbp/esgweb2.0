"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Brain, Zap, Shield, CheckCircle, ArrowDown } from "lucide-react"
import { useState, useEffect } from "react"

const blueprintSteps = [
  {
    id: 1,
    title: "Citizen Interaction",
    subtitle: "(Form, Chat, Kiosk)",
    icon: Users,
    color: "blue",
    description: "Multi-channel citizen engagement",
    metrics: { processed: 15420, avgTime: "2.3 min" },
  },
  {
    id: 2,
    title: "AI Intake + SAP Master Record Creation",
    subtitle: "Intelligent data processing",
    icon: Brain,
    color: "purple",
    description: "Automated data validation and record creation",
    metrics: { accuracy: "98.7%", speed: "< 30 sec" },
  },
  {
    id: 3,
    title: "Decisioning via LLM & Rule Engine",
    subtitle: "Smart decision automation",
    icon: Zap,
    color: "orange",
    description: "AI-powered policy compliance and decision making",
    metrics: { decisions: 8950, accuracy: "96.2%" },
  },
  {
    id: 4,
    title: "Smart RPA Disbursement + SAP Workflow Trigger",
    subtitle: "Automated action execution",
    icon: CheckCircle,
    color: "green",
    description: "Seamless benefit delivery and process automation",
    metrics: { disbursed: "$2.4M", time: "4 hrs avg" },
  },
  {
    id: 5,
    title: "Blockchain Audit + Notification Engine",
    subtitle: "Transparent tracking",
    icon: Shield,
    color: "indigo",
    description: "Immutable audit trail and citizen notifications",
    metrics: { transparency: "100%", notifications: 12340 },
  },
]

const outcomes = [
  { label: "Transparent", icon: Shield, color: "blue" },
  { label: "Automated", icon: Zap, color: "green" },
  { label: "Inclusive", icon: Users, color: "purple" },
  { label: "Compliant", icon: CheckCircle, color: "orange" },
]

export function DigitalBlueprint() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % blueprintSteps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-indigo-50 text-indigo-700 border-indigo-200">
            <Zap className="w-4 h-4 mr-2" />
            Digital Public Sector Blueprint
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Citizen-to-Action Automation Flow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how citizen requests transform into automated government actions through our AI-powered blueprint.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Blueprint Flow */}
          <div className="space-y-8">
            {blueprintSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
                onMouseEnter={() => {
                  setIsAnimating(false)
                  setActiveStep(index)
                }}
                onMouseLeave={() => setIsAnimating(true)}
              >
                <Card
                  className={`transition-all duration-500 cursor-pointer ${
                    activeStep === index
                      ? `ring-2 ring-${step.color}-400 shadow-xl bg-${step.color}-50/50`
                      : "hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      {/* Step Icon */}
                      <div
                        className={`w-16 h-16 rounded-full bg-${step.color}-100 flex items-center justify-center relative`}
                      >
                        <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                        {activeStep === index && (
                          <motion.div
                            className={`absolute inset-0 rounded-full bg-${step.color}-400/20`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <p className="text-gray-700">{step.description}</p>
                      </div>

                      {/* Live Metrics */}
                      <div className="text-right space-y-1">
                        {Object.entries(step.metrics).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="text-gray-500 capitalize">{key}:</span>
                            <span className={`ml-2 font-semibold text-${step.color}-600`}>
                              {typeof value === "string" ? value : value.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    {activeStep === index && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                        className={`h-1 bg-${step.color}-400 rounded-full mt-4`}
                      />
                    )}
                  </CardContent>
                </Card>

                {/* Arrow Connector */}
                {index < blueprintSteps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Outcome: Digital Government Excellence</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-xl bg-${outcome.color}-50 border border-${outcome.color}-200`}
                >
                  <outcome.icon className={`w-8 h-8 text-${outcome.color}-600 mx-auto mb-3`} />
                  <p className={`font-semibold text-${outcome.color}-800`}>{outcome.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
