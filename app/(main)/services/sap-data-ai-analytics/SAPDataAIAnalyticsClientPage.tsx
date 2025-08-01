"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Database,
  BrainCircuit,
  Zap,
  TrendingUp,
  Play,
  Mic,
  MicOff,
  Send,
  Filter,
  Upload,
  CheckCircle,
  Globe,
  Sparkles,
  Eye,
  MessageSquare,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SAPDataAIAnalyticsClientPage() {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null)
  const [copilotQuery, setCopilotQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [copilotResponse, setCopilotResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [caseStudyFilter, setCaseStudyFilter] = useState("all")
  const [workshopForm, setWorkshopForm] = useState({
    name: "",
    email: "",
    company: "",
    department: "",
    currentTools: "",
    goals: [] as string[],
    message: "",
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated neural data mesh background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      connections: number[]
    }[] = []

    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          color: `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 50 + 200)}, 255, ${Math.random() * 0.6 + 0.4})`,
          connections: [],
        })
      }
    }

    createParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Draw particle
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x > canvas.width || p.x < 0) p.speedX *= -1
        if (p.y > canvas.height || p.y < 0) p.speedY *= -1

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2))

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.length = 0
      createParticles()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const keyOfferings = [
    {
      id: "data-intelligence",
      title: "SAP Data Intelligence Cloud",
      description: "Data orchestration across on-prem & cloud systems",
      icon: <Database className="h-8 w-8 text-electric-cyan" />,
      features: [
        "Real-time data pipelines",
        "Multi-cloud orchestration",
        "Data quality monitoring",
        "Automated governance",
      ],
      useCase: "Connect 50+ data sources including SAP ECC, S/4HANA, Salesforce, and external APIs in real-time",
    },
    {
      id: "analytics-cloud",
      title: "SAP Analytics Cloud (SAC)",
      description: "Business intelligence, planning & predictive analytics",
      icon: <BarChart3 className="h-8 w-8 text-neural-violet" />,
      features: ["Interactive dashboards", "Predictive planning", "Story building", "Mobile analytics"],
      useCase: "Create executive dashboards with drill-down capabilities and AI-powered forecasting",
    },
    {
      id: "data-sphere",
      title: "SAP Data Sphere",
      description: "Unified data layer + semantic modeling",
      icon: <Globe className="h-8 w-8 text-success-green" />,
      features: ["Data virtualization", "Semantic layer", "Data marketplace", "Business context"],
      useCase: "Build a single source of truth with semantic models that business users understand",
    },
    {
      id: "mdg",
      title: "Master Data Governance (MDG)",
      description: "Ensure trusted data for enterprise-scale AI",
      icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
      features: ["Data quality rules", "Workflow approval", "Data stewardship", "Compliance tracking"],
      useCase: "Maintain consistent customer, product, and vendor data across all SAP systems",
    },
    {
      id: "genai",
      title: "GenAI Models",
      description: "GPT-enhanced insights from structured SAP data",
      icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
      features: ["Natural language queries", "Automated insights", "Predictive models", "Anomaly detection"],
      useCase: "Ask 'Which customers are at risk of churn?' and get AI-generated analysis with recommendations",
    },
    {
      id: "kpi-monitoring",
      title: "Real-Time KPI Monitoring",
      description: "AI-alerts on anomalies, forecasts, etc.",
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      features: ["Smart alerts", "Threshold monitoring", "Predictive warnings", "Mobile notifications"],
      useCase: "Get instant alerts when sales drop 15% below forecast with AI-suggested corrective actions",
    },
  ]

  const useCases = [
    {
      industry: "Retail",
      icon: "🛍️",
      question: "Which product has highest returns in Q3?",
      answer:
        "AI Analysis: Product SKU-2847 (Wireless Headphones) shows 23% return rate due to battery issues. Recommend supplier quality review.",
      metrics: ["23% return rate", "15% above category average", "$2.3M revenue impact"],
      chartType: "Return Rate Heatmap",
    },
    {
      industry: "Healthcare",
      icon: "🏥",
      question: "Predict patient volumes using AI + claims data",
      answer:
        "Forecast shows 18% increase in cardiology visits next quarter based on seasonal patterns and demographic trends.",
      metrics: ["18% volume increase", "85% prediction accuracy", "3-month forecast horizon"],
      chartType: "Patient Volume Forecast",
    },
    {
      industry: "Manufacturing",
      icon: "🏭",
      question: "Detect underperforming plants via GenAI scorecard",
      answer: "Plant Delta-7 efficiency dropped 12% due to equipment aging. Recommend predictive maintenance schedule.",
      metrics: ["12% efficiency drop", "3 plants flagged", "67% maintenance cost savings"],
      chartType: "Plant Performance Scorecard",
    },
    {
      industry: "Financial Services",
      icon: "🏦",
      question: "Identify fraud patterns in transaction data",
      answer: "AI detected 47 suspicious transactions with 94% confidence, preventing $1.2M in potential fraud losses.",
      metrics: ["47 flagged transactions", "94% accuracy rate", "$1.2M prevented losses"],
      chartType: "Fraud Detection Dashboard",
    },
  ]

  const caseStudies = [
    {
      id: "retail-giant",
      title: "Global Retail Chain Transformation",
      industry: "Retail",
      region: "North America",
      complexity: "Enterprise",
      challenge: "Fragmented data across 2,000+ stores, slow reporting, limited forecasting accuracy",
      solution: "Implemented SAP Data Sphere + Analytics Cloud with GenAI-powered demand forecasting",
      results: [
        "86% improvement in forecast accuracy",
        "90% reduction in report generation time",
        "35% decrease in inventory holding costs",
        "$12M annual savings",
      ],
      image: "/images/case-studies/retail-transformation.jpg",
      testimonial:
        "ESGit's AI-enhanced SAP analytics transformed our decision-making process. We now predict demand with unprecedented accuracy.",
      client: "Sarah Johnson, VP of Analytics",
    },
    {
      id: "manufacturing-leader",
      title: "Smart Manufacturing Analytics",
      industry: "Manufacturing",
      region: "Europe",
      complexity: "Enterprise",
      challenge: "Production inefficiencies, quality issues, reactive maintenance approach",
      solution: "Deployed SAP Data Intelligence with IoT integration and predictive maintenance models",
      results: [
        "67% reduction in unplanned downtime",
        "45% improvement in quality scores",
        "28% increase in overall equipment effectiveness",
        "$8.5M operational savings",
      ],
      image: "/images/case-studies/manufacturing-analytics.jpg",
      testimonial:
        "The predictive insights have revolutionized our operations. We prevent issues before they impact production.",
      client: "Hans Mueller, Operations Director",
    },
    {
      id: "healthcare-network",
      title: "Healthcare Data Unification",
      industry: "Healthcare",
      region: "Asia Pacific",
      complexity: "Multi-site",
      challenge: "Siloed patient data, compliance requirements, resource optimization needs",
      solution: "Unified data platform with SAP Data Sphere and AI-powered patient flow optimization",
      results: [
        "92% improvement in data accuracy",
        "40% reduction in patient wait times",
        "25% increase in resource utilization",
        "100% regulatory compliance",
      ],
      image: "/images/case-studies/healthcare-unification.jpg",
      testimonial:
        "Patient care improved dramatically with unified data and AI insights guiding our resource allocation.",
      client: "Dr. Priya Sharma, Chief Medical Officer",
    },
  ]

  const handleCopilotQuery = async () => {
    if (!copilotQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/copilot/sap-data-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: copilotQuery }),
      })

      const data = await response.json()
      setCopilotResponse(data.response)
    } catch (error) {
      setCopilotResponse("I'm experiencing technical difficulties. Please try again or contact our support team.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    // Voice recognition implementation would go here
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setCopilotQuery("What is the difference between SAC and Tableau?")
        setIsListening(false)
      }, 3000)
    }
  }

  const handleWorkshopSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit to Supabase and trigger webhook
    console.log("Workshop form submitted:", workshopForm)
    // Reset form
    setWorkshopForm({
      name: "",
      email: "",
      company: "",
      department: "",
      currentTools: "",
      goals: [],
      message: "",
    })
  }

  const filteredCaseStudies =
    caseStudyFilter === "all"
      ? caseStudies
      : caseStudies.filter((study) => study.industry.toLowerCase() === caseStudyFilter)

  return (
    <div className="flex flex-col min-h-screen bg-midnight-blue text-luminous-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                From Data Lakes to{" "}
                <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                  AI Lakes
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-electric-cyan">SAP Data Reimagined</h2>
              <p className="text-xl text-luminous-white/80 mb-8 max-w-3xl mx-auto">
                Integrate, govern, and visualize enterprise data with SAP Data Sphere, Analytics Cloud, and GenAI. Where
                ESGit's Intelligence Meets SAP's Enterprise DNA.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue hover:shadow-lg hover:shadow-electric-cyan/30"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Data Readiness Audit
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  See SAP AI in Action
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      <section className="py-20 bg-gradient-to-b from-midnight-blue to-slate-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">AI-Enhanced SAP Data Solutions</h2>
            <p className="text-xl text-luminous-white/70 max-w-3xl mx-auto">
              Transform your enterprise data into intelligent insights with our comprehensive SAP data and AI platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyOfferings.map((offering, index) => (
              <motion.div
                key={offering.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card
                  className="bg-slate-800/50 backdrop-blur-xl border-electric-cyan/20 hover:border-electric-cyan/50 transition-all duration-300 h-full cursor-pointer"
                  onClick={() => setSelectedUseCase(selectedUseCase === offering.id ? null : offering.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      {offering.icon}
                      <CardTitle className="text-xl text-luminous-white group-hover:text-electric-cyan transition-colors">
                        {offering.title}
                      </CardTitle>
                    </div>
                    <p className="text-luminous-white/70">{offering.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2">
                      {offering.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-luminous-white/60">
                          <CheckCircle className="h-4 w-4 text-success-green mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <AnimatePresence>
                    {selectedUseCase === offering.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-electric-cyan/20"
                      >
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-electric-cyan mb-2">Use Case Example:</h4>
                          <p className="text-sm text-luminous-white/80">{offering.useCase}</p>
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

      {/* AI-Powered Use Cases */}
      <section className="py-20 bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">AI-Generated Insights by Industry</h2>
            <p className="text-xl text-luminous-white/70 max-w-3xl mx-auto">
              See how our GenAI models transform complex SAP data into actionable business intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.industry}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-neural-violet/30 hover:border-neural-violet/60 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{useCase.icon}</span>
                      <div>
                        <CardTitle className="text-xl text-luminous-white">{useCase.industry}</CardTitle>
                        <Badge variant="outline" className="text-xs text-neural-violet border-neural-violet/50">
                          {useCase.chartType}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-neural-violet/10 rounded-lg p-4 mb-4">
                      <p className="text-neural-violet font-medium mb-2">❓ Business Question:</p>
                      <p className="text-luminous-white/90 italic">"{useCase.question}"</p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="bg-electric-cyan/10 rounded-lg p-4 mb-4">
                      <p className="text-electric-cyan font-medium mb-2">🧠 AI Analysis:</p>
                      <p className="text-luminous-white/90">{useCase.answer}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {useCase.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-success-green/10 rounded-lg p-3 text-center">
                          <p className="text-success-green font-semibold text-sm">{metric}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Data Architecture Workflow */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-midnight-blue">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Smart Data Architecture Workflow</h2>
            <p className="text-xl text-luminous-white/70 max-w-3xl mx-auto">
              Click each layer to explore GenAI features and capabilities
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col space-y-8">
              {[
                {
                  title: "SAP ECC / S/4HANA",
                  description: "Source Systems",
                  features: ["Real-time data extraction", "Change data capture", "API integration"],
                  color: "from-blue-600 to-blue-800",
                },
                {
                  title: "SAP Data Sphere",
                  description: "Unified Data Layer",
                  features: ["Data virtualization", "Semantic modeling", "Business context"],
                  color: "from-green-600 to-green-800",
                },
                {
                  title: "SAP Data Intelligence",
                  description: "Data Orchestration",
                  features: ["Pipeline automation", "Data quality", "Governance"],
                  color: "from-purple-600 to-purple-800",
                },
                {
                  title: "GenAI Layer → Predictive Models",
                  description: "AI Enhancement",
                  features: ["Natural language queries", "Automated insights", "Anomaly detection"],
                  color: "from-electric-cyan to-neural-violet",
                },
                {
                  title: "SAC Dashboards + ESG Copilot",
                  description: "Intelligent Visualization",
                  features: ["Interactive dashboards", "Voice queries", "AI recommendations"],
                  color: "from-yellow-600 to-orange-600",
                },
              ].map((layer, index) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        className={`bg-gradient-to-r ${layer.color} hover:shadow-2xl hover:shadow-electric-cyan/20 transition-all duration-300 cursor-pointer transform hover:scale-105`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">{layer.title}</h3>
                              <p className="text-white/80">{layer.description}</p>
                            </div>
                            <ArrowRight className="h-6 w-6 text-white" />
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>

                    <DialogContent className="bg-midnight-blue border-electric-cyan/30 text-luminous-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-electric-cyan">{layer.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-luminous-white/80">{layer.description}</p>
                        <div>
                          <h4 className="font-semibold mb-3 text-neural-violet">Key Features:</h4>
                          <ul className="space-y-2">
                            {layer.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <Sparkles className="h-4 w-4 text-electric-cyan mr-2" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {index < 4 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="h-8 w-8 text-electric-cyan rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Copilot Assistant */}
      <section className="py-20 bg-slate-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">AI Copilot Assistant</h2>
              <p className="text-xl text-luminous-white/70">
                Ask questions about SAP data analytics in natural language
              </p>
            </div>

            <Card className="bg-gradient-to-br from-midnight-blue/80 to-slate-900/80 backdrop-blur-xl border-electric-cyan/30">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Sample Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                      "What is the difference between SAC and Tableau?",
                      "Generate a performance dashboard for Retail in SAP",
                      "List most used predictive models by ESGit clients",
                    ].map((question, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="text-left h-auto p-4 border-neural-violet/30 text-luminous-white/80 hover:bg-neural-violet/10 hover:border-neural-violet/60 bg-transparent"
                        onClick={() => setCopilotQuery(question)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{question}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Query Input */}
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Input
                        value={copilotQuery}
                        onChange={(e) => setCopilotQuery(e.target.value)}
                        placeholder="Ask me anything about SAP data analytics..."
                        className="bg-slate-700/50 border-electric-cyan/30 text-luminous-white placeholder-luminous-white/50 pr-12"
                        onKeyPress={(e) => e.key === "Enter" && handleCopilotQuery()}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-400" : "text-electric-cyan"}`}
                        onClick={handleVoiceToggle}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button
                      onClick={handleCopilotQuery}
                      disabled={!copilotQuery.trim() || isLoading}
                      className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue"
                    >
                      {isLoading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-midnight-blue border-t-transparent rounded-full" />
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
                      className="bg-electric-cyan/10 rounded-lg p-6 border border-electric-cyan/30"
                    >
                      <div className="flex items-start space-x-3">
                        <BrainCircuit className="h-6 w-6 text-electric-cyan flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-electric-cyan mb-2">AI Response:</h4>
                          <p className="text-luminous-white/90 whitespace-pre-wrap">{copilotResponse}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {isListening && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                      <div className="inline-flex items-center space-x-2 text-red-400">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                        <span>Listening...</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Case Studies Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Real Case Studies</h2>
            <p className="text-xl text-luminous-white/70 max-w-3xl mx-auto mb-8">
              Discover how leading enterprises transformed their data strategy with our SAP AI solutions
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["all", "retail", "manufacturing", "healthcare"].map((filter) => (
                <Button
                  key={filter}
                  variant={caseStudyFilter === filter ? "default" : "outline"}
                  className={`${
                    caseStudyFilter === filter
                      ? "bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue"
                      : "border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10"
                  }`}
                  onClick={() => setCaseStudyFilter(filter)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-xl border-neural-violet/30 hover:border-neural-violet/60 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Badge className="bg-neural-violet/80 text-white">{study.industry}</Badge>
                      <Badge className="bg-electric-cyan/80 text-midnight-blue">{study.complexity}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-luminous-white">{study.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-luminous-white/60">
                      <span className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        {study.region}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">Challenge:</h4>
                      <p className="text-sm text-luminous-white/80">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-electric-cyan mb-2">Solution:</h4>
                      <p className="text-sm text-luminous-white/80">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-success-green mb-2">Results:</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="text-sm text-luminous-white/80 flex items-center">
                            <TrendingUp className="h-3 w-3 text-success-green mr-2 flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-neural-violet/20 pt-4">
                    <div className="w-full">
                      <blockquote className="text-sm italic text-luminous-white/70 mb-2">
                        "{study.testimonial}"
                      </blockquote>
                      <cite className="text-xs text-electric-cyan">— {study.client}</cite>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Data AI Workshop */}
      <section className="py-20 bg-gradient-to-br from-midnight-blue to-slate-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Book a Data AI Workshop</h2>
              <p className="text-xl text-luminous-white/70">
                Get a personalized assessment of your SAP data readiness and AI potential
              </p>
            </div>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-electric-cyan/30">
              <CardContent className="p-8">
                <form onSubmit={handleWorkshopSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-luminous-white mb-2 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        value={workshopForm.name}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, name: e.target.value })}
                        className="bg-slate-700/50 border-electric-cyan/30 text-luminous-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-luminous-white mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={workshopForm.email}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, email: e.target.value })}
                        className="bg-slate-700/50 border-electric-cyan/30 text-luminous-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-luminous-white mb-2 block">
                        Company *
                      </Label>
                      <Input
                        id="company"
                        value={workshopForm.company}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, company: e.target.value })}
                        className="bg-slate-700/50 border-electric-cyan/30 text-luminous-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-luminous-white mb-2 block">
                        Department
                      </Label>
                      <Select onValueChange={(value) => setWorkshopForm({ ...workshopForm, department: value })}>
                        <SelectTrigger className="bg-slate-700/50 border-electric-cyan/30 text-luminous-white">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-electric-cyan/30">
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currentTools" className="text-luminous-white mb-2 block">
                      Current BI Tools
                    </Label>
                    <Input
                      id="currentTools"
                      value={workshopForm.currentTools}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, currentTools: e.target.value })}
                      placeholder="e.g., SAP BusinessObjects, Tableau, Power BI"
                      className="bg-slate-700/50 border-electric-cyan/30 text-luminous-white"
                    />
                  </div>

                  <div>
                    <Label className="text-luminous-white mb-3 block">Goals (select all that apply)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        "Dashboards",
                        "Forecasting",
                        "Machine Learning",
                        "Real-time Analytics",
                        "Data Governance",
                        "Automation",
                      ].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal}
                            checked={workshopForm.goals.includes(goal)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setWorkshopForm({ ...workshopForm, goals: [...workshopForm.goals, goal] })
                              } else {
                                setWorkshopForm({
                                  ...workshopForm,
                                  goals: workshopForm.goals.filter((g) => g !== goal),
                                })
                              }
                            }}
                            className="border-electric-cyan/30"
                          />
                          <Label htmlFor={goal} className="text-luminous-white/80 text-sm">
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-luminous-white mb-2 block">
                      Additional Information
                    </Label>
                    <Textarea
                      id="message"
                      value={workshopForm.message}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, message: e.target.value })}
                      placeholder="Tell us about your specific challenges or requirements..."
                      className="bg-slate-700/50 border-electric-cyan/30 text-luminous-white min-h-[100px]"
                    />
                  </div>

                  <div className="border-2 border-dashed border-electric-cyan/30 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-electric-cyan mx-auto mb-2" />
                    <p className="text-luminous-white/70 mb-2">Upload Sample Reports (Optional)</p>
                    <p className="text-sm text-luminous-white/50">
                      Drag & drop or click to upload PDF, Excel, or image files
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue hover:shadow-lg hover:shadow-electric-cyan/30 px-8"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Workshop
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-electric-cyan/10 to-neural-violet/10">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Data Strategy?</h2>
            <p className="text-xl text-luminous-white/70 mb-8">
              Join 500+ enterprises who've revolutionized their decision-making with our SAP Data & AI Analytics
              solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue hover:shadow-lg hover:shadow-electric-cyan/30"
              >
                <Eye className="mr-2 h-5 w-5" />
                Schedule a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 bg-transparent"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
