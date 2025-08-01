"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Database, Cloud, Shield, LineChart, Cpu, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"

type ServiceTile = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image: string | null
  color: string
}

export default function DynamicServiceTiles() {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null)

  // Default fallback image
  const fallbackImage = "/interconnected-tech-network.png"

  const serviceTiles: ServiceTile[] = [
    {
      id: "enterprise",
      title: "SAP Enterprise Solutions",
      description: "End-to-end implementation and optimization of SAP S/4HANA and other core SAP products.",
      icon: <Database className="h-6 w-6" />,
      image: "/images/services/enterprise.jpg",
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "data-ai",
      title: "Data & AI Analytics",
      description: "Transform your data into actionable insights with our AI-enhanced analytics solutions.",
      icon: <LineChart className="h-6 w-6" />,
      image: "/images/services/data-ai.jpg",
      color: "from-violet-600 to-violet-400",
    },
    {
      id: "cloud",
      title: "Cloud Transformation",
      description: "Seamlessly migrate and optimize your SAP workloads in the cloud for maximum efficiency.",
      icon: <Cloud className="h-6 w-6" />,
      image: "/images/services/cloud.jpg",
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "digital-ai",
      title: "Digital AI Innovation",
      description: "Leverage cutting-edge AI technologies to drive digital transformation across your enterprise.",
      icon: <Cpu className="h-6 w-6" />,
      image: "/images/services/digital-ai.jpg",
      color: "from-emerald-600 to-emerald-400",
    },
    {
      id: "supply-chain",
      title: "Supply Chain Excellence",
      description: "Optimize your supply chain with intelligent planning, execution, and analytics solutions.",
      icon: <Workflow className="h-6 w-6" />,
      image: "/images/services/supply-chain.jpg",
      color: "from-amber-600 to-amber-400",
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      description: "Protect your SAP environment with our comprehensive security and compliance solutions.",
      icon: <Shield className="h-6 w-6" />,
      image: "/images/services/cybersecurity.jpg",
      color: "from-red-600 to-red-400",
    },
  ]

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
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive SAP and AI solutions designed to transform your business and drive innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceTiles.map((tile, index) => {
            // Determine the image source for each tile, ensuring we never pass an empty string
            const tileImageSource = tile.image && tile.image.trim() !== "" ? tile.image : fallbackImage

            return (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-gray-700 h-[280px] cursor-pointer"
                onMouseEnter={() => setHoveredTile(tile.id)}
                onMouseLeave={() => setHoveredTile(null)}
              >
                {/* Background Image */}
                <Image
                  src={
                    tileImageSource && tileImageSource.trim() !== ""
                      ? tileImageSource
                      : "/placeholder.svg?height=400&width=600&query=technology service"
                  }
                  alt={tile.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredTile === tile.id ? "scale-110" : "scale-100"
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tile.color} w-fit mb-3`}>{tile.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tile.title}</h3>
                  <p
                    className={`text-sm text-gray-300 mb-4 transition-all duration-300 ${
                      hoveredTile === tile.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {tile.description}
                  </p>
                  <Button
                    className={`w-fit transition-all duration-300 ${
                      hoveredTile === tile.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    variant="outline"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
