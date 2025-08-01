import type { Metadata, Viewport } from "next"
import { MissionHero } from "@/components/mission/mission-hero"
import { CoreMission } from "@/components/mission/core-mission"
import { AiEnhancement } from "@/components/mission/ai-enhancement"
import { MissionStatement } from "@/components/mission/mission-statement"
import { CommitmentCards } from "@/components/mission/commitment-cards"
import { MeasurableImpact } from "@/components/mission/measurable-impact"
import { FutureFocus } from "@/components/mission/future-focus"

export const metadata: Metadata = {
  title: "Our Mission | ESG Inc",
  description: "Discover ESG Inc's mission to transform enterprises through intelligent SAP solutions enhanced by AI.",
  keywords: "ESG mission, SAP transformation, AI-enhanced enterprise, digital transformation mission",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function MissionPage() {
  return (
    <main className="overflow-hidden">
      <MissionHero />
      <CoreMission />
      <MissionStatement />
      <AiEnhancement />
      <CommitmentCards />
      <MeasurableImpact />
      <FutureFocus />
    </main>
  )
}
