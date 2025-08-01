"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Link2,
  FileText,
  Users,
  DollarSign,
  Archive,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  CheckCircle,
  Lock,
  Eye,
  Zap,
} from "lucide-react"

const BlockchainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [metrics, setMetrics] = useState({
    transactions: 0,
    contracts: 0,
    compliance: 0,
  })

  // Animate metrics on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        transactions: 21940,
        contracts: 156,
        compliance: 100,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % useCases.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying])

  const coreApplications = [
    {
      icon: FileText,
      title: "LCA Ledger",
      description: "Post LCAs with immutable timestamps & RAG-based compliance AI",
      transactions: "2,847",
      status: "Active",
    },
    {
      icon: Users,
      title: "Smart Contracts for Vendors",
      description: "Create auto-enforcing agreements with expiry logic",
      transactions: "1,234",
      status: "Active",
    },
    {
      icon: DollarSign,
      title: "Pay-on-Pay Blockchain Trail",
      description: "Track consultant billing → payments transparently",
      transactions: "5,621",
      status: "Active",
    },
    {
      icon: Archive,
      title: "Contract Versioning Ledger",
      description: "No more email loops — verifiable document timelines",
      transactions: "892",
      status: "Active",
    },
    {
      icon: CheckCircle,
      title: "Audit Trail for Submissions",
      description: "Resume, timesheets, onboarding verified on-chain",
      transactions: "3,456",
      status: "Active",
    },
    {
      icon: Shield,
      title: "ESGit Compliance Vault",
      description: "Secure, blockchain-backed document storage with AI search",
      transactions: "7,891",
      status: "Active",
    },
  ]

  const useCases = [
    {
      title: "Auto-post LCA + hash into ledger",
      tech: "Supabase + Solidity + GPT LLM",
      description: "Automatically post Labor Condition Applications with cryptographic hashing",
    },
    {
      title: "Smart alert for LCA expiry in 90d",
      tech: "Blockchain logs + RPA trigger + AI alert",
      description: "Proactive compliance monitoring with automated notifications",
    },
    {
      title: "Verify job posting compliance",
      tech: "NLP + blockchain + AI rule matching",
      description: "Real-time compliance verification using AI and blockchain",
    },
    {
      title: "Show invoice trail on /app/finance",
      tech: "Pay chain signed via smart contract",
      description: "Complete financial transparency with smart contract validation",
    },
  ]

  const techStack = [
    {
      name: "Solidity",
      purpose: "Smart contracts",
      icon: "⚡",
    },
    {
      name: "Polygon",
      purpose: "Low-gas L2 chain",
      icon: "🔷",
    },
    {
      name: "Supabase Edge",
      purpose: "Write confirmations",
      icon: "🚀",
    },
    {
      name: "OpenAI + LangChain",
      purpose: "Audit logic AI",
      icon: "🧠",
    },
    {
      name: "IPFS / Arweave",
      purpose: "Immutable doc storage",
      icon: "📁",
    },
    {
      name: "RainbowKit",
      purpose: "Wallet-based access",
      icon: "🌈",
    },
  ]

  const relatedSolutions = [
    { name: "SAP BRIM", path: "/services/sap-brim" },
    { name: "Staffing Solutions", path: "/services/staffing-solutions" },
    { name: "LCA Postings", path: "/lca-postings" },
    { name: "Finance", path: "/app/finance" },
    { name: "RPA", path: "/technologies/rpa" },
    { name: "HRMS", path: "/app/hrms" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="relative"
              >
                <Shield className="w-5 h-5 text-blue-600" />
                <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-pulse" />
              </motion.div>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Blockchain at ESGit</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ESG Chain of Trust
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              <span className="font-semibold text-blue-600">Immutable.</span>{" "}
              <span className="font-semibold text-purple-600">Verifiable.</span>{" "}
              <span className="font-semibold text-indigo-600">Transparent.</span>
              <br />
              Enabling zero-trust systems and intelligent automation through smart contracts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Explore Use Cases
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                Learn about ESG Ledger
                <Link2 className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Live Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-3xl font-bold text-blue-600 mb-2"
                >
                  {metrics.transactions.toLocaleString()}
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300">Blockchain Transactions</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-3xl font-bold text-purple-600 mb-2"
                >
                  {metrics.contracts}
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300">Active Smart Contracts</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-indigo-200">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-3xl font-bold text-indigo-600 mb-2"
                >
                  {metrics.compliance}%
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300">Compliance Rate</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Core Applications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Core Applications
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Blockchain-powered solutions for enterprise compliance and transparency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreApplications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200/50 hover:border-blue-300/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        <app.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {app.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{app.title}</CardTitle>
                    <CardDescription className="text-sm">{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Transactions</span>
                      <span className="font-semibold text-blue-600">{app.transactions}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Ledger Architecture */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ESG Ledger™ Architecture
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              End-to-end blockchain workflow with AI verification
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {["Client Request", "Consultant Action", "HR/Recruiter", "Blockchain Log", "AI Verifier"].map(
                (step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold text-center">{step}</h3>
                    {index < 4 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                        className="hidden md:block absolute top-8 w-24 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                        style={{ left: `${(index + 1) * 20 - 10}%` }}
                      />
                    )}
                  </motion.div>
                ),
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <h4 className="font-semibold mb-4">Built with:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>• Ethereum / Polygon smart contracts</div>
                <div>• Supabase logs + blockchain mirrors</div>
                <div>• AI validation layer (fraud + anomaly detection)</div>
                <div>• IPFS or Filecoin for doc storage</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blockchain x AI Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Blockchain × AI: Real-Time Use Cases
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Intelligent automation powered by blockchain and artificial intelligence
            </p>
          </motion.div>

          <div className="relative">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Interactive Demo Carousel</CardTitle>
                  <CardDescription>Live blockchain and AI integration scenarios</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                  >
                    <h3 className="text-xl font-semibold mb-2">{useCases[currentSlide].title}</h3>
                    <p className="text-blue-600 font-medium mb-3">{useCases[currentSlide].tech}</p>
                    <p className="text-gray-600 dark:text-gray-300">{useCases[currentSlide].description}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-center mt-6 gap-2">
                  {useCases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Trust Impact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Security & Trust Impact
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lock,
                title: "Zero Tamper",
                description: "100% tamper resistance with full LCA lifecycle traceability",
                metric: "100%",
              },
              {
                icon: Eye,
                title: "Verifiable Contracts",
                description: "Verifiable contracts for audits & legal defense",
                metric: "99.9%",
              },
              {
                icon: Shield,
                title: "AI Fraud Detection",
                description: "Integrated AI detects fraudulent entries",
                metric: "99.7%",
              },
              {
                icon: Link2,
                title: "Cross-Module Linking",
                description: "HRMS ⇄ Finance ⇄ VMS integration",
                metric: "100%",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg w-fit mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                    <div className="text-2xl font-bold text-blue-600">{item.metric}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade blockchain infrastructure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{tech.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{tech.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{tech.purpose}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Related Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Integrated blockchain solutions across our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 text-center hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                  asChild
                >
                  <a href={solution.path}>
                    <div>
                      <div className="font-medium">{solution.name}</div>
                      <ChevronRight className="w-4 h-4 mx-auto mt-2" />
                    </div>
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Build compliance systems that can't be tampered with
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to implement blockchain-powered transparency and trust in your enterprise workflows?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Launch ESG Ledger Demo
                <Zap className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                Talk to Blockchain Architect
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BlockchainPage
