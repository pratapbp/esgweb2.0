"use client"

import ManufacturingHero from "@/components/industries/manufacturing/hero"
import SmartManufacturingSection from "@/components/industries/manufacturing/smart-manufacturing"
import IndustrialAutomationSection from "@/components/industries/manufacturing/industrial-automation"
import PredictiveMaintenanceSection from "@/components/industries/manufacturing/predictive-maintenance"
import SupplyChainOptimization from "@/components/industries/manufacturing/supply-chain-optimization"
import IoTManufacturingSection from "@/components/industries/manufacturing/iot-manufacturing"
import CaseStudiesSection from "@/components/industries/manufacturing/case-studies"
import TechnologyBenefitsSection from "@/components/industries/manufacturing/technology-benefits"
import IndustryInsightsSection from "@/components/industries/manufacturing/industry-insights"
import ManufacturingCTA from "@/components/industries/manufacturing/manufacturing-cta"

export default function ManufacturingPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <ManufacturingHero />
      <SmartManufacturingSection />
      <IndustrialAutomationSection />
      <PredictiveMaintenanceSection />
      <SupplyChainOptimization />
      <IoTManufacturingSection />
      <TechnologyBenefitsSection />
      <CaseStudiesSection />
      <IndustryInsightsSection />
      <ManufacturingCTA />
    </main>
  )
}
