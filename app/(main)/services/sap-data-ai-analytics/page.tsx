import type { Metadata } from "next"
import SAPDataAIAnalyticsFuturePage from "./SAPDataAIAnalyticsFuturePage"

export const metadata: Metadata = {
  title: "Future-Ready SAP Data & AI Analytics | ESG Inc.",
  description:
    "From Data to Destiny — Redefining Enterprises with Conscious AI. Experience quantum analytics, self-organizing data, and predictive intelligence with ESG Inc's revolutionary SAP AI solutions.",
  keywords:
    "SAP Analytics Cloud, AI Analytics, Quantum Computing, Blockchain Data, Predictive AI, ESG Inc, Future Analytics",
  openGraph: {
    title: "Future-Ready SAP Data & AI Analytics | ESG Inc.",
    description: "From Data to Destiny — Redefining Enterprises with Conscious AI",
    images: ["/images/sap-ai-analytics-hero.jpg"],
  },
}

export default function Page() {
  return <SAPDataAIAnalyticsFuturePage />
}
