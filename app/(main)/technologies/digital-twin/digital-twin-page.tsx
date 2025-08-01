"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Copy,
  Cpu,
  Database,
  Zap,
  TrendingUp,
  Settings,
  Monitor,
  Network,
  Smartphone,
  Factory,
  Building,
  Car,
  Activity,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Eye,
  Layers,
  Gauge,
  Wrench,
  Shield,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DigitalTwinPage() {
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [activeTechnology, setActiveTechnology] = useState(0)

  const digitalTwinStats = [
    { label: "Market Growth Rate", value: "58%", icon: TrendingUp },
    { label: "Efficiency Improvement", value: "25%", icon: Gauge },
    { label: "Cost Reduction", value: "30%", icon: BarChart3 },
    { label: "Predictive Accuracy", value: "95%", icon: Eye },
  ]

  const twinTypes = [
    {
      type: "Component Twins",
      description: "Digital replicas of individual components or parts",
      icon: Settings,
      color: "from-blue-500 to-cyan-500",
      characteristics: ["Single component focus", "Detailed modeling", "Real-time data", "Performance tracking"],
      applications: ["Equipment monitoring", "Wear analysis", "Performance optimization", "Failure prediction"],
      complexity: "Low",
    },
    {
      type: "Asset Twins",
      description: "Digital representations of complete assets or systems",
      icon: Monitor,
      color: "from-green-500 to-emerald-500",
      characteristics: ["System-level view", "Component integration", "Operational insights", "Maintenance planning"],
      applications: ["Asset management", "Operational efficiency", "Maintenance scheduling", "Lifecycle management"],
      complexity: "Medium",
    },
    {
      type: "System Twins",
      description: "Digital models of interconnected systems and processes",
      icon: Network,
      color: "from-purple-500 to-pink-500",
      characteristics: ["Multi-system integration", "Process optimization", "Complex interactions", "Holistic view"],
      applications: ["Process optimization", "System integration", "Performance analysis", "Strategic planning"],
      complexity: "High",
    },
    {
      type: "Process Twins",
      description: "Digital replicas of entire business processes and workflows",
      icon: Layers,
      color: "from-orange-500 to-red-500",
      characteristics: ["End-to-end processes", "Workflow optimization", "Business intelligence", "Strategic insights"],
      applications: ["Process improvement", "Business optimization", "Strategic planning", "Digital transformation"],
      complexity: "Very High",
    },
  ]

  const keyTechnologies = [
    {
      technology: "Internet of Things (IoT)",
      description: "Sensors and devices that collect real-time data from physical assets",
      icon: Smartphone,
      role: "Data Collection",
      capabilities: ["Real-time monitoring", "Sensor integration", "Data streaming", "Edge computing"],
      importance: "Critical for continuous data flow and real-time synchronization",
    },
    {
      technology: "Artificial Intelligence & ML",
      description: "AI algorithms that analyze data and provide predictive insights",
      icon: Cpu,
      role: "Intelligence Layer",
      capabilities: ["Predictive analytics", "Pattern recognition", "Anomaly detection", "Optimization algorithms"],
      importance: "Enables predictive capabilities and intelligent decision-making",
    },
    {
      technology: "Cloud Computing",
      description: "Scalable infrastructure for processing and storing digital twin data",
      icon: Database,
      role: "Infrastructure",
      capabilities: ["Scalable storage", "Distributed computing", "Real-time processing", "Global accessibility"],
      importance: "Provides the computational power and storage for complex simulations",
    },
    {
      technology: "3D Modeling & Simulation",
      description: "Advanced visualization and simulation technologies",
      icon: Monitor,
      role: "Visualization",
      capabilities: ["3D visualization", "Physics simulation", "Virtual reality", "Augmented reality"],
      importance: "Creates immersive and accurate virtual representations",
    },
  ]

  const industryApplications = [
    {
      industry: "Manufacturing",
      description: "Optimize production processes and predict equipment failures",
      icon: Factory,
      benefits: [
        "40% reduction in downtime",
        "25% increase in efficiency",
        "30% cost savings",
        "50% faster troubleshooting",
      ],
      useCases: ["Predictive maintenance", "Production optimization", "Quality control", "Supply chain management"],
      challenges: ["Data integration", "Legacy system compatibility", "Real-time processing", "Scalability"],
      roi: "300% ROI within 18 months",
    },
    {
      industry: "Smart Cities",
      description: "Manage urban infrastructure and optimize city services",
      icon: Building,
      benefits: [
        "35% energy savings",
        "20% traffic reduction",
        "45% faster emergency response",
        "60% better resource allocation",
      ],
      useCases: ["Traffic management", "Energy optimization", "Infrastructure monitoring", "Emergency planning"],
      challenges: ["Data privacy", "System integration", "Citizen acceptance", "Regulatory compliance"],
      roi: "250% ROI within 24 months",
    },
    {
      industry: "Automotive",
      description: "Enhance vehicle design and autonomous driving capabilities",
      icon: Car,
      benefits: ["50% faster development", "30% improved safety", "25% fuel efficiency", "40% reduced testing costs"],
      useCases: ["Vehicle design", "Autonomous driving", "Predictive maintenance", "Performance optimization"],
      challenges: ["Real-time processing", "Safety validation", "Regulatory approval", "Data security"],
      roi: "400% ROI within 12 months",
    },
    {
      industry: "Healthcare",
      description: "Personalize treatment and optimize hospital operations",
      icon: Activity,
      benefits: ["60% better outcomes", "35% cost reduction", "50% faster diagnosis", "70% improved efficiency"],
      useCases: ["Personalized medicine", "Hospital optimization", "Medical device monitoring", "Treatment planning"],
      challenges: ["Data privacy", "Regulatory compliance", "Integration complexity", "Ethical considerations"],
      roi: "350% ROI within 20 months",
    },
  ]

  const implementationSteps = [
    {
      step: "Assessment & Planning",
      description: "Evaluate current systems and define digital twin objectives",
      icon: Eye,
      activities: ["System analysis", "Objective definition", "ROI calculation", "Resource planning"],
      duration: "2-4 weeks",
      deliverables: ["Assessment report", "Implementation roadmap", "Resource requirements", "Success metrics"],
    },
    {
      step: "Data Infrastructure",
      description: "Establish data collection and management infrastructure",
      icon: Database,
      activities: ["IoT deployment", "Data pipeline setup", "Cloud infrastructure", "Security implementation"],
      duration: "4-8 weeks",
      deliverables: ["Data architecture", "IoT network", "Cloud platform", "Security framework"],
    },
    {
      step: "Model Development",
      description: "Create and validate the digital twin models",
      icon: Settings,
      activities: ["3D modeling", "Physics simulation", "AI model training", "Validation testing"],
      duration: "8-16 weeks",
      deliverables: ["Digital models", "Simulation engine", "AI algorithms", "Validation results"],
    },
    {
      step: "Integration & Deployment",
      description: "Integrate systems and deploy the digital twin solution",
      icon: Network,
      activities: ["System integration", "User training", "Performance testing", "Go-live support"],
      duration: "4-8 weeks",
      deliverables: ["Integrated system", "User documentation", "Training materials", "Support procedures"],
    },
  ]

  const benefits = [
    {
      benefit: "Predictive Maintenance",
      description: "Predict equipment failures before they occur",
      icon: Wrench,
      impact: "60% reduction in unplanned downtime",
      details: [
        "Early failure detection",
        "Optimal maintenance scheduling",
        "Reduced repair costs",
        "Extended asset life",
      ],
    },
    {
      benefit: "Operational Efficiency",
      description: "Optimize processes and resource utilization",
      icon: Gauge,
      impact: "25% improvement in efficiency",
      details: ["Process optimization", "Resource allocation", "Performance monitoring", "Bottleneck identification"],
    },
    {
      benefit: "Risk Mitigation",
      description: "Identify and mitigate potential risks",
      icon: Shield,
      impact: "40% reduction in operational risks",
      details: ["Risk assessment", "Scenario planning", "Safety optimization", "Compliance monitoring"],
    },
    {
      benefit: "Innovation Acceleration",
      description: "Accelerate product development and innovation",
      icon: Zap,
      impact: "50% faster time-to-market",
      details: ["Virtual prototyping", "Design optimization", "Testing acceleration", "Innovation insights"],
    },
  ]

  const challenges = [
    {
      challenge: "Data Quality & Integration",
      description: "Ensuring high-quality, integrated data from multiple sources",
      icon: Database,
      issues: ["Data silos", "Quality inconsistency", "Real-time requirements", "Legacy system integration"],
      solutions: ["Data governance", "Quality frameworks", "Integration platforms", "Modernization strategies"],
    },
    {
      challenge: "Computational Complexity",
      description: "Managing the computational demands of complex simulations",
      icon: Cpu,
      issues: ["Processing power", "Real-time constraints", "Scalability", "Cost optimization"],
      solutions: ["Cloud computing", "Edge processing", "Optimization algorithms", "Hybrid architectures"],
    },
    {
      challenge: "Security & Privacy",
      description: "Protecting sensitive data and ensuring system security",
      icon: Shield,
      issues: ["Data breaches", "Privacy concerns", "Cyber threats", "Compliance requirements"],
      solutions: ["Encryption", "Access controls", "Security monitoring", "Compliance frameworks"],
    },
    {
      challenge: "Skills & Expertise",
      description: "Building the necessary skills and expertise for implementation",
      icon: Users,
      issues: ["Skill gaps", "Training needs", "Change management", "Organizational readiness"],
      solutions: ["Training programs", "Expert partnerships", "Change management", "Gradual implementation"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-cyan-600/10 to-blue-600/10" />
          {/* Digital Twin Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 25}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                <Copy className="h-8 w-8 text-teal-400" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-teal-600/20 text-teal-300 border-teal-500/30 px-4 py-2">
              <Copy className="h-4 w-4 mr-2" />
              Digital Twin Technology
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                Virtual
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Reality
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your business with digital twin technology that creates virtual replicas of physical systems,
              enabling real-time monitoring, predictive analytics, and optimization.
            </p>

            {/* Digital Twin Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {digitalTwinStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <stat.icon className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Digital Twin Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Digital Twin{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Types</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding different types of digital twins and their applications across various levels of complexity
              and integration.
            </p>
          </motion.div>

          <div className="space-y-8">
            {twinTypes.map((twin, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${twin.color} flex-shrink-0`}>
                        <twin.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-white">{twin.type}</h3>
                          <Badge className={`bg-gradient-to-r ${twin.color} text-white border-none`}>
                            {twin.complexity} Complexity
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-6">{twin.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-white mb-3 text-sm">Characteristics:</h4>
                            <div className="space-y-2">
                              {twin.characteristics.map((char, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-300">
                                  <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-3 text-sm">Applications:</h4>
                            <div className="flex flex-wrap gap-2">
                              {twin.applications.map((app, idx) => (
                                <Badge key={idx} className="bg-white/10 text-gray-300 border-white/20 text-xs">
                                  {app}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Technologies */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Key{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Essential technologies that power digital twin solutions and enable real-time synchronization between
              physical and virtual worlds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyTechnologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveTechnology(index)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    activeTechnology === index
                      ? "bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                        <tech.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{tech.technology}</CardTitle>
                        <div className="text-blue-400 font-semibold text-sm">{tech.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{tech.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Capabilities:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {tech.capabilities.map((capability, idx) => (
                          <Badge
                            key={idx}
                            className="bg-white/10 text-gray-300 border-white/20 text-xs justify-center py-1"
                          >
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Importance:</h4>
                      <p className="text-gray-300 text-sm">{tech.importance}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industry{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Applications
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how digital twins transform operations across diverse industries, delivering measurable results
              and competitive advantages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryApplications.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveIndustry(index)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    activeIndustry === index
                      ? "bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        <industry.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{industry.industry}</CardTitle>
                        <div className="text-green-400 font-semibold text-sm">{industry.roi}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{industry.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Benefits:</h4>
                      <div className="space-y-1">
                        {industry.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-xs text-green-400">
                            <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Use Cases:</h4>
                      <div className="flex flex-wrap gap-1">
                        {industry.useCases.map((useCase, idx) => (
                          <Badge key={idx} className="bg-white/10 text-gray-300 border-white/20 text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Challenges:</h4>
                      <div className="space-y-1">
                        {industry.challenges.map((challenge, idx) => (
                          <div key={idx} className="flex items-center text-xs text-orange-400">
                            <AlertTriangle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {challenge}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Digital Twin{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Benefits</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock the transformative power of digital twins with measurable business outcomes that drive innovation
              and operational excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 h-full text-center">
                  <CardContent className="p-6">
                    <benefit.icon className="h-12 w-12 text-teal-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.benefit}</h3>
                    <p className="text-gray-300 text-sm mb-4">{benefit.description}</p>
                    <div className="text-2xl font-bold text-green-400 mb-4">{benefit.impact}</div>
                    <div className="space-y-1">
                      {benefit.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-gray-400">
                          • {detail}
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

      {/* Implementation Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Implementation{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proven methodology for implementing digital twin solutions ensures successful deployment and maximum
              value realization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-purple-400 font-bold text-sm mb-2">Step {index + 1}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.step}</h3>
                      <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs">
                        {step.duration}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-white mb-1 text-xs">Activities:</h4>
                        <div className="space-y-1">
                          {step.activities.map((activity, idx) => (
                            <div key={idx} className="text-xs text-gray-400">
                              • {activity}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 text-xs">Deliverables:</h4>
                        <div className="space-y-1">
                          {step.deliverables.map((deliverable, idx) => (
                            <div key={idx} className="text-xs text-gray-400">
                              • {deliverable}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Challenges &{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Address common digital twin implementation challenges with proven solutions and best practices for
              successful deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                        <challenge.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{challenge.challenge}</CardTitle>
                        <p className="text-gray-300 text-sm">{challenge.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Issues:</h4>
                      <div className="space-y-1">
                        {challenge.issues.map((issue, idx) => (
                          <div key={idx} className="flex items-center text-xs text-red-400">
                            <AlertTriangle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Our Solutions:</h4>
                      <div className="space-y-1">
                        {challenge.solutions.map((solution, idx) => (
                          <div key={idx} className="flex items-center text-xs text-green-400">
                            <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {solution}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border-teal-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Create Your Digital Twin?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Transform your operations with digital twin technology that delivers real-time insights, predictive
                  capabilities, and operational excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Copy className="mr-2 h-5 w-5" />
                    Start Digital Twin Project
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-teal-500/50 text-teal-300 hover:bg-teal-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
