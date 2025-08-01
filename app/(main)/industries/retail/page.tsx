import type { Metadata } from "next"
import RetailPage from "./retail-page"

export const metadata: Metadata = {
  title: "Smart Retail Transformation | ESGit - AI-Powered Retail Solutions",
  description:
    "Transform your retail operations with ESGit's AI-powered solutions. SAP integration, GenAI, computer vision, and real-time analytics for exceptional customer experiences.",
  keywords:
    "retail AI, SAP retail, GenAI retail, computer vision, retail automation, customer analytics, omnichannel retail",
}

export default function Page() {
  return <RetailPage />
}
