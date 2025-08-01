"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Rocket,
  Cloud,
  Palette,
  Zap,
  Brain,
  Bot,
  BarChart3,
  Users,
  ShoppingCart,
  Settings,
  Sparkles,
  Play,
  CheckCircle,
  TrendingUp,
  Code,
  Mic,
  Send,
  ChevronRight,
  ChevronDown,
  Star,
  Award,
  Target,
  Clock,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import WaterDropButton from "@/components/ui/water-drop-button"
import { useToast } from "@/components/ui/use-toast"

// Core Innovation Areas Data
const innovationAreas = [
  {
    id: "sap-btp",
    title: "SAP BTP",
    description: "Unified platform for data, analytics, integration, and application development",
    icon: <Rocket className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500",
    tools: ["CAP (Cloud Application Programming)", "SAP UI5", "Kyma Runtime", "HANA Cloud"],
    metrics: {
      "Development Speed": "45% faster",
      "Time to Market": "60% reduction",
      "Integration Complexity": "70% simplified",
      "Maintenance Cost": "40% lower",
    },
    innovations: [
      "AI-powered code generation with CAP",
      "Automated testing and deployment pipelines",
      "Intelligent monitoring and alerting",
      "Multi-cloud deployment strategies",
    ],
  },
  {
    id: "rise-with-sap",
    title: "RISE with SAP",
    description: "Bundled transformation-as-a-service platform",
    icon: <Cloud className="h-8 w-8" />,
    color: "from-green-500 to-teal-500",
    tools: ["S/4HANA Cloud", "SAP Analytics Cloud", "SAP Integration Suite", "SAP Work Zone"],
    metrics: {
      "Implementation Time": "50% faster",
      "Total Cost of Ownership": "35% reduction",
      "Business Process Efficiency": "65% improvement",
      "User Adoption": "90% within 3 months",
    },
    innovations: [
      "Pre-configured industry solutions",
      "AI-driven migration assessment",
      "Automated data migration tools",
      "Continuous innovation delivery",
    ],
  },
  {
    id: "fiori-ux",
    title: "SAP Fiori & UX Modernization",
    description: "Low-code design studio, responsive UI, mobile-first",
    icon: <Palette className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    tools: ["SAP Fiori Elements", "UI5 Web Components", "SAP Build Apps", "Design Studio"],
    metrics: {
      "User Satisfaction": "85% increase",
      "Task Completion Time": "40% faster",
      "Mobile Adoption": "300% growth",
      "Development Effort": "60% reduction",
    },
    innovations: [
      "AI-powered UX recommendations",
      "Adaptive UI based on user behavior",
      "Voice-enabled interfaces",
      "Augmented reality dashboards",
    ],
  },
  {
    id: "integration-suite",
    title: "SAP Integration Suite",
    description: "Connect on-premise + cloud systems",
    icon: <Zap className="h-8 w-8" />,
    color: "from-yellow-500 to-orange-500",
    tools: ["Cloud Integration", "API Management", "Event Mesh", "Open Connectors"],
    metrics: {
      "Integration Time": "70% faster",
      "API Performance": "99.9% uptime",
      "Data Synchronization": "Real-time",
      "Error Resolution": "80% automated",
    },
    innovations: [
      "Self-healing integration flows",
      "AI-powered data mapping",
      "Predictive integration monitoring",
      "Blockchain-based data integrity",
    ],
  },
  {
    id: "ai-rpa",
    title: "AI + RPA Automation",
    description: "Intelligent workflows for finance, HR, supply chain",
    icon: <Brain className="h-8 w-8" />,
    color: "from-indigo-500 to-purple-500",
    tools: ["SAP Intelligent RPA", "SAP AI Core", "Document Information Extraction", "Conversational AI"],
    metrics: {
      "Process Automation": "85% of tasks",
      "Error Reduction": "95% fewer mistakes",
      "Processing Speed": "10x faster",
      "Cost Savings": "$2.5M annually",
    },
    innovations: [
      "Generative AI for process optimization",
      "Computer vision for document processing",
      "Natural language process automation",
      "Predictive maintenance workflows",
    ],
  },
  {
    id: "analytics-ai",
    title: "Analytics & AI",
    description: "Embedded intelligence and predictive insights",
    icon: <BarChart3 className="h-8 w-8" />,
    color: "from-cyan-500 to-blue-500",
    tools: ["SAP Analytics Cloud", "SAP HANA ML", "Predictive Analytics Library", "Data Intelligence"],
    metrics: {
      "Forecast Accuracy": "92% precision",
      "Decision Speed": "5x faster",
      "Data Processing": "Real-time insights",
      "ROI on Analytics": "340% return",
    },
    innovations: [
      "AutoML for citizen data scientists",
      "Explainable AI for business users",
      "Real-time streaming analytics",
      "Augmented analytics with NLP",
    ],
  },
]

// GenAI Use Cases Data
const genAIUseCases = [
  {
    domain: "Finance",
    title: "AI-Powered Financial Operations",
    description: "AI-based invoice routing, anomaly detection in journal entries",
    icon: <DollarSign className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    features: [
      "Intelligent invoice processing with 99.2% accuracy",
      "Real-time fraud detection and prevention",
      "Automated journal entry validation",
      "Predictive cash flow forecasting",
    ],
    metrics: {
      "Processing Speed": "10x faster",
      "Accuracy Rate": "99.2%",
      "Cost Reduction": "65%",
      "Compliance Score": "100%",
    },
    implementation: "SAP S/4HANA + SAP AI Core + Custom ML Models",
  },
  {
    domain: "HR",
    title: "Intelligent Workforce Management",
    description: "Intelligent onboarding workflows via SAP SuccessFactors + Copilot",
    icon: <Users className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    features: [
      "AI-powered candidate matching and screening",
      "Automated onboarding workflow orchestration",
      "Personalized learning path recommendations",
      "Predictive employee retention analytics",
    ],
    metrics: {
      "Onboarding Time": "75% reduction",
      "Employee Satisfaction": "90% score",
      "Retention Rate": "25% improvement",
      "HR Efficiency": "60% increase",
    },
    implementation: "SAP SuccessFactors + SAP Conversational AI + Custom Copilot",
  },
  {
    domain: "Procurement",
    title: "Smart Procurement Automation",
    description: "Smart approvals using NLP + GenAI-triggered workflows",
    icon: <ShoppingCart className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    features: [
      "Natural language purchase request processing",
      "Intelligent supplier recommendation engine",
      "Automated contract analysis and risk assessment",
      "Dynamic pricing optimization",
    ],
    metrics: {
      "Approval Speed": "80% faster",
      "Cost Savings": "25% reduction",
      "Compliance Rate": "98%",
      "Supplier Performance": "35% improvement",
    },
    implementation: "SAP Ariba + SAP AI Core + Document Information Extraction",
  },
  {
    domain: "IT Operations",
    title: "Self-Healing IT Infrastructure",
    description: "Auto-healing integration failures via RPA bots",
    icon: <Settings className="h-6 w-6" />,
    color: "from-red-500 to-orange-500",
    features: [
      "Predictive system failure detection",
      "Automated incident resolution workflows",
      "Intelligent capacity planning and scaling",
      "Real-time performance optimization",
    ],
    metrics: {
      Uptime: "99.95%",
      MTTR: "85% reduction",
      "Manual Interventions": "70% decrease",
      "Cost Optimization": "40% savings",
    },
    implementation: "SAP Solution Manager + SAP Intelligent RPA + Custom AI Models",
  },
]

// Success Metrics Data
const successMetrics = [
  {
    metric: "45%",
    description: "Faster app development via CAP + BTP",
    icon: <Rocket className="h-6 w-6" />,
    color: "text-blue-400",
  },
  {
    metric: "30%",
    description: "Reduced manual effort using RPA",
    icon: <Bot className="h-6 w-6" />,
    color: "text-green-400",
  },
  {
    metric: "80%",
    description: "Custom SAP apps delivered in <3 weeks",
    icon: <Clock className="h-6 w-6" />,
    color: "text-purple-400",
  },
  {
    metric: "340%",
    description: "ROI on AI-powered analytics solutions",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "text-cyan-400",
  },
]

// Technology Stack Layers
const techStackLayers = [
  {
    id: "core",
    title: "SAP Core / S/4HANA",
    description: "Enterprise resource planning foundation",
    color: "from-blue-600 to-blue-800",
    components: ["Financial Management", "Supply Chain", "Manufacturing", "Human Resources"],
  },
  {
    id: "btp",
    title: "SAP BTP",
    description: "Business Technology Platform",
    color: "from-purple-600 to-purple-800",
    components: ["App Development (CAP, RAP)", "AI + ML (PAL, HANA AI)", "Integration (iFlows)", "UX (Fiori/UI5)"],
  },
  {
    id: "esgit",
    title: "ESGit GenAI Accelerators + RPA Engine",
    description: "AI-powered innovation layer",
    color: "from-cyan-600 to-cyan-800",
    components: ["Custom AI Models", "RPA Workflows", "GenAI Copilots", "Intelligent Automation"],
  },
  {
    id: "apps",
    title: "AI-Powered Apps + Dashboards",
    description: "Intelligent business applications",
    color: "from-green-600 to-green-800",
    components: ["Predictive Analytics", "Smart Workflows", "Conversational Interfaces", "Real-time Insights"],
  },
]

export default function SAPTechnologyInnovationClientPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null)
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const [copilotOpen, setCopilotOpen] = useState(false)
  const [copilotQuery, setCopilotQuery] = useState("")
  const [copilotResponse, setCopilotResponse] = useState("")
  const [copilotLoading, setCopilotLoading] = useState(false)
  const [workshopOpen, setWorkshopOpen] = useState(false)
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(0)
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const { toast } = useToast()
  const copilotRef = useRef<HTMLDivElement>(null)

  // Auto-advance workflow steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkflowStep((prev) => (prev + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Predefined copilot questions
  const predefinedQuestions = [
    "How does SAP BTP compare to Mendix?",
    "What Fiori template is ideal for logistics dashboard?",
    "Explain ESGit's AI innovation model in 3 steps",
    "What are the benefits of RISE with SAP?",
    "How to implement RPA in SAP environment?",
  ]

  // Workflow steps
  const workflowSteps = [
    {
      title: "Requirements Analysis",
      description: "AI-powered business process discovery",
      value: "95% accuracy in requirement capture",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Solution Design",
      description: "Automated architecture recommendations",
      value: "60% faster design phase",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: "Rapid Development",
      description: "Low-code/no-code acceleration",
      value: "45% faster development",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Intelligent Testing",
      description: "AI-driven test automation",
      value: "80% test coverage",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Smart Deployment",
      description: "Zero-downtime deployment strategies",
      value: "99.9% deployment success",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Continuous Innovation",
      description: "AI-powered optimization and monitoring",
      value: "24/7 intelligent monitoring",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ]

  const handleCopilotQuery = async (query: string) => {
    setCopilotLoading(true)
    setCopilotQuery(query)

    try {
      const response = await fetch("/api/copilot/tech-innovation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      setCopilotResponse(data.response || "I'm sorry, I couldn't process that query.")
    } catch (error) {
      setCopilotResponse("Sorry, there was an error processing your request.")
    } finally {
      setCopilotLoading(false)
    }
  }

  const handleWorkshopSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/workshop-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, workshopType: "sap-technology-innovation" }),
      })

      if (response.ok) {
        toast({
          title: "Workshop Signup Successful!",
          description: "Our SAP innovation experts will contact you within 24 hours.",
        })
        setWorkshopOpen(false)
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight-blue via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-cyan to-neural-violet blur-3xl animate-pulse"></div>
          </div>
          {/* Animated Nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-electric-cyan rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm border-electric-cyan text-electric-cyan bg-electric-cyan/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                SAP Technology Innovation
              </Badge>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-luminous-white">
              Unleash Innovation with{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                SAP BTP + GenAI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Empowering enterprises to build, integrate, and scale smarter with SAP + ESGit's AI accelerators.
              Transform your digital landscape with intelligent automation and cutting-edge innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <WaterDropButton
                onClick={() => setWorkshopOpen(true)}
                className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue min-w-[280px] text-lg py-4"
              >
                Talk to an SAP Innovation Expert <ArrowRight className="ml-2 h-5 w-5" />
              </WaterDropButton>
              <Button
                onClick={() => setCopilotOpen(true)}
                variant="outline"
                className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 min-w-[280px] text-lg py-4 bg-transparent"
              >
                Explore Intelligent Use Cases <Brain className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Innovation Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-luminous-white">
              Core{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                Innovation Areas
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how ESGit accelerates SAP innovation across every layer of your technology stack
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovationAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedArea(area.id)}
              >
                <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300 group-hover:scale-105">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${area.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{area.icon}</div>
                    </div>
                    <CardTitle className="text-xl text-luminous-white group-hover:text-electric-cyan transition-colors">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{area.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Key Tools:</span>
                        <Badge variant="outline" className="border-electric-cyan/30 text-electric-cyan">
                          {area.tools.length} Tools
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Innovations:</span>
                        <Badge variant="outline" className="border-success-green/30 text-success-green">
                          {area.innovations.length} Features
                        </Badge>
                      </div>
                      <Button variant="ghost" className="w-full text-electric-cyan hover:bg-electric-cyan/10 mt-4">
                        Explore Details <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GenAI-Powered Use Cases */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-luminous-white">
              GenAI-Powered{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                SAP Use Cases
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Real-world applications of AI and automation across SAP business processes
            </p>

            <Button
              onClick={() => setCopilotOpen(true)}
              className="bg-gradient-to-r from-neural-violet/20 to-electric-cyan/20 border border-neural-violet/30 text-electric-cyan hover:bg-neural-violet/10"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask Copilot: "Recommend SAP BTP use case for logistics"
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {genAIUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.domain}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedUseCase(useCase.domain)}
              >
                <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300 group-hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${useCase.color} p-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="text-white">{useCase.icon}</div>
                      </div>
                      <div>
                        <Badge variant="outline" className="border-electric-cyan/30 text-electric-cyan mb-2">
                          {useCase.domain}
                        </Badge>
                        <CardTitle className="text-lg text-luminous-white group-hover:text-electric-cyan transition-colors">
                          {useCase.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300">{useCase.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-electric-cyan mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {useCase.features.slice(0, 2).map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="h-3 w-3 text-success-green mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(useCase.metrics)
                          .slice(0, 2)
                          .map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-electric-cyan">{value}</div>
                              <div className="text-xs text-gray-400">{key}</div>
                            </div>
                          ))}
                      </div>

                      <Button variant="ghost" className="w-full text-electric-cyan hover:bg-electric-cyan/10">
                        View Implementation <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAP Technology Stack Visualization */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-luminous-white">
              SAP Technology{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                Stack Map
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interactive visualization of our comprehensive SAP innovation architecture
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {techStackLayers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedLayer === layer.id
                        ? "border-electric-cyan bg-electric-cyan/10 scale-105"
                        : "border-gray-800 bg-gray-900/50 hover:border-electric-cyan/50"
                    }`}
                    onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${layer.color}`}></div>
                          <div>
                            <h3 className="text-xl font-bold text-luminous-white">{layer.title}</h3>
                            <p className="text-gray-300">{layer.description}</p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-electric-cyan transition-transform duration-300 ${
                            selectedLayer === layer.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <AnimatePresence>
                        {selectedLayer === layer.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-6 border-t border-electric-cyan/20"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {layer.components.map((component, i) => (
                                <div key={i} className="flex items-center space-x-2 p-3 bg-gray-800/50 rounded-lg">
                                  <CheckCircle className="h-4 w-4 text-success-green" />
                                  <span className="text-gray-300">{component}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>

                  {/* Connection Arrow */}
                  {index < techStackLayers.length - 1 && (
                    <div className="flex justify-center my-4">
                      <div className="w-px h-8 bg-gradient-to-b from-electric-cyan to-transparent"></div>
                      <div className="absolute mt-6">
                        <ChevronDown className="h-4 w-4 text-electric-cyan" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Workflow Timeline */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-luminous-white">
              Intelligent{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                Development Workflow
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI-powered end-to-end application lifecycle with automated progression
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${index === currentWorkflowStep ? "z-10" : ""}`}
                >
                  <Card
                    className={`h-full transition-all duration-500 ${
                      index === currentWorkflowStep
                        ? "border-electric-cyan bg-electric-cyan/10 scale-105 shadow-lg shadow-electric-cyan/20"
                        : "border-gray-800 bg-gray-900/50"
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-500 ${
                          index === currentWorkflowStep
                            ? "bg-gradient-to-r from-electric-cyan to-neural-violet scale-110"
                            : "bg-gray-800"
                        }`}
                      >
                        <div className="text-white">{step.icon}</div>
                      </div>

                      <h3
                        className={`text-lg font-bold mb-2 transition-colors duration-500 ${
                          index === currentWorkflowStep ? "text-electric-cyan" : "text-luminous-white"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="text-gray-300 mb-4">{step.description}</p>

                      <Badge
                        variant="outline"
                        className={`${
                          index === currentWorkflowStep
                            ? "border-electric-cyan text-electric-cyan"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        {step.value}
                      </Badge>

                      {index === currentWorkflowStep && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-success-green rounded-full flex items-center justify-center"
                        >
                          <Play className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Progress indicator */}
                  <div className="mt-4">
                    <Progress value={index <= currentWorkflowStep ? 100 : 0} className="h-2 bg-gray-800" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-luminous-white">
              Proven{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                Success Metrics
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable results from our SAP technology innovation implementations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-8">
                    <div className={`${metric.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {metric.icon}
                    </div>
                    <div className="text-4xl font-bold text-luminous-white mb-2 group-hover:text-electric-cyan transition-colors">
                      {metric.metric}
                    </div>
                    <p className="text-gray-300">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-electric-cyan/10 to-neural-violet/10 border-electric-cyan/30 backdrop-blur-md">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-luminous-white">
                  Ready to Accelerate Your{" "}
                  <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                    SAP Innovation?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join 500+ enterprises that have transformed their SAP landscape with ESGit's AI-powered innovation
                  platform.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <WaterDropButton
                    onClick={() => setWorkshopOpen(true)}
                    className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue min-w-[280px] text-lg py-4"
                  >
                    Schedule Innovation Workshop <Calendar className="ml-2 h-5 w-5" />
                  </WaterDropButton>
                  <Button
                    onClick={() => setCopilotOpen(true)}
                    variant="outline"
                    className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 min-w-[280px] text-lg py-4 bg-transparent"
                  >
                    Ask Innovation Copilot <Brain className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-electric-cyan/20">
                  <div className="flex flex-wrap justify-center items-center gap-8">
                    {[
                      { icon: <Award className="h-5 w-5" />, text: "SAP Certified Partner" },
                      { icon: <Star className="h-5 w-5" />, text: "340+ AI Implementations" },
                      { icon: <Target className="h-5 w-5" />, text: "6-Month Average ROI" },
                    ].map((badge, i) => (
                      <div key={i} className="flex items-center space-x-2 text-gray-400">
                        <div className="text-electric-cyan">{badge.icon}</div>
                        <span className="text-sm">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Innovation Area Detail Modal */}
      <Dialog open={!!selectedArea} onOpenChange={() => setSelectedArea(null)}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
          {selectedArea && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-luminous-white flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                      innovationAreas.find((a) => a.id === selectedArea)?.color
                    } p-3`}
                  >
                    <div className="text-white">{innovationAreas.find((a) => a.id === selectedArea)?.icon}</div>
                  </div>
                  <span>{innovationAreas.find((a) => a.id === selectedArea)?.title}</span>
                </DialogTitle>
                <DialogDescription className="text-gray-300 text-lg">
                  {innovationAreas.find((a) => a.id === selectedArea)?.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <Tabs defaultValue="tools" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger value="tools">Tools & Technologies</TabsTrigger>
                    <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                    <TabsTrigger value="innovations">ESGit Innovations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tools" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {innovationAreas
                        .find((a) => a.id === selectedArea)
                        ?.tools.map((tool, i) => (
                          <div key={i} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-success-green" />
                            <span className="text-gray-300">{tool}</span>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(innovationAreas.find((a) => a.id === selectedArea)?.metrics || {}).map(
                        ([key, value]) => (
                          <div key={key} className="text-center p-4 bg-gray-800/50 rounded-lg">
                            <div className="text-2xl font-bold text-electric-cyan mb-2">{value}</div>
                            <div className="text-gray-300">{key}</div>
                          </div>
                        ),
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="innovations" className="space-y-4">
                    <div className="space-y-3">
                      {innovationAreas
                        .find((a) => a.id === selectedArea)
                        ?.innovations.map((innovation, i) => (
                          <div key={i} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                            <Sparkles className="h-5 w-5 text-electric-cyan mt-0.5" />
                            <span className="text-gray-300">{innovation}</span>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Copilot Modal */}
      <Dialog open={copilotOpen} onOpenChange={setCopilotOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-luminous-white flex items-center space-x-2">
              <Brain className="h-6 w-6 text-electric-cyan" />
              <span>SAP Innovation Copilot</span>
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Ask me anything about SAP BTP, RISE, Fiori, or ESGit's innovation approach
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Predefined Questions */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-electric-cyan">Quick Questions:</h4>
              <div className="flex flex-wrap gap-2">
                {predefinedQuestions.map((question, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopilotQuery(question)}
                    className="text-xs border-gray-600 text-gray-300 hover:border-electric-cyan hover:text-electric-cyan"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Query Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about SAP innovation, BTP capabilities, or implementation strategies..."
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCopilotQuery(copilotQuery)}
                className="bg-gray-800 border-gray-700 text-luminous-white"
              />
              <Button
                onClick={() => setIsVoiceActive(!isVoiceActive)}
                variant="outline"
                size="icon"
                className={`border-gray-700 ${isVoiceActive ? "bg-electric-cyan/20 border-electric-cyan" : ""}`}
              >
                <Mic className={`h-4 w-4 ${isVoiceActive ? "text-electric-cyan" : "text-gray-400"}`} />
              </Button>
              <Button
                onClick={() => handleCopilotQuery(copilotQuery)}
                disabled={copilotLoading || !copilotQuery.trim()}
                className="bg-electric-cyan text-midnight-blue hover:bg-electric-cyan/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Response */}
            {copilotLoading && (
              <div className="flex items-center space-x-2 text-electric-cyan">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-electric-cyan"></div>
                <span>Analyzing your query...</span>
              </div>
            )}

            {copilotResponse && (
              <div className="p-4 bg-gray-800/50 rounded-lg border border-electric-cyan/20">
                <div className="text-gray-300 whitespace-pre-wrap">{copilotResponse}</div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Workshop Modal */}
      <Dialog open={workshopOpen} onOpenChange={setWorkshopOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-luminous-white">Schedule SAP Innovation Workshop</DialogTitle>
            <DialogDescription className="text-gray-300">
              Get personalized recommendations for your SAP technology transformation
            </DialogDescription>
          </DialogHeader>

          <WorkshopForm onSubmit={handleWorkshopSubmit} onClose={() => setWorkshopOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Floating Workshop Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setWorkshopOpen(true)}
          className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          size="lg"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Innovation Workshop
        </Button>
      </motion.div>
    </div>
  )
}

// Workshop Form Component
function WorkshopForm({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    erpLandscape: "",
    developmentChallenges: [],
    uxMaturityLevel: "",
    requestedDemo: "",
    goals: [],
    additionalInfo: "",
  })

  const developmentChallenges = [
    "Slow development cycles",
    "Legacy system integration",
    "User experience modernization",
    "Scalability issues",
    "Security concerns",
    "Cost optimization",
  ]

  const goals = [
    "Accelerate app development",
    "Improve user experience",
    "Reduce technical debt",
    "Enable mobile access",
    "Implement AI/ML capabilities",
    "Enhance integration capabilities",
  ]

  const demoApps = [
    "Intelligent Procurement Dashboard",
    "AI-Powered HR Analytics",
    "Predictive Maintenance Console",
    "Smart Financial Planning Tool",
    "Supply Chain Visibility Portal",
    "Custom Industry Solution",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-800 border-gray-700 text-luminous-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-gray-800 border-gray-700 text-luminous-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
          <Input
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="bg-gray-800 border-gray-700 text-luminous-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-gray-800 border-gray-700 text-luminous-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Current ERP Landscape</label>
        <Select
          value={formData.erpLandscape}
          onValueChange={(value) => setFormData({ ...formData, erpLandscape: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-luminous-white">
            <SelectValue placeholder="Select your current ERP system" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="sap-ecc">SAP ECC</SelectItem>
            <SelectItem value="sap-s4hana">SAP S/4HANA</SelectItem>
            <SelectItem value="oracle">Oracle ERP</SelectItem>
            <SelectItem value="microsoft">Microsoft Dynamics</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="none">No ERP system</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Development Challenges (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {developmentChallenges.map((challenge) => (
            <div key={challenge} className="flex items-center space-x-2">
              <Checkbox
                id={challenge}
                checked={formData.developmentChallenges.includes(challenge)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({
                      ...formData,
                      developmentChallenges: [...formData.developmentChallenges, challenge],
                    })
                  } else {
                    setFormData({
                      ...formData,
                      developmentChallenges: formData.developmentChallenges.filter((c) => c !== challenge),
                    })
                  }
                }}
                className="border-gray-600"
              />
              <label htmlFor={challenge} className="text-sm text-gray-300">
                {challenge}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">UX Maturity Level</label>
        <Select
          value={formData.uxMaturityLevel}
          onValueChange={(value) => setFormData({ ...formData, uxMaturityLevel: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-luminous-white">
            <SelectValue placeholder="Assess your current UX maturity" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="basic">Basic - Traditional SAP GUI</SelectItem>
            <SelectItem value="intermediate">Intermediate - Some Fiori apps</SelectItem>
            <SelectItem value="advanced">Advanced - Modern UX strategy</SelectItem>
            <SelectItem value="expert">Expert - Custom UX innovations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Request App Demo</label>
        <Select
          value={formData.requestedDemo}
          onValueChange={(value) => setFormData({ ...formData, requestedDemo: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-luminous-white">
            <SelectValue placeholder="Choose a demo application" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {demoApps.map((app) => (
              <SelectItem key={app} value={app}>
                {app}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Goals (Select all that apply)</label>
        <div className="grid grid-cols-2 gap-2">
          {goals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={formData.goals.includes(goal)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({ ...formData, goals: [...formData.goals, goal] })
                  } else {
                    setFormData({ ...formData, goals: formData.goals.filter((g) => g !== goal) })
                  }
                }}
                className="border-gray-600"
              />
              <label htmlFor={goal} className="text-sm text-gray-300">
                {goal}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
        <Textarea
          value={formData.additionalInfo}
          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          placeholder="Tell us about your specific requirements, timeline, or any other details..."
          className="bg-gray-800 border-gray-700 text-luminous-white"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-gray-600 text-gray-300 bg-transparent"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue hover:shadow-lg"
        >
          Schedule Workshop
        </Button>
      </div>
    </form>
  )
}
