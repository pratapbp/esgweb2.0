"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Building2, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

type Industry = {
  id: string
  name: string
  image: string
  description: string
}

export default function IndustriesPanel() {
  const [activeIndustry, setActiveIndustry] = useState<string>("manufacturing")

  // Default fallback image
  const fallbackImage = "/diverse-manufacturing-floor.png"

  const industries: Industry[] = [
    {
      id: "manufacturing",
      name: "Manufacturing",
      image: "/images/industries/manufacturing.jpg",
      description: "Optimize production processes and supply chains with AI-enhanced SAP solutions.",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      image: "/images/industries/healthcare.jpg",
      description: "Transform patient care and operational efficiency with intelligent healthcare solutions.",
    },
    {
      id: "retail",
      name: "Retail",
      image: "/images/industries/retail.jpg",
      description: "Deliver personalized customer experiences and optimize inventory management.",
    },
    {
      id: "energy",
      name: "Energy & Utilities",
      image: "/images/industries/energy.jpg",
      description: "Enhance grid management and customer service with AI-powered solutions.",
    },
    {
      id: "telecom",
      name: "Telecommunications",
      image: "/images/industries/telecom.jpg",
      description: "Improve network operations and customer engagement with intelligent systems.",
    },
  ]

  const currentIndustry = industries.find((ind) => ind.id === activeIndustry) || industries[0]

  // Determine the image source, ensuring we never pass an empty string
  const imageSource =
    currentIndustry.image && currentIndustry.image.trim() !== "" ? currentIndustry.image : fallbackImage

  return (
    <section className="py-16 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industry <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tailored SAP and AI solutions designed for the unique challenges of your industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Industry Selection */}
          <div className="lg:col-span-4">
            <div className="space-y-3">
              {industries.map((industry) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                    activeIndustry === industry.id
                      ? "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-900/10"
                      : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
                  }`}
                  onClick={() => setActiveIndustry(industry.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        activeIndustry === industry.id ? "bg-blue-600" : "bg-gray-800"
                      }`}
                    >
                      <Building2 className="h-5 w-5" />
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
              <Image
                src={
                  imageSource && imageSource.trim() !== ""
                    ? imageSource
                    : "/placeholder.svg?height=400&width=600&query=industry background"
                }
                alt={currentIndustry.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentIndustry.name}</h3>
                <p className="text-gray-300">{currentIndustry.description}</p>
              </div>
            </div>

            <div className="p-6 bg-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  "AI-Enhanced Analytics",
                  "Process Automation",
                  "Predictive Maintenance",
                  "Supply Chain Optimization",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="p-1 rounded-full bg-blue-600 mr-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-blue-300 text-sm">12+ Case Studies</span>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
