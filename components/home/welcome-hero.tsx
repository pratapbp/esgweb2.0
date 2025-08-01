"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomeHero() {
  // Default fallback images
  const heroBackgroundImage = "/blue-tech-workspace.png"
  const sapSolutionsImage = "/abstract-ai-network.png"
  const fallbackImage = "/abstract-digital-background.png"

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            heroBackgroundImage && heroBackgroundImage.trim() !== "" ? heroBackgroundImage : "/blue-tech-workspace.png"
          }
          alt="Digital workspace background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Enterprise Solutions Powered by{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                  SAP Excellence
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Transforming businesses through innovative SAP solutions, expert implementation, and strategic
                consulting services.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
                  Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
          >
            <Image
              src={
                sapSolutionsImage && sapSolutionsImage.trim() !== "" ? sapSolutionsImage : "/abstract-ai-network.png"
              }
              alt="SAP Enterprise Solutions"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h3 className="text-xl font-bold mb-2">SAP S/4HANA Transformation</h3>
                <p className="text-gray-300 mb-4">
                  Accelerate your digital transformation with our comprehensive SAP S/4HANA implementation services.
                </p>
                <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-950/50">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-blue-500"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.3 + Math.random() * 0.7,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: [0.3, 0.7, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </section>
  )
}
