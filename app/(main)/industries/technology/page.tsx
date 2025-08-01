import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { industryData } from "@/data/industry-data"
import IndustryPage from "@/components/industries/industry-page"

export async function generateMetadata(): Promise<Metadata> {
  const industry = industryData.find((i) => i.slug === "technology")

  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry page could not be found.",
    }
  }

  return {
    title: `${industry.name} Solutions | ESG Inc`,
    description: industry.metaDescription || `AI-powered solutions for the ${industry.name} industry.`,
    keywords: industry.keywords?.join(", ") || `${industry.name.toLowerCase()}, AI solutions, digital transformation`,
  }
}

export default function Page() {
  const industry = industryData.find((i) => i.slug === "technology")

  if (!industry) {
    notFound()
  }

  return <IndustryPage industry={industry} />
}
