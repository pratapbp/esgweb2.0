"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FlaskConical,
  Users,
  Brain,
  Cog,
  Shield,
  Truck,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
  Activity,
} from "lucide-react"

const pipelineSteps = [
  {
    id: "molecule",
    title: "AI Molecule Engine",
    description: "AI-powered drug discovery and molecular optimization",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-500",
    technologies: ["Machine Learning", "Molecular Modeling", "Property Prediction"],
    status: "completed",
    progress: 100,
    metrics: {
      "Compounds Analyzed": "10,000+",
      "Success Rate": "85%",
      "Time Reduction": "65%",
    },
  },
  {
    id: "clinical",
    title: "SAP Clinical Trial Manager",
    description: "Integrated clinical trial management and patient recruitment",
    icon: Users,
    color: "from-purple-500 to-blue-500",
    technologies: ["SAP Clinical", "Patient Matching", "Protocol Automation"],
    status: "active",
    progress: 75,
    metrics: {
      "Active Trials": "24",
      "Patient Enrollment": "92%",
      "Protocol Compliance": "99.8%",
    },
  },
  {
    id: "protocol",
    title: "ESG Copilot for Protocol Design",
    description: "AI-assisted protocol generation and optimization",
    icon: Brain,
    color: "from-green-500 to-emerald-500",
    technologies: ["GenAI", "NLP", "Regulatory Intelligence"],
    status: "active",
    progress: 60,
    metrics: {
      "Protocols Generated": "156",
      "Approval Rate": "94%",
      "Time Savings": "80%",
    },
  },
  {
    id: "execution",
    title: "RPA-Based Trial Execution",
    description: "Automated trial processes and data collection",
    icon: Cog,
    color: "from-orange-500 to-red-500",
    technologies: ["RPA", "Data Automation", "Quality Control"],
    status: "pending",
    progress: 30,
    metrics: {
      "Automation Rate": "78%",
      "Error Reduction": "95%",
      "Efficiency Gain": "60%",
    },
  },
  {
    id: "compliance",
    title: "GenAI Compliance Tracker + Blockchain Log",
    description: "Real-time compliance monitoring with immutable audit trails",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
    technologies: ["Blockchain", "AI Compliance", "Audit Automation"],
    status: "pending",
    progress: 15,
    metrics: {
      "Compliance Score": "99.9%",
      "Audit Readiness": "100%",
      Documentation: "Automated",
    },
  },
  {
    id: "distribution",
    title: "SAP Batch Release + Distribution",
    description: "Automated batch release and intelligent distribution",
    icon: Truck,
    color: "from-teal-500 to-green-500",
    technologies: ["SAP EWM", "IoT Monitoring", "Supply Chain AI"],
    status: "pending",
    progress: 5,
    metrics: {
      "Release Time": "24 hours",
      "Distribution Accuracy": "99.8%",
      "Cold Chain Integrity": "100%",
    },
  },
]

const outcomes = [
  { label: "Faster FDA Filing", value: "18 months", improvement: "+40%" },
  { label: "Zero Labeling Non-compliance", value: "100%", improvement: "Perfect" },
  { label: "Audit-ready Logs", value: "100%", improvement: "Complete" },
  { label: "Cost Reduction", value: "35%", improvement: "Savings" },
]

export default function SmartPipeline() {
  const [activeStep, setActiveStep] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1) % 101)
    }, 50)

    return () => clearInterval(progressInterval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "active":
        return <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
      case "pending":
        return <Clock className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const ActiveStepIcon = pipelineSteps[activeStep].icon
  const ActiveStepTitle = pipelineSteps[activeStep].title
  const ActiveStepDescription = pipelineSteps[activeStep].description

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">Smart Pharma Pipeline</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            End-to-End{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Transformation
            </span>{" "}
            Workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow the intelligent pharma pipeline from molecule discovery to market distribution, powered by AI, SAP,
            and blockchain technology.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="relative mb-16">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2 z-0" />

          {/* Pipeline Steps */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl ${
                    activeStep === index ? "ring-2 ring-purple-500 scale-105" : ""
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="p-6">
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center`}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      {getStatusIcon(step.status)}
                    </div>

                    {/* Step Info */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{step.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-medium text-gray-700">{step.progress}%</span>
                      </div>
                      <Progress value={step.progress} className="h-2" />
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {step.technologies.slice(0, 2).map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {step.technologies.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{step.technologies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow */}
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-purple-300 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-purple-500" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className={`bg-gradient-to-r ${pipelineSteps[activeStep].color} p-8 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <ActiveStepIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{ActiveStepTitle}</h3>
                    <p className="text-white/90">{ActiveStepDescription}</p>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                  Step {activeStep + 1}
                </Badge>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Technology Stack</h4>
                  <div className="space-y-3">
                    {pipelineSteps[activeStep].technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${pipelineSteps[activeStep].color}`} />
                        <span className="text-gray-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(pipelineSteps[activeStep].metrics).map(([key, value], idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">{key}</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">🎯 Transformation Outcomes</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Measurable results achieved through our integrated pharma transformation pipeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">{outcome.value}</div>
                  <div className="text-blue-100 text-sm mb-2">{outcome.label}</div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{outcome.improvement}</Badge>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.div
              className="inline-flex items-center space-x-2 text-sm text-blue-100"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Real-time pipeline optimization in progress...</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
