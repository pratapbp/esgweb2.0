"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Shield,
  TrendingUp,
  CreditCard,
  DollarSign,
  FileCheck,
  Brain,
  Eye,
  Zap,
  Lock,
  BarChart3,
  Users,
} from "lucide-react"

const useCasesBySegment = {
  banking: {
    title: "Banking",
    icon: Building2,
    color: "blue",
    cases: [
      {
        title: "Smart KYC with NLP + Biometric AI",
        description: "Automated customer onboarding with document verification and biometric authentication",
        features: ["Document OCR", "Facial Recognition", "Risk Scoring", "Compliance Check"],
        metrics: { time: "2 minutes", accuracy: "99.7%", cost: "85% reduction" },
        icon: Eye,
      },
      {
        title: "AI-Powered Credit Decisioning",
        description: "Real-time credit assessment using alternative data sources and ML models",
        features: ["Alternative Data", "Bias Mitigation", "Real-time Scoring", "Explainable AI"],
        metrics: { approval: "< 1 hour", accuracy: "94%", defaults: "32% reduction" },
        icon: BarChart3,
      },
    ],
  },
  insurance: {
    title: "Insurance",
    icon: Shield,
    color: "green",
    cases: [
      {
        title: "Automated Claims Processing with Vision AI",
        description: "Computer vision and NLP for instant claim assessment and fraud detection",
        features: ["Image Analysis", "Damage Assessment", "Fraud Detection", "Auto-Settlement"],
        metrics: { processing: "3 days", accuracy: "96%", fraud: "78% detection" },
        icon: Eye,
      },
      {
        title: "AI Underwriting Engine",
        description: "Intelligent risk assessment and pricing optimization using ML algorithms",
        features: ["Risk Modeling", "Dynamic Pricing", "Portfolio Optimization", "Regulatory Compliance"],
        metrics: { speed: "90% faster", accuracy: "92%", profitability: "15% increase" },
        icon: TrendingUp,
      },
    ],
  },
  wealth: {
    title: "Wealth Management",
    icon: TrendingUp,
    color: "purple",
    cases: [
      {
        title: "GenAI-Driven Portfolio Simulations",
        description: "Advanced portfolio optimization using generative AI and market simulation",
        features: ["Monte Carlo Simulation", "Risk Analysis", "ESG Integration", "Personalized Advice"],
        metrics: { returns: "12% improvement", risk: "25% reduction", satisfaction: "94%" },
        icon: BarChart3,
      },
      {
        title: "Robo-Advisory with Emotional AI",
        description: "AI-powered investment advice considering client emotions and market sentiment",
        features: ["Sentiment Analysis", "Behavioral Finance", "Automated Rebalancing", "Tax Optimization"],
        metrics: { engagement: "67% increase", retention: "89%", performance: "8.7% avg return" },
        icon: Brain,
      },
    ],
  },
  payments: {
    title: "Payments",
    icon: CreditCard,
    color: "orange",
    cases: [
      {
        title: "AI Risk Scoring + Real-time Authorization",
        description: "Instant transaction risk assessment with real-time fraud prevention",
        features: ["Real-time Scoring", "Behavioral Analysis", "Device Fingerprinting", "Adaptive Authentication"],
        metrics: { latency: "< 50ms", fraud: "98.9% detection", false_positives: "60% reduction" },
        icon: Zap,
      },
      {
        title: "Cross-Border Payment Intelligence",
        description: "AI-optimized routing and compliance for international transactions",
        features: ["Route Optimization", "Compliance Automation", "Currency Hedging", "Settlement Prediction"],
        metrics: { cost: "40% reduction", speed: "2x faster", compliance: "100%" },
        icon: Lock,
      },
    ],
  },
  lending: {
    title: "Lending",
    icon: DollarSign,
    color: "indigo",
    cases: [
      {
        title: "AI Credit Decision Engine with Bias Mitigation",
        description: "Fair and accurate lending decisions using explainable AI models",
        features: ["Fairness Testing", "Explainable AI", "Alternative Data", "Dynamic Pricing"],
        metrics: { approval: "45 seconds", fairness: "99.2%", defaults: "28% reduction" },
        icon: Brain,
      },
      {
        title: "Predictive Collections AI",
        description: "Proactive collection strategies using customer behavior prediction",
        features: ["Behavior Prediction", "Channel Optimization", "Payment Propensity", "Automated Workflows"],
        metrics: { recovery: "35% improvement", cost: "50% reduction", satisfaction: "78%" },
        icon: Users,
      },
    ],
  },
  regulatory: {
    title: "Regulatory",
    icon: FileCheck,
    color: "red",
    cases: [
      {
        title: "LLM Trained on Dodd-Frank, GDPR, Basel III",
        description: "Comprehensive regulatory intelligence and automated compliance monitoring",
        features: ["Regulatory Updates", "Impact Analysis", "Automated Reporting", "Risk Assessment"],
        metrics: { compliance: "99.8%", time: "70% reduction", accuracy: "96%" },
        icon: FileCheck,
      },
      {
        title: "Real-time AML Transaction Monitoring",
        description: "Advanced anti-money laundering detection using graph analytics and AI",
        features: ["Graph Analytics", "Pattern Recognition", "Suspicious Activity Detection", "Case Management"],
        metrics: { detection: "94% accuracy", alerts: "80% reduction", investigation: "60% faster" },
        icon: Lock,
      },
    ],
  },
}

export function BFSIUseCases() {
  const [activeSegment, setActiveSegment] = useState("banking")

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-4 px-4 py-2">
          <Brain className="w-4 h-4 mr-2" />
          Segmented AI Use Cases
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-Powered Solutions Across BFSI Segments
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover how our AI solutions transform specific functions across banking, insurance, wealth management, and
          more
        </p>
      </motion.div>

      <Tabs value={activeSegment} onValueChange={setActiveSegment} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
          {Object.entries(useCasesBySegment).map(([key, segment]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              <segment.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{segment.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(useCasesBySegment).map(([key, segment]) => (
          <TabsContent key={key} value={key}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {segment.cases.map((useCase, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-${segment.color}-100 dark:bg-${segment.color}-900/30`}>
                        <useCase.icon className={`w-5 h-5 text-${segment.color}-600`} />
                      </div>
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Performance Metrics</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {Object.entries(useCase.metrics).map(([metric, value]) => (
                          <div key={metric} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                            <div className="font-bold text-blue-600">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{metric.replace("_", " ")}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Brain className="w-5 h-5 mr-2" />
          Request Custom Use Case Demo
        </Button>
      </motion.div>
    </section>
  )
}
