"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileCheck,
  Heart,
  Building,
  Shield,
  GraduationCap,
  MessageSquare,
  Workflow,
  Brain,
  Search,
  Camera,
} from "lucide-react"

const useCases = {
  welfare: [
    {
      function: "e-Governance Portal",
      useCase: "Chat Copilot + multilingual NLP + citizen feedback analyzer",
      icon: MessageSquare,
      features: ["24/7 AI assistance", "50+ language support", "Sentiment analysis"],
      metrics: "95% query resolution rate",
    },
    {
      function: "Public Benefits",
      useCase: "Smart eligibility scoring + fraud detection",
      icon: Heart,
      features: ["AI eligibility assessment", "Real-time fraud alerts", "Automated disbursement"],
      metrics: "80% faster benefit delivery",
    },
  ],
  health: [
    {
      function: "Healthcare Services",
      useCase: "AI-powered patient triage + resource optimization",
      icon: Heart,
      features: ["Symptom analysis", "Appointment scheduling", "Resource allocation"],
      metrics: "60% reduction in wait times",
    },
    {
      function: "Public Health Monitoring",
      useCase: "Epidemic prediction + contact tracing automation",
      icon: Search,
      features: ["Disease pattern analysis", "Automated contact tracing", "Risk assessment"],
      metrics: "Early detection in 72% cases",
    },
  ],
  municipal: [
    {
      function: "Licensing & Permits",
      useCase: "AI workflow builder + status Copilot",
      icon: FileCheck,
      features: ["Automated document verification", "Real-time status updates", "Digital approvals"],
      metrics: "From 30 days to 4 hours",
    },
    {
      function: "Smart City Operations",
      useCase: "IoT integration + predictive maintenance",
      icon: Building,
      features: ["Traffic optimization", "Utility management", "Waste collection routing"],
      metrics: "35% operational efficiency gain",
    },
  ],
  defense: [
    {
      function: "Law Enforcement",
      useCase: "Facial recognition + GenAI-generated evidence summaries",
      icon: Camera,
      features: ["Real-time identification", "Evidence analysis", "Case summarization"],
      metrics: "90% accuracy in identification",
    },
    {
      function: "Security Intelligence",
      useCase: "Threat pattern analysis + predictive security",
      icon: Shield,
      features: ["Threat detection", "Risk assessment", "Automated alerts"],
      metrics: "85% threat prevention rate",
    },
  ],
  education: [
    {
      function: "Student Services",
      useCase: "AI-powered scholarship matching + academic support",
      icon: GraduationCap,
      features: ["Eligibility matching", "Performance tracking", "Personalized guidance"],
      metrics: "40% increase in scholarship uptake",
    },
    {
      function: "Educational Planning",
      useCase: "Resource allocation + curriculum optimization",
      icon: Brain,
      features: ["Demand forecasting", "Teacher allocation", "Infrastructure planning"],
      metrics: "25% better resource utilization",
    },
  ],
}

const tabConfig = [
  { id: "welfare", label: "Welfare", icon: Heart, color: "blue" },
  { id: "health", label: "Health", icon: Heart, color: "green" },
  { id: "municipal", label: "Municipal", icon: Building, color: "purple" },
  { id: "defense", label: "Defense", icon: Shield, color: "red" },
  { id: "education", label: "Education", icon: GraduationCap, color: "orange" },
]

export function GovernanceUseCases() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            <Workflow className="w-4 h-4 mr-2" />
            Smart Governance Use Cases
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI-Powered Public Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how AI transforms every aspect of government operations across different sectors.
          </p>
        </motion.div>

        <Tabs defaultValue="welfare" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {tabConfig.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(useCases).map(([category, cases]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 gap-6">
                {cases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-400">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <useCase.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-gray-800">{useCase.function}</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">{useCase.useCase}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {useCase.features.map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-800">Impact:</span>
                              <span className="text-sm font-bold text-green-900">{useCase.metrics}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
