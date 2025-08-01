"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Shield,
  Brain,
  Cloud,
  Lock,
  Zap,
  Database,
  Network,
  Bot,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  Star,
  Users,
  Award,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TechnologiesPage() {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null)

  const technologies = [
    {
      id: "cybersecurity",
      title: "Cybersecurity AI",
      description: "Advanced threat detection and response with AI-powered security operations",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      textColor: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      href: "/technologies/cybersecurity",
      features: ["Zero Trust Architecture", "Threat Intelligence", "Incident Response", "Compliance Automation"],
      accuracy: 96,
      clients: 150,
      rating: 4.9,
      status: "Production Ready",
    },
    {
      id: "genai",
      title: "Generative AI",
      description: "Large language models and generative AI solutions for enterprise automation",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      href: "/technologies/genai",
      features: ["Custom LLMs", "Content Generation", "Code Assistance", "Document Processing"],
      accuracy: 94,
      clients: 89,
      rating: 4.8,
      status: "Production Ready",
    },
    {
      id: "blockchain",
      title: "Blockchain & Web3",
      description: "Decentralized solutions and smart contract development for enterprise",
      icon: Lock,
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      href: "/technologies/blockchain",
      features: ["Smart Contracts", "DeFi Solutions", "NFT Platforms", "Supply Chain"],
      accuracy: 99,
      clients: 45,
      rating: 4.7,
      status: "Production Ready",
    },
    {
      id: "rpa",
      title: "Robotic Process Automation",
      description: "Intelligent automation for business processes and workflow optimization",
      icon: Bot,
      color: "from-green-500 to-emerald-500",
      textColor: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      href: "/technologies/rpa",
      features: ["Process Mining", "Workflow Automation", "Document Processing", "Integration APIs"],
      accuracy: 98,
      clients: 234,
      rating: 4.9,
      status: "Production Ready",
    },
    {
      id: "cloud-native",
      title: "Cloud-Native Architecture",
      description: "Scalable cloud solutions with microservices and containerization",
      icon: Cloud,
      color: "from-sky-500 to-blue-500",
      textColor: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/30",
      href: "/technologies/cloud-native",
      features: ["Kubernetes", "Microservices", "Serverless", "DevOps Automation"],
      accuracy: 97,
      clients: 178,
      rating: 4.8,
      status: "Production Ready",
    },
    {
      id: "data-analytics",
      title: "Advanced Data Analytics",
      description: "Real-time analytics and business intelligence with machine learning",
      icon: Database,
      color: "from-orange-500 to-red-500",
      textColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      href: "/technologies/data-analytics",
      features: ["Real-time Analytics", "Predictive Models", "Data Visualization", "ML Pipelines"],
      accuracy: 95,
      clients: 267,
      rating: 4.9,
      status: "Production Ready",
    },
  ]

  const techStats = [
    { label: "Technologies Deployed", value: "50+", icon: Zap },
    { label: "Enterprise Clients", value: "200+", icon: Users },
    { label: "Success Rate", value: "99.2%", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-4 h-full">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-blue-500/20"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    borderColor: ["rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0.1)"],
                  }}
                  transition={{
                    duration: 4 + (i % 6),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
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
              <Zap className="h-4 w-4 mr-2" />
              Enterprise Technology Stack
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Advanced
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Technologies
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Cutting-edge technology solutions that power digital transformation. From AI and blockchain to
              cloud-native architectures, we deliver enterprise-grade innovations that drive business success.
            </p>

            {/* Technology Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {techStats.map((stat, index) => (
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

      {/* Technologies Grid */}
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
              Our Technology{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive suite of enterprise technologies, each designed to solve specific business
              challenges and drive innovation across industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredTech(index)}
                onHoverEnd={() => setHoveredTech(null)}
              >
                <Link href={tech.href}>
                  <Card
                    className={`h-full cursor-pointer transition-all duration-300 group ${
                      hoveredTech === index
                        ? `${tech.bgColor} ${tech.borderColor} shadow-2xl shadow-${tech.textColor.split("-")[1]}-500/20 scale-105`
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg ${tech.bgColor} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <tech.icon className={`h-6 w-6 ${tech.textColor}`} />
                        </div>
                        <Badge className={`${tech.bgColor} ${tech.textColor} ${tech.borderColor}`}>{tech.status}</Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {tech.title}
                      </CardTitle>
                      <p className="text-gray-400 text-sm leading-relaxed">{tech.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-white mb-3 text-sm">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {tech.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-300">
                              <CheckCircle className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-2 bg-white/5 rounded-lg">
                          <div className={`text-lg font-bold ${tech.textColor}`}>{tech.accuracy}%</div>
                          <div className="text-xs text-gray-400">Accuracy</div>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded-lg">
                          <div className={`text-lg font-bold ${tech.textColor}`}>{tech.clients}</div>
                          <div className="text-xs text-gray-400">Clients</div>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className={`text-sm font-bold ${tech.textColor}`}>{tech.rating}</span>
                          </div>
                          <div className="text-xs text-gray-400">Rating</div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <span className="text-sm text-gray-400">Learn More</span>
                        <ChevronRight
                          className={`h-4 w-4 ${tech.textColor} group-hover:translate-x-1 transition-transform duration-300`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Innovation Section */}
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
              Innovation{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Leadership
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're at the forefront of technological innovation, continuously researching and developing
              next-generation solutions that will shape the future of enterprise technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/20 h-full">
                <CardHeader>
                  <Brain className="h-8 w-8 text-blue-400 mb-4" />
                  <CardTitle className="text-xl text-white">AI Research Lab</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Dedicated research facility developing next-generation AI models and machine learning algorithms.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Active Projects</span>
                      <span className="text-blue-400">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Research Papers</span>
                      <span className="text-blue-400">28</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Patents Filed</span>
                      <span className="text-blue-400">7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20 h-full">
                <CardHeader>
                  <Network className="h-8 w-8 text-green-400 mb-4" />
                  <CardTitle className="text-xl text-white">Open Source Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Contributing to the global technology community through open source projects and frameworks.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">GitHub Repositories</span>
                      <span className="text-green-400">45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Community Stars</span>
                      <span className="text-green-400">12.5K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Contributors</span>
                      <span className="text-green-400">234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 h-full">
                <CardHeader>
                  <Award className="h-8 w-8 text-purple-400 mb-4" />
                  <CardTitle className="text-xl text-white">Industry Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Recognized by industry leaders for innovation excellence and technological advancement.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Technology Awards</span>
                      <span className="text-purple-400">15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Industry Certifications</span>
                      <span className="text-purple-400">23</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Partner Recognitions</span>
                      <span className="text-purple-400">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
            <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let's discuss how our advanced technologies can accelerate your digital transformation journey and
                  drive unprecedented business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Schedule Technology Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    <Database className="mr-2 h-5 w-5" />
                    View Technology Demos
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
