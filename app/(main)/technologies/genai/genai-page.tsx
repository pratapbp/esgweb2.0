"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Brain,
  MessageSquare,
  FileText,
  Search,
  Zap,
  Database,
  Sparkles,
  Play,
  Pause,
  CheckCircle,
  Code,
  Bot,
  Target,
  Rocket,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// GenAI Applications Data
const genaiApplications = [
  {
    id: "resume-parsing",
    title: "Resume Parsing + Enrichment",
    description: "Extracts skills, formats for submission, generates summaries",
    icon: <FileText className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    accuracy: 94,
    timeReduction: "75%",
    features: ["Skill Extraction", "Auto-formatting", "Summary Generation", "Compliance Check"],
  },
  {
    id: "recruiter-copilot",
    title: "Copilot for Recruiters",
    description: 'Natural language search: "Find .NET consultants in Texas"',
    icon: <MessageSquare className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    accuracy: 92,
    timeReduction: "60%",
    features: ["Natural Language Queries", "Candidate Matching", "Interview Scheduling", "Performance Analytics"],
  },
  {
    id: "contract-drafting",
    title: "Contract Drafting",
    description: "Auto-generate NDAs, SoWs using prompt + HR context",
    icon: <Code className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    accuracy: 96,
    timeReduction: "80%",
    features: ["Template Generation", "Legal Compliance", "Custom Clauses", "Version Control"],
  },
  {
    id: "sap-integration",
    title: "SAP Custom LLM Integration",
    description: "GenAI + SAP S/4HANA for demand forecasting",
    icon: <Database className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    accuracy: 89,
    timeReduction: "65%",
    features: ["Demand Forecasting", "Inventory Optimization", "Process Automation", "Real-time Insights"],
  },
  {
    id: "job-matching",
    title: "Job Match Engine",
    description: "RAG + LLMs match vendors ⇄ consultants ⇄ clients",
    icon: <Target className="h-6 w-6" />,
    color: "from-indigo-500 to-purple-500",
    accuracy: 91,
    timeReduction: "70%",
    features: ["Semantic Matching", "Skill Assessment", "Cultural Fit", "Success Prediction"],
  },
  {
    id: "document-qa",
    title: "Document Q&A",
    description: '"What\'s the validity of LCA #123?" → AI answers',
    icon: <Search className="h-6 w-6" />,
    color: "from-teal-500 to-blue-500",
    accuracy: 97,
    timeReduction: "85%",
    features: ["Instant Answers", "Context Understanding", "Multi-document Search", "Compliance Tracking"],
  },
]

// AI Models Stack
const aiModelsStack = [
  {
    model: "OpenAI GPT-4-turbo",
    usage: "LLM backbone for copilots",
    performance: 95,
    category: "Foundation Models",
  },
  {
    model: "LangChain",
    usage: "Contextual pipelines, agents",
    performance: 92,
    category: "Orchestration",
  },
  {
    model: "Pinecone / Weaviate",
    usage: "Vector search (resumes, LCAs)",
    performance: 94,
    category: "Vector Database",
  },
  {
    model: "Supabase Edge Functions",
    usage: "Realtime prompt triggers",
    performance: 98,
    category: "Infrastructure",
  },
  {
    model: "Fine-tuned LLMs",
    usage: "Domain-specific resume match + audit",
    performance: 89,
    category: "Custom Models",
  },
  {
    model: "Prompt Layer / PromptHub",
    usage: "Prompt management dashboard",
    performance: 91,
    category: "Management",
  },
]

// SAP Integrations
const sapIntegrations = [
  {
    integration: "SAP BRIM + GPT-4",
    description: "Auto generate billing queries & resolve them via AI",
    benefits: ["Automated Query Resolution", "Billing Accuracy", "Customer Support"],
  },
  {
    integration: "SAP Analytics + GenAI",
    description: "Trend extraction, forecasting prompts",
    benefits: ["Predictive Analytics", "Trend Analysis", "Business Insights"],
  },
  {
    integration: "SAP SuccessFactors Copilot",
    description: "Streamline onboarding, interviews",
    benefits: ["HR Automation", "Candidate Experience", "Process Efficiency"],
  },
  {
    integration: "SAP Procurement AI",
    description: "Flag risky vendors with NLP signals",
    benefits: ["Risk Assessment", "Vendor Analysis", "Compliance Monitoring"],
  },
]

// Benefits Data
const benefits = [
  {
    metric: "35%",
    title: "Reduce hiring cycle",
    description: "Faster candidate processing and matching",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    metric: "90%",
    title: "JD ⇄ Resume matching accuracy",
    description: "Precise skill and requirement alignment",
    icon: <Target className="h-6 w-6" />,
  },
  {
    metric: "50%",
    title: "Fewer back-and-forths",
    description: "AI copilots streamline communication",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    metric: "100%",
    title: "Knowledge reuse",
    description: "Across contracts, LCAs, compliance",
    icon: <Brain className="h-6 w-6" />,
  },
]

export default function GenAIPage() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [activeTab, setActiveTab] = useState("applications")
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing window
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlay || !mounted) return

    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % genaiApplications.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, mounted])

  // Don't render animations until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative z-10">
          {/* Static Hero Section */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center">
              <div className="mb-8">
                <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30">
                  <Brain className="h-4 w-4 mr-2" />
                  Generative AI at ESGit
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Transforming Enterprises
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    with GenAI
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                  LLMs, Prompt Engineering, and Autonomous Workflows powering intelligent automation across SAP,
                  Staffing, Compliance, and beyond.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Matrix Animation */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{
                y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30">
                <Brain className="h-4 w-4 mr-2" />
                Generative AI at ESGit
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Transforming Enterprises
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  with GenAI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                LLMs, Prompt Engineering, and Autonomous Workflows powering intelligent automation across SAP, Staffing,
                Compliance, and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Launch Copilot Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Use Cases
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-xl border border-white/10">
                <TabsTrigger
                  value="applications"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  Applications
                </TabsTrigger>
                <TabsTrigger
                  value="demos"
                  className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
                >
                  Live Demos
                </TabsTrigger>
                <TabsTrigger
                  value="models"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
                >
                  AI Models
                </TabsTrigger>
                <TabsTrigger
                  value="integrations"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300"
                >
                  SAP Integration
                </TabsTrigger>
              </TabsList>

              {/* Applications Tab */}
              <TabsContent value="applications" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Key Applications of{" "}
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        GenAI
                      </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Real-world GenAI solutions transforming enterprise operations
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {genaiApplications.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="group"
                      >
                        <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${app.color} bg-opacity-20`}>
                                <div className="text-white">{app.icon}</div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                {app.accuracy}% Accuracy
                              </Badge>
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                              {app.title}
                            </CardTitle>
                            <CardDescription className="text-gray-400">{app.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Time Reduction</span>
                              <span className="text-green-400 font-semibold">{app.timeReduction}</span>
                            </div>
                            <Progress value={Number.parseInt(app.timeReduction)} className="h-2" />

                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300">Features:</h4>
                              <div className="space-y-1">
                                {app.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center text-sm text-gray-400">
                                    <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Live Demos Tab */}
              <TabsContent value="demos" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Featured{" "}
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Copilot Demos
                      </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Interactive demonstrations of our AI-powered solutions
                    </p>
                  </div>

                  <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsAutoPlay(!isAutoPlay)}
                          className="text-gray-400 hover:text-white"
                        >
                          {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          {isAutoPlay ? "Pause" : "Play"} Auto-demo
                        </Button>
                        <span className="text-sm text-gray-400">
                          {activeDemo + 1} of {genaiApplications.length}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {genaiApplications.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveDemo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === activeDemo ? "bg-blue-400 w-8" : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDemo}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-white/10">
                          <CardContent className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                              <div>
                                <div className="flex items-center space-x-3 mb-4">
                                  <div
                                    className={`p-3 rounded-xl bg-gradient-to-r ${genaiApplications[activeDemo].color} bg-opacity-20`}
                                  >
                                    <div className="text-white">{genaiApplications[activeDemo].icon}</div>
                                  </div>
                                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Live Demo</Badge>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                  {genaiApplications[activeDemo].title}
                                </h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                  {genaiApplications[activeDemo].description}
                                </p>
                                <div className="space-y-3">
                                  {genaiApplications[activeDemo].features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-gray-300">
                                      <Sparkles className="h-4 w-4 text-purple-400 mr-3" />
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-black/40 rounded-xl p-6 border border-gray-600">
                                <div className="flex items-center space-x-2 mb-4">
                                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="text-gray-400 text-sm ml-4">ESG Copilot Demo</span>
                                </div>
                                <div className="space-y-3 text-sm">
                                  <div className="text-green-400">$ Ask ESG Copilot</div>
                                  <div className="text-gray-300 pl-4">
                                    → Processing: {genaiApplications[activeDemo].title}
                                  </div>
                                  <div className="text-blue-400 pl-4">
                                    ✓ Accuracy: {genaiApplications[activeDemo].accuracy}%
                                  </div>
                                  <div className="text-purple-400 pl-4">
                                    ⚡ Time saved: {genaiApplications[activeDemo].timeReduction}
                                  </div>
                                  <div className="text-cyan-400 pl-4">🚀 Status: Ready for deployment</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>

                    <div className="text-center mt-8">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
                      >
                        <Bot className="mr-2 h-5 w-5" />
                        Try Interactive Demo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* AI Models Tab */}
              <TabsContent value="models" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      AI Models &{" "}
                      <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        Stack
                      </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Comprehensive AI infrastructure powering our GenAI solutions
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aiModelsStack.map((model, index) => (
                      <motion.div
                        key={model.model}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                                {model.category}
                              </Badge>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-400">{model.performance}%</div>
                                <div className="text-xs text-gray-400">Performance</div>
                              </div>
                            </div>
                            <CardTitle className="text-lg text-white">{model.model}</CardTitle>
                            <CardDescription className="text-gray-400">{model.usage}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Progress value={model.performance} className="h-2" />
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* SAP Integrations Tab */}
              <TabsContent value="integrations" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      GenAI Integrations with{" "}
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        SAP
                      </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Seamless AI integration across SAP enterprise solutions
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sapIntegrations.map((integration, index) => (
                      <motion.div
                        key={integration.integration}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center">
                              <Database className="h-5 w-5 mr-3 text-blue-400" />
                              {integration.integration}
                            </CardTitle>
                            <CardDescription className="text-gray-400">{integration.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300">Key Benefits:</h4>
                              <div className="space-y-1">
                                {integration.benefits.map((benefit, idx) => (
                                  <div key={idx} className="flex items-center text-sm text-gray-400">
                                    <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                                    {benefit}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Benefits Highlight */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Measurable{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Benefits
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real impact delivered through intelligent automation and AI-powered workflows
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-blue-400 mb-4 flex justify-center">{benefit.icon}</div>
                      <div className="text-4xl font-bold text-white mb-2">{benefit.metric}</div>
                      <div className="text-lg font-semibold text-gray-200 mb-2">{benefit.title}</div>
                      <div className="text-sm text-gray-400">{benefit.description}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-xl border border-white/10 max-w-4xl mx-auto">
                <CardContent className="p-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Ready to embed ESG Copilots into your workflows?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Transform your enterprise operations with our cutting-edge GenAI solutions and intelligent
                    automation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                      >
                        <Rocket className="mr-2 h-5 w-5" />
                        Schedule a Demo
                      </Button>
                    </Link>
                    <Link href="/services/digital-ai-solutions">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent"
                      >
                        <Brain className="mr-2 h-5 w-5" />
                        Launch Developer Playground
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
