"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Brain, Cloud, Database, Layers, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SapExcellence() {
  const expertiseAreas = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "SAP S/4HANA",
      description: "Complete digital core transformation with intelligent ERP solutions",
      features: ["Real-time analytics", "Simplified data model", "Enhanced user experience"],
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI & Machine Learning",
      description: "Intelligent automation and predictive analytics for business optimization",
      features: ["Predictive maintenance", "Demand forecasting", "Process automation"],
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Integration",
      description: "Seamless cloud migration and hybrid infrastructure management",
      features: ["Multi-cloud strategy", "Data integration", "Scalable architecture"],
      color: "from-green-500 to-teal-400",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security with comprehensive compliance frameworks",
      features: ["Data encryption", "Access controls", "Audit trails"],
      color: "from-orange-500 to-red-400",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "System Integration",
      description: "Unified ecosystem connecting all your business applications",
      features: ["API management", "Data synchronization", "Workflow automation"],
      color: "from-indigo-500 to-purple-400",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Maximum efficiency through intelligent system tuning and monitoring",
      features: ["Performance monitoring", "Resource optimization", "Proactive maintenance"],
      color: "from-yellow-500 to-orange-400",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/team-collaboration.jpg"
          alt="Team collaboration and expertise"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 mb-6">
            <Zap className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-blue-300 text-sm font-medium">Technical Excellence</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              SAP Expertise
            </span>{" "}
            Areas
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive SAP solutions backed by deep technical expertise and proven methodologies. We deliver
            excellence across every aspect of your digital transformation journey.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full group">
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-r ${area.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{area.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-white">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{area.description}</p>
                  <ul className="space-y-2">
                    {area.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss how our SAP expertise can drive your digital transformation forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 bg-transparent"
                >
                  View Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
