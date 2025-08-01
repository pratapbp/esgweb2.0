"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Zap,
  Brain,
  Users,
  FileText,
  Clock,
  DollarSign,
  Package,
  Play,
  Pause,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Workflow,
  Database,
  Bell,
  BarChart3,
  Settings,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const rpaApplications = [
  {
    title: "Recruitment Automation",
    description: "Auto-screen resumes, push to VMS, schedule interviews",
    icon: Users,
    stats: { processed: 2847, accuracy: 94, timeSaved: 65 },
    color: "blue",
    features: ["Resume parsing", "VMS integration", "Interview scheduling", "Candidate scoring"],
  },
  {
    title: "LCA Lifecycle Bot",
    description: "Auto-post, update, and monitor LCA jobs + notify expiries",
    icon: FileText,
    stats: { processed: 1234, accuracy: 99, timeSaved: 80 },
    color: "green",
    features: ["Auto-posting", "Status monitoring", "Expiry alerts", "Compliance tracking"],
  },
  {
    title: "Timesheet Reconciliation",
    description: "Collect, verify, alert missing entries from multiple systems",
    icon: Clock,
    stats: { processed: 5621, accuracy: 96, timeSaved: 70 },
    color: "purple",
    features: ["Multi-system sync", "Validation rules", "Missing entry alerts", "Approval workflow"],
  },
  {
    title: "Payroll Processing",
    description: "Validate timesheets ⇄ invoices ⇄ payments in loop",
    icon: DollarSign,
    stats: { processed: 3456, accuracy: 98, timeSaved: 75 },
    color: "yellow",
    features: ["Timesheet validation", "Invoice generation", "Payment processing", "Audit trail"],
  },
  {
    title: "Invoice Automation",
    description: "Auto-generate invoices from billing triggers in SAP BRIM",
    icon: FileText,
    stats: { processed: 4892, accuracy: 97, timeSaved: 85 },
    color: "red",
    features: ["SAP BRIM integration", "Auto-generation", "Approval routing", "Payment tracking"],
  },
  {
    title: "Procurement Workflows",
    description: "Automate vendor onboarding and contract generation",
    icon: Package,
    stats: { processed: 1567, accuracy: 95, timeSaved: 60 },
    color: "indigo",
    features: ["Vendor onboarding", "Contract templates", "Approval chains", "Compliance checks"],
  },
]

const rpaStack = [
  {
    layer: "Bot Orchestration",
    tools: "UiPath, n8n, custom Node.js bots",
    icon: Bot,
    description: "Centralized bot management and workflow orchestration",
  },
  {
    layer: "AI Decision Engine",
    tools: "OpenAI GPT-4 + ESG Knowledge RAG",
    icon: Brain,
    description: "Intelligent decision making with context awareness",
  },
  {
    layer: "Data Layer",
    tools: "Supabase RLS Logs, SAP Integration",
    icon: Database,
    description: "Secure data storage and enterprise system integration",
  },
  {
    layer: "Notifications",
    tools: "Slack, Email, ESG Copilot",
    icon: Bell,
    description: "Multi-channel notification and alert system",
  },
  {
    layer: "Monitoring",
    tools: "ESG Dashboard, RPA Copilot Alerts",
    icon: BarChart3,
    description: "Real-time monitoring and performance analytics",
  },
]

const benefits = [
  { metric: "65%", label: "faster onboarding cycles", icon: TrendingUp },
  { metric: "90%+", label: "automation of timesheet workflows", icon: CheckCircle },
  { metric: "Zero", label: "LCA expiry misses (auto reminders)", icon: Shield },
  { metric: "3x", label: "faster pay-on-pay cycle validation", icon: Zap },
  { metric: "100%", label: "enhanced audit trail via Blockchain + RPA logs", icon: FileText },
]

const copilotCommands = [
  "Run Resume Parse Bot",
  "Check LCA job compliance",
  "Trigger invoice sync for March",
  "Generate timesheet report",
  "Validate payroll data",
  "Update vendor contracts",
]

const relatedServices = [
  { name: "SAP Enterprise Solutions", path: "/services/sap-enterprise-solutions", icon: Settings },
  { name: "Staffing Solutions", path: "/services/staffing-solutions", icon: Users },
  { name: "HRMS", path: "/app/hrms", icon: Users },
  { name: "Blockchain", path: "/technologies/blockchain", icon: Shield },
  { name: "GenAI", path: "/technologies/genai", icon: Brain },
  { name: "Finance", path: "/app/finance", icon: DollarSign },
]

export function RPAPage() {
  const [selectedApp, setSelectedApp] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentCommand, setCurrentCommand] = useState(0)

  // Auto-play copilot commands
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentCommand((prev) => (prev + 1) % copilotCommands.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        {/* Floating AI Bots Animation */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-blue-500/20 rounded-full"
            animate={{
              x: [0, 100, 200, 300, 400],
              y: [50 + i * 80, 100 + i * 80, 50 + i * 80],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          >
            <Bot className="w-full h-full text-blue-400" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge
                variant="outline"
                className="px-6 py-3 text-lg border-blue-500/30 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-300 mb-8"
              >
                <Bot className="w-5 h-5 mr-2" />
                RPA at ESGit
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  Intelligent Automation
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Unleashed
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
                Scale enterprise productivity with intelligent automation that learns, adapts, and delivers. Automate.
                Accelerate. Augment. Your workflows with AI-powered RPA.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg"
                >
                  <Workflow className="w-5 h-5 mr-2" />
                  Automate Your Workflow
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try RPA Use Case Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* RPA Applications Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  RPA Applications
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Intelligent automation across HR, Finance, Staffing, Procurement, and SAP systems
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rpaApplications.map((app, index) => {
                const IconComponent = app.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-${app.color}-500/20`}>
                            <IconComponent className={`w-6 h-6 text-${app.color}-400`} />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {app.stats.processed.toLocaleString()} processed
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-xl mb-2">{app.title}</CardTitle>
                        <p className="text-gray-400">{app.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-green-400">{app.stats.accuracy}%</div>
                              <div className="text-xs text-gray-500">Accuracy</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-blue-400">{app.stats.timeSaved}%</div>
                              <div className="text-xs text-gray-500">Time Saved</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-purple-400">24/7</div>
                              <div className="text-xs text-gray-500">Uptime</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-300">Key Features:</h4>
                            <div className="flex flex-wrap gap-1">
                              {app.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ESGit RPA Framework */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                ESGit RPA Framework - Intelligent automation with AI decision layer
              </p>
            </motion.div>

            {/* Workflow Visualization */}
            <div className="mb-16">
              <Card className="bg-gray-900/30 border-gray-700">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
                    {[
                      { label: "User Action", icon: Users, color: "blue" },
                      { label: "Trigger Bot Workflow", icon: Bot, color: "green" },
                      { label: "AI Decision Layer", icon: Brain, color: "purple" },
                      { label: "Action in SAP/HRMS/VMS", icon: Settings, color: "yellow" },
                      { label: "Send Alert / Report", icon: Bell, color: "red" },
                    ].map((step, index) => {
                      const IconComponent = step.icon
                      return (
                        <div key={index} className="flex flex-col items-center text-center">
                          <div className={`p-4 rounded-full bg-${step.color}-500/20 mb-4`}>
                            <IconComponent className={`w-8 h-8 text-${step.color}-400`} />
                          </div>
                          <h3 className="text-white font-semibold mb-2">{step.label}</h3>
                          {index < 4 && <ArrowRight className="hidden md:block w-6 h-6 text-gray-500 mt-4" />}
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2">Trigger Points</h4>
                      <p className="text-gray-400 text-sm">Timesheets, onboarding, LCA updates</p>
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-2">AI Layer</h4>
                      <p className="text-gray-400 text-sm">Uses GenAI to validate context + data</p>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">RPA Tools</h4>
                      <p className="text-gray-400 text-sm">Built with UiPath / Python Bots / Supabase Edge</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ESG RPA + AI Stack */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ESG RPA + AI Stack
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rpaStack.map((layer, index) => {
                const IconComponent = layer.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gray-900/50 border-gray-700 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-blue-500/20">
                            <IconComponent className="w-5 h-5 text-blue-400" />
                          </div>
                          <CardTitle className="text-white text-lg">{layer.layer}</CardTitle>
                        </div>
                        <p className="text-blue-400 font-medium">{layer.tools}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-sm">{layer.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Delivered */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Benefits Delivered
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30 text-center h-full">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <IconComponent className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                          <div className="text-3xl font-bold text-white mb-2">{benefit.metric}</div>
                        </div>
                        <p className="text-gray-300 text-sm">{benefit.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* RPA Copilot Widget */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  RPA Copilot
                </span>
              </h2>
              <p className="text-xl text-gray-300">Voice commands to trigger intelligent automation workflows</p>
            </motion.div>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    ESG RPA Terminal
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-gray-400 hover:text-white"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 rounded-lg p-6 font-mono">
                  <div className="text-green-400 mb-4">$ esg-rpa-copilot --interactive</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCommand}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="text-blue-400"
                    >
                      <span className="text-gray-500">{">"} </span>
                      {copilotCommands[currentCommand]}
                      <span className="animate-pulse">|</span>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {copilotCommands.map((command, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentCommand(index)}
                        className={`text-xs ${
                          currentCommand === index
                            ? "border-blue-500 text-blue-400"
                            : "border-gray-600 text-gray-400 hover:text-white"
                        }`}
                      >
                        {command}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Integrates With
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedServices.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gray-900/30 border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4">
                          <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-blue-400 mx-auto transition-colors" />
                        </div>
                        <h3 className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                          {service.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Don't just automate tasks.
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Automate intelligence.
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Ready to transform your enterprise workflows with AI-powered RPA? Let's build intelligent automation
                that scales with your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Book RPA Workshop
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Use Cases
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default RPAPage
