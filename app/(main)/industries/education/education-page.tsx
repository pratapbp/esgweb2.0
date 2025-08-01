"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  GraduationCap,
  Users,
  Globe,
  Lightbulb,
  Shield,
  Leaf,
  Brain,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Target,
  Zap,
  Heart,
  Star,
  MessageCircle,
  Play,
  Download,
  Calendar,
  BookOpen,
  Monitor,
  Smartphone,
  Cloud,
  BarChart3,
  Accessibility,
  Recycle,
  TreePine,
  Database,
  Droplets,
} from "lucide-react"

// Animated Education Icon Component
const AnimatedEducationIcon = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <svg width="96" height="96" viewBox="0 0 96 96" className="absolute">
        <defs>
          <linearGradient id="educationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="educationGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Graduation Cap */}
        <motion.g
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <rect
            x="20"
            y="35"
            width="56"
            height="8"
            fill="url(#educationGradient)"
            rx="4"
            filter="url(#educationGlow)"
          />
          <polygon points="48,25 35,35 61,35" fill="url(#educationGradient)" filter="url(#educationGlow)" />
          <rect x="46" y="43" width="4" height="20" fill="url(#educationGradient)" />
          <circle cx="48" cy="65" r="3" fill="url(#educationGradient)" />
        </motion.g>

        {/* Floating Knowledge Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={25 + i * 8}
            cy="75"
            r="2"
            fill="#3b82f6"
            animate={{
              y: [-5, -15, -5],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// ESG Metrics Visualization
const ESGMetricsCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string
  value: string
  change: string
  icon: any
  color: string
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`h-8 w-8 ${color}`} />
        <Badge variant="secondary" className="text-green-400 bg-green-400/10">
          {change}
        </Badge>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </motion.div>
  )
}

// Interactive Use Case Card
const UseCaseCard = ({
  title,
  description,
  impact,
  icon: Icon,
  color,
  features,
}: {
  title: string
  description: string
  impact: string
  icon: any
  color: string
  features?: string[]
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>

      {features && (
        <div className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-400">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-green-400 border-green-400/30">
          {impact}
        </Badge>
        <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
          <ArrowRight className="h-5 w-5 text-blue-400" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    role: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Get Your ESG Assessment</CardTitle>
        <CardDescription className="text-gray-300">
          Schedule a personalized consultation for your educational institution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                name="institution"
                placeholder="Institution Name"
                value={formData.institution}
                onChange={handleChange}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Input
                name="role"
                placeholder="Your Role"
                value={formData.role}
                onChange={handleChange}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
          <div>
            <Textarea
              name="message"
              placeholder="Tell us about your ESG goals and challenges..."
              value={formData.message}
              onChange={handleChange}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Schedule Free Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("challenges")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const challenges = [
    {
      title: "Digital Divide & Accessibility",
      description:
        "Bridging gaps in technology access and ensuring inclusive learning environments for all students, regardless of their physical abilities or socioeconomic background.",
      icon: Globe,
      color: "bg-blue-600",
      stats: "2.9B people lack internet access globally",
    },
    {
      title: "ESG Governance in Education",
      description:
        "Implementing sustainable practices and ethical governance frameworks in educational institutions while maintaining transparency and accountability.",
      icon: Shield,
      color: "bg-green-600",
      stats: "Only 23% of institutions have ESG frameworks",
    },
    {
      title: "Carbon Footprint Reduction",
      description:
        "Minimizing environmental impact of campuses and IT infrastructure through smart optimization and renewable energy adoption.",
      icon: Leaf,
      color: "bg-emerald-600",
      stats: "Education sector accounts for 4% of global emissions",
    },
    {
      title: "Equity & Inclusivity",
      description:
        "Ensuring fair access to digital learning resources and opportunities for diverse student populations across all demographics.",
      icon: Heart,
      color: "bg-purple-600",
      stats: "40% achievement gap in underserved communities",
    },
  ]

  const solutions = [
    {
      title: "Smart ESG Dashboards",
      description:
        "Real-time monitoring and reporting of sustainability metrics, diversity indicators, and compliance status across educational institutions.",
      impact: "90% Compliance Rate",
      icon: TrendingUp,
      color: "bg-blue-600",
      features: [
        "Real-time carbon footprint tracking",
        "Diversity & inclusion metrics",
        "Automated compliance reporting",
        "Stakeholder transparency tools",
      ],
    },
    {
      title: "AI-Powered Accessibility Tools",
      description:
        "Advanced AI solutions that enhance digital learning inclusiveness through adaptive interfaces and personalized learning paths.",
      impact: "85% Accessibility Score",
      icon: Brain,
      color: "bg-purple-600",
      features: [
        "Adaptive learning interfaces",
        "Multi-language support",
        "Screen reader optimization",
        "Cognitive accessibility features",
      ],
    },
    {
      title: "Green IT Optimization",
      description:
        "Intelligent systems that reduce power consumption and optimize resource usage across EdTech platforms and campus infrastructure.",
      impact: "40% Energy Savings",
      icon: Leaf,
      color: "bg-green-600",
      features: [
        "Smart energy management",
        "Cloud optimization",
        "Renewable energy integration",
        "Waste reduction tracking",
      ],
    },
    {
      title: "Governance Automation",
      description:
        "Automated policy compliance, ethical AI implementation, and transparent data governance for educational institutions.",
      impact: "95% Policy Adherence",
      icon: Shield,
      color: "bg-indigo-600",
      features: [
        "Automated policy enforcement",
        "Ethical AI guidelines",
        "Data privacy compliance",
        "Transparent reporting",
      ],
    },
  ]

  const useCases = [
    {
      title: "Carbon-Neutral Digital Campuses",
      description:
        "Universities implementing comprehensive sustainability programs with real-time carbon tracking and optimization systems.",
      impact: "50% Carbon Reduction",
      icon: GraduationCap,
      color: "bg-green-600",
      features: [
        "Smart building management",
        "Renewable energy systems",
        "Carbon offset programs",
        "Sustainable transportation",
      ],
    },
    {
      title: "EdTech DEI Excellence",
      description:
        "Startups leveraging ESGit platforms to achieve diversity, equity, and inclusion goals while scaling their educational technology.",
      impact: "80% DEI Score",
      icon: Users,
      color: "bg-purple-600",
      features: [
        "Inclusive design principles",
        "Bias detection algorithms",
        "Diverse content curation",
        "Accessibility compliance",
      ],
    },
    {
      title: "AI-Personalized Learning",
      description:
        "Schools using artificial intelligence to create sustainable, personalized learning journeys that adapt to individual student needs.",
      impact: "60% Learning Improvement",
      icon: Lightbulb,
      color: "bg-blue-600",
      features: ["Adaptive learning paths", "Predictive analytics", "Performance optimization", "Engagement tracking"],
    },
  ]

  const technologies = [
    { name: "Learning Management Systems", icon: BookOpen, color: "text-blue-400" },
    { name: "Student Information Systems", icon: Database, color: "text-green-400" },
    { name: "Virtual Classrooms", icon: Monitor, color: "text-purple-400" },
    { name: "Mobile Learning Apps", icon: Smartphone, color: "text-cyan-400" },
    { name: "Cloud Infrastructure", icon: Cloud, color: "text-orange-400" },
    { name: "Analytics Platforms", icon: BarChart3, color: "text-pink-400" },
    { name: "AI & Machine Learning", icon: Brain, color: "text-indigo-400" },
    { name: "Accessibility Tools", icon: Accessibility, color: "text-emerald-400" },
  ]

  const sustainabilityMetrics = [
    { label: "Energy Consumption", value: "45%", trend: "down", icon: Zap, color: "text-yellow-400" },
    { label: "Water Usage", value: "32%", trend: "down", icon: Droplets, color: "text-blue-400" },
    { label: "Waste Reduction", value: "67%", trend: "up", icon: Recycle, color: "text-green-400" },
    { label: "Carbon Emissions", value: "58%", trend: "down", icon: TreePine, color: "text-emerald-400" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <AnimatedEducationIcon />

            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <GraduationCap className="h-4 w-4 mr-2" />
              Education & EdTech Solutions
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
                Transforming Education with{" "}
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                ESG Excellence & AI Innovation
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Empowering educational institutions and EdTech companies to achieve sustainability goals, digital equity,
              and educational excellence through ESG-driven strategies, AI integration, and robust governance tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule ESG Assessment
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ESG Impact Metrics */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Measurable{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                ESG Impact
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Track and optimize your institution's environmental, social, and governance performance with real-time
              analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ESGMetricsCard
              title="Carbon Footprint Reduction"
              value="45%"
              change="+12% this quarter"
              icon={Leaf}
              color="text-green-400"
            />
            <ESGMetricsCard
              title="Digital Accessibility Score"
              value="92%"
              change="+8% improvement"
              icon={Globe}
              color="text-blue-400"
            />
            <ESGMetricsCard
              title="Student Engagement"
              value="87%"
              change="+15% increase"
              icon={Users}
              color="text-purple-400"
            />
            <ESGMetricsCard
              title="ESG Compliance Rate"
              value="96%"
              change="+5% this month"
              icon={Shield}
              color="text-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                EdTech Stack
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Integrated solutions covering every aspect of modern educational technology
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 text-center group"
              >
                <tech.icon
                  className={`h-8 w-8 ${tech.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                />
                <h3 className="text-white font-medium text-sm">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Content Tabs */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-12 bg-gray-900/60 backdrop-blur-sm rounded-xl p-2 border border-gray-700">
              {[
                { id: "challenges", label: "Key Challenges", icon: Target },
                { id: "solutions", label: "Our Solutions", icon: Zap },
                { id: "usecases", label: "Use Cases", icon: Star },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "challenges" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <div className={`p-3 rounded-lg ${challenge.color} mr-4`}>
                            <challenge.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mt-1">
                              {challenge.stats}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === "solutions" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {solutions.map((solution, index) => (
                      <UseCaseCard
                        key={index}
                        title={solution.title}
                        description={solution.description}
                        impact={solution.impact}
                        icon={solution.icon}
                        color={solution.color}
                        features={solution.features}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "usecases" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {useCases.map((useCase, index) => (
                      <UseCaseCard
                        key={index}
                        title={useCase.title}
                        description={useCase.description}
                        impact={useCase.impact}
                        icon={useCase.icon}
                        color={useCase.color}
                        features={useCase.features}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Sustainability Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sustainability{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                Performance
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time environmental impact tracking and optimization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  <Badge
                    variant="secondary"
                    className={`${metric.trend === "down" ? "text-green-400 bg-green-400/10" : "text-blue-400 bg-blue-400/10"}`}
                  >
                    {metric.trend === "down" ? "↓" : "↑"} {metric.value}
                  </Badge>
                </div>
                <h3 className="text-white font-semibold mb-2">{metric.label}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${metric.trend === "down" ? "bg-green-400" : "bg-blue-400"}`}
                    style={{ width: metric.value }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Educational Impact?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join leading educational institutions in creating sustainable, inclusive, and innovative learning
                environments with ESGit's comprehensive ESG and AI solutions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Free ESG assessment and consultation
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  30-day trial with full platform access
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Dedicated implementation support
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Custom integration with existing systems
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="p-8 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700">
              <Award className="h-16 w-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your ESG Journey Today</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transform your educational institution with sustainable, inclusive, and innovative solutions that drive
                measurable impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Talk to an ESG Expert
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Education Guide
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
