"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Brain,
  BarChart3,
  Users,
  Settings,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  TrendingUp,
} from "lucide-react"

const sapModules = [
  {
    id: "s4hana",
    title: "SAP S/4HANA",
    description: "Next-generation ERP with AI-powered insights",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    features: ["Real-time analytics", "Intelligent automation", "Predictive maintenance", "Smart procurement"],
    metrics: {
      performance: "40% faster processing",
      efficiency: "60% reduction in manual tasks",
      insights: "Real-time business intelligence",
    },
  },
  {
    id: "analytics",
    title: "SAP Analytics Cloud",
    description: "AI-driven analytics and planning platform",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    features: ["Predictive analytics", "Machine learning models", "Augmented analytics", "Smart insights"],
    metrics: {
      accuracy: "95% prediction accuracy",
      speed: "10x faster insights",
      automation: "80% automated reporting",
    },
  },
  {
    id: "successfactors",
    title: "SAP SuccessFactors",
    description: "AI-powered human capital management",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    features: ["Talent intelligence", "Performance insights", "Learning recommendations", "Workforce analytics"],
    metrics: {
      engagement: "35% higher engagement",
      retention: "25% better retention",
      productivity: "30% productivity gain",
    },
  },
]

export function SAPAIShowcase() {
  const [activeModule, setActiveModule] = useState("s4hana")
  const [isDemo, setIsDemo] = useState(false)

  const currentModule = sapModules.find((m) => m.id === activeModule) || sapModules[0]

  const startDemo = () => {
    setIsDemo(true)
    setTimeout(() => setIsDemo(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800/30 to-gray-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Database className="w-4 h-4 mr-2" />
            SAP + AI Integration
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">SAP Powered by AI</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of SAP solutions enhanced with artificial intelligence
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 backdrop-blur-md">
              {sapModules.map((module) => (
                <TabsTrigger
                  key={module.id}
                  value={module.id}
                  className="data-[state=active]:bg-electric-cyan data-[state=active]:text-midnight-blue"
                >
                  <module.icon className="w-4 h-4 mr-2" />
                  {module.title.split(" ")[1]}
                </TabsTrigger>
              ))}
            </TabsList>

            {sapModules.map((module) => (
              <TabsContent key={module.id} value={module.id} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center mr-4`}
                      >
                        <module.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-luminous-white">{module.title}</h3>
                        <p className="text-gray-300">{module.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {module.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center"
                        >
                          <CheckCircle className="h-5 w-5 text-success-green mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {Object.entries(module.metrics).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="text-center p-4 bg-gray-900/50 rounded-lg"
                        >
                          <div className="text-lg font-bold text-electric-cyan mb-1">{value}</div>
                          <div className="text-sm text-gray-400 capitalize">{key}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={startDemo}
                        disabled={isDemo}
                        className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue hover:scale-105 transition-transform"
                      >
                        {isDemo ? (
                          <>
                            <Settings className="h-4 w-4 mr-2 animate-spin" />
                            Running Demo...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Demo
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 bg-transparent"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>

                  {/* Interactive Demo */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-luminous-white flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-electric-cyan" />
                          AI-Enhanced Dashboard
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Simulated Dashboard */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-300">Performance</span>
                                <TrendingUp className="h-4 w-4 text-green-400" />
                              </div>
                              <div className="text-2xl font-bold text-white">{isDemo ? "Processing..." : "94.2%"}</div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-300">Efficiency</span>
                                <Zap className="h-4 w-4 text-yellow-400" />
                              </div>
                              <div className="text-2xl font-bold text-white">{isDemo ? "Analyzing..." : "87.5%"}</div>
                            </div>
                          </div>

                          {/* AI Insights */}
                          <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="text-white font-semibold mb-2">AI Insights</h4>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-300">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                                {isDemo ? "Generating insights..." : "Optimal performance detected"}
                              </div>
                              <div className="flex items-center text-sm text-gray-300">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                                {isDemo ? "Processing data..." : "Recommend process optimization"}
                              </div>
                              <div className="flex items-center text-sm text-gray-300">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                                {isDemo ? "Analyzing trends..." : "Predictive maintenance due in 5 days"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
