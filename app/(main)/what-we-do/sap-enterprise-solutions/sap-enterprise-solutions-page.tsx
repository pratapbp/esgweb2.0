"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  Check,
  ChevronRight,
  Database,
  Layers,
  Cpu,
  BarChart3,
  Users,
  Shield,
  Workflow,
  Brain,
  Zap,
  MessageSquare,
  Download,
  LucideLineChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Dynamically import the Lottie component to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
})

// Sample data for charts
const implementationSuccessData = [
  { month: "Jan", traditional: 65, aiEnhanced: 85 },
  { month: "Feb", traditional: 68, aiEnhanced: 87 },
  { month: "Mar", traditional: 67, aiEnhanced: 89 },
  { month: "Apr", traditional: 70, aiEnhanced: 90 },
  { month: "May", traditional: 72, aiEnhanced: 92 },
  { month: "Jun", traditional: 71, aiEnhanced: 94 },
  { month: "Jul", traditional: 74, aiEnhanced: 95 },
  { month: "Aug", traditional: 76, aiEnhanced: 96 },
  { month: "Sep", traditional: 75, aiEnhanced: 97 },
  { month: "Oct", traditional: 78, aiEnhanced: 98 },
  { month: "Nov", traditional: 80, aiEnhanced: 98 },
  { month: "Dec", traditional: 82, aiEnhanced: 99 },
]

// SAP modules
const sapModules = [
  {
    id: "finance",
    title: "Finance",
    icon: <LucideLineChart className="h-6 w-6" />,
    description: "Streamline financial operations with intelligent automation and real-time insights",
    features: [
      "AI-powered financial forecasting",
      "Automated reconciliation",
      "Real-time financial reporting",
      "Intelligent cash flow management",
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    icon: <Workflow className="h-6 w-6" />,
    description: "Optimize your supply chain with predictive analytics and end-to-end visibility",
    features: [
      "Predictive inventory management",
      "AI-driven demand forecasting",
      "Intelligent supplier management",
      "Real-time supply chain visibility",
    ],
  },
  {
    id: "hr",
    title: "Human Resources",
    icon: <Users className="h-6 w-6" />,
    description: "Transform HR processes with intelligent automation and employee-centric solutions",
    features: [
      "AI-powered talent acquisition",
      "Intelligent employee onboarding",
      "Predictive workforce analytics",
      "Automated HR compliance",
    ],
  },
  {
    id: "sales",
    title: "Sales & Distribution",
    icon: <BarChart3 className="h-6 w-6" />,
    description: "Accelerate sales cycles with AI-driven insights and automated processes",
    features: [
      "Predictive sales forecasting",
      "AI-powered lead scoring",
      "Intelligent pricing optimization",
      "Automated order processing",
    ],
  },
]

// Implementation phases
const implementationPhases = [
  {
    id: "discovery",
    title: "Discovery & Assessment",
    description: "We analyze your current systems and processes to identify opportunities for improvement",
    aiFeature: "AI-powered process mining automatically discovers inefficiencies and optimization opportunities",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    id: "design",
    title: "Solution Design",
    description: "We design a tailored SAP solution that addresses your specific business needs",
    aiFeature: "Machine learning algorithms recommend optimal configurations based on your industry and requirements",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    id: "implementation",
    title: "Implementation",
    description: "We deploy your SAP solution with minimal disruption to your business operations",
    aiFeature: "Automated testing and validation ensures a smooth deployment with fewer errors",
    icon: <Database className="h-6 w-6" />,
  },
  {
    id: "optimization",
    title: "Continuous Optimization",
    description: "We continuously monitor and optimize your SAP environment for peak performance",
    aiFeature: "AI-driven performance monitoring identifies and resolves issues before they impact your business",
    icon: <Zap className="h-6 w-6" />,
  },
]

// Client testimonials
const testimonials = [
  {
    quote:
      "The AI-powered implementation approach reduced our go-live timeline by 40% while ensuring a smoother transition for our users.",
    author: "Sarah Johnson",
    title: "CIO, Global Manufacturing Corp",
    company: "Global Manufacturing Corp",
  },
  {
    quote:
      "ESG's AI-enhanced SAP solution has transformed our financial operations, reducing month-end close time by 65% and improving forecast accuracy by 30%.",
    author: "Michael Chen",
    title: "CFO, TechSolutions Inc",
    company: "TechSolutions Inc",
  },
  {
    quote:
      "The intelligent automation capabilities have eliminated over 2,000 hours of manual work per month, allowing our team to focus on strategic initiatives.",
    author: "Priya Patel",
    title: "VP of Operations, Enterprise Systems Ltd",
    company: "Enterprise Systems Ltd",
  },
]

export default function SAPEnterpriseSolutionsPage() {
  const { theme } = useTheme()
  const [activeModule, setActiveModule] = useState("finance")
  const [activePhase, setActivePhase] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [animationData, setAnimationData] = useState(null)

  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])

  // Load animation data
  useEffect(() => {
    setIsClient(true)

    const loadAnimationData = async () => {
      try {
        const data = await import("/animations/data-flow.json")
        setAnimationData(data.default)
      } catch (error) {
        console.error("Failed to load animation data:", error)
      }
    }

    loadAnimationData()
  }, [])

  // Auto-advance implementation phases
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setActivePhase((prev) => (prev === implementationPhases.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isClient])

  // Get current module
  const currentModule = sapModules.find((module) => module.id === activeModule) || sapModules[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />

          {/* Animated particles */}
          {isClient && (
            <>
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </>
          )}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ opacity, y }}
              className="relative z-10"
            >
              <Badge variant="outline" className="mb-4 px-3 py-1 border-blue-500 text-blue-500 bg-blue-500/5">
                SAP Enterprise Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Intelligent SAP Solutions for the{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  AI-Driven Enterprise
                </span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8 max-w-xl">
                Transform your business with our comprehensive SAP Enterprise Solutions, enhanced with AI to deliver
                unprecedented efficiency, insight, and competitive advantage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
                  Explore Solutions <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
            >
              {isClient && animationData && (
                <div className="w-full h-full max-w-lg mx-auto">
                  <Lottie animationData={animationData} loop={true} autoplay={true} className="w-full h-full" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI-Enhanced Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Enhanced{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Benefits
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our SAP Enterprise Solutions leverage artificial intelligence to deliver transformative benefits that
              traditional implementations simply can't match.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "40% Faster Implementation",
                description:
                  "AI-powered automation accelerates implementation timelines while reducing risk and disruption",
                icon: <Zap className="h-6 w-6 text-blue-500" />,
              },
              {
                title: "65% Reduction in Manual Tasks",
                description:
                  "Intelligent automation eliminates repetitive tasks, freeing your team to focus on strategic initiatives",
                icon: <Workflow className="h-6 w-6 text-blue-500" />,
              },
              {
                title: "30% Improved Forecast Accuracy",
                description:
                  "Machine learning algorithms analyze historical data to deliver more accurate forecasts and predictions",
                icon: <LucideLineChart className="h-6 w-6 text-blue-500" />,
              },
              {
                title: "25% Lower Total Cost of Ownership",
                description: "AI-driven optimization reduces infrastructure costs and maximizes resource utilization",
                icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
              },
              {
                title: "90% Faster Issue Resolution",
                description:
                  "Predictive maintenance and automated troubleshooting resolve issues before they impact your business",
                icon: <Shield className="h-6 w-6 text-blue-500" />,
              },
              {
                title: "50% Enhanced User Adoption",
                description: "Personalized training and intuitive interfaces accelerate user adoption and productivity",
                icon: <Users className="h-6 w-6 text-blue-500" />,
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="p-3 bg-blue-500/10 rounded-lg inline-block mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAP Modules Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                SAP Modules
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our SAP Enterprise Solutions cover all core business functions with AI-enhanced capabilities for maximum
              impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Module navigation */}
            <div className="lg:col-span-4">
              <div className="space-y-4">
                {sapModules.map((module) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                      activeModule === module.id
                        ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/5"
                        : "border-border bg-card/50 hover:bg-card"
                    }`}
                    onClick={() => setActiveModule(module.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-4 ${
                          activeModule === module.id ? "bg-blue-500 text-white" : "bg-foreground/10"
                        }`}
                      >
                        {module.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-foreground/70 line-clamp-1">{module.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Module details */}
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-500 rounded-lg text-white mr-4">{currentModule.icon}</div>
                <h3 className="text-2xl font-bold">{currentModule.title}</h3>
              </div>

              <p className="text-foreground/80 mb-6">{currentModule.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentModule.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 text-blue-500">
                      <Check className="h-5 w-5" />
                    </div>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start">
                  <Brain className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">AI Enhancement</h4>
                    <p className="text-sm text-foreground/70">
                      Our {currentModule.title} module is enhanced with artificial intelligence to automate routine
                      tasks, provide predictive insights, and continuously optimize performance based on your unique
                      business patterns.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Implementation Methodology Section */}
      <section className="py-20 bg-gradient-to-b from-background/90 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Driven{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Implementation Methodology
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our implementation approach leverages artificial intelligence to accelerate timelines, reduce risk, and
              ensure successful outcomes.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-foreground/10 hidden md:block"></div>

            {/* Phases */}
            <div className="space-y-12 relative">
              {implementationPhases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"} md:w-1/2`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute top-6 ${
                      index % 2 === 0 ? "md:-left-3" : "md:-right-3"
                    } w-6 h-6 rounded-full border-4 border-background ${
                      activePhase === index ? "bg-blue-500" : "bg-foreground/20"
                    } hidden md:block transition-colors duration-300`}
                  ></div>

                  <div
                    className={`bg-card/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
                      activePhase === index
                        ? "border-blue-500 shadow-lg shadow-blue-500/5"
                        : "border-border hover:border-blue-500/50"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-lg mr-4 ${
                          activePhase === index ? "bg-blue-500 text-white" : "bg-foreground/10"
                        }`}
                      >
                        {phase.icon}
                      </div>
                      <h3 className="text-xl font-bold">{phase.title}</h3>
                    </div>

                    <p className="text-foreground/80 mb-4">{phase.description}</p>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start">
                        <Brain className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                        <p className="text-sm">{phase.aiFeature}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Measurable{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Success Metrics
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our AI-enhanced SAP implementations consistently outperform traditional approaches across key metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">Implementation Success Rate</h3>
              <p className="text-foreground/70 mb-6">
                AI-enhanced implementations consistently achieve higher success rates compared to traditional
                approaches.
              </p>

              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    traditional: {
                      label: "Traditional Implementation",
                      color: "hsl(var(--chart-1))",
                    },
                    aiEnhanced: {
                      label: "AI-Enhanced Implementation",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={implementationSuccessData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="traditional"
                        stroke="var(--color-traditional)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="aiEnhanced"
                        stroke="var(--color-aiEnhanced)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </motion.div>

            {/* Key metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Tabs defaultValue="implementation" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="roi">ROI</TabsTrigger>
                </TabsList>

                <TabsContent value="implementation" className="mt-0">
                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Implementation Metrics</h3>
                      <div className="space-y-6">
                        {[
                          {
                            metric: "Time to Value",
                            traditional: "12-18 months",
                            aiEnhanced: "6-9 months",
                            improvement: "50% faster",
                          },
                          {
                            metric: "Implementation Success Rate",
                            traditional: "65%",
                            aiEnhanced: "95%",
                            improvement: "46% higher",
                          },
                          {
                            metric: "User Adoption Rate",
                            traditional: "72%",
                            aiEnhanced: "94%",
                            improvement: "31% higher",
                          },
                          {
                            metric: "Defect Rate",
                            traditional: "15%",
                            aiEnhanced: "3%",
                            improvement: "80% reduction",
                          },
                          {
                            metric: "Change Request Volume",
                            traditional: "High",
                            aiEnhanced: "Low",
                            improvement: "65% reduction",
                          },
                        ].map((item, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4">
                            <div className="font-medium">{item.metric}</div>
                            <div className="text-foreground/70">{item.traditional}</div>
                            <div className="text-blue-500 font-medium">{item.aiEnhanced}</div>
                            <div className="text-green-500">{item.improvement}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="performance" className="mt-0">
                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
                      <div className="space-y-6">
                        {[
                          {
                            metric: "System Response Time",
                            traditional: "1.2 seconds",
                            aiEnhanced: "0.3 seconds",
                            improvement: "75% faster",
                          },
                          {
                            metric: "Transaction Processing",
                            traditional: "500/sec",
                            aiEnhanced: "2,000/sec",
                            improvement: "300% higher",
                          },
                          {
                            metric: "Report Generation",
                            traditional: "45 seconds",
                            aiEnhanced: "8 seconds",
                            improvement: "82% faster",
                          },
                          {
                            metric: "Data Processing",
                            traditional: "Batch",
                            aiEnhanced: "Real-time",
                            improvement: "Immediate insights",
                          },
                          {
                            metric: "System Availability",
                            traditional: "99.5%",
                            aiEnhanced: "99.99%",
                            improvement: "10x less downtime",
                          },
                        ].map((item, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4">
                            <div className="font-medium">{item.metric}</div>
                            <div className="text-foreground/70">{item.traditional}</div>
                            <div className="text-blue-500 font-medium">{item.aiEnhanced}</div>
                            <div className="text-green-500">{item.improvement}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="roi" className="mt-0">
                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">ROI Metrics</h3>
                      <div className="space-y-6">
                        {[
                          {
                            metric: "Implementation Cost",
                            traditional: "100%",
                            aiEnhanced: "70%",
                            improvement: "30% savings",
                          },
                          {
                            metric: "Time to ROI",
                            traditional: "24 months",
                            aiEnhanced: "9 months",
                            improvement: "62% faster",
                          },
                          {
                            metric: "5-Year TCO",
                            traditional: "100%",
                            aiEnhanced: "65%",
                            improvement: "35% savings",
                          },
                          {
                            metric: "Operational Efficiency",
                            traditional: "15% improvement",
                            aiEnhanced: "45% improvement",
                            improvement: "3x better results",
                          },
                          {
                            metric: "Business Value",
                            traditional: "Moderate",
                            aiEnhanced: "Transformative",
                            improvement: "2.5x higher value",
                          },
                        ].map((item, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4">
                            <div className="font-medium">{item.metric}</div>
                            <div className="text-foreground/70">{item.traditional}</div>
                            <div className="text-blue-500 font-medium">{item.aiEnhanced}</div>
                            <div className="text-green-500">{item.improvement}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-background/90 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Hear from organizations that have transformed their operations with our AI-enhanced SAP Enterprise
              Solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="mb-4">
                  <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</blockquote>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Questions
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Get answers to common questions about our AI-enhanced SAP Enterprise Solutions.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does AI enhance SAP implementations?",
                  answer:
                    "AI enhances SAP implementations in multiple ways: automating routine tasks, providing predictive insights for better decision-making, optimizing system performance, accelerating data migration and cleansing, and personalizing user experiences. These enhancements lead to faster implementations, lower costs, and better business outcomes.",
                },
                {
                  question: "What SAP modules do you support?",
                  answer:
                    "We support all core SAP modules including Finance, Supply Chain, Human Resources, Sales & Distribution, Production Planning, Materials Management, and more. Our AI enhancements can be applied to any SAP module to improve performance, usability, and business value.",
                },
                {
                  question: "How long does an AI-enhanced SAP implementation take?",
                  answer:
                    "Implementation timelines vary based on scope, complexity, and organizational readiness. However, our AI-enhanced approach typically reduces implementation time by 40-50% compared to traditional methods. A mid-sized implementation that might take 12-18 months with traditional methods can often be completed in 6-9 months with our AI-enhanced approach.",
                },
                {
                  question: "What kind of ROI can we expect?",
                  answer:
                    "Organizations implementing our AI-enhanced SAP solutions typically see ROI within 9 months, compared to 24+ months for traditional implementations. The accelerated ROI comes from faster implementation, lower total cost of ownership, improved operational efficiency, and enhanced business insights that drive better decision-making.",
                },
                {
                  question: "How do you ensure successful user adoption?",
                  answer:
                    "Our AI-enhanced approach includes personalized training recommendations, intuitive user interfaces, and intelligent help systems that adapt to individual user behavior. This personalized approach leads to user adoption rates of 94%, compared to 72% for traditional implementations.",
                },
                {
                  question: "Do you support cloud, on-premises, and hybrid deployments?",
                  answer:
                    "Yes, our AI-enhanced SAP solutions support all deployment models including cloud (public, private, and hybrid), on-premises, and hybrid approaches. Our AI capabilities can help optimize your deployment strategy based on your specific business requirements, security needs, and performance expectations.",
                },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-foreground/70">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background/90 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-blue-500/20 relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  Ready to Transform Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                    Enterprise?
                  </span>
                </h2>
                <p className="text-xl text-foreground/80 mb-8 text-center">
                  Schedule a personalized demo to see how our AI-enhanced SAP Enterprise Solutions can drive results for
                  your business.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 min-w-[200px]">
                    Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500/10 min-w-[200px]"
                  >
                    Download Whitepaper <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center text-foreground/60 text-sm">
                  <p>No commitment required. See the power of AI-enhanced SAP in action.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Widget */}
      {isClient && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="relative">
            <button className="bg-card rounded-full p-4 shadow-lg border border-border">
              <div className="relative">
                <MessageSquare className="h-6 w-6 text-blue-500" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </div>
            </button>
            <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-card text-foreground rounded-full px-4 py-2 text-sm font-medium shadow-lg border border-border">
              Chat with our AI assistant 👋
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
