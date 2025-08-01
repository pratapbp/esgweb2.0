"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"

// Services data
const sapServices = [
  {
    id: "s4hana",
    title: "SAP S/4HANA Transformation",
    description:
      "Modernize your SAP landscape with our S/4HANA implementation services enhanced by AI-driven migration tools and automated testing.",
    features: [
      "AI-powered data migration and cleansing",
      "Automated code remediation and adaptation",
      "Intelligent business process redesign",
      "Predictive testing and validation",
      "Seamless integration with cloud services",
    ],
    image: "/images/sap-integration-diagram.jpg",
  },
  {
    id: "analytics",
    title: "SAP Data & Analytics",
    description:
      "Transform your data into actionable insights with our AI-enhanced SAP analytics solutions that predict trends and automate reporting.",
    features: [
      "Predictive analytics and forecasting",
      "Automated data harmonization",
      "Real-time business dashboards",
      "AI-driven anomaly detection",
      "Natural language query processing",
    ],
    image: "/images/ai-predictive-scoring.jpg",
  },
  {
    id: "integration",
    title: "SAP Integration & Extensions",
    description:
      "Seamlessly connect SAP with your enterprise ecosystem using our AI-powered integration platform and custom extensions.",
    features: [
      "Intelligent API management",
      "Pre-built AI connectors",
      "Automated workflow orchestration",
      "Smart data synchronization",
      "Low-code extension development",
    ],
    image: "/images/data-integration.jpg",
  },
  {
    id: "cloud",
    title: "SAP Cloud Migration",
    description:
      "Accelerate your journey to the cloud with our AI-optimized SAP migration methodology and automated deployment tools.",
    features: [
      "AI-driven cloud readiness assessment",
      "Automated cloud infrastructure setup",
      "Intelligent workload optimization",
      "Predictive performance monitoring",
      "Self-healing systems with AI",
    ],
    image: "/images/advanced-analytics.jpg",
  },
]

export default function ServiceShowcase() {
  const [selectedTab, setSelectedTab] = useState("s4hana")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const selectedService = sapServices.find((service) => service.id === selectedTab)

  return (
    <section className="py-24 bg-gradient-to-b from-black to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SAP Services
            </span>{" "}
            Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Our comprehensive suite of SAP services is enhanced with Gen AI to deliver unparalleled value, efficiency,
            and innovation.
          </motion.p>
        </div>

        <Tabs
          defaultValue="s4hana"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full max-w-6xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-slate-800/50 p-1 mb-12">
            {sapServices.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 text-white"
              >
                {service.title.split(" ")[1] || service.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {sapServices.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <ChevronRight className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                    Learn More
                  </Button>
                </div>
                <div className="order-1 lg:order-2 relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
