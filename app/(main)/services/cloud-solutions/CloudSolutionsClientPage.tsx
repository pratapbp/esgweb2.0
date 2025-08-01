"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Cloud,
  Brain,
  Shield,
  Zap,
  DollarSign,
  Cpu,
  Network,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Play,
  Pause,
  Download,
  MessageSquare,
  TrendingUp,
  Globe,
  Layers,
  GitBranch,
  Workflow,
  Target,
  Award,
  Send,
  Mic,
  MicOff,
} from "lucide-react"

// Animated Background Component
const CloudAIBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>(
    [],
  )

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />

      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* AI Brain Network */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-20">
        <motion.div
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="relative w-full h-full">
            {/* Central Brain */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />

            {/* Connection Nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-cyan-400 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                  transform: `rotate(${angle}deg) translate(80px, -4px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Core Offerings Data
const coreOfferings = [
  {
    icon: Cloud,
    title: "Cloud Migration & Modernization",
    description: "SAP to SAP Cloud, ECC to RISE, legacy replatforming",
    metrics: "70% faster deployment, 50% cost reduction",
    features: [
      "SAP S/4HANA Cloud migration",
      "Legacy system modernization",
      "Zero-downtime transitions",
      "Data integrity assurance",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "AI-Powered DevOps",
    description: "Predictive CI/CD, intelligent monitoring, anomaly alerts",
    metrics: "85% faster deployments, 90% fewer incidents",
    features: [
      "Predictive deployment analytics",
      "Intelligent monitoring",
      "Auto-healing infrastructure",
      "Anomaly detection",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: DollarSign,
    title: "FinOps & Cloud Cost Optimization",
    description: "AI-based cost governance, usage prediction, right-sizing",
    metrics: "40% cost savings with AI governance",
    features: ["Real-time cost monitoring", "Usage prediction", "Resource right-sizing", "Budget optimization"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Cpu,
    title: "MLOps Enablement",
    description: "Train/Deploy/Monitor LLMs across cloud-native GPUs",
    metrics: "4x faster model training with auto-scaling",
    features: ["GPU auto-scaling", "Model versioning", "A/B testing", "Performance monitoring"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Cloud Security & Compliance",
    description: "Zero-trust architecture, blockchain audit trails",
    metrics: "100% compliance, zero security breaches",
    features: ["Zero-trust architecture", "Blockchain audit trails", "Compliance automation", "Threat detection"],
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Network,
    title: "Multi-Cloud Strategy",
    description: "Design + deploy hybrid solutions using Kubernetes, Terraform",
    metrics: "99.99% availability, vendor independence",
    features: ["Kubernetes orchestration", "Terraform automation", "Hybrid cloud design", "Vendor independence"],
    color: "from-indigo-500 to-purple-500",
  },
]

// Workflow Stages Data
const workflowStages = [
  {
    id: "assessment",
    title: "Assessment",
    description: "AI-powered cloud readiness evaluation",
    tools: ["Cloud Assessment AI", "Dependency Mapper", "Risk Analyzer"],
    kpis: ["95% accuracy in migration planning", "60% faster assessment"],
    icon: Target,
  },
  {
    id: "migration",
    title: "Migration Engine",
    description: "ESG AI-powered migration automation",
    tools: ["Migration AI Engine", "Data Sync Tools", "Rollback Automation"],
    kpis: ["Zero-downtime migrations", "70% faster execution"],
    icon: Workflow,
  },
  {
    id: "architecture",
    title: "Architecture Design",
    description: "GenAI-based architecture optimization",
    tools: ["Architecture AI", "Cost Optimizer", "Security Scanner"],
    kpis: ["40% cost optimization", "99.9% availability design"],
    icon: Layers,
  },
  {
    id: "cicd",
    title: "CI/CD Orchestration",
    description: "Auto orchestrated deployment pipelines",
    tools: ["Pipeline AI", "Quality Gates", "Deployment Automation"],
    kpis: ["85% faster deployments", "90% fewer failures"],
    icon: GitBranch,
  },
  {
    id: "monitoring",
    title: "Monitoring & Healing",
    description: "RPA-powered self-healing systems",
    tools: ["Monitoring AI", "Auto-healing RPA", "Anomaly Detection"],
    kpis: ["99.9% uptime", "80% auto-resolution"],
    icon: BarChart3,
  },
  {
    id: "optimization",
    title: "Optimization",
    description: "Cost + compliance continuous optimization",
    tools: ["FinOps AI", "Compliance Monitor", "Performance Tuner"],
    kpis: ["40% cost savings", "100% compliance"],
    icon: TrendingUp,
  },
]

// Industry Use Cases Data
const industryUseCases = [
  {
    industry: "Retail",
    useCase: "AI-inventory management with real-time sync",
    benefit: "35% inventory reduction",
    tech: "Built with Terraform + RPA + GPT-4 Agents",
    icon: "🛍️",
  },
  {
    industry: "Healthcare",
    useCase: "HIPAA-compliant GenAI in Azure OpenAI stack",
    benefit: "100% compliance maintained",
    tech: "Azure OpenAI + HIPAA compliance framework",
    icon: "🏥",
  },
  {
    industry: "Manufacturing",
    useCase: "SAP on GCP with predictive maintenance APIs",
    benefit: "60% reduced downtime",
    tech: "GCP + SAP S/4HANA + ML APIs",
    icon: "🏭",
  },
  {
    industry: "BFSI",
    useCase: "Secure cloud vaults + ESG reporting via blockchain",
    benefit: "Zero security breaches",
    tech: "Multi-cloud + Blockchain + ESG compliance",
    icon: "🏦",
  },
]

// Case Studies Data
const caseStudies = [
  {
    id: 1,
    title: "$1.2M saved in annual cloud spend with ESG FinOps AI",
    description: "Global manufacturing company reduced cloud costs by 40% using our AI-powered FinOps platform",
    metrics: ["40% cost reduction", "6-month ROI", "24/7 monitoring"],
    industry: "Manufacturing",
  },
  {
    id: 2,
    title: "Legacy to cloud migration completed in 7 weeks",
    description: "Fortune 500 retailer migrated entire SAP landscape with zero downtime",
    metrics: ["Zero downtime", "7-week timeline", "99.9% availability"],
    industry: "Retail",
  },
  {
    id: 3,
    title: "LLMs trained 4x faster using auto-scaling GPUs on GCP",
    description: "Healthcare AI startup accelerated model training with intelligent GPU orchestration",
    metrics: ["4x faster training", "60% cost savings", "Auto-scaling"],
    industry: "Healthcare",
  },
]

export default function CloudSolutionsClientPage() {
  const [selectedStage, setSelectedStage] = useState("assessment")
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [copilotQuery, setCopilotQuery] = useState("")
  const [copilotResponse, setCopilotResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    cloudProviders: [] as string[],
    currentStack: "",
    aiUsage: "",
    budgetTier: "",
    requirements: "",
  })

  // Auto-advance case studies
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  // Handle Copilot Query
  const handleCopilotQuery = async (query: string) => {
    setIsLoading(true)
    setCopilotQuery(query)

    try {
      const response = await fetch("/api/copilot/cloud-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      setCopilotResponse(data.response)
    } catch (error) {
      setCopilotResponse("Sorry, I encountered an error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Blueprint Generation
  const handleBlueprintGeneration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/cloud-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Handle successful blueprint generation
        alert("Blueprint generated successfully! Check your email for the detailed report.")
      }
    } catch (error) {
      alert("Error generating blueprint. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    "Compare RISE with SAP vs AWS Lift and Shift",
    "Suggest a hybrid cloud for a pharma ERP workload",
    "Optimize my cloud cost for GenAI compute",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CloudAIBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Accelerate with{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI-Native Cloud
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-200">Scale with Confidence.</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                From cloud migration to intelligent workload orchestration—modernize on AWS, Azure, GCP, or SAP Cloud
                with GenAI + Blockchain security.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Target className="mr-2 h-5 w-5" />
                Assess My Cloud Readiness
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                <Globe className="mr-2 h-5 w-5" />
                Explore Industry Deployments
              </Button>
            </div>

            {/* Live Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              {[
                { label: "Projects Migrated", value: "45+", icon: Cloud },
                { label: "Savings Generated", value: "$2.5M", icon: DollarSign },
                { label: "SLA Improvement", value: "99.9%", icon: TrendingUp },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-blue-400/30 mb-4">
                    <metric.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-gray-300">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Smart Cloud Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cloud transformation powered by AI, automation, and intelligent orchestration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreOfferings.map((offering, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardHeader>
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${offering.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <offering.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2">{offering.title}</CardTitle>
                    <CardDescription className="text-gray-300">{offering.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-3 border border-green-500/30">
                        <div className="text-green-400 font-semibold text-sm">{offering.metrics}</div>
                      </div>

                      <div className="space-y-2">
                        {offering.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-gray-300 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full text-blue-400 hover:text-white hover:bg-blue-600/20 mt-4"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligent Cloud Workflow */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Intelligent Cloud Workflow</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI-powered end-to-end cloud transformation process
            </p>
          </motion.div>

          {/* Workflow Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {workflowStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedStage === stage.id ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setSelectedStage(stage.id)}
              >
                <Card
                  className={`h-full transition-all duration-300 ${
                    selectedStage === stage.id
                      ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-400/50"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  } backdrop-blur-sm`}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                        selectedStage === stage.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "bg-gradient-to-r from-gray-600 to-gray-700"
                      }`}
                    >
                      <stage.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-white">{stage.title}</CardTitle>
                    <CardDescription className="text-gray-300">{stage.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Stage Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-8">
                  {(() => {
                    const stage = workflowStages.find((s) => s.id === selectedStage)
                    if (!stage) return null

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-4">{stage.title} Details</h3>
                          <p className="text-gray-300 mb-6">{stage.description}</p>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-lg font-semibold text-blue-400 mb-2">Tools & Technologies</h4>
                              <div className="space-y-2">
                                {stage.tools.map((tool, index) => (
                                  <div key={index} className="flex items-center text-gray-300">
                                    <Zap className="h-4 w-4 text-yellow-400 mr-2" />
                                    {tool}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-4">Key Performance Indicators</h4>
                          <div className="space-y-4">
                            {stage.kpis.map((kpi, index) => (
                              <div
                                key={index}
                                className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-500/30"
                              >
                                <div className="flex items-center">
                                  <Award className="h-5 w-5 text-green-400 mr-2" />
                                  <span className="text-green-400 font-semibold">{kpi}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Industry-Specific Applications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tailored cloud solutions for every industry vertical
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryUseCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{useCase.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{useCase.industry}</h3>
                        <p className="text-gray-300 mb-3">{useCase.useCase}</p>
                        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-3 border border-green-500/30 mb-3">
                          <div className="text-green-400 font-semibold text-sm">{useCase.benefit}</div>
                        </div>
                        <div className="text-xs text-gray-400 bg-gray-800/50 rounded-full px-3 py-1 inline-block">
                          {useCase.tech}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Cloud Copilot */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ESG Cloud Copilot Assistant</h2>
            <p className="text-xl text-gray-300">Get expert cloud architecture advice powered by AI</p>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardContent className="p-8">
              {/* Quick Questions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Questions:</h3>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopilotQuery(question)}
                      className="border-blue-400/50 text-blue-400 hover:bg-blue-400/20 text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Query Input */}
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about cloud architecture, migration strategies, cost optimization..."
                    value={copilotQuery}
                    onChange={(e) => setCopilotQuery(e.target.value)}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === "Enter" && handleCopilotQuery(copilotQuery)}
                  />
                  <Button
                    onClick={() => setIsListening(!isListening)}
                    variant="outline"
                    size="icon"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={() => handleCopilotQuery(copilotQuery)}
                    disabled={isLoading || !copilotQuery.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Response */}
                {copilotResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-500/30"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-400 font-semibold mb-2">ESG Cloud Copilot</h4>
                        <div className="text-gray-300 whitespace-pre-wrap">{copilotResponse}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Studies Carousel */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Success Stories</h2>
            <p className="text-xl text-gray-300">Real results from our cloud transformation projects</p>
          </motion.div>

          <div className="relative">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    {caseStudies.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCaseStudy(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentCaseStudy === index ? "bg-blue-500" : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/10"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCaseStudy}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-500/30">
                          {caseStudies[currentCaseStudy].industry}
                        </Badge>
                        <h3 className="text-2xl font-bold text-white mb-4">{caseStudies[currentCaseStudy].title}</h3>
                        <p className="text-gray-300 mb-6">{caseStudies[currentCaseStudy].description}</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {caseStudies[currentCaseStudy].metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-500/30"
                          >
                            <div className="flex items-center">
                              <Award className="h-5 w-5 text-green-400 mr-3" />
                              <span className="text-green-400 font-semibold">{metric}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cloud Blueprint Form */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get My Cloud Blueprint</h2>
            <p className="text-xl text-gray-300">
              AI-powered cloud architecture recommendations tailored to your needs
            </p>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardContent className="p-8">
              <form onSubmit={handleBlueprintGeneration} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company" className="text-white">
                      Company *
                    </Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Cloud Provider(s) *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["AWS", "Azure", "GCP", "SAP Cloud"].map((provider) => (
                      <div key={provider} className="flex items-center space-x-2">
                        <Checkbox
                          id={provider}
                          checked={formData.cloudProviders.includes(provider)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                cloudProviders: [...formData.cloudProviders, provider],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                cloudProviders: formData.cloudProviders.filter((p) => p !== provider),
                              })
                            }
                          }}
                          className="border-white/20"
                        />
                        <Label htmlFor={provider} className="text-white text-sm">
                          {provider}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentStack" className="text-white">
                      Current ERP Stack
                    </Label>
                    <Select
                      value={formData.currentStack}
                      onValueChange={(value) => setFormData({ ...formData, currentStack: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select your current stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sap-ecc">SAP ECC</SelectItem>
                        <SelectItem value="sap-s4hana">SAP S/4HANA</SelectItem>
                        <SelectItem value="oracle">Oracle ERP</SelectItem>
                        <SelectItem value="microsoft">Microsoft Dynamics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budgetTier" className="text-white">
                      Budget Tier
                    </Label>
                    <Select
                      value={formData.budgetTier}
                      onValueChange={(value) => setFormData({ ...formData, budgetTier: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup ($10K - $50K)</SelectItem>
                        <SelectItem value="growth">Growth ($50K - $200K)</SelectItem>
                        <SelectItem value="enterprise">Enterprise ($200K+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="aiUsage" className="text-white">
                    GenAI/MLOps Usage
                  </Label>
                  <Select
                    value={formData.aiUsage}
                    onValueChange={(value) => setFormData({ ...formData, aiUsage: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select AI maturity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No AI usage</SelectItem>
                      <SelectItem value="basic">Basic AI tools</SelectItem>
                      <SelectItem value="intermediate">Custom ML models</SelectItem>
                      <SelectItem value="advanced">Advanced MLOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="requirements" className="text-white">
                    Specific Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                    placeholder="Describe your specific cloud requirements, compliance needs, or technical challenges..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Generating Blueprint...
                    </div>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Generate My Cloud Blueprint
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating Workshop Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Book Cloud Workshop
        </Button>
      </motion.div>
    </div>
  )
}
