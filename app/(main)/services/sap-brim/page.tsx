import type { Metadata } from "next"
import SAPBRIMClientPage from "./SAPBRIMClientPage"

export const metadata: Metadata = {
  title: "SAP BRIM - AI-Powered Revenue Innovation | ESGit",
  description:
    "Transform your billing and revenue management with ESGit's AI-augmented SAP BRIM solutions. Monetize subscriptions, usage-based services, and digital products with intelligent automation.",
  keywords:
    "SAP BRIM, billing automation, revenue management, subscription billing, usage-based billing, convergent charging, SAP CI, FI-CA",
}

export default function SAPBRIMPage() {
  return <SAPBRIMClientPage />
}
