"use client"

import { useState, useEffect } from "react"
import AIEnhancedHero from "@/components/about-us/ai-enhanced-hero"
import CompanyOverview from "@/components/about-us/company-overview"
import CoreValuesSection from "@/components/about-us/core-values-section"
import MissionVisionSection from "@/components/about-us/mission-vision-section"
import AIMetricsSection from "@/components/about-us/ai-metrics-section"
import EnhancedContactCTA from "@/components/about-us/enhanced-contact-cta"
import AIParticlesBackground from "@/components/about-us/ai-particles-background"

export default function AboutUsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* AI Particles Background */}
      <AIParticlesBackground />

      {/* Hero Section */}
      <AIEnhancedHero />

      {/* Company Overview */}
      <CompanyOverview />

      {/* Mission & Vision */}
      <MissionVisionSection />

      {/* Core Values */}
      <CoreValuesSection />

      {/* AI Metrics */}
      <AIMetricsSection />

      {/* Contact CTA */}
      <EnhancedContactCTA />
    </div>
  )
}
