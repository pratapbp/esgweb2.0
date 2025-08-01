"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  CheckCircle,
  Database,
  BarChart3,
  Users,
  Shield,
  Brain,
  MessageSquare,
  Send,
  Sparkles,
  TrendingUp,
  Globe,
  Award,
  Clock,
  DollarSign,
  Building,
  Star,
  PlayCircle,
} from "lucide-react"
import Image from "next/image"

export default function SAPEnterpriseSolutionsPage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  if (!mounted) return null

  const sapSolutions = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "SAP S/4HANA",
      description: "Next-generation ERP suite with real-time analytics and AI capabilities",
      features: ["Real-time processing", "Advanced analytics", "Cloud-native architecture", "AI integration"],
      color: "from-blue-500 to-cyan-500",
      roi: "35% faster reporting",
      implementation: "6-12 months",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "SAP Analytics Cloud",
      description: "Comprehensive analytics platform for business intelligence and planning",
      features: ["Predictive analytics", "Machine learning", "Data visualization", "Planning & forecasting"],
      color: "from-purple-500 to-pink-500",
      roi: "50% better forecasting accuracy",
      implementation: "3-6 months",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "SAP SuccessFactors",
      description: "Cloud-based human capital management solution",
      features: ["Talent management", "HR analytics", "Employee experience", "Workforce planning"],
      color: "from-green-500 to-emerald-500",
      roi: "25% reduction in turnover",
      implementation: "4-8 months",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "SAP Ariba",
      description: "Procurement and supply chain solutions for enterprise efficiency",
      features: ["Supplier management", "Contract lifecycle", "Spend analysis", "Risk management"],
      color: "from-orange-500 to-red-500",
      roi: "15% cost savings",
      implementation: "3-5 months",
    },
  ]

  const transformationBenefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "40% Faster Decision Making",
      description: "Real-time insights enable rapid business decisions",
      metric: "From days to hours",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "60% Cost Reduction",
      description: "Streamlined processes and automation reduce operational costs",
      metric: "$2.5M average savings",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Scalability",
      description: "Cloud-native solutions that scale with your business growth",
      metric: "200+ countries supported",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Industry Compliance",
      description: "Built-in compliance for regulatory requirements",
      metric: "99.9% compliance rate",
    },
  ]

  const caseStudies = [
    {
      company: "Global Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "Fragmented systems across 15 countries causing delays and inefficiencies",
      solution: "SAP S/4HANA implementation with real-time analytics",
      results: [
        "45% reduction in order processing time",
        "30% improvement in inventory turnover",
        "$5M annual cost savings",
        "Real-time visibility across all operations",
      ],
    },
    {
      company: "Financial Services Leader",
      industry: "Banking & Finance",
      challenge: "Manual reporting processes taking weeks to complete",
      solution: "SAP Analytics Cloud with AI-powered insights",
      results: [
        "90% reduction in reporting time",
        "Real-time risk assessment",
        "Improved regulatory compliance",
        "Enhanced customer insights",
      ],
    },
    {
      company: "Healthcare Network",
      industry: "Healthcare",
      challenge: "Disconnected HR systems affecting patient care quality",
      solution: "SAP SuccessFactors with custom healthcare modules",
      results: [
        "25% reduction in staff turnover",
        "Improved patient satisfaction scores",
        "Streamlined compliance reporting",
        "Better workforce planning",
      ],
    },
  ]

  const implementationProcess = [
    {
      step: 1,
      title: "Discovery & Assessment",
      description: "Comprehensive analysis of your current systems and business requirements",
      duration: "2-4 weeks",
      deliverables: ["Current state assessment", "Gap analysis", "ROI projections"],
    },
    {
      step: 2,
      title: "Solution Design",
      description: "Custom solution architecture tailored to your business needs",
      duration: "3-6 weeks",
      deliverables: ["Technical architecture", "Implementation roadmap", "Change management plan"],
    },
    {
      step: 3,
      title: "Implementation",
      description: "Agile deployment with continuous testing and validation",
      duration: "3-12 months",
      deliverables: ["Configured system", "Data migration", "User training"],
    },
    {
      step: 4,
      title: "Go-Live & Support",
      description: "Smooth transition with ongoing support and optimization",
      duration: "Ongoing",
      deliverables: ["Production deployment", "24/7 support", "Continuous improvement"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/services/enterprise.jpg"
            alt="SAP Enterprise Solutions"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-cyan-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-400/30 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Enterprise-Grade SAP Solutions
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Transform Your Enterprise with{" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                SAP Excellence
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Unlock the full potential of your business with our comprehensive SAP enterprise solutions. From S/4HANA
              implementations to advanced analytics, we deliver transformation that drives measurable results and
              sustainable growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3"
              >
                Start Your SAP Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">500+</div>
                <div className="text-sm text-gray-400">Successful Implementations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400">98%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">$50M+</div>
                <div className="text-sm text-gray-400">Cost Savings Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400">15+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SAP Solutions Portfolio */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive SAP Solutions Portfolio</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From core ERP to advanced analytics, our SAP expertise covers the full spectrum of enterprise needs with
              proven ROI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sapSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.color} p-4 mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <div className="text-white">{solution.icon}</div>
                    </div>
                    <CardTitle className="text-white text-xl mb-2">{solution.title}</CardTitle>
                    <CardDescription className="text-gray-300">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {solution.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-sm text-gray-400">ROI Impact</div>
                          <div className="text-green-400 font-semibold">{solution.roi}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Timeline</div>
                          <div className="text-blue-400 font-semibold">{solution.implementation}</div>
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

      {/* Transformation Benefits */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Measurable Business Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our SAP implementations deliver quantifiable results that transform your business operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 mb-2">{benefit.description}</p>
                <div className="text-blue-400 font-semibold text-sm">{benefit.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies 
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real transformations, real results. See how we've helped enterprises achieve their goals
            </p>
          </motion.div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center mb-4">
                          <Building className="h-6 w-6 text-blue-400 mr-2" />
                          <h3 className="text-xl font-semibold text-white">{study.company}</h3>
                          <Badge className="ml-2 bg-blue-600/20 text-blue-300">{study.industry}</Badge>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-red-400 font-semibold mb-2">Challenge</h4>
                            <p className="text-gray-300">{study.challenge}</p>
                          </div>

                          <div>
                            <h4 className="text-blue-400 font-semibold mb-2">Solution</h4>
                            <p className="text-gray-300">{study.solution}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-green-400 font-semibold mb-4">Results Achieved</h4>
                        <div className="space-y-2 mb-6">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center text-gray-300">
                              <Star className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
                              <span className="text-sm">{result}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4">
                          <blockquote className="text-gray-300 italic mb-2">"{study.testimonial}"</blockquote>
                          <cite className="text-blue-400 text-sm">— {study.author}</cite>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
pnpm 
      {/* Implementation Process */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Proven Implementation Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A structured approach that ensures successful delivery and maximum ROI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementationProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">{process.step}</span>
                    </div>
                    <CardTitle className="text-white text-lg">{process.title}</CardTitle>
                    <div className="flex items-center justify-center text-blue-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {process.duration}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">{process.description}</p>
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Key Deliverables:</h5>
                      <ul className="space-y-1">
                        {process.deliverables.map((deliverable, delIndex) => (
                          <li key={delIndex} className="text-gray-400 text-xs flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG SAP Copilot Assistant */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-400/30">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered Assistant
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet Your SAP Copilot</h2>

              <p className="text-xl text-gray-300 mb-8">
                Get instant answers to your SAP questions, implementation guidance, and best practices from our
                AI-powered assistant trained on enterprise SAP knowledge and real-world implementations.
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>Real-time SAP implementation guidance</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>Best practices and optimization tips</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>Troubleshooting and problem resolution</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>ROI calculations and business case development</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                    SAP Enterprise Copilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300 text-sm mb-2">
                      <strong className="text-purple-400">You:</strong> How can I optimize S/4HANA performance for a
                      global manufacturing company?
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">
                      <strong className="text-blue-400">SAP Copilot:</strong> For global manufacturing optimization:
                      <br />• Enable in-memory computing with HANA compression
                      <br />• Implement real-time material planning (MRP Live)
                      <br />• Configure advanced ATP for global inventory
                      <br />• Set up embedded analytics for shop floor visibility
                      <br />• Use SAP IBP for integrated business planning
                      <br />
                      <br />
                      Expected ROI: 25-40% improvement in planning cycles
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Ask about SAP implementation, ROI, or best practices..."
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                    />
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
