"use client"

import { motion } from "framer-motion"
import EnergyUtilitiesHero from "@/components/industries/energy-utilities/energy-utilities-hero"
import ChallengesSolutions from "@/components/industries/energy-utilities/challenges-solutions"
import SmartUtilityUseCases from "@/components/industries/energy-utilities/smart-utility-use-cases"
import UtilityCopilot from "@/components/industries/energy-utilities/utility-copilot"
import DigitalGridFramework from "@/components/industries/energy-utilities/digital-grid-framework"
import SuccessStories from "@/components/industries/energy-utilities/success-stories"
import ESGBlueprintForm from "@/components/industries/energy-utilities/esg-blueprint-form"

export default function EnergyUtilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
        {/* Hero Section */}
        <EnergyUtilitiesHero />

        {/* Challenges & Solutions */}
        <ChallengesSolutions />

        {/* Smart Utility Use Cases */}
        <SmartUtilityUseCases />

        {/* Utility Copilot Engine */}
        <UtilityCopilot />

        {/* Digital Grid Framework */}
        <DigitalGridFramework />

        {/* Success Stories */}
        <SuccessStories />

        {/* ESG Blueprint Form */}
        <ESGBlueprintForm />
      </motion.div>
    </div>
  )
}
