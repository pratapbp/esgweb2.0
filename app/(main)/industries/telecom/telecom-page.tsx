"use client"

import TelecomHero from "@/components/industries/telecom/telecom-hero"
import ChallengesSolutions from "@/components/industries/telecom/challenges-solutions"
import TelecomUseCases from "@/components/industries/telecom/use-cases"
import TelecomCopilot from "@/components/industries/telecom/telecom-copilot"
import NetworkArchitecture from "@/components/industries/telecom/network-architecture"
import SuccessStories from "@/components/industries/telecom/success-stories"
import TelecomBlueprintForm from "@/components/industries/telecom/telecom-blueprint-form"

export default function TelecomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <TelecomHero />
      <ChallengesSolutions />
      <TelecomUseCases />
      <TelecomCopilot />
      <NetworkArchitecture />
      <SuccessStories />
      <TelecomBlueprintForm />
    </div>
  )
}
