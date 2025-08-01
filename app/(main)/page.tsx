"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Brain,
  Database,
  Cloud,
  Shield,
  Users,
  BarChart3,
  TrendingUp,
  Play,
  Target,
  Building,
  Factory,
  ShoppingCart,
  Heart,
  GraduationCap,
  Banknote,
} from "lucide-react"
import { LiveKPIStream } from "@/components/home/live-kpi-stream"
import { ESGOSModules } from "@/components/home/esg-os-modules"
//import AITechStack from "@/components/home/ai-tech-stack"
import { ReelsUseCases } from "@/components/home/reels-use-cases"
import { TrustedBySection } from "@/components/home/trusted-by-section"
import { VoiceCopilotEntry } from "@/components/home/voice-copilot-entry"
import { SAPAIShowcase } from "@/components/home/sap-ai-showcase"
import { TechInnovationWall } from "@/components/home/tech-innovation-wall"
import { IndustrySolutions } from "@/components/home/industry-solutions"
import { ClientSuccessStories } from "@/components/home/client-success-stories"
import { FloatingActionButton } from "@/components/home/floating-action-button"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import WaterDropButton from "@/components/ui/water-drop-button"
import AICopilot from "@/components/ai/ai-copilot"

// Hero metrics data
const heroMetrics = [
  { value: "34+", label: "AI Workflows Deployed", icon: <Brain className="h-5 w-5" /> },
  { value: "98.7%", label: "Accuracy Rate", icon: <Target className="h-5 w-5" /> },
  { value: "250+", label: "Consultants Placed", icon: <Users className="h-5 w-5" /> },
  { value: "6-Month", label: "Average ROI", icon: <TrendingUp className="h-5 w-5" /> },
]

// Services data
const servicesData = [
  {
    title: "SAP Enterprise Solutions",
    description: "S/4HANA, RISE, BTP implementation and modernization",
    icon: <Database className="h-8 w-8" />,
    href: "/services/sap-enterprise-solutions",
    color: "from-blue-500 to-cyan-500",
    badge: "Most Popular",
    features: ["S/4HANA Migration", "SAP RISE", "BTP Integration", "Fiori Development"],
  },
  {
    title: "SAP Data & AI Analytics",
    description: "Predictive analytics and AI-powered insights",
    icon: <BarChart3 className="h-8 w-8" />,
    href: "/services/sap-data-ai-analytics",
    color: "from-purple-500 to-pink-500",
    badge: "AI-Powered",
    features: ["Predictive Analytics", "Real-time Dashboards", "ML Models", "Data Integration"],
  },
  {
    title: "Digital & AI Solutions",
    description: "Custom AI models and intelligent automation",
    icon: <Brain className="h-8 w-8" />,
    href: "/services/digital-ai-solutions",
    color: "from-cyan-500 to-blue-500",
    badge: "GenAI",
    features: ["Custom AI Models", "Process Automation", "GenAI Solutions", "Digital Strategy"],
  },
  {
    title: "Cloud Solutions",
    description: "Multi-cloud strategy and migration services",
    icon: <Cloud className="h-8 w-8" />,
    href: "/services/cloud-solutions",
    color: "from-green-500 to-teal-500",
    badge: "Multi-Cloud",
    features: ["Cloud Migration", "DevOps", "Multi-cloud Management", "Cost Optimization"],
  },
  {
    title: "Cybersecurity Services",
    description: "AI-powered security and compliance solutions",
    icon: <Shield className="h-8 w-8" />,
    href: "/services/cybersecurity-services",
    color: "from-red-500 to-pink-500",
    badge: "AI-Secured",
    features: ["Threat Detection", "SOC Services", "Compliance", "Risk Assessment"],
  },
  {
    title: "Staffing Solutions",
    description: "H1B visa processing and talent placement",
    icon: <Users className="h-8 w-8" />,
    href: "/services/staffing-solutions",
    color: "from-emerald-500 to-green-500",
    badge: "Talent Focus",
    features: ["H1B Processing", "AI Recruitment", "Talent Pipeline", "Managed Services"],
  },
]

// Industries data
const industriesData = [
  {
    title: "Manufacturing",
    description: "Smart manufacturing and Industry 4.0",
    icon: <Factory className="h-6 w-6" />,
    href: "/industries/manufacturing",
    color: "text-blue-400",
  },
  {
    title: "Retail & E-commerce",
    description: "Omnichannel retail solutions",
    icon: <ShoppingCart className="h-6 w-6" />,
    href: "/industries/retail",
    color: "text-green-400",
  },
  {
    title: "Banking & Finance",
    description: "Digital banking transformation",
    icon: <Banknote className="h-6 w-6" />,
    href: "/industries/bfsi",
    color: "text-yellow-400",
  },
  {
    title: "Healthcare",
    description: "Healthcare digitization",
    icon: <Heart className="h-6 w-6" />,
    href: "/industries/healthcare",
    color: "text-red-400",
  },
  {
    title: "Education",
    description: "EdTech and learning platforms",
    icon: <GraduationCap className="h-6 w-6" />,
    href: "/industries/education",
    color: "text-purple-400",
  },
  {
    title: "Government",
    description: "Public sector modernization",
    icon: <Building className="h-6 w-6" />,
    href: "/industries/public-sector",
    color: "text-indigo-400",
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [currentMetric, setCurrentMetric] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % heroMetrics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight-blue via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-cyan via-neural-violet to-electric-cyan blur-3xl animate-spin-slow"></div>
          </div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neural-violet to-electric-cyan rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-electric-cyan to-success-green rounded-full blur-2xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <Badge
                variant="outline"
                className="px-6 py-3 text-lg border-electric-cyan text-electric-cyan bg-electric-cyan/10 backdrop-blur-md"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                AI-Powered Enterprise Solutions
              </Badge>
            </motion.div>

            {/* Hero Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-8xl font-bold mb-8 text-luminous-white leading-tight">
                Think{" "}
                <span className="bg-gradient-to-r from-electric-cyan via-neural-violet to-electric-cyan bg-clip-text text-transparent animate-gradient-x">
                  SAP
                </span>
                <br />
                Choose{" "}
                <span className="bg-gradient-to-r from-electric-cyan via-neural-violet to-electric-cyan bg-clip-text text-transparent animate-gradient-x">
                  ESG
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Accelerate your digital transformation with our comprehensive SAP and AI solutions. From intelligent
                automation to predictive analytics, we deliver measurable results that drive business growth.
              </p>
            </motion.div>

            {/* Hero Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {heroMetrics.map((metric, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300 ${
                    currentMetric === index ? "scale-105 border-electric-cyan/70" : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-electric-cyan mb-2">{metric.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-luminous-white mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/services">
                <WaterDropButton className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue min-w-[250px] text-lg py-4">
                  Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </WaterDropButton>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 min-w-[250px] text-lg py-4 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Schedule Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live KPI Stream */}
      <LiveKPIStream />

      {/* ESG OS Modules */}
      <ESGOSModules />

      {/* AI Technology Stack */}
      {/* <AITechStack />*/}

      {/* SAP AI Showcase */}
      <SAPAIShowcase />

      {/* Technology Innovation Wall */}
      <TechInnovationWall />

      {/* Industry Solutions */}
      <IndustrySolutions />

      {/* Reels Use Cases */}
      {/* <ReelsUseCases />  */}
      
      {/* Client Success Stories */}
     {/* <ClientSuccessStories /> */}

      {/* Trusted By Section */}
     {/* <TrustedBySection /> */}

      {/* Voice Copilot Entry Point */}
      <VoiceCopilotEntry />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* AI Copilot */}
      <AICopilot />
    </div>
  )
}
