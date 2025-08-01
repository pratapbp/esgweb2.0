import type { Metadata } from "next"
import FinancialServicesPage from "./financial-services-page"

export const metadata: Metadata = {
  title: "Financial Services Solutions | AI-Powered Banking & Fintech | ESG Inc",
  description:
    "Transform financial services with AI-powered solutions for banking, insurance, investment management, and fintech. Enhance security, compliance, and customer experience.",
  keywords:
    "financial services, AI banking, fintech solutions, blockchain finance, digital transformation, regulatory compliance, cybersecurity",
}

export default function Page() {
  return <FinancialServicesPage />
}
