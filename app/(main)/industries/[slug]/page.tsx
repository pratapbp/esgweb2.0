import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { industryData } from "@/data/industry-data"
import IndustryPage from "@/components/industries/industry-page"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = industryData.find((i) => i.slug === params.slug)

  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry page could not be found.",
    }
  }

  return {
    title: `${industry.name} Industry Solutions | ESG Inc`,
    description: industry.metaDescription || `AI-powered SAP solutions for the ${industry.name} industry.`,
    keywords: industry.keywords?.join(", ") || `${industry.name.toLowerCase()}, SAP solutions, AI solutions`,
  }
}

export async function generateStaticParams() {
  return industryData.map((industry) => ({
    slug: industry.slug,
  }))
}

export default function Page({ params }: Props) {
  const industry = industryData.find((i) => i.slug === params.slug)

  if (!industry) {
    notFound()
  }

  return <IndustryPage industry={industry} />
}
