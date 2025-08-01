"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Brain,
  Bot,
  Link,
  Search,
  Zap,
  AlertTriangle,
  CheckCircle,
  Globe,
  Download,
  Mic,
  Send,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Animated Cyber Background Component
const CyberBackground = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-blue-900/20 to-purple-900/20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing Security Mesh */}
      <motion.div
        className="absolute inset-0 border border-blue-500/30"
        animate={{
          boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.3)",
            "0 0 40px rgba(59, 130, 246, 0.5)",
            "0 0 20px rgba(59, 130, 246, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}

// Live Metrics Component
const LiveMetrics = () => {
  const [metrics, setMetrics] = useState({
    threatsBlocked: 1247,
    avgResponseTime: 0.3,
    attacksThisMonth: 89,
    complianceScore: 94,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        avgResponseTime: Math.max(0.1, prev.avgResponseTime + (Math.random() - 0.5) * 0.1),
        attacksThisMonth: prev.attacksThisMonth + (Math.random() > 0.95 ? 1 : 0),
        complianceScore: Math.min(100, Math.max(85, prev.complianceScore + (Math.random() - 0.5) * 2)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <motion.div
        className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-2xl font-bold text-green-400">{metrics.threatsBlocked.toLocaleString()}</div>
        <div className="text-sm text-green-300">Threats Blocked</div>
      </motion.div>

      <motion.div
        className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-2xl font-bold text-blue-400">{metrics.avgResponseTime.toFixed(1)}s</div>
        <div className="text-sm text-blue-300">Avg Response</div>
      </motion.div>

      <motion.div
        className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-2xl font-bold text-red-400">{metrics.attacksThisMonth}</div>
        <div className="text-sm text-red-300">Attacks This Month</div>
      </motion.div>

      <motion.div
        className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-2xl font-bold text-purple-400">{metrics.complianceScore}%</div>
        <div className="text-sm text-purple-300">Compliance Score</div>
      </motion.div>
    </div>
  )
}

// Cyber Threat Copilot Component
const CyberThreatCopilot = () => {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const quickQuestions = [
    "What are top risks in SAP BTP today?",
    "How to automate threat response for Ariba vendors?",
    "Recommend blockchain solutions for LCA integrity",
    "Show me GDPR compliance gaps in our SAP landscape",
    "Generate incident response playbook for ransomware",
  ]

  const handleQuery = async (question: string) => {
    setIsLoading(true)
    setQuery(question)

    try {
      const res = await fetch("/api/copilot/cyber-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      })

      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      setResponse("Sorry, I encountered an error processing your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Brain className="w-5 h-5" />
          ESGit Cyber Threat Copilot
        </CardTitle>
        <CardDescription>
          Ask me about cybersecurity threats, compliance, or get AI-powered security recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Questions */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-300">Quick Questions:</div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs border-blue-500/30 hover:border-blue-500/50 bg-transparent"
                onClick={() => handleQuery(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask about cybersecurity threats, compliance, or get recommendations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleQuery(query)}
            className="bg-gray-800/50 border-gray-600"
          />
          <Button
            onClick={() => setIsListening(!isListening)}
            variant="outline"
            size="icon"
            className={`border-gray-600 ${isListening ? "bg-red-500/20 border-red-500/50" : ""}`}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button onClick={() => handleQuery(query)} disabled={!query || isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Response */}
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            Analyzing threat landscape...
          </div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/30 rounded-lg p-4 border border-gray-600"
          >
            <div className="whitespace-pre-wrap text-sm">{response}</div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

// Assessment Form Component
const CybersecurityAssessment = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    sapLandscape: [],
    cloudEnvironments: [],
    attackSurface: "",
    existingTools: [],
    complianceRequirements: [],
    budgetRange: "",
    urgency: "",
  })
  const [assessment, setAssessment] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async () => {
    setIsGenerating(true)

    try {
      const res = await fetch("/api/cyber-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      setAssessment(data)
    } catch (error) {
      console.error("Assessment generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Shield className="w-5 h-5" />
          AI-Powered Cybersecurity Assessment
        </CardTitle>
        <CardDescription>
          Get a comprehensive security analysis and recommendations tailored to your environment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Company Name</label>
            <Input
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="bg-gray-800/50 border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Industry</label>
            <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="financial">Financial Services</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SAP Landscape (Select all that apply)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["S/4HANA", "ECC", "BTP", "Ariba", "SuccessFactors", "Concur", "Fieldglass", "SAC"].map((system) => (
              <div key={system} className="flex items-center space-x-2">
                <Checkbox
                  id={system}
                  checked={formData.sapLandscape.includes(system)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, sapLandscape: [...formData.sapLandscape, system] })
                    } else {
                      setFormData({ ...formData, sapLandscape: formData.sapLandscape.filter((s) => s !== system) })
                    }
                  }}
                />
                <label htmlFor={system} className="text-sm">
                  {system}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cloud Environments</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["AWS", "Azure", "GCP", "On-Premise", "Hybrid", "Multi-Cloud"].map((env) => (
              <div key={env} className="flex items-center space-x-2">
                <Checkbox
                  id={env}
                  checked={formData.cloudEnvironments.includes(env)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, cloudEnvironments: [...formData.cloudEnvironments, env] })
                    } else {
                      setFormData({
                        ...formData,
                        cloudEnvironments: formData.cloudEnvironments.filter((e) => e !== env),
                      })
                    }
                  }}
                />
                <label htmlFor={env} className="text-sm">
                  {env}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Compliance Requirements</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["SOC 2", "ISO 27001", "HIPAA", "GDPR", "PCI DSS", "FedRAMP", "NIST"].map((compliance) => (
              <div key={compliance} className="flex items-center space-x-2">
                <Checkbox
                  id={compliance}
                  checked={formData.complianceRequirements.includes(compliance)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({
                        ...formData,
                        complianceRequirements: [...formData.complianceRequirements, compliance],
                      })
                    } else {
                      setFormData({
                        ...formData,
                        complianceRequirements: formData.complianceRequirements.filter((c) => c !== compliance),
                      })
                    }
                  }}
                />
                <label htmlFor={compliance} className="text-sm">
                  {compliance}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isGenerating || !formData.companyName}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating Assessment...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Generate AI Security Assessment
            </>
          )}
        </Button>

        {assessment && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Security Assessment Results</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{assessment.riskScore}/100</div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{assessment.gapsFound}</div>
                  <div className="text-sm text-gray-400">Security Gaps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{assessment.complianceScore}%</div>
                  <div className="text-sm text-gray-400">Compliance</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-red-400 mb-2">Top 5 Security Gaps:</h4>
                  <ul className="space-y-1">
                    {assessment.topGaps?.map((gap: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        {gap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-blue-400 mb-2">Recommended Actions:</h4>
                  <ul className="space-y-1">
                    {assessment.recommendations?.map((rec: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="border-purple-500/50 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Schedule Security Consultation</Button>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default function CybersecurityServicesClientPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const coreServices = [
    {
      id: "zero-trust",
      icon: Shield,
      title: "Zero Trust Architecture",
      description: "Identity-first security framework across apps, devices, users",
      metrics: "99.7% breach prevention",
      features: [
        "Identity & Access Management (IAM)",
        "Multi-factor Authentication (MFA)",
        "Conditional Access Policies",
        "Device Trust & Compliance",
        "Network Micro-segmentation",
      ],
      color: "blue",
    },
    {
      id: "ai-threat",
      icon: Brain,
      title: "AI Threat Detection",
      description: "ML for anomaly detection, behavioral analytics, threat scoring",
      metrics: "0.3s average response time",
      features: [
        "Behavioral Analytics Engine",
        "Anomaly Detection Algorithms",
        "Threat Intelligence Integration",
        "Predictive Risk Scoring",
        "Real-time Alert Correlation",
      ],
      color: "green",
    },
    {
      id: "soar-rpa",
      icon: Bot,
      title: "SOAR & RPA Automation",
      description: "Autonomous incident response, ticketing, patching",
      metrics: "85% faster incident resolution",
      features: [
        "Automated Incident Response",
        "Security Orchestration",
        "Threat Hunting Automation",
        "Vulnerability Management",
        "Compliance Reporting",
      ],
      color: "purple",
    },
    {
      id: "blockchain-audit",
      icon: Link,
      title: "Blockchain Audit Trail",
      description: "Immutable logs for SAP changes, LCA postings, vendor access",
      metrics: "100% audit trail integrity",
      features: [
        "Immutable Transaction Logs",
        "Smart Contract Auditing",
        "Vendor Access Tracking",
        "Change Management Records",
        "Compliance Evidence Chain",
      ],
      color: "orange",
    },
    {
      id: "sap-cloud-security",
      icon: Search,
      title: "SAP & Cloud Security",
      description: "S/4HANA, Ariba, SuccessFactors hardening + ABAP vulnerability scan",
      metrics: "95% vulnerability reduction",
      features: [
        "SAP Security Assessment",
        "ABAP Code Scanning",
        "Cloud Configuration Review",
        "Authorization Optimization",
        "Transport Security",
      ],
      color: "red",
    },
    {
      id: "quantum-crypto",
      icon: Zap,
      title: "Quantum-Resistant Crypto",
      description: "Post-quantum encryption pilots for futureproofing data",
      metrics: "Future-proof encryption",
      features: [
        "Post-Quantum Algorithms",
        "Crypto-Agility Framework",
        "Key Management Systems",
        "Migration Planning",
        "Compliance Readiness",
      ],
      color: "cyan",
    },
  ]

  const industryUseCases = [
    {
      industry: "Healthcare",
      useCase: "Predictive patient data breach alerts + compliance scoring",
      icon: "🏥",
      benefits: ["HIPAA compliance automation", "99.9% patient data protection", "60% faster breach response"],
    },
    {
      industry: "Retail",
      useCase: "Automated ransomware isolation + payment terminal defense",
      icon: "🛒",
      benefits: ["PCI DSS compliance", "24/7 payment protection", "90% faster threat isolation"],
    },
    {
      industry: "Financial Services",
      useCase: "Fraud behavior mapping via AI on transaction clusters",
      icon: "🏦",
      benefits: ["Real-time fraud detection", "99.5% accuracy rate", "50% reduction in false positives"],
    },
    {
      industry: "Manufacturing",
      useCase: "Smart plant IoT sensor spoofing detection",
      icon: "🏭",
      benefits: ["OT/IT security convergence", "100% sensor integrity", "75% faster anomaly detection"],
    },
  ]

  const complianceFrameworks = [
    { name: "SOC 2", coverage: 94, color: "blue" },
    { name: "ISO 27001", coverage: 89, color: "green" },
    { name: "HIPAA", coverage: 96, color: "purple" },
    { name: "NIST", coverage: 91, color: "orange" },
    { name: "GDPR", coverage: 88, color: "red" },
    { name: "SAP GRC", coverage: 97, color: "cyan" },
    { name: "FedRAMP", coverage: 85, color: "yellow" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <CyberBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
              Proactive, Predictive, AI-Powered Cyber Defense
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Secure your enterprise with real-time threat intelligence, autonomous response, and blockchain-powered
              integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Shield className="w-5 h-5 mr-2" />
                Schedule a Cyber Readiness Audit
              </Button>
              <Button size="lg" variant="outline" className="border-red-500/50 hover:border-red-500 bg-transparent">
                <Globe className="w-5 h-5 mr-2" />
                See a Live Threat Map
              </Button>
            </div>
          </motion.div>

          <LiveMetrics />
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Next-Generation Cybersecurity Services</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive security solutions powered by AI, automation, and advanced threat intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <Card
                  className={`bg-gray-800/50 border-${service.color}-500/30 hover:border-${service.color}-500/50 transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-${service.color}-500/20`}>
                        <service.icon className={`w-6 h-6 text-${service.color}-400`} />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-sm font-medium text-${service.color}-400 mb-4`}>{service.metrics}</div>

                    <AnimatePresence>
                      {selectedService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <div className="text-sm font-medium text-gray-300 mb-2">Key Features:</div>
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              {feature}
                            </div>
                          ))}
                          <Button size="sm" className="w-full mt-4 bg-transparent" variant="outline">
                            Learn More
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyber Threat Copilot */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
            <CyberThreatCopilot />
          </motion.div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry-Focused Security Solutions</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tailored cybersecurity approaches for your specific industry challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryUseCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-600 hover:border-blue-500/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">{useCase.icon}</div>
                      <CardTitle className="text-xl">{useCase.industry}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300 text-base">{useCase.useCase}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {useCase.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      View Industry Solution
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Framework Coverage */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Compliance Coverage</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Meet regulatory requirements with our AI-powered compliance monitoring and reporting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gray-800/50 border-gray-600 text-center">
                  <CardContent className="p-6">
                    <div className="text-lg font-semibold mb-2">{framework.name}</div>
                    <div className="relative w-16 h-16 mx-auto mb-3">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-gray-600"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - framework.coverage / 100)}`}
                          className={`text-${framework.color}-400`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold">{framework.coverage}%</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={`border-${framework.color}-500/50 text-${framework.color}-400`}>
                      Compliant
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-12 text-center">
            <Card className="bg-blue-500/10 border-blue-500/30 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-blue-400">AI Compliance Assistant</span>
                </div>
                <p className="text-gray-300 mb-4">
                  "You are 92% compliant with ISO 27001. Next actions: Update incident response procedures, implement
                  additional access controls, and schedule quarterly security reviews."
                </p>
                <Button variant="outline" className="border-blue-500/50 bg-transparent">
                  Get Detailed Compliance Report
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Cybersecurity Assessment */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
            <CybersecurityAssessment />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-red-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Digital Future?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with a comprehensive cybersecurity assessment and discover how AI-powered security can protect
              your enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Shield className="w-5 h-5 mr-2" />
                Start Security Assessment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 hover:border-purple-500 bg-transparent"
              >
                <Brain className="w-5 h-5 mr-2" />
                Talk to Security Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
