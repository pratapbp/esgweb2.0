"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Briefcase, Cpu, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"

type Industry = {
  id: string
  name: string
  image: string
  description: string
  roi: string
  aiUseCase: string
}

export default function IndustryImpact() {
  const [activeIndustry, setActiveIndustry] = useState<string>("manufacturing")

  const industries: Industry[] = [
    {
      id: "manufacturing",
      name: "Manufacturing",
      image: "/images/industries/manufacturing.jpg",
      description:
        "Revolutionize production with AI-enhanced SAP solutions that optimize supply chains and predict maintenance needs.",
      roi: "32% reduction in downtime and 28% improvement in production efficiency",
      aiUseCase:
        "Predictive maintenance algorithms that analyze IoT sensor data to prevent equipment failures before they occur",
    },
    {
      id: "retail",
      name: "Retail & Consumer Goods",
      image: "/images/industries/retail.jpg",
      description: "Transform customer experiences and optimize inventory with intelligent SAP retail solutions.",
      roi: "41% improved inventory turnover and 35% reduction in stockouts",
      aiUseCase: "AI-powered demand forecasting that accounts for seasonal trends, promotions, and external factors",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      image: "/images/industries/healthcare.jpg",
      description: "Enhance patient care and streamline operations with SAP healthcare solutions powered by AI.",
      roi: "27% reduction in administrative costs and 18% improved resource utilization",
      aiUseCase:
        "Pattern recognition in patient data to identify high-risk individuals and recommend preventative actions",
    },
    {
      id: "finance",
      name: "Financial Services",
      image: "/images/industries/banking.jpg",
      description: "Secure and optimize financial operations with intelligent SAP solutions enhanced by AI.",
      roi: "43% faster fraud detection and 29% reduction in operational costs",
      aiUseCase: "Advanced anomaly detection that identifies suspicious transactions and adapts to new fraud patterns",
    },
  ]

  const currentIndustry = industries.find((ind) => ind.id === activeIndustry) || industries[0]

  // Default fallback image
  const fallbackImage = "/interconnected-industry.png"

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industry-Specific <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our AI-enhanced SAP solutions deliver measurable results across various industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Industry Selection */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {industries.map((industry) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 ${
                    activeIndustry === industry.id
                      ? "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-900/10"
                      : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
                  }`}
                  onClick={() => setActiveIndustry(industry.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-lg mr-4 ${
                        activeIndustry === industry.id ? "bg-blue-600" : "bg-gray-800"
                      }`}
                    >
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{industry.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Industry Details */}
          <motion.div
            key={activeIndustry}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 overflow-hidden rounded-2xl border border-gray-700"
          >
            <div className="relative h-[300px]">
              {currentIndustry.image && currentIndustry.image.trim() !== "" ? (
                <Image
                  src={currentIndustry.image || "/placeholder.svg"}
                  alt={currentIndustry.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <Image
                  src={fallbackImage || "/placeholder.svg"}
                  alt={currentIndustry.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentIndustry.name}</h3>
                <p className="text-gray-300">{currentIndustry.description}</p>
              </div>
            </div>

            <div className="p-6 bg-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-center mb-3">
                    <BarChart className="h-5 w-5 text-blue-400 mr-2" />
                    <h4 className="text-lg font-semibold">Measurable ROI</h4>
                  </div>
                  <p className="text-blue-300">{currentIndustry.roi}</p>
                </div>

                <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-center mb-3">
                    <Cpu className="h-5 w-5 text-blue-400 mr-2" />
                    <h4 className="text-lg font-semibold">AI Use Case</h4>
                  </div>
                  <p className="text-blue-300">{currentIndustry.aiUseCase}</p>
                </div>
              </div>

              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                Explore {currentIndustry.name} Solutions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
