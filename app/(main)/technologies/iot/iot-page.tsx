"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Wifi,
  Cpu,
  Shield,
  Zap,
  Database,
  Network,
  Smartphone,
  Factory,
  Home,
  Car,
  Building,
  Activity,
  TrendingUp,
  CheckCircle,
  Eye,
  Settings,
  BarChart3,
  Globe,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function IoTPage() {
  const [activeUseCase, setActiveUseCase] = useState(0)

  const iotStats = [
    { label: "Connected Devices by 2030", value: "75B+", icon: Network },
    { label: "IoT Market Value", value: "$1.4T", icon: TrendingUp },
    { label: "Data Generated Daily", value: "2.5QB", icon: Database },
    { label: "Efficiency Improvement", value: "45%", icon: Zap },
  ]

  const iotArchitecture = [
    {
      layer: "Device Layer",
      description: "Smart sensors, actuators, and connected devices",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500",
      technologies: ["Sensors", "Actuators", "Microcontrollers", "Communication Modules"],
    },
    {
      layer: "Connectivity Layer",
      description: "Communication protocols and network infrastructure",
      icon: Wifi,
      color: "from-green-500 to-emerald-500",
      technologies: ["WiFi", "Bluetooth", "5G", "LoRaWAN", "Zigbee"],
    },
    {
      layer: "Data Processing Layer",
      description: "Edge computing and data preprocessing",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      technologies: ["Edge Computing", "Fog Computing", "Real-time Processing", "Data Filtering"],
    },
    {
      layer: "Data Storage Layer",
      description: "Cloud storage and data management systems",
      icon: Database,
      color: "from-orange-500 to-red-500",
      technologies: ["Cloud Storage", "Time-series Databases", "Data Lakes", "Distributed Storage"],
    },
    {
      layer: "Analytics Layer",
      description: "AI/ML analytics and business intelligence",
      icon: BarChart3,
      color: "from-indigo-500 to-purple-500",
      technologies: ["Machine Learning", "Predictive Analytics", "Real-time Analytics", "AI Models"],
    },
    {
      layer: "Application Layer",
      description: "User interfaces and business applications",
      icon: Globe,
      color: "from-teal-500 to-blue-500",
      technologies: ["Web Apps", "Mobile Apps", "Dashboards", "APIs"],
    },
  ]

  const industryApplications = [
    {
      industry: "Smart Manufacturing",
      description: "Predictive maintenance, quality control, and production optimization",
      icon: Factory,
      benefits: ["37% reduction in downtime", "25% increase in efficiency", "42% cost savings"],
      useCases: ["Equipment monitoring", "Supply chain tracking", "Energy optimization"],
      image: "/images/iot/smart-manufacturing.jpg",
    },
    {
      industry: "Smart Cities",
      description: "Traffic management, waste optimization, and environmental monitoring",
      icon: Building,
      benefits: ["30% traffic reduction", "40% energy savings", "50% waste optimization"],
      useCases: ["Smart lighting", "Traffic optimization", "Air quality monitoring"],
      image: "/images/iot/smart-cities.jpg",
    },
    {
      industry: "Connected Vehicles",
      description: "Fleet management, autonomous driving, and vehicle diagnostics",
      icon: Car,
      benefits: ["35% fuel savings", "60% maintenance reduction", "90% safety improvement"],
      useCases: ["Fleet tracking", "Predictive maintenance", "Driver behavior analysis"],
      image: "/images/iot/connected-vehicles.jpg",
    },
    {
      industry: "Smart Healthcare",
      description: "Remote monitoring, asset tracking, and patient care optimization",
      icon: Activity,
      benefits: ["45% cost reduction", "70% faster diagnosis", "85% patient satisfaction"],
      useCases: ["Patient monitoring", "Asset tracking", "Environmental control"],
      image: "/images/iot/smart-healthcare.jpg",
    },
    {
      industry: "Smart Homes",
      description: "Home automation, security, and energy management",
      icon: Home,
      benefits: ["30% energy savings", "50% security improvement", "60% convenience increase"],
      useCases: ["Home automation", "Security systems", "Energy management"],
      image: "/images/iot/smart-homes.jpg",
    },
  ]

  const challenges = [
    {
      title: "Security & Privacy",
      description: "Protecting IoT devices and data from cyber threats and ensuring privacy compliance",
      icon: Shield,
      solutions: ["End-to-end encryption", "Device authentication", "Regular security updates", "Privacy by design"],
    },
    {
      title: "Interoperability",
      description: "Ensuring different IoT devices and systems can communicate effectively",
      icon: Network,
      solutions: ["Standard protocols", "API integration", "Middleware platforms", "Universal gateways"],
    },
    {
      title: "Scalability",
      description: "Managing massive numbers of connected devices and data volumes",
      icon: TrendingUp,
      solutions: ["Cloud infrastructure", "Edge computing", "Distributed architecture", "Auto-scaling"],
    },
    {
      title: "Data Management",
      description: "Handling, processing, and analyzing vast amounts of IoT-generated data",
      icon: Database,
      solutions: ["Data lakes", "Stream processing", "AI/ML analytics", "Data governance"],
    },
  ]

  const benefits = [
    {
      title: "Operational Efficiency",
      description: "Automate processes and optimize resource utilization",
      icon: Zap,
      metrics: "Up to 45% efficiency improvement",
    },
    {
      title: "Predictive Maintenance",
      description: "Prevent equipment failures before they occur",
      icon: Settings,
      metrics: "60% reduction in maintenance costs",
    },
    {
      title: "Real-time Insights",
      description: "Make data-driven decisions with real-time analytics",
      icon: Eye,
      metrics: "70% faster decision making",
    },
    {
      title: "Cost Reduction",
      description: "Reduce operational costs through automation and optimization",
      icon: TrendingUp,
      metrics: "35% average cost savings",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-green-600/10" />
          {/* IoT Network Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 gap-2 h-full">
              {[...Array(144)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    opacity: [0.1, 0.6, 0.1],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 3 + (i % 4),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2">
              <Network className="h-4 w-4 mr-2" />
              Internet of Things Solutions
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Connected
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your business with intelligent IoT solutions that connect devices, systems, and processes to
              deliver real-time insights, automation, and unprecedented operational efficiency.
            </p>

            {/* IoT Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {iotStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* IoT Architecture Section */}
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
              IoT{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Architecture
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive IoT architecture ensures seamless connectivity, secure data flow, and intelligent
              processing across all layers of your IoT ecosystem.
            </p>
          </motion.div>

          <div className="space-y-8">
            {iotArchitecture.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6 mb-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${layer.color}`}>
                        <layer.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{layer.layer}</h3>
                        <p className="text-gray-300">{layer.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {layer.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className="bg-white/10 text-gray-300 border-white/20 justify-center py-2"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Applications */}
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
              Industry{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Applications
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how IoT transforms operations across diverse industries, delivering measurable results and
              competitive advantages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industryApplications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveUseCase(index)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    activeUseCase === index
                      ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <app.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{app.industry}</CardTitle>
                        <p className="text-gray-400 text-sm">{app.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-white mb-3 text-sm">Key Benefits:</h4>
                      <div className="space-y-2">
                        {app.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm text-green-400">
                            <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <h4 className="font-semibold text-white mb-3 text-sm">Use Cases:</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.useCases.map((useCase, idx) => (
                          <Badge key={idx} className="bg-white/10 text-gray-300 border-white/20 text-xs">
                            {useCase}
                          </Badge>
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

      {/* Benefits Section */}
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
              IoT{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock the transformative power of IoT with measurable business outcomes that drive growth, efficiency,
              and innovation.
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
                    <div className="mb-4">
                      <benefit.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{benefit.description}</p>
                      <div className="text-2xl font-bold text-green-400">{benefit.metrics}</div>
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
              We address the most critical IoT challenges with proven solutions that ensure secure, scalable, and
              successful implementations.
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
                        <CardTitle className="text-xl text-white">{challenge.title}</CardTitle>
                        <p className="text-gray-300 text-sm">{challenge.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-white mb-3 text-sm">Our Solutions:</h4>
                    <div className="space-y-2">
                      {challenge.solutions.map((solution, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                          {solution}
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
            <Card className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Connect Your Business?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Transform your operations with intelligent IoT solutions that deliver real-time insights, automation,
                  and measurable business results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Network className="mr-2 h-5 w-5" />
                    Start IoT Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    View IoT Demos
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
