import type { Metadata } from "next"
import LogisticsPage from "./logistics-page"

export const metadata: Metadata = {
  title: "Logistics & Supply Chain Solutions | ESGit AI-Powered Transformation",
  description:
    "Revolutionize logistics operations with ESGit's AI-first approach. Predictive routing, real-time tracking, SAP TM/EWM integration, and autonomous warehouse operations.",
  keywords:
    "logistics AI, supply chain optimization, SAP TM, SAP EWM, predictive routing, warehouse automation, freight management",
}

export default function Page() {
  return <LogisticsPage />
}
