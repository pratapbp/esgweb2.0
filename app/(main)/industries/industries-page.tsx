"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import IndustriesHero from "@/components/industries/industries-hero"
import IndustriesGrid from "@/components/industries/industries-grid"
import IndustryCopilot from "@/components/industries/industry-copilot"
import SuccessBenchmarks from "@/components/industries/success-benchmarks"
import CaseStudyExplorer from "@/components/industries/case-study-explorer"
import IndustryWorkshopForm from "@/components/industries/industry-workshop-form"
import AICopilot from "@/components/ai/ai-copilot"

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-blue via-gray-900 to-black">
      {/* Hero Section */}
      <IndustriesHero />

      {/* AI-Interactive Industry Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-electric-cyan via-neural-violet to-blue-400 bg-clip-text text-transparent">
                Industry Intelligence
              </span>
              <br />
              <span className="text-white">Powered by GenAI</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your enterprise with AI-native, SAP-optimized digital solutions across 20+ industries
            </p>
          </motion.div>

          <IndustriesGrid onIndustrySelect={setSelectedIndustry} />
        </div>
      </section>

      {/* Success Benchmarks */}
      <SuccessBenchmarks />

      {/* AI-Powered Case Study Explorer */}
      <CaseStudyExplorer />

      {/* Industry Workshop Form */}
      <IndustryWorkshopForm />

      {/* Industry Copilot - Sticky */}
      <IndustryCopilot selectedIndustry={selectedIndustry} />

      {/* Global AI Copilot */}
      <AICopilot />
    </div>
  )
}
