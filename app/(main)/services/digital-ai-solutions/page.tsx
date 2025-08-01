import type { Metadata } from "next"
import DigitalAISolutionsClientPage from "./DigitalAISolutionsClientPage"

export const metadata: Metadata = {
  title: "Digital AI Solutions | ESGit - Generative AI, RPA, ML & Blockchain",
  description:
    "Transform your business with ESGit's Digital AI Engine. From GenAI and Computer Vision to RPA and Blockchain - scale faster with intelligent automation.",
  keywords:
    "Digital AI, Generative AI, RPA, Machine Learning, Computer Vision, Conversational AI, Blockchain, AI Agents, Enterprise AI",
  openGraph: {
    title: "Digital AI Solutions | ESGit",
    description: "Redefining Digital Transformation Through AI - GenAI, RPA, ML, and Blockchain solutions",
    images: ["/images/services/digital-ai.jpg"],
  },
}

export default function DigitalAISolutionsPage() {
  return <DigitalAISolutionsClientPage />
}
