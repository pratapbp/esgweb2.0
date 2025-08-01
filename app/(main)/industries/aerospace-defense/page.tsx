import type { Metadata } from "next"
import { industryData } from "@/data/industry-data"
import AerospaceDefensePage from "./aerospace-defense-page"

export async function generateMetadata(): Promise<Metadata> {
  const industry = industryData.find((i) => i.slug === "aerospace-defense")

  if (!industry) {
    return {
      title: "Aerospace & Defense Solutions | ESG Inc",
      description:
        "Comprehensive aerospace and defense industry solutions featuring advanced aviation, space systems, and defense technologies.",
      keywords:
        "aerospace, defense, aviation, space systems, military aircraft, satellites, missile defense, aircraft manufacturing",
    }
  }

  return {
    title: `${industry.name} Solutions | ESG Inc`,
    description:
      industry.metaDescription ||
      `AI-powered solutions for the ${industry.name} industry including advanced aviation systems, space exploration technologies, and defense capabilities.`,
    keywords:
      industry.keywords?.join(", ") ||
      `${industry.name.toLowerCase()}, aerospace technology, defense systems, aviation solutions, space exploration, military aircraft, satellite systems, missile defense, aircraft manufacturing, space technology`,
  }
}

export default function Page() {
  return <AerospaceDefensePage />
}
