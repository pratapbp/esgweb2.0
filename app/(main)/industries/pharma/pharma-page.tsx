"use client"

import { motion } from "framer-motion"
import PharmaHero from "@/components/industries/pharma/pharma-hero"
import ChallengesSolutions from "@/components/industries/pharma/challenges-solutions"
import UseCases from "@/components/industries/pharma/use-cases"
import PharmaCopilot from "@/components/industries/pharma/pharma-copilot"
import SmartPipeline from "@/components/industries/pharma/smart-pipeline"
import SuccessStories from "@/components/industries/pharma/success-stories"
import BlueprintGenerator from "@/components/industries/pharma/blueprint-generator"

export default function PharmaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <PharmaHero />

      {/* Main Content */}
      <div className="relative">
        {/* Challenges & Solutions */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <ChallengesSolutions />
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-gradient-to-r from-blue-50 to-purple-50"
        >
          <UseCases />
        </motion.section>

        {/* Pharma Copilot */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <PharmaCopilot />
        </motion.section>

        {/* Smart Pipeline */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-gradient-to-r from-purple-50 to-blue-50"
        >
          <SmartPipeline />
        </motion.section>

        {/* Success Stories */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <SuccessStories />
        </motion.section>

        {/* Blueprint Generator */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-gradient-to-r from-blue-50 to-purple-50"
        >
          <BlueprintGenerator />
        </motion.section>
      </div>
    </div>
  )
}
