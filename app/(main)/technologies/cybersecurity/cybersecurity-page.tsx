"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CybersecurityHero from "@/components/technologies/cybersecurity/cybersecurity-hero"
import CyberThreatsLandscape from "@/components/technologies/cybersecurity/cyber-threats-landscape"
import ThreatDetectionSection from "@/components/technologies/cybersecurity/threat-detection-section"
import IncidentResponseSection from "@/components/technologies/cybersecurity/incident-response-section"
import DataLossPreventionSection from "@/components/technologies/cybersecurity/data-loss-prevention-section"
import SiemSection from "@/components/technologies/cybersecurity/siem-section"
import SecurityFrameworkSection from "@/components/technologies/cybersecurity/security-framework-section"
import SecurityBestPractices from "@/components/technologies/cybersecurity/security-best-practices"
import CybersecurityCta from "@/components/technologies/cybersecurity/cybersecurity-cta"

export default function CybersecurityPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <CybersecurityHero />
        <CyberThreatsLandscape />
        <ThreatDetectionSection />
        <IncidentResponseSection />
        <DataLossPreventionSection />
        <SiemSection />
        <SecurityFrameworkSection />
        <SecurityBestPractices />
        <CybersecurityCta />
      </motion.div>
    </div>
  )
}
