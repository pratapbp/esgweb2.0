"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Users,
  Target,
  Award,
  Globe,
  Zap,
  Brain,
  Shield,
  Database,
  Cloud,
  Factory,
  Building,
  Rocket,
  CheckCircle,
  Star,
  Lightbulb,
  Handshake,
  Eye,
  Compass,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Company Values Data
const companyValues = [
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovation First",
    description: "We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Handshake className="h-8 w-8" />,
    title: "Client Partnership",
    description: "We build long-term partnerships with our clients, understanding their unique needs and goals.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Eye className="h-8 w-8" />,
    title: "Transparency",
    description: "We maintain open communication and transparency in all our business relationships and processes.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Excellence",
    description:
      "We strive for excellence in every project, delivering high-quality solutions that exceed expectations.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Compass className="h-8 w-8" />,
    title: "Ethical Leadership",
    description:
      "We lead with integrity and ethical practices, ensuring responsible AI and sustainable business growth.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Team Collaboration",
    description: "We foster a collaborative environment where diverse perspectives drive innovation and success.",
    color: "from-teal-500 to-blue-500",
  },
]

// Company Capabilities
const capabilities = [
  {
    category: "AI & Machine Learning",
    items: [
      "Generative AI & LLMs",
      "Computer Vision",
      "Natural Language Processing",
      "Predictive Analytics",
      "AI Copilots & Assistants",
    ],
    icon: <Brain className="h-6 w-6" />,
    color: "text-purple-400",
  },
  {
    category: "SAP Solutions",
    items: ["S/4HANA Implementation", "SAP BTP Development", "SAP Analytics Cloud", "SuccessFactors", "SAP BRIM"],
    icon: <Database className="h-6 w-6" />,
    color: "text-blue-400",
  },
  {
    category: "Cloud & Infrastructure",
    items: ["Multi-Cloud Architecture", "Kubernetes & Containers", "DevOps & CI/CD", "Microservices", "Edge Computing"],
    icon: <Cloud className="h-6 w-6" />,
    color: "text-cyan-400",
  },
  {
    category: "Industry Expertise",
    items: ["Manufacturing", "Healthcare", "Financial Services", "Retail & E-commerce", "Public Sector"],
    icon: <Factory className="h-6 w-6" />,
    color: "text-green-400",
  },
]

// Company Statistics
const companyStats = [
  {
    value: "150+",
    label: "Projects Delivered",
    description: "Successful implementations across industries",
    icon: <Rocket className="h-6 w-6" />,
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    description: "Consistently high client satisfaction rates",
    icon: <Star className="h-6 w-6" />,
  },
  {
    value: "25+",
    label: "Industry Awards",
    description: "Recognition for innovation and excellence",
    icon: <Award className="h-6 w-6" />,
  },
  {
    value: "50+",
    label: "Enterprise Clients",
    description: "Trusted by leading organizations worldwide",
    icon: <Building className="h-6 w-6" />,
  },
]

// Certifications and Partnerships
const certifications = [
  { name: "SAP Gold Partner", category: "Partnership", level: "Gold" },
  { name: "AWS Advanced Partner", category: "Cloud", level: "Advanced" },
  { name: "Microsoft Azure Expert", category: "Cloud", level: "Expert" },
  { name: "Google Cloud Premier", category: "Cloud", level: "Premier" },
  { name: "ISO 27001 Certified", category: "Security", level: "Certified" },
  { name: "SOC 2 Type II", category: "Compliance", level: "Compliant" },
]

export default function WhoWeArePage() {
  const [activeValue, setActiveValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % companyValues.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30">
                <Users className="h-4 w-4 mr-2" />
                Who We Are
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Pioneering the Future of
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Intelligent Enterprises
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We are a team of visionary technologists, SAP experts, and AI innovators dedicated to transforming how
                businesses operate in the digital age.
              </p>
            </motion.div>

            {/* Company Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500">
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Founded with a vision to bridge the gap between traditional enterprise systems and cutting-edge
                        AI technologies, ESGit has emerged as a leader in intelligent enterprise solutions.
                      </p>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        We specialize in SAP implementations enhanced with AI capabilities, helping organizations unlock
                        the full potential of their data and processes through innovative technology solutions.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-5 w-5 text-blue-400" />
                          <span className="text-sm text-gray-300">Global Reach</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="h-5 w-5 text-yellow-400" />
                          <span className="text-sm text-gray-300">AI-First Approach</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-green-400" />
                          <span className="text-sm text-gray-300">Enterprise Security</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <Building className="h-24 w-24 text-blue-400 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-white mb-2">Intelligence. Innovation. Integrity.</h3>
                          <p className="text-gray-300">Our core principles driving digital transformation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Company Values */}
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
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Values
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The principles that guide our work and define our culture
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${value.color} bg-opacity-20 mb-4`}>
                        <div className="text-white">{value.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our{" "}
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Capabilities
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive expertise across cutting-edge technologies and industry domains
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.category}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`${capability.color}`}>{capability.icon}</div>
                        <CardTitle className="text-xl text-white">{capability.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {capability.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
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

        {/* Company Statistics */}
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
                Our{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Impact
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Measurable results that demonstrate our commitment to excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-blue-400 mb-4 flex justify-center">{stat.icon}</div>
                      <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-lg font-semibold text-gray-200 mb-2">{stat.label}</div>
                      <div className="text-sm text-gray-400">{stat.description}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Certifications &{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Partnerships
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Recognized expertise and trusted partnerships with industry leaders
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">{cert.category}</Badge>
                      <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                      <div className="text-sm text-gray-400">{cert.level}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
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
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Shape the Future?</h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join our team of innovators and help us build the next generation of intelligent enterprise
                    solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/careers">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                      >
                        <Users className="mr-2 h-5 w-5" />
                        Join Our Team
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent"
                      >
                        <Target className="mr-2 h-5 w-5" />
                        Partner With Us
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
