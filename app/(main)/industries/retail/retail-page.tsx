"use client"

import RetailHero from "@/components/industries/retail/retail-hero"
import ChallengesSolutions from "@/components/industries/retail/challenges-solutions"
import UseCases from "@/components/industries/retail/use-cases"
import SmartStoreCopilot from "@/components/industries/retail/smart-store-copilot"
import CustomerAIJourneys from "@/components/industries/retail/customer-ai-journeys"
import SuccessSnapshots from "@/components/industries/retail/success-snapshots"
import SolutionForm from "@/components/industries/retail/solution-form"

export default function RetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <RetailHero />
      <ChallengesSolutions />
      <UseCases />
      <SmartStoreCopilot />
      <CustomerAIJourneys />
      <SuccessSnapshots />
      <SolutionForm />
    </div>
  )
}
