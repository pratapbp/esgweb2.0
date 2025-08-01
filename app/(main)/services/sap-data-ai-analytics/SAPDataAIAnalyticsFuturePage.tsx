"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Database,
  Zap,
  TrendingUp,
  Shield,
  Sparkles,
  CheckCircle,
  Play,
  Download,
  MessageSquare,
  Settings,
  Cloud,
  Network,
  Infinity,
} from "lucide-react"

const SAPDataAIAnalyticsFuturePage = () => {
  const [mounted, setMounted] = useState(false)
  const [activeDemo, setActiveDemo] = useState("predictive")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleStartDemo = (demoType: string) => {
    setActiveDemo(demoType)
    setIsProcessing(true)
    setTimeout(() => setIsProcessing(false), 3000)
  }

  const aiCapabilities = [
    {
      icon: Brain,
      title: "Cognitive Analytics",
      description: "Advanced machine learning algorithms that understand business context",
      metrics: "99.7% accuracy",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      title: "Real-time Data Processing",
      description: "Process millions of data points in real-time with zero latency",
      metrics: "< 10ms response",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Automated Insights",
      description: "AI-powered insights that automatically surface business opportunities",
      metrics: "24/7 monitoring",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Predictive Forecasting",
      description: "Forecast business trends with unprecedented accuracy",
      metrics: "95% prediction accuracy",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const demoScenarios = [
    {
      id: "predictive",
      title: "Predictive Analytics",
      description: "See how AI predicts market trends and customer behavior",
      icon: TrendingUp,
      results: [
        { metric: "Revenue Forecast", value: "+23.5%", trend: "up" },
        { metric: "Customer Churn Risk", value: "12.3%", trend: "down" },
        { metric: "Market Opportunity", value: "$2.4M", trend: "up" },
      ],
    },
    {
      id: "realtime",
      title: "Real-time Processing",
      description: "Watch live data processing and instant insights generation",
      icon: Zap,
      results: [
        { metric: "Data Points/sec", value: "1.2M", trend: "stable" },
        { metric: "Processing Latency", value: "8ms", trend: "down" },
        { metric: "Accuracy Rate", value: "99.8%", trend: "up" },
      ],
    },
    {
      id: "cognitive",
      title: "Cognitive Intelligence",
      description: "Experience AI that understands business context and nuance",
      icon: Brain,
      results: [
        { metric: "Context Understanding", value: "97.2%", trend: "up" },
        { metric: "Decision Confidence", value: "94.8%", trend: "up" },
        { metric: "Learning Rate", value: "+15.3%", trend: "up" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 1920],
              y: [0, Math.random() * 1080],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Next-Generation AI Analytics
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                SAP Data & AI
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Analytics Platform
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform your business with AI-powered analytics that understand context, predict outcomes, and deliver
                actionable insights in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                  onClick={() => handleStartDemo("predictive")}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Live Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg bg-transparent"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Whitepaper
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Capabilities Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">AI-Powered Capabilities</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of business intelligence with our advanced AI capabilities
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aiCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all duration-300">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${capability.color} flex items-center justify-center mb-4`}
                      >
                        <capability.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white">{capability.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{capability.description}</p>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {capability.metrics}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Interactive AI Demonstrations</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See our AI in action with live, interactive demonstrations
              </p>
            </motion.div>

            <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-lg">
                {demoScenarios.map((demo) => (
                  <TabsTrigger
                    key={demo.id}
                    value={demo.id}
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    <demo.icon className="w-4 h-4 mr-2" />
                    {demo.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {demoScenarios.map((demo) => (
                <TabsContent key={demo.id} value={demo.id} className="mt-8">
                  <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <demo.icon className="w-6 h-6 mr-3 text-purple-400" />
                        {demo.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">{demo.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {demo.results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 rounded-lg p-6 text-center"
                          >
                            <h4 className="text-gray-300 text-sm mb-2">{result.metric}</h4>
                            <div className="text-2xl font-bold text-white mb-2">{result.value}</div>
                            <div
                              className={`flex items-center justify-center ${
                                result.trend === "up"
                                  ? "text-green-400"
                                  : result.trend === "down"
                                    ? "text-red-400"
                                    : "text-gray-400"
                              }`}
                            >
                              <TrendingUp className="w-4 h-4 mr-1" />
                              <span className="text-xs">{result.trend}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex justify-center">
                        <Button
                          onClick={() => handleStartDemo(demo.id)}
                          disabled={isProcessing}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          {isProcessing ? (
                            <>
                              <Infinity className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Run {demo.title} Demo
                            </>
                          )}
                        </Button>
                      </div>

                      {isProcessing && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white text-sm">AI Processing</span>
                              <span className="text-purple-400 text-sm">Running...</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Enterprise-Grade Technology Stack</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Built on proven SAP technologies with cutting-edge AI capabilities
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <Cloud className="w-12 h-12 text-blue-400 mb-4" />
                  <CardTitle className="text-white">Cloud Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> SAP Analytics Cloud
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Multi-cloud deployment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Auto-scaling infrastructure
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> 99.9% uptime SLA
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <Network className="w-12 h-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">AI & Machine Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> SAP AI Core
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Custom ML models
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Natural language processing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Predictive analytics
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <Shield className="w-12 h-12 text-green-400 mb-4" />
                  <CardTitle className="text-white">Security & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Enterprise-grade security
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> GDPR compliance
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Data encryption
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Audit trails
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-gray-300 mb-12">
                Join leading enterprises who trust our AI-powered analytics platform
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg bg-transparent"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Request Custom Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SAPDataAIAnalyticsFuturePage
