import type { Metadata } from "next"
import { Suspense } from "react"
import WhoWeAreClient from "./WhoWeAreClient"

export const metadata: Metadata = {
  title: "Who We Are - ESGit | Leading SAP & AI Solutions Provider",
  description:
    "Discover ESGit's journey as a premier provider of SAP solutions and AI-powered enterprise services. Learn about our mission, values, and commitment to digital transformation.",
  keywords: [
    "ESGit team",
    "SAP consultants",
    "AI experts",
    "enterprise solutions",
    "digital transformation",
    "company culture",
    "SAP partners",
  ],
  openGraph: {
    title: "Who We Are - ESGit | Leading SAP & AI Solutions Provider",
    description: "Meet the team behind ESGit's innovative SAP and AI solutions",
    images: ["/images/team-collaboration.jpg"],
  },
}

export default function WhoWeAre() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WhoWeAreClient />
    </Suspense>
  )
}
