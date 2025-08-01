import type { Metadata } from "next"
import SAPTechnologyInnovationClientPage from "./SAPTechnologyInnovationClientPage"

export const metadata: Metadata = {
  title: "SAP Technology & Innovation | ESGit - BTP, RISE, Fiori & AI Solutions",
  description:
    "Transform your enterprise with SAP BTP, RISE with SAP, Fiori modernization, and AI-powered automation. Accelerate innovation with ESGit's proven SAP technology expertise.",
  keywords: "SAP BTP, RISE with SAP, SAP Fiori, SAP Integration Suite, AI automation, RPA, digital transformation",
  openGraph: {
    title: "SAP Technology & Innovation | ESGit",
    description:
      "Unleash innovation with SAP BTP + GenAI. Build, integrate, and scale smarter with ESGit's AI accelerators.",
    images: ["/images/services/sap-technology-innovation.jpg"],
  },
}

export default function SAPTechnologyInnovationPage() {
  return <SAPTechnologyInnovationClientPage />
}
