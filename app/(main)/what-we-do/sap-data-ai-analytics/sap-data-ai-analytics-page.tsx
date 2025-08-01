"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  ChevronRight,
  BarChart3,
  Database,
  LineChart,
  PieChart,
  Brain,
  Zap,
  MessageSquare,
  Download,
  Layers,
  Search,
  TrendingUp,
  FileText,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"

// Dynamically import the Lottie component to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
})

// Sample data for charts
const insightGenerationData = [
  { month: "Jan", traditional: 120, aiEnhanced: 350 },
  { month: "Feb", traditional: 140, aiEnhanced: 420 },
  { month: "Mar", traditional: 160, aiEnhanced: 480 },
  { month: "Apr", traditional: 180, aiEnhanced: 550 },
  { month: "May", traditional: 200, aiEnhanced: 620 },
  { month: "Jun", traditional: 220, aiEnhanced: 700 },
  { month: "Jul", traditional: 240, aiEnhanced: 780 },
  { month: "Aug", traditional: 260, aiEnhanced: 850 },
  { month: "Sep", traditional: 280, aiEnhanced: 920 },
  { month: "Oct", traditional: 300, aiEnhanced: 1000 },
  { month: "Nov", traditional: 320, aiEnhanced: 1080 },
  { month: "Dec", traditional: 340, aiEnhanced: 1150 },
]

const forecastAccuracyData = [
  { month: "Jan", traditional: 68, aiEnhanced: 92 },
  { month: "Feb", traditional: 70, aiEnhanced: 93 },
  { month: "Mar", traditional: 69, aiEnhanced: 94 },
  { month: "Apr", traditional: 72, aiEnhanced: 95 },
  { month: "May", traditional: 74, aiEnhanced: 95 },
  { month: "Jun", traditional: 73, aiEnhanced: 96 },
  { month: "Jul", traditional: 75, aiEnhanced: 96 },
  { month: "Aug", traditional: 77, aiEnhanced: 97 },
  { month: "Sep", traditional: 76, aiEnhanced: 97 },
  { month: "Oct", traditional: 78, aiEnhanced: 98 },
  { month: "Nov", traditional: 80, aiEnhanced: 98 },
  { month: "Dec", traditional: 82, aiEnhanced: 99 },
]

// Analytics capabilities
const analyticsCapabilities = [
  {
    id: "predictive",
    title: "Predictive Analytics",
    icon: <TrendingUp className="h-6 w-6" />,
    description: "Forecast future trends and outcomes with advanced machine learning algorithms",
    features: [
      "AI-powered demand forecasting",
      "Predictive maintenance",
      "Customer behavior prediction",
      "Risk assessment and mitigation",
    ],
  },
  {
    id: "descriptive",
    title: "Descriptive Analytics",
    icon: <BarChart3 className="h-6 w-6" />,
    description: "Gain deep insights into historical data patterns and performance metrics",
    features: ["Interactive dashboards", "Automated reporting", "Performance benchmarking", "Trend analysis"],
  },
  {
    id: "prescriptive",
    title: "Prescriptive Analytics",
    icon: <FileText className="h-6 w-6" />,
    description: "Receive AI-generated recommendations for optimal business decisions",
    features: ["Decision optimization", "Scenario modeling", "Resource allocation", "Strategy recommendations"],
  },
  {
    id: "cognitive",
    title: "Cognitive Analytics",
    icon: <Brain className="h-6 w-6" />,
    description: "Leverage advanced AI capabilities to extract insights from unstructured data",
    features: ["Natural language processing", "Image and video analysis", "Sentiment analysis", "Pattern recognition"],
  },
]

// Implementation phases
const implementationPhases = [
  {
    id: "assessment",
    title: "Data Assessment",
    description: "We evaluate your current data landscape and identify opportunities for improvement",
    aiFeature: "AI-powered data quality assessment automatically identifies data issues and optimization opportunities",
    icon: <Search className="h-6 w-6" />,
  },
  {
    id: "architecture",
    title: "Data Architecture",
    description: "We design a scalable, future-proof data architecture tailored to your needs",
    aiFeature: "Machine learning algorithms recommend optimal data models based on your specific requirements",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    id: "integration",
    title: "Data Integration",
    description: "We seamlessly integrate data from multiple sources into a unified platform",
    aiFeature: "Automated data mapping and transformation accelerates integration while ensuring data quality",
    icon: <Database className="h-6 w-6" />,
  },
  {
    id: "analytics",
    title: "Analytics Implementation",
    description: "We deploy advanced analytics capabilities that deliver actionable insights",
    aiFeature: "AI-driven insight generation provides immediate value while continuously improving over time",
    icon: <Zap className="h-6 w-6" />,
  },
]

// Client testimonials
const testimonials = [
  {
    quote:
      "The AI-powered analytics platform has transformed how we make decisions. We're now able to predict market trends with 95% accuracy, giving us a significant competitive advantage.",
    author: "David Chen",
    title: "CIO, Global Retail Corp",
    company: "Global Retail Corp",
  },
  {
    quote:
      "ESG's SAP Data & AI Analytics solution has reduced our reporting time from days to minutes while providing deeper insights than we ever thought possible.",
    author: "Jennifer Williams",
    title: "VP of Analytics, Manufacturing Excellence",
    company: "Manufacturing Excellence",
  },
  {
    quote:
      "The predictive maintenance capabilities have reduced our equipment downtime by 78% and saved us millions in maintenance costs. The ROI has been extraordinary.",
    author: "Robert Johnson",
    title: "Director of Operations, Energy Innovations",
    company: "Energy Innovations",
  },
]

export default function SAPDataAIAnalyticsPage() {
  const { theme } = useTheme()
  const [activeCapability, setActiveCapability] = useState("predictive")
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

  // Get current capability
  const currentCapability =
    analyticsCapabilities.find((capability) => capability.id === activeCapability) || analyticsCapabilities[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5" />

          {/* Animated particles */}
          {isClient && (
            <>
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
              <Badge variant="outline" className="mb-4 px-3 py-1 border-purple-500 text-purple-500 bg-purple-500/5">
                SAP Data & AI Analytics
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Transform Data into{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                  Intelligent Insights
                </span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8 max-w-xl">
                Harness the power of artificial intelligence and advanced analytics to unlock the full potential of your
                SAP data and drive smarter business decisions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                >
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                Analytics Benefits
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our SAP Data & AI Analytics solutions leverage artificial intelligence to deliver transformative benefits
              that traditional analytics simply can't match.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "95% Forecast Accuracy",
                description:
                  "AI-powered predictive models deliver unprecedented accuracy in forecasting business outcomes",
                icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
              },
              {
                title: "10x Faster Insights",
                description: "Automated data processing and analysis generates insights in minutes instead of days",
                icon: <Zap className="h-6 w-6 text-purple-500" />,
              },
              {
                title: "360° Data View",
                description:
                  "Unified data platform integrates all your data sources for a complete business perspective",
                icon: <PieChart className="h-6 w-6 text-purple-500" />,
              },
              {
                title: "70% Reduced Decision Time",
                description: "AI-driven recommendations accelerate decision-making processes across your organization",
                icon: <Brain className="h-6 w-6 text-purple-500" />,
              },
              {
                title: "85% Automated Reporting",
                description:
                  "Intelligent automation eliminates manual reporting tasks, freeing your team for strategic work",
                icon: <FileText className="h-6 w-6 text-purple-500" />,
              },
              {
                title: "40% Cost Optimization",
                description: "Data-driven insights identify cost-saving opportunities throughout your business",
                icon: <LineChart className="h-6 w-6 text-purple-500" />,
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              >
                <div className="p-3 bg-purple-500/10 rounded-lg inline-block mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Capabilities Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                Analytics Capabilities
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our SAP Data & AI Analytics solutions provide a complete spectrum of capabilities to transform your data
              into actionable intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Capability navigation */}
            <div className="lg:col-span-4">
              <div className="space-y-4">
                {analyticsCapabilities.map((capability) => (
                  <motion.div
                    key={capability.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                      activeCapability === capability.id
                        ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/5"
                        : "border-border bg-card/50 hover:bg-card"
                    }`}
                    onClick={() => setActiveCapability(capability.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-4 ${
                          activeCapability === capability.id ? "bg-purple-500 text-white" : "bg-foreground/10"
                        }`}
                      >
                        {capability.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{capability.title}</h3>
                        <p className="text-sm text-foreground/70 line-clamp-1">{capability.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Capability details */}
            <motion.div
              key={activeCapability}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-500 rounded-lg text-white mr-4">{currentCapability.icon}</div>
                <h3 className="text-2xl font-bold">{currentCapability.title}</h3>
              </div>

              <p className="text-foreground/80 mb-6">{currentCapability.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentCapability.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 text-purple-500">
                      <Check className="h-5 w-5" />
                    </div>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-start">
                  <Brain className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">AI Enhancement</h4>
                    <p className="text-sm text-foreground/70">
                      Our {currentCapability.title} capabilities are enhanced with artificial intelligence to deliver
                      deeper insights, greater accuracy, and continuous improvement based on your unique data patterns.
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                Implementation Methodology
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our implementation approach leverages artificial intelligence to accelerate timelines, ensure data
              quality, and deliver immediate value.
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
                      activePhase === index ? "bg-purple-500" : "bg-foreground/20"
                    } hidden md:block transition-colors duration-300`}
                  ></div>

                  <div
                    className={`bg-card/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
                      activePhase === index
                        ? "border-purple-500 shadow-lg shadow-purple-500/5"
                        : "border-border hover:border-purple-500/50"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-lg mr-4 ${
                          activePhase === index ? "bg-purple-500 text-white" : "bg-foreground/10"
                        }`}
                      >
                        {phase.icon}
                      </div>
                      <h3 className="text-xl font-bold">{phase.title}</h3>
                    </div>

                    <p className="text-foreground/80 mb-4">{phase.description}</p>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-start">
                        <Brain className="h-5 w-5 text-purple-500 mr-3 mt-1" />
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                Success Metrics
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our AI-enhanced analytics solutions consistently outperform traditional approaches across key metrics.
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
              <h3 className="text-xl font-bold mb-4">Insight Generation Capacity</h3>
              <p className="text-foreground/70 mb-6">
                AI-enhanced analytics generates significantly more actionable insights compared to traditional methods.
              </p>

              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    traditional: {
                      label: "Traditional Analytics",
                      color: "hsl(var(--chart-1))",
                    },
                    aiEnhanced: {
                      label: "AI-Enhanced Analytics",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={insightGenerationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="traditional"
                        stackId="1"
                        stroke="var(--color-traditional)"
                        fill="var(--color-traditional)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="aiEnhanced"
                        stackId="2"
                        stroke="var(--color-aiEnhanced)"
                        fill="var(--color-aiEnhanced)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
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
              <Tabs defaultValue="accuracy" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                  <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                  <TabsTrigger value="roi">ROI</TabsTrigger>
                </TabsList>

                <TabsContent value="accuracy" className="mt-0">
                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Accuracy Metrics</h3>
                      <div className="space-y-6">
                        {[
                          {
                            metric: "Forecast Accuracy",
                            traditional: "70-75%",
                            aiEnhanced: "95-98%",
                            improvement: "30% higher",
                          },
                          {
                            metric: "Data Quality Score",
                            traditional: "82%",
                            aiEnhanced: "99%",
                            improvement: "21% higher",
                          },
                          {
                            metric: "Anomaly Detection",
                            traditional: "65%",
                            aiEnhanced: "97%",
                            improvement: "49% higher",
                          },
                          {
                            metric: "Pattern Recognition",
                            traditional: "Limited",
                            aiEnhanced: "Comprehensive",
                            improvement: "5x more patterns",
                          },
                          {
                            metric: "Insight Relevance",
                            traditional: "60%",
                            aiEnhanced: "92%",
                            improvement: "53% higher",
                          },
                        ].map((item, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4">
                            <div className="font-medium">{item.metric}</div>
                            <div className="text-foreground/70">{item.traditional}</div>
                            <div className="text-purple-500 font-medium">{item.aiEnhanced}</div>
                            <div className="text-green-500">{item.improvement}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="efficiency" className="mt-0">
                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Efficiency Metrics</h3>
                      <div className="space-y-6">
                        {[
                          {
                            metric: "Time to Insight",
                            traditional: "Days/Weeks",
                            aiEnhanced: "Minutes/Hours",
                            improvement: "90% faster",
                          },
                          {
                            metric: "Report Generation",
                            traditional: "Manual",
                            aiEnhanced: "Automated",
                            improvement: "85% time saved",
                          },
                          {
                            metric: "Data Processing",
                            traditional: "Batch",
                            aiEnhanced: "Real-time",
                            improvement: "Immediate results",
                          },
                          {
                            metric: "Analysis Depth",
                            traditional: "Surface-level",
                            aiEnhanced: "Multi-dimensional",
                            improvement: "3x deeper insights",
                          },
                          {
                            metric: "Resource Utilization",
                            traditional: "High",
                            aiEnhanced: "Optimized",
                            improvement: "60% more efficient",
                          },
                        ].map((item, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4">
                            <div className="font-medium">{item.metric}</div>
                            <div className="text-foreground/70">{item.traditional}</div>
                            <div className="text-purple-500 font-medium">{item.aiEnhanced}</div>
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
                            aiEnhanced: "75%",
                            improvement: "25% savings",
                          },
                          {
                            metric: "Time to ROI",
                            traditional: "18 months",
                            aiEnhanced: "6 months",
                            improvement: "67% faster",
                          },
                          {
                            metric: "Decision Quality",
                            traditional: "Good",
                            aiEnhanced: "Excellent",
                            improvement: "35% better outcomes",
                          },
                          {
                            metric: "Revenue Impact",
                            traditional: "5-10%",
                            aiEnhanced: "15-25%",
                            improvement: "2.5x higher impact",
                          },
                          {
                            metric: "Cost Reduction",
                            traditional: "10-15%",
                            aiEnhanced: "30-40%",
                            improvement: "3x greater savings",
                          },
                        ].map((item, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4">
                            <div className="font-medium">{item.metric}</div>
                            <div className="text-foreground/70">{item.traditional}</div>
                            <div className="text-purple-500 font-medium">{item.aiEnhanced}</div>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Hear from organizations that have transformed their decision-making with our AI-enhanced SAP Data & AI
              Analytics solutions.
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
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              >
                <div className="mb-4">
                  <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                Questions
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Get answers to common questions about our AI-enhanced SAP Data & AI Analytics solutions.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does AI enhance SAP analytics?",
                  answer:
                    "AI enhances SAP analytics by automating data preparation, identifying patterns humans might miss, generating predictive insights, providing natural language interfaces for data exploration, and continuously learning from new data to improve accuracy over time. These capabilities deliver deeper insights, greater accuracy, and faster time-to-value compared to traditional analytics approaches.",
                },
                {
                  question: "What types of data can your solutions analyze?",
                  answer:
                    "Our solutions can analyze virtually any type of data from any source, including structured data from SAP and other enterprise systems, semi-structured data like JSON and XML, and unstructured data such as text, images, videos, and social media. Our AI capabilities enable us to extract meaningful insights from all these data types and integrate them into a unified analytics platform.",
                },
                {
                  question: "How long does it take to implement your analytics solution?",
                  answer:
                    "Implementation timelines vary based on scope, complexity, and data readiness. However, our AI-enhanced approach typically reduces implementation time by 60-70% compared to traditional methods. A mid-sized implementation that might take 6-9 months with traditional methods can often be completed in 2-3 months with our AI-enhanced approach, with initial insights available within weeks.",
                },
                {
                  question: "What kind of ROI can we expect?",
                  answer:
                    "Organizations implementing our AI-enhanced SAP Data & AI Analytics solutions typically see ROI within 6 months, compared to 18+ months for traditional implementations. The accelerated ROI comes from faster implementation, improved decision quality, revenue growth through data-driven opportunities, and cost reduction through operational optimizations identified by the analytics.",
                },
                {
                  question: "How do you ensure data security and privacy?",
                  answer:
                    "Security and privacy are built into every aspect of our solutions. We implement robust data encryption, role-based access controls, data anonymization where appropriate, and comprehensive audit trails. Our solutions comply with major regulations like GDPR, CCPA, and HIPAA. Additionally, our AI models are trained to identify and protect sensitive data automatically.",
                },
                {
                  question: "Can your solutions integrate with our existing systems?",
                  answer:
                    "Yes, our SAP Data & AI Analytics solutions are designed for seamless integration with your existing technology ecosystem. We support native integration with all SAP systems, as well as hundreds of other data sources and applications through pre-built connectors. Our AI capabilities can also help automate the integration process, reducing implementation time and effort.",
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
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  Ready to Transform Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                    Data Strategy?
                  </span>
                </h2>
                <p className="text-xl text-foreground/80 mb-8 text-center">
                  Schedule a personalized demo to see how our AI-enhanced SAP Data & AI Analytics solutions can drive
                  smarter decisions for your business.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 min-w-[200px]">
                    Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500/10 min-w-[200px]"
                  >
                    Download Whitepaper <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center text-foreground/60 text-sm">
                  <p>No commitment required. See the power of AI-enhanced analytics in action.</p>
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
                <MessageSquare className="h-6 w-6 text-purple-500" />
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
