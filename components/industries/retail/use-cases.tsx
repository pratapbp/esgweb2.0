"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag, CreditCard, Truck, Users, RotateCcw, Zap, Brain, Cloud, Bot } from "lucide-react"

const useCases = [
  {
    id: "merchandising",
    icon: Tag,
    function: "Merchandising",
    useCase: "AI-powered dynamic pricing using competitor & trend data",
    sapStack: {
      modules: ["SAP S/4HANA", "SAP Ariba", "SAP Analytics Cloud"],
      description: "Integrated pricing engine with real-time competitor analysis and demand forecasting",
      benefits: ["15% margin improvement", "Real-time price optimization", "Automated competitor tracking"],
    },
    cloudNative: {
      modules: ["Azure ML", "Power BI", "API Management"],
      description: "Cloud-first pricing solution with advanced ML algorithms and real-time data processing",
      benefits: ["Scalable architecture", "Advanced ML models", "Real-time analytics"],
    },
    copilot: {
      capabilities: ["Natural language pricing queries", "Automated price recommendations", "Trend analysis"],
      description: "AI assistant for pricing strategy with conversational interface and intelligent insights",
      benefits: ["Instant pricing insights", "Automated recommendations", "Natural language interface"],
    },
  },
  {
    id: "checkout",
    icon: CreditCard,
    function: "POS + Checkout",
    useCase: "GenAI chat checkout + facial recognition for payment",
    sapStack: {
      modules: ["SAP Commerce Cloud", "SAP Payment Engine", "SAP Customer Data Platform"],
      description: "Unified checkout experience with integrated payment processing and customer recognition",
      benefits: ["Seamless checkout", "Integrated payments", "Customer recognition"],
    },
    cloudNative: {
      modules: ["Stripe API", "Face Recognition API", "Conversational AI"],
      description: "Modern checkout solution with AI-powered assistance and biometric authentication",
      benefits: ["Fast implementation", "Modern UX", "Biometric security"],
    },
    copilot: {
      capabilities: ["Voice-activated checkout", "Payment assistance", "Order tracking"],
      description: "Conversational checkout assistant with voice commands and intelligent payment guidance",
      benefits: ["Hands-free checkout", "Payment guidance", "Order assistance"],
    },
  },
  {
    id: "warehouse",
    icon: Truck,
    function: "Warehouse Logistics",
    useCase: "RPA bots for pick-pack-ship workflows",
    sapStack: {
      modules: ["SAP EWM", "SAP TM", "SAP IBP"],
      description: "Comprehensive warehouse management with automated workflows and transportation planning",
      benefits: ["End-to-end visibility", "Automated workflows", "Optimized routing"],
    },
    cloudNative: {
      modules: ["RPA Platform", "IoT Hub", "Warehouse Management System"],
      description: "Automated warehouse operations with RPA bots and IoT-enabled tracking",
      benefits: ["Process automation", "IoT integration", "Real-time tracking"],
    },
    copilot: {
      capabilities: ["Warehouse optimization", "Inventory queries", "Workflow automation"],
      description: "AI assistant for warehouse operations with intelligent routing and inventory management",
      benefits: ["Optimized operations", "Intelligent routing", "Automated decisions"],
    },
  },
  {
    id: "engagement",
    icon: Users,
    function: "Customer Engagement",
    useCase: "Hyper-personalized promotions using SAP Emarsys",
    sapStack: {
      modules: ["SAP Emarsys", "SAP CDC", "SAP Marketing Cloud"],
      description: "Personalized marketing campaigns with customer data platform and engagement tools",
      benefits: ["Personalized campaigns", "Customer insights", "Omnichannel engagement"],
    },
    cloudNative: {
      modules: ["Personalization Engine", "Customer Analytics", "Campaign Management"],
      description: "AI-driven personalization with advanced analytics and automated campaign management",
      benefits: ["AI personalization", "Advanced analytics", "Automated campaigns"],
    },
    copilot: {
      capabilities: ["Campaign optimization", "Customer insights", "Personalization recommendations"],
      description: "AI assistant for marketing campaigns with intelligent personalization and optimization",
      benefits: ["Campaign optimization", "Intelligent insights", "Automated personalization"],
    },
  },
  {
    id: "returns",
    icon: RotateCcw,
    function: "Returns & Claims",
    useCase: "AI fraud scoring + LLM claim auto-responses",
    sapStack: {
      modules: ["SAP Fraud Management", "SAP Service Cloud", "SAP S/4HANA"],
      description: "Integrated fraud detection and claims processing with automated responses",
      benefits: ["Fraud prevention", "Automated processing", "Integrated workflow"],
    },
    cloudNative: {
      modules: ["ML Fraud Detection", "NLP Engine", "Claims Processing API"],
      description: "AI-powered fraud detection with natural language processing for automated responses",
      benefits: ["Advanced ML models", "NLP processing", "Automated responses"],
    },
    copilot: {
      capabilities: ["Fraud analysis", "Claim processing", "Customer communication"],
      description: "AI assistant for returns and claims with intelligent fraud detection and customer service",
      benefits: ["Intelligent fraud detection", "Automated claims", "Enhanced customer service"],
    },
  },
]

export default function UseCases() {
  const [selectedTab, setSelectedTab] = useState("sapStack")
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
            >
              🔧 Retail Use Cases
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Manufacturing Use Cases
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Explore how different technology approaches solve retail challenges across key business functions
            </p>
          </motion.div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-lg">
            <TabsTrigger
              value="sapStack"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4" />
              SAP Stack
            </TabsTrigger>
            <TabsTrigger
              value="cloudNative"
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Cloud className="w-4 h-4" />
              Cloud Native
            </TabsTrigger>
            <TabsTrigger
              value="copilot"
              className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Bot className="w-4 h-4" />
              ESGit Copilot
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                    selectedUseCase === useCase.id
                      ? "border-blue-500 shadow-lg scale-105"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedUseCase(selectedUseCase === useCase.id ? null : useCase.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`p-3 rounded-lg ${
                          selectedTab === "sapStack"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600"
                            : selectedTab === "cloudNative"
                              ? "bg-gradient-to-br from-purple-500 to-purple-600"
                              : "bg-gradient-to-br from-indigo-500 to-indigo-600"
                        }`}
                      >
                        <useCase.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
                          {useCase.function}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{useCase.useCase}</p>
                      </div>
                    </div>

                    <TabsContent value="sapStack" className="mt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {useCase.sapStack.modules.map((module, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                            >
                              {module}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{useCase.sapStack.description}</p>
                        <div className="space-y-1">
                          {useCase.sapStack.benefits.map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
                            >
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="cloudNative" className="mt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {useCase.cloudNative.modules.map((module, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700"
                            >
                              {module}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{useCase.cloudNative.description}</p>
                        <div className="space-y-1">
                          {useCase.cloudNative.benefits.map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
                            >
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="copilot" className="mt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {useCase.copilot.capabilities.map((capability, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700"
                            >
                              {capability}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{useCase.copilot.description}</p>
                        <div className="space-y-1">
                          {useCase.copilot.benefits.map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
                            >
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
            <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Ready to Transform Your Retail Operations?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Let our experts design a custom solution architecture that fits your specific retail needs and technology
              preferences
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Custom Architecture Design
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
