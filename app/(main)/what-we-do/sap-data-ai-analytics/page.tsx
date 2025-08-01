import type { Metadata } from "next"
import SAPDataAIAnalyticsPage from "./sap-data-ai-analytics-page"

export const metadata: Metadata = {
  title: "SAP Data & AI Analytics | ESG",
  description:
    "Transform your data into actionable insights with our advanced SAP Data & AI Analytics solutions powered by artificial intelligence.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function Page() {
  return <SAPDataAIAnalyticsPage />
}
