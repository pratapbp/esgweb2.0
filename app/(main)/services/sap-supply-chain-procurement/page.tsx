import type { Metadata } from "next"
import SAPSupplyChainProcurementClientPage from "./SAPSupplyChainProcurementClientPage"

export const metadata: Metadata = {
  title: "SAP Supply Chain & Procurement Solutions | ESGit",
  description:
    "Transform your supply chain with AI-powered SAP Ariba, IBP, and Fieldglass solutions. Predictive analytics, blockchain procurement, and intelligent automation.",
  keywords: "SAP Ariba, SAP IBP, SAP Fieldglass, supply chain AI, procurement automation, supplier management",
}

export default function SAPSupplyChainProcurementPage() {
  return <SAPSupplyChainProcurementClientPage />
}
