"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Database, Cloud, Shield, Zap, Users, BarChart3, Settings, ArrowRight, CheckCircle } from "lucide-react"

const modules = [
  {
    id: "ai-core",
    title: "AI Core Engine",
    description: "Advanced machine learning and neural network processing",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    features: ["Deep Learning", "NLP Processing", "Computer Vision", "Predictive Analytics"],
    status: "Active",
  },
  {
    id: "data-fabric",
    title: "Data Fabric",
    description: "Unified data management and integration platform",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    features: ["Real-time Sync", "Data Quality", "Master Data", "Data Governance"],
    status: "Active",
  },
  {
    id: "cloud-native",
    title: "Cloud Native",
    description: "Scalable cloud infrastructure and microservices",
    icon: Cloud,
    color: "from-green-500 to-emerald-500",
    features: ["Auto-scaling", "Load Balancing", "Container Orchestration", "DevOps"],
    status: "Active",
  },
  {
    id: "security-shield",
    title: "Security Shield",
    description: "Enterprise-grade security and compliance framework",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    features: ["Zero Trust", "Encryption", "Audit Trails", "Compliance"],
    status: "Active",
  },
  {
    id: "automation",
    title: "Automation Hub",
    description: "Intelligent process automation and workflow management",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    features: ["RPA", "Workflow Engine", "Decision Trees", "Smart Routing"],
    status: "Active",
  },
  {
    id: "collaboration",
    title: "Collaboration Suite",
    description: "Team collaboration and communication platform",
    icon: Users,
    color: "from-indigo-500 to-purple-500",
    features: ["Team Spaces", "Real-time Chat", "Video Conferencing", "Document Sharing"],
    status: "Beta",
  },
]

export function ESGOSModules() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/30 to-gray-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-neural-violet/20 text-neural-violet border-neural-violet/30">
            <Settings className="w-4 h-4 mr-2" />
            ESG Operating System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">Modular AI Architecture</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive operating system built with interconnected AI modules that work seamlessly together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant={module.status === "Active" ? "default" : "secondary"}
                      className={
                        module.status === "Active"
                          ? "bg-success-green/20 text-success-green border-success-green/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {module.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-luminous-white group-hover:text-electric-cyan transition-colors">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">{module.description}</p>

                  <div className="space-y-2 mb-6">
                    {module.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-success-green mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 group-hover:border-electric-cyan/70 bg-transparent"
                  >
                    Explore Module
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue px-8 py-4 text-lg hover:scale-105 transition-transform"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            View Full Architecture
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
