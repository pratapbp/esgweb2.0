"use client"

import { PublicSectorHero } from "@/components/industries/public-sector/public-sector-hero"
import { ChallengesSolutions } from "@/components/industries/public-sector/challenges-solutions"
import { GovernanceUseCases } from "@/components/industries/public-sector/governance-use-cases"
import { PublicSectorCopilot } from "@/components/industries/public-sector/public-sector-copilot"
import { DigitalBlueprint } from "@/components/industries/public-sector/digital-blueprint"
import { SuccessStories } from "@/components/industries/public-sector/success-stories"
import { SmartServicesForm } from "@/components/industries/public-sector/smart-services-form"

const PublicSectorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <PublicSectorHero />
      <ChallengesSolutions />
      <GovernanceUseCases />
      <PublicSectorCopilot />
      <DigitalBlueprint />
      <SuccessStories />
      <SmartServicesForm />
    </div>
  )
}

export default PublicSectorPage
export { PublicSectorPage }
