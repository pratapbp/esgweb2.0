"use client"

import { LogisticsHero } from "@/components/industries/logistics/logistics-hero"
import { ChallengesSolutions } from "@/components/industries/logistics/challenges-solutions"
import { UseCases } from "@/components/industries/logistics/use-cases"
import { LogisticsCopilot } from "@/components/industries/logistics/logistics-copilot"
import { IntelligentArchitecture } from "@/components/industries/logistics/intelligent-architecture"
import { SuccessStories } from "@/components/industries/logistics/success-stories"
import { SmartPlannerForm } from "@/components/industries/logistics/smart-planner-form"

const LogisticsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <LogisticsHero />
      <ChallengesSolutions />
      <UseCases />
      <IntelligentArchitecture />
      <SuccessStories />
      <LogisticsCopilot />
      <SmartPlannerForm />
    </div>
  )
}

export default LogisticsPage
