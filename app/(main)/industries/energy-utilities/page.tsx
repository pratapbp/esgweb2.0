import type { Metadata } from "next"
import EnergyUtilitiesPage from "./energy-utilities-page"

export const metadata: Metadata = {
  title: "Energy & Utilities Solutions | ESGit - Smart Grid, AI, SAP IS-U",
  description:
    "Transform energy operations with ESGit's AI-powered solutions. Smart grid management, outage prediction, carbon tracking, and regulatory compliance using SAP IS-U, GenAI, and blockchain.",
  keywords:
    "energy utilities, smart grid, SAP IS-U, AI outage prediction, carbon tracking, renewable energy, ESG compliance",
}

export default function EnergyUtilities() {
  return <EnergyUtilitiesPage />
}
