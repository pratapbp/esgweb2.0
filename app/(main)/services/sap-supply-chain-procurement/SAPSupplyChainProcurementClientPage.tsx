"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Truck,
  Package,
  Users,
  Shield,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Mic,
  Send,
  Filter,
  CheckCircle,
  Clock,
  DollarSign,
  Zap,
  Brain,
  ChevronDown,
  Upload,
  Factory,
  Heart,
  ShoppingCart,
  Banknote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Supply Chain Animation Component
const SupplyChainVisualization = () => {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 800 300" className="absolute inset-0">
        <defs>
          <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Supply Chain Nodes */}
        {[
          { x: 100, y: 150, label: "Supplier", icon: "🏭" },
          { x: 250, y: 100, label: "Warehouse", icon: "🏢" },
          { x: 400, y: 150, label: "Distribution", icon: "🚛" },
          { x: 550, y: 100, label: "Retail", icon: "🏪" },
          { x: 700, y: 150, label: "Customer", icon: "👥" },
        ].map((node, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill="url(#chainGradient)"
              filter="url(#glow)"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                delay: index * 0.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <text x={node.x} y={node.y + 45} textAnchor="middle" className="text-xs fill-white font-medium">
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Connecting Lines with Flow Animation */}
        {[
          { x1: 125, y1: 150, x2: 225, y2: 100 },
          { x1: 275, y1: 100, x2: 375, y2: 150 },
          { x1: 425, y1: 150, x2: 525, y2: 100 },
          { x1: 575, y1: 100, x2: 675, y2: 150 },
        ].map((line, index) => (
          <motion.g key={index}>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#chainGradient)"
              strokeWidth="3"
              opacity="0.6"
            />
            {/* Flow particles */}
            {[...Array(3)].map((_, particleIndex) => (
              <motion.circle
                key={particleIndex}
                r="3"
                fill="#06b6d4"
                animate={{
                  cx: [line.x1, line.x2],
                  cy: [line.y1, line.y2],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.5 + particleIndex * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </motion.g>
        ))}

        {/* AI Brain Overlay */}
        <motion.g
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <circle cx="400" cy="50" r="20" fill="#8b5cf6" opacity="0.3" />
          <text x="400" y="55" textAnchor="middle" className="text-xs fill-white font-bold">
            AI
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

// Key Capabilities Data
const capabilities = [
  {
    id: "ariba",
    title: "SAP Ariba",
    description: "End-to-end sourcing, contracting & supplier management",
    icon: <Package className="h-6 w-6" />,
    features: [
      "Strategic Sourcing & Procurement",
      "Supplier Lifecycle Management",
      "Contract Management & Compliance",
      "Spend Analysis & Reporting",
    ],
    kpis: ["40% faster sourcing cycles", "25% cost reduction", "99.5% supplier compliance"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "ibp",
    title: "SAP IBP (Integrated Business Planning)",
    description: "Predictive demand forecasting + scenario planning",
    icon: <TrendingUp className="h-6 w-6" />,
    features: [
      "Demand Planning & Forecasting",
      "Supply Planning Optimization",
      "Sales & Operations Planning",
      "Inventory Optimization",
    ],
    kpis: ["30% forecast accuracy improvement", "20% inventory reduction", "15% service level increase"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "fieldglass",
    title: "SAP Fieldglass",
    description: "External workforce + services procurement",
    icon: <Users className="h-6 w-6" />,
    features: [
      "Contingent Workforce Management",
      "Services Procurement",
      "Vendor Management System",
      "Compliance & Risk Management",
    ],
    kpis: ["35% faster contractor onboarding", "50% compliance improvement", "25% cost savings"],
    color: "from-green-500 to-teal-500",
  },
  {
    id: "blockchain",
    title: "Blockchain for Procurement",
    description: "Supplier validation, ESG compliance, anti-fraud",
    icon: <Shield className="h-6 w-6" />,
    features: [
      "Supplier Identity Verification",
      "Smart Contract Automation",
      "ESG Compliance Tracking",
      "Anti-Fraud Protection",
    ],
    kpis: ["100% supplier traceability", "90% fraud reduction", "ESG score improvement"],
    color: "from-red-500 to-orange-500",
  },
  {
    id: "ai-spend",
    title: "AI Spend Analytics",
    description: "Auto-identify cost savings, price anomalies, and sourcing risk",
    icon: <Brain className="h-6 w-6" />,
    features: [
      "Intelligent Spend Classification",
      "Price Anomaly Detection",
      "Sourcing Risk Assessment",
      "Savings Opportunity Identification",
    ],
    kpis: ["$2M+ annual savings identified", "85% anomaly detection accuracy", "60% risk reduction"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "dashboards",
    title: "Supplier Performance Dashboards",
    description: "Real-time metrics + anomaly detection via GenAI",
    icon: <BarChart3 className="h-6 w-6" />,
    features: ["Real-time Performance Monitoring", "Predictive Analytics", "Automated Alerting", "Executive Reporting"],
    kpis: ["Real-time visibility", "24/7 monitoring", "Proactive issue resolution"],
    color: "from-yellow-500 to-red-500",
  },
]

// Use Cases Data
const useCases = [
  {
    industry: "Retail",
    icon: <ShoppingCart className="h-5 w-5" />,
    useCase: "Dynamic pricing + auto-sourcing during supply disruption",
    description:
      "AI automatically adjusts sourcing strategies and pricing when supply chain disruptions are detected, maintaining inventory levels and profit margins.",
    metrics: ["15% margin protection", "30% faster response time", "95% availability maintained"],
    chartType: "Dynamic Pricing Dashboard",
  },
  {
    industry: "Healthcare",
    icon: <Heart className="h-5 w-5" />,
    useCase: "AI-predicted medical supply shortages based on claims + weather",
    description:
      "Predictive models analyze insurance claims data and weather patterns to forecast medical supply needs and prevent shortages.",
    metrics: ["40% reduction in stockouts", "25% inventory optimization", "99.8% critical supply availability"],
    chartType: "Supply Forecast Analytics",
  },
  {
    industry: "Manufacturing",
    icon: <Factory className="h-5 w-5" />,
    useCase: "ML-based lead time prediction across multi-tier suppliers",
    description:
      "Machine learning algorithms analyze historical data and real-time factors to predict accurate lead times across complex supplier networks.",
    metrics: ["50% lead time accuracy improvement", "20% inventory reduction", "35% planning efficiency gain"],
    chartType: "Multi-Tier Supplier Network",
  },
  {
    industry: "BFSI",
    icon: <Banknote className="h-5 w-5" />,
    useCase: "AI-managed vendor onboarding with compliance scoring",
    description:
      "Automated vendor assessment and onboarding with real-time compliance scoring and risk evaluation for financial services.",
    metrics: ["70% faster onboarding", "99% compliance accuracy", "80% risk reduction"],
    chartType: "Compliance Risk Matrix",
  },
]

// Case Studies Data
const caseStudies = [
  {
    id: 1,
    company: "Global Retail Chain",
    industry: "Retail",
    module: "SAP Ariba",
    challenge: "Manual procurement processes causing delays and overspend",
    solution: "Implemented SAP Ariba with AI-powered spend analytics",
    results: {
      costSaved: "$4.2M",
      deliveryImprovement: "43%",
      cycleReduction: "60%",
    },
    quote: "ESG's AI-enhanced Ariba implementation transformed our procurement from reactive to predictive.",
    logo: "/images/logos/client-retail.png",
  },
  {
    id: 2,
    company: "Healthcare Network",
    industry: "Healthcare",
    module: "SAP IBP",
    challenge: "Unpredictable demand causing supply shortages",
    solution: "Deployed SAP IBP with predictive analytics for medical supplies",
    results: {
      costSaved: "$2.8M",
      deliveryImprovement: "55%",
      cycleReduction: "45%",
    },
    quote: "The AI-powered forecasting has eliminated critical supply shortages completely.",
    logo: "/images/logos/client-healthcare.png",
  },
  {
    id: 3,
    company: "Manufacturing Giant",
    industry: "Manufacturing",
    module: "SAP Fieldglass",
    challenge: "Complex contractor management across multiple sites",
    solution: "Integrated SAP Fieldglass with blockchain verification",
    results: {
      costSaved: "$3.5M",
      deliveryImprovement: "38%",
      cycleReduction: "52%",
    },
    quote: "Contractor onboarding time reduced from weeks to hours with full compliance.",
    logo: "/images/logos/client-manufacturing.png",
  },
]

// Workflow Steps
const workflowSteps = [
  {
    id: "erp",
    title: "SAP ECC/S/4HANA",
    description: "Core ERP system with master data and transactions",
    tools: ["Financial Accounting", "Materials Management", "Sales & Distribution"],
    kpis: ["Real-time data sync", "99.9% uptime", "Integrated workflows"],
  },
  {
    id: "ariba",
    title: "Ariba → Supplier Portal",
    description: "Supplier collaboration and procurement processes",
    tools: ["Supplier Discovery", "Strategic Sourcing", "Contract Management"],
    kpis: ["10,000+ suppliers", "40% cycle reduction", "100% compliance"],
  },
  {
    id: "fieldglass",
    title: "Fieldglass → Workforce",
    description: "External workforce and services management",
    tools: ["Contingent Workforce", "Services Procurement", "Vendor Management"],
    kpis: ["35% faster onboarding", "50% cost reduction", "Full visibility"],
  },
  {
    id: "ibp",
    title: "IBP → Forecast Engine",
    description: "Integrated business planning and demand forecasting",
    tools: ["Demand Planning", "Supply Planning", "S&OP"],
    kpis: ["30% forecast accuracy", "20% inventory reduction", "Real-time planning"],
  },
  {
    id: "genai",
    title: "GenAI Copilot → Analytics Layer",
    description: "AI-powered insights and predictive analytics",
    tools: ["Predictive Models", "Anomaly Detection", "Natural Language Queries"],
    kpis: ["85% accuracy", "Real-time insights", "Proactive alerts"],
  },
  {
    id: "dashboards",
    title: "Smart Dashboards / Alerts",
    description: "Executive dashboards and intelligent alerting",
    tools: ["Executive Reports", "KPI Monitoring", "Mobile Dashboards"],
    kpis: ["360° visibility", "24/7 monitoring", "Actionable insights"],
  },
]

export default function SAPSupplyChainProcurementClientPage() {
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null)
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<string | null>(null)
  const [caseStudyFilter, setCaseStudyFilter] = useState("All")
  const [copilotQuery, setCopilotQuery] = useState("")
  const [copilotResponse, setCopilotResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [workshopForm, setWorkshopForm] = useState({
    sector: "",
    currentStack: "",
    challenges: [] as string[],
    goals: [] as string[],
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const heroRef = useRef<HTMLDivElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)
  const useCasesRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const caseStudiesRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true })
  const capabilitiesInView = useInView(capabilitiesRef, { once: true })
  const useCasesInView = useInView(useCasesRef, { once: true })
  const workflowInView = useInView(workflowRef, { once: true })
  const caseStudiesInView = useInView(caseStudiesRef, { once: true })

  // Copilot sample queries
  const sampleQueries = [
    "What is Ariba Guided Buying?",
    "Suggest optimization ideas for a global procurement manager",
    "Compare IBP vs APO vs S&OP",
    "Show me SAP Ariba success in Manufacturing",
    "Generate sourcing dashboard for retail",
  ]

  // Handle copilot query
  const handleCopilotQuery = async (query: string) => {
    setIsProcessing(true)
    setCopilotQuery(query)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate contextual response based on query
    let response = ""
    if (query.toLowerCase().includes("ariba guided buying")) {
      response =
        "SAP Ariba Guided Buying is a self-service procurement solution that guides employees through compliant purchasing processes. It features: 1) Intuitive catalog browsing with smart search, 2) Automated approval workflows, 3) Budget validation and spend controls, 4) Integration with preferred suppliers, 5) Mobile-first user experience. Benefits include 85% reduction in maverick spending, 60% faster requisition processing, and 95% policy compliance."
    } else if (query.toLowerCase().includes("optimization ideas")) {
      response =
        "Key optimization strategies for global procurement: 1) Implement AI-powered spend analytics to identify 15-20% cost savings opportunities, 2) Establish supplier performance scorecards with real-time monitoring, 3) Deploy predictive analytics for demand forecasting (30% accuracy improvement), 4) Automate contract lifecycle management, 5) Create supplier diversity programs, 6) Implement blockchain for supply chain transparency, 7) Use IoT for real-time inventory tracking."
    } else if (query.toLowerCase().includes("compare ibp")) {
      response =
        "SAP IBP vs APO vs S&OP Comparison: IBP (Integrated Business Planning) - Cloud-native, real-time, AI/ML enabled, unified planning across all horizons. APO (Advanced Planning & Optimization) - On-premise legacy, separate modules, limited real-time capabilities. S&OP (Sales & Operations Planning) - Process methodology, not technology. IBP advantages: 50% faster planning cycles, real-time collaboration, predictive analytics, mobile access, and seamless S/4HANA integration."
    } else if (query.toLowerCase().includes("ariba success manufacturing")) {
      response =
        "Manufacturing Success with SAP Ariba: Global automotive manufacturer achieved: 1) $12M annual savings through strategic sourcing, 2) 65% reduction in supplier onboarding time, 3) 40% improvement in contract compliance, 4) 99.5% supplier performance visibility, 5) 30% faster RFQ processing. Key features: Multi-tier supplier management, quality scorecards, risk monitoring, and integrated supplier collaboration portal."
    } else if (query.toLowerCase().includes("sourcing dashboard retail")) {
      response =
        "Retail Sourcing Dashboard Components: 1) Spend Analytics - Category breakdown, trend analysis, savings tracking, 2) Supplier Performance - Delivery metrics, quality scores, risk indicators, 3) Contract Management - Expiration alerts, compliance status, renewal pipeline, 4) Market Intelligence - Price benchmarking, market trends, supplier news, 5) KPI Monitoring - Cost savings, cycle times, maverick spend. Real-time updates with mobile access and executive summary views."
    } else {
      response =
        "I can help you with SAP supply chain and procurement questions. Try asking about specific modules like Ariba, IBP, or Fieldglass, or request optimization strategies for your industry."
    }

    setCopilotResponse(response)
    setIsProcessing(false)
  }

  // Handle workshop form submission
  const handleWorkshopSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with Supabase and webhook
    console.log("Workshop form submitted:", workshopForm)
    // Reset form or show success message
  }

  // Filter case studies
  const filteredCaseStudies =
    caseStudyFilter === "All" ? caseStudies : caseStudies.filter((study) => study.industry === caseStudyFilter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              <Truck className="h-5 w-5 mr-2" />
              <span className="font-medium">Supply Chain & Procurement AI</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Resilient, Predictive,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Driven Supply Chains
              </span>{" "}
              with SAP
            </h1>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              From sourcing to settlement, automate every step with SAP Ariba, SAP IBP, and ESG Copilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Request Supply Chain Assessment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-950/50 bg-transparent"
              >
                Explore Use Cases by Industry <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Supply Chain Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <SupplyChainVisualization />
          </motion.div>
        </div>
      </section>

      {/* Key Capabilities Grid */}
      <section ref={capabilitiesRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={capabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive SAP supply chain solutions powered by AI and blockchain technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 30 }}
                animate={capabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card
                  className="h-full bg-gray-900/60 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10"
                  onClick={() => setSelectedCapability(selectedCapability === capability.id ? null : capability.id)}
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${capability.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {capability.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-white transition-colors">
                      {capability.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {capability.description}
                    </CardDescription>
                  </CardHeader>

                  <AnimatePresence>
                    {selectedCapability === capability.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-blue-400 mb-2">Key Features:</h4>
                              <ul className="space-y-1">
                                {capability.features.map((feature, idx) => (
                                  <li key={idx} className="text-sm text-gray-300 flex items-center">
                                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-purple-400 mb-2">Key Performance Indicators:</h4>
                              <div className="flex flex-wrap gap-2">
                                {capability.kpis.map((kpi, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs border-purple-500/30 text-purple-300"
                                  >
                                    {kpi}
                                  </Badge>
                                ))}
                              </div>
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

      {/* AI-Powered Use Cases */}
      <section ref={useCasesRef} className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-specific applications of our AI-enhanced SAP supply chain solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={useCasesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full bg-gray-900/60 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                        {useCase.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{useCase.industry}</h3>
                        <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">
                          {useCase.chartType}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-3">{useCase.useCase}</CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed">{useCase.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {useCase.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-3 bg-gray-800/50 rounded-lg">
                          <div className="text-lg font-bold text-green-400">{metric.split(" ")[0]}</div>
                          <div className="text-xs text-gray-400">{metric.split(" ").slice(1).join(" ")}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Copilot Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-semibold mb-6">Ask ESG Copilot:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {sampleQueries.slice(3).map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopilotQuery(query)}
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-950/50"
                >
                  {query}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Supply Chain Workflow Map */}
      <section ref={workflowRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Supply Chain{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Workflow
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interactive workflow showing how our SAP solutions integrate across your supply chain
            </p>
          </motion.div>

          <div className="relative">
            {/* Workflow Steps */}
            <div className="space-y-8">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={workflowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className="flex-1">
                    <Card
                      className={`bg-gray-900/60 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-green-500/10 ${
                        index % 2 === 0 ? "mr-8" : "ml-8"
                      }`}
                      onClick={() => setSelectedWorkflowStep(selectedWorkflowStep === step.id ? null : step.id)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </div>
                          {step.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">{step.description}</CardDescription>
                      </CardHeader>

                      <AnimatePresence>
                        {selectedWorkflowStep === step.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-green-400 mb-2">Tools & Features:</h4>
                                  <ul className="space-y-1">
                                    {step.tools.map((tool, idx) => (
                                      <li key={idx} className="text-sm text-gray-300 flex items-center">
                                        <Zap className="h-3 w-3 text-yellow-400 mr-2 flex-shrink-0" />
                                        {tool}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-blue-400 mb-2">Key Metrics:</h4>
                                  <div className="space-y-2">
                                    {step.kpis.map((kpi, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-xs border-blue-500/30 text-blue-300 block w-fit"
                                      >
                                        {kpi}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </div>

                  {/* Arrow */}
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-16">
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <ChevronDown className="h-6 w-6 text-green-400" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Impact Section */}
      <section ref={caseStudiesRef} className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={caseStudiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Real results from our SAP supply chain implementations
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {["All", "Retail", "Healthcare", "Manufacturing"].map((filter) => (
                <Button
                  key={filter}
                  variant={caseStudyFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCaseStudyFilter(filter)}
                  className={
                    caseStudyFilter === filter
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : "border-yellow-500/30 text-yellow-300 hover:bg-yellow-950/50"
                  }
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filter}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={caseStudiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full bg-gray-900/60 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">
                        {study.module}
                      </Badge>
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                        {study.industry}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{study.company}</CardTitle>
                    <CardDescription className="text-gray-300 mb-4">
                      <strong>Challenge:</strong> {study.challenge}
                    </CardDescription>
                    <CardDescription className="text-gray-300">
                      <strong>Solution:</strong> {study.solution}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-900/30 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-400 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-400">{study.results.costSaved}</div>
                        <div className="text-xs text-gray-400">Cost Saved</div>
                      </div>
                      <div className="text-center p-3 bg-blue-900/30 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-400">{study.results.deliveryImprovement}</div>
                        <div className="text-xs text-gray-400">Delivery Improvement</div>
                      </div>
                      <div className="text-center p-3 bg-purple-900/30 rounded-lg">
                        <Clock className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                        <div className="text-lg font-bold text-purple-400">{study.results.cycleReduction}</div>
                        <div className="text-xs text-gray-400">Cycle Reduction</div>
                      </div>
                    </div>

                    <blockquote className="text-sm text-gray-300 italic border-l-4 border-yellow-500 pl-4">
                      "{study.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Copilot - SCM Edition */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ESG Copilot -{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SCM Edition
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get instant answers to your supply chain and procurement questions
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Supply Chain AI Assistant</CardTitle>
                    <CardDescription>Ask questions about SAP Ariba, IBP, Fieldglass, and more</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Sample Questions */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Try asking:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sampleQueries.slice(0, 3).map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopilotQuery(query)}
                        className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 text-xs"
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Query Input */}
                <div className="flex items-center space-x-2 mb-6">
                  <Input
                    value={copilotQuery}
                    onChange={(e) => setCopilotQuery(e.target.value)}
                    placeholder="Ask me anything about SAP supply chain solutions..."
                    className="flex-1 bg-gray-800/50 border-gray-600"
                    onKeyPress={(e) => e.key === "Enter" && handleCopilotQuery(copilotQuery)}
                  />
                  <Button
                    onClick={() => handleCopilotQuery(copilotQuery)}
                    disabled={!copilotQuery.trim() || isProcessing}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Brain className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="icon" className="border-gray-600 bg-transparent">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>

                {/* Response */}
                {copilotResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <Brain className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 leading-relaxed">{copilotResponse}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Workshop Form */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Schedule a Free{" "}
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Supply Chain Workshop
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get personalized recommendations for your supply chain transformation
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl">AI-Enhanced Workshop Request</CardTitle>
                <CardDescription>
                  Our AI will analyze your requirements and prepare a customized workshop agenda
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleWorkshopSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Industry Sector *</label>
                      <Select
                        value={workshopForm.sector}
                        onValueChange={(value) => setWorkshopForm({ ...workshopForm, sector: value })}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-gray-600">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="bfsi">Banking & Financial Services</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="energy">Energy & Utilities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current SCM Stack</label>
                      <Input
                        value={workshopForm.currentStack}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, currentStack: e.target.value })}
                        placeholder="e.g., SAP ECC, Oracle SCM, Manual processes"
                        className="bg-gray-800/50 border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Known Challenges (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "High procurement costs",
                        "Supplier performance issues",
                        "Inventory optimization",
                        "Demand forecasting accuracy",
                        "Contract compliance",
                        "Manual processes",
                        "Lack of visibility",
                        "Risk management",
                        "ESG compliance",
                      ].map((challenge) => (
                        <div key={challenge} className="flex items-center space-x-2">
                          <Checkbox
                            id={challenge}
                            checked={workshopForm.challenges.includes(challenge)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setWorkshopForm({
                                  ...workshopForm,
                                  challenges: [...workshopForm.challenges, challenge],
                                })
                              } else {
                                setWorkshopForm({
                                  ...workshopForm,
                                  challenges: workshopForm.challenges.filter((c) => c !== challenge),
                                })
                              }
                            }}
                          />
                          <label htmlFor={challenge} className="text-sm text-gray-300">
                            {challenge}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Workshop Goals (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Cost reduction strategies",
                        "Process automation",
                        "Supplier optimization",
                        "Predictive analytics",
                        "Digital transformation",
                        "Compliance improvement",
                      ].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal}
                            checked={workshopForm.goals.includes(goal)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setWorkshopForm({
                                  ...workshopForm,
                                  goals: [...workshopForm.goals, goal],
                                })
                              } else {
                                setWorkshopForm({
                                  ...workshopForm,
                                  goals: workshopForm.goals.filter((g) => g !== goal),
                                })
                              }
                            }}
                          />
                          <label htmlFor={goal} className="text-sm text-gray-300">
                            {goal}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                      <Input
                        value={workshopForm.company}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, company: e.target.value })}
                        placeholder="Your company name"
                        className="bg-gray-800/50 border-gray-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                      <Input
                        value={workshopForm.name}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-gray-800/50 border-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={workshopForm.email}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, email: e.target.value })}
                        placeholder="your.email@company.com"
                        className="bg-gray-800/50 border-gray-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <Input
                        value={workshopForm.phone}
                        onChange={(e) => setWorkshopForm({ ...workshopForm, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="bg-gray-800/50 border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
                    <Textarea
                      value={workshopForm.message}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, message: e.target.value })}
                      placeholder="Tell us more about your specific requirements or questions..."
                      rows={4}
                      className="bg-gray-800/50 border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upload Sample Procurement Report (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Drag and drop your file here, or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, Excel, CSV (Max 10MB)</p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  >
                    Schedule My Free Workshop
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
