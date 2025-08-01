"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Brain,
  Bot,
  MessageSquare,
  Eye,
  BarChart3,
  Link,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  ArrowRight,
  Send,
  Mic,
  MicOff,
  Lightbulb,
  Factory,
  CreditCard,
  ShoppingCart,
  Stethoscope,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react"

const aiCategories = [
  {
    id: "genai",
    title: "Generative AI (GenAI)",
    description: "GPT-powered use cases for docs, summaries, code, sales enablement",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    features: ["Document Generation", "Code Assistance", "Content Creation", "Sales Enablement"],
    useCase: "Automated proposal generation reducing sales cycle by 40%",
    metrics: "85% faster content creation",
  },
  {
    id: "rpa",
    title: "Intelligent Automation (RPA)",
    description: "Automate repetitive workflows in finance, HR, operations",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    features: ["Process Automation", "Workflow Orchestration", "Exception Handling", "Audit Trails"],
    useCase: "Invoice processing automation saving 200+ hours monthly",
    metrics: "90% reduction in manual tasks",
  },
  {
    id: "conversational",
    title: "Conversational AI",
    description: "Build enterprise voice & chat assistants with Whisper, GPT, and LangChain",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
    features: ["Voice Assistants", "Chatbots", "NLP Processing", "Multi-language Support"],
    useCase: "Customer service bot handling 80% of inquiries automatically",
    metrics: "70% reduction in support tickets",
  },
  {
    id: "vision",
    title: "Computer Vision",
    description: "Document parsing, face match, object recognition, medical image processing",
    icon: Eye,
    color: "from-orange-500 to-red-500",
    features: ["OCR & Document AI", "Facial Recognition", "Object Detection", "Medical Imaging"],
    useCase: "Automated quality control in manufacturing with 99.5% accuracy",
    metrics: "95% defect detection improvement",
  },
  {
    id: "ml",
    title: "Custom ML Models",
    description: "Forecasting, churn prediction, fraud detection with LLM ops",
    icon: BarChart3,
    color: "from-indigo-500 to-purple-500",
    features: ["Predictive Analytics", "Anomaly Detection", "Recommendation Systems", "MLOps Pipeline"],
    useCase: "Churn prediction model increasing retention by 25%",
    metrics: "92% prediction accuracy",
  },
  {
    id: "blockchain",
    title: "AI + Blockchain",
    description: "Data lineage, smart contracts, LCA + compliance tracking on-chain",
    icon: Link,
    color: "from-yellow-500 to-orange-500",
    features: ["Smart Contracts", "Data Provenance", "Compliance Tracking", "Decentralized AI"],
    useCase: "Supply chain transparency with immutable audit trails",
    metrics: "100% data integrity assurance",
  },
]

const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    application: "AI-powered diagnosis + auto triage from clinical notes",
    color: "text-red-500",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    application: "Predictive maintenance bots + safety alerts via CV",
    color: "text-blue-500",
  },
  {
    id: "bfsi",
    name: "BFSI",
    icon: CreditCard,
    application: "Chatbots for fraud handling, document AI for KYC",
    color: "text-green-500",
  },
  {
    id: "retail",
    name: "Retail",
    icon: ShoppingCart,
    application: "Smart recommendations + AI POS assistants",
    color: "text-purple-500",
  },
]

const successStories = [
  {
    metric: "88%",
    description: "productivity boost in claims processing",
    industry: "Insurance",
    icon: TrendingUp,
  },
  {
    metric: "35%",
    description: "faster vendor onboarding with AI Copilot",
    industry: "Procurement",
    icon: Clock,
  },
  {
    metric: "70%",
    description: "reduction in helpdesk volumes with GenAI",
    industry: "IT Support",
    icon: CheckCircle,
  },
  {
    metric: "99.5%",
    description: "accuracy in automated quality control",
    industry: "Manufacturing",
    icon: Target,
  },
]

const useCaseBuilderOptions = {
  functions: ["Finance", "HR", "Support", "Sales", "Operations", "Compliance"],
  goals: ["Automate", "Predict", "Summarize", "Generate", "Analyze", "Optimize"],
  tools: ["GenAI", "Computer Vision", "RPA", "ML Models", "Conversational AI", "Blockchain"],
}

export default function DigitalAISolutionsClientPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [copilotQuery, setCopilotQuery] = useState("")
  const [copilotResponse, setCopilotResponse] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  // Use Case Builder State
  const [selectedFunction, setSelectedFunction] = useState("")
  const [selectedGoal, setSelectedGoal] = useState("")
  const [selectedTool, setSelectedTool] = useState("")
  const [generatedUseCase, setGeneratedUseCase] = useState<any>(null)

  // Discovery Session Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    painPoints: "",
    aiMaturity: "",
    requestedDemo: [],
    phone: "",
  })

  // Auto-advance success stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleCopilotQuery = async () => {
    if (!copilotQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/copilot/ai-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: copilotQuery }),
      })

      const data = await response.json()
      setCopilotResponse(data.response)
    } catch (error) {
      setCopilotResponse("Sorry, I encountered an error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const generateUseCase = () => {
    if (!selectedFunction || !selectedGoal || !selectedTool) return

    const useCases = {
      "Finance-Automate-RPA": {
        title: "Automated Invoice Processing",
        description: "Streamline accounts payable with intelligent document processing and approval workflows",
        kpi: "85% reduction in processing time",
        architecture: ["Document Capture", "AI Extraction", "Validation Rules", "ERP Integration"],
        roi: "$2.5M annual savings",
      },
      "HR-Predict-ML Models": {
        title: "Employee Churn Prediction",
        description: "Identify at-risk employees and implement retention strategies proactively",
        kpi: "25% improvement in retention",
        architecture: ["Data Collection", "Feature Engineering", "ML Pipeline", "Alert System"],
        roi: "40% reduction in hiring costs",
      },
      "Support-Generate-GenAI": {
        title: "Intelligent Knowledge Base",
        description: "Auto-generate support articles and responses from historical tickets",
        kpi: "60% faster resolution time",
        architecture: ["Ticket Analysis", "Content Generation", "Quality Review", "Knowledge Update"],
        roi: "50% reduction in support costs",
      },
    }

    const key = `${selectedFunction}-${selectedGoal}-${selectedTool}`
    const defaultCase = {
      title: `${selectedGoal} ${selectedFunction} with ${selectedTool}`,
      description: `Leverage ${selectedTool} to ${selectedGoal.toLowerCase()} key ${selectedFunction.toLowerCase()} processes`,
      kpi: "Significant efficiency improvement",
      architecture: ["Data Input", "AI Processing", "Business Logic", "Output Integration"],
      roi: "Measurable business impact",
    }

    setGeneratedUseCase(useCases[key] || defaultCase)
  }

  const handleDiscoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/ai-discovery-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Discovery session request submitted successfully!")
        setFormData({
          name: "",
          email: "",
          company: "",
          industry: "",
          painPoints: "",
          aiMaturity: "",
          requestedDemo: [],
          phone: "",
        })
      }
    } catch (error) {
      alert("Error submitting request. Please try again.")
    }
  }

  const quickQuestions = [
    "What are top AI use cases for SAP Ariba?",
    "Build an AI bot for procurement approval",
    "Compare OCR vs CV in invoice processing",
    "Show Digital AI use cases for BFSI",
    "Give me a GenAI solution for vendor risk",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100, 0],
                y: [0, Math.random() * 100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Digital AI Engine</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Redefining Digital
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Transformation Through AI
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              From GenAI and ML to blockchain and intelligent automation—scale faster with ESGit's Digital AI Engine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Your AI Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
              >
                <Target className="w-5 h-5 mr-2" />
                View Industry Use Cases
              </Button>
            </div>
          </motion.div>

          {/* Animated AI Brain */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
                <Brain className="w-32 h-32 text-purple-400" />
              </div>

              {/* Branching Workflows */}
              {aiCategories.slice(0, 4).map((category, index) => {
                const angle = index * 90 - 45
                const radius = 150
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius

                return (
                  <motion.div
                    key={category.id}
                    className="absolute w-12 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/40"
                    style={{
                      left: `calc(50% + ${x}px - 24px)`,
                      top: `calc(50% + ${y}px - 24px)`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  >
                    <category.icon className="w-6 h-6 text-purple-300" />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What We Offer</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-gray-300">{category.description}</CardDescription>
                  </CardHeader>

                  <AnimatePresence>
                    {selectedCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-purple-300 font-semibold mb-2">Key Features:</h4>
                              <div className="flex flex-wrap gap-2">
                                {category.features.map((feature) => (
                                  <Badge key={feature} variant="secondary" className="bg-purple-500/20 text-purple-300">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-purple-300 font-semibold mb-2">Use Case:</h4>
                              <p className="text-gray-300 text-sm">{category.useCase}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-green-400 font-semibold">{category.metrics}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-500/50 text-purple-300 bg-transparent"
                              >
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
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

      {/* Use Case Builder */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">GenAI-Powered Use Case Builder</h2>
            <p className="text-xl text-gray-300">Build your custom AI solution in seconds</p>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                Live Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-purple-300 mb-2 block">Function</Label>
                  <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select function" />
                    </SelectTrigger>
                    <SelectContent>
                      {useCaseBuilderOptions.functions.map((func) => (
                        <SelectItem key={func} value={func}>
                          {func}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-purple-300 mb-2 block">Goal</Label>
                  <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {useCaseBuilderOptions.goals.map((goal) => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-purple-300 mb-2 block">Tool</Label>
                  <Select value={selectedTool} onValueChange={setSelectedTool}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select tool" />
                    </SelectTrigger>
                    <SelectContent>
                      {useCaseBuilderOptions.tools.map((tool) => (
                        <SelectItem key={tool} value={tool}>
                          {tool}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={generateUseCase}
                disabled={!selectedFunction || !selectedGoal || !selectedTool}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Use Case
              </Button>

              <AnimatePresence>
                {generatedUseCase && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{generatedUseCase.title}</h3>
                    <p className="text-gray-300 mb-4">{generatedUseCase.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-purple-300 font-semibold mb-2">Key Metric:</h4>
                        <p className="text-green-400">{generatedUseCase.kpi}</p>
                      </div>
                      <div>
                        <h4 className="text-purple-300 font-semibold mb-2">ROI Impact:</h4>
                        <p className="text-green-400">{generatedUseCase.roi}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-purple-300 font-semibold mb-2">Architecture:</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedUseCase.architecture.map((step: string, index: number) => (
                          <Badge key={index} className="bg-purple-500/20 text-purple-300">
                            {index + 1}. {step}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <Target className="w-4 h-4 mr-2" />
                      Request Implementation
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Industry-Specific Applications</h2>
            <p className="text-xl text-gray-300">Tailored AI solutions for every industry</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4">
                      <industry.icon className={`w-8 h-8 ${industry.color}`} />
                    </div>
                    <CardTitle className="text-white">{industry.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm text-center">{industry.application}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Copilot */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ask the AI Strategist</h2>
            <p className="text-xl text-gray-300">Get instant answers to your AI questions</p>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                AI Copilot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                    onClick={() => setCopilotQuery(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={copilotQuery}
                  onChange={(e) => setCopilotQuery(e.target.value)}
                  placeholder="Ask anything about AI solutions..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === "Enter" && handleCopilotQuery()}
                />
                <Button
                  onClick={() => setIsListening(!isListening)}
                  variant="outline"
                  size="icon"
                  className="border-purple-500/50 text-purple-300"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleCopilotQuery}
                  disabled={isLoading || !copilotQuery.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {copilotResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-gray-300 whitespace-pre-wrap">{copilotResponse}</div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">AI Success Stories & Benchmarks</h2>
            <p className="text-xl text-gray-300">Real results from real implementations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${currentStoryIndex === index ? "ring-2 ring-purple-500" : ""}`}
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                      <story.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-green-400 mb-2">{story.metric}</div>
                    <p className="text-white font-medium mb-2">{story.description}</p>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {story.industry}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Session */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Book an AI Discovery Session</h2>
            <p className="text-xl text-gray-300">Let's explore how AI can transform your business</p>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-400" />
                AI Discovery Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDiscoverySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-purple-300">Name *</Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-purple-300">Email *</Label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-purple-300">Company *</Label>
                    <Input
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-purple-300">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.id} value={industry.id}>
                            {industry.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-purple-300">Current Pain Points</Label>
                  <Textarea
                    value={formData.painPoints}
                    onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Describe your current challenges..."
                  />
                </div>

                <div>
                  <Label className="text-purple-300">AI Maturity Level</Label>
                  <Select
                    value={formData.aiMaturity}
                    onValueChange={(value) => setFormData({ ...formData, aiMaturity: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select maturity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - Just starting</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Some AI projects</SelectItem>
                      <SelectItem value="advanced">Advanced - Mature AI strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-purple-300 mb-3 block">Request Demo Of:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Bot", "ML Model", "Dashboard", "RPA Workflow", "Vision AI", "GenAI Assistant"].map((demo) => (
                      <div key={demo} className="flex items-center space-x-2">
                        <Checkbox
                          id={demo}
                          checked={formData.requestedDemo.includes(demo)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({ ...formData, requestedDemo: [...formData.requestedDemo, demo] })
                            } else {
                              setFormData({
                                ...formData,
                                requestedDemo: formData.requestedDemo.filter((d) => d !== demo),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={demo} className="text-gray-300 text-sm">
                          {demo}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Book Discovery Session
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating Workshop Widget */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Quick AI Consult
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/50">
            <DialogHeader>
              <DialogTitle className="text-white">Quick AI Consultation</DialogTitle>
              <DialogDescription className="text-gray-300">
                Get instant AI recommendations for your business
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Your biggest business challenge..."
                className="bg-white/5 border-white/10 text-white"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Get AI Recommendations</Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}
