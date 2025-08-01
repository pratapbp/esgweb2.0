"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function About() {
  const features = [
    "Industry-leading SAP expertise",
    "Advanced AI and machine learning capabilities",
    "Secure blockchain implementation",
    "Intelligent automation solutions",
    "Comprehensive digital transformation",
    "Dedicated customer support",
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Who <span className="gradient-text">We Are</span>
            </h2>

            <p className="text-lg text-gray-300 mb-6">
              ESG Inc is a leading provider of innovative enterprise solutions, combining cutting-edge technologies with
              deep industry expertise to deliver transformative results for businesses worldwide.
            </p>

            <p className="text-lg text-gray-300 mb-6">
              Our team of experts combines deep SAP knowledge with expertise in AI, blockchain, and automation
              technologies to help organizations navigate their digital transformation journey and achieve sustainable
              growth.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Learn More About Us
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
              <Image src="/blue-tech-workspace.png" alt="ESG Inc Team" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 p-6 bg-blue-900/20 backdrop-blur-md rounded-xl border border-blue-900/50 max-w-xs">
              <h3 className="text-xl font-bold mb-2">Innovation-Driven</h3>
              <p className="text-gray-300">
                We continuously explore emerging technologies to deliver cutting-edge solutions that drive business
                value.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
