import type { Metadata } from "next"
import PharmaPage from "./pharma-page"

export const metadata: Metadata = {
  title: "Pharma & Life Sciences Solutions | ESG Inc",
  description:
    "Accelerate drug discovery, streamline clinical trials, and ensure compliance with ESG's intelligent pharma ecosystem powered by SAP, GenAI, and RPA.",
  keywords: [
    "pharmaceutical solutions",
    "life sciences",
    "drug discovery",
    "clinical trials",
    "SAP pharma",
    "GenAI healthcare",
    "regulatory compliance",
    "cold chain monitoring",
    "pharmaceutical manufacturing",
    "biotech solutions",
  ],
}

export default function Page() {
  return <PharmaPage />
}
