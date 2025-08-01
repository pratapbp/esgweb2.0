"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Factory, Briefcase, Cpu } from "lucide-react"

export default function IndustryComparison() {
  const [activeTab, setActiveTab] = useState("services")

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive <span className="gradient-text">Manufacturing Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compare our services, industry expertise, and technology stack to see how we deliver value across the
            manufacturing ecosystem.
          </p>
        </div>

        <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="services" className="flex items-center gap-2 py-3">
                <Briefcase className="h-5 w-5" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger value="industries" className="flex items-center gap-2 py-3">
                <Factory className="h-5 w-5" />
                <span className="hidden sm:inline">Industries</span>
              </TabsTrigger>
              <TabsTrigger value="technology" className="flex items-center gap-2 py-3">
                <Cpu className="h-5 w-5" />
                <span className="hidden sm:inline">Technology</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <TabsContent value="services" className="mt-0 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "SAP S/4HANA Implementation",
                        description:
                          "End-to-end implementation of SAP S/4HANA for manufacturing with industry-specific best practices.",
                        icon: "💼",
                        highlight: true,
                      },
                      {
                        title: "Predictive Maintenance",
                        description:
                          "AI-powered predictive maintenance solutions that reduce downtime and extend equipment life.",
                        icon: "🔧",
                        highlight: false,
                      },
                      {
                        title: "Supply Chain Optimization",
                        description:
                          "Intelligent supply chain solutions that improve visibility, reduce costs, and enhance resilience.",
                        icon: "🔄",
                        highlight: false,
                      },
                      {
                        title: "Quality Management",
                        description:
                          "Advanced quality control systems with real-time monitoring and AI-driven defect detection.",
                        icon: "✓",
                        highlight: false,
                      },
                      {
                        title: "Production Planning",
                        description:
                          "Optimize production schedules with AI algorithms that balance demand, capacity, and resources.",
                        icon: "📊",
                        highlight: false,
                      },
                      {
                        title: "Digital Twin Implementation",
                        description:
                          "Create virtual replicas of physical assets to simulate, analyze, and optimize performance.",
                        icon: "🔄",
                        highlight: true,
                      },
                    ].map((service, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl border ${
                          service.highlight ? "border-blue-500 bg-blue-900/20" : "border-gray-800 bg-gray-900/50"
                        } transition-all hover:transform hover:-translate-y-1 hover:shadow-lg`}
                      >
                        <div className="text-3xl mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-400">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="industries" className="mt-0 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Automotive Manufacturing",
                        description:
                          "Specialized solutions for automotive manufacturers focusing on quality, efficiency, and innovation.",
                        image: "/images/industries/automotive-manufacturing.jpg",
                      },
                      {
                        title: "Electronics Manufacturing",
                        description:
                          "Precision manufacturing solutions for electronics with focus on quality control and traceability.",
                        image: "/images/industries/electronics-manufacturing.jpg",
                      },
                      {
                        title: "Aerospace & Defense",
                        description:
                          "High-precision manufacturing solutions with stringent quality and compliance requirements.",
                        image: "/images/industries/aerospace-manufacturing.jpg",
                      },
                      {
                        title: "Industrial Equipment",
                        description:
                          "Solutions for industrial equipment manufacturers with focus on efficiency and customization.",
                        image: "/images/industries/industrial-equipment.jpg",
                      },
                      {
                        title: "Consumer Goods",
                        description:
                          "Fast-moving consumer goods manufacturing with focus on agility and market responsiveness.",
                        image: "/images/industries/consumer-goods.jpg",
                      },
                      {
                        title: "Pharmaceutical Manufacturing",
                        description:
                          "GMP-compliant manufacturing solutions with focus on quality, compliance, and traceability.",
                        image: "/images/industries/pharma-manufacturing.jpg",
                      },
                    ].map((industry, index) => (
                      <div
                        key={index}
                        className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="relative h-48">
                          <Image
                            src={industry.image || "/placeholder.svg?height=300&width=400&query=manufacturing"}
                            alt={industry.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
                          <p className="text-gray-400">{industry.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="technology" className="mt-0 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 md:col-span-3">
                      <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 mb-8">
                        <h3 className="text-2xl font-bold mb-4">Our Technology Stack</h3>
                        <p className="text-gray-300">
                          We leverage cutting-edge technologies to deliver intelligent manufacturing solutions that
                          drive efficiency, quality, and innovation across your operations.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-blue-400">SAP Technologies</h4>
                      <ul className="space-y-4">
                        {[
                          "SAP S/4HANA",
                          "SAP Manufacturing Execution",
                          "SAP Digital Manufacturing Cloud",
                          "SAP Integrated Business Planning",
                          "SAP Asset Intelligence Network",
                        ].map((tech, i) => (
                          <li key={i} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-3"></div>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-purple-400">AI & Analytics</h4>
                      <ul className="space-y-4">
                        {[
                          "Machine Learning",
                          "Predictive Analytics",
                          "Computer Vision",
                          "Natural Language Processing",
                          "Digital Twin Technology",
                        ].map((tech, i) => (
                          <li key={i} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-3"></div>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-green-400">IoT & Edge Computing</h4>
                      <ul className="space-y-4">
                        {[
                          "Industrial IoT Sensors",
                          "Edge Computing",
                          "RFID & Tracking",
                          "Real-time Monitoring",
                          "Automated Guided Vehicles",
                        ].map((tech, i) => (
                          <li key={i} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  )
}
