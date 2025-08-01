"use client"

import { Calendar } from "@/components/ui/calendar"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  DollarSign,
  FileText,
  BarChart3,
  Brain,
  Zap,
  Phone,
  Building2,
  Smartphone,
  Lightbulb,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Mic,
  Calculator,
  Target,
  Award,
  Sparkles,
} from "lucide-react"

const brimModules = [
  {
    id: "som",
    title: "SAP Subscription Order Management (SOM)",
    description:
      "Intelligent subscription lifecycle management with AI-powered pricing optimization and automated renewal workflows.",
    icon: CreditCard,
    stats: "2.3M+ subscriptions managed",
    features: ["Dynamic pricing models", "Automated renewals", "Churn prediction", "Usage analytics"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "cc",
    title: "SAP Convergent Charging",
    description:
      "Real-time usage charging with ML-powered fraud detection and dynamic rate optimization for digital services.",
    icon: Zap,
    stats: "847M+ transactions processed",
    features: ["Real-time charging", "Fraud detection", "Rate optimization", "Multi-currency support"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "ci",
    title: "SAP Convergent Invoicing",
    description:
      "Unified billing engine that consolidates multiple revenue streams into intelligent, personalized invoices.",
    icon: FileText,
    stats: "4.2M+ invoices generated monthly",
    features: ["Multi-format billing", "Personalized invoices", "Automated dunning", "Payment integration"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "fica",
    title: "SAP Contract Accounting (FI-CA)",
    description: "Advanced contract and account management with AI-driven collections and dispute resolution.",
    icon: BarChart3,
    stats: "1.8M+ contracts managed",
    features: ["Contract lifecycle", "Collections automation", "Dispute management", "Credit scoring"],
    color: "from-orange-500 to-red-500",
  },
  {
    id: "analytics",
    title: "AI-Powered Usage Analytics",
    description:
      "Machine learning insights for revenue optimization, customer behavior analysis, and predictive billing.",
    icon: Brain,
    stats: "99.7% accuracy in predictions",
    features: ["Behavioral analytics", "Revenue forecasting", "Anomaly detection", "Custom dashboards"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "pricing",
    title: "Dynamic Pricing Models",
    description: "AI-driven pricing strategies that adapt to market conditions, usage patterns, and customer segments.",
    icon: DollarSign,
    stats: "23% average revenue increase",
    features: ["Market-based pricing", "Segment optimization", "A/B testing", "Competitive analysis"],
    color: "from-teal-500 to-blue-500",
  },
]

const useCases = [
  {
    industry: "Telecom",
    title: "Real-time charging for 5G and digital content",
    description:
      "Implement usage-based billing for 5G services, IoT devices, and digital content with sub-second charging accuracy.",
    metrics: {
      arpu: "+34%",
      churn: "-28%",
      accuracy: "99.98%",
    },
    chartType: "line",
    color: "from-blue-500 to-cyan-500",
    icon: Phone,
  },
  {
    industry: "Banking & Financial Services",
    title: "Usage-based invoicing for transaction platforms",
    description: "Monetize API calls, transaction volumes, and premium features with transparent, automated billing.",
    metrics: {
      revenue: "+42%",
      disputes: "-67%",
      automation: "94%",
    },
    chartType: "bar",
    color: "from-green-500 to-emerald-500",
    icon: Building2,
  },
  {
    industry: "SaaS & Technology",
    title: "Subscription lifecycle automation with AI triggers",
    description: "Automate upgrades, downgrades, and renewals based on usage patterns and predictive analytics.",
    metrics: {
      retention: "+56%",
      upsells: "+89%",
      ltv: "+73%",
    },
    chartType: "area",
    color: "from-purple-500 to-pink-500",
    icon: Smartphone,
  },
  {
    industry: "Utilities & Energy",
    title: "IoT-based billing using smart meter data",
    description:
      "Process millions of IoT data points for accurate, real-time utility billing with demand-based pricing.",
    metrics: {
      accuracy: "+99.2%",
      disputes: "-78%",
      efficiency: "+45%",
    },
    chartType: "gauge",
    color: "from-orange-500 to-red-500",
    icon: Lightbulb,
  },
]

const workflowSteps = [
  {
    id: 1,
    title: "Order Management",
    description: "Capture and validate customer orders with AI-powered fraud detection",
    tools: ["SAP SOM", "ESG Copilot", "ML Validation"],
    value: "Reduced order errors by 89%",
    icon: CreditCard,
  },
  {
    id: 2,
    title: "Usage Capture & AI Scoring",
    description: "Real-time usage tracking with intelligent pattern recognition",
    tools: ["IoT Sensors", "API Gateways", "ML Analytics"],
    value: "Process 10M+ events/second",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "Convergent Charging",
    description: "Dynamic pricing and charging based on usage patterns",
    tools: ["SAP CC", "Pricing Engine", "Rate Cards"],
    value: "Sub-second charging accuracy",
    icon: Zap,
  },
  {
    id: 4,
    title: "Billing & Invoicing Engine",
    description: "Generate personalized, multi-format invoices automatically",
    tools: ["SAP CI", "Template Engine", "PDF Generator"],
    value: "4.2M invoices processed monthly",
    icon: FileText,
  },
  {
    id: 5,
    title: "Revenue Recognition",
    description: "Automated revenue accounting with compliance validation",
    tools: ["SAP FI-CA", "GAAP Engine", "Audit Trail"],
    value: "99.94% compliance accuracy",
    icon: DollarSign,
  },
  {
    id: 6,
    title: "AI Dashboard & Blockchain Verification",
    description: "Real-time insights with immutable transaction records",
    tools: ["ESG OS", "Blockchain", "Analytics Engine"],
    value: "Reduced revenue leakage by 18%",
    icon: Shield,
  },
]

const caseStudies = {
  telecom: [
    {
      client: "Global Telecom Leader",
      challenge: "Complex 5G service billing with multiple usage tiers and real-time charging requirements",
      solution: "Implemented SAP Convergent Charging with AI-powered fraud detection and dynamic pricing",
      results: {
        revenue: "$12.4M additional recurring revenue",
        accuracy: "99.98% billing accuracy",
        time: "67% faster invoice generation",
      },
    },
    {
      client: "Regional Mobile Operator",
      challenge: "High churn rates due to billing disputes and lack of usage transparency",
      solution: "Deployed SAP BRIM with customer self-service portal and predictive analytics",
      results: {
        churn: "34% reduction in customer churn",
        disputes: "78% fewer billing disputes",
        satisfaction: "4.8/5 customer satisfaction score",
      },
    },
  ],
  banking: [
    {
      client: "Digital Banking Platform",
      challenge: "Manual billing processes for API usage and premium features causing revenue leakage",
      solution: "Automated billing with SAP CI and usage-based pricing models",
      results: {
        automation: "94% billing automation achieved",
        revenue: "$8.7M in recovered revenue",
        efficiency: "89% reduction in manual processes",
      },
    },
  ],
  saas: [
    {
      client: "Enterprise SaaS Provider",
      challenge: "Complex subscription tiers with usage overages and multiple billing cycles",
      solution: "Implemented SAP SOM with AI-driven upgrade recommendations",
      results: {
        upsells: "156% increase in upsells",
        retention: "43% improvement in retention",
        ltv: "$2.3M increase in customer LTV",
      },
    },
  ],
  utilities: [
    {
      client: "Smart Grid Utility",
      challenge: "Processing millions of IoT meter readings for time-of-use billing",
      solution: "Deployed SAP BRIM with IoT integration and demand-based pricing",
      results: {
        processing: "15M+ readings processed daily",
        accuracy: "99.7% billing accuracy",
        savings: "$4.2M in operational savings",
      },
    },
  ],
}

const copilotQuestions = [
  "What is the difference between SAP CI and FI-CA?",
  "Show me BRIM use cases for a digital subscription model",
  "Generate a customer invoice lifecycle using SAP BRIM",
  "How does convergent charging work in real-time?",
  "What are the benefits of AI-powered pricing models?",
  "Compare BRIM vs traditional billing systems",
]

export default function SAPBRIMClientPage() {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1)
  const [selectedIndustry, setSelectedIndustry] = useState("telecom")
  const [copilotQuery, setCopilotQuery] = useState("")
  const [copilotResponse, setCopilotResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    billingModel: "",
    monthlyTransactions: "",
    currentSystem: "",
    goals: [] as string[],
    challenges: "",
  })

  // Auto-advance workflow steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev === 6 ? 1 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleCopilotQuery = async (query: string) => {
    setIsLoading(true)
    setCopilotQuery(query)

    try {
      const response = await fetch("/api/copilot/brim-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      setCopilotResponse(data.response)
    } catch (error) {
      setCopilotResponse("Sorry, I encountered an error processing your query. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/workshop-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          workshopType: "brim",
        }),
      })

      if (response.ok) {
        alert("Thank you! We'll contact you within 24 hours to schedule your Revenue Innovation Workshop.")
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          billingModel: "",
          monthlyTransactions: "",
          currentSystem: "",
          goals: [],
          challenges: "",
        })
      }
    } catch (error) {
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoalChange = (goal: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      goals: checked ? [...prev.goals, goal] : prev.goals.filter((g) => g !== goal),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Revenue Innovation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI-Powered Revenue Innovation with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SAP BRIM
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Monetize subscriptions, usage, and digital services with intelligent billing and revenue management.
              Transform your revenue streams with AI-augmented SAP BRIM solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Target className="w-5 h-5 mr-2" />
                Explore Use Cases
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Revenue Transformation Session
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Is SAP BRIM Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">What Is SAP BRIM?</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              A modular suite from SAP that enables intelligent subscription management, billing, invoicing, and revenue
              accounting. ESGit enhances BRIM with AI, automation, and blockchain verification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brimModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center mb-4`}
                    >
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {module.stats}
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Use Cases */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">AI-Powered BRIM Use Cases</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how leading companies leverage SAP BRIM with AI to transform their revenue models
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.industry}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${useCase.color} flex items-center justify-center`}
                      >
                        <useCase.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="border-white/20 text-white">
                        {useCase.industry}
                      </Badge>
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                      {useCase.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(useCase.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-green-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => handleCopilotQuery(`Show me ${useCase.industry} BRIM implementation details`)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask Copilot
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligent Revenue Workflow */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Intelligent Revenue Workflow</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              End-to-end revenue management powered by AI and automation
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex-1 cursor-pointer transition-all duration-300 ${
                    activeWorkflowStep === step.id ? "scale-105" : "scale-95 opacity-70"
                  }`}
                  onClick={() => setActiveWorkflowStep(step.id)}
                >
                  <Card
                    className={`bg-white/5 backdrop-blur-lg border-white/10 transition-all duration-300 ${
                      activeWorkflowStep === step.id ? "bg-white/10 border-blue-500/50" : ""
                    }`}
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                          activeWorkflowStep === step.id
                            ? "bg-gradient-to-r from-blue-500 to-purple-500"
                            : "bg-white/10"
                        }`}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                      <CardDescription className="text-gray-300 text-sm">{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                        >
                          {step.value}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {step.tools.map((tool, idx) => (
                          <div key={idx} className="text-xs text-gray-400">
                            {tool}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Progress value={(activeWorkflowStep / workflowSteps.length) * 100} className="w-full max-w-md mx-auto" />
              <p className="text-gray-400 text-sm mt-2">
                Step {activeWorkflowStep} of {workflowSteps.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRIM Intelligence Assistant */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">BRIM Intelligence Assistant</h2>
            <p className="text-xl text-gray-300">
              Get instant answers about SAP BRIM implementation, best practices, and optimization strategies
            </p>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="w-6 h-6 mr-2 text-blue-400" />
                Ask the BRIM Expert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {copilotQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 text-xs bg-transparent"
                    onClick={() => handleCopilotQuery(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask about SAP BRIM implementation, pricing models, or best practices..."
                  value={copilotQuery}
                  onChange={(e) => setCopilotQuery(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === "Enter" && handleCopilotQuery(copilotQuery)}
                />
                <Button
                  onClick={() => handleCopilotQuery(copilotQuery)}
                  disabled={isLoading || !copilotQuery.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Brain className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <MessageSquare className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              <AnimatePresence>
                {copilotResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-gray-300 text-sm leading-relaxed">{copilotResponse}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Studies & Benchmarks */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Case Studies & Benchmarks</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from our SAP BRIM implementations across industries
            </p>
          </motion.div>

          <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
              <TabsTrigger value="telecom" className="data-[state=active]:bg-blue-500/20">
                Telecom
              </TabsTrigger>
              <TabsTrigger value="banking" className="data-[state=active]:bg-green-500/20">
                Banking
              </TabsTrigger>
              <TabsTrigger value="saas" className="data-[state=active]:bg-purple-500/20">
                SaaS
              </TabsTrigger>
              <TabsTrigger value="utilities" className="data-[state=active]:bg-orange-500/20">
                Utilities
              </TabsTrigger>
            </TabsList>

            {Object.entries(caseStudies).map(([industry, studies]) => (
              <TabsContent key={industry} value={industry} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {studies.map((study, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Card className="h-full bg-white/5 backdrop-blur-lg border-white/10">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                              {study.client}
                            </Badge>
                            <Award className="w-5 h-5 text-yellow-400" />
                          </div>
                          <CardTitle className="text-white text-lg">Challenge</CardTitle>
                          <CardDescription className="text-gray-300">{study.challenge}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="text-white font-semibold mb-2">Solution</h4>
                            <p className="text-gray-300 text-sm">{study.solution}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-4">Results</h4>
                            <div className="space-y-3">
                              {Object.entries(study.results).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}
                                  </span>
                                  <span className="text-green-400 font-semibold">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Revenue Innovation Workshop Signup */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Revenue Innovation Workshop</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get a personalized SAP BRIM implementation roadmap tailored to your business model and revenue goals
            </p>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-blue-400" />
                Schedule Your Free Workshop
              </CardTitle>
              <CardDescription className="text-gray-300">
                Our experts will analyze your current billing processes and design a custom BRIM solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company *
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="billingModel" className="text-white">
                      Primary Billing Model
                    </Label>
                    <Select
                      value={formData.billingModel}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, billingModel: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select billing model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="usage">Usage-based</SelectItem>
                        <SelectItem value="onetime">One-time</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyTransactions" className="text-white">
                      Monthly Transactions
                    </Label>
                    <Select
                      value={formData.monthlyTransactions}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, monthlyTransactions: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select volume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1k">Less than 1,000</SelectItem>
                        <SelectItem value="1k-10k">1,000 - 10,000</SelectItem>
                        <SelectItem value="10k-100k">10,000 - 100,000</SelectItem>
                        <SelectItem value="100k-1m">100,000 - 1,000,000</SelectItem>
                        <SelectItem value=">1m">More than 1,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSystem" className="text-white">
                    Current Billing System
                  </Label>
                  <Input
                    id="currentSystem"
                    value={formData.currentSystem}
                    onChange={(e) => setFormData((prev) => ({ ...prev, currentSystem: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Salesforce Billing, Zuora, Custom solution"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-white">Primary Goals (select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Reduce revenue leakage",
                      "Optimize ARPU",
                      "Automate dunning processes",
                      "Improve billing accuracy",
                      "Accelerate time-to-revenue",
                      "Enhance customer experience",
                    ].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                          className="border-white/20"
                        />
                        <Label htmlFor={goal} className="text-gray-300 text-sm">
                          {goal}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges" className="text-white">
                    Current Challenges
                  </Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => setFormData((prev) => ({ ...prev, challenges: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Describe your current billing challenges, pain points, or specific requirements..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2"
                    >
                      <Clock className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Calendar className="w-5 h-5 mr-2" />
                  )}
                  Schedule Free Workshop
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating BRIM Calculator Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          BRIM ROI Calculator
        </Button>
      </motion.div>
    </div>
  )
}
