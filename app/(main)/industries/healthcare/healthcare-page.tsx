"use client"

import { HealthcareHero } from "@/components/industries/healthcare/healthcare-hero"
import { ChallengesSolutions } from "@/components/industries/healthcare/challenges-solutions"
import { HealthcareUseCases } from "@/components/industries/healthcare/use-cases"
import { HealthcareCopilot } from "@/components/industries/healthcare/healthcare-copilot"
import { BlockchainCompliance } from "@/components/industries/healthcare/blockchain-compliance"
import { HealthcareSuccessStories } from "@/components/industries/healthcare/success-stories"
import { HealthcareBlueprintForm } from "@/components/industries/healthcare/blueprint-form"

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <HealthcareHero />
      <ChallengesSolutions />
      <HealthcareUseCases />
      <HealthcareCopilot />
      <BlockchainCompliance />
      <HealthcareSuccessStories />
      <HealthcareBlueprintForm />
    </div>
  )
}
