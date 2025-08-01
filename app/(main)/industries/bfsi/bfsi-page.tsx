"use client"

import { BFSIHero } from "@/components/industries/bfsi/bfsi-hero"
import { ChallengesSolutions } from "@/components/industries/bfsi/challenges-solutions"
import { BFSIUseCases } from "@/components/industries/bfsi/use-cases"
import { BFSICopilot } from "@/components/industries/bfsi/bfsi-copilot"
import { FraudShieldArchitecture } from "@/components/industries/bfsi/fraud-shield-architecture"
import { BFSISuccessStories } from "@/components/industries/bfsi/success-stories"
import { FinanceAcceleratorForm } from "@/components/industries/bfsi/finance-accelerator-form"

const BFSIPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <BFSIHero />
      <ChallengesSolutions />
      <BFSIUseCases />
      <BFSICopilot />
      <FraudShieldArchitecture />
      <BFSISuccessStories />
      <FinanceAcceleratorForm />
    </div>
  )
}

export default BFSIPage
export { BFSIPage }
